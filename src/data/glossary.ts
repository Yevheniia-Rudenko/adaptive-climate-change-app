export type GlossaryEntry = {
  term: string;
  definition: string;
  variants?: string[]; // Alternative forms of the term (e.g., plural, lowercase)
};

type GlossaryLanguage = 'en' | 'es' | 'ar' | 'de' | 'ru' | 'uk' | 'tr';
export type GlossaryData = Record<GlossaryLanguage, GlossaryEntry[]>;

export const glossary: GlossaryData = {
  en: [
    {
      term: 'carbon dioxide',
      variants: ['CO₂', 'CO2'],
      definition: 'A greenhouse gas released when we burn fossil fuels like coal, oil, and gas. It traps heat in Earth\'s atmosphere, causing global warming. CO₂ stays in the atmosphere for hundreds of years.'
    },
    {
      term: 'carbon price',
      variants: ['carbon price', 'carbon pricing'],
      definition: 'A method for governments to mitigate climate change, in which a monetary cost is applied to greenhouse gas emissions. This is done to encourage polluters to reduce fossil fuel combustion, the main driver of climate change.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'A non-profit that creates and shares cutting-edge tools that drive effective and equitable climate action. You can learn more about their work here: https://www.climateinteractive.org/'
    },
    {
      term: 'climate policies',
      variants: ['climate policies', 'climate policy'],
      definition: 'Strategies, laws, and regulations developed by governments and institutions to reduce greenhouse gas emissions and adapt to climate change impacts.'
    },
    {
      term: 'climate system',
      variants: ['climate systems'],
      definition: 'The complex interactions between the atmosphere, oceans, ice, land, and living things that determine Earth\'s climate. Understanding these systems helps us see how changes in one area affect the whole planet.'
    },
    {
      term: 'co₂ concentration',
      variants: ['CO₂ Concentration'],
      definition: 'Measure of carbon dioxide molecules present in a specific volume of air, commonly expressed in parts per million (ppm). It serves as a key indicator of climate change, with rising levels trapping more heat in the atmosphere. Since we started burning fossil fuels the CO2 concentration has increased more than 50% from 280 pmm to around 428 pmm today.'
    },
    {
      term: 'co₂ emissions',
      variants: ['CO₂ Emissions'],
      definition: 'Combined amount of CO₂ annually released into the atmosphere from all sources such as electricity production, industrial processes, transportation, deforestation, etc. This is most often measured in gigatons (10^9 tons) per year.'
    },
    {
      term: 'co₂ removals',
      variants: ['CO2 removals', 'carbon dioxide removals'],
      definition: 'Natural and technological processes that take CO2 out of the atmosphere and store them elsewhere.'
    },
    {
      term: 'Dr. Ayana Elizabeth Johnson',
      variants: ['Ayana Elizabeth Johnson'],
      definition: 'Dr. Ayana Elizabeth Johnson is co-founder of the non-profit think tank Urban Ocean Lab, co-editor of the bestselling climate anthology *All We Can Save*, and author of *What If We Get it Right?: Visions of Climate Futures*.'
    },
    {
      term: 'drivers',
      variants: ['driver'],
      definition: 'The main causes or forces that are pushing something to happen. In the context of climate change, drivers are the key activities or systems—like burning fossil fuels, deforestation, and certain industrial processes—that release large amounts of greenhouse gases and speed up global warming. In other words, drivers are the big things behind the scenes that set major changes in motion.'
    },
    {
      term: 'emissions',
      variants: ['emission'],
      definition: 'The release of greenhouse gases (like carbon dioxide and methane) into the atmosphere, primarily from burning fossil fuels, deforestation, and industrial processes. Reducing emissions is key to fighting climate change.'
    },
    {
      term: 'fossil fuels',
      variants: ['fossil fuel'],
      definition: 'Energy sources formed from ancient plant and animal remains, including coal, oil, and natural gas. Burning fossil fuels releases carbon dioxide that has been stored underground for millions of years.'
    },
    {
      term: 'greenhouse gas',
      variants: ['greenhouse gases'],
      definition: 'Gases in the atmosphere that trap heat from the sun, warming the planet. The main greenhouse gases are carbon dioxide, methane, and nitrous oxide. While some greenhouse gases are natural, human activities have increased their concentration dramatically.'
    },
    {
      term: 'level out',
      variants: ['level out'],
      definition: 'To level out means that something stops going up or down and stays about the same over time. You can think of it like a line on a graph that becomes flat.'
    },
    {
      term: 'nature-based solution to carbon dioxide removal',
      variants: ['nature-based solutions', 'nature-based carbon removal', 'afforestation', 'reforestation'],
      definition: 'Encourage the expansion of forests (afforestation), the restoration of former or degraded forests (reforestation), the implementation of agricultural practices that capture carbon, and the production of biochar. These nature-based methods can remove carbon dioxide from the atmosphere and store it in plants and soils. However, this carbon may be released again if the land is altered, whether through deliberate actions like farming or accidental events like wildfires.'
    },
    {
      term: 'leverage points',
      variants: ['leverage point', 'high-leverage points', 'high leverage points'],
      definition: 'Specific places within a complex system—such as a company, ecosystem, or economy—where a small, well-focused action can produce significant, lasting changes. Popularized by Donella Meadows, these interventions range from shallow (changing numbers) to deep (shifting paradigms), with the highest leverage often found in changing system goals, rules, or mindsets.'
    },
    {
      term: 'direct air capture (DAC)',
      variants: ['direct air capture', 'DAC'],
      definition: 'A technology that removes CO₂ from the atmosphere using liquid solvents or solid sorbents, which can then be stored permanently underground or reused.'
    },
    {
      term: 'renewable energy',
      variants: ['renewables'],
      definition: 'Energy from sources that naturally replenish themselves, like solar, wind, hydro, and geothermal power. Unlike fossil fuels, renewable energy doesn\'t produce greenhouse gas emissions and won\'t run out.'
    },
        {
      term: 'systems awareness',
      variants: ['systems awareness'],
      definition: 'Systems awareness is the capacity to sense, feel and think about complexity, interdependence and change over time.'
    }
  ],

  es: [
    {
      term: 'dióxido de carbono',
      variants: ['CO₂', 'CO2'],
      definition: 'Un gas de efecto invernadero que se libera cuando quemamos combustibles fósiles como el carbón, el petróleo y el gas. Atrapa el calor en la atmósfera de la Tierra, causando el calentamiento global. El CO₂ permanece en la atmósfera durante cientos de años.'
    },
    {
      term: 'precio del carbono',
      variants: ['precio del carbono', 'fijación del precio del carbono'],
      definition: 'Un método para mitigar el cambio climático en el que se aplica un costo monetario a las emisiones de gases de efecto invernadero. Se usa para incentivar la reducción del uso de combustibles fósiles, principal impulsor del cambio climático.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'Una organización sin fines de lucro que crea y comparte herramientas avanzadas para impulsar una acción climática efectiva y equitativa. Más información: https://www.climateinteractive.org/'
    },
    {
      term: 'políticas climáticas',
      variants: ['política climática'],
      definition: 'Estrategias, leyes y regulaciones desarrolladas por gobiernos e instituciones para reducir emisiones de gases de efecto invernadero y adaptarse a los impactos del cambio climático.'
    },
    {
      term: 'sistema climático',
      variants: ['sistemas climáticos'],
      definition: 'Las complejas interacciones entre atmósfera, océanos, hielo, tierra y seres vivos que determinan el clima de la Tierra. Comprender estos sistemas permite ver cómo cambios en una parte afectan a todo el planeta.'
    },
    {
      term: 'concentración de co₂',
      variants: ['Concentración de CO₂', 'concentración de CO2'],
      definition: 'Medida de moléculas de dióxido de carbono presentes en un volumen de aire, normalmente expresada en partes por millón (ppm). Es un indicador clave del cambio climático. Desde el inicio del uso masivo de combustibles fósiles ha aumentado más de 50%, de 280 ppm a cerca de 428 ppm.'
    },
    {
      term: 'emisiones de co₂',
      variants: ['Emisiones de CO₂'],
      definition: 'Cantidad total de CO₂ liberada cada año a la atmósfera por fuentes como producción de electricidad, industria, transporte y deforestación. Suele medirse en gigatoneladas por año.'
    },
    {
      term: 'eliminaciones de co₂',
      variants: ['eliminaciones de CO2', 'eliminación de dióxido de carbono'],
      definition: 'Procesos naturales y tecnológicos que extraen CO₂ de la atmósfera y lo almacenan en otro lugar.'
    },
    {
      term: 'Dra. Ayana Elizabeth Johnson',
      variants: ['Ayana Elizabeth Johnson'],
      definition: 'La Dra. Ayana Elizabeth Johnson es cofundadora del laboratorio de ideas Urban Ocean Lab, coeditora de la antología climática superventas *All We Can Save* y autora de *What If We Get it Right?: Visions of Climate Futures*.'
    },
    {
      term: 'impulsores',
      variants: ['impulsor'],
      definition: 'Causas o fuerzas principales que empujan a que algo ocurra. En cambio climático, son actividades o sistemas clave—como quema de combustibles fósiles, deforestación y ciertos procesos industriales—que liberan grandes cantidades de gases de efecto invernadero y aceleran el calentamiento global.'
    },
    {
      term: 'emisiones',
      variants: ['emisión'],
      definition: 'La liberación de gases de efecto invernadero (como dióxido de carbono y metano) a la atmósfera, principalmente por la quema de combustibles fósiles, la deforestación y los procesos industriales. Reducir las emisiones es clave para combatir el cambio climático.'
    },
    {
      term: 'gas de efecto invernadero',
      variants: ['gases de efecto invernadero'],
      definition: 'Gases en la atmósfera que atrapan el calor del sol, calentando el planeta. Los principales gases de efecto invernadero son el dióxido de carbono, el metano y el óxido nitroso. Si bien algunos gases de efecto invernadero son naturales, las actividades humanas han aumentado dramáticamente su concentración.'
    },
    {
      term: 'estabilizarse',
      variants: ['nivelarse'],
      definition: 'Significa que algo deja de subir o bajar y se mantiene aproximadamente igual con el tiempo. Es como una línea en una gráfica que se vuelve plana.'
    },
    {
      term: 'solución basada en la naturaleza para eliminar dióxido de carbono',
      variants: ['soluciones basadas en la naturaleza', 'eliminación de carbono basada en la naturaleza', 'forestación', 'reforestación'],
      definition: 'Incluye expandir bosques (forestación), restaurar bosques degradados (reforestación), usar prácticas agrícolas que capturan carbono y producir biocarbón. Estos métodos pueden extraer CO₂ y almacenarlo en plantas y suelos, aunque ese carbono puede liberarse de nuevo si cambia el uso del suelo o por eventos como incendios.'
    },
    {
      term: 'puntos de apalancamiento',
      variants: ['punto de apalancamiento', 'puntos de alto apalancamiento'],
      definition: 'Lugares específicos dentro de un sistema complejo donde una acción pequeña y bien orientada puede producir cambios grandes y duraderos. Popularizado por Donella Meadows, estos puntos van desde cambios superficiales hasta transformaciones profundas de reglas, metas o mentalidades.'
    },
    {
      term: 'captura directa de aire (DAC)',
      variants: ['captura directa de aire', 'DAC'],
      definition: 'Tecnología que extrae CO₂ de la atmósfera mediante solventes líquidos o sorbentes sólidos, para almacenarlo de forma permanente bajo tierra o reutilizarlo.'
    },
    {
      term: 'energía renovable',
      variants: ['renovables'],
      definition: 'Energía de fuentes que se reponen naturalmente, como la energía solar, eólica, hidroeléctrica y geotérmica. A diferencia de los combustibles fósiles, la energía renovable no produce emisiones de gases de efecto invernadero y no se agotará.'
    },
    {
      term: 'conciencia de sistemas',
      variants: ['pensamiento sistémico'],
      definition: 'La conciencia de sistemas es la capacidad de percibir, sentir y pensar sobre la complejidad, la interdependencia y el cambio a lo largo del tiempo.'
    },
    {
      term: 'combustibles fósiles',
      variants: ['combustible fósil'],
      definition: 'Fuentes de energía formadas a partir de restos antiguos de plantas y animales, incluidos el carbón, el petróleo y el gas natural. Quemar combustibles fósiles libera dióxido de carbono que ha estado almacenado bajo tierra durante millones de años.'
    }
  ],

  tr: [
    {
      term: 'karbondioksit',
      variants: ['CO₂', 'CO2'],
      definition: 'Kömür, petrol ve gaz gibi fosil yakıtlar yakıldığında açığa çıkan bir sera gazıdır. Dünya atmosferinde ısıyı tutarak küresel ısınmaya neden olur. CO₂ atmosferde yüzlerce yıl kalır.'
    },
    {
      term: 'karbon fiyatı',
      variants: ['karbon fiyatlandırması'],
      definition: 'Hükümetlerin iklim değişikliğini azaltmak için sera gazı emisyonlarına parasal bir maliyet uyguladığı bir yöntemdir. Amaç, kirletici faaliyetleri azaltmayı ve daha temiz çözümleri teşvik etmektir.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'Etkili ve adil iklim eylemini destekleyen ileri düzey araçlar geliştiren ve paylaşan kâr amacı gütmeyen bir kuruluştur. Daha fazla bilgi: https://www.climateinteractive.org/'
    },
    {
      term: 'iklim politikaları',
      variants: ['iklim politikası'],
      definition: 'Sera gazı emisyonlarını azaltmak ve iklim değişikliğinin etkilerine uyum sağlamak için hükümetler ve kurumlar tarafından geliştirilen strateji, yasa ve düzenlemelerdir.'
    },
    {
      term: 'iklim sistemi',
      variants: ['iklim sistemleri'],
      definition: 'Dünya iklimini belirleyen atmosfer, okyanuslar, buzullar, kara ve canlılar arasındaki karmaşık etkileşimlerdir.'
    },
    {
      term: 'co₂ konsantrasyonu',
      variants: ['CO₂ Konsantrasyonu', 'co2 konsantrasyonu'],
      definition: 'Belirli bir hava hacmindeki CO₂ molekülü miktarının ölçüsüdür ve genellikle milyon başına parça (ppm) olarak ifade edilir. İklim değişikliğinin temel göstergelerinden biridir.'
    },
    {
      term: 'co₂ emisyonları',
      variants: ['CO₂ Emisyonları'],
      definition: 'Elektrik üretimi, sanayi, ulaşım ve ormansızlaşma gibi kaynaklardan atmosfere her yıl salınan toplam CO₂ miktarıdır.'
    },
    {
      term: 'co₂ giderimi',
      variants: ['CO2 giderimi', 'karbondioksit giderimi'],
      definition: 'CO₂’yi atmosferden alıp başka yerlerde depolayan doğal ve teknolojik süreçlerdir.'
    },
    {
      term: 'Dr. Ayana Elizabeth Johnson',
      variants: ['Ayana Elizabeth Johnson'],
      definition: 'Dr. Ayana Elizabeth Johnson, Urban Ocean Lab’in kurucu ortaklarındandır, çok satan *All We Can Save* iklim antolojisinin ortak editörüdür ve *What If We Get it Right?* kitabının yazarıdır.'
    },
    {
      term: 'itici güçler',
      variants: ['itici güç'],
      definition: 'Bir şeyin gerçekleşmesini sağlayan temel nedenler veya kuvvetlerdir. İklim bağlamında fosil yakıt kullanımı, ormansızlaşma ve bazı sanayi süreçleri gibi etkenleri ifade eder.'
    },
    {
      term: 'emisyonlar',
      variants: ['emisyon'],
      definition: 'Sera gazlarının (ör. karbondioksit ve metan) atmosfere salınmasıdır. Emisyonların azaltılması iklim değişikliğiyle mücadelede kritik öneme sahiptir.'
    },
    {
      term: 'fosil yakıtlar',
      variants: ['fosil yakıt'],
      definition: 'Kömür, petrol ve doğal gaz gibi, eski bitki ve hayvan kalıntılarından oluşmuş enerji kaynaklarıdır. Yakıldıklarında milyonlarca yıl yer altında depolanmış CO₂’yi atmosfere salarlar.'
    },
    {
      term: 'sera gazı',
      variants: ['sera gazları'],
      definition: 'Güneşten gelen ısıyı atmosferde tutarak gezegeni ısıtan gazlardır. Başlıca sera gazları karbondioksit, metan ve diazot monoksittir.'
    },
    {
      term: 'dengelenmek',
      variants: ['sabitlenmek'],
      definition: 'Bir şeyin artmayı veya azalmayı bırakıp zamanla yaklaşık aynı seviyede kalmasıdır.'
    },
    {
      term: 'karbondioksit giderimi için doğa temelli çözüm',
      variants: ['doğa temelli çözümler', 'doğa temelli karbon giderimi', 'ağaçlandırma', 'yeniden ağaçlandırma'],
      definition: 'Orman alanlarının artırılması, bozulmuş ormanların onarılması, karbon tutan tarım uygulamaları ve biyokömür üretimini içerir. Bu yöntemler CO₂’yi atmosferden çekip bitkilerde ve toprakta depolayabilir.'
    },
    {
      term: 'kaldıraç noktaları',
      variants: ['kaldıraç noktası', 'yüksek etkili kaldıraç noktaları'],
      definition: 'Karmaşık bir sistem içinde küçük ama doğru hedeflenmiş bir müdahalenin büyük ve kalıcı değişimler yaratabildiği noktalardır.'
    },
    {
      term: 'doğrudan hava yakalama (DAC)',
      variants: ['doğrudan hava yakalama', 'DAC'],
      definition: 'Sıvı çözücüler veya katı sorbentler kullanarak atmosferden CO₂ çıkaran, ardından bunu kalıcı olarak depolayan veya yeniden kullanan teknolojidir.'
    },
    {
      term: 'yenilenebilir enerji',
      variants: ['yenilenebilirler'],
      definition: 'Güneş, rüzgâr, hidroelektrik ve jeotermal gibi doğal olarak yenilenen kaynaklardan elde edilen enerjidir. Fosil yakıtlardan farklı olarak sera gazı emisyonu üretmez.'
    },
    {
      term: 'sistem farkındalığı',
      variants: ['sistem bilinci'],
      definition: 'Sistem farkındalığı; karmaşıklığı, karşılıklı bağımlılığı ve zaman içindeki değişimi algılama, hissetme ve düşünme kapasitesidir.'
    }
  ],

  ar: [
    {
      term: 'ثاني أكسيد الكربون',
      variants: ['CO₂', 'CO2'],
      definition: 'غاز من غازات الدفيئة يُطلق عند حرق الوقود الأحفوري مثل الفحم والنفط والغاز. يحبس الحرارة في الغلاف الجوي للأرض، مما يسبب الاحتباس الحراري. يبقى ثاني أكسيد الكربون في الغلاف الجوي لمئات السنين.'
    },
    {
      term: 'تسعير الكربون',
      variants: ['سعر الكربون'],
      definition: 'طريقة لتخفيف تغير المناخ عبر فرض تكلفة مالية على انبعاثات غازات الدفيئة، لتشجيع الملوثين على تقليل حرق الوقود الأحفوري.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'منظمة غير ربحية تطور وتشارك أدوات متقدمة لدعم عمل مناخي فعّال وعادل. للمزيد: https://www.climateinteractive.org/'
    },
    {
      term: 'سياسات المناخ',
      variants: ['سياسة المناخ'],
      definition: 'استراتيجيات وقوانين ولوائح تضعها الحكومات والمؤسسات لخفض الانبعاثات والتكيف مع آثار تغير المناخ.'
    },
    {
      term: 'النظام المناخي',
      variants: ['الأنظمة المناخية'],
      definition: 'التفاعلات المعقدة بين الغلاف الجوي والمحيطات والجليد واليابسة والكائنات الحية التي تحدد مناخ الأرض.'
    },
    {
      term: 'تركيز co₂',
      variants: ['تركيز CO₂', 'تركيز CO2'],
      definition: 'مقياس لكمية جزيئات ثاني أكسيد الكربون في حجم محدد من الهواء، ويُعبَّر عنه غالبًا بأجزاء في المليون (ppm). وهو مؤشر رئيسي على تغير المناخ.'
    },
    {
      term: 'انبعاثات co₂',
      variants: ['انبعاثات CO₂'],
      definition: 'إجمالي كمية ثاني أكسيد الكربون المنبعثة سنويًا من مصادر مثل الكهرباء والصناعة والنقل وإزالة الغابات.'
    },
    {
      term: 'إزالة co₂',
      variants: ['إزالة CO2', 'إزالة ثاني أكسيد الكربون'],
      definition: 'عمليات طبيعية وتقنية تزيل ثاني أكسيد الكربون من الغلاف الجوي وتخزنه في أماكن أخرى.'
    },
    {
      term: 'الدكتورة أيانا إليزابيث جونسون',
      variants: ['أيانا إليزابيث جونسون'],
      definition: 'الدكتورة أيانا إليزابيث جونسون مؤسسة مشاركة لـ Urban Ocean Lab، ومحررة مشاركة في *All We Can Save*، ومؤلفة *What If We Get it Right?*.'
    },
    {
      term: 'المحرّكات',
      variants: ['محرّك'],
      definition: 'الأسباب أو القوى الرئيسية التي تدفع شيئًا ما للحدوث. في المناخ تشمل حرق الوقود الأحفوري وإزالة الغابات وبعض العمليات الصناعية.'
    },
    {
      term: 'الانبعاثات',
      variants: ['انبعاث'],
      definition: 'إطلاق غازات الدفيئة (مثل ثاني أكسيد الكربون والميثان) في الغلاف الجوي، بشكل أساسي من حرق الوقود الأحفوري، وإزالة الغابات، والعمليات الصناعية. تقليل الانبعاثات هو مفتاح مكافحة تغير المناخ.'
    },
    {
      term: 'غاز الدفيئة',
      variants: ['غازات الدفيئة'],
      definition: 'غازات في الغلاف الجوي تحبس الحرارة من الشمس، مما يؤدي إلى تسخين الكوكب. غازات الدفيئة الرئيسية هي ثاني أكسيد الكربون والميثان وأكسيد النيتروز. بينما بعض غازات الدفيئة طبيعية، فإن الأنشطة البشرية زادت تركيزها بشكل كبير.'
    },
    {
      term: 'الاستقرار',
      variants: ['يستقر'],
      definition: 'يعني أن الشيء يتوقف عن الارتفاع أو الانخفاض ويبقى تقريبًا ثابتًا مع الزمن.'
    },
    {
      term: 'حل قائم على الطبيعة لإزالة ثاني أكسيد الكربون',
      variants: ['حلول قائمة على الطبيعة', 'التشجير', 'إعادة التشجير'],
      definition: 'يشمل توسيع الغابات واستعادة الغابات المتدهورة وممارسات زراعية تمتص الكربون وإنتاج الفحم الحيوي.'
    },
    {
      term: 'نقاط الرافعة',
      variants: ['نقطة رافعة', 'نقاط رافعة عالية'],
      definition: 'أماكن محددة داخل نظام معقد حيث يمكن لإجراء صغير وموجّه أن يُحدث تغييرات كبيرة ودائمة.'
    },
    {
      term: 'الالتقاط المباشر للهواء (DAC)',
      variants: ['الالتقاط المباشر للهواء', 'DAC'],
      definition: 'تقنية تزيل ثاني أكسيد الكربون من الغلاف الجوي باستخدام مذيبات سائلة أو مواد ماصّة صلبة ثم تخزنه أو تعيد استخدامه.'
    },
    {
      term: 'الطاقة المتجددة',
      variants: ['المتجددة'],
      definition: 'الطاقة من مصادر تتجدد بشكل طبيعي، مثل الطاقة الشمسية وطاقة الرياح والطاقة الكهرومائية والطاقة الحرارية الأرضية. على عكس الوقود الأحفوري، لا تنتج الطاقة المتجددة انبعاثات غازات الدفيئة ولن تنفد.'
    },
    {
      term: 'الوعي بالنُّظم',
      variants: ['وعي النظم'],
      definition: 'الوعي بالنظم هو القدرة على إدراك التعقيد والترابط والتغير عبر الزمن.'
    },
    {
      term: 'الوقود الأحفوري',
      variants: ['وقود أحفوري'],
      definition: 'مصادر الطاقة المتكونة من بقايا النباتات والحيوانات القديمة، بما في ذلك الفحم والنفط والغاز الطبيعي. حرق الوقود الأحفوري يطلق ثاني أكسيد الكربون الذي كان مخزناً تحت الأرض لملايين السنين.'
    }
  ],

  de: [
    {
      term: 'Kohlendioxid',
      variants: ['CO₂', 'CO2'],
      definition: 'Ein Treibhausgas, das freigesetzt wird, wenn wir fossile Brennstoffe wie Kohle, Öl und Gas verbrennen. Es fängt Wärme in der Erdatmosphäre ein und verursacht die globale Erwärmung. CO₂ bleibt jahrhundertelang in der Atmosphäre.'
    },
    {
      term: 'CO2-Preis',
      variants: ['Kohlenstoffpreis', 'CO2-Bepreisung'],
      definition: 'Eine Methode zur Eindämmung des Klimawandels, bei der ein finanzieller Preis auf Treibhausgasemissionen gelegt wird. Ziel ist es, Verschmutzung zu verteuern und emissionsärmere Lösungen zu fördern.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'Eine gemeinnützige Organisation, die fortschrittliche Werkzeuge für wirksames und gerechtes Klimahandeln entwickelt und bereitstellt. Mehr: https://www.climateinteractive.org/'
    },
    {
      term: 'Klimapolitik',
      variants: ['Klimapolitiken'],
      definition: 'Strategien, Gesetze und Regelungen von Regierungen und Institutionen, um Emissionen zu senken und sich an die Folgen des Klimawandels anzupassen.'
    },
    {
      term: 'Klimasystem',
      variants: ['Klimasysteme'],
      definition: 'Die komplexen Wechselwirkungen zwischen Atmosphäre, Ozeanen, Eis, Land und Lebewesen, die das Klima der Erde bestimmen.'
    },
    {
      term: 'co₂-konzentration',
      variants: ['CO₂-Konzentration', 'CO2-Konzentration'],
      definition: 'Maß dafür, wie viele CO₂-Moleküle in einem Luftvolumen vorhanden sind, meist in ppm. Ein zentraler Klimawandel-Indikator.'
    },
    {
      term: 'co₂-emissionen',
      variants: ['CO₂-Emissionen'],
      definition: 'Gesamtmenge an CO₂, die pro Jahr aus Stromerzeugung, Industrie, Verkehr, Entwaldung usw. in die Atmosphäre freigesetzt wird.'
    },
    {
      term: 'co₂-entnahmen',
      variants: ['CO2-Entnahmen', 'Kohlendioxid-Entnahmen'],
      definition: 'Natürliche und technologische Prozesse, die CO₂ aus der Atmosphäre entfernen und speichern.'
    },
    {
      term: 'Dr. Ayana Elizabeth Johnson',
      variants: ['Ayana Elizabeth Johnson'],
      definition: 'Dr. Ayana Elizabeth Johnson ist Mitgründerin von Urban Ocean Lab, Mitherausgeberin von *All We Can Save* und Autorin von *What If We Get it Right?*.'
    },
    {
      term: 'Treiber',
      variants: ['Treiberfaktoren', 'Treiberfaktor'],
      definition: 'Zentrale Ursachen oder Kräfte, die Entwicklungen vorantreiben. Beim Klimawandel sind das z. B. fossile Energien, Entwaldung und industrielle Prozesse.'
    },
    {
      term: 'Emissionen',
      variants: ['Emission'],
      definition: 'Die Freisetzung von Treibhausgasen (wie Kohlendioxid und Methan) in die Atmosphäre, hauptsächlich durch die Verbrennung fossiler Brennstoffe, Entwaldung und industrielle Prozesse. Die Reduzierung von Emissionen ist der Schlüssel zur Bekämpfung des Klimawandels.'
    },
    {
      term: 'Treibhausgas',
      variants: ['Treibhausgase'],
      definition: 'Gase in der Atmosphäre, die Wärme von der Sonne einfangen und den Planeten erwärmen. Die wichtigsten Treibhausgase sind Kohlendioxid, Methan und Lachgas. Während einige Treibhausgase natürlich sind, haben menschliche Aktivitäten ihre Konzentration dramatisch erhöht.'
    },
    {
      term: 'sich einpendeln',
      variants: ['einpendeln'],
      definition: 'Wenn etwas nicht weiter steigt oder fällt, sondern über die Zeit ungefähr gleich bleibt.'
    },
    {
      term: 'naturbasierte Lösung zur Kohlendioxid-Entnahme',
      variants: ['naturbasierte Lösungen', 'naturbasierte CO2-Entnahme', 'Aufforstung', 'Wiederaufforstung'],
      definition: 'Umfasst Aufforstung, Wiederaufforstung, landwirtschaftliche Praktiken zur Kohlenstoffbindung und Biochar. Diese Ansätze können CO₂ speichern, das unter bestimmten Bedingungen aber wieder freigesetzt werden kann.'
    },
    {
      term: 'Hebelpunkte',
      variants: ['Hebelpunkt', 'hochwirksame Hebelpunkte'],
      definition: 'Stellen in komplexen Systemen, an denen kleine, gezielte Eingriffe große und dauerhafte Veränderungen auslösen können.'
    },
    {
      term: 'Direct Air Capture (DAC)',
      variants: ['Direct Air Capture', 'DAC'],
      definition: 'Technologie zur Entfernung von CO₂ aus der Luft mittels flüssiger Lösungsmittel oder fester Sorbentien, mit anschließender Speicherung oder Nutzung.'
    },
    {
      term: 'erneuerbare Energie',
      variants: ['Erneuerbare'],
      definition: 'Energie aus Quellen, die sich auf natürliche Weise erneuern, wie Solar-, Wind-, Wasser- und Geothermie. Im Gegensatz zu fossilen Brennstoffen erzeugt erneuerbare Energie keine Treibhausgasemissionen und wird nicht ausgehen.'
    },
    {
      term: 'Systembewusstsein',
      variants: ['systemisches Bewusstsein'],
      definition: 'Systembewusstsein ist die Fähigkeit, Komplexität, Wechselwirkungen und Veränderungen über die Zeit wahrzunehmen, zu fühlen und zu verstehen.'
    },
    {
      term: 'fossile Brennstoffe',
      variants: ['fossiler Brennstoff'],
      definition: 'Energiequellen, die aus den Überresten alter Pflanzen und Tiere gebildet werden, einschließlich Kohle, Öl und Erdgas. Die Verbrennung fossiler Brennstoffe setzt Kohlendioxid frei, das seit Millionen von Jahren unter der Erde gespeichert war.'
    }
  ],

  ru: [
    {
      term: 'углекислый газ',
      variants: ['CO₂', 'CO2', 'диоксид углерода'],
      definition: 'Парниковый газ, выделяющийся при сжигании ископаемого топлива, такого как уголь, нефть и газ. Он удерживает тепло в атмосфере Земли, вызывая глобальное потепление. CO₂ остается в атмосфере сотни лет.'
    },
    {
      term: 'цена на углерод',
      variants: ['углеродное ценообразование'],
      definition: 'Инструмент климатической политики, при котором выбросам парниковых газов присваивается денежная стоимость, чтобы стимулировать сокращение загрязнения.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'Некоммерческая организация, создающая современные инструменты для эффективных и справедливых климатических действий. Подробнее: https://www.climateinteractive.org/'
    },
    {
      term: 'климатическая политика',
      variants: ['климатические политики'],
      definition: 'Стратегии, законы и правила для сокращения выбросов и адаптации к последствиям изменения климата.'
    },
    {
      term: 'климатическая система',
      variants: ['климатические системы'],
      definition: 'Сложные взаимодействия атмосферы, океанов, льда, суши и живых организмов, определяющие климат Земли.'
    },
    {
      term: 'концентрация co₂',
      variants: ['концентрация CO₂', 'концентрация CO2'],
      definition: 'Показатель количества молекул CO₂ в определенном объеме воздуха, обычно в ppm; важный индикатор изменения климата.'
    },
    {
      term: 'выбросы co₂',
      variants: ['выбросы CO₂'],
      definition: 'Суммарный объем CO₂, ежегодно поступающий в атмосферу из энергетики, промышленности, транспорта, вырубки лесов и других источников.'
    },
    {
      term: 'удаление co₂',
      variants: ['удаление CO2', 'удаление диоксида углерода'],
      definition: 'Природные и технологические процессы, которые удаляют CO₂ из атмосферы и удерживают его в других хранилищах.'
    },
    {
      term: 'д-р Аяна Элизабет Джонсон',
      variants: ['Аяна Элизабет Джонсон'],
      definition: 'Д-р Аяна Элизабет Джонсон — соосновательница Urban Ocean Lab, со-редактор *All We Can Save* и автор *What If We Get it Right?*.'
    },
    {
      term: 'драйверы',
      variants: ['драйвер'],
      definition: 'Ключевые причины или силы, запускающие изменения. В контексте климата — это, например, ископаемое топливо, вырубка лесов и промышленные процессы.'
    },
    {
      term: 'выбросы',
      variants: ['выброс'],
      definition: 'Выделение парниковых газов (таких как углекислый газ и метан) в атмосферу, в основном от сжигания ископаемого топлива, вырубки лесов и промышленных процессов. Сокращение выбросов является ключом к борьбе с изменением климата.'
    },
    {
      term: 'парниковый газ',
      variants: ['парниковые газы'],
      definition: 'Газы в атмосфере, которые улавливают тепло от солнца, нагревая планету. Основные парниковые газы — это углекислый газ, метан и закись азота. Хотя некоторые парниковые газы являются естественными, человеческая деятельность значительно увеличила их концентрацию.'
    },
    {
      term: 'выйти на плато',
      variants: ['стабилизироваться'],
      definition: 'Это значит перестать расти или снижаться и оставаться примерно на одном уровне со временем.'
    },
    {
      term: 'природно-ориентированное решение по удалению углекислого газа',
      variants: ['природно-ориентированные решения', 'лесовосстановление'],
      definition: 'Включает расширение лесов, восстановление деградированных территорий, практики землепользования и другие подходы, повышающие поглощение CO₂.'
    },
    {
      term: 'точки рычага',
      variants: ['точка рычага', 'высокорычажные точки'],
      definition: 'Места в сложной системе, где небольшое целевое действие может привести к крупным и устойчивым изменениям.'
    },
    {
      term: 'прямой захват воздуха (DAC)',
      variants: ['прямой захват воздуха', 'DAC'],
      definition: 'Технология удаления CO₂ из атмосферы с помощью жидких растворителей или твердых сорбентов с последующим хранением или использованием.'
    },
    {
      term: 'возобновляемая энергия',
      variants: ['возобновляемые источники'],
      definition: 'Энергия из источников, которые естественным образом восполняются, таких как солнечная, ветровая, гидроэнергия и геотермальная энергия. В отличие от ископаемого топлива, возобновляемая энергия не производит выбросы парниковых газов и не иссякнет.'
    },
    {
      term: 'системная осознанность',
      variants: ['системное мышление'],
      definition: 'Системная осознанность — это способность замечать, чувствовать и понимать сложность, взаимозависимость и изменения во времени.'
    },
    {
      term: 'ископаемое топливо',
      variants: ['ископаемые виды топлива'],
      definition: 'Источники энергии, образованные из древних остатков растений и животных, включая уголь, нефть и природный газ. Сжигание ископаемого топлива высвобождает углекислый газ, который хранился под землей миллионы лет.'
    }
  ],

  uk: [
    {
      term: 'вуглекислий газ',
      variants: ['CO₂', 'CO2', 'діоксид вуглецю'],
      definition: 'Парниковий газ, що виділяється при спалюванні викопного палива, такого як вугілля, нафта та газ. Він затримує тепло в атмосфері Землі, викликаючи глобальне потепління. CO₂ залишається в атмосфері сотні років.'
    },
    {
      term: 'ціна на вуглець',
      variants: ['вуглецеве ціноутворення'],
      definition: 'Інструмент кліматичної політики, коли на викиди парникових газів встановлюється грошова ціна для стимулювання скорочення забруднення.'
    },
    {
      term: 'Climate Interactive',
      variants: [],
      definition: 'Некомерційна організація, що створює сучасні інструменти для ефективних і справедливих кліматичних дій. Детальніше: https://www.climateinteractive.org/'
    },
    {
      term: 'кліматична політика',
      variants: ['кліматичні політики'],
      definition: 'Стратегії, закони та правила для скорочення викидів і адаптації до наслідків зміни клімату.'
    },
    {
      term: 'кліматична система',
      variants: ['кліматичні системи'],
      definition: 'Складні взаємодії атмосфери, океанів, льоду, суші та живих організмів, що визначають клімат Землі.'
    },
    {
      term: 'концентрація co₂',
      variants: ['концентрація CO₂', 'концентрація CO2'],
      definition: 'Показник кількості молекул CO₂ в певному об’ємі повітря, зазвичай у ppm; ключовий індикатор зміни клімату.'
    },
    {
      term: 'викиди co₂',
      variants: ['викиди CO₂'],
      definition: 'Сукупна кількість CO₂, що щороку потрапляє в атмосферу з енергетики, промисловості, транспорту, вирубки лісів тощо.'
    },
    {
      term: 'видалення co₂',
      variants: ['видалення CO2', 'видалення діоксиду вуглецю'],
      definition: 'Природні та технологічні процеси, що вилучають CO₂ з атмосфери та зберігають його в інших сховищах.'
    },
    {
      term: 'д-р Аяна Елізабет Джонсон',
      variants: ['Аяна Елізабет Джонсон'],
      definition: 'Д-р Аяна Елізабет Джонсон — співзасновниця Urban Ocean Lab, співредакторка *All We Can Save* та авторка *What If We Get it Right?*.'
    },
    {
      term: 'рушії',
      variants: ['рушій'],
      definition: 'Ключові причини або сили, що штовхають процеси вперед. У кліматичному контексті це, зокрема, викопне паливо, вирубка лісів і промислові процеси.'
    },
    {
      term: 'викиди',
      variants: ['викид'],
      definition: 'Виділення парникових газів (таких як вуглекислий газ та метан) в атмосферу, в основному від спалювання викопного палива, вирубки лісів та промислових процесів. Скорочення викидів є ключем до боротьби зі зміною клімату.'
    },
    {
      term: 'парниковий газ',
      variants: ['парникові гази'],
      definition: 'Гази в атмосфері, які вловлюють тепло від сонця, нагріваючи планету. Основні парникові гази — це вуглекислий газ, метан і закис азоту. Хоча деякі парникові гази є природними, людська діяльність значно збільшила їх концентрацію.'
    },
    {
      term: 'вирівнюватися',
      variants: ['стабілізуватися'],
      definition: 'Означає перестати зростати або знижуватися та залишатися приблизно на одному рівні з часом.'
    },
    {
      term: 'природно-орієнтоване рішення для видалення діоксиду вуглецю',
      variants: ['природно-орієнтовані рішення', 'лісозаліснення', 'відновлення лісів'],
      definition: 'Охоплює розширення лісів, відновлення деградованих лісів, практики землекористування, що накопичують вуглець, та виробництво біовугілля.'
    },
    {
      term: 'точки важеля',
      variants: ['точка важеля', 'високоважельні точки'],
      definition: 'Місця в складній системі, де невелика, але добре спрямована дія може спричинити великі та довготривалі зміни.'
    },
    {
      term: 'пряме вловлювання з повітря (DAC)',
      variants: ['пряме вловлювання з повітря', 'DAC'],
      definition: 'Технологія вилучення CO₂ з атмосфери за допомогою рідких розчинників або твердих сорбентів з подальшим зберіганням або використанням.'
    },
    {
      term: 'відновлювана енергія',
      variants: ['відновлювані джерела'],
      definition: 'Енергія з джерел, які природним чином поповнюються, таких як сонячна, вітрова, гідроенергія та геотермальна енергія. На відміну від викопного палива, відновлювана енергія не виробляє викидів парникових газів і не вичерпається.'
    },
    {
      term: 'системна обізнаність',
      variants: ['системне мислення'],
      definition: 'Системна обізнаність — це здатність відчувати, сприймати й осмислювати складність, взаємозалежність і зміни в часі.'
    },
    {
      term: 'викопне паливо',
      variants: ['викопні види палива'],
      definition: 'Джерела енергії, утворені з стародавніх залишків рослин і тварин, включаючи вугілля, нафту та природний газ. Спалювання викопного палива вивільняє вуглекислий газ, який зберігався під землею мільйони років.'
    }
  ]
};

// Helper function to create a regex pattern for finding terms
export function createTermPattern(entries: GlossaryEntry[]): RegExp {
  const allTerms: string[] = [];

  entries.forEach(entry => {
    allTerms.push(entry.term);
    if (entry.variants) {
      allTerms.push(...entry.variants);
    }
  });

  // Sort by length (longest first) to match longer terms before shorter ones
  allTerms.sort((a, b) => b.length - a.length);

  // Escape special regex characters and create pattern
  const escapedTerms = allTerms.map(term =>
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  return new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');
}

// Helper function to find definition for a matched term
export function findDefinition(matchedTerm: string, entries: GlossaryEntry[]): GlossaryEntry | undefined {
  const lowerMatched = matchedTerm.toLowerCase();

  return entries.find(entry => {
    if (entry.term.toLowerCase() === lowerMatched) return true;
    if (entry.variants) {
      return entry.variants.some(v => v.toLowerCase() === lowerMatched);
    }
    return false;
  });
}