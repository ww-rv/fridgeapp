// ===== TELEGRAM INIT =====
const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.expand(); tg.ready(); }

// ===== SVG ICONS =====
const SVG = {
  scan:   `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>`,
  plus:   `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  check:  `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4L19 7"/></svg>`,
  close:  `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  cart:   `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.5 12h12L22 8H7"/></svg>`,
  spark:  `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></svg>`,
  pen:    `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  sun:    `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>`,
  moon:   `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

// ===== UTILITIES =====
function days(e) {
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.round((new Date(e) - t) / 864e5);
}
function scls(d) { return d < 0 ? 'danger' : d <= 2 ? 'warn' : 'ok'; }
function slbl(d) {
  if (d < 0) return 'прострочено';
  if (d === 0) return 'сьогодні';
  if (d === 1) return 'завтра';
  return 'днів';
}
function prodIcon(p)  { return p.icon || ICONS[p.cat] || '📦'; }
function prodColor(p) { return CLRS[p.cat] || CLRS.other; }

// ===== TOAST =====
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('on'), 2800);
}

// ===== DARK MODE =====
let darkMode = localStorage.getItem('dark') === '1';
function applyDark() {
  document.body.classList.toggle('dark', darkMode);
  document.getElementById('dark-btn').innerHTML = darkMode ? SVG.sun : SVG.moon;
}
function toggleDark() {
  darkMode = !darkMode;
  localStorage.setItem('dark', darkMode ? '1' : '0');
  applyDark();
}

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
  const newScreen = document.getElementById('tab-' + tab);
  newScreen.classList.add('active');

  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab)
  );
  updateIndicator(tab);

  // FAB only on Продукти tab
  document.getElementById('fab-wrap').style.display = tab === 'fridge' ? '' : 'none';
  closeFab();

  if (tab === 'fridge')  renderFridge();
  if (tab === 'alerts')  renderAlerts();
  if (tab === 'recipes') renderRecipes();
  if (tab === 'stats')   renderStats();
  if (tab === 'shop')    renderShop();
}

function updSum() {
  const expired = prods.filter(p => days(p.exp) < 0).length;
  const soon    = prods.filter(p => days(p.exp) >= 0 && days(p.exp) <= 2).length;
  let t = `${prods.length} продуктів`;
  if (expired) t += ` · ${expired} прострочено`;
  if (!expired && soon) t += ` · ${soon} скоро`;
  document.getElementById('sline').textContent = t;
  // update alerts badge
  const al = prods.filter(p => days(p.exp) <= 3).length;
  document.getElementById('abadge').textContent = al ? al : '';
  document.getElementById('abadge').style.display = al ? '' : 'none';
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
// Після дії на картці в today rail — ховаємо її до наступного оновлення
const dismissedFromRail = new Set();

function consumeFromRail(id) {
  dismissedFromRail.add(id);
  consumeCard(id);
}

function shopFromRail(id) {
  dismissedFromRail.add(id);
  shopCard(id);
  renderFridge();
}

// ===== QUICK ACTIONS (long press) =====
let qaTarget = null;
function openQuickActions(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  qaTarget = p;
  navigator.vibrate && navigator.vibrate(10);
  const d = days(p.exp);
  document.getElementById('quick-menu').innerHTML = `
    <div class="quick-prod">
      <div class="quick-thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
      <div style="flex:1;min-width:0">
        <div class="quick-name">${p.name}</div>
        <div class="quick-meta">${p.qty}${p.unit}${p.brand ? ' · ' + p.brand : ''}</div>
      </div>
      <div class="quick-exp">
        <div class="expiry-num ${scls(d)}">${d < 0 ? `−${Math.abs(d)}` : d}</div>
        <div class="expiry-unit">${slbl(d)}</div>
      </div>
    </div>
    <div class="qa-title">Швидкі дії</div>
    <div class="qa-grid">
      <button class="qa-btn ok" onclick="qaConsume()">
        ${SVG.check}<span>Спожив</span>
      </button>
      <button class="qa-btn accent" onclick="qaToShop()">
        ${SVG.cart}<span>В список</span>
      </button>
      <button class="qa-btn warn" onclick="closeQuickActions();sw('recipes')">
        ${SVG.spark}<span>Рецепт</span>
      </button>
      <button class="qa-btn danger" onclick="qaDelete()">
        ${SVG.close}<span>Видали</span>
      </button>
    </div>`;
  document.getElementById('quick-overlay').classList.add('on');
}

function closeQuickActions() {
  document.getElementById('quick-overlay').classList.remove('on');
  qaTarget = null;
}

function qaConsume() {
  if (!qaTarget) return;
  consumeCard(qaTarget.id);
  closeQuickActions();
}
function qaToShop() {
  if (!qaTarget) return;
  shopCard(qaTarget.id);
  closeQuickActions();
}
function qaDelete() {
  if (!qaTarget) return;
  delCard(qaTarget.id);
  closeQuickActions();
}

// ===== CARD ACTIONS (used by swipe + quick actions) =====
function consumeCard(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  p.qty = Math.max(0, p.qty - 1);
  p.used = (p.used || 0) + 1;
  if (p.qty <= 0) {
    const nm = p.name;
    prods = prods.filter(x => x.id !== id);
    dismissedFromRail.delete(id); // продукт видалено — прибрати з dismissed
    if (!shop.find(s => s.name.toLowerCase() === nm.toLowerCase()))
      shop.push({ id: nshop++, name: nm, note: 'закінчився', done: false });
    toast(`"${nm}" → список покупок`);
  } else {
    toast(`✓ Спожито: ${p.name}`);
  }
  genRecipes = [];
  renderFridge(); renderAlerts(); saveData();
}

function shopCard(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  if (!shop.find(s => s.name.toLowerCase() === p.name.toLowerCase()))
    shop.push({ id: nshop++, name: p.name, note: '', done: false });
  toast(`🛒 "${p.name}" в список`);
  renderShop(); saveData();
}

function delCard(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  prods = prods.filter(x => x.id !== id);
  genRecipes = [];
  toast(`Видалено: ${p.name}`);
  renderFridge(); renderAlerts(); saveData();
}

// ===== SWIPE INIT =====
function initSwipes() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    if (card._swipeInit) return;
    card._swipeInit = true;
    let sx = 0, dx = 0, active = false;

    function start(e) {
      if (e.target.closest('button')) return;
      const t = e.touches ? e.touches[0] : e;
      sx = t.clientX; dx = 0; active = true;
      card.style.transition = 'none';
    }
    function move(e) {
      if (!active) return;
      const t = e.touches ? e.touches[0] : e;
      dx = Math.min(0, Math.max(-162, t.clientX - sx));
      card.style.transform = `translateX(${dx}px)`;
    }
    function end() {
      if (!active) return;
      active = false;
      card.style.transition = 'transform .3s var(--ease)';
      card.style.transform = dx < -80 ? 'translateX(-162px)' : 'translateX(0)';
    }

    card.addEventListener('touchstart', start, { passive: true });
    card.addEventListener('touchmove',  move,  { passive: true });
    card.addEventListener('touchend',   end);
  });
}

function initLongPress() {
  document.querySelectorAll('.card[data-id]').forEach(card => {
    if (card._lpInit) return;
    card._lpInit = true;
    const id = parseInt(card.dataset.id);
    let timer = null;
    const start = () => { timer = setTimeout(() => openQuickActions(id), 480); };
    const clear = () => { if (timer) { clearTimeout(timer); timer = null; } };
    card.addEventListener('touchstart',  start, { passive: true });
    card.addEventListener('touchend',    clear);
    card.addEventListener('touchmove',   clear);
    card.addEventListener('touchcancel', clear);
  });
}

// Event delegation for swipe action buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.swipe-act');
  if (!btn) return;
  const id  = parseInt(btn.dataset.id);
  const wrap = btn.closest('.card-wrap');
  const card = wrap && wrap.querySelector('.card');

  if (btn.classList.contains('used'))  consumeCard(id);
  else if (btn.classList.contains('shop')) shopCard(id);
  else if (btn.classList.contains('del'))  delCard(id);

  if (card) { card.style.transition = 'transform .25s var(--ease)'; card.style.transform = 'translateX(0)'; }
});

// ===== FRIDGE RENDERING =====
function renderFridge() {
  const el = document.getElementById('tab-fridge');
  if (!prods.length) {
    el.innerHTML = `<div class="empty"><div class="ill">🧊</div>
      <div class="t">Холодильник порожній</div>
      <div class="d">Натисніть + щоб додати продукт<br>або відскануйте штрихкод</div></div>`;
    updSum(); return;
  }

  const sorted  = [...prods].sort((a, b) => days(a.exp) - days(b.exp));
  const expired = sorted.filter(p => days(p.exp) < 0);
  const soon    = sorted.filter(p => { const d = days(p.exp); return d >= 0 && d <= 2; });
  const ok      = sorted.filter(p => days(p.exp) > 2);
  const atRisk  = [...expired, ...soon].filter(p => !dismissedFromRail.has(p.id)).slice(0, 5);

  const freshPct = prods.length
    ? Math.round(prods.filter(p => days(p.exp) > 0).length / prods.length * 100)
    : 100;

  let h = `<div class="hero" style="--p:${freshPct}">
    <div class="hero-ring"><span>${prods.length}</span></div>
    <div class="hero-meta">
      <div class="hero-title">мій холодильник</div>
      <div class="hero-num">
        ${prods.length} продуктів
        ${expired.length ? `· <strong>${expired.length} прострочено</strong>` : ''}
        ${!expired.length && soon.length ? `· <em>${soon.length} скоро</em>` : ''}
      </div>
    </div>
    <button class="hero-cta" onclick="openScan()">${SVG.scan} Scan</button>
  </div>`;

  if (atRisk.length) {
    h += `<div class="today-rail">${atRisk.map(p => {
      const dd = days(p.exp);
      const isDanger = dd < 0;
      return `<div class="today-card ${isDanger ? 'danger' : ''}">
        <div class="tc-row">
          <div class="tc-thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
          <div style="min-width:0">
            <div class="tc-label">${isDanger ? 'прострочено' : dd === 0 ? 'сьогодні' : dd === 1 ? 'завтра' : `за ${dd} дні`}</div>
            <div class="tc-title">${p.name}</div>
          </div>
        </div>
        <div class="tc-big">${isDanger ? `−${Math.abs(dd)}` : dd}<span style="font-size:13px;opacity:.6;margin-left:3px">дн.</span></div>
        <div class="tc-actions">
          <button class="ghost-btn" onclick="shopFromRail(${p.id})">В список</button>
          <button class="solid-btn" onclick="consumeFromRail(${p.id})">Спожив</button>
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  if (expired.length) {
    h += `<div class="sec danger">Прострочені <span class="sec-count">${expired.length}</span></div>`;
    expired.forEach(p => h += ph(p));
  }
  if (soon.length) {
    h += `<div class="sec warn">Закінчується <span class="sec-count">${soon.length}</span></div>`;
    soon.forEach(p => h += ph(p));
  }
  if (ok.length) {
    h += `<div class="sec">Свіжі <span class="sec-count">${ok.length}</span></div>`;
    ok.forEach(p => h += ph(p));
  }

  el.innerHTML = h + '<div style="height:20px"></div>';
  updSum();
  requestAnimationFrame(() => { initSwipes(); initLongPress(); });
}

function ph(p) {
  const d  = days(p.exp);
  const n  = d < 0 ? `−${Math.abs(d)}` : String(d);
  const lbl = slbl(d);
  const dupe = prods.filter(x => x.name.toLowerCase() === p.name.toLowerCase()).length > 1;
  return `<div class="card-wrap">
    <div class="card-swipe-actions">
      <button class="swipe-act used" data-id="${p.id}">${SVG.check}<span>Спожив</span></button>
      <button class="swipe-act shop" data-id="${p.id}">${SVG.cart}<span>В список</span></button>
      <button class="swipe-act del"  data-id="${p.id}">${SVG.close}<span>Видали</span></button>
    </div>
    <div class="card" data-id="${p.id}">
      <div class="thumb" style="background:${prodColor(p)}">${prodIcon(p)}</div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="meta">
          <span>${p.brand || CAT_NAME[p.cat] || 'Інше'}</span>
          <span class="dot"></span><span>${p.qty}${p.unit}</span>
          <span class="dot"></span><span>до ${p.exp.split('-').reverse().join('.')}</span>
          ${dupe ? `<span class="dot"></span><span style="color:var(--text-3)">окрема партія</span>` : ''}
        </div>
      </div>
      <div class="expiry">
        <div class="expiry-num ${scls(d)}">${n}</div>
        <div class="expiry-unit">${lbl}</div>
      </div>
    </div>
  </div>`;
}

// ===== ALERTS =====
function renderAlerts() {
  const el = document.getElementById('tab-alerts');
  const al = prods.filter(p => days(p.exp) <= 3).sort((a, b) => days(a.exp) - days(b.exp));
  updSum();
  if (!al.length) {
    el.innerHTML = `<div class="empty"><div class="ill">✅</div>
      <div class="t">Все під контролем</div>
      <div class="d">Жоден продукт не вимагає уваги</div></div>`;
    return;
  }
  el.innerHTML = `<div class="sec">Потребують уваги <span class="sec-count">${al.length}</span></div>` +
    al.map(p => {
      const d = days(p.exp);
      const c = d < 0 ? 'danger' : 'warn';
      return `<div class="alert ${c}">
        <div class="mini-emoji">${prodIcon(p)}</div>
        <div class="atag">${d < 0 ? `−${Math.abs(d)} днів` : d === 0 ? 'сьогодні' : d === 1 ? 'завтра' : `${d} дні`}</div>
        <h3>${p.name}</h3>
        <p>${d < 0 ? `Прострочений ${Math.abs(d)} дн. тому. Перевірте перед використанням.`
          : `Залишилось: ${p.qty}${p.unit}${p.brand ? ' · ' + p.brand : ''}. Використайте найближчим часом.`}</p>
        <div class="btn-row">
          <button class="btn ghost" onclick="consumeCard(${p.id})">Спожив</button>
          <button class="btn primary" onclick="sw('recipes')">Рецепт ✨</button>
        </div>
      </div>`;
    }).join('') + '<div style="height:20px"></div>';
}

// ===== STATS =====
function renderStats() {
  const el    = document.getElementById('tab-stats');
  const total = prods.length;
  const exp   = prods.filter(p => days(p.exp) < 0).length;
  const tU    = prods.reduce((s, p) => s + (p.used   || 0), 0);
  const tW    = prods.reduce((s, p) => s + (p.wasted || 0), 0);
  const wp    = tU + tW > 0 ? Math.round(tW / (tU + tW) * 100) : 0;
  const byU   = [...prods].sort((a, b) => (b.used || 0) - (a.used || 0));
  const maxU  = byU[0] ? (byU[0].used || 1) : 1;
  const catU  = {};
  prods.forEach(p => { catU[p.cat] = (catU[p.cat] || 0) + (p.used || 0); });
  const catA  = Object.entries(catU).sort((a, b) => b[1] - a[1]);
  const maxC  = catA[0] ? catA[0][1] : 1;

  el.innerHTML = `
  <div class="sec">Огляд</div>
  <div class="kpi-grid">
    <div class="kpi accent">
      <div class="kicon">🧊</div>
      <div class="klbl">Продуктів</div>
      <div class="kval popin">${total}</div>
      <div class="kdelta">у холодильнику</div>
    </div>
    <div class="kpi">
      <div class="kicon">✓</div>
      <div class="klbl">Використано</div>
      <div class="kval popin">${tU}</div>
      <div class="kdelta">всього спожито</div>
    </div>
    <div class="kpi">
      <div class="kicon">⚠</div>
      <div class="klbl">Прострочено</div>
      <div class="kval popin" style="color:var(--danger)">${exp}</div>
      <div class="kdelta neg">${exp > 0 ? 'потребує уваги' : 'все свіже'}</div>
    </div>
    <div class="kpi">
      <div class="kicon">📉</div>
      <div class="klbl">% пропало</div>
      <div class="kval popin" style="color:${wp > 20 ? 'var(--danger)' : wp > 10 ? 'var(--warn)' : 'var(--ok)'}">${wp}%</div>
      <div class="kdelta ${wp > 10 ? 'neg' : ''}">${wp <= 10 ? 'чудовий результат' : 'покращуйте'}</div>
    </div>
  </div>
  <div class="streak">
    <div class="flame">🔥</div>
    <div style="flex:1">
      <div class="st">Серія без втрат</div>
      <div class="sv">12 днів</div>
      <div class="ssub">Нічого не пропало. Так тримати!</div>
    </div>
  </div>
  <div class="sec" style="margin-top:16px">Найчастіше використовуєте</div>
  <div class="bar-card">
    ${byU.slice(0, 5).map((p, i) => `<div class="brow">
      <div class="blbl">
        <div class="mini" style="background:${prodColor(p)}">${prodIcon(p)}</div>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</span>
      </div>
      <div class="btrack"><div class="bfill" style="width:${Math.round((p.used||0)/maxU*100)}%;background:${BCOLS[i%BCOLS.length]}"></div></div>
      <div class="bnum">${p.used || 0}</div>
    </div>`).join('')}
  </div>
  <div class="sec">По категоріях</div>
  <div class="bar-card">
    ${catA.map(([k, v], i) => `<div class="brow">
      <div class="blbl">
        <div class="mini">${ICONS[k]}</div>
        <span>${CAT_NAME[k] || k}</span>
      </div>
      <div class="btrack"><div class="bfill" style="width:${Math.round(v/maxC*100)}%;background:${BCOLS[i%BCOLS.length]}"></div></div>
      <div class="bnum">${v}</div>
    </div>`).join('')}
  </div>
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
    h += `<div class="sec">Купити <span class="sec-count">${active.length}</span></div>`;
    active.forEach(s => h += shopRow(s));
  }
  if (done.length) {
    h += `<div class="sec">Куплено</div>`;
    done.forEach(s => h += shopRow(s));
  }
  if (!shop.length) {
    h += `<div class="empty"><div class="ill">🛒</div>
      <div class="t">Список порожній</div>
      <div class="d">Додайте товари або свайпніть ліворуч<br>по картці продукту</div></div>`;
  }
  el.innerHTML = h + '<div style="height:20px"></div>';
}

function shopRow(s) {
  return `<div class="shop-row ${s.done ? 'done' : ''}">
    <div class="chk" onclick="togS(${s.id})">${s.done ? '✓' : ''}</div>
    <span class="sname">${s.name}</span>
    ${s.note ? `<span class="cat-tag">${s.note}</span>` : ''}
    <button class="sdel" onclick="delS(${s.id})">×</button>
  </div>`;
}

function addShopItem(e) {
  e.preventDefault();
  const inp = document.getElementById('shop-input');
  const v = inp.value.trim();
  if (!v) return;
  shop.push({ id: nshop++, name: v, note: '', done: false });
  inp.value = '';
  renderShop(); saveData();
}

function togS(id) {
  const s = shop.find(x => x.id === id);
  if (s) s.done = !s.done;
  renderShop(); saveData();
}
function delS(id) {
  shop = shop.filter(x => x.id !== id);
  renderShop(); saveData();
}

// ===== ADD PRODUCT MODAL =====
let currentIcon = '📦', currentIconCat = 'other', activeCat = 'all';

function openMod() {
  closeFab();
  const d = new Date(); d.setDate(d.getDate() + 7);
  document.getElementById('fe').value = d.toISOString().split('T')[0];
  document.getElementById('fn').value = '';
  document.getElementById('fq').value = '1';
  currentIcon = '📦'; currentIconCat = 'other';
  const prev = document.getElementById('icon-preview');
  prev.textContent = '📦';
  prev.style.background  = 'var(--bg-sunken)';
  prev.style.borderStyle = 'dashed';
  document.getElementById('ficon').value = '📦';
  document.getElementById('fc').value    = 'other';
  document.getElementById('modal').classList.add('open');
}

function closeMod(e) {
  if (!e || e.target === document.getElementById('modal'))
    document.getElementById('modal').classList.remove('open');
}

function addProd() {
  const n    = document.getElementById('fn').value.trim();
  const e    = document.getElementById('fe').value;
  const q    = parseInt(document.getElementById('fq').value) || 1;
  const c    = document.getElementById('fc').value;
  const u    = document.getElementById('fu').value;
  const icon = document.getElementById('ficon').value || '📦';
  if (!n || !e) { alert('Вкажіть назву та термін'); return; }

  prods.push({ id: nid++, name: n, cat: c, icon, exp: e, qty: q, unit: u, used: 0, wasted: 0, brand: '' });
  document.getElementById('modal').classList.remove('open');
  genRecipes = [];
  renderFridge(); renderAlerts();

  const dupes = prods.filter(p => p.name.toLowerCase() === n.toLowerCase()).length;
  toast(dupes > 1 ? `${icon} "${n}" додано (${dupes} партії)` : `${icon} "${n}" додано`);
  saveData();
}

function openShopModal() {
  const n = prompt('Товар для списку:');
  if (n && n.trim()) { shop.push({ id: nshop++, name: n.trim(), note: '', done: false }); renderShop(); saveData(); }
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
  prev.textContent = emoji;
  document.getElementById('ficon').value = emoji;
  document.getElementById('fc').value    = cat || 'other';
  prev.style.background  = CLRS[cat] || CLRS.other;
  prev.style.borderStyle = 'solid';
}

function openIconPicker() {
  activeCat = 'all';
  document.getElementById('icon-modal').classList.add('open');
  document.getElementById('icon-search').value = '';
  renderIconCats(); renderIconGrid(ICON_DB);
  setTimeout(() => document.getElementById('icon-search').focus(), 300);
}

function closeIconPicker(e) {
  if (!e || e.target === document.getElementById('icon-modal'))
    document.getElementById('icon-modal').classList.remove('open');
}

function renderIconCats() {
  document.getElementById('icon-cats').innerHTML = ICON_CATS.map(c =>
    `<div onclick="filterByCat('${c.key}')" style="
      padding:5px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;cursor:pointer;
      background:${activeCat===c.key?'var(--accent)':'var(--bg-sunken)'};
      color:${activeCat===c.key?'#fff':'var(--text-2)'};flex-shrink:0
    ">${c.label}</div>`
  ).join('');
}

function filterByCat(cat) {
  activeCat = cat; renderIconCats();
  filterIcons(document.getElementById('icon-search').value);
}

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
    `<div onclick="pickIcon('${emoji}','${cat}')" title="${name}" style="
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      padding:8px 4px;border-radius:10px;cursor:pointer;gap:2px;
      background:${currentIcon===emoji?'var(--bg-sunken)':'transparent'};
      border:1.5px solid ${currentIcon===emoji?'var(--accent)':'transparent'};
    ">
      <span style="font-size:22px;line-height:1">${emoji}</span>
      <span style="font-size:8px;color:var(--text-2);text-align:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name.slice(0,8)}</span>
    </div>`
  ).join('');
}

function pickIcon(emoji, cat) {
  setIcon(emoji, cat);
  document.getElementById('icon-modal').classList.remove('open');
}

// ===== STARTUP =====
applyDark();
renderFridge();
renderAlerts();
requestAnimationFrame(() => updateIndicator('fridge'));
