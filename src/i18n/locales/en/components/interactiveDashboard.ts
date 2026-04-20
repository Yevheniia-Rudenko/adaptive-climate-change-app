export const interactiveDashboard = {
  reset: 'Reset to Baseline',
  fromBaseline: 'from baseline',
  modules: {
    1: {
      title: 'Explore Climate Futures Scenarios',
      params: {
        renewableGrowth: {
          label: 'Renewable Energy Growth',
          description: 'Speed of transition to solar, wind, and other renewables'
        },
        deforestation: {
          label: 'Deforestation Rate',
          description: 'Current level of forest loss'
        }
      },
      metrics: {
        temperature: 'Temperature by 2100',
        optimism: 'Climate Optimism'
      }
    },
    2: {
      title: 'Stock & Flow Dynamics',
      params: {
        emissions: {
          label: 'Annual CO₂ Emissions',
          description: 'Flow: CO₂ added to atmosphere each year'
        },
        carbonSinks: {
          label: 'Natural Carbon Absorption',
          description: 'Flow: CO₂ removed by forests and oceans'
        }
      },
      metrics: {
        stock: 'Atmospheric CO₂ Stock',
        netChange: 'Net Annual Change'
      }
    },
    3: {
      title: 'Pathway Simulator',
      params: {
        coalPhaseout: {
          label: 'Coal Phase-out Speed',
          description: 'How quickly we stop using coal'
        },
        electrification: {
          label: 'Transport Electrification',
          description: 'Share of electric vehicles'
        },
        carbonPrice: {
          label: 'Carbon Pricing',
          description: 'Tax on carbon emissions'
        }
      },
      metrics: {
        warming: 'Warming by 2050',
        risk: 'Pathway Risk Level'
      }
    },
    4: {
      title: 'Systems Solutions Dashboard',
      params: {
        renewableEnergy: {
          label: 'Renewable Energy',
          description: 'Clean electricity powers everything'
        },
        buildingEfficiency: {
          label: 'Building Efficiency',
          description: 'Better insulation, smart design'
        },
        landRestoration: {
          label: 'Land Restoration',
          description: 'Forests, wetlands, grasslands'
        }
      },
      metrics: {
        impact: 'Total System Impact',
        cobenefits: 'Co-benefits Score'
      }
    },
    5: {
      title: 'High-Leverage Interventions',
      params: {
        policyStrength: {
          label: 'Climate Policy Strength',
          description: 'Government regulations and incentives'
        },
        techInnovation: {
          label: 'Clean Tech R&D Investment',
          description: 'Research and development funding'
        },
        socialMovement: {
          label: 'Social Movement Strength',
          description: 'Public awareness and activism'
        }
      },
      metrics: {
        multiplier: 'Leverage Multiplier',
        speed: 'System Change Speed'
      }
    }
  }
};
