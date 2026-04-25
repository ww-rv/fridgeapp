// ===== ICON DATABASE =====
// Format: [emoji, name_UA, category_key, search_keywords]
const ICON_DB = [
  // 🥛 МОЛОЧНІ ТА ЯЙЦЯ
  ['🥛','Молоко','dairy','молоко milk питне'],
  ['🧴','Кефір','dairy','кефір кисляк'],
  ['🍶','Ряжанка','dairy','ряжанка варенець'],
  ['🥣','Йогурт питний','dairy','йогурт yogurt питний'],
  ['🥣','Йогурт густий','dairy','йогурт yogurt густий грецький'],
  ['🫙','Сир кисломолочний','dairy','сир рікота творог cottage'],
  ['🥤','Сметана','dairy','сметана cream sour'],
  ['🫧','Вершки','dairy','вершки cream'],
  ['🧀','Твердий сир','dairy','сир cheese чедер пармезан твердий'],
  ['🫙','М\'який сир','dairy','сир мягкий фета бринза'],
  ['🧈','Вершкове масло','dairy','масло butter вершкове'],
  ['🍦','Плавлений сир','dairy','сир плавлений'],
  ['🥚','Яйця курячі','dairy','яйця egg куряч'],
  ['🥚','Яйця перепелині','dairy','яйця egg перепелині'],
  ['🍦','Морозиво','dairy','морозиво ice cream'],

  // 🍞 ХЛІБ ТА ВИПІЧКА
  ['🍞','Хліб білий','bread','хліб bread білий'],
  ['🍞','Хліб чорний','bread','хліб bread чорний'],
  ['🥖','Багет','bread','багет baguette'],
  ['🧁','Булочка','bread','булочка bun'],
  ['🫓','Лаваш','bread','лаваш pita'],
  ['🥖','Батон','bread','батон loaf'],
  ['🥐','Круасан','bread','круасан croissant'],
  ['🍪','Сушки','bread','сушки баранки'],
  ['🍪','Сухарі','bread','сухарі crackers'],
  ['🥨','Хлібець','bread','хлібець crispbread'],
  ['🥧','Пиріжок','bread','пиріжок pie'],
  ['🍩','Бублик','bread','бублик bagel'],
  ['🥐','Слойка','bread','слойка pastry'],
  ['🧁','Пампушка','bread','пампушка'],
  ['🎂','Торт','bread','торт cake'],
  ['🧇','Вафлі','bread','вафлі waffle'],
  ['🥞','Млинці','bread','млинці pancake'],

  // 🥩 М'ЯСО ТА ПТИЦЯ
  ['🍗','Курка ціла','meat','курка chicken ціла'],
  ['🍗','Куряче філе','meat','курка chicken філе груди'],
  ['🍖','Свинина ошийок','meat','свинина pork ошийок'],
  ['🍖','Свинина ребра','meat','свинина ребра pork'],
  ['🥩','Яловичина стейк','meat','яловичина beef стейк'],
  ['🍗','Індича філе','meat','індичка turkey філе'],
  ['🍗','Качка','meat','качка duck'],
  ['🐇','Кролик','meat','кролик rabbit'],
  ['🥩','Фарш','meat','фарш minced meat'],
  ['🥓','Сало','meat','сало lard'],
  ['🫀','Печінка','meat','печінка liver субпродукти'],
  ['🫀','Серця','meat','серця heart субпродукти'],
  ['🫀','Шлунки','meat','шлунки gizzard субпродукти'],

  // 🌭 КОВБАСНІ ВИРОБИ
  ['🌭','Варена ковбаса','deli','ковбаса варена sausage'],
  ['🥩','Сляміх','deli','сляміх салямі salami'],
  ['🌭','Сосиски','deli','сосиски frankfurters'],
  ['🌭','Сирокопчена ковбаса','deli','ковбаса сирокопчена'],
  ['🥩','Шинка','deli','шинка ham'],
  ['🥓','Бекон','deli','бекон bacon'],
  ['🫙','Паштет','deli','паштет pate'],
  ['🩸','Кров\'янка','deli','кров\'янка blood sausage'],
  ['🥩','Зельц','deli','зельц headcheese'],
  ['🌭','Лівера ковбаса','deli','лівер liver sausage'],
  ['🥩','Буженина','deli','буженина roast pork'],
  ['🥩','Грудинка','deli','грудинка bacon belly'],
  ['🥩','Балик','deli','балик cured meat'],

  // 🐟 РИБА ТА МОРЕПРОДУКТИ
  ['🐠','Лосось','fish','лосось salmon форель'],
  ['🐟','Оселедець','fish','оселедець herring'],
  ['🦐','Креветки','fish','креветки shrimp'],
  ['🦑','Кальмари','fish','кальмари squid'],
  ['🦪','Мідії','fish','мідії mussels'],
  ['🫙','Червона ікра','fish','ікра caviar червона'],
  ['🦀','Крабові палички','fish','краб crab палички'],
  ['🌿','Морська капуста','fish','морська капуста seaweed'],
  ['🐟','Скумбрія копчена','fish','скумбрія mackerel копчена'],
  ['🥫','Шпроти','fish','шпроти sprats'],
  ['🦞','Морський коктейль','fish','морепродукти seafood коктейль'],
  ['🥫','Ікра мойви','fish','ікра мойва capelin'],
  ['🥫','Тунець консерва','fish','тунець tuna консерва'],

  // 🌾 БАКАЛІЯ
  ['🌾','Гречка','grocery','гречка buckwheat крупи'],
  ['🍚','Рис','grocery','рис rice крупи'],
  ['🌾','Вівсянка','grocery','вівсянка oats вівсяна'],
  ['🫘','Квасоля','grocery','квасоля beans'],
  ['🍝','Макарони','grocery','макарони pasta спагетті'],
  ['🌾','Борошно','grocery','борошно flour пшеничне'],
  ['🍬','Цукор','grocery','цукор sugar'],
  ['🧂','Сіль','grocery','сіль salt'],
  ['🌾','Сода','grocery','сода baking soda'],
  ['🌾','Дріжджі','grocery','дріжджі yeast'],
  ['🌾','Пластівці','grocery','пластівці cereals granola'],
  ['🌾','Мюслі','grocery','мюслі muesli'],
  ['🫙','Оцет','grocery','оцет vinegar'],
  ['🫘','Горох','grocery','горох peas'],
  ['🫘','Сочевиця','grocery','сочевиця lentils'],

  // 🥦 ОВОЧІ ТА ФРУКТИ
  ['🥔','Картопля','veggie','картопля potato'],
  ['🍅','Помідори','veggie','помідор томат tomato'],
  ['🥒','Огірки','veggie','огірок cucumber'],
  ['🫑','Болгарський перець','veggie','перець pepper болгарський'],
  ['🥦','Брокколі','veggie','брокколі broccoli'],
  ['🍎','Яблука','veggie','яблуко apple'],
  ['🍌','Банани','veggie','банан banana'],
  ['🍇','Виноград','veggie','виноград grape'],
  ['🍓','Полуниця','veggie','полуниця strawberry'],
  ['🧄','Часник','veggie','часник garlic'],
  ['🌿','Зелена цибуля','veggie','цибуля зелена green onion'],
  ['🌿','Кріп','veggie','кріп dill зелень'],
  ['🍄','Печериці','veggie','гриби mushroom печериці'],
  ['🥕','Морква','veggie','морква carrot'],
  ['🧅','Цибуля','veggie','цибуля onion'],
  ['🥬','Капуста','veggie','капуста cabbage'],
  ['🥑','Авокадо','veggie','авокадо avocado'],
  ['🍋','Лимон','veggie','лимон lemon'],
  ['🍊','Апельсин','veggie','апельсин orange'],
  ['🍐','Груша','veggie','груша pear'],
  ['🍒','Вишня','veggie','вишня cherry'],
  ['🥭','Манго','veggie','манго mango'],
  ['🫐','Чорниця','veggie','чорниця blueberry'],
  ['🍑','Персик','veggie','персик peach'],
  ['🌶️','Перець гострий','veggie','перець chili гострий'],
  ['🍠','Батат','veggie','батат sweet potato'],
  ['🍆','Баклажан','veggie','баклажан eggplant'],
  ['🌽','Кукурудза свіжа','veggie','кукурудза corn fresh'],
  ['🫒','Оливки свіжі','veggie','оливки olive маслини'],

  // 🥫 КОНСЕРВИ ТА ЗАКРУТКИ
  ['🥫','Тушкованка','canned','тушкованка canned meat'],
  ['🥫','Тунець консерва','canned','тунець tuna консерва'],
  ['🌽','Кукурудза консерва','canned','кукурудза corn консерва'],
  ['🫘','Горошок консерва','canned','горошок peas консерва'],
  ['🥒','Мариновані огірки','canned','огірки мариновані pickles'],
  ['🫙','Ікра кабачкова','canned','ікра кабачкова caviar'],
  ['🫒','Оливки консерва','canned','оливки olive маслини jar'],
  ['🍍','Ананаси консерва','canned','ананас pineapple canned'],
  ['🥛','Згущене молоко','canned','згущене молоко condensed milk'],
  ['🫙','Варення','canned','варення jam джем'],
  ['🥫','Лечо','canned','лечо lecho'],
  ['🫘','Квасоля в томаті','canned','квасоля beans tomato'],
  ['🍑','Персики консерва','canned','персики peach canned'],

  // 🧴 СОУСИ, ОЛІЇ ТА ПРИПРАВИ
  ['🫚','Соняшникова олія','sauces','олія sunflower oil'],
  ['🫚','Оливкова олія','sauces','олія olive oil оливкова'],
  ['🧴','Майонез','sauces','майонез mayonnaise'],
  ['🧴','Кетчуп','sauces','кетчуп ketchup'],
  ['🧴','Гірчиця','sauces','гірчиця mustard'],
  ['🫙','Соєвий соус','sauces','соус soy sauce соєвий'],
  ['🧴','Томатна паста','sauces','томатна паста tomato paste'],
  ['🌶️','Чорний перець','sauces','перець чорний black pepper спеції'],
  ['🌶️','Паприка','sauces','паприка paprika спеції'],
  ['🌿','Лавровий лист','sauces','лавровий лист bay leaf'],
  ['🌿','Італійські трави','sauces','трави herbs italian'],
  ['🧄','Часник сушений','sauces','часник garlic сушений powder'],
  ['🌶️','Куркума','sauces','куркума turmeric спеції'],
  ['🍯','Мед','sauces','мед honey'],
  ['🥜','Арахісова паста','sauces','арахіс peanut butter pasta'],

  // 🍬 СОЛОДОЩІ ТА СНЕКИ
  ['🍫','Шоколад','sweets','шоколад chocolate'],
  ['🍬','Цукерки','sweets','цукерки candy'],
  ['🍪','Печиво','sweets','печиво cookie бісквіт'],
  ['🧇','Вафлі солодкі','sweets','вафлі waffle sweet'],
  ['🎂','Торт','sweets','торт cake'],
  ['🍮','Зефір','sweets','зефір marshmallow'],
  ['🍮','Мармелад','sweets','мармелад jelly'],
  ['🍮','Халва','sweets','халва halva'],
  ['🍟','Чіпси','sweets','чіпси chips снеки'],
  ['🌰','Горішки снек','sweets','горішки nuts snack'],
  ['🍿','Попкорн','sweets','попкорн popcorn'],
  ['🍯','Мед баночка','sweets','мед honey jar'],

  // 🧃 НАПОЇ
  ['💧','Вода негазована','drink','вода water негазована'],
  ['💧','Мінеральна вода','drink','мінеральна вода mineral water'],
  ['🧃','Сік','drink','сік juice'],
  ['🥤','Кола','drink','кола cola pepsi'],
  ['🍺','Квас','drink','квас kvass'],
  ['⚡','Енергетик','drink','енергетик energy drink'],
  ['☕','Чай чорний','drink','чай tea чорний black'],
  ['🍵','Чай зелений','drink','чай tea зелений green'],
  ['☕','Кава зернова','drink','кава coffee зернова beans'],
  ['☕','Кава розчинна','drink','кава coffee розчинна instant'],
  ['🍫','Какао','drink','какао cocoa'],
  ['🫖','Узвар','drink','узвар compote сухофрукти'],
  ['🍋','Лимонад','drink','лимонад lemonade'],
  ['🍺','Пиво','drink','пиво beer'],
  ['🍷','Вино','drink','вино wine'],

  // ❄️ ЗАМОРОЗКА
  ['🥟','Пельмені','other','пельмені dumplings frozen'],
  ['🥟','Вареники','other','вареники pierogi frozen'],
  ['🍗','Котлети заморожені','other','котлети frozen cutlets'],
  ['🍗','Нагетси','other','нагетси nuggets frozen'],
  ['🥦','Овочеві суміші','other','овочі суміш frozen mix vegetables'],
  ['🥦','Броколі заморожені','other','броколі broccoli frozen'],
  ['🍓','Ягідна суміш','other','ягоди berries frozen mix'],
  ['🥐','Тісто листкове','other','тісто frozen dough'],
  ['🥞','Млинці з м\'ясом','other','млинці pancakes frozen meat'],
  ['🍦','Морозиво стаканчик','other','морозиво ice cream sticks'],
  ['🍟','Картопля фрі','other','картопля fries frozen'],
  ['🐟','Рибні палички','other','рибні палички fish sticks frozen'],
  ['🌯','Рибні з сиром','other','риба fish cheese frozen'],

  // 📦 ІНШЕ
  ['📦','Інше','other','інше other misc'],
];

// Keyword → icon mapping for auto-detection
const KEYWORD_MAP = {};
ICON_DB.forEach(([emoji, name, cat, keywords]) => {
  const words = (name + ' ' + keywords).toLowerCase().split(/\s+/);
  words.forEach(w => {
    if (w.length > 2 && !KEYWORD_MAP[w]) KEYWORD_MAP[w] = { emoji, cat };
  });
});

// ===== CATEGORY GROUPS (for filter bar + shop grouping) =====
const CAT_GROUPS = [
  { key: 'all',     label: 'Всі',              icon: '' },
  { key: 'dairy',   label: 'Молочні та яйця',  icon: '🥛' },
  { key: 'bread',   label: 'Хліб та випічка',  icon: '🍞' },
  { key: 'meat',    label: "М'ясо та птиця",   icon: '🥩' },
  { key: 'deli',    label: 'Ковбасні вироби',  icon: '🌭' },
  { key: 'fish',    label: 'Риба та море',      icon: '🐟' },
  { key: 'grocery', label: 'Бакалія',           icon: '🌾' },
  { key: 'veggie',  label: 'Овочі та фрукти',  icon: '🥦' },
  { key: 'canned',  label: 'Консерви',          icon: '🥫' },
  { key: 'sauces',  label: 'Соуси та приправи', icon: '🧴' },
  { key: 'sweets',  label: 'Солодощі та снеки', icon: '🍬' },
  { key: 'drink',   label: 'Напої',             icon: '🧃' },
  { key: 'other',   label: 'Інше',              icon: '📦' },
];

// Category icons (for stats + fallback)
const ICONS = {
  dairy: '🥛', bread: '🍞', meat: '🥩', deli: '🌭', fish: '🐟',
  grocery: '🌾', veggie: '🥦', canned: '🥫', sauces: '🧴',
  sweets: '🍬', drink: '🧃', other: '📦',
  // backward compat aliases
  drinks: '🧃', produce: '🥦', frozen: '❄️',
};

// Category background colors
const CLRS = {
  dairy: '#E8F4FD', bread: '#FDF3E3', meat: '#FDECEA', deli: '#FDE8E4',
  fish: '#E3EDF8', grocery: '#F0F4E3', veggie: '#E8F5E3', canned: '#F4E8DC',
  sauces: '#EEE8F4', sweets: '#FCE8F0', drink: '#E3F4F8', other: '#F0EEE8',
  // backward compat aliases
  drinks: '#E3F4F8', produce: '#E8F5E3',
};

const BCOLS = ['#1553D4','#1D9E75','#C97A0B','#C52F2F','#9C27B0','#00838F','#E67E22','#2980B9'];

const CAT_NAME = {
  dairy: 'Молочні та яйця', bread: 'Хліб та випічка', meat: "М'ясо та птиця",
  deli: 'Ковбасні вироби', fish: 'Риба та море', grocery: 'Бакалія',
  veggie: 'Овочі та фрукти', canned: 'Консерви', sauces: 'Соуси',
  sweets: 'Солодощі', drink: 'Напої', other: 'Інше',
  // backward compat
  drinks: 'Напої', produce: 'Овочі та фрукти',
};

// Auto-detect category from product name
function detectCat(name) {
  const n = name.toLowerCase();
  if (/молок|кефір|йогурт|ряжанк|вершк|сметан|яйц|сир|морозиво/.test(n)) return 'dairy';
  if (/хліб|батон|булк|круасан|лаваш|сухар|пиріж|бублик|пампушк|випічк/.test(n)) return 'bread';
  if (/курк|свинин|яловичин|м'ясо|м\'ясо|фарш|качк|кролик|індич|печінк|серц|шлунк|сало/.test(n)) return 'meat';
  if (/ковбас|сосис|бекон|шинк|паштет|балик|буженин|зельц/.test(n)) return 'deli';
  if (/риба|лосось|оселед|тунець|форель|креветк|мідії|кальмар|скумбр|шпрот|ікра/.test(n)) return 'fish';
  if (/рис|гречк|вівсянк|макарон|борошн|цукор|сіль|горох|квасол|сочевиц|крупи|пластівц|мюслі|оцет/.test(n)) return 'grocery';
  if (/помідор|огірок|капуст|яблук|банан|морква|картопл|перець|овоч|фрукт|зелен|часник|цибул|полуниц|виноград|брокол|авокад|лимон|апельсин|гриб|печериц/.test(n)) return 'veggie';
  if (/консерв|тушков|варення|джем|ікра кабачк|мариновані|лечо|згущ/.test(n)) return 'canned';
  if (/олія|кетчуп|майонез|соус|гірчиц|паприк|куркум|лавров|трав|спеці/.test(n)) return 'sauces';
  if (/шоколад|цукерк|печиво|торт|вафл|зефір|мармелад|халва|чіпси|горішк|попкорн/.test(n)) return 'sweets';
  if (/вода|сік|кола|чай|кава|напій|квас|лимонад|узвар|енергетик|пиво|вино|какао/.test(n)) return 'drink';
  return 'other';
}

// Icon picker category filter list
const ICON_CATS = [
  { key: 'all',     label: 'Всі' },
  { key: 'dairy',   label: '🥛 Молочні' },
  { key: 'bread',   label: '🍞 Хліб' },
  { key: 'meat',    label: '🥩 М\'ясо' },
  { key: 'deli',    label: '🌭 Ковбасні' },
  { key: 'fish',    label: '🐟 Риба' },
  { key: 'grocery', label: '🌾 Бакалія' },
  { key: 'veggie',  label: '🥦 Овочі' },
  { key: 'canned',  label: '🥫 Консерви' },
  { key: 'sauces',  label: '🧴 Соуси' },
  { key: 'sweets',  label: '🍬 Солодощі' },
  { key: 'drink',   label: '🧃 Напої' },
  { key: 'other',   label: '📦 Інше' },
];

// AI providers config
const AI_PROVIDERS = {
  claude: {
    name: 'Claude', icon: '🤖', color: '#CC785C',
    placeholder: 'sk-ant-api03-...',
    loginUrl: 'https://console.anthropic.com/settings/keys',
    hint: 'Отримати: console.anthropic.com',
    steps: [
      'Натисніть кнопку "Відкрити сайт" вище',
      'Увійдіть у свій акаунт Anthropic',
      'Натисніть <b>Create Key</b> та скопіюйте',
      'Поверніться сюди — ключ вставиться автоматично',
    ],
  },
  openai: {
    name: 'ChatGPT', icon: '💬', color: '#10A37F',
    placeholder: 'sk-proj-...',
    loginUrl: 'https://platform.openai.com/api-keys',
    hint: 'Отримати: platform.openai.com/api-keys',
    steps: [
      'Натисніть кнопку "Відкрити сайт" вище',
      'Увійдіть у свій акаунт OpenAI',
      'Натисніть <b>Create new secret key</b> та скопіюйте',
      'Поверніться сюди — ключ вставиться автоматично',
    ],
  },
  gemini: {
    name: 'Gemini', icon: '✨', color: '#4285F4',
    placeholder: 'AIzaSy...',
    loginUrl: 'https://aistudio.google.com/app/apikey',
    hint: 'Отримати: aistudio.google.com/app/apikey',
    steps: [
      'Натисніть кнопку "Відкрити сайт" вище',
      'Увійдіть через свій акаунт Google',
      'Натисніть <b>Create API key</b> та скопіюйте',
      'Поверніться сюди — ключ вставиться автоматично',
    ],
  },
};

// Recipe categories
const RECIPE_CATS = [
  { key: 'перша страва',    label: 'Перша страва',    icon: '🍲' },
  { key: 'друга страва',    label: 'Друга страва',    icon: '🍽' },
  { key: 'десерт',          label: 'Десерт',          icon: '🍰' },
  { key: 'швидкий перекус', label: 'Швидкий перекус', icon: '⚡' },
  { key: 'салат або снеки', label: 'Салат / Снеки',   icon: '🥗' },
];
