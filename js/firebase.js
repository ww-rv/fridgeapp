// ===== FIREBASE REALTIME SYNC =====
// Щоб активувати:
// 1. Перейдіть на console.firebase.google.com
// 2. Створіть проект → Realtime Database → Create database → Test mode
// 3. Project Settings → Your apps → Add web app → скопіюйте config нижче

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAQ5lyFfWO7m6FbxlciS-b0RDyTJIeIpII",
  authDomain: "fridgeapp-e8ab4.firebaseapp.com",
  databaseURL: "https://fridgeapp-e8ab4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fridgeapp-e8ab4",
  storageBucket: "fridgeapp-e8ab4.firebasestorage.app",
  messagingSenderId: "49594319090",
  appId: "1:49594319090:web:bc3e5393d717c80f5f106b",
};

// ─── Внутрішній стан ───────────────────────────────────────────────────────
const FB_READY = !!FIREBASE_CONFIG.databaseURL;
let fbDb        = null;
let fbRef       = null;
let fbListening = false;
let fbMyId      = null; // поточний ідентифікатор холодильника

// ─── Ініціалізація ─────────────────────────────────────────────────────────
function initFirebase() {
  if (!FB_READY) return;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    fbDb = firebase.database();
    const savedId = localStorage.getItem('fridge_share_id');
    if (savedId) _attachListener(savedId);
    _updateShareBtn();
  } catch(e) {
    console.warn('[Firebase] init error:', e);
  }
}

// ─── Генерація короткого ID ────────────────────────────────────────────────
function _genId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Firebase зберігає масиви як об'єкти коли є "дірки" (після видалення).
// Ця функція завжди повертає чистий масив.
function _toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.values(val);
}

// ─── Підключення до Firebase ──────────────────────────────────────────────
function _attachListener(fridgeId) {
  if (!fbDb) return;
  if (fbRef) { fbRef.off(); }
  fbMyId      = fridgeId;
  fbListening = true;
  fbRef       = fbDb.ref(`fridges/${fridgeId}`);

  fbRef.on('value', (snap) => {
    const data = snap.val();
    if (!data) { pushToFirebase(); return; }   // перший раз — завантажуємо наші дані
    // Застосовуємо зміни з Firebase (last-write-wins)
    // _toArray() виправляє баг Firebase: масиви з "дірками" стають об'єктами
    if (data.prods !== undefined) prods = _toArray(data.prods);
    if (data.shop  !== undefined) shop  = _toArray(data.shop);
    if (data.nid   !== undefined) nid   = Math.max(nid,   data.nid   || 7);
    if (data.nshop !== undefined) nshop = Math.max(nshop, data.nshop || 2);
    // Зберігаємо локально і перемальовуємо
    try {
      localStorage.setItem('fridge_prods', JSON.stringify(prods));
      localStorage.setItem('fridge_shop',  JSON.stringify(shop));
      localStorage.setItem('fridge_ids',   JSON.stringify({ nid, nshop }));
    } catch(e) {}
    renderFridge(); renderAlerts(); renderShop();
    if (typeof curTab !== 'undefined' && curTab === 'stats') renderStats();
  });

  _updateShareBtn();
}

// ─── Відправка даних в Firebase ───────────────────────────────────────────
function pushToFirebase() {
  if (!fbRef || !fbListening) return;
  fbRef.set({ prods, shop, nid, nshop, ts: Date.now() }).catch(e => {
    console.warn('[Firebase] push error:', e);
  });
}

// ─── Старт спільного холодильника ─────────────────────────────────────────
function startSharing() {
  if (!FB_READY || !fbDb) { toast('❌ Firebase не ініціалізовано. Перевірте конфіг.'); return; }
  const newId = _genId();
  localStorage.setItem('fridge_share_id', newId);
  _attachListener(newId);
  pushToFirebase();
  renderShareModal();
  toast('✅ Спільний холодильник створено');
}

// ─── Приєднання до існуючого ──────────────────────────────────────────────
function joinSharedFridge(code) {
  const id = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (id.length !== 6) { toast('❌ Невірний код (6 символів)'); return; }
  if (!FB_READY || !fbDb) { toast('❌ Firebase не ініціалізовано. Перевірте конфіг.'); return; }
  localStorage.setItem('fridge_share_id', id);
  _attachListener(id);
  renderShareModal();
  toast(`🔗 Підключено до холодильника ${id}`);
}

// ─── Відключення ──────────────────────────────────────────────────────────
function stopSharing() {
  if (fbRef) { fbRef.off(); fbRef = null; }
  fbListening = false;
  fbMyId      = null;
  localStorage.removeItem('fridge_share_id');
  _updateShareBtn();
  closeShareModal();
  toast('Синхронізацію відключено');
}

// ─── Кнопка "share" в topbar ──────────────────────────────────────────────
function _updateShareBtn() {
  const btn = document.getElementById('share-btn');
  if (!btn) return;
  if (fbListening && fbMyId) {
    btn.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:var(--ok);display:inline-block;margin-right:2px"></span>`;
    btn.title = `Синхронізовано · ${fbMyId}`;
  } else {
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M12 16V4"/><path d="M8 8l4-4 4 4"/></svg>`;
    btn.title = 'Поділитись холодильником';
  }
}

// ─── Share Modal ──────────────────────────────────────────────────────────
function openShareModal() {
  document.getElementById('share-modal').classList.add('open');
  renderShareModal();
}
function closeShareModal() {
  document.getElementById('share-modal').classList.remove('open');
}

function renderShareModal() {
  const inner = document.getElementById('share-modal-inner');
  if (fbListening && fbMyId) {
    // Підключено — показуємо код і кнопку поділитись
    const formatted = fbMyId.slice(0,3) + '-' + fbMyId.slice(3);
    inner.innerHTML = `
      <h2 style="font-size:16px;font-weight:700;margin-bottom:4px">🔗 Спільний холодильник</h2>
      <p style="font-size:12px;color:var(--text-2);margin-bottom:14px">
        Дайте цей код членам сім'ї — вони зможуть підключитись і бачити зміни в реальному часі.
      </p>
      <div style="background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:16px;
                  padding:16px;text-align:center;margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">Код холодильника</div>
        <div style="font-size:36px;font-weight:800;letter-spacing:4px;color:var(--text)">${formatted}</div>
      </div>
      <button class="bok-btn" style="width:100%;margin-bottom:8px" onclick="copyFridgeCode()">📋 Скопіювати код</button>
      <button class="bok-btn" style="width:100%;margin-bottom:8px;background:var(--ok)" onclick="shareToTelegram()">📤 Поділитись в Telegram</button>
      <button class="cncl-btn" style="width:100%;margin-bottom:8px" onclick="closeShareModal()">Закрити</button>
      <button style="width:100%;background:none;border:none;font-size:11px;color:var(--danger);cursor:pointer;padding:4px"
        onclick="stopSharing()">Відключити синхронізацію</button>`;
  } else if (!FB_READY) {
    inner.innerHTML = `
      <h2 style="font-size:16px;font-weight:700;margin-bottom:8px">☁️ Поділитись холодильником</h2>
      <div style="background:var(--warn-soft);border:0.5px solid var(--warn);border-radius:14px;padding:12px;margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:var(--warn);margin-bottom:4px">⚙️ Потрібне налаштування Firebase</div>
        <div style="font-size:11px;color:var(--text-2);line-height:1.5">
          Відкрийте файл <code style="background:var(--bg-sunken);padding:1px 5px;border-radius:4px;font-size:11px">js/firebase.js</code>
          і вставте конфіг вашого Firebase проекту.
        </div>
      </div>
      <div style="background:var(--bg-sunken);border-radius:12px;padding:12px;margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;margin-bottom:8px">Як налаштувати (безкоштовно):</div>
        <div style="font-size:11px;color:var(--text-2);line-height:1.8">
          1. Перейдіть на <b>console.firebase.google.com</b><br>
          2. Натисніть <b>Add project</b> (безкоштовно)<br>
          3. Realtime Database → <b>Create database</b> → <b>Test mode</b><br>
          4. Project Settings ⚙️ → Your apps → <b>&lt;/&gt; Web app</b><br>
          5. Скопіюйте <b>firebaseConfig</b> у файл <code>js/firebase.js</code>
        </div>
      </div>
      <button class="bok-btn" style="width:100%;margin-bottom:8px" onclick="openFirebaseConsole()">🔗 Відкрити Firebase Console</button>
      <button class="cncl-btn" style="width:100%" onclick="closeShareModal()">Закрити</button>`;
  } else {
    inner.innerHTML = `
      <h2 style="font-size:16px;font-weight:700;margin-bottom:6px">☁️ Поділитись холодильником</h2>
      <p style="font-size:12px;color:var(--text-2);margin-bottom:14px;line-height:1.5">
        Члени сім'ї бачитимуть зміни в реальному часі на своїх пристроях.
      </p>
      <button class="bok-btn" style="width:100%;margin-bottom:10px" onclick="startSharing()">
        ✨ Створити спільний холодильник
      </button>
      <div style="text-align:center;font-size:11px;color:var(--text-3);margin:4px 0 10px">або маєте код від іншого?</div>
      <div style="display:flex;gap:8px">
        <input id="join-code-input" placeholder="Введіть код (напр. ABC-123)"
          style="flex:1;padding:11px 12px;border-radius:12px;border:0.5px solid var(--border);
                 background:var(--bg-sunken);color:var(--text);font-size:14px;font-weight:600;
                 letter-spacing:2px;text-transform:uppercase;-webkit-user-select:text;user-select:text;outline:none"
          oninput="this.value=this.value.toUpperCase()" maxlength="7"/>
        <button class="bok-btn" style="flex:0 0 auto;padding:11px 16px" onclick="joinSharedFridge(document.getElementById('join-code-input').value)">
          Приєднатись
        </button>
      </div>
      <button class="cncl-btn" style="width:100%;margin-top:10px" onclick="closeShareModal()">Скасувати</button>`;
  }
}

function copyFridgeCode() {
  if (!fbMyId) return;
  const formatted = fbMyId.slice(0,3) + '-' + fbMyId.slice(3);
  navigator.clipboard.writeText(formatted).then(() => toast('📋 Код скопійовано'))
    .catch(() => toast('Код: ' + formatted));
}

function shareToTelegram() {
  if (!fbMyId) return;
  const formatted = fbMyId.slice(0,3) + '-' + fbMyId.slice(3);
  const text = `Підключись до мого холодильника в додатку! Код: ${formatted}`;
  const url  = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
  if (tg) tg.openLink(url); else window.open(url, '_blank');
}

function openFirebaseConsole() {
  const url = 'https://console.firebase.google.com';
  if (tg) tg.openLink(url); else window.open(url, '_blank');
}

// ─── Спільна база штрихкодів ──────────────────────────────────────────────
// Зберігає назви продуктів що були введені вручну — доступно всім користувачам

async function lookupCommunityBarcode(code) {
  if (!fbDb) return null;
  try {
    const snap = await fbDb.ref(`barcodes/${code}`).once('value');
    return snap.val(); // { name, brand, cat } або null
  } catch(e) {
    return null;
  }
}

function saveCommunityBarcode(code, data) {
  if (!fbDb || !code || !data.name) return;
  fbDb.ref(`barcodes/${code}`).set({
    name: data.name, brand: data.brand || '', cat: data.cat || 'other',
    ts: Date.now(),
  }).catch(() => {});
}

// Ініціалізуємо одразу коли DOM готовий
document.addEventListener('DOMContentLoaded', initFirebase);
// Якщо DOMContentLoaded вже спрацював
if (document.readyState !== 'loading') initFirebase();
