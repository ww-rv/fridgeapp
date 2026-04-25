// ===== ICON DATABASE =====
// Format: [emoji, name_UA, category_key, search_keywords]
const ICON_DB = [
  // 🥛 МОЛОЧНІ ТА ЯЙЦЯ
  ['milk-bottle-100.svg','Молоко','dairy','молоко milk питне', 60],
  ['milk-bottle-100.svg','Кефір','dairy','кефір кисляк', 53],
  ['milk-bottle-100.svg','Ряжанка','dairy','ряжанка варенець', 65],
  ['yogurt-100.svg','Йогурт питний','dairy','йогурт yogurt питний', 70],
  ['yogurt-100.svg','Йогурт густий','dairy','йогурт yogurt густий грецький', 90],
  ['cheese-100.svg','Сир кисломолочний','dairy','сир рікота творог cottage', 120],
  ['yogurt-100.svg','Сметана','dairy','сметана cream sour', 200],
  ['milk-bottle-100.svg','Вершки','dairy','вершки cream', 250],
  ['cheese-100.svg','Твердий сир','dairy','сир cheese чедер пармезан твердий', 350],
  ['cheese-100.svg','М\'який сир','dairy','сир мягкий фета бринза брі камамбер', 280],
  ['butter-100.svg','Вершкове масло','dairy','масло butter вершкове', 717],
  ['cheese-100.svg','Плавлений сир','dairy','сир плавлений', 250],
  ['eggs-100.svg','Яйця курячі','dairy','яйця egg куряч', 155],
  ['eggs-100.svg','Яйця перепелині','dairy','яйця egg перепелині', 158],
  ['yogurt-100.svg','Морозиво','dairy','морозиво ice cream', 200],
  ['milk-bottle-100.svg','Маслянка','dairy','маслянка buttermilk', 40],
  ['cake-100.svg','Сирники','dairy','сирники запіканка syrnyky', 220],
  ['milk-bottle-100.svg','Згущонка','dairy','згущонка згущене молоко condensed milk', 320],

  // 🍞 ХЛІБ ТА ВИПІЧКА
  ['bread-loaf-100.svg','Хліб білий','bread','хліб bread білий', 260],
  ['bread-loaf-100.svg','Хліб чорний','bread','хліб bread чорний', 220],
  ['baguette-100.svg','Багет','bread','багет baguette', 280],
  ['bread-loaf-100.svg','Булочка','bread','булочка bun', 300],
  ['naan-100.svg','Лаваш','bread','лаваш pita', 270],
  ['bread-loaf-100.svg','Батон','bread','батон loaf', 250],
  ['croissant-100.svg','Круасан','bread','круасан croissant', 400],
  ['pretzel-100.svg','Сушки','bread','сушки баранки', 380],
  ['biscuits-100.svg','Сухарі','bread','сухарі crackers грінки панірувальні', 390],
  ['biscuits-100.svg','Хлібець','bread','хлібець crispbread', 350],
  ['pie-100.svg','Пиріжок','bread','пиріжок pie', 290],
  ['doughnut-100.svg','Бублик','bread','бублик bagel', 280],
  ['croissant-100.svg','Слойка','bread','слойка pastry', 350],
  ['cupcake-100.svg','Пампушка','bread','пампушка', 310],
  ['cake-100.svg','Торт','bread','торт cake', 380],
  ['biscuits-100.svg','Вафлі','bread','вафлі waffle', 450],
  ['pie-100.svg','Млинці','bread','млинці pancake', 220],
  ['pizza-100.svg','Піца','bread','піца pizza', 260],
  ['flour-100.svg','Тісто','bread','тісто dough листкове дріжджове', 270],
  ['pie-100.svg','Тарталетки','bread','тарталетки tartlets', 400],

  // 🥩 М'ЯСО ТА ПТИЦЯ
  ['poultry-leg-100.svg','Курка ціла','meat','курка chicken ціла', 190],
  ['fried-chicken-100.svg','Куряче філе','meat','курка chicken філе груди', 110],
  ['meat-100.svg','Свинина ошийок','meat','свинина pork ошийок', 260],
  ['steak-100.svg','Свинина ребра','meat','свинина ребра pork', 280],
  ['beef-100.svg','Яловичина стейк','meat','яловичина beef стейк', 200],
  ['poultry-leg-100.svg','Індича філе','meat','індичка turkey філе', 115],
  ['poultry-leg-100.svg','Качка','meat','качка duck', 330],
  ['meat-100.svg','Кролик','meat','кролик rabbit', 135],
  ['meat-100.svg','Фарш','meat','фарш minced meat', 220],
  ['bacon-100.svg','Сало','meat','сало lard', 800],
  ['meat-100.svg','Печінка','meat','печінка liver субпродукти', 130],
  ['meat-100.svg','Серця','meat','серця heart субпродукти', 110],
  ['meat-100.svg','Шлунки','meat','шлунки gizzard субпродукти', 90],
  ['beef-100.svg','Телятина','meat','телятина veal', 100],
  ['rack-of-lamb-100.svg','Баранина','meat','баранина lamb', 290],
  ['meat-100.svg','Тушонка','meat','тушонка canned meat', 250],

  // 🌭 КОВБАСНІ ВИРОБИ
  ['sausage-100.svg','Варена ковбаса','deli','ковбаса варена sausage', 250],
  ['salami-100.svg','Салямі','deli','салямі salami сляміх', 400],
  ['sausages-100.svg','Сосиски','deli','сосиски frankfurters мисливські', 270],
  ['salami-100.svg','Сирокопчена ковбаса','deli','ковбаса сирокопчена', 450],
  ['meat-100.svg','Шинка','deli','шинка ham', 145],
  ['bacon-100.svg','Бекон','deli','бекон bacon', 540],
  ['meat-100.svg','Паштет','deli','паштет pate', 315],
  ['sausage-100.svg','Кров\'янка','deli','кров\'янка blood sausage', 300],
  ['meat-100.svg','Зельц','deli','зельц headcheese', 220],
  ['sausage-100.svg','Лівера ковбаса','deli','лівер liver sausage', 320],
  ['meat-100.svg','Буженина','deli','буженина roast pork', 260],
  ['bacon-100.svg','Грудинка','deli','грудинка bacon belly', 500],
  ['meat-100.svg','Балик','deli','балик cured meat корейка карбонад', 160],
  ['jamon-100.svg','Хамон','deli','хамон jamon прошутто', 240],

  // 🐟 РИБА ТА МОРЕПРОДУКТИ
  ['whole-fish-100.svg','Лосось','fish','лосось salmon форель сьомга', 200],
  ['whole-fish-100.svg','Оселедець','fish','оселедець herring', 160],
  ['prawn-100.svg','Креветки','fish','креветки shrimp', 90],
  ['octopus-100.svg','Кальмари','fish','кальмари squid', 95],
  ['shellfish-100.svg','Мідії','fish','мідії mussels', 85],
  ['fish-food-100.svg','Червона ікра','fish','ікра caviar червона', 250],
  ['crab-100.svg','Крабові палички','fish','краб crab палички', 100],
  ['fish-food-100.svg','Морська капуста','fish','морська капуста seaweed', 25],
  ['whole-fish-100.svg','Скумбрія копчена','fish','скумбрія mackerel копчена', 220],
  ['whole-fish-100.svg','Шпроти','fish','шпроти sprats сардини', 360],
  ['shellfish-100.svg','Морський коктейль','fish','морепродукти seafood коктейль восьминіг', 90],
  ['fish-food-100.svg','Ікра мойви','fish','ікра мойва capelin чорна', 130],
  ['whole-fish-100.svg','Тунець консерва','fish','тунець tuna консерва', 110],
  ['whole-fish-100.svg','Хек','fish','хек hake минтай', 85],
  ['whole-fish-100.svg','Короп','fish','короп carp карась щука вугор', 110],

  // 🌾 БАКАЛІЯ
  ['grains-of-rice-100.svg','Гречка','grocery','гречка buckwheat крупи', 343],
  ['grains-of-rice-100.svg','Рис','grocery','рис rice крупи', 360],
  ['grains-of-rice-100.svg','Вівсянка','grocery','вівсянка oats вівсяна', 370],
  ['white-beans-100.svg','Квасоля','grocery','квасоля beans', 330],
  ['noodles-100.svg','Макарони','grocery','макарони pasta спагетті', 350],
  ['flour-100.svg','Борошно','grocery','борошно flour пшеничне', 364],
  ['sugar-cubes-100.svg','Цукор','grocery','цукор sugar', 387],
  ['salt-shaker-100.svg','Сіль','grocery','сіль salt морська', 0],
  ['flour-100.svg','Сода','grocery','сода baking soda', 0],
  ['flour-100.svg','Дріжджі','grocery','дріжджі yeast', 100],
  ['grains-of-rice-100.svg','Пластівці','grocery','пластівці cereals granola', 380],
  ['grains-of-rice-100.svg','Мюслі','grocery','мюслі muesli', 390],
  ['grocery-100.svg','Оцет','grocery','оцет vinegar', 15],
  ['peas-100.svg','Горох','grocery','горох peas', 350],
  ['white-beans-100.svg','Сочевиця','grocery','сочевиця lentils нут', 350],
  ['grains-of-rice-100.svg','Булгур','grocery','булгур bulgur кускус кіноа', 340],
  ['grains-of-rice-100.svg','Манка','grocery','манка перловка пшоно', 360],
  ['flour-100.svg','Желатин','grocery','желатин крохмаль', 350],
  ['flour-100.svg','Какао-порошок','grocery','какао-порошок cocoa powder', 230],
  ['nut-100.svg','Насіння','grocery','насіння соняшника гарбуза кунжут чіа лляне', 550],

  // 🥦 ОВОЧІ ТА ФРУКТИ
  ['potato-100.svg','Картопля','veggie','картопля potato', 77],
  ['tomato-100.svg','Помідори','veggie','помідор томат tomato', 18],
  ['cucumber-100.svg','Огірки','veggie','огірок cucumber', 15],
  ['paprika-100.svg','Болгарський перець','veggie','перець pepper болгарський', 25],
  ['broccoli-100.svg','Брокколі','veggie','брокколі broccoli цвітна капуста брюссельська', 34],
  ['apple-fruit-100.svg','Яблука','veggie','яблуко apple', 52],
  ['banana-100.svg','Банани','veggie','банан banana', 89],
  ['grapes-100.svg','Виноград','veggie','виноград grape', 69],
  ['strawberry-100.svg','Полуниця','veggie','полуниця strawberry суниця', 32],
  ['garlic-100.svg','Часник','veggie','часник garlic', 149],
  ['onion-100.svg','Зелена цибуля','veggie','цибуля зелена green onion', 20],
  ['basil-100.svg','Кріп','veggie','кріп dill зелень петрушка кінза базилік м\'ята', 40],
  ['mushroom-100.svg','Печериці','veggie','гриби mushroom печериці', 22],
  ['carrot-100.svg','Морква','veggie','морква carrot', 41],
  ['onion-100.svg','Цибуля','veggie','цибуля onion', 40],
  ['cabbage-100.svg','Капуста','veggie','капуста cabbage пекінська', 25],
  ['avocado-100.svg','Авокадо','veggie','авокадо avocado', 160],
  ['citrus-100.svg','Лимон','veggie','лимон lemon', 29],
  ['orange-100.svg','Апельсин','veggie','апельсин orange мандарин грейпфрут помело', 47],
  ['pear-100.svg','Груша','veggie','груша pear', 57],
  ['cherry-100.svg','Вишня','veggie','вишня cherry черешня', 50],
  ['mango-100.svg','Манго','veggie','манго mango', 60],
  ['blueberry-100.svg','Чорниця','veggie','чорниця blueberry лохина ожина смородина', 45],
  ['peach-100.svg','Персик','veggie','персик peach абрикос', 39],
  ['chili-pepper-100.svg','Перець гострий','veggie','перець chili гострий', 40],
  ['sweet-potato-100.svg','Батат','veggie','батат sweet potato', 86],
  ['eggplant-100.svg','Баклажан','veggie','баклажан eggplant кабачок цукіні патисон', 24],
  ['corn-100.svg','Кукурудза свіжа','veggie','кукурудза corn fresh', 86],
  ['olive-100.svg','Оливки свіжі','veggie','оливки olive маслини', 115],
  ['beet-100.svg','Буряк','veggie','буряк beet редис дайкон', 43],
  ['pumpkin-100.svg','Гарбуз','veggie','гарбуз pumpkin', 26],
  ['salad-100.svg','Салат','veggie','салат шпинат рукола айсберг селера спаржа', 15],
  ['watermelon-100.svg','Кавун','veggie','кавун диня', 30],
  ['kiwi-100.svg','Ківі','veggie','ківі kiwi гранат хурма інжир', 61],
  ['plum-100.svg','Фініки','veggie','фініки dates чорнослив курага родзинки', 280],
  ['nut-100.svg','Горіхи','veggie','горіхи волоські фундук мигдаль кеш\'ю фісташки', 600],

  // 🥫 КОНСЕРВИ ТА ЗАКРУТКИ
  ['grocery-100.svg','Тушкованка','canned','тушкованка canned meat', 250],
  ['grocery-100.svg','Тунець консерва','canned','тунець tuna консерва', 110],
  ['corn-100.svg','Кукурудза консерва','canned','кукурудза corn консерва', 85],
  ['peas-100.svg','Горошок консерва','canned','горошок peas консерва', 65],
  ['cucumber-100.svg','Мариновані огірки','canned','огірки мариновані pickles солоні', 15],
  ['grocery-100.svg','Ікра кабачкова','canned','ікра кабачкова caviar', 90],
  ['olive-100.svg','Оливки консерва','canned','оливки olive маслини jar каперси', 115],
  ['pineapple-100.svg','Ананаси консерва','canned','ананас pineapple canned', 60],
  ['milk-bottle-100.svg','Згущене молоко','canned','згущене молоко condensed milk', 320],
  ['jam-100.svg','Варення','canned','варення jam джем', 270],
  ['paprika-100.svg','Лечо','canned','лечо lecho', 80],
  ['white-beans-100.svg','Квасоля в томаті','canned','квасоля beans tomato', 110],
  ['peach-100.svg','Персики консерва','canned','персики peach canned', 65],
  ['tomato-100.svg','В\'ялені томати','canned','в\'ялені томати мариновані помідори', 250],
  ['mushroom-100.svg','Гриби мариновані','canned','гриби мариновані', 25],
  ['whole-fish-100.svg','Кілька в томаті','canned','кілька сардини', 180],

  // 🧴 СОУСИ, ОЛІЇ ТА ПРИПРАВИ
  ['olive-oil-100.svg','Соняшникова олія','sauces','олія sunflower oil', 899],
  ['olive-oil-100.svg','Оливкова олія','sauces','олія olive oil оливкова', 884],
  ['mayonnaise-100.svg','Майонез','sauces','майонез mayonnaise', 680],
  ['ketchup-100.svg','Кетчуп','sauces','кетчуп ketchup аджика', 110],
  ['mustard-100.svg','Гірчиця','sauces','гірчиця mustard хрін васабі', 65],
  ['soy-100.svg','Соєвий соус','sauces','соус soy sauce соєвий теріякі', 55],
  ['ketchup-100.svg','Томатна паста','sauces','томатна паста tomato paste', 80],
  ['spice-100.svg','Чорний перець','sauces','перець чорний black pepper спеції', 250],
  ['paprika-100.svg','Паприка','sauces','паприка paprika спеції', 280],
  ['thyme-100.svg','Лавровий лист','sauces','лавровий лист bay leaf', 300],
  ['thyme-100.svg','Італійські трави','sauces','трави herbs italian', 250],
  ['garlic-100.svg','Часник сушений','sauces','часник garlic сушений powder', 330],
  ['spice-100.svg','Куркума','sauces','куркума turmeric спеції коріандр', 310],
  ['honey-100.svg','Мед','sauces','мед honey', 300],
  ['peanuts-100.svg','Арахісова паста','sauces','арахіс peanut butter pasta', 580],
  ['worcestershire-sauce-100.svg','Оцет яблучний','sauces','оцет яблучний бальзамічний', 20],
  ['mayonnaise-100.svg','Соус песто','sauces','соус песто тартар сирний сметанний', 400],
  ['cinnamon-sticks-100.svg','Кориця','sauces','кориця гвоздика ваніль мускатний горіх', 240],

  // 🍬 СОЛОДОЩІ ТА СНЕКИ
  ['chocolate-bar-100.svg','Шоколад','sweets','шоколад chocolate', 540],
  ['candy-100.svg','Цукерки','sweets','цукерки candy жуйки льодяники', 400],
  ['cookie-100.svg','Печиво','sweets','печиво cookie бісквіт', 450],
  ['biscuits-100.svg','Вафлі солодкі','sweets','вафлі waffle sweet', 500],
  ['cake-100.svg','Торт','sweets','торт cake', 380],
  ['jelly-100.svg','Зефір','sweets','зефір marshmallow', 320],
  ['jelly-100.svg','Мармелад','sweets','мармелад jelly желе пудинг', 300],
  ['cookie-100.svg','Халва','sweets','халва halva', 500],
  ['french-fries-100.svg','Чіпси','sweets','чіпси chips снеки', 530],
  ['peanuts-100.svg','Горішки снек','sweets','горішки nuts snack', 600],
  ['popcorn-100.svg','Попкорн','sweets','попкорн popcorn', 380],
  ['honey-100.svg','Мед баночка','sweets','мед honey jar', 300],
  ['cupcake-100.svg','Кекси','sweets','кекси мафіни брауні макарон', 400],
  ['chocolate-bar-100.svg','Нутелла','sweets','нутелла nutella', 540],
  ['honey-100.svg','Сироп','sweets','сироп клен карамель', 300],

  // 🧃 НАПОЇ
  ['soda-water-100.svg','Вода негазована','drink','вода water негазована', 0],
  ['soda-water-100.svg','Мінеральна вода','drink','мінеральна вода mineral water', 0],
  ['orange-juice-100.svg','Сік','drink','сік juice нектар', 45],
  ['cola-100.svg','Кола','drink','кола cola pepsi', 42],
  ['cola-100.svg','Квас','drink','квас kvass', 25],
  ['orange-soda-100.svg','Енергетик','drink','енергетик energy drink', 45],
  ['green-tea-100.svg','Чай чорний','drink','чай tea чорний black', 2],
  ['green-tea-100.svg','Чай зелений','drink','чай tea зелений green', 2],
  ['coffee-beans-100.svg','Кава зернова','drink','кава coffee зернова beans', 5],
  ['coffee-capsule-100.svg','Кава розчинна','drink','кава coffee розчинна instant', 5],
  ['coffee-beans-100.svg','Какао','drink','какао cocoa', 80],
  ['lemonade-100.svg','Узвар','drink','узвар compote сухофрукти морс', 35],
  ['lemonade-100.svg','Лимонад','drink','лимонад lemonade тонік', 40],
  ['cola-100.svg','Пиво','drink','пиво beer сидр', 45],
  ['food-and-wine-100.svg','Вино','drink','вино wine шампанське', 85],
  ['lemonade-100.svg','Комбуча','drink','комбуча смузі', 30],
  ['food-and-wine-100.svg','Коньяк','drink','коньяк горілка віскі ром джин текіла лікер', 230],

  // ❄️ ЗАМОРОЗКА / ІНШЕ
  ['dim-sum-100.svg','Пельмені','other','пельмені dumplings frozen', 250],
  ['dim-sum-100.svg','Вареники','other','вареники pierogi frozen картоплею вишнею', 200],
  ['meat-100.svg','Котлети заморожені','other','котлети frozen cutlets', 230],
  ['fried-chicken-100.svg','Нагетси','other','нагетси nuggets frozen', 280],
  ['salad-100.svg','Овочеві суміші','other','овочі суміш frozen mix vegetables', 40],
  ['broccoli-100.svg','Броколі заморожені','other','броколі broccoli frozen', 34],
  ['strawberry-100.svg','Ягідна суміш','other','ягоди berries frozen mix фрукти', 45],
  ['flour-100.svg','Тісто листкове','other','тісто frozen dough', 360],
  ['taco-100.svg','Млинці з м\'ясом','other','млинці pancakes frozen meat', 220],
  ['yogurt-100.svg','Морозиво стаканчик','other','морозиво ice cream sticks', 240],
  ['french-fries-100.svg','Картопля фрі','other','картопля fries frozen', 300],
  ['fish-food-100.svg','Рибні палички','other','рибні палички fish sticks frozen', 200],
  ['soda-water-100.svg','Лід','other','лід ice', 0],

  // 📦 БАЗОВА ІКОНКА (якщо нічого не підходить)
  ['grocery-100.svg','Інше','other','інше other misc', 100]
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
  { key: 'dairy',   label: 'Молочні та яйця',  icon: 'milk-bottle-100.svg', shelfLife: 7 },
  { key: 'bread',   label: 'Хліб та випічка',  icon: 'bread-loaf-100.svg', shelfLife: 5 },
  { key: 'meat',    label: "М'ясо та птиця",   icon: 'meat-100.svg', shelfLife: 4 },
  { key: 'deli',    label: 'Ковбасні вироби',  icon: 'sausage-100.svg', shelfLife: 10 },
  { key: 'fish',    label: 'Риба та море',      icon: 'whole-fish-100.svg', shelfLife: 3 },
  { key: 'grocery', label: 'Бакалія',           icon: 'grains-of-rice-100.svg', shelfLife: 365 },
  { key: 'veggie',  label: 'Овочі та фрукти',  icon: 'broccoli-100.svg', shelfLife: 14 },
  { key: 'canned',  label: 'Консерви',          icon: 'jam-100.svg', shelfLife: 365 },
  { key: 'sauces',  label: 'Соуси та приправи', icon: 'ketchup-100.svg', shelfLife: 90 },
  { key: 'sweets',  label: 'Солодощі та снеки', icon: 'candy-100.svg', shelfLife: 90 },
  { key: 'drink',   label: 'Напої',             icon: 'orange-juice-100.svg', shelfLife: 30 },
  { key: 'other',   label: 'Інше',              icon: 'grocery-100.svg', shelfLife: 30 },
];

// Category icons (for stats + fallback)
const ICONS = {
  dairy: 'milk-bottle-100.svg', bread: 'bread-loaf-100.svg', meat: 'meat-100.svg', deli: 'sausage-100.svg', fish: 'whole-fish-100.svg',
  grocery: 'grains-of-rice-100.svg', veggie: 'broccoli-100.svg', canned: 'jam-100.svg', sauces: 'ketchup-100.svg',
  sweets: 'candy-100.svg', drink: 'orange-juice-100.svg', other: 'grocery-100.svg',
  // backward compat aliases
  drinks: 'orange-juice-100.svg', produce: 'broccoli-100.svg', frozen: 'grocery-100.svg',
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
  if (/молок|кефір|йогурт|ряжанк|вершк|сметан|яйц|сир|морозив|маслянк|запіканк|згущонк|згущен|брі|камамбер/.test(n)) return 'dairy';
  if (/хліб|батон|булк|круасан|лаваш|сухар|пиріж|бублик|пампушк|випічк|піца|грінк|панірувальн|тарталетк|тісто/.test(n)) return 'bread';
  if (/курк|свинин|яловичин|м'ясо|м\'ясо|фарш|качк|кролик|індич|печінк|серц|шлунк|сало|телятин|баранин|тушонк/.test(n)) return 'meat';
  if (/ковбас|сосис|бекон|шинк|паштет|балик|буженин|зельц|салямі|корейк|карбонад|хамон|прошутт/.test(n)) return 'deli';
  if (/риба|лосось|оселед|тунець|форель|креветк|мідії|кальмар|скумбр|шпрот|ікра|сьомга|хек|минтай|короп|карась|щука|вугор|восьминіг|сардин|кілька/.test(n)) return 'fish';
  if (/рис|гречк|вівсянк|макарон|борошн|цукор|сіль|горох|квасол|сочевиц|крупи|пластівц|мюслі|оцет|булгур|кускус|кіноа|нут|перловк|пшоно|манка|желатин|крохмаль|какао|насінн|кунжут|чіа/.test(n)) return 'grocery';
  if (/помідор|огірок|капуст|яблук|банан|морква|картопл|перець|овоч|фрукт|зелен|часник|цибул|полуниц|виноград|брокол|авокад|лимон|апельсин|гриб|печериц|буряк|редис|дайкон|гарбуз|кабачок|цукіні|патисон|селер|шпинат|рукол|айсберг|спарж|диня|кавун|грейпфрут|помело|мандарин|ківі|гранат|хурма|інжир|фінік|чорнослив|кураг|родзинк|малин|ожин|смородин|лохин|горіх|фундук|мигдаль|кеш|фісташк/.test(n)) return 'veggie';
  if (/консерв|тушков|варення|джем|ікра кабачк|мариновані|лечо|в\'ялені|солоні/.test(n)) return 'canned';
  if (/олія|кетчуп|майонез|соус|гірчиц|паприк|куркум|лавров|трав|спеці|аджик|хрін|васабі|теріякі|песто|тартар|кориц|гвоздик|ваніль|мускат|коріандр/.test(n)) return 'sauces';
  if (/шоколад|цукерк|печиво|торт|вафл|зефір|мармелад|халва|чіпси|горішк|попкорн|жуйк|льодяник|желе|пудинг|мафін|кекс|брауні|макарон|нутелл|сироп/.test(n)) return 'sweets';
  if (/вода|сік|кола|чай|кава|напій|квас|лимонад|узвар|енергетик|пиво|вино|какао|комбуч|смузі|морс|тонік|сидр|шампанськ|коньяк|горілк|віскі|ром|джин|текіл|лікер/.test(n)) return 'drink';
  return 'other';
}

// Icon picker category filter list
const ICON_CATS = [
  { key: 'all',     label: 'Всі' },
  { key: 'dairy',   label: 'Молочні', icon: 'milk-bottle-100.svg' },
  { key: 'bread',   label: 'Хліб', icon: 'bread-loaf-100.svg' },
  { key: 'meat',    label: 'М\'ясо', icon: 'meat-100.svg' },
  { key: 'deli',    label: 'Ковбасні', icon: 'sausage-100.svg' },
  { key: 'fish',    label: 'Риба', icon: 'whole-fish-100.svg' },
  { key: 'grocery', label: 'Бакалія', icon: 'grains-of-rice-100.svg' },
  { key: 'veggie',  label: 'Овочі', icon: 'broccoli-100.svg' },
  { key: 'canned',  label: 'Консерви', icon: 'jam-100.svg' },
  { key: 'sauces',  label: 'Соуси', icon: 'ketchup-100.svg' },
  { key: 'sweets',  label: 'Солодощі', icon: 'candy-100.svg' },
  { key: 'drink',   label: 'Напої', icon: 'orange-juice-100.svg' },
  { key: 'other',   label: 'Інше', icon: 'grocery-100.svg' },
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
