// ===== BARCODE SCANNER (html5-qrcode) =====
// Switched from Quagga to html5-qrcode for reliable camera support
// in Telegram WebView on iOS and Android.

let html5QrCode   = null;
let scannedProduct = null;

function openScan() {
  document.getElementById('scan-modal-bg').classList.add('open');
  document.getElementById('product-found').style.display = 'none';
  document.getElementById('scan-status').textContent = 'Наведіть камеру на штрихкод товару';
  document.getElementById('barcode-manual').value = '';
  scannedProduct = null;
  // Small delay so the modal animation finishes before camera starts
  setTimeout(startCamera, 300);
}

function closeScan(e) {
  if (e && e.target !== document.getElementById('scan-modal-bg')) return;
  stopCamera();
  document.getElementById('scan-modal-bg').classList.remove('open');
}

function startCamera() {
  const statusEl = document.getElementById('scan-status');

  if (typeof Html5Qrcode === 'undefined') {
    statusEl.textContent = '📵 Бібліотека не завантажилась. Введіть код вручну нижче.';
    return;
  }
  if (html5QrCode) return; // already running

  // Clear any leftover content from previous session
  document.getElementById('qr-reader').innerHTML = '';

  html5QrCode = new Html5Qrcode('qr-reader', { verbose: false });
  statusEl.textContent = '⏳ Запускаємо камеру...';

  const config = {
    fps: 10,
    qrbox: { width: 260, height: 120 },
    aspectRatio: 1.7,
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
    (decodedText) => {
      if (!scannedProduct) {
        lookupBarcode(decodedText);
      }
    },
    () => {} // per-frame scan failure — ignore
  )
  .then(() => {
    statusEl.textContent = '📷 Наведіть камеру на штрихкод товару';
  })
  .catch((err) => {
    console.error('[Scanner] start error:', err);
    html5QrCode = null;
    const s = String(err).toLowerCase();
    let msg = '⚠ Не вдалося запустити камеру. Введіть код вручну нижче.';
    if (s.includes('notallowed') || s.includes('permission') || s.includes('denied')) {
      msg = '🔒 Дозвіл на камеру відхилено. Введіть код вручну нижче.';
    } else if (s.includes('notfound') || s.includes('no camera')) {
      msg = '📵 Камера не знайдена. Введіть код вручну нижче.';
    } else if (s.includes('notreadable') || s.includes('in use')) {
      msg = '⚠ Камера зайнята іншим застосунком. Введіть код вручну.';
    }
    statusEl.textContent = msg;
  });
}

function stopCamera() {
  if (html5QrCode) {
    html5QrCode.stop().catch(() => {});
    html5QrCode = null;
  }
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

async function lookupBarcode(code) {
  document.getElementById('scan-status').textContent = '🔍 Шукаємо у базі даних...';

  // Fetch with 6s timeout
  async function fetchOFF(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    try {
      const r = await fetch(url, { signal: ctrl.signal });
      return await r.json();
    } finally {
      clearTimeout(timer);
    }
  }

  try {
    // Try world database — includes Ukrainian products (EAN prefix 482)
    const fields = 'product_name,product_name_uk,product_name_ru,brands,categories_tags,image_front_small_url,nutriscore_grade';
    const d = await fetchOFF(
      `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=${fields}`
    );

    if (d.status === 1 && d.product) {
      const p = d.product;
      // Prefer Ukrainian name → Russian → English
      const name = p.product_name_uk || p.product_name || p.product_name_ru || '';
      if (name) {
        scannedProduct = {
          barcode: code,
          name,
          brand: p.brands || '',
          image: p.image_front_small_url || '',
          nutri: p.nutriscore_grade || '',
          cat:   guessCategory(p.categories_tags || []),
        };
        showFoundProduct();
        return;
      }
    }

    // Not found in database — let user enter name manually
    showManualEntry(code);

  } catch(e) {
    if (e.name === 'AbortError') {
      document.getElementById('scan-status').textContent = '⏱ Сервер не відповідає. Введіть назву вручну.';
    } else {
      document.getElementById('scan-status').textContent = '❌ Помилка мережі. Введіть назву вручну.';
    }
    showManualEntry(code);
  }
}

function showManualEntry(code) {
  document.getElementById('scan-status').textContent = `📦 Штрихкод: ${code} — введіть назву`;
  scannedProduct = { barcode: code, name: '', brand: '', image: '', nutri: '', cat: 'other' };

  document.getElementById('pf-img').style.display  = 'none';
  document.getElementById('pf-nutri').innerHTML    = '';
  document.getElementById('pf-brand').textContent  = `Штрихкод: ${code}`;

  // Replace static name text with editable input
  document.getElementById('pf-name').innerHTML = `
    <input id="pf-name-input"
      placeholder="Назва продукту (обов'язково)"
      style="width:100%;border:none;border-bottom:1px solid var(--color-border-secondary);
             background:transparent;font-size:13px;font-weight:600;
             color:var(--color-text-primary);outline:none;padding:2px 0;
             -webkit-user-select:text;user-select:text"
      oninput="scannedProduct.name=this.value.trim()"/>`;

  const expD = new Date(); expD.setDate(expD.getDate() + 7);
  document.getElementById('pf-exp').value = expD.toISOString().split('T')[0];
  document.getElementById('pf-qty').value = '1';
  document.getElementById('product-found').style.display = 'block';
  stopCamera();
  setTimeout(() => { const i = document.getElementById('pf-name-input'); if (i) i.focus(); }, 250);
}

function guessCategory(tags) {
  const t = tags.join(' ').toLowerCase();
  if (/milk|dairy|cheese|yogurt|cream/.test(t))  return 'dairy';
  if (/meat|chicken|beef|pork|fish/.test(t))      return 'meat';
  if (/vegetable|fruit/.test(t))                  return 'veggie';
  if (/beverage|drink|juice/.test(t))             return 'drink';
  if (/bread|bakery/.test(t))                     return 'bread';
  return 'other';
}

function showFoundProduct() {
  const p = scannedProduct;
  // Reset name element to plain text (may have been replaced with input by showManualEntry)
  document.getElementById('pf-name').textContent  = p.name;
  document.getElementById('pf-brand').textContent = p.brand;
  const img = document.getElementById('pf-img');
  img.src = p.image;
  img.style.display = p.image ? 'block' : 'none';
  const nCls = { a:'na', b:'nb', c:'nc-pill', d:'nd', e:'ne' };
  document.getElementById('pf-nutri').innerHTML = p.nutri
    ? `<span class="nutri-pill ${nCls[p.nutri] || ''}">Nutri-Score ${p.nutri.toUpperCase()}</span>` : '';
  const expD = new Date(); expD.setDate(expD.getDate() + 7);
  document.getElementById('pf-exp').value = expD.toISOString().split('T')[0];
  document.getElementById('pf-qty').value = '1';
  document.getElementById('product-found').style.display = 'block';
  document.getElementById('scan-status').textContent = `✅ Знайдено: ${p.name}`;
  stopCamera();
}

function addFromScan() {
  if (!scannedProduct) return;
  // If user typed name manually, read it from the input field
  const nameInput = document.getElementById('pf-name-input');
  if (nameInput) scannedProduct.name = nameInput.value.trim();

  const exp  = document.getElementById('pf-exp').value;
  const qty  = parseInt(document.getElementById('pf-qty').value) || 1;
  const unit = document.getElementById('pf-unit').value;
  if (!scannedProduct.name) { alert('Введіть назву продукту'); return; }
  if (!exp) { alert('Вкажіть термін придатності'); return; }

  let detectedIcon = ICONS[scannedProduct.cat] || '📦';
  const lower = scannedProduct.name.toLowerCase();
  for (const w of lower.split(/\s+/)) {
    if (KEYWORD_MAP[w]) { detectedIcon = KEYWORD_MAP[w].emoji; break; }
    const k = Object.keys(KEYWORD_MAP).find(k => k.startsWith(w) || w.startsWith(k));
    if (k) { detectedIcon = KEYWORD_MAP[k].emoji; break; }
  }

  prods.push({
    id: nid++, name: scannedProduct.name, cat: scannedProduct.cat,
    icon: detectedIcon, exp, qty, unit,
    used: 0, wasted: 0,
    brand: scannedProduct.brand, barcode: scannedProduct.barcode,
  });

  const name = scannedProduct.name;
  genRecipes = [];
  closeScan();
  renderFridge();
  renderAlerts();

  const dupes = prods.filter(p => p.name.toLowerCase() === name.toLowerCase()).length;
  toast(dupes > 1
    ? `${detectedIcon} "${name}" додано (${dupes} записи з різними датами)`
    : `${detectedIcon} "${name}" додано`
  );
  saveData();
  scannedProduct = null;
}
