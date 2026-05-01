export const interactiveDashboard = {
  reset: 'Сбросить до исходного',
  fromBaseline: 'от исходного',
  modules: {
    1: {
      title: 'Исследование сценариев климатического будущего',
      params: {
        renewableGrowth: {
          label: 'Рост возобновляемой энергии',
          description: 'Скорость перехода к солнечной, ветровой и другим возобновляемым источникам'
        },
        deforestation: {
          label: 'Уровень вырубки лесов',
          description: 'Текущий уровень потери лесов'
        }
      },
      metrics: {
        temperature: 'Температура к 2100 году',
        optimism: 'Климатический оптимизм'
      }
    },
    2: {
      title: 'Динамика запасов и потоков',
      params: {
        emissions: {
          label: 'Ежегодные выбросы CO₂',
          description: 'Поток: CO₂, добавляемый в атмосферу каждый год'
        },
        carbonSinks: {
          label: 'Естественное поглощение углерода',
          description: 'Поток: CO₂, удаляемый лесами и океанами'
        }
      },
      metrics: {
        stock: 'Запас CO₂ в атмосфере',
        netChange: 'Чистое годовое изменение'
      }
    },
    3: {
      title: 'Симулятор путей развития',
      params: {
        coalPhaseout: {
          label: 'Скорость отказа от угля',
          description: 'Как быстро мы прекратим использование угля'
        },
        electrification: {
          label: 'Электрификация транспорта',
          description: 'Доля электромобилей'
        },
        carbonPrice: {
          label: 'Ценообразование на выбросы углерода',
          description: 'Налог на выбросы углерода'
        }
      },
      metrics: {
        warming: 'Потепление к 2050 году',
        risk: 'Уровень риска пути'
      }
    },
    4: {
      title: 'Панель системных решений',
      params: {
        renewableEnergy: {
          label: 'Возобновляемая энергия',
          description: 'Чистое электричество питает всё'
        },
        buildingEfficiency: {
          label: 'Энергоэффективность зданий',
          description: 'Улучшенная изоляция, умный дизайн'
        },
        landRestoration: {
          label: 'Восстановление земель',
          description: 'Леса, водно-болотные угодья, пастбища'
        }
      },
      metrics: {
        impact: 'Общее влияние на систему',
        cobenefits: 'Оценка сопутствующих выгод'
      }
    },
    5: {
      title: 'Вмешательства с высокой степенью воздействия (рычаги)',
      params: {
        policyStrength: {
          label: 'Сила климатической политики',
          description: 'Правительственные нормы и стимулы'
        },
        techInnovation: {
          label: 'Инвестиции в R&D чистых технологий',
          description: 'Финансирование исследований и разработок'
        },
        socialMovement: {
          label: 'Сила социальных движений',
          description: 'Осведомленность и активность общественности'
        }
      },
      metrics: {
        multiplier: 'Множитель рычага',
        speed: 'Скорость системных изменений'
      }
    }
  }
};
