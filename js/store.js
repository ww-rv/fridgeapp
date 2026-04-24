// ===== APPLICATION STATE =====
let prods = [];
let shop  = [];
let nid   = 7;
let nshop = 2;

const DEFAULT_PRODS = [
  { id:1, name:'Молоко Яготинське', cat:'dairy',  icon:'🥛', exp:'2026-04-26', qty:2, unit:'л',   used:5, wasted:1, brand:'Яготинське' },
  { id:2, name:'Йогурт',           cat:'dairy',  icon:'🥣', exp:'2026-04-25', qty:3, unit:'шт',  used:8, wasted:2, brand:'' },
  { id:3, name:'Куряче філе',       cat:'meat',   icon:'🍗', exp:'2026-04-28', qty:1, unit:'кг',  used:3, wasted:0, brand:'' },
  { id:4, name:'Помідори',          cat:'veggie', icon:'🍅', exp:'2026-05-01', qty:5, unit:'шт',  used:10,wasted:3, brand:'' },
  { id:5, name:'Кефір',             cat:'dairy',  icon:'🫗', exp:'2026-04-24', qty:1, unit:'пак', used:4, wasted:1, brand:'' },
  { id:6, name:'Яйця',              cat:'other',  icon:'🥚', exp:'2026-05-10', qty:6, unit:'шт',  used:12,wasted:0, brand:'' },
];
const DEFAULT_SHOP = [{ id:1, name:'Хліб', note:'закінчився', done:false }];

function loadData() {
  try {
    const sp = localStorage.getItem('fridge_prods');
    const ss = localStorage.getItem('fridge_shop');
    const si = localStorage.getItem('fridge_ids');
    prods = sp ? JSON.parse(sp) : JSON.parse(JSON.stringify(DEFAULT_PRODS));
    shop  = ss ? JSON.parse(ss) : JSON.parse(JSON.stringify(DEFAULT_SHOP));
    if (si) { const ids = JSON.parse(si); nid = ids.nid || 7; nshop = ids.nshop || 2; }
  } catch(e) {
    prods = JSON.parse(JSON.stringify(DEFAULT_PRODS));
    shop  = JSON.parse(JSON.stringify(DEFAULT_SHOP));
  }
}

function saveData() {
  try {
    localStorage.setItem('fridge_prods', JSON.stringify(prods));
    localStorage.setItem('fridge_shop',  JSON.stringify(shop));
    localStorage.setItem('fridge_ids',   JSON.stringify({ nid, nshop }));
  } catch(e) {
    console.warn('localStorage unavailable:', e);
  }
  // Push to Firebase if sync is active
  if (typeof pushToFirebase === 'function') pushToFirebase();
}

// Load immediately on script parse
loadData();
