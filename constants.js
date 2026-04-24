// ===== ICON DATABASE =====
// Format: [emoji, name_UA, category, search_keywords]
const ICON_DB = [
  ['🥛','Молоко','dairy','молоко milk'],
  ['🧀','Сир твердий','dairy','сир cheese чедер пармезан'],
  ['🫙','Сир м\'який','dairy','сир рікота творог cottage'],
  ['🍦','Морозиво','dairy','морозиво ice cream'],
  ['🧈','Масло','dairy','масло butter вершкове'],
  ['🥚','Яйця','other','яйця egg яйце'],
  ['🍳','Яйце варене','other','яйце egg варене'],
  ['🥣','Йогурт','dairy','йогурт yogurt'],
  ['🫗','Кефір','dairy','кефір кисляк'],
  ['🍶','Ряжанка','dairy','ряжанка варенець'],
  ['🥤','Сметана','dairy','сметана cream sour'],
  ['🫧','Вершки','dairy','вершки cream'],
  ['🥩','М\'ясо','meat','м\'ясо meat beef свинина яловичина'],
  ['🍗','Курятина','meat','курка chicken курятина філе'],
  ['🍖','Свинина','meat','свинина pork окорок'],
  ['🥓','Бекон','meat','бекон bacon'],
  ['🌭','Сосиска','meat','сосиска сардельки'],
  ['🍤','Креветки','meat','креветки shrimp seafood'],
  ['🐟','Риба','meat','риба fish'],
  ['🐠','Лосось','meat','лосось salmon форель'],
  ['🐡','Тунець','meat','тунець tuna'],
  ['🦑','Кальмар','meat','кальмар squid'],
  ['🦐','Морепродукти','meat','морепродукти seafood краб мідії'],
  ['🫀','Субпродукти','meat','печінка серце субпродукти liver'],
  ['🍣','Суші','meat','суші sushi ролл'],
  ['🥫','Консерви','meat','консерви паштет тушонка canned'],
  ['🥦','Брокколі','veggie','брокколі broccoli'],
  ['🥕','Морква','veggie','морква carrot'],
  ['🍅','Помідор','veggie','помідор томат tomato'],
  ['🥒','Огірок','veggie','огірок cucumber'],
  ['🌽','Кукурудза','veggie','кукурудза corn'],
  ['🫑','Перець болгарський','veggie','перець pepper болгарський'],
  ['🌶️','Перець гострий','veggie','перець chili гострий'],
  ['🧅','Цибуля','veggie','цибуля onion'],
  ['🧄','Часник','veggie','часник garlic'],
  ['🥔','Картопля','veggie','картопля potato'],
  ['🍠','Батат','veggie','батат sweet potato'],
  ['🍆','Баклажан','veggie','баклажан eggplant'],
  ['🥑','Авокадо','veggie','авокадо avocado'],
  ['🥬','Капуста','veggie','капуста cabbage'],
  ['🥗','Салат','veggie','салат lettuce листовий'],
  ['🫚','Масло рослинне','other','олія масло oil'],
  ['🌿','Зелень','veggie','зелень петрушка кріп кінза'],
  ['🍋','Лимон','veggie','лимон lemon'],
  ['🍊','Апельсин','veggie','апельсин orange'],
  ['🍎','Яблуко','veggie','яблуко apple'],
  ['🍐','Груша','veggie','груша pear'],
  ['🍇','Виноград','veggie','виноград grape'],
  ['🍓','Полуниця','veggie','полуниця strawberry'],
  ['🫐','Чорниця','veggie','чорниця blueberry'],
  ['🍒','Вишня','veggie','вишня cherry'],
  ['🍑','Персик','veggie','персик peach'],
  ['🥭','Манго','veggie','манго mango'],
  ['🍍','Ананас','veggie','ананас pineapple'],
  ['🍌','Банан','veggie','банан banana'],
  ['🍉','Кавун','veggie','кавун watermelon'],
  ['🍈','Диня','veggie','диня melon'],
  ['🫒','Оливки','veggie','оливки olive маслини'],
  ['🍄','Гриби','veggie','гриби mushroom печериці'],
  ['🌰','Горіхи','other','горіхи nuts мигдаль фундук'],
  ['🍞','Хліб','bread','хліб bread'],
  ['🥖','Батон','bread','батон baguette'],
  ['🥐','Круасан','bread','круасан croissant'],
  ['🥨','Претцель','bread','претцель pretzel'],
  ['🧁','Кекс','bread','кекс muffin cupcake'],
  ['🎂','Торт','bread','торт cake'],
  ['🍰','Тістечко','bread','тістечко cake десерт'],
  ['🍩','Пончик','bread','пончик donut'],
  ['🍪','Печиво','bread','печиво cookie бісквіт'],
  ['🥞','Млинці','bread','млинці pancake'],
  ['🧇','Вафлі','bread','вафлі waffle'],
  ['🥧','Пиріг','bread','пиріг pie'],
  ['🫓','Лаваш','bread','лаваш pita'],
  ['🧃','Сік','drink','сік juice'],
  ['🥤','Напій','drink','напій drink cola'],
  ['☕','Кава','drink','кава coffee'],
  ['🍵','Чай','drink','чай tea'],
  ['🧋','Молочний напій','drink','молочний shake'],
  ['🫖','Трав\'яний чай','drink','трав\'яний чай herbal'],
  ['💧','Вода','drink','вода water'],
  ['🍺','Пиво','drink','пиво beer'],
  ['🍷','Вино','drink','вино wine'],
  ['🧉','Матча','drink','матча macha'],
  ['🫙','Компот','drink','компот сік варення'],
  ['🍕','Піца','other','піца pizza'],
  ['🍔','Бургер','other','бургер burger'],
  ['🌮','Тако','other','тако taco'],
  ['🌯','Шаурма','other','шаурма wrap'],
  ['🍜','Локшина','other','локшина noodles рамен'],
  ['🍝','Паста','other','паста pasta спагетті'],
  ['🍲','Суп','other','суп soup борщ'],
  ['🌾','Крупи','other','крупи grain рис гречка'],
  ['🍚','Рис','other','рис rice'],
  ['🫘','Квасоля','other','квасоля beans горох сочевиця'],
  ['🫙','Варення','other','варення jam джем'],
  ['🍯','Мед','other','мед honey'],
  ['🧂','Сіль','other','сіль salt'],
  ['🥜','Арахісове масло','other','арахіс peanut butter'],
  ['🧊','Заморожені овочі','veggie','заморожені frozen овочі'],
  ['🍫','Шоколад','other','шоколад chocolate'],
  ['🍬','Цукерки','other','цукерки candy'],
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

// Category filter list
const ICON_CATS = [
  { key: 'all',    label: 'Всі' },
  { key: 'dairy',  label: '🥛 Молочні' },
  { key: 'meat',   label: '🥩 М\'ясо' },
  { key: 'veggie', label: '🥦 Овочі' },
  { key: 'bread',  label: '🍞 Хліб' },
  { key: 'drink',  label: '🧃 Напої' },
  { key: 'other',  label: '📦 Інше' },
];

// Category icons / colors
const ICONS  = { dairy:'🥛', meat:'🥩', veggie:'🥦', drink:'🧃', bread:'🍞', other:'📦' };
const CLRS   = { dairy:'#C6E8DB', meat:'#F6CFC0', veggie:'#D5E8B7', drink:'#C9DDF7', bread:'#F4DCAD', other:'#E3DFD2' };
const BCOLS  = ['#1553D4','#1D9E75','#C97A0B','#C52F2F','#9C27B0','#00838F'];
const CAT_NAME = { dairy:'Молочні', meat:"М'ясо", veggie:'Овочі', drink:'Напої', bread:'Хліб', other:'Інше' };

// AI providers config
const AI_PROVIDERS = {
  claude: {
    name: 'Claude',
    icon: '🤖',
    color: '#CC785C',
    placeholder: 'sk-ant-api03-...',
    loginUrl: 'https://console.anthropic.com/settings/keys',
    steps: [
      'Натисніть кнопку "Відкрити сайт" вище',
      'Увійдіть у свій акаунт Anthropic',
      'Натисніть <b>Create Key</b> та скопіюйте',
      'Поверніться сюди — ключ вставиться автоматично',
    ],
  },
  openai: {
    name: 'ChatGPT',
    icon: '💬',
    color: '#10A37F',
    placeholder: 'sk-proj-...',
    loginUrl: 'https://platform.openai.com/api-keys',
    steps: [
      'Натисніть кнопку "Відкрити сайт" вище',
      'Увійдіть у свій акаунт OpenAI',
      'Натисніть <b>Create new secret key</b> та скопіюйте',
      'Поверніться сюди — ключ вставиться автоматично',
    ],
  },
  gemini: {
    name: 'Gemini',
    icon: '✨',
    color: '#4285F4',
    placeholder: 'AIzaSy...',
    loginUrl: 'https://aistudio.google.com/app/apikey',
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
