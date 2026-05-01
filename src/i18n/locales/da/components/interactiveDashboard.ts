export const interactiveDashboard = {
  controls: {
    startOver: 'Start forfra',
    play: 'Afspil',
    pause: 'Sæt på pause',
  },
  accessibility: {
    dashboardTitle: 'Interaktivt kontrolpanel',
    sliderControls: 'Skydekontrol',
    metricsDisplay: 'Visning af metrikker',
    toggleMetric: 'Skift {metric} visning',
  },
  scenarios: {
    baseline: 'BASISLINJE',
    current: 'NUVÆRENDE SCENARIE',
  },
  metrics: {
    temperature: {
      label: 'Temperaturstigning',
      unit: '°C'
    },
    seaLevel: {
      label: 'Havstigning',
      unit: 'm'
    },
    airPollution: {
      label: 'Luftforurening',
      unit: 'indeks'
    },
    cost: {
      label: 'Energiomkostninger',
      unit: '$'
    }
  },
  sections: {
    energySupply: {
      title: 'Energiforsyning',
      coal: {
        label: 'Kul',
        description: 'Udvinding og afbrænding af kul til energi.'
      },
      oil: {
        label: 'Olie',
        description: 'Udvinding og afbrænding af olie til energi.'
      },
      naturalGas: {
        label: 'Naturgas',
        description: 'Udvinding og afbrænding af naturgas til energi.'
      },
      bioenergy: {
        label: 'Bioenergi',
        description: 'Energi fra biomasse såsom træ og landbrugsaffald.'
      },
      renewables: {
        label: 'Vedvarende energi',
        description: 'Sol-, vind-, geotermisk og vandkraft.'
      },
      nuclear: {
        label: 'Atomkraft',
        description: 'Energi fra atomkraftværker.'
      },
      newZero: {
        label: 'Ny nul-emission',
        description: 'Opdagelse af helt nye, kulstoffrie energikilder.'
      }
    },
    transport: {
      title: 'Transport',
      energyEfficiency: {
        label: 'Energieffektivitet',
        description: 'Hvor effektivt køretøjer bruger energi.'
      },
      electrification: {
        label: 'Elektrificering',
        description: 'Brug af elektricitet til at drive transport.'
      }
    },
    buildingsAndIndustry: {
      title: 'Bygninger & Industri',
      energyEfficiency: {
        label: 'Energieffektivitet',
        description: 'Hvor effektivt bygninger og industri bruger energi.'
      },
      electrification: {
        label: 'Elektrificering',
        description: 'Brug af elektricitet i bygninger og industri.'
      }
    },
    growth: {
      title: 'Vækst',
      population: {
        label: 'Befolkning',
        description: 'Vækst i den globale befolkning.'
      },
      economicGrowth: {
        label: 'Økonomisk vækst',
        description: 'Vækst i den globale økonomi.'
      }
    },
    landAndIndustry: {
      title: 'Arealanvendelse & Industri',
      deforestation: {
        label: 'Skovrydning',
        description: 'Tab af skovarealer.'
      },
      methaneAndOther: {
        label: 'Metan & Andre',
        description: 'Udledning af metan, lattergas og F-gasser.'
      }
    },
    carbonRemoval: {
      title: 'Kulstoffjernelse',
      afforestation: {
        label: 'Skovrejsning',
        description: 'Plantning af nye skove.'
      },
      technological: {
        label: 'Teknologisk',
        description: 'Fjernelse af kulstof ved hjælp af teknologi.'
      }
    }
  }
};
