export type Language = 'en' | 'es' | 'ar' | 'de' | 'ru' | 'uk';

export type Translations = {
  // Navigation
  backToHome: string;
  progress: string;
  yourProgress: string;
  completedModules: string;
  
  // Header Navigation
  modules: string;
  about: string;
  forEducators: string;
  glossary: string;
  resources: string;
  
  // Glossary Page
  searchTerms: string;
  noTermsFound: string;
  termsDisplayed: string;
  exploreTerms: string;
  
  // Intro Page
  climateEducation: string;
  mainTitle: string;
  introP1: string;
  introP2: string;
  whatYouLearn: string;
  startJourney: string;
  continueJourney: string;
  
  // Modules
  module1: string;
  module2: string;
  module3: string;
  module4: string;
  module5: string;
  
  // Module Page
  back: string;
  next: string;
  complete: string;
  completed: string;
  reflection: string;
  typeYourThoughts: string;
  watchLearn: string;
  interactiveDashboard: string;
  
  // Ending Page
  congratulations: string;
  journeyComplete: string;
  completedAllModules: string;
  yourReflections: string;
  restartJourney: string;
  backHome: string;
  
  // Dashboard
  temperature: string;
  seaLevel: string;
  emissions: string;
  renewableEnergy: string;
  coalUse: string;
  oilUse: string;
  gasUse: string;
  deforestation: string;
  reset: string;
  
  // Glossary
  gotIt: string;
};

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    backToHome: 'Back to Home',
    progress: 'Progress',
    yourProgress: 'Your Progress',
    completedModules: 'modules completed',
    
    // Header Navigation
    modules: 'Modules',
    about: 'About',
    forEducators: 'For Educators',
    glossary: 'Glossary',
    resources: 'Resources',
    
    // Glossary Page
    searchTerms: 'Search Terms',
    noTermsFound: 'No Terms Found',
    termsDisplayed: 'Terms Displayed',
    exploreTerms: 'Explore Terms',
    
    // Intro Page
    climateEducation: 'Climate Education',
    mainTitle: 'The Systems that Shape Climate Change',
    introP1: 'Welcome to an interactive learning journey designed for young changemakers like you. Climate change isn\'t just about science—it\'s about understanding the systems that shape our world and discovering where you can make a difference.',
    introP2: 'Through 5 interactive modules, you\'ll explore how climate systems work, what futures are possible, and where you have the power to create change. Each module includes learning materials, videos, and space for your personal reflections.',
    whatYouLearn: 'What You\'ll Learn',
    startJourney: 'Start Your Journey',
    continueJourney: 'Continue Learning',
    
    // Modules
    module1: 'Relating to Climate Futures',
    module2: 'Stock and Flow',
    module3: 'Roadmap to Possible Futures',
    module4: 'Systems View of Climate Solutions',
    module5: 'Lever of Change',
    
    // Module Page
    back: 'Back',
    next: 'Next',
    complete: 'Complete Module',
    completed: 'Completed',
    reflection: 'Reflection',
    typeYourThoughts: 'Type your thoughts here...',
    watchLearn: 'Watch & Learn',
    interactiveDashboard: 'Interactive Dashboard',
    
    // Ending Page
    congratulations: 'Congratulations!',
    journeyComplete: 'You\'ve completed your climate systems learning journey!',
    completedAllModules: 'You\'ve completed all 5 modules and gained deep insights into climate systems.',
    yourReflections: 'Your Reflections',
    restartJourney: 'Restart Journey',
    backHome: 'Back to Home',
    
    // Dashboard
    temperature: 'Temperature',
    seaLevel: 'Sea Level',
    emissions: 'Emissions',
    renewableEnergy: 'Renewable Energy',
    coalUse: 'Coal Use',
    oilUse: 'Oil Use',
    gasUse: 'Gas Use',
    deforestation: 'Deforestation',
    reset: 'Reset',
    
    // Glossary
    gotIt: 'Got it'
  },
  
  es: {
    // Navigation
    backToHome: 'Volver al Inicio',
    progress: 'Progreso',
    yourProgress: 'Tu Progreso',
    completedModules: 'módulos completados',
    
    // Header Navigation
    modules: 'Módulos',
    about: 'Acerca de',
    forEducators: 'Para Educadores',
    glossary: 'Glosario',
    resources: 'Recursos',
    
    // Glossary Page
    searchTerms: 'Buscar Términos',
    noTermsFound: 'No Se Encontraron Términos',
    termsDisplayed: 'Términos Mostrados',
    exploreTerms: 'Explorar Términos',
    
    // Intro Page
    climateEducation: 'Educación Climática',
    mainTitle: 'Los Sistemas que Dan Forma al Cambio Climático',
    introP1: 'Bienvenido a un viaje de aprendizaje interactivo diseñado para jóvenes agentes de cambio como tú. El cambio climático no se trata solo de ciencia, se trata de entender los sistemas que dan forma a nuestro mundo y descubrir dónde puedes marcar la diferencia.',
    introP2: 'A través de 5 módulos interactivos, explorarás cómo funcionan los sistemas climáticos, qué futuros son posibles y dónde tienes el poder de crear cambios. Cada módulo incluye materiales de aprendizaje, videos y espacio para tus reflexiones personales.',
    whatYouLearn: 'Lo Que Aprenderás',
    startJourney: 'Comienza Tu Viaje',
    continueJourney: 'Continuar Aprendiendo',
    
    // Modules
    module1: 'Relacionándose con los Futuros Climáticos',
    module2: 'Existencias y Flujo',
    module3: 'Hoja de Ruta hacia Futuros Posibles',
    module4: 'Vista de Sistemas de Soluciones Climáticas',
    module5: 'Palanca de Cambio',
    
    // Module Page
    back: 'Atrás',
    next: 'Siguiente',
    complete: 'Completar Módulo',
    completed: 'Completado',
    reflection: 'Reflexión',
    typeYourThoughts: 'Escribe tus pensamientos aquí...',
    watchLearn: 'Ver y Aprender',
    interactiveDashboard: 'Panel Interactivo',
    
    // Ending Page
    congratulations: '¡Felicitaciones!',
    journeyComplete: '¡Has completado tu viaje de aprendizaje sobre sistemas climáticos!',
    completedAllModules: 'Has completado los 5 módulos y obtenido conocimientos profundos sobre los sistemas climáticos.',
    yourReflections: 'Tus Reflexiones',
    restartJourney: 'Reiniciar Viaje',
    backHome: 'Volver al Inicio',
    
    // Dashboard
    temperature: 'Temperatura',
    seaLevel: 'Nivel del Mar',
    emissions: 'Emisiones',
    renewableEnergy: 'Energía Renovable',
    coalUse: 'Uso de Carbón',
    oilUse: 'Uso de Petróleo',
    gasUse: 'Uso de Gas',
    deforestation: 'Deforestación',
    reset: 'Restablecer',
    
    // Glossary
    gotIt: 'Entendido'
  },
  
  ar: {
    // Navigation
    backToHome: 'العودة إلى الصفحة الرئيسية',
    progress: 'التقدم',
    yourProgress: 'تقدمك',
    completedModules: 'وحدات مكتملة',
    
    // Header Navigation
    modules: 'وحدات',
    about: 'عن',
    forEducators: 'للمعلمين',
    glossary: 'مفردات',
    resources: 'موارد',
    
    // Glossary Page
    searchTerms: 'بحث المصطلحات',
    noTermsFound: 'لم يتم العثور على أي مصطلحات',
    termsDisplayed: 'مصطلحات معرضة',
    exploreTerms: 'استكشاف المصطلحات',
    
    // Intro Page
    climateEducation: 'التعليم المناخي',
    mainTitle: 'الأنظمة التي تشكل تغير المناخ',
    introP1: 'مرحبًا بك في رحلة تعليمية تفاعلية مصممة لصناع التغيير الشباب مثلك. تغير المناخ ليس مجرد علم - إنه يتعلق بفهم الأنظمة التي تشكل عالمنا واكتشاف أين يمكنك إحداث فرق.',
    introP2: 'من خلال 5 وحدات تفاعلية، ستستكشف كيفية عمل الأنظمة المناخية، وما هي المستقبلات الممكنة، وأين لديك القدرة على إحداث التغيير. تتضمن كل وحدة مواد تعليمية ومقاطع فيديو ومساحة لتأملاتك الشخصية.',
    whatYouLearn: 'ما ستتعلمه',
    startJourney: 'ابدأ رحلتك',
    continueJourney: 'متابعة التعلم',
    
    // Modules
    module1: 'الارتباط بالمستقبلات المناخية',
    module2: 'المخزون والتدفق',
    module3: 'خريطة الطريق إلى المستقبلات المحتملة',
    module4: 'رؤية الأنظمة للحلول المناخية',
    module5: 'رافعة التغيير',
    
    // Module Page
    back: 'رجوع',
    next: 'التالي',
    complete: 'إكمال الوحدة',
    completed: 'مكتمل',
    reflection: 'تأمل',
    typeYourThoughts: 'اكتب أفكارك هنا...',
    watchLearn: 'شاهد وتعلم',
    interactiveDashboard: 'لوحة تفاعلية',
    
    // Ending Page
    congratulations: 'تهانينا!',
    journeyComplete: 'لقد أكملت رحلة تعلم الأنظمة المناخية!',
    completedAllModules: 'لقد أكملت جميع الوحدات الخمس واكتسبت رؤى عميقة في الأنظمة المناخية.',
    yourReflections: 'تأملاتك',
    restartJourney: 'إعادة بدء الرحلة',
    backHome: 'العودة إلى الصفحة الرئيسية',
    
    // Dashboard
    temperature: 'درجة الحرارة',
    seaLevel: 'مستوى سطح البحر',
    emissions: 'الانبعاثات',
    renewableEnergy: 'الطاقة المتجددة',
    coalUse: 'استخدام الفحم',
    oilUse: 'استخدام النفط',
    gasUse: 'استخدام الغاز',
    deforestation: 'إزالة الغابات',
    reset: 'إعادة تعيين',
    
    // Glossary
    gotIt: 'فهمت'
  },
  
  de: {
    // Navigation
    backToHome: 'Zurück zur Startseite',
    progress: 'Fortschritt',
    yourProgress: 'Dein Fortschritt',
    completedModules: 'Module abgeschlossen',
    
    // Header Navigation
    modules: 'Module',
    about: 'Über',
    forEducators: 'Für Lehrer',
    glossary: 'Glossar',
    resources: 'Ressourcen',
    
    // Glossary Page
    searchTerms: 'Begriffe suchen',
    noTermsFound: 'Keine Begriffe gefunden',
    termsDisplayed: 'Angezeigte Begriffe',
    exploreTerms: 'Begriffe erkunden',
    
    // Intro Page
    climateEducation: 'Klimabildung',
    mainTitle: 'Die Systeme, die den Klimawandel prägen',
    introP1: 'Willkommen zu einer interaktiven Lernreise, die für junge Changemaker wie dich entwickelt wurde. Klimawandel geht nicht nur um Wissenschaft – es geht darum, die Systeme zu verstehen, die unsere Welt formen, und zu entdecken, wo du einen Unterschied machen kannst.',
    introP2: 'In 5 interaktiven Modulen erkundest du, wie Klimasysteme funktionieren, welche Zukünfte möglich sind und wo du die Macht hast, Veränderungen zu schaffen. Jedes Modul enthält Lernmaterialien, Videos und Raum für deine persönlichen Reflexionen.',
    whatYouLearn: 'Was Du Lernen Wirst',
    startJourney: 'Beginne Deine Reise',
    continueJourney: 'Weiter Lernen',
    
    // Modules
    module1: 'Bezug zu Klimazukünften',
    module2: 'Bestand und Fluss',
    module3: 'Fahrplan zu möglichen Zukünften',
    module4: 'Systemansicht der Klimalösungen',
    module5: 'Hebel der Veränderung',
    
    // Module Page
    back: 'Zurück',
    next: 'Weiter',
    complete: 'Modul Abschließen',
    completed: 'Abgeschlossen',
    reflection: 'Reflexion',
    typeYourThoughts: 'Schreibe deine Gedanken hier...',
    watchLearn: 'Ansehen & Lernen',
    interactiveDashboard: 'Interaktives Dashboard',
    
    // Ending Page
    congratulations: 'Glückwunsch!',
    journeyComplete: 'Du hast deine Lernreise zu Klimasystemen abgeschlossen!',
    completedAllModules: 'Du hast alle 5 Module abgeschlossen und tiefe Einblicke in Klimasysteme gewonnen.',
    yourReflections: 'Deine Reflexionen',
    restartJourney: 'Reise Neu Starten',
    backHome: 'Zurück zur Startseite',
    
    // Dashboard
    temperature: 'Temperatur',
    seaLevel: 'Meeresspiegel',
    emissions: 'Emissionen',
    renewableEnergy: 'Erneuerbare Energie',
    coalUse: 'Kohleverbrauch',
    oilUse: 'Ölverbrauch',
    gasUse: 'Gasverbrauch',
    deforestation: 'Entwaldung',
    reset: 'Zurücksetzen',
    
    // Glossary
    gotIt: 'Verstanden'
  },
  
  ru: {
    // Navigation
    backToHome: 'На главную',
    progress: 'Прогресс',
    yourProgress: 'Ваш прогресс',
    completedModules: 'модулей завершено',
    
    // Header Navigation
    modules: 'Модули',
    about: 'О нас',
    forEducators: 'Для учителей',
    glossary: 'Глоссарий',
    resources: 'Ресурсы',
    
    // Glossary Page
    searchTerms: 'Поиск терминов',
    noTermsFound: 'Термины не найдены',
    termsDisplayed: 'Отображаемые термины',
    exploreTerms: 'Исследовать термины',
    
    // Intro Page
    climateEducation: 'Климатическое образование',
    mainTitle: 'Системы, которые формируют изменение климата',
    introP1: 'Добро пожаловать в интерактивное образовательное путешествие, разработанное для молодых лидеров изменений, таких как вы. Изменение климата — это не только наука, это понимание систем, которые формируют наш мир, и открытие того, где вы можете изменить ситуацию.',
    introP2: 'В 5 интерактивных модулях вы изучите, как работают климатические системы, какие варианты будущего возможны и где у вас есть сила создавать изменения. Каждый модуль включает учебные материалы, видео и место для ваших личных размышлений.',
    whatYouLearn: 'Что Вы Изучите',
    startJourney: 'Начать путешествие',
    continueJourney: 'Продолжить обучение',
    
    // Modules
    module1: 'Отношение к климатическому будущему',
    module2: 'Запасы и потоки',
    module3: 'Дорожная карта к возможному будущему',
    module4: 'Системный взгляд на климатические решения',
    module5: 'Рычаги изменений',
    
    // Module Page
    back: 'Назад',
    next: 'Далее',
    complete: 'Завершить модуль',
    completed: 'Завершено',
    reflection: 'Размышление',
    typeYourThoughts: 'Напишите свои мысли здесь...',
    watchLearn: 'Смотреть и учиться',
    interactiveDashboard: 'Интерактивная панель',
    
    // Ending Page
    congratulations: 'Поздравляем!',
    journeyComplete: 'Вы завершили свое обучающее путешествие по климатическим системам!',
    completedAllModules: 'Вы завершили все 5 модулей и получили глубокие знания о климатических системах.',
    yourReflections: 'Ваши размышления',
    restartJourney: 'Начать заново',
    backHome: 'На главную',
    
    // Dashboard
    temperature: 'Температура',
    seaLevel: 'Уровень моря',
    emissions: 'Выбросы',
    renewableEnergy: 'Возобновляемая энергия',
    coalUse: 'Использование угля',
    oilUse: 'Использование нефти',
    gasUse: 'Использование газа',
    deforestation: 'Вырубка лесов',
    reset: 'Сбросить',
    
    // Glossary
    gotIt: 'Понял'
  },
  
  uk: {
    // Navigation
    backToHome: 'На головну',
    progress: 'Прогрес',
    yourProgress: 'Ваш прогрес',
    completedModules: 'модулів завершено',
    
    // Header Navigation
    modules: 'Модулі',
    about: 'Про нас',
    forEducators: 'Для вчителів',
    glossary: 'Глосарій',
    resources: 'Ресурси',
    
    // Glossary Page
    searchTerms: 'Пошук термінів',
    noTermsFound: 'Терміни не знайдено',
    termsDisplayed: 'Відображені терміни',
    exploreTerms: 'Дослідити терміни',
    
    // Intro Page
    climateEducation: 'Кліматична освіта',
    mainTitle: 'Системи, які формують зміну клімату',
    introP1: 'Ласкаво просимо до інтерактивної освітньої подорожі, розробленої для молодих лідерів змін, таких як ви. Зміна клімату — це не лише наука, це розуміння систем, які формують наш світ, і відкриття того, де ви можете змінити ситуацію.',
    introP2: 'У 5 інтерактивних модулях ви вивчите, як працюють кліматичні системи, які варіанти майбутнього можливі та де у вас є сила створювати зміни. Кожен модуль включає навчальні матеріали, відео та місце для ваших особистих роздумів.',
    whatYouLearn: 'Що Ви Вивчите',
    startJourney: 'Розпочати подорож',
    continueJourney: 'Продовжити навчання',
    
    // Modules
    module1: 'Ставлення до кліматичного майбутнього',
    module2: 'Запаси та потоки',
    module3: 'Дорожня карта до можливого майбутнього',
    module4: 'Системний погляд на кліматичні рішення',
    module5: 'Важелі змін',
    
    // Module Page
    back: 'Назад',
    next: 'Далі',
    complete: 'Завершити модуль',
    completed: 'Завершено',
    reflection: 'Роздуми',
    typeYourThoughts: 'Напишіть свої думки тут...',
    watchLearn: 'Дивитися та вчитися',
    interactiveDashboard: 'Інтерактивна панель',
    
    // Ending Page
    congratulations: 'Вітаємо!',
    journeyComplete: 'Ви завершили свою навчальну подорож по кліматичних системах!',
    completedAllModules: 'Ви завершили всі 5 модулів і отримали глибокі знання про кліматичні системи.',
    yourReflections: 'Ваші роздуми',
    restartJourney: 'Почати заново',
    backHome: 'На головну',
    
    // Dashboard
    temperature: 'Температура',
    seaLevel: 'Рівень моря',
    emissions: 'Викиди',
    renewableEnergy: 'Відновлювана енергія',
    coalUse: 'Використання вугілля',
    oilUse: 'Використання нафти',
    gasUse: 'Використання газу',
    deforestation: 'Вирубка лісів',
    reset: 'Скинути',
    
    // Glossary
    gotIt: 'Зрозуміло'
  }
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
  de: 'Deutsch',
  ru: 'Русский',
  uk: 'Українська'
};