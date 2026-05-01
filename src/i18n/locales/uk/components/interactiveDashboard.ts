export const interactiveDashboard = {
  controls: {
    startOver: 'Почати спочатку',
    play: 'Відтворити',
    pause: 'Пауза',
  },
  accessibility: {
    dashboardTitle: 'Інтерактивна панель',
    sliderControls: 'Елементи керування повзунками',
    metricsDisplay: 'Відображення метрик',
    toggleMetric: 'Перемкнути відображення {metric}',
  },
  scenarios: {
    baseline: 'БАЗОВИЙ СЦЕНАРІЙ',
    current: 'ПОТОЧНИЙ СЦЕНАРІЙ',
  },
  metrics: {
    temperature: {
      label: 'Підвищення температури',
      unit: '°C'
    },
    seaLevel: {
      label: 'Підвищення рівня моря',
      unit: 'м'
    },
    airPollution: {
      label: 'Забруднення повітря',
      unit: 'індекс'
    },
    cost: {
      label: 'Енергетичні витрати',
      unit: '$'
    }
  },
  sections: {
    energySupply: {
      title: 'Енергопостачання',
      coal: {
        label: 'Вугілля',
        description: 'Видобуток і спалювання вугілля для отримання енергії.'
      },
      oil: {
        label: 'Нафта',
        description: 'Видобуток і спалювання нафти для отримання енергії.'
      },
      naturalGas: {
        label: 'Природний газ',
        description: 'Видобуток і спалювання природного газу для отримання енергії.'
      },
      bioenergy: {
        label: 'Біоенергетика',
        description: 'Енергія з біомаси, наприклад, деревини та сільськогосподарських відходів.'
      },
      renewables: {
        label: 'Відновлювані джерела',
        description: 'Сонячна, вітрова, геотермальна та гідроенергія.'
      },
      nuclear: {
        label: 'Ядерна енергія',
        description: 'Енергія від атомних електростанцій.'
      },
      newZero: {
        label: 'Нові джерела з нульовим рівнем викидів',
        description: 'Відкриття абсолютно нових джерел енергії без викидів вуглецю.'
      }
    },
    transport: {
      title: 'Транспорт',
      energyEfficiency: {
        label: 'Енергоефективність',
        description: 'Ефективність використання енергії транспортними засобами.'
      },
      electrification: {
        label: 'Електрифікація',
        description: 'Використання електроенергії для живлення транспорту.'
      }
    },
    buildingsAndIndustry: {
      title: 'Будівлі та промисловість',
      energyEfficiency: {
        label: 'Енергоефективність',
        description: 'Ефективність використання енергії в будівлях та промисловості.'
      },
      electrification: {
        label: 'Електрифікація',
        description: 'Використання електроенергії в будівлях та промисловості.'
      }
    },
    growth: {
      title: 'Зростання',
      population: {
        label: 'Населення',
        description: 'Зростання населення світу.'
      },
      economicGrowth: {
        label: 'Економічне зростання',
        description: 'Зростання світової економіки.'
      }
    },
    landAndIndustry: {
      title: 'Землекористування та промислові викиди',
      deforestation: {
        label: 'Вирубка лісів',
        description: 'Втрата лісів.'
      },
      methaneAndOther: {
        label: 'Метан та інші гази',
        description: 'Викиди метану, закису азоту та F-газів.'
      }
    },
    carbonRemoval: {
      title: 'Видалення вуглецю',
      afforestation: {
        label: 'Залісення',
        description: 'Посадка нових лісів.'
      },
      technological: {
        label: 'Технологічне',
        description: 'Видалення вуглецю за допомогою технологій.'
      }
    }
  }
};
