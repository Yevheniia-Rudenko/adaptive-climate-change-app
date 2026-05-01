export const interactiveDashboard = {
  controls: {
    startOver: 'البدء من جديد',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
  },
  accessibility: {
    dashboardTitle: 'لوحة القيادة التفاعلية',
    sliderControls: 'عناصر التحكم في شريط التمرير',
    metricsDisplay: 'عرض المقاييس',
    toggleMetric: 'تبديل عرض {metric}',
  },
  scenarios: {
    baseline: 'خط الأساس',
    current: 'السيناريو الحالي',
  },
  metrics: {
    temperature: {
      label: 'زيادة درجة الحرارة',
      unit: 'درجة مئوية'
    },
    seaLevel: {
      label: 'مستوى سطح البحر',
      unit: 'متر'
    },
    airPollution: {
      label: 'تلوث الهواء',
      unit: 'مؤشر'
    },
    cost: {
      label: 'تكلفة الطاقة',
      unit: '$'
    }
  },
  sections: {
    energySupply: {
      title: 'إمدادات الطاقة',
      coal: {
        label: 'الفحم',
        description: 'تعدين وحرق الفحم للحصول على الطاقة.'
      },
      oil: {
        label: 'النفط',
        description: 'استخراج وحرق النفط للحصول على الطاقة.'
      },
      naturalGas: {
        label: 'الغاز الطبيعي',
        description: 'استخراج وحرق الغاز الطبيعي للحصول على الطاقة.'
      },
      bioenergy: {
        label: 'الطاقة الحيوية',
        description: 'الطاقة من الكتلة الحيوية مثل الخشب والنفايات الزراعية.'
      },
      renewables: {
        label: 'الطاقة المتجددة',
        description: 'الطاقة الشمسية وطاقة الرياح والطاقة الحرارية الأرضية والطاقة المائية.'
      },
      nuclear: {
        label: 'الطاقة النووية',
        description: 'الطاقة من محطات الطاقة النووية.'
      },
      newZero: {
        label: 'صفر انبعاثات جديد',
        description: 'اكتشاف مصادر طاقة جديدة تمامًا خالية من الكربون.'
      }
    },
    transport: {
      title: 'النقل',
      energyEfficiency: {
        label: 'كفاءة الطاقة',
        description: 'مدى كفاءة استخدام المركبات للطاقة.'
      },
      electrification: {
        label: 'الكهربة',
        description: 'استخدام الكهرباء لتشغيل النقل.'
      }
    },
    buildingsAndIndustry: {
      title: 'المباني والصناعة',
      energyEfficiency: {
        label: 'كفاءة الطاقة',
        description: 'مدى كفاءة استخدام المباني والصناعة للطاقة.'
      },
      electrification: {
        label: 'الكهربة',
        description: 'استخدام الكهرباء في المباني والصناعة.'
      }
    },
    growth: {
      title: 'النمو',
      population: {
        label: 'السكان',
        description: 'نمو سكان العالم.'
      },
      economicGrowth: {
        label: 'النمو الاقتصادي',
        description: 'نمو الاقتصاد العالمي.'
      }
    },
    landAndIndustry: {
      title: 'استخدام الأراضي والصناعة',
      deforestation: {
        label: 'إزالة الغابات',
        description: 'فقدان مساحة الغابات.'
      },
      methaneAndOther: {
        label: 'الميثان وغيرها',
        description: 'انبعاثات الميثان وأكسيد النيتروز والغازات المفلورة.'
      }
    },
    carbonRemoval: {
      title: 'إزالة الكربون',
      afforestation: {
        label: 'التشجير',
        description: 'زراعة غابات جديدة.'
      },
      technological: {
        label: 'تكنولوجي',
        description: 'إزالة الكربون باستخدام التكنولوجيا.'
      }
    }
  }
};
