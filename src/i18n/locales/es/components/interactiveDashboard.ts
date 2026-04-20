export const interactiveDashboard = {
  reset: 'Restablecer a Línea de Base',
  fromBaseline: 'desde la línea de base',
  modules: {
    1: {
      title: 'Explorar Escenarios de Futuros Climáticos',
      params: {
        renewableGrowth: {
          label: 'Crecimiento de Energías Renovables',
          description: 'Velocidad de transición al sol, viento y otras renovables'
        },
        deforestation: {
          label: 'Tasa de Deforestación',
          description: 'Nivel actual de pérdida de bosques'
        }
      },
      metrics: {
        temperature: 'Temperatura para 2100',
        optimism: 'Optimismo Climático'
      }
    },
    2: {
      title: 'Dinámica de Existencias y Flujos',
      params: {
        emissions: {
          label: 'Emisiones Anuales de CO₂',
          description: 'Flujo: CO₂ añadido a la atmósfera cada año'
        },
        carbonSinks: {
          label: 'Absorción Natural de Carbono',
          description: 'Flujo: CO₂ eliminado por bosques y océanos'
        }
      },
      metrics: {
        stock: 'Existencias de CO₂ Atmosférico',
        netChange: 'Cambio Anual Neto'
      }
    },
    3: {
      title: 'Simulador de Trayectorias',
      params: {
        coalPhaseout: {
          label: 'Velocidad de Abandono del Carbón',
          description: 'Qué tan rápido dejamos de usar carbón'
        },
        electrification: {
          label: 'Electrificación del Transporte',
          description: 'Cuota de vehículos eléctricos'
        },
        carbonPrice: {
          label: 'Precio al Carbono',
          description: 'Impuesto a las emisiones de carbono'
        }
      },
      metrics: {
        warming: 'Calentamiento para 2050',
        risk: 'Nivel de Riesgo de la Trayectoria'
      }
    },
    4: {
      title: 'Panel de Soluciones Sistémicas',
      params: {
        renewableEnergy: {
          label: 'Energía Renovable',
          description: 'La electricidad limpia lo mueve todo'
        },
        buildingEfficiency: {
          label: 'Eficiencia en Edificios',
          description: 'Mejor aislamiento, diseño inteligente'
        },
        landRestoration: {
          label: 'Restauración de Tierras',
          description: 'Bosques, humedales, pastizales'
        }
      },
      metrics: {
        impact: 'Impacto Total del Sistema',
        cobenefits: 'Puntuación de Co-beneficios'
      }
    },
    5: {
      title: 'Intervenciones de Alto Impacto',
      params: {
        policyStrength: {
          label: 'Fuerza de la Política Climática',
          description: 'Regulaciones gubernamentales e incentivos'
        },
        techInnovation: {
          label: 'Inversión en I+D de Tecnología Limpia',
          description: 'Financiación de investigación y desarrollo'
        },
        socialMovement: {
          label: 'Fuerza del Movimiento Social',
          description: 'Conciencia pública y activismo'
        }
      },
      metrics: {
        multiplier: 'Multiplicador de Impacto',
        speed: 'Velocidad del Cambio Sistémico'
      }
    }
  }
};
