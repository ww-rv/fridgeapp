// ===== BARCODE SCANNER =====
// Library: html5-qrcode
// Databases: Open Food Facts (world) → Open Food Facts (ua) → UPC ItemDB → ручне введення

let html5QrCode    = null;
let scannedProduct = null;

// ─── Відкрити / закрити сканер ────────────────────────────────────────────
function openScan() {
  document.getElementById('scan-modal-bg').classList.add('open');
  document.getElementById('product-found').style.display = 'none';
  document.getElementById('scan-status').textContent = 'Наведіть камеру на штрихкод товару';
  document.getElementById('barcode-manual').value = '';
  scannedProduct = null;
  setTimeout(startCamera, 300);
}

function closeScan(e) {
  if (e && e.target !== document.getElementById('scan-modal-bg')) return;
  stopCamera();
  document.getElementById('scan-modal-bg').classList.remove('open');
}

// ─── Запуск камери ────────────────────────────────────────────────────────
function startCamera() {
  const statusEl = document.getElementById('scan-status');
  if (typeof Html5Qrcode === 'undefined') {
    statusEl.textContent = '📵 Бібліотека не завантажилась. Введіть код вручну нижче.';
    return;
  }
  if (html5QrCode) return;

  document.getElementById('qr-reader').innerHTML = '';
  html5QrCode = new Html5Qrcode('qr-reader', { verbose: false });
  statusEl.textContent = '⏳ Запускаємо камеру...';

  const config = {
    fps: 15,                              // збільшено для швидшого розпізнавання
    qrbox: { width: 290, height: 140 },  // ширший qrbox — менш точне прицілювання
    aspectRatio: 1.7,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true, // нативний BarcodeDetector — набагато швидший на Android
    },
    formatsToSupport: [
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.CODE_39,
    ],
  };

  html5QrCode.start(
    { facingMode: 'environment' },
    config,
    (decodedText) => { if (!scannedProduct) lookupBarcode(decodedText); },
    () => {}
  )
  .then(() => {
    statusEl.textContent = '📷 Наведіть камеру на штрихкод товару';
  })
  .catch((err) => {
    console.error('[Scanner]', err);
    html5QrCode = null;
    const s = String(err).toLowerCase();
    statusEl.textContent =
      s.includes('notallowed') || s.includes('permission') || s.includes('denied')
        ? '🔒 Дозвіл на камеру відхилено. Введіть код вручну нижче.'
        : s.includes('notfound') || s.includes('no camera')
        ? '📵 Камера не знайдена. Введіть код вручну нижче.'
        : '⚠ Не вдалося запустити камеру. Введіть код вручну нижче.';
  });
}

function stopCamera() {
  if (html5QrCode) { html5QrCode.stop().catch(() => {}); html5QrCode = null; }
}

function resetScan() {
  scannedProduct = null;
  document.getElementById('product-found').style.display = 'none';
  document.getElementById('scan-status').textContent = 'Наведіть камеру на штрихкод товару';
  document.getElementById('barcode-manual').value = '';
  stopCamera();
  setTimeout(startCamera, 200);
}

function lookupManual() {
  const code = document.getElementById('barcode-manual').value.trim();
  if (!code) return;
  stopCamera();
  lookupBarcode(code);
}

// ─── Запит з таймаутом ────────────────────────────────────────────────────
async function _fetchJSON(url, timeout = 6000) {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

// ─── Каскад баз даних ─────────────────────────────────────────────────────
async function lookupBarcode(code) {
  const statusEl = document.getElementById('scan-status');
  stopCamera();

  // ── 1. Open Food Facts: world ─────────────────────────────────────────
  statusEl.textContent = '🔍 Open Food Facts...';
  try {
    const fields = 'product_name,product_name_uk,product_name_ru,brands,categories_tags,image_front_small_url,nutriscore_grade';
    const d = await _fetchJSON(
      `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=${fields}`
    );
    if (d.status === 1 && d.product) {
      const p    = d.product;
      const name = p.product_name_uk || p.product_name || p.product_name_ru || '';
      if (name) {
        _setFound({ code, name, brand: p.brands || '',
          image: p.image_front_small_url || '',
          nutri: p.nutriscore_grade || '',
          cat:   _guessCategory(p.categories_tags || []) });
        return;
      }
    }
  } catch(e) { /* next */ }

  // ── 2. Open Food Facts: ua (українська база) ──────────────────────────
  statusEl.textContent = '🔍 Open Food Facts UA...';
  try {
    const fields = 'product_name,product_name_uk,product_name_ru,brands,categories_tags,image_front_small_url,nutriscore_grade';
    const d = await _fetchJSON(
      `https://ua.openfoodfacts.org/api/v2/product/${code}.json?fields=${fields}`, 5000
    );
    if (d.status === 1 && d.product) {
      const p    = d.product;
      const name = p.product_name_uk || p.product_name || p.product_name_ru || '';
      if (name) {
        _setFound({ code, name, brand: p.brands || '',
          image: p.image_front_small_url || '',
          nutri: p.nutriscore_grade || '',
          cat:   _guessCategory(p.categories_tags || []) });
        return;
      }
    }
  } catch(e) { /* next */ }

  // ── 3. UPC ItemDB (100 безкоштовних запитів/день, без реєстрації) ─────
  statusEl.textContent = '🔍 UPC Item DB...';
  try {
    const d = await _fetchJSON(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${code}`, 5000
    );
    if (d.code === 'OK' && d.items && d.items.length > 0) {
      const item = d.items[0];
      if (item.title) {
        _setFound({ code, name: item.title, brand: item.brand || '',
          image: (item.images && item.images[0]) || '',
          nutri: '',
          cat:   _guessCategoryStr(item.category || '') });
        return;
      }
    }
  } catch(e) { /* not found */ }

  // ── 4. Нічого не знайдено — ручне введення ───────────────────────────
  showManualEntry(code);
}

function _setFound(p) {
  scannedProduct = { barcode: p.code, name: p.name, brand: p.brand,
    image: p.image, nutri: p.nutri, cat: p.cat };
  showFoundProduct();
}

// ─── Визначення категорії ────────────────────────────────────────────────
function _guessCategoryStr(s) {
  s = s.toLowerCase();
  if (/milk|dairy|cheese|yogurt|cream/.test(s))         return 'dairy';
  if (/meat|chicken|beef|pork|fish|seafood/.test(s))    return 'meat';
  if (/vegetable|fruit|produce/.test(s))                return 'veggie';
  if (/beverage|drink|juice|water|soda/.test(s))        return 'drink';
  if (/bread|bakery|cereal|grain/.test(s))              return 'bread';
  return 'other';
}
function _guessCategory(tags) { return _guessCategoryStr(tags.join(' ')); }

// ─── Відображення знайденого продукту ────────────────────────────────────
function showFoundProduct() {
  const p = scannedProduct;
  document.getElementById('pf-name').textContent  = p.name;
  document.getElementById('pf-brand').textContent = p.brand;
  const img = document.getElementById('pf-img');
  img.src = p.image; img.style.display = p.image ? 'block' : 'none';
  const nCls = { a:'na', b:'nb', c:'nc-pill', d:'nd', e:'ne' };
  document.getElementById('pf-nutri').innerHTML = p.nutri
    ? `<span class="nutri-pill ${nCls[p.nutri] || ''}">Nutri-Score ${p.nutri.toUpperCase()}</span>` : '';
  const expD = new Date(); expD.setDate(expD.getDate() + 7);
  document.getElementById('pf-exp').value = expD.toISOString().split('T')[0];
  document.getElementById('pf-qty').value = '1';
  document.getElementById('product-found').style.display = 'block';
  document.getElementById('scan-status').textContent = `✅ Знайдено: ${p.name}`;
}

// ─── Ручне введення (коли не знайдено в жодній базі) ─────────────────────
function showManualEntry(code) {
  document.getElementById('scan-status').textContent = `📦 Не знайдено — введіть назву`;
  scannedProduct = { barcode: code, name: '', brand: '', image: '', nutri: '', cat: 'other' };
  document.getElementById('pf-img').style.display  = 'none';
  document.getElementById('pf-nutri').innerHTML    = '';
  document.getElementById('pf-brand').textContent  = `Штрихкод: ${code}`;
  document.getElementById('pf-name').innerHTML = `
    <input id="pf-name-input" placeholder="Назва продукту"
      style="width:100%;border:none;border-bottom:1px solid var(--border-2);
             background:transparent;font-size:13px;font-weight:600;
             color:var(--text);outline:none;padding:2px 0;
             -webkit-user-select:text;user-select:text"
      oninput="scannedProduct.name=this.value.trim()"/>`;
  const expD = new Date(); expD.setDate(expD.getDate() + 7);
  document.getElementById('pf-exp').value = expD.toISOString().split('T')[0];
  document.getElementById('pf-qty').value = '1';
  document.getElementById('product-found').style.display = 'block';
  setTimeout(() => { const i = document.getElementById('pf-name-input'); if (i) i.focus(); }, 250);
}

// ─── Додати відсканований продукт ─────────────────────────────────────────
function addFromScan() {
  if (!scannedProduct) return;
  const nameInput = document.getElementById('pf-name-input');
  if (nameInput) scannedProduct.name = nameInput.value.trim();
  const exp  = document.getElementById('pf-exp').value;
  const qty  = parseInt(document.getElementById('pf-qty').value) || 1;
  const unit = document.getElementById('pf-unit').value;
  if (!scannedProduct.name) { alert('Введіть назву продукту'); return; }
  if (!exp) { alert('Вкажіть термін придатності'); return; }

  let detectedIcon = ICONS[scannedProduct.cat] || '📦';
  for (const w of scannedProduct.name.toLowerCase().split(/\s+/)) {
    if (KEYWORD_MAP[w]) { detectedIcon = KEYWORD_MAP[w].emoji; break; }
    const k = Object.keys(KEYWORD_MAP).find(k => k.startsWith(w) || w.startsWith(k));
    if (k) { detectedIcon = KEYWORD_MAP[k].emoji; break; }
  }

  prods.push({ id: nid++, name: scannedProduct.name, cat: scannedProduct.cat,
    icon: detectedIcon, exp, qty, unit, used: 0, wasted: 0,
    brand: scannedProduct.brand, barcode: scannedProduct.barcode });

  const name = scannedProduct.name;
  genRecipes = [];
  closeScan(); renderFridge(); renderAlerts();
  const dupes = prods.filter(p => p.name.toLowerCase() === name.toLowerCase()).length;
  toast(dupes > 1 ? `${detectedIcon} "${name}" додано (${dupes} партії)` : `${detectedIcon} "${name}" додано`);
  saveData();
  scannedProduct = null;
}
