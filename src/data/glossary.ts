import { Language } from './translations';

export type GlossaryEntry = {
  term: string;
  definition: string;
  variants?: string[]; // Alternative forms of the term (e.g., plural, lowercase)
};

export type GlossaryData = Record<Language, GlossaryEntry[]>;

export const glossary: GlossaryData = {
  en: [
    {
      term: 'carbon dioxide',
      variants: ['CO₂', 'CO2'],
      definition: 'A greenhouse gas released when we burn fossil fuels like coal, oil, and gas. It traps heat in Earth\'s atmosphere, causing global warming. CO₂ stays in the atmosphere for hundreds of years.'
    },
    {
      term: 'emissions',
      variants: ['emission'],
      definition: 'The release of greenhouse gases (like carbon dioxide and methane) into the atmosphere, primarily from burning fossil fuels, deforestation, and industrial processes. Reducing emissions is key to fighting climate change.'
    },
    {
      term: 'greenhouse gas',
      variants: ['greenhouse gases'],
      definition: 'Gases in the atmosphere that trap heat from the sun, warming the planet. The main greenhouse gases are carbon dioxide, methane, and nitrous oxide. While some greenhouse gases are natural, human activities have increased their concentration dramatically.'
    },
    {
      term: 'renewable energy',
      variants: ['renewables'],
      definition: 'Energy from sources that naturally replenish themselves, like solar, wind, hydro, and geothermal power. Unlike fossil fuels, renewable energy doesn\'t produce greenhouse gas emissions and won\'t run out.'
    },
    {
      term: 'climate system',
      variants: ['climate systems'],
      definition: 'The complex interactions between the atmosphere, oceans, ice, land, and living things that determine Earth\'s climate. Understanding these systems helps us see how changes in one area affect the whole planet.'
    },
    {
      term: 'fossil fuels',
      variants: ['fossil fuel'],
      definition: 'Energy sources formed from ancient plant and animal remains, including coal, oil, and natural gas. Burning fossil fuels releases carbon dioxide that has been stored underground for millions of years.'
    }
  ],
  
  es: [
    {
      term: 'dióxido de carbono',
      variants: ['CO₂', 'CO2'],
      definition: 'Un gas de efecto invernadero que se libera cuando quemamos combustibles fósiles como el carbón, el petróleo y el gas. Atrapa el calor en la atmósfera de la Tierra, causando el calentamiento global. El CO₂ permanece en la atmósfera durante cientos de años.'
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
      term: 'energía renovable',
      variants: ['renovables'],
      definition: 'Energía de fuentes que se reponen naturalmente, como la energía solar, eólica, hidroeléctrica y geotérmica. A diferencia de los combustibles fósiles, la energía renovable no produce emisiones de gases de efecto invernadero y no se agotará.'
    },
    {
      term: 'sistema climático',
      variants: ['sistemas climáticos'],
      definition: 'Las complejas interacciones entre la atmósfera, los océanos, el hielo, la tierra y los seres vivos que determinan el clima de la Tierra. Comprender estos sistemas nos ayuda a ver cómo los cambios en un área afectan a todo el planeta.'
    },
    {
      term: 'combustibles fósiles',
      variants: ['combustible fósil'],
      definition: 'Fuentes de energía formadas a partir de restos antiguos de plantas y animales, incluidos el carbón, el petróleo y el gas natural. Quemar combustibles fósiles libera dióxido de carbono que ha estado almacenado bajo tierra durante millones de años.'
    }
  ],
  
  ar: [
    {
      term: 'ثاني أكسيد الكربون',
      variants: ['CO₂', 'CO2'],
      definition: 'غاز من غازات الدفيئة يُطلق عند حرق الوقود الأحفوري مثل الفحم والنفط والغاز. يحبس الحرارة في الغلاف الجوي للأرض، مما يسبب الاحتباس الحراري. يبقى ثاني أكسيد الكربون في الغلاف الجوي لمئات السنين.'
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
      term: 'الطاقة المتجددة',
      variants: ['المتجددة'],
      definition: 'الطاقة من مصادر تتجدد بشكل طبيعي، مثل الطاقة الشمسية وطاقة الرياح والطاقة الكهرومائية والطاقة الحرارية الأرضية. على عكس الوقود الأحفوري، لا تنتج الطاقة المتجددة انبعاثات غازات الدفيئة ولن تنفد.'
    },
    {
      term: 'النظام المناخي',
      variants: ['الأنظمة المناخية'],
      definition: 'التفاعلات المعقدة بين الغلاف الجوي والمحيطات والجليد والأرض والكائنات الحية التي تحدد مناخ الأرض. فهم هذه الأنظمة يساعدنا على رؤية كيف تؤثر التغييرات في منطقة واحدة على الكوكب بأكمله.'
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
      term: 'erneuerbare Energie',
      variants: ['Erneuerbare'],
      definition: 'Energie aus Quellen, die sich auf natürliche Weise erneuern, wie Solar-, Wind-, Wasser- und Geothermie. Im Gegensatz zu fossilen Brennstoffen erzeugt erneuerbare Energie keine Treibhausgasemissionen und wird nicht ausgehen.'
    },
    {
      term: 'Klimasystem',
      variants: ['Klimasysteme'],
      definition: 'Die komplexen Wechselwirkungen zwischen Atmosphäre, Ozeanen, Eis, Land und Lebewesen, die das Erdklima bestimmen. Das Verständnis dieser Systeme hilft uns zu sehen, wie Änderungen in einem Bereich den gesamten Planeten beeinflussen.'
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
      term: 'возобновляемая энергия',
      variants: ['возобновляемые источники'],
      definition: 'Энергия из источников, которые естественным образом восполняются, таких как солнечная, ветровая, гидроэнергия и геотермальная энергия. В отличие от ископаемого топлива, возобновляемая энергия не производит выбросы парниковых газов и не иссякнет.'
    },
    {
      term: 'климатическая система',
      variants: ['климатические системы'],
      definition: 'Сложные взаимодействия между атмосферой, океанами, льдом, сушей и живыми организмами, которые определяют климат Земли. Понимание этих систем помогает нам увидеть, как изменения в одной области влияют на всю планету.'
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
      term: 'відновлювана енергія',
      variants: ['відновлювані джерела'],
      definition: 'Енергія з джерел, які природним чином поповнюються, таких як сонячна, вітрова, гідроенергія та геотермальна енергія. На відміну від викопного палива, відновлювана енергія не виробляє викидів парникових газів і не вичерпається.'
    },
    {
      term: 'кліматична система',
      variants: ['кліматичні системи'],
      definition: 'Складні взаємодії між атмосферою, океанами, льодом, сушею та живими організмами, які визначають клімат Землі. Розуміння цих систем допомагає нам побачити, як зміни в одній галузі впливають на всю планету.'
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