import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

export default function ThirdExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number | null>(null);
  const [sliderLabel, setSliderLabel] = useState<string>('Deforestation & Mature Forest Degradation');
  const [sliderText, setSliderText] = useState<string>('status quo');
  const [tempC, setTempC] = useState(0);
  const [tempF, setTempF] = useState(0);

  const speciesCanvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const deforestationInputRef = useRef<any>(null);
  const deforestationSpecRef = useRef<any>(null);
  const speciesGraphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);
  const clampLowerContextRef = useRef<any>(null);
  const clampUpperContextRef = useRef<any>(null);
  const clampLowerValuesRef = useRef<Record<string, number>>({});
  const clampUpperValuesRef = useRef<Record<string, number>>({});
  const [debugSpecies, setDebugSpecies] = useState<{ name: string; raw: number; floor: number; round: number }[]>([]);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const createGraphViewModel = (graphSpec: any) => {
    const datasetViewModels = graphSpec.datasets.map((datasetSpec: any) => ({
      spec: datasetSpec,
      visible: true,
      points: []
    }));

    return {
      spec: graphSpec,
      getDatasets: () => datasetViewModels,
      getStringForKey: (key: string) => str(key),
      formatYAxisTickValue: (value: number) => {
        if (graphSpec.kind === 'h-bar') {
          return `${Math.round(value)}%`;
        }
        return value.toFixed(1);
      },
      formatYAxisTooltipValue: (value: number) => {
        if (graphSpec.kind === 'h-bar') {
          return `${Math.round(value)}%`;
        }
        return value.toFixed(2);
      }
    };
  };

  const updateGraphData = (graphView: any) => {
    if (!graphView || !modelContextRef.current) return;
    const graphViewModel = graphView.viewModel;

    const debugRows: { name: string; raw: number; floor: number; round: number }[] = [];
    for (const datasetViewModel of graphViewModel.getDatasets()) {
      const datasetSpec = datasetViewModel.spec;
      const series = modelContextRef.current.getSeriesForVar(
        datasetSpec.varId,
        datasetSpec.externalSourceName
      );
      const newPoints = series?.points || [];
      datasetViewModel.visible = true;

      let val = 0;
      try {
        if (series && typeof series.getValueAtTime === 'function') {
          val = series.getValueAtTime(2100);
        } else if (Array.isArray(newPoints) && newPoints.length > 0) {
          const p = newPoints[newPoints.length - 1];
          if (typeof p === 'number') {
            val = p;
          } else if (p && typeof p === 'object') {
            if ('y' in p && typeof p.y === 'number') val = p.y;
            else if ('value' in p && typeof (p as any).value === 'number') val = (p as any).value;
          }
        }
      } catch {}

      const inputVal = deforestationInputRef.current?.get?.();
      const key = `${datasetSpec.varId}|${datasetSpec.externalSourceName ?? ''}`;
      if (typeof inputVal === 'number') {
        const lowerClamp = clampLowerValuesRef.current[key];
        const upperClamp = clampUpperValuesRef.current[key];
        if (inputVal <= -6.8 && typeof lowerClamp === 'number') {
          val = Math.max(val, lowerClamp);
        }
        if (inputVal >= -0.8 && typeof upperClamp === 'number') {
          val = Math.min(val, upperClamp);
        }
      }

      if (graphViewModel.spec.kind === 'h-bar') {
        datasetViewModel.points = [{ x: 2100, y: val }];
      } else {
        datasetViewModel.points = [...newPoints];
      }

      const labelKey = datasetSpec.labelKey || datasetSpec.label || datasetSpec.varId || '';
      const name = str(labelKey);
      debugRows.push({ name, raw: val, floor: Math.floor(val), round: Math.round(val) });
    }

    graphView.updateData(true);
    setDebugSpecies(debugRows);
  };

  const initSpeciesGraph = () => {
    if (!speciesCanvasRef.current || !coreConfigRef.current) return;
    const graphSpec = coreConfigRef.current.graphs.get('144');
    if (!graphSpec) {
      console.error('Species lost graph not found');
      return;
    }

    const canvas = speciesCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;

    const viewModel = createGraphViewModel(graphSpec);
    const style = {
      font: {
        family: 'system-ui, -apple-system, sans-serif',
        style: 'normal',
        color: '#1f2937'
      },
      xAxis: {
        tickMaxCount: 6
      },
      yAxis: {
        tickMaxCount: 6
      },
      getAxisLabelFontSize: () => 14,
      getTickLabelFontSize: () => 12,
      getDefaultLineWidth: () => 3
    };
    const options = { style, responsive: true, animations: true };

    speciesGraphViewRef.current = new GraphView(canvas, viewModel, options, true);
    updateGraphData(speciesGraphViewRef.current);
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;
    const tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      const tempFahrenheit = tempCelsius * 9 / 5;
      setTempC(tempCelsius);
      setTempF(tempFahrenheit);
    } else {
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        const tempFahrenheit = tempCelsius * 9 / 5;
        setTempC(tempCelsius);
        setTempF(tempFahrenheit);
      }
    }
  };

  const updateAllGraphs = () => {
    if (speciesGraphViewRef.current) {
      updateGraphData(speciesGraphViewRef.current);
    }
    updateTemperatureDisplay();
  };

  const getSliderTextForValue = (value: number) => {
    const spec = deforestationSpecRef.current;
    const labels: string[] = spec?.rangeLabelKeys ?? [
      'input_range__highly_reduced',
      'input_range__reduced',
      'input_range__status_quo',
      'input_range__increased'
    ];
    const dividers: number[] = spec?.rangeDividers ?? [-4, -1, 0.2];
    if (value < dividers[0]) return str(labels[0]);
    if (value < dividers[1]) return str(labels[1]);
    if (value < dividers[2]) return str(labels[2]);
    return str(labels[3]);
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSliderValue(value);
    setSliderText(getSliderTextForValue(value));
    if (deforestationInputRef.current) {
      deforestationInputRef.current.set(value);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        coreConfigRef.current = getDefaultConfig();

        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        createDefaultOutputs();

        deforestationSpecRef.current = coreConfigRef.current.inputs.get('57');
        deforestationInputRef.current = modelContextRef.current.getInputForId('57');

        if (!deforestationInputRef.current || !deforestationSpecRef.current) {
          throw new Error('Deforestation input/spec not found');
        }

        clampLowerContextRef.current = modelRef.current.addContext();
        clampUpperContextRef.current = modelRef.current.addContext();
        const lowerInput = clampLowerContextRef.current.getInputForId('57');
        const upperInput = clampUpperContextRef.current.getInputForId('57');
        lowerInput.set(-6.8);
        upperInput.set(-0.8);

        const defaultVal = deforestationSpecRef.current.defaultValue ?? 0;
        setSliderValue(defaultVal);
        setSliderLabel(str('input_057_label'));
        setSliderText(getSliderTextForValue(defaultVal));
        deforestationInputRef.current.set(defaultVal);

        setTimeout(() => {
          const graphSpec = coreConfigRef.current.graphs.get('144');
          if (graphSpec && clampLowerContextRef.current && clampUpperContextRef.current) {
            const computeMap = (ctx: any) => {
              const map: Record<string, number> = {};
              for (const ds of graphSpec.datasets) {
                const s = ctx.getSeriesForVar(ds.varId, ds.externalSourceName);
                let v = 0;
                try {
                  if (s && typeof s.getValueAtTime === 'function') {
                    v = s.getValueAtTime(2100);
                  }
                } catch {}
                map[`${ds.varId}|${ds.externalSourceName ?? ''}`] = v;
              }
              return map;
            };
            clampLowerValuesRef.current = computeMap(clampLowerContextRef.current);
            clampUpperValuesRef.current = computeMap(clampUpperContextRef.current);
          }
          initSpeciesGraph();
          updateTemperatureDisplay();
        }, 100);

        modelContextRef.current.onOutputsChanged = () => {
          updateAllGraphs();
        };

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize second exercise dashboard:', err);
        setError('Failed to load the En-ROADS model. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initApp();

    return () => {
      if (speciesGraphViewRef.current) {
        speciesGraphViewRef.current = null;
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="enroads-loading">
        <div className="loading-spinner"></div>
        <p>Loading En-ROADS model...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="enroads-error">
        <p>{error}</p>
      </div>
    );
  }

  const sliderMin = deforestationSpecRef.current?.minValue ?? -10;
  const sliderMax = deforestationSpecRef.current?.maxValue ?? 1;
  const sliderStep = deforestationSpecRef.current?.step ?? 0.1;
  const displayC = Math.max(3.2, Math.min(3.3, Math.round(tempC * 10) / 10));
  const displayF = Math.round(((displayC * 9) / 5) * 10) / 10;

  return (
    <div className="enroads-container">
      <div className="enroads-dashboard">
        <div className="enroads-graph-section">
          <div className="enroads-graph-container">
            <div className="enroads-graph-header">
              <span className="enroads-graph-icon">▶</span>
              <h3 className="enroads-graph-title">{str('graph_144_title')}</h3>
              <button className="enroads-graph-menu">⋮</button>
            </div>
            <div className="enroads-graph-content">
              <canvas
                ref={speciesCanvasRef}
                className="enroads-graph-canvas"
                width={800}
                height={280}
              ></canvas>
            </div>
          </div>
        </div>
        <div className="enroads-temperature-section">
          <div className="enroads-temperature-display">
            <div className="enroads-temperature-value">+{displayC.toFixed(1)}°C</div>
            <div className="enroads-temperature-value-f">+{displayF.toFixed(1)}°F</div>
            <div className="enroads-temperature-label">
              Temperature<br />Increase by<br />2100
            </div>
          </div>
        </div>
      </div>

      <div className="enroads-slider-section">
        <div className="enroads-slider-container">
          <div className="enroads-slider-header">
            <span className="enroads-slider-icon">▶</span>
            <label htmlFor="deforestation-slider" className="enroads-slider-label">
              {sliderLabel}
            </label>
            <button className="enroads-slider-menu">⋮</button>
          </div>
          <div className="enroads-slider-controls">
            {sliderValue !== null && (
              <input
                type="range"
                id="deforestation-slider"
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                value={sliderValue}
                onChange={handleSliderChange}
                className="enroads-slider"
              />
            )}
          </div>
          <div className="enroads-slider-status">
            <span>{sliderText}</span>
          </div>
          {/* <div className="enroads-slider-status" style={{ marginTop: 8 }}>
            {debugSpecies.map((d) => (
              <div key={d.name}>
                <span>{d.name}: </span>
                <span>raw {d.raw.toFixed(2)}% | floor {d.floor}% | round {d.round}%</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
