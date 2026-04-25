// ===== RECIPE GENERATION WITH AI PROVIDERS =====

let genRecipes       = [];
let selectedProvider = localStorage.getItem('ai_provider') || null;

function hasKey(p) { return !!localStorage.getItem(`ai_key_${p}`); }

// Auto-paste when user returns from provider site (copied key in clipboard)
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState !== 'visible') return;
  const modal = document.getElementById('ai-key-modal');
  if (!modal || !modal.classList.contains('open')) return;
  const input = document.getElementById('ai-key-input');
  if (!input || input.value.trim()) return; // don't overwrite
  try {
    const text = (await navigator.clipboard.readText()).trim();
    if (looksLikeKey(text)) {
      input.value = text;
      toast('📋 Ключ знайдено у буфері обміну');
    }
  } catch(e) { /* clipboard permission denied — silent */ }
});

function looksLikeKey(t) {
  return t.length > 20 && (t.startsWith('sk-') || t.startsWith('AIzaSy') || /^[A-Za-z0-9\-_]{30,}$/.test(t));
}

// ---- Render recipes tab ----
function renderRecipes() {
  const el = document.getElementById('tab-recipes');

  const fridgeList = prods.length
    ? prods.map(p => `${prodIcon(p)} ${p.name} (${p.qty}${p.unit})`).join(', ')
    : 'Порожньо';

  const providerCards = Object.entries(AI_PROVIDERS).map(([key, cfg]) => {
    const connected = hasKey(key);
    const active    = selectedProvider === key;
    return `
    <div class="ai-connect-card ${active ? 'active' : ''}" onclick="activateProvider('${key}')">
      <div class="ai-connect-icon">${cfg.icon}</div>
      <div class="ai-connect-name">${cfg.name}</div>
      ${connected
        ? `<div class="ai-connect-status connected">✓ Підключено</div>
           <button class="ai-login-btn connected" onclick="event.stopPropagation();openLoginModal('${key}')">Змінити</button>`
        : `<div class="ai-connect-status">Не підключено</div>
           <button class="ai-login-btn" onclick="event.stopPropagation();openLoginModal('${key}')">Увійти →</button>`
      }
    </div>`;
  }).join('');

  const ready = selectedProvider && hasKey(selectedProvider);
  const actionArea = ready
    ? `<div class="recipe-cats">
        ${RECIPE_CATS.map(c =>
          `<button class="recipe-cat-btn" onclick="genByCategory('${c.key}')">
            ${c.icon} ${c.label}
          </button>`
        ).join('')}
       </div>
       <div class="recipe-custom-row">
         <input id="recipe-custom-input" placeholder="або напишіть свій запит..." type="text"/>
         <button onclick="genCustomRecipe()">✨</button>
       </div>`
    : selectedProvider && !hasKey(selectedProvider)
    ? `<div class="ai-need-login">
        <p>Увійдіть у ${AI_PROVIDERS[selectedProvider].name} щоб генерувати рецепти</p>
        <button class="ai-login-big-btn" onclick="openLoginModal('${selectedProvider}')">
          ${AI_PROVIDERS[selectedProvider].icon} Увійти в ${AI_PROVIDERS[selectedProvider].name}
        </button>
       </div>`
    : `<div class="ai-need-login"><p>Оберіть та підключіть AI провайдер</p></div>`;

  el.innerHTML = `
    <div class="stitle" style="margin-top:4px">В холодильнику</div>
    <div style="background:var(--color-background-secondary);border-radius:10px;padding:9px;margin-bottom:12px;font-size:11px;color:var(--color-text-secondary);line-height:1.6">${fridgeList}</div>

    <div class="stitle">AI Провайдер</div>
    <div class="ai-connect-row">${providerCards}</div>

    ${actionArea}

    <div id="recipe-res">${genRecipes.length ? rcards() : ''}</div>
    <div style="height:80px"></div>
  `;
}

function activateProvider(key) {
  selectedProvider = key;
  localStorage.setItem('ai_provider', key);
  genRecipes = [];
  renderRecipes();
}

// ---- Login modal: step-by-step guide + auto-paste ----
function openLoginModal(provider) {
  selectedProvider = provider;
  localStorage.setItem('ai_provider', provider);
  const cfg = AI_PROVIDERS[provider];
  const existingKey = localStorage.getItem(`ai_key_${provider}`) || '';

  document.getElementById('ai-key-modal-inner').innerHTML = `
    <div style="text-align:center;margin-bottom:14px">
      <div style="font-size:36px;margin-bottom:4px">${cfg.icon}</div>
      <div style="font-size:16px;font-weight:700;color:var(--color-text-primary)">Підключення до ${cfg.name}</div>
    </div>

    <button class="ai-open-site-btn" onclick="openProviderSite('${provider}')">
      🔗 &nbsp;Відкрити ${cfg.name} для входу
    </button>

    <div class="ai-steps-block">
      ${cfg.steps.map((s, i) => `
        <div class="ai-step-row">
          <div class="ai-step-num">${i + 1}</div>
          <div class="ai-step-text">${s}</div>
        </div>`).join('')}
    </div>

    <div style="margin-top:14px">
      <label style="font-size:11px;color:var(--color-text-secondary);display:block;margin-bottom:4px">API ключ</label>
      <div class="ai-key-input-row">
        <input type="password" id="ai-key-input"
          placeholder="${cfg.placeholder}"
          value="${existingKey}"
          style="-webkit-user-select:text;user-select:text"/>
        <button class="ai-paste-btn" onclick="pasteKey()" title="Вставити з буфера">📋</button>
      </div>
    </div>

    <p style="font-size:10px;color:var(--color-text-tertiary);margin:8px 0 14px">
      🔒 Ключ зберігається тільки на вашому пристрої
    </p>

    <button class="bok-btn" style="width:100%;margin-bottom:8px;padding:12px;font-size:14px"
      onclick="saveAiKey('${provider}')">
      ✓ Підключити
    </button>
    <button class="cncl-btn" style="width:100%" onclick="closeAiKeyModal()">Скасувати</button>
    ${existingKey
      ? `<button style="width:100%;margin-top:8px;background:none;border:none;font-size:11px;color:#A32D2D;cursor:pointer;padding:4px"
           onclick="disconnectProvider('${provider}')">Відключити ${cfg.name}</button>`
      : ''}
  `;

  document.getElementById('ai-key-modal').classList.add('open');
  setTimeout(() => {
    const input = document.getElementById('ai-key-input');
    if (input && !input.value) tryAutoPaste();
  }, 400);
}

function openProviderSite(provider) {
  const url = AI_PROVIDERS[provider].loginUrl;
  const tg  = window.Telegram && window.Telegram.WebApp;
  if (tg) tg.openLink(url);
  else window.open(url, '_blank');
}

async function tryAutoPaste() {
  try {
    const text = (await navigator.clipboard.readText()).trim();
    if (looksLikeKey(text)) {
      const input = document.getElementById('ai-key-input');
      if (input && !input.value) {
        input.value = text;
        toast('📋 Ключ знайдено у буфері обміну');
      }
    }
  } catch(e) { /* silent */ }
}

async function pasteKey() {
  try {
    const text = (await navigator.clipboard.readText()).trim();
    if (text) {
      document.getElementById('ai-key-input').value = text;
      toast('📋 Вставлено');
    }
  } catch(e) {
    document.getElementById('ai-key-input').focus();
  }
}

function closeAiKeyModal(e) {
  if (e && e.target !== document.getElementById('ai-key-modal')) return;
  document.getElementById('ai-key-modal').classList.remove('open');
}

function saveAiKey(provider) {
  const key = (document.getElementById('ai-key-input').value || '').trim();
  if (!key) { toast('Введіть або вставте API ключ'); return; }
  localStorage.setItem(`ai_key_${provider}`, key);
  selectedProvider = provider;
  localStorage.setItem('ai_provider', provider);
  document.getElementById('ai-key-modal').classList.remove('open');
  toast(`✅ ${AI_PROVIDERS[provider].name} підключено`);
  genRecipes = [];
  renderRecipes();
}

function disconnectProvider(provider) {
  localStorage.removeItem(`ai_key_${provider}`);
  if (selectedProvider === provider) { selectedProvider = null; localStorage.removeItem('ai_provider'); }
  document.getElementById('ai-key-modal').classList.remove('open');
  genRecipes = [];
  renderRecipes();
}

// ---- Generate by category ----
async function genByCategory(category) {
  if (!selectedProvider || !hasKey(selectedProvider)) { openLoginModal(selectedProvider || 'claude'); return; }
  if (!prods.length) { toast('Спочатку додайте продукти'); return; }

  document.querySelectorAll('.recipe-cat-btn').forEach(b => b.classList.add('loading'));
  const resEl = document.getElementById('recipe-res');
  resEl.innerHTML = loadingHtml();

  try {
    const text = await callAI(selectedProvider, buildPrompt(category));
    genRecipes = parseRecipes(text);
    resEl.innerHTML = genRecipes.length ? rcards() : '<div class="empty">AI не повернув рецепти. Спробуйте ще раз.</div>';
  } catch(e) {
    resEl.innerHTML = buildErrorHtml(e);
  } finally {
    document.querySelectorAll('.recipe-cat-btn').forEach(b => b.classList.remove('loading'));
  }
}

async function genCustomRecipe() {
  if (!selectedProvider || !hasKey(selectedProvider)) { openLoginModal(selectedProvider || 'claude'); return; }
  if (!prods.length) { toast('Спочатку додайте продукти'); return; }
  const input = document.getElementById('recipe-custom-input');
  const resEl = document.getElementById('recipe-res');
  resEl.innerHTML = loadingHtml();
  try {
    const text = await callAI(selectedProvider, buildPrompt(input ? input.value.trim() || 'будь-яку страву' : 'будь-яку страву'));
    genRecipes = parseRecipes(text);
    resEl.innerHTML = genRecipes.length ? rcards() : '<div class="empty">AI не повернув рецепти. Спробуйте ще раз.</div>';
    if (input) input.value = '';
  } catch(e) {
    resEl.innerHTML = buildErrorHtml(e);
  }
}

function loadingHtml() {
  const icon = selectedProvider ? AI_PROVIDERS[selectedProvider].icon : '✨';
  return `<div style="text-align:center;padding:28px;color:var(--color-text-secondary);font-size:12px">
    <div style="font-size:28px;margin-bottom:8px">${icon}</div>
    Генеруємо рецепти<br>
    <span class="dots"><span>.</span><span>.</span><span>.</span></span>
  </div>`;
}

function buildPrompt(category) {
  const items  = prods.map(p => `${p.name} (${p.qty}${p.unit})`).join(', ');
  const urgent = prods.filter(p => days(p.exp) <= 3).map(p => p.name).join(', ');
  return `У мене є такі продукти в холодильнику: ${items}.${urgent ? ` Терміново потрібно використати: ${urgent}.` : ''}
Запропонуй 2-3 рецепти категорії "${category}" з цих інгредієнтів.
Відповідай ТІЛЬКИ валідним JSON-масивом без markdown-блоків:
[{"title":"назва","time":"15 хв","difficulty":"легко","tags":["тег"],"steps":"1. Крок.\n2. Крок."},...]`;
}

function parseRecipes(text) {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const start = cleaned.indexOf('[');
    const end   = cleaned.lastIndexOf(']');
    if (start === -1 || end === -1) throw new Error('no array');
    return JSON.parse(cleaned.slice(start, end + 1))
      .map(r => ({ ...r, steps: (r.steps || '').replace(/\n/g, '<br>') }));
  } catch(e) { return []; }
}

async function callAI(provider, prompt) {
  const key = localStorage.getItem(`ai_key_${provider}`);
  if (!key) throw Object.assign(new Error('Немає ключа'), { type: 'no_key' });

  if (provider === 'claude') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
    });
    if (res.status === 401) throw Object.assign(new Error('Невірний ключ Claude'), { type: 'auth' });
    if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.error?.message || `HTTP ${res.status}`); }
    return (await res.json()).content.map(c => c.text || '').join('');
  }

  if (provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
    });
    if (res.status === 401) throw Object.assign(new Error('Невірний ключ OpenAI'), { type: 'auth' });
    if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.error?.message || `HTTP ${res.status}`); }
    return (await res.json()).choices[0].message.content;
  }

  if (provider === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 1500 } }),
      }
    );
    if (res.status === 400 || res.status === 403) throw Object.assign(new Error('Невірний ключ Gemini'), { type: 'auth' });
    if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.error?.message || `HTTP ${res.status}`); }
    return (await res.json()).candidates[0].content.parts[0].text;
  }

  throw new Error('Невідомий провайдер');
}

function buildErrorHtml(e) {
  if (e.type === 'auth') return `<div class="ai-need-login">
    <p>🔑 ${e.message}</p>
    <button class="ai-login-big-btn" onclick="openLoginModal('${selectedProvider}')">Оновити ключ</button>
  </div>`;
  if (e.type === 'no_key') return `<div class="ai-need-login">
    <p>Спочатку увійдіть у AI провайдер</p>
    <button class="ai-login-big-btn" onclick="openLoginModal('${selectedProvider}')">Увійти →</button>
  </div>`;
  return `<div class="empty">⚠ ${e.message || "Помилка з'єднання."}</div>`;
}

function rcards() {
  return genRecipes.map((r, i) => `<div class="rc">
    <div class="rtitle">${r.title}</div>
    <div class="rmeta">${r.time} · ${r.difficulty}</div>
    <div class="rtags">${(r.tags || []).map(t => `<span class="rtag">${t}</span>`).join('')}</div>
    <div class="rbody" id="rb${i}">${r.steps}</div>
    <div class="rbtn" onclick="togR(${i})">показати рецепт ↓</div>
  </div>`).join('');
}

function togR(i) {
  const b = document.getElementById('rb' + i);
  b.previousElementSibling.textContent = b.classList.toggle('open') ? 'приховати ↑' : 'показати рецепт ↓';
}
