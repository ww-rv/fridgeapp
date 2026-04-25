// ===== ONBOARDING (one-time, per-device) =====
const ONBOARD_KEY = 'fridge.onboard.v1';
let _tutInterval = null;
let _tutIdx = 0;

const TUT_STEPS = [
  {
    title: 'Додавайте продукти',
    sub: 'Скануйте штрих-код або вводьте вручну',
    html: `<div class="tut-mock"><div class="tut-phone">
      <div class="tut-row anim-fade-in" style="animation-delay:.1s"><span class="tt-th">🥛</span><div><div class="tt-n">Молоко</div><div class="tt-s">5 днів</div></div></div>
      <div class="tut-row anim-fade-in" style="animation-delay:.4s"><span class="tt-th">🍞</span><div><div class="tt-n">Хліб</div><div class="tt-s">2 дні</div></div></div>
      <div class="tut-row anim-pop-in" style="animation-delay:.9s"><span class="tt-th">🥑</span><div><div class="tt-n">Авокадо</div><div class="tt-s tt-new">щойно додано</div></div></div>
    </div><div class="tut-fab anim-bounce-in"></div></div>`,
  },
  {
    title: 'Слідкуйте за термінами',
    sub: 'Кольорові індикатори підкажуть, що з\'їсти першим',
    html: `<div class="tut-mock"><div class="tut-phone">
      <div class="tut-row exp-row danger"><span class="tt-th">🍅</span><div><div class="tt-n">Помідори</div><div class="tt-s">сьогодні</div></div><span class="tt-pill r">!</span></div>
      <div class="tut-row exp-row warn"><span class="tt-th">🥣</span><div><div class="tt-n">Йогурт</div><div class="tt-s">завтра</div></div><span class="tt-pill o">1д</span></div>
      <div class="tut-row exp-row ok"><span class="tt-th">🍗</span><div><div class="tt-n">Філе</div><div class="tt-s">4 дні</div></div><span class="tt-pill g">4д</span></div>
      <div class="tut-row exp-row ok"><span class="tt-th">🥚</span><div><div class="tt-n">Яйця</div><div class="tt-s">16 днів</div></div><span class="tt-pill g">16д</span></div>
    </div></div>`,
  },
  {
    title: 'Свайпніть для дії',
    sub: 'Вліво — використати, додати в покупки або видалити',
    html: `<div class="tut-mock"><div class="tut-phone">
      <div class="tut-row swipe-demo">
        <div class="sw-actions"><span class="sw-act ok">✓</span><span class="sw-act buy">+🛒</span><span class="sw-act del">×</span></div>
        <div class="sw-card"><span class="tt-th">🥛</span><div><div class="tt-n">Молоко</div><div class="tt-s">5 днів</div></div></div>
      </div>
      <div class="tut-finger"></div>
    </div></div>`,
  },
  {
    title: 'Рецепти з того, що є',
    sub: 'AI-помічник запропонує страви з ваших продуктів',
    html: `<div class="tut-mock"><div class="tut-phone">
      <div class="cook-card"><div class="cook-img">🍳</div><div><div class="tt-n">Омлет з овочами</div><div class="tt-s">з ваших продуктів · 8 хв</div><div class="cook-tags"><span class="ct">🥚</span><span class="ct">🍅</span><span class="ct">🥑</span></div></div></div>
      <div class="cook-card delay"><div class="cook-img">🥗</div><div><div class="tt-n">Салат свіжий</div><div class="tt-s">12 хв</div></div></div>
    </div></div>`,
  },
];

function initOnboarding() {
  try { if (localStorage.getItem(ONBOARD_KEY)) { _applyFridgeName(); return; } } catch(e) {}
  const el = document.getElementById('onboard');
  if (el) el.style.display = 'flex';
  goOnbStep(0);
}

function goOnbStep(step) {
  clearInterval(_tutInterval);
  [0, 1, 2].forEach(i => {
    const el = document.getElementById('onb-step-' + i);
    if (el) el.style.display = i === step ? 'flex' : 'none';
  });
  if (step === 1) {
    _tutIdx = 0;
    _renderTutSlide();
    _tutInterval = setInterval(() => { _tutIdx = (_tutIdx + 1) % TUT_STEPS.length; _renderTutSlide(); }, 3200);
  }
  if (step === 2) {
    const name = (document.getElementById('onb-name-input')?.value || '').trim() || 'Мій Холодильник';
    const first = name.split(' ')[0] || 'друже';
    const t = document.getElementById('onb-ready-title');
    const s = document.getElementById('onb-ready-sub');
    if (t) t.textContent = `Все готово, ${first}!`;
    if (s) s.textContent = `«${name}» створено. Почніть із додавання перших продуктів — і ми стежитимемо, щоб нічого не пропало.`;
    _renderConfetti();
  }
}

function _renderTutSlide() {
  const step = TUT_STEPS[_tutIdx];
  const stage = document.getElementById('onb-tut-stage');
  const title = document.getElementById('onb-tut-title');
  const sub   = document.getElementById('onb-tut-sub');
  const dots  = document.getElementById('onb-tut-dots');
  if (stage) stage.innerHTML = step.html;
  if (title) title.textContent = step.title;
  if (sub)   sub.textContent   = step.sub;
  if (dots)  dots.innerHTML = TUT_STEPS.map((_, i) =>
    `<span class="tdot ${i === _tutIdx ? 'on' : ''}" onclick="_tutIdx=${i};_renderTutSlide()"></span>`
  ).join('');
}

function setOnbName(name) {
  const inp = document.getElementById('onb-name-input');
  if (inp) inp.value = name;
  document.querySelectorAll('.onb-chip').forEach(c => c.classList.toggle('on', c.textContent.trim() === name));
}

function _renderConfetti() {
  const el = document.getElementById('onb-confetti');
  if (!el) return;
  const colors = ['#1553D4', '#1D9E75', '#C97A0B', '#C52F2F', '#9C27B0'];
  el.innerHTML = [...Array(18)].map((_, i) =>
    `<span class="cf" style="left:${(i * 53) % 100}%;animation-delay:${((i * 0.07) % 1.4).toFixed(2)}s;background:${colors[i % 5]}"></span>`
  ).join('');
}

function finishOnboarding() {
  const name = (document.getElementById('onb-name-input')?.value || '').trim() || 'Мій Холодильник';
  try { localStorage.setItem(ONBOARD_KEY, JSON.stringify({ name, ts: Date.now() })); } catch(e) {}
  clearInterval(_tutInterval);
  const el = document.getElementById('onboard');
  if (el) el.style.display = 'none';
  // Update brand title
  const h1 = document.querySelector('.brand h1');
  if (h1) h1.textContent = name;
  showAchievementChip();
}

function showAchievementChip() {
  const chip = document.getElementById('achv-chip');
  if (!chip) return;
  chip.style.display = 'flex';
  // The CSS animation handles the slide-in/slide-out timing (6s total)
  setTimeout(() => { chip.style.display = 'none'; }, 6200);
}

function _applyFridgeName() {
  try {
    const raw = localStorage.getItem(ONBOARD_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.name) {
      const h1 = document.querySelector('.brand h1');
      if (h1) h1.textContent = data.name;
    }
  } catch(e) {}
}

// Auto-call after DOM is ready (store.js runs loadData first)
document.addEventListener('DOMContentLoaded', initOnboarding);
if (document.readyState !== 'loading') initOnboarding();
