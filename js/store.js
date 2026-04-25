// ===== APPLICATION STATE =====
let prods = [];
let shop  = [];
let historyLog = [];
let installDate = null;
let nid   = 10;
let nshop = 2;

const DEFAULT_PRODS = [
  // Холодильник
  { id:1, name:'Молоко Яготинське', cat:'dairy',   icon:'milk-bottle-100.svg', exp:'2026-04-26', qty:2, unit:'л',   storage:'fridge', used:5, wasted:1, brand:'Яготин',       kcal:62,  g:1000 },
  { id:2, name:'Йогурт натуральний',cat:'dairy',   icon:'yogurt-100.svg', exp:'2026-04-25', qty:3, unit:'шт',  storage:'fridge', used:8, wasted:2, brand:'Галичина',      kcal:60,  g:200  },
  { id:3, name:'Куряче філе',        cat:'meat',    icon:'fried-chicken-100.svg', exp:'2026-04-28', qty:1, unit:'кг',  storage:'fridge', used:3, wasted:0, brand:'Наша Ряба',     kcal:165, g:1000, weight:1000, weightUnit:'г' },
  { id:4, name:'Помідори чері',      cat:'veggie',  icon:'tomato-100.svg', exp:'2026-05-01', qty:5, unit:'шт',  storage:'fridge', used:10,wasted:3, brand:'',              kcal:18,  g:20   },
  { id:5, name:'Кефір',              cat:'dairy',   icon:'milk-bottle-100.svg', exp:'2026-04-24', qty:1, unit:'пак', storage:'fridge', used:4, wasted:1, brand:'',              kcal:53,  g:450  },
  { id:6, name:'Яйця курячі',        cat:'dairy',   icon:'eggs-100.svg', exp:'2026-05-10', qty:6, unit:'шт',  storage:'fridge', used:12,wasted:0, brand:'Ясенсвіт',      kcal:155, g:60   },
  { id:7, name:'Шинка',              cat:'deli',    icon:'meat-100.svg', exp:'2026-04-27', qty:1, unit:'пак', storage:'fridge', used:2, wasted:0, brand:'',              kcal:145, g:300,  weight:300,  weightUnit:'г' },
  // Морозилка
  { id:8, name:'Пельмені',           cat:'other',   icon:'dim-sum-100.svg', exp:'2026-07-15', qty:1, unit:'пак', storage:'freezer',used:1, wasted:0, brand:'',              kcal:220, g:900,  weight:900,  weightUnit:'г' },
  { id:9, name:'Ягідна суміш',       cat:'other',   icon:'strawberry-100.svg', exp:'2026-08-01', qty:2, unit:'пак', storage:'freezer',used:0, wasted:0, brand:'',              kcal:50,  g:400,  weight:400,  weightUnit:'г' },
];
const DEFAULT_SHOP = [
  { id:1, name:'Хліб',    cat:'bread', note:'закінчився', done:false },
  { id:2, name:'Кефір',   cat:'dairy', note:'',           done:false },
];

function loadData() {
  try {
    const sp = localStorage.getItem('fridge_prods');
    const ss = localStorage.getItem('fridge_shop');
    const si = localStorage.getItem('fridge_ids');
    const hl = localStorage.getItem('fridge_history');
    const id = localStorage.getItem('fridge_install');

    prods = sp ? JSON.parse(sp) : JSON.parse(JSON.stringify(DEFAULT_PRODS));
    shop  = ss ? JSON.parse(ss) : JSON.parse(JSON.stringify(DEFAULT_SHOP));
    historyLog = hl ? JSON.parse(hl) : [];
    
    installDate = id ? id : new Date().toISOString().split('T')[0];
    if (!id) localStorage.setItem('fridge_install', installDate);

    if (si) { const ids = JSON.parse(si); nid = ids.nid || 10; nshop = ids.nshop || 3; }
    
    // Migrate old emoji icons to new SVG icons
    prods.forEach(p => {
      if (p.icon && !p.icon.endsWith('.svg')) {
        let newIcon = null;
        if (typeof KEYWORD_MAP !== 'undefined') {
          const words = p.name.toLowerCase().split(/[\s,.-]+/);
          for (const w of words) {
            if (w.length >= 2) {
              if (KEYWORD_MAP[w]) { newIcon = KEYWORD_MAP[w].emoji; break; }
              const matchKey = Object.keys(KEYWORD_MAP).find(k => k.startsWith(w) || w.startsWith(k));
              if (matchKey) { newIcon = KEYWORD_MAP[matchKey].emoji; break; }
            }
          }
        }
        p.icon = newIcon || (typeof ICONS !== 'undefined' ? ICONS[p.cat] : null) || 'grocery-100.svg';
      }
    });
  } catch(e) {
    prods = JSON.parse(JSON.stringify(DEFAULT_PRODS));
    shop  = JSON.parse(JSON.stringify(DEFAULT_SHOP));
    historyLog = [];
    installDate = new Date().toISOString().split('T')[0];
  }
}

function saveData() {
  try {
    localStorage.setItem('fridge_prods', JSON.stringify(prods));
    localStorage.setItem('fridge_shop',  JSON.stringify(shop));
    localStorage.setItem('fridge_history', JSON.stringify(historyLog));
    localStorage.setItem('fridge_ids',   JSON.stringify({ nid, nshop }));
  } catch(e) { console.warn('localStorage unavailable:', e); }
  if (typeof pushToFirebase === 'function') pushToFirebase();
}

loadData();
