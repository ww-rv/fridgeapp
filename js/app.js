// ===== TELEGRAM INIT =====
const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.expand(); tg.ready(); }

// ===== SVG ICONS =====
const SVG = {
  scan:  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>`,
  plus:  `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4L19 7"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  cart:  `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.5 12h12L22 8H7"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></svg>`,
  pen:   `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  sun:   `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>`,
  moon:  `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

// ===== UTILITIES =====
function days(e) { const t = new Date(); t.setHours(0,0,0,0); return Math.round((new Date(e) - t) / 864e5); }
function scls(d) { return d < 0 ? 'danger' : d <= 2 ? 'warn' : 'ok'; }
function slbl(d) { if (d < 0) return 'прострочено'; if (d === 0) return 'сьогодні'; if (d === 1) return 'завтра'; return 'днів'; }
function renderIcon(val) {
  if (!val) return '';
  if (val.endsWith('.svg')) return `<img src="./icon/${val}" class="p-icon" alt="" onerror="console.warn('Icon failed to load:', this.src)">`;
  return `<span class="p-icon emoji">${val}</span>`;
}
function prodIcon(p)  { return renderIcon(p.icon || ICONS[p.cat] || 'grocery-100.svg'); }
function prodColor(p) { return CLRS[p.cat] || CLRS.other; }

// ===== TOAST =====
function toast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg; t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2800);
}

// ===== DARK MODE =====
let darkMode = localStorage.getItem('dark') === '1';
function applyDark() { document.body.classList.toggle('dark', darkMode); document.getElementById('dark-btn').innerHTML = darkMode ? SVG.sun : SVG.moon; }
function toggleDark() { darkMode = !darkMode; localStorage.setItem('dark', darkMode ? '1' : '0'); applyDark(); }

// ===== TAB INDICATOR =====
function updateIndicator(tab) {
  const btn = document.querySelector(`.tab[data-tab="${tab}"]`);
  const ind  = document.getElementById('tab-indicator');
  if (!btn || !ind) return;
  const w = btn.offsetWidth;
  ind.style.left  = `${btn.offsetLeft + w * .15}px`;
  ind.style.width = `${w * .7}px`;
}

// ===== NAVIGATION =====
const TAB_ORDER = ['fridge','alerts','recipes','stats','shop'];
let curTab = 'fridge';

function sw(tab) {
  if (tab === curTab) return;
  const oldIdx = TAB_ORDER.indexOf(curTab);
  const newIdx = TAB_ORDER.indexOf(tab);
  const oldScreen = document.getElementById('tab-' + curTab);
  oldScreen.classList.add(newIdx > oldIdx ? 'leaving-left' : 'leaving-right');
  oldScreen.classList.remove('active');
  setTimeout(() => oldScreen.classList.remove('leaving-left','leaving-right'), 350);
  curTab = tab;
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  updateIndicator(tab);
  document.getElementById('fab-wrap').style.display = tab === 'fridge' ? '' : 'none';
  closeFab();
  if (tab === 'fridge')  renderFridge();
  if (tab === 'alerts')  renderAlerts();
  if (tab === 'recipes') renderRecipes();
  if (tab === 'stats')   renderStats();
  if (tab === 'shop')    renderShop();
}

function updSum() {
  const cur = prods.filter(p => (p.storage || 'fridge') === currentStorage);
  const exp = cur.filter(p => days(p.exp) < 0).length;
  const soon = cur.filter(p => days(p.exp) >= 0 && days(p.exp) <= 2).length;
  let t = `${cur.length} продуктів`;
  if (exp)  t += ` · ${exp} прострочено`;
  if (!exp && soon) t += ` · ${soon} скоро`;
  document.getElementById('sline').textContent = t;
  const al = prods.filter(p => days(p.exp) <= 3).length;
  document.getElementById('abadge').textContent   = al ? al : '';
  document.getElementById('abadge').style.display = al ? '' : 'none';
}

// ===== STORAGE TOGGLE (fridge / freezer) =====
let currentStorage   = 'fridge';
let currentCatFilter = 'all';

function setStorage(s) {
  currentStorage   = s;
  currentCatFilter = 'all';
  renderFridge();
}

function setCatFilter(cat) {
  currentCatFilter = cat;
  renderFridge();
}

// ===== FAB =====
let fabOpen = false;
function toggleFab() {
  fabOpen = !fabOpen;
  document.getElementById('fab-wrap').classList.toggle('open', fabOpen);
  document.getElementById('fab-backdrop').style.display = fabOpen ? 'block' : 'none';
}
function closeFab() {
  fabOpen = false;
  document.getElementById('fab-wrap').classList.remove('open');
  document.getElementById('fab-backdrop').style.display = 'none';
}

// ===== TODAY RAIL DISMISS =====
const dismissedFromRail = new Set();
function consumeFromRail(id) { dismissedFromRail.add(id); consumeCard(id); }
function shopFromRail(id)    { dismissedFromRail.add(id); shopCard(id); renderFridge(); }

// ===== QUICK ACTIONS (long press) =====
let qaTarget = null;
let _delId   = null;   // id продукту для діалогу видалення
let _delCard = null;   // DOM-елемент картки (щоб скинути позицію)
function openQuickActions(id) {
  const p = prods.find(x => x.id === id); if (!p) return;
  qaTarget = p; navigator.vibrate && navigator.vibrate(10);
  const d = days(p.exp);
  document.getElementById('quick-menu').innerHTML = `
    <div class="quick-prod">
      <div class="quick-thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
      <div style="flex:1;min-width:0">
        <div class="quick-name">${p.name}</div>
        <div class="quick-meta">${p.qty}${p.unit}${p.weight ? ` · ${p.weight}${p.weightUnit||'г'}` : ''}${p.brand ? ' · ' + p.brand : ''}</div>
      </div>
      <div class="quick-exp">
        <div class="expiry-num ${scls(d)}">${d < 0 ? `−${Math.abs(d)}` : d}</div>
        <div class="expiry-unit">${slbl(d)}</div>
      </div>
    </div>
    <div class="qa-title">Швидкі дії</div>
    <div class="qa-grid">
      <button class="qa-btn ok"     onclick="qaConsume()">${SVG.check}<span>Спожив</span></button>
      <button class="qa-btn accent" onclick="qaToShop()">${SVG.cart}<span>В список</span></button>
      <button class="qa-btn warn"   onclick="closeQuickActions();sw('recipes')">${SVG.spark}<span>Рецепт</span></button>
      <button class="qa-btn danger" onclick="qaWaste()" style="background:#dc3545">🗑️<span>Зіпсувалось</span></button>
      <button class="qa-btn"        onclick="qaDelete()" style="background:#6c757d">${SVG.close}<span>Видалити</span></button>
    </div>`;
  document.getElementById('quick-overlay').classList.add('on');
}
function closeQuickActions() {
  document.getElementById('quick-overlay').classList.remove('on');
  qaTarget = null;
  if (_delCard) { _delCard.style.transition = 'transform .25s var(--ease)'; _delCard.style.transform = 'translateX(0)'; _delCard = null; _delId = null; }
}

function showDeleteConfirm(id, cardEl) {
  const p = prods.find(x => x.id === id); if (!p) return;
  _delId = id; _delCard = cardEl;
  document.getElementById('quick-menu').innerHTML = `
    <div class="quick-prod">
      <div class="quick-thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
      <div style="flex:1;min-width:0">
        <div class="quick-name">${p.name}</div>
        <div class="quick-meta">${p.qty}${p.unit}${p.brand ? ' · ' + p.brand : ''}</div>
      </div>
    </div>
    <div class="qa-title">Що сталося?</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="qa-btn danger" onclick="confirmDelWaste()" style="background:#C52F2F;width:100%;justify-content:center;padding:13px;font-size:13px">
        🗑️<span>Зіпсувався продукт</span>
      </button>
      <button class="qa-btn" onclick="confirmDelDelete()" style="background:#6c757d;width:100%;justify-content:center;padding:13px;font-size:13px">
        ${SVG.close}<span>Видалити продукт</span>
      </button>
      <button class="qa-btn" onclick="closeQuickActions()" style="background:var(--bg-sunken);width:100%;justify-content:center;padding:11px;font-size:13px;color:var(--text-2)">
        Скасувати
      </button>
    </div>`;
  document.getElementById('quick-overlay').classList.add('on');
}
function confirmDelWaste()  { const id = _delId; closeQuickActions(); if (id !== null) wasteCard(id); }
function confirmDelDelete() { const id = _delId; closeQuickActions(); if (id !== null) delCard(id); }
function qaConsume() { if (!qaTarget) return; consumeCard(qaTarget.id); closeQuickActions(); }
function qaToShop()  { if (!qaTarget) return; shopCard(qaTarget.id);    closeQuickActions(); }
function qaWaste()   { if (!qaTarget) return; wasteCard(qaTarget.id);   closeQuickActions(); }
function qaDelete()  { if (!qaTarget) return; delCard(qaTarget.id);     closeQuickActions(); }

// ===== CARD ACTIONS =====
function getKcalForProd(p) {
  if (p.kcal) return p.kcal;
  const dbItem = ICON_DB.find(x => x[0] === p.icon || x[1].toLowerCase() === p.name.toLowerCase());
  return dbItem && dbItem[4] ? dbItem[4] : 100;
}

function consumeCard(id) {
  const p = prods.find(x => x.id === id); if (!p) return;
  
  let g = 100;
  if (p.weight) {
    g = p.weight;
  } else {
    const ans = prompt(`Скільки грамів "${p.name}" ви з'їли?`, '100');
    if (ans === null) return; // user cancelled
    g = parseInt(ans) || 100;
  }
  
  const kcal100 = getKcalForProd(p);
  const totalKcal = Math.round((g / 100) * kcal100);
  
  historyLog.push({
    id: Date.now() + Math.random(),
    type: 'consume',
    prodId: p.id,
    name: p.name,
    icon: p.icon,
    cat: p.cat,
    kcal: totalKcal,
    g: g,
    date: new Date().toISOString().split('T')[0]
  });

  p.qty = Math.max(0, p.qty - 1);
  p.used = (p.used || 0) + 1;
  if (p.qty <= 0) {
    const nm = p.name;
    prods = prods.filter(x => x.id !== id);
    dismissedFromRail.delete(id);
    if (!shop.find(s => s.name.toLowerCase() === nm.toLowerCase()))
      shop.push({ id: nshop++, name: nm, cat: p.cat || detectCat(nm), note: 'закінчився', done: false });
    toast(`"${nm}" → список покупок`);
  } else { toast(`✓ Спожито: ${p.name} (+${totalKcal} ккал)`); }
  genRecipes = []; renderFridge(); renderAlerts(); saveData();
}

function wasteCard(id) {
  const p = prods.find(x => x.id === id); if (!p) return;
  historyLog.push({
    id: Date.now() + Math.random(),
    type: 'waste',
    prodId: p.id,
    name: p.name,
    icon: p.icon,
    cat: p.cat,
    date: new Date().toISOString().split('T')[0]
  });
  
  const nm = p.name;
  prods = prods.filter(x => x.id !== id);
  dismissedFromRail.delete(id);
  if (!shop.find(s => s.name.toLowerCase() === nm.toLowerCase()))
    shop.push({ id: nshop++, name: nm, cat: p.cat || detectCat(nm), note: 'зіпсувався', done: false });
  toast(`🗑️ Зіпсувалось: ${nm}`);
  genRecipes = []; renderFridge(); renderAlerts(); saveData();
}
function shopCard(id) {
  const p = prods.find(x => x.id === id); if (!p) return;
  if (!shop.find(s => s.name.toLowerCase() === p.name.toLowerCase()))
    shop.push({ id: nshop++, name: p.name, cat: p.cat || detectCat(p.name), note: '', done: false });
  toast(`🛒 "${p.name}" в список`);
  renderShop(); saveData();
}
function delCard(id) {
  const p = prods.find(x => x.id === id); if (!p) return;
  prods = prods.filter(x => x.id !== id);
  genRecipes = []; toast(`Видалено: ${p.name}`);
  renderFridge(); renderAlerts(); saveData();
}

// ===== SWIPE + LONG PRESS =====
function initSwipes() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    if (card._swipeInit) return; card._swipeInit = true;
    let sx = 0, dx = 0, active = false;
    const start = e => { if (e.target.closest('button')) return; const t = e.touches?.[0] || e; sx = t.clientX; dx = 0; active = true; card.style.transition = 'none'; };
    const move  = e => { if (!active) return; const t = e.touches?.[0] || e; dx = Math.min(0, Math.max(-80, t.clientX - sx)); card.style.transform = `translateX(${dx}px)`; };
    const end   = () => { if (!active) return; active = false; card.style.transition = 'transform .3s var(--ease)'; card.style.transform = dx < -40 ? 'translateX(-80px)' : 'translateX(0)'; };
    card.addEventListener('touchstart', start, { passive: true });
    card.addEventListener('touchmove',  move,  { passive: true });
    card.addEventListener('touchend',   end);
  });
}
function initLongPress() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    if (card._lpInit) return; card._lpInit = true;
    const id = parseInt(card.dataset.id);
    let timer = null;
    card.addEventListener('touchstart',  () => { timer = setTimeout(() => openQuickActions(id), 480); }, { passive: true });
    card.addEventListener('touchend',    () => { if (timer) { clearTimeout(timer); timer = null; } });
    card.addEventListener('touchmove',   () => { if (timer) { clearTimeout(timer); timer = null; } });
  });
}
document.addEventListener('click', e => {
  const btn = e.target.closest('.swipe-act');
  if (!btn) return;
  const id   = parseInt(btn.dataset.id);
  const card = btn.closest('.card-wrap')?.querySelector('.card');
  if (btn.classList.contains('del')) { showDeleteConfirm(id, card); return; }
  if (card) { card.style.transition = 'transform .25s var(--ease)'; card.style.transform = 'translateX(0)'; }
});

// ===== FRIDGE RENDERING =====
function renderFridge() {
  const el = document.getElementById('tab-fridge');

  // All products for current storage
  const all = prods.filter(p => (p.storage || 'fridge') === currentStorage);

  // Apply category filter
  const filtered = currentCatFilter === 'all' ? all : all.filter(p => p.cat === currentCatFilter);

  const sorted  = [...filtered].sort((a, b) => days(a.exp) - days(b.exp));
  const expired = sorted.filter(p => days(p.exp) < 0);
  const soon    = sorted.filter(p => { const d = days(p.exp); return d >= 0 && d <= 2; });
  const ok      = sorted.filter(p => days(p.exp) > 2);
  const atRisk  = [...expired, ...soon].filter(p => !dismissedFromRail.has(p.id)).slice(0, 5);

  const freshPct = all.length ? Math.round(all.filter(p => days(p.exp) > 0).length / all.length * 100) : 100;
  const isFreezer = currentStorage === 'freezer';

  // Storage toggle
  let h = `<div class="storage-toggle">
    <button class="st-btn ${!isFreezer?'active':''}" onclick="setStorage('fridge')">🧊 Холодильник</button>
    <button class="st-btn ${isFreezer?'active':''}"  onclick="setStorage('freezer')">❄️ Морозилка</button>
  </div>`;

  // Hero ring (only for fridge)
  if (!isFreezer) {
    h += `<div class="hero" style="--p:${freshPct}">
      <div class="hero-ring"><span>${all.length}</span></div>
      <div class="hero-meta">
        <div class="hero-title">мій холодильник</div>
        <div class="hero-num">
          ${all.length} продуктів
          ${expired.length ? `· <strong>${expired.length} прострочено</strong>` : ''}
          ${!expired.length && soon.length ? `· <em>${soon.length} скоро</em>` : ''}
        </div>
      </div>
      <button class="hero-cta" onclick="openScan()">${SVG.scan} Scan</button>
    </div>`;
  } else {
    h += `<div class="hero" style="--p:100">
      <div class="hero-ring" style="background:conic-gradient(#4B82FF 100%,var(--bg-sunken) 0)">
        <span>❄️</span>
      </div>
      <div class="hero-meta">
        <div class="hero-title">морозильна камера</div>
        <div class="hero-num">${all.length} продуктів</div>
      </div>
      <button class="hero-cta" onclick="openScan()">${SVG.scan} Scan</button>
    </div>`;
  }

  // Category filter chips
  const catsInUse = ['all', ...new Set(all.map(p => p.cat))];
  const visibleGroups = CAT_GROUPS.filter(g => catsInUse.includes(g.key));
  if (visibleGroups.length > 1) {
    h += `<div class="cat-filter">${visibleGroups.map(g =>
      `<button class="cf-chip ${currentCatFilter===g.key?'active':''}" onclick="setCatFilter('${g.key}')">
        ${renderIcon(g.icon)} ${g.key === 'all' ? 'Всі' : g.label}
      </button>`
    ).join('')}</div>`;
  }

  if (!filtered.length) {
    h += `<div class="empty"><div class="ill">${isFreezer?'❄️':'🧊'}</div>
      <div class="t">${currentCatFilter !== 'all' ? 'Немає продуктів у цій категорії' : (isFreezer ? 'Морозилка порожня' : 'Холодильник порожній')}</div>
      <div class="d">Натисніть + щоб додати продукт</div></div>`;
    el.innerHTML = h; updSum(); return;
  }

  // Today rail (only for fridge)
  if (!isFreezer && atRisk.length) {
    h += `<div class="today-rail">${atRisk.map(p => {
      const dd = days(p.exp); const isDanger = dd < 0;
      return `<div class="today-card ${isDanger?'danger':''}">
        <div class="tc-row">
          <div class="tc-thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
          <div style="min-width:0">
            <div class="tc-label">${isDanger?'прострочено':dd===0?'сьогодні':dd===1?'завтра':`за ${dd} дні`}</div>
            <div class="tc-title">${p.name}</div>
          </div>
        </div>
        <div class="tc-big">${isDanger?`−${Math.abs(dd)}`:dd}<span style="font-size:13px;opacity:.6;margin-left:3px">дн.</span></div>
        <div class="tc-actions">
          <button class="ghost-btn" onclick="shopFromRail(${p.id})">В список</button>
          <button class="solid-btn" onclick="consumeFromRail(${p.id})">Спожив</button>
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  if (expired.length) { h += `<div class="sec danger">Прострочені <span class="sec-count">${expired.length}</span></div>`; expired.forEach(p => h += ph(p)); }
  if (soon.length)    { h += `<div class="sec warn">Закінчується <span class="sec-count">${soon.length}</span></div>`;    soon.forEach(p => h += ph(p)); }
  if (ok.length)      {
    const label = isFreezer ? 'В морозилці' : 'Свіжі';
    h += `<div class="sec">${label} <span class="sec-count">${ok.length}</span></div>`;
    ok.forEach(p => h += ph(p));
  }

  el.innerHTML = h + '<div style="height:20px"></div>';
  updSum();
  requestAnimationFrame(() => { initSwipes(); initLongPress(); });
}

function ph(p) {
  const d   = days(p.exp);
  const n   = d < 0 ? `−${Math.abs(d)}` : String(d);
  const dupe = prods.filter(x => x.name.toLowerCase() === p.name.toLowerCase()).length > 1;
  const weightStr = p.weight ? `${p.weight}${p.weightUnit||'г'}` : '';
  return `<div class="card-wrap">
    <div class="card-swipe-actions">
      <button class="swipe-act del" data-id="${p.id}">${SVG.close}<span>Видалити</span></button>
    </div>
    <div class="card" data-id="${p.id}">
      <div class="thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="meta">
          <span>${p.brand || CAT_NAME[p.cat] || 'Інше'}</span>
          ${weightStr ? `<span class="dot"></span><span>${weightStr}</span>` : ''}
          <span class="dot"></span><span>до ${p.exp.split('-').reverse().join('.')}</span>
          ${dupe ? `<span class="dot"></span><span style="color:var(--text-3)">окрема партія</span>` : ''}
        </div>
      </div>
      <div class="pright">
        <div class="expiry">
          <div class="expiry-num ${scls(d)}">${n}</div>
          <div class="expiry-unit">${slbl(d)}</div>
        </div>
        <div class="qty-row">
          <button class="qty-btn qty-minus" onclick="event.stopPropagation();chQ(${p.id},-1)">−</button>
          <span class="qty-val">${p.qty}<span class="qty-unit">${p.unit}</span></span>
          <button class="qty-btn qty-plus"  onclick="event.stopPropagation();chQ(${p.id},1)">+</button>
        </div>
      </div>
    </div>
  </div>`;
}

function chQ(id, d) {
  const p = prods.find(x => x.id === id); if (!p) return;
  if (d > 0) { 
    p.qty += d; 
  } else {
    p.qty += d;
    
    // Log partial consume
    const g = p.weight ? p.weight : 100;
    const kcal100 = getKcalForProd(p);
    const totalKcal = Math.round((g / 100) * kcal100);
    
    historyLog.push({
      id: Date.now() + Math.random(),
      type: 'consume',
      prodId: p.id,
      name: p.name,
      icon: p.icon,
      cat: p.cat,
      kcal: totalKcal,
      g: g,
      date: new Date().toISOString().split('T')[0]
    });

    if (p.qty <= 0) {
      const nm = p.name; prods = prods.filter(x => x.id !== id);
      dismissedFromRail.delete(id);
      if (!shop.find(s => s.name.toLowerCase() === nm.toLowerCase()))
        shop.push({ id: nshop++, name: nm, cat: p.cat || detectCat(nm), note: 'закінчився', done: false });
      toast(`"${nm}" → список покупок`);
    } else {
      toast(`✓ Спожито 1 порцію (+${totalKcal} ккал)`);
    }
  }
  genRecipes = []; renderFridge(); renderAlerts(); saveData();
}

// ===== ALERTS =====
function renderAlerts() {
  const el = document.getElementById('tab-alerts');
  const al = prods.filter(p => days(p.exp) <= 3).sort((a, b) => days(a.exp) - days(b.exp));
  updSum();
  if (!al.length) { el.innerHTML = `<div class="empty"><div class="ill">✅</div><div class="t">Все під контролем</div><div class="d">Жоден продукт не вимагає уваги</div></div>`; return; }
  el.innerHTML = `<div class="sec">Потребують уваги <span class="sec-count">${al.length}</span></div>` +
    al.map(p => {
      const d = days(p.exp); const c = d < 0 ? 'danger' : 'warn';
      return `<div class="alert ${c}">
        <div class="mini-emoji">${prodIcon(p)}</div>
        <div class="atag">${d < 0 ? `−${Math.abs(d)} днів` : d===0?'сьогодні':d===1?'завтра':`${d} дні`}</div>
        <h3>${p.name}</h3>
        <p>${d < 0 ? `Прострочений ${Math.abs(d)} дн. тому.` : `Залишилось: ${p.qty}${p.unit}${p.brand?' · '+p.brand:''}. Використайте найближчим часом.`}</p>
        <div class="btn-row"><button class="btn ghost" onclick="consumeCard(${p.id})">Спожив</button><button class="btn primary" onclick="sw('recipes')">Рецепт ✨</button></div>
      </div>`;
    }).join('') + '<div style="height:20px"></div>';
}

// ===== CALORIES =====
let _calRange = 'w';
let _calFrom  = '';
let _calTo    = '';

function setCalRange(r) { _calRange = r; if (curTab === 'stats') renderStats(); }

function _buildCalHistory() {
  const map = {};
  
  historyLog.forEach(log => {
    if (log.type !== 'consume' || !log.kcal) return;
    if (!map[log.date]) {
      map[log.date] = { date: log.date, items: [], total: 0 };
    }
    // We group multiple entries of the same product in a single day
    const existing = map[log.date].items.find(x => x.prodId === log.prodId);
    if (existing) {
      existing.kcal += log.kcal;
      existing.g += (log.g || 0);
    } else {
      map[log.date].items.push({ ...log });
    }
    map[log.date].total += log.kcal;
  });

  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

function _renderCalories() {
  const history = _buildCalHistory();
  const todayISO = new Date().toISOString().slice(0,10);
  const subDays = n => { const dt=new Date(); dt.setDate(dt.getDate()-n); return dt.toISOString().slice(0,10); };
  let effFrom, effTo;
  if      (_calRange==='d') { effFrom=todayISO; effTo=todayISO; }
  else if (_calRange==='w') { effFrom=subDays(6); effTo=todayISO; }
  else if (_calRange==='m') { effFrom=subDays(29); effTo=todayISO; }
  else { effFrom=_calFrom||subDays(6); effTo=_calTo||todayISO; }

  const slice = history.filter(d => d.date>=effFrom && d.date<=effTo);
  const totalKcal = slice.reduce((s,d)=>s+d.total,0);
  const totalG    = slice.reduce((s,d)=>s+d.items.reduce((a,b)=>a+b.g,0),0);
  const dayCount  = Math.max(1, slice.length);
  const avg       = Math.round(totalKcal/dayCount);
  const TARGET    = 2000;
  const ringPct   = Math.min(100, Math.round(Math.min(1.5, avg/TARGET)*100));

  let series;
  if (slice.length <= 14) {
    series = slice.map(d => ({ k:d.date.slice(5).replace('-','/'), v:d.total }));
  } else {
    series = [];
    for (let i=0; i<slice.length; i+=7) {
      const chunk = slice.slice(i,i+7);
      series.push({ k:chunk[0].date.slice(5).replace('-','/'), v:chunk.reduce((s,x)=>s+x.total,0) });
    }
  }
  const maxV = Math.max(1, ...series.map(s=>s.v));

  const topMap = {};
  slice.forEach(d=>d.items.forEach(it=>{
    if (!topMap[it.id]) topMap[it.id]={...it,kcal:0,g:0};
    topMap[it.id].kcal+=it.kcal; topMap[it.id].g+=it.g;
  }));
  const top = Object.values(topMap).sort((a,b)=>b.kcal-a.kcal).slice(0,5);

  const catShare = {};
  slice.forEach(d=>d.items.forEach(it=>{catShare[it.cat]=(catShare[it.cat]||0)+it.kcal;}));
  const catTotal = Object.values(catShare).reduce((a,b)=>a+b,0)||1;
  const catRows  = Object.entries(catShare).sort((a,b)=>b[1]-a[1]);
  const BC = ['#1553D4','#1D9E75','#C97A0B','#C52F2F','#9C27B0','#00838F'];

  const fillPct   = Math.min(100,(avg/TARGET)*100);
  const fillColor = avg>TARGET*1.15?'var(--danger)':avg<TARGET*.7?'var(--warn)':'var(--ok)';

  return `
    <div class="sec">Калорії</div>
    <div class="range-tabs">
      ${[['d','День'],['w','Тиждень'],['m','Місяць'],['c','Період']].map(([k,l])=>
        `<button class="rt-btn ${_calRange===k?'on':''}" onclick="setCalRange('${k}')">${l}</button>`
      ).join('')}
    </div>
    ${_calRange==='c'?`<div class="range-custom">
      <div class="rc-field"><label>Від</label><input type="date" value="${effFrom}" onchange="_calFrom=this.value;renderStats()"/></div>
      <div class="rc-field"><label>До</label><input type="date" value="${effTo}" max="${todayISO}" onchange="_calTo=this.value;renderStats()"/></div>
    </div>`:''}
    <div class="kcal-hero">
      <div class="kcal-ring" style="--p:${ringPct}">
        <div class="kcal-ring-inner">
          <div class="kcal-ring-num">${avg.toLocaleString('uk-UA')}</div>
          <div class="kcal-ring-lbl">ккал/день</div>
        </div>
      </div>
      <div class="kcal-stats">
        <div class="kcal-stat"><span class="lbl">Всього спожито</span><span class="val">${totalKcal.toLocaleString('uk-UA')} <em>ккал</em></span></div>
        <div class="kcal-stat"><span class="lbl">Загальна вага</span><span class="val">${(totalG/1000).toFixed(1)} <em>кг</em></span></div>
        <div class="kcal-stat"><span class="lbl">Днів</span><span class="val">${dayCount}</span></div>
      </div>
    </div>
    <div class="kcal-target">
      <div class="kt-bar"><div class="kt-fill" style="width:${fillPct}%;background:${fillColor}"></div><div class="kt-marker" style="left:100%"></div></div>
      <div class="kt-meta"><span>0</span><span class="kt-target">ціль · ${TARGET.toLocaleString('uk-UA')} ккал</span></div>
    </div>
    <div class="kcal-chart">
      ${series.map(s=>`<div class="kc-col"><div class="kc-bar-wrap"><div class="kc-bar" style="height:${Math.round((s.v/maxV)*100)}%"></div></div><div class="kc-lbl">${s.k}</div></div>`).join('')}
    </div>
    ${top.length?`<div class="sec">Найкалорійніші</div><div class="bar-card">${top.map((t,i)=>`<div class="brow"><div class="blbl"><div class="mini" style="background:${prodColor(t)}">${t.icon}</div><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.name}</span></div><div class="btrack"><div class="bfill" style="width:${Math.round(t.kcal/top[0].kcal*100)}%;background:${BC[i%BC.length]}"></div></div><div class="bnum" style="width:42px">${t.kcal}</div></div>`).join('')}</div>`:''}
    ${catRows.length?`<div class="sec">Розподіл по категоріях</div><div class="cat-share"><div class="cs-bar">${catRows.map(([k,v],i)=>`<div class="cs-seg" style="width:${(v/catTotal*100).toFixed(1)}%;background:${BC[i%6]}"></div>`).join('')}</div><div class="cs-legend">${catRows.map(([k,v],i)=>`<div class="cs-item"><span class="dot" style="background:${BC[i%6]}"></span><span class="cs-name">${CAT_NAME[k]||k}</span><span class="cs-pct">${Math.round(v/catTotal*100)}%</span></div>`).join('')}</div></div>`:''}
  `;
}

// ===== STATS =====
function renderStats() {
  const el = document.getElementById('tab-stats');
  const all = prods.filter(p => (p.storage||'fridge') === 'fridge');
  const total = all.length;
  const exp   = all.filter(p => days(p.exp) < 0).length;
  const tU    = all.reduce((s,p) => s+(p.used||0), 0);
  const tW    = all.reduce((s,p) => s+(p.wasted||0), 0);
  const wp    = tU+tW > 0 ? Math.round(tW/(tU+tW)*100) : 0;
  const byU   = [...all].sort((a,b) => (b.used||0)-(a.used||0));
  const maxU  = byU[0] ? (byU[0].used||1) : 1;
  const catU  = {}; all.forEach(p => { catU[p.cat] = (catU[p.cat]||0)+(p.used||0); });
  const catA  = Object.entries(catU).sort((a,b) => b[1]-a[1]);
  const maxC  = catA[0]?.[1] || 1;
  
  const allWaste = historyLog.filter(x => x.type === 'waste').sort((a,b) => a.date.localeCompare(b.date));
  let lastWasteDateStr = installDate;
  if (allWaste.length > 0) {
    lastWasteDateStr = allWaste[allWaste.length - 1].date;
  }
  const today = new Date(); today.setHours(0,0,0,0);
  const lastWasteDt = new Date(lastWasteDateStr); lastWasteDt.setHours(0,0,0,0);
  const streakDays = Math.max(0, Math.round((today - lastWasteDt) / 864e5));

  el.innerHTML = _renderCalories() + `
  <div class="sec">Огляд</div>
  <div class="kpi-grid">
    <div class="kpi accent"><div class="kicon">🧊</div><div class="klbl">Продуктів</div><div class="kval popin">${total}</div><div class="kdelta">у холодильнику</div></div>
    <div class="kpi"><div class="kicon">✓</div><div class="klbl">Використано</div><div class="kval popin">${tU}</div><div class="kdelta">всього спожито</div></div>
    <div class="kpi"><div class="kicon">⚠</div><div class="klbl">Прострочено</div><div class="kval popin" style="color:var(--danger)">${exp}</div><div class="kdelta ${exp>0?'neg':''}">${exp>0?'потребує уваги':'все свіже'}</div></div>
    <div class="kpi"><div class="kicon">📉</div><div class="klbl">% пропало</div><div class="kval popin" style="color:${wp>20?'var(--danger)':wp>10?'var(--warn)':'var(--ok)'}">${wp}%</div><div class="kdelta ${wp>10?'neg':''}">${wp<=10?'чудовий результат':'покращуйте'}</div></div>
  </div>
  <div class="streak"><div class="flame">${streakDays>0?'🔥':'🧊'}</div><div style="flex:1"><div class="st">Серія без втрат</div><div class="sv">${streakDays} ${streakDays===1?'день':streakDays>1&&streakDays<5?'дні':'днів'}</div><div class="ssub">${streakDays>0?'Нічого не пропало. Так тримати!':'Сьогодні щось зіпсувалось.'}</div></div></div>
  <div class="sec" style="margin-top:16px">Найчастіше використовуєте</div>
  <div class="bar-card">${byU.slice(0,5).map((p,i) => `<div class="brow">
    <div class="blbl"><div class="mini" style="background:${prodColor(p)}">${prodIcon(p)}</div><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</span></div>
    <div class="btrack"><div class="bfill" style="width:${Math.round((p.used||0)/maxU*100)}%;background:${BCOLS[i%BCOLS.length]}"></div></div>
    <div class="bnum">${p.used||0}</div>
  </div>`).join('')}</div>
  <div class="sec">По категоріях</div>
  <div class="bar-card">${catA.map(([k,v],i) => `<div class="brow">
    <div class="blbl"><div class="mini">${renderIcon(ICONS[k]||'grocery-100.svg')}</div><span>${CAT_NAME[k]||k}</span></div>
    <div class="btrack"><div class="bfill" style="width:${Math.round(v/maxC*100)}%;background:${BCOLS[i%BCOLS.length]}"></div></div>
    <div class="bnum">${v}</div>
  </div>`).join('')}</div>
  <div style="height:20px"></div>`;
}

// ===== SHOP =====
function renderShop() {
  const el     = document.getElementById('tab-shop');
  const active = shop.filter(s => !s.done);
  const done   = shop.filter(s =>  s.done);

  let h = `<form class="add-inline" onsubmit="addShopItem(event)">
    <input id="shop-input" placeholder="Додати в список..." type="text"/>
    <button type="submit">+</button>
  </form>`;

  if (active.length) {
    // Group by category
    const groups = {};
    active.forEach(s => {
      const cat = s.cat || detectCat(s.name) || 'other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    h += `<div class="sec">Купити <span class="sec-count">${active.length}</span></div>`;
    // Sort groups by CAT_GROUPS order
    const ordered = CAT_GROUPS.filter(g => g.key !== 'all' && groups[g.key]);
    const rest    = Object.keys(groups).filter(k => !CAT_GROUPS.find(g => g.key === k));
    [...ordered.map(g => g.key), ...rest].forEach(cat => {
      if (!groups[cat]) return;
      const info = CAT_GROUPS.find(g => g.key === cat) || { label: 'Інше', icon: 'grocery-100.svg' };
      h += `<div class="shop-cat-header">${renderIcon(info.icon)} ${info.label}</div>`;
      groups[cat].forEach(s => h += shopRow(s));
    });
  }

  if (done.length) { h += '<div class="sec">Куплено</div>'; done.forEach(s => h += shopRow(s)); }
  if (!shop.length) { h += `<div class="empty"><div class="ill">🛒</div><div class="t">Список порожній</div><div class="d">Додайте товари або свайпніть ліворуч по картці продукту</div></div>`; }

  el.innerHTML = h + '<div style="height:20px"></div>';
}

function shopRow(s) {
  return `<div class="shop-row ${s.done?'done':''}">
    <div class="chk" onclick="togS(${s.id})">${s.done?'✓':''}</div>
    <span class="sname">${s.name}</span>
    ${s.note ? `<span class="cat-tag">${s.note}</span>` : ''}
    <button class="sdel" onclick="delS(${s.id})">×</button>
  </div>`;
}

function addShopItem(e) {
  e.preventDefault();
  const inp = document.getElementById('shop-input');
  const v = inp.value.trim(); if (!v) return;
  shop.push({ id: nshop++, name: v, cat: detectCat(v), note: '', done: false });
  inp.value = '';
  renderShop(); saveData();
}

function togS(id) { const s = shop.find(x => x.id === id); if (s) s.done = !s.done; renderShop(); saveData(); }
function delS(id) { shop = shop.filter(x => x.id !== id); renderShop(); saveData(); }

// ===== ADD PRODUCT MODAL =====
let currentIcon = '📦', currentIconCat = 'other', activeCat = 'all';

function openMod() {
  closeFab();
  const d = new Date(); d.setDate(d.getDate() + 7);
  document.getElementById('fe').value    = d.toISOString().split('T')[0];
  document.getElementById('fn').value    = '';
  document.getElementById('fq').value    = '1';
  document.getElementById('fw').value    = '';
  document.getElementById('fstorage').value = currentStorage;
  currentIcon = 'grocery-100.svg'; currentIconCat = 'other';
  const prev = document.getElementById('icon-preview');
  prev.innerHTML = renderIcon('grocery-100.svg'); prev.style.background = 'var(--bg-sunken)'; prev.style.borderStyle = 'dashed';
  document.getElementById('ficon').value = 'grocery-100.svg';
  document.getElementById('fc').value    = 'other';
  document.getElementById('modal').classList.add('open');
}
function closeMod(e) { if (!e || e.target === document.getElementById('modal')) document.getElementById('modal').classList.remove('open'); }

function addProd() {
  const n = document.getElementById('fn').value.trim();
  const e = document.getElementById('fe').value;
  const q = parseInt(document.getElementById('fq').value) || 1;
  const c = document.getElementById('fc').value;
  const u = document.getElementById('fu').value;
  const icon    = document.getElementById('ficon').value || 'grocery-100.svg';
  const storage = document.getElementById('fstorage').value || 'fridge';
  const fwVal   = parseFloat(document.getElementById('fw').value);
  const fwUnit  = document.getElementById('fwu').value || 'г';
  if (!n || !e) { alert('Вкажіть назву та термін'); return; }

  const prod = { id: nid++, name: n, cat: c, icon, exp: e, qty: q, unit: u, storage, used: 0, wasted: 0, brand: '' };
  if (fwVal && !isNaN(fwVal)) { prod.weight = fwVal; prod.weightUnit = fwUnit; }

  prods.push(prod);
  document.getElementById('modal').classList.remove('open');
  genRecipes = []; renderFridge(); renderAlerts();
  const dupes = prods.filter(p => p.name.toLowerCase() === n.toLowerCase()).length;
  toast(dupes > 1 ? `${renderIcon(icon)} "${n}" додано (${dupes} партії)` : `${renderIcon(icon)} "${n}" додано`);
  saveData();
}

// ===== ICON PICKER =====
function autoIcon(val) {
  if (!val) return;
  const words = val.toLowerCase().split(/[\s,.-]+/);
  for (const w of words) {
    if (w.length < 2) continue;
    if (KEYWORD_MAP[w]) { setIcon(KEYWORD_MAP[w].emoji, KEYWORD_MAP[w].cat); return; }
    for (const key of Object.keys(KEYWORD_MAP)) {
      if (key.startsWith(w) || w.startsWith(key)) { setIcon(KEYWORD_MAP[key].emoji, KEYWORD_MAP[key].cat); return; }
    }
  }
}
function setIcon(emoji, cat) {
  currentIcon = emoji; currentIconCat = cat || 'other';
  const prev = document.getElementById('icon-preview');
  prev.innerHTML = renderIcon(emoji);
  document.getElementById('ficon').value = emoji;
  document.getElementById('fc').value    = cat || 'other';
  prev.style.background  = CLRS[cat] || CLRS.other;
  prev.style.borderStyle = 'solid';
  
  const cGroup = CAT_GROUPS.find(g => g.key === (cat || 'other'));
  if (cGroup && cGroup.shelfLife) {
    const d = new Date(); d.setDate(d.getDate() + cGroup.shelfLife);
    document.getElementById('fe').value = d.toISOString().split('T')[0];
  }
}
function openIconPicker() {
  activeCat = 'all';
  document.getElementById('icon-modal').classList.add('open');
  document.getElementById('icon-search').value = '';
  renderIconCats(); renderIconGrid(ICON_DB);
  setTimeout(() => document.getElementById('icon-search').focus(), 300);
}
function closeIconPicker(e) { if (!e || e.target === document.getElementById('icon-modal')) document.getElementById('icon-modal').classList.remove('open'); }
function renderIconCats() {
  document.getElementById('icon-cats').innerHTML = ICON_CATS.map(c =>
    `<div onclick="filterByCat('${c.key}')" style="padding:5px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;cursor:pointer;flex-shrink:0;
      background:${activeCat===c.key?'var(--accent)':'var(--bg-sunken)'};
      color:${activeCat===c.key?'#fff':'var(--text-2)'}">${c.label}</div>`
  ).join('');
}
function filterByCat(cat) { activeCat = cat; renderIconCats(); filterIcons(document.getElementById('icon-search').value); }
function filterIcons(q) {
  const lower = q.toLowerCase();
  let list = activeCat !== 'all' ? ICON_DB.filter(i => i[2] === activeCat) : ICON_DB;
  if (lower) list = list.filter(i => (i[1]+' '+i[3]).toLowerCase().includes(lower));
  renderIconGrid(list);
}
function renderIconGrid(list) {
  const seen = new Set();
  const unique = list.filter(i => { if (seen.has(i[0])) return false; seen.add(i[0]); return true; });
  document.getElementById('icon-grid').innerHTML = unique.map(([emoji, name, cat]) =>
    `<div onclick="pickIcon('${emoji}','${cat}')" title="${name}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 4px;border-radius:10px;cursor:pointer;gap:2px;background:${currentIcon===emoji?'var(--bg-sunken)':'transparent'};border:1.5px solid ${currentIcon===emoji?'var(--accent)':'transparent'}">
      <div style="font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;">${renderIcon(emoji)}</div>
      <span style="font-size:8px;color:var(--text-2);text-align:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name.slice(0,9)}</span>
    </div>`
  ).join('');
}
function pickIcon(emoji, cat) { setIcon(emoji, cat); document.getElementById('icon-modal').classList.remove('open'); }

// ===== STARTUP =====
applyDark();
renderFridge();
renderAlerts();
requestAnimationFrame(() => updateIndicator('fridge'));
