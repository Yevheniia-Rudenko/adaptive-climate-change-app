import { useState } from 'react';
import { Thermometer, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Parameter = {
  id: string;
  label: string;
  min: number;
  max: number;
  default: number;
  unit: string;
  description: string;
};

type DashboardMetric = {
  label: string;
  getValue: (params: { [key: string]: number }) => number;
  unit: string;
  baseline: number;
  goodDirection: 'up' | 'down';
};

type InteractiveDashboardProps = {
  moduleId: number;
};

const moduleConfigs: {
  [key: number]: {
    title: string;
    parameters: Parameter[];
    metrics: DashboardMetric[];
  };
} = {
  1: {
    title: 'Explore Climate Futures Scenarios',
    parameters: [
      {
        id: 'renewableGrowth',
        label: 'Renewable Energy Growth',
        min: 0,
        max: 100,
        default: 30,
        unit: '%/year',
        description: 'Speed of transition to solar, wind, and other renewables'
      },
      {
        id: 'deforestation',
        label: 'Deforestation Rate',
        min: 0,
        max: 100,
        default: 50,
        unit: '%',
        description: 'Current level of forest loss'
      }
    ],
    metrics: [
      {
        label: 'Temperature by 2100',
        getValue: (p) => 3.5 - (p.renewableGrowth * 0.02) + (p.deforestation * 0.01),
        unit: '°C',
        baseline: 3.5,
        goodDirection: 'down'
      },
      {
        label: 'Climate Optimism',
        getValue: (p) => 30 + (p.renewableGrowth * 0.5) - (p.deforestation * 0.3),
        unit: '%',
        baseline: 30,
        goodDirection: 'up'
      }
    ]
  },
  2: {
    title: 'Stock and Flow Dynamics',
    parameters: [
      {
        id: 'emissions',
        label: 'Annual CO₂ Emissions',
        min: 0,
        max: 100,
        default: 80,
        unit: 'Gt/year',
        description: 'Flow: CO₂ added to atmosphere each year'
      },
      {
        id: 'carbonSinks',
        label: 'Natural Carbon Absorption',
        min: 0,
        max: 100,
        default: 40,
        unit: '%',
        description: 'Flow: CO₂ removed by forests and oceans'
      }
    ],
    metrics: [
      {
        label: 'Atmospheric CO₂ Stock',
        getValue: (p) => 420 + ((p.emissions - p.carbonSinks) * 0.5),
        unit: 'ppm',
        baseline: 420,
        goodDirection: 'down'
      },
      {
        label: 'Net Annual Change',
        getValue: (p) => (p.emissions * 0.4) - (p.carbonSinks * 0.3),
        unit: 'Gt/year',
        baseline: 0,
        goodDirection: 'down'
      }
    ]
  },
  3: {
    title: 'Pathway Simulator',
    parameters: [
      {
        id: 'coalPhaseout',
        label: 'Coal Phase-out Speed',
        min: 0,
        max: 100,
        default: 20,
        unit: '%/decade',
        description: 'How quickly we stop using coal'
      },
      {
        id: 'electrification',
        label: 'Transport Electrification',
        min: 0,
        max: 100,
        default: 25,
        unit: '%',
        description: 'Share of electric vehicles'
      },
      {
        id: 'carbonPrice',
        label: 'Carbon Pricing',
        min: 0,
        max: 200,
        default: 50,
        unit: '$/ton',
        description: 'Tax on carbon emissions'
      }
    ],
    metrics: [
      {
        label: 'Warming by 2050',
        getValue: (p) => 2.2 - (p.coalPhaseout * 0.008) - (p.electrification * 0.006) - (p.carbonPrice * 0.002),
        unit: '°C',
        baseline: 2.2,
        goodDirection: 'down'
      },
      {
        label: 'Pathway Risk Level',
        getValue: (p) => {
          const score = (p.coalPhaseout + p.electrification + p.carbonPrice) / 3;
          return 100 - score;
        },
        unit: '%',
        baseline: 70,
        goodDirection: 'down'
      }
    ]
  },
  4: {
    title: 'Systems Solutions Dashboard',
    parameters: [
      {
        id: 'renewableEnergy',
        label: 'Renewable Energy',
        min: 0,
        max: 100,
        default: 30,
        unit: '% of grid',
        description: 'Clean electricity powers everything'
      },
      {
        id: 'buildingEfficiency',
        label: 'Building Efficiency',
        min: 0,
        max: 100,
        default: 40,
        unit: '%',
        description: 'Better insulation, smart design'
      },
      {
        id: 'landRestoration',
        label: 'Land Restoration',
        min: 0,
        max: 100,
        default: 20,
        unit: '% restored',
        description: 'Forests, wetlands, grasslands'
      }
    ],
    metrics: [
      {
        label: 'Total System Impact',
        getValue: (p) => {
          // Synergy bonus when multiple solutions are high
          const avg = (p.renewableEnergy + p.buildingEfficiency + p.landRestoration) / 3;
          const synergy = Math.min(p.renewableEnergy, p.buildingEfficiency, p.landRestoration) * 0.2;
          return avg + synergy;
        },
        unit: '% reduction',
        baseline: 30,
        goodDirection: 'up'
      },
      {
        label: 'Co-benefits Score',
        getValue: (p) => {
          return (p.renewableEnergy * 0.4 + p.buildingEfficiency * 0.3 + p.landRestoration * 0.8) / 1.5;
        },
        unit: 'points',
        baseline: 25,
        goodDirection: 'up'
      }
    ]
  },
  5: {
    title: 'High-Leverage Interventions',
    parameters: [
      {
        id: 'policyStrength',
        label: 'Climate Policy Strength',
        min: 0,
        max: 100,
        default: 35,
        unit: '/100',
        description: 'Government regulations and incentives'
      },
      {
        id: 'techInnovation',
        label: 'Clean Tech R&D Investment',
        min: 0,
        max: 100,
        default: 30,
        unit: 'B$/year',
        description: 'Research and development funding'
      },
      {
        id: 'socialMovement',
        label: 'Social Movement Strength',
        min: 0,
        max: 100,
        default: 40,
        unit: '% engaged',
        description: 'Public awareness and activism'
      }
    ],
    metrics: [
      {
        label: 'Leverage Multiplier',
        getValue: (p) => {
          // These levers multiply each other's effects
          return 1 + ((p.policyStrength * p.techInnovation * p.socialMovement) / 10000);
        },
        unit: 'x',
        baseline: 1.5,
        goodDirection: 'up'
      },
      {
        label: 'System Change Speed',
        getValue: (p) => {
          const maxLever = Math.max(p.policyStrength, p.techInnovation, p.socialMovement);
          const avgLever = (p.policyStrength + p.techInnovation + p.socialMovement) / 3;
          return avgLever * 0.6 + maxLever * 0.4;
        },
        unit: '%/year',
        baseline: 35,
        goodDirection: 'up'
      }
    ]
  }
};

export function InteractiveDashboard({ moduleId }: InteractiveDashboardProps) {
  const config = moduleConfigs[moduleId];
  const { t } = useLanguage();
  const [params, setParams] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    config.parameters.forEach(p => {
      initial[p.id] = p.default;
    });
    return initial;
  });

  const handleParamChange = (id: string, value: number) => {
    setParams(prev => ({ ...prev, [id]: value }));
  };

  const resetParams = () => {
    const initial: { [key: string]: number } = {};
    config.parameters.forEach(p => {
      initial[p.id] = p.default;
    });
    setParams(initial);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="text-indigo-600" size={28} />
          <h2 className="text-gray-900">{config.title}</h2>
        </div>
        <button
          onClick={resetParams}
          className="px-4 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors border border-gray-200"
        >
          {t.reset}
        </button>
      </div>

      {/* Metrics Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {config.metrics.map((metric, idx) => {
          const value = metric.getValue(params);
          const change = value - metric.baseline;
          const isGood = metric.goodDirection === 'down' ? change < 0 : change > 0;
          
          return (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className="text-gray-600 text-sm">{metric.label}</span>
                {metric.label.includes('Temperature') || metric.label.includes('Warming') ? (
                  <Thermometer className={isGood ? 'text-green-500' : 'text-red-500'} size={20} />
                ) : isGood ? (
                  <TrendingUp className="text-green-500" size={20} />
                ) : (
                  <TrendingDown className="text-red-500" size={20} />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-gray-900">
                  {value.toFixed(1)}
                </span>
                <span className="text-gray-600">{metric.unit}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className={`text-sm ${isGood ? 'text-green-600' : 'text-red-600'}`}>
                  {change > 0 ? '+' : ''}{change.toFixed(1)} {metric.unit}
                </div>
                <span className="text-xs text-gray-500">from baseline</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Parameter Controls */}
      <div className="space-y-5">
        {config.parameters.map((param) => (
          <div key={param.id} className="bg-white rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="text-gray-900 block mb-1">
                  {param.label}
                </label>
                <p className="text-sm text-gray-600">{param.description}</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-2xl text-indigo-600">
                  {params[param.id]}
                </div>
                <div className="text-xs text-gray-500">{param.unit}</div>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min={param.min}
                max={param.max}
                value={params[param.id]}
                onChange={(e) => handleParamChange(param.id, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                style={{
                  background: `linear-gradient(to right, rgb(79 70 229) 0%, rgb(79 70 229) ${((params[param.id] - param.min) / (param.max - param.min)) * 100}%, rgb(229 231 235) ${((params[param.id] - param.min) / (param.max - param.min)) * 100}%, rgb(229 231 235) 100%)`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}