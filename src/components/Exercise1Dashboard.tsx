import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions
const GRAPHS = [
    { id: '62', label: 'CO2 Net Emissions', varId: '_co2_equivalent_net_emissions' },
    { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_year' },
    { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
    { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
    { id: '279', label: 'Species loss - Extinction', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
    { id: '183', label: 'Crop Yield', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
    { id: '112', label: 'Air Pollution', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

export default function Exercise1Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Slider states
    const [natureBasedVal, setNatureBasedVal] = useState(0); // 0-100 range for slider UI
    const [natureBasedText, setNatureBasedText] = useState('status quo');
    const [deforestationVal, setDeforestationVal] = useState(0); // 0-100 range for slider UI (assuming reduction slider usually goes positive)
    const [deforestationText, setDeforestationText] = useState('status quo');

    // Display states
    const [tempC, setTempC] = useState(3.2);
    const [tempF, setTempF] = useState(5.7);
    const [selectedGraphId, setSelectedGraphId] = useState('62'); // Default to CO2 Net Emissions

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<any>(null);
    const modelContextRef = useRef<any>(null);
    const graphViewRef = useRef<any>(null);
    const coreConfigRef = useRef<any>(null);

    // Input refs
    const natureBasedInputRef = useRef<any>(null); // ID 417
    const deforestationInputRef = useRef<any>(null); // ID 57

    // Helper function to get localized string
    const str = (key: string) => {
        return (enStrings as any)[key] || key;
    };

    // Generalized slider status text
    const getSliderText = (value: number) => {
        if (value > 0) return 'increased effort';
        if (value < 0) return 'decreased effort';
        return 'status quo';
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
                const stringValue = value.toFixed(1);
                // Heuristic for %
                const title = graphSpec.title || '';
                if (graphSpec.kind === 'h-bar' || title.includes('Percent') || title.includes('Species')) {
                    return `${stringValue}%`;
                }
                return stringValue;
            },
            formatYAxisTooltipValue: (value: number) => value.toFixed(2)
        };
    };

    const updateGraphData = (graphView: any) => {
        try {
            if (!graphView || !modelContextRef.current) return;

            const graphViewModel = graphView.viewModel;
            for (const datasetViewModel of graphViewModel.getDatasets()) {
                const datasetSpec = datasetViewModel.spec;
                const series = modelContextRef.current.getSeriesForVar(
                    datasetSpec.varId,
                    datasetSpec.externalSourceName
                );

                const newPoints = series?.points || [];
                datasetViewModel.points = [...newPoints];

                // Logic to show/hide specific datasets can be added here if needed
                // For now, show them all (baseline and current usually)
                if (!datasetSpec.externalSourceName) {
                    datasetSpec.color = '#3B82F6'; // Current scenario blue
                    datasetSpec.lineWidth = 4;
                } else if (datasetSpec.externalSourceName === 'baseline') {
                    datasetSpec.color = '#000000';
                    datasetSpec.lineWidth = 4;
                }
            }

            graphView.updateData(true);
        } catch (e) {
            console.error('Error in updateGraphData:', e);
        }
    };

    const updateTemperatureDisplay = () => {
        if (!modelContextRef.current) return;

        // Try getting the variable that is confirmed to be in outputs
        let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');

        // If not found, try the specific relative one
        if (!tempSeries || !tempSeries.points) {
            tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
        }

        if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
            const tempCelsius = tempSeries.getValueAtTime(2100);
            console.log(`Temp Update (Main Var): ${tempCelsius.toFixed(4)} C`);
            const tempFahrenheit = tempCelsius * 9 / 5;
            setTempC(tempCelsius);
            setTempF(tempFahrenheit);
        } else {
            // Fallback: approximate from emissions if main temp var is missing
            const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
            if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
                const emissions2100 = emissionsSeries.getValueAtTime(2100);
                // Approximate relationship: 1.5C baseline + effect of emissions
                // This is a rough heuristic found in EnRoadsDashboard fallback
                const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
                const tempFahrenheit = tempCelsius * 9 / 5;

                console.log(`Temp Update (Fallback): ${tempCelsius.toFixed(4)} C`);
                setTempC(tempCelsius);
                setTempF(tempFahrenheit);
            } else {
                console.log('Temp Update: No data found (neither temp nor emissions)');
            }
        }
    };

    const updateDashboard = () => {
        if (graphViewRef.current) updateGraphData(graphViewRef.current);
        updateTemperatureDisplay();
    };

    const loadGraph = (graphId: string) => {
        if (!coreConfigRef.current) return;

        const graphSpec = coreConfigRef.current.graphs.get(graphId);
        if (!graphSpec) {
            console.error(`Graph ID ${graphId} not found`);
            return;
        }

        console.log(`Loading graph ${graphId}:`, graphSpec);

        // Safety check for datasets
        if (!graphSpec.datasets || !Array.isArray(graphSpec.datasets)) {
            console.error(`Graph ${graphId} has no datasets!`, graphSpec);
            return;
        }

        const canvas = document.getElementById('exercise1-graph-canvas') as HTMLCanvasElement;
        if (!canvas) {
            console.error('Canvas element not found for Exercise 1');
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Ensure consistent size
        canvas.width = rect.width * dpr;
        canvas.height = 300 * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '300px';

        let viewModel;
        try {
            viewModel = createGraphViewModel(graphSpec);
        } catch (e) {
            console.error('Error creating graph view model:', e);
            return;
        }

        const style = {
            font: {
                family: 'system-ui, -apple-system, sans-serif',
                style: 'normal',
                color: '#1f2937'
            },
            xAxis: { tickMaxCount: 6 },
            yAxis: { tickMaxCount: 6 },
            getAxisLabelFontSize: () => 14,
            getTickLabelFontSize: () => 12,
            getDefaultLineWidth: () => 4,
            plotBackgroundColor: '#ffffff'
        };

        const options = { style, responsive: true, animations: true };

        // Destroy old graph view if exists? GraphView class doesn't seem to have destroy, just new instance
        try {
            console.log('Attempting to create GraphView instance...');
            graphViewRef.current = new GraphView(canvas, viewModel, options, true);
            console.log('GraphView instance created successfully');
            // Initial update
            updateGraphData(graphViewRef.current);
        } catch (e) {
            console.error('CRITICAL ERROR instantiating GraphView:', e);
            setError('Failed to initialize graph visualization.');
        }
    };

    // Handle inputs
    const handleNatureBasedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sliderPos = parseFloat(e.target.value); // 0 to 100
        setNatureBasedVal(sliderPos);

        // Map 0-100 to appropriate range for nature based input (417)
        // Check min/max when loaded, but usually 0 to 100% adoption
        if (natureBasedInputRef.current) {
            const min = natureBasedInputRef.current.min !== undefined ? natureBasedInputRef.current.min : 0;
            const max = natureBasedInputRef.current.max !== undefined ? natureBasedInputRef.current.max : 100;
            const val = min + (sliderPos / 100) * (max - min);

            console.log(`Setting Nature Input (417) to: ${val}`);
            natureBasedInputRef.current.set(val);
            setNatureBasedText(`${Math.round(sliderPos)}% Adoption`);
        }
    };

    const handleDeforestationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sliderPos = parseFloat(e.target.value);
        setDeforestationVal(sliderPos);

        // Input 57 is "Deforestation & Mature Forest Degradation (reduce/increase)"
        // Usually -5 to +5 or -100 to +100 %/year. Let's assume range and calibrate.
        // Actually label says (reduce/increase), so it might be a rate.
        if (deforestationInputRef.current) {
            const min = deforestationInputRef.current.min !== undefined ? deforestationInputRef.current.min : -5; // Default guess
            const max = deforestationInputRef.current.max !== undefined ? deforestationInputRef.current.max : 5; // Default guess
            // Map slider 0-100 to min-max? 
            // Or maybe center it? Center (50) = 0?
            // Let's assume slider is "Performance" like: 0 = status quo, 100 = max reduction?
            // Or -something to +something?
            // User image shows sliders, standard look. Usually left is status quo?
            // Let's just map linearly for now, and check range.
            const val = min + (sliderPos / 100) * (max - min);
            deforestationInputRef.current.set(val);
            setDeforestationText(val.toFixed(1));
        }
    };

    // Initialize
    useEffect(() => {
        const initApp = async () => {
            try {
                setIsLoading(true);
                coreConfigRef.current = getDefaultConfig();
                modelRef.current = await createAsyncModel();
                modelContextRef.current = modelRef.current.addContext();
                createDefaultOutputs();

                // Ensure temperature variable is computed
                // _temperature_change_from_1850 is available by default, 
                // whereas _temperature_relative_to_1850_1900 might be missing unless specific graphs are loaded.


                // Load Inputs
                // Nature based: 417
                natureBasedInputRef.current = modelContextRef.current.getInputForId('417');
                console.log('Nature input:', natureBasedInputRef.current);
                if (natureBasedInputRef.current) {
                    const current = natureBasedInputRef.current.get();
                    const min = natureBasedInputRef.current.min !== undefined ? natureBasedInputRef.current.min : 0;
                    const max = natureBasedInputRef.current.max !== undefined ? natureBasedInputRef.current.max : 100;
                    console.log(`Nature values - current: ${current}, min: ${min}, max: ${max}`);

                    if (max !== min) {
                        const percent = ((current - min) / (max - min)) * 100;
                        setNatureBasedVal(Math.max(0, Math.min(100, isNaN(percent) ? 0 : percent)));
                    }
                }

                // Deforestation: 57
                deforestationInputRef.current = modelContextRef.current.getInputForId('57');
                console.log('Deforestation input:', deforestationInputRef.current);
                if (deforestationInputRef.current) {
                    const current = deforestationInputRef.current.get();
                    const min = deforestationInputRef.current.min !== undefined ? deforestationInputRef.current.min : -5; // Default guess
                    const max = deforestationInputRef.current.max !== undefined ? deforestationInputRef.current.max : 5; // Default guess
                    console.log(`Deforestation values - current: ${current}, min: ${min}, max: ${max}`);

                    if (max !== min) {
                        const percent = ((current - min) / (max - min)) * 100;
                        setDeforestationVal(Math.max(0, Math.min(100, isNaN(percent) ? 50 : percent)));
                    }
                }

                modelContextRef.current.onOutputsChanged = () => {
                    updateDashboard();
                };

                // Wait for DOM
                setTimeout(() => {
                    try {
                        console.log('Starting async loads in setTimeout');
                        // loadGraph handled by useEffect
                        // loadGraph(selectedGraphId); 
                        updateTemperatureDisplay();
                        console.log('Temp displayed (INITIAL)');
                    } catch (e) {
                        console.error('CRITICAL ERROR in setTimeout:', e);
                    }
                }, 200);

                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load En-ROADS model.');
                setIsLoading(false);
            }
        };

        if (!modelRef.current) {
            initApp();
        }

        return () => {
            // cleanup
        };
    }, []);

    // Effect to reload graph when selectedGraphId changes
    useEffect(() => {
        if (!isLoading && !error && coreConfigRef.current) {
            loadGraph(selectedGraphId);
        }
    }, [selectedGraphId, isLoading, error]);


    console.log('RENDER EXERCISE 1 DASHBOARD', {
        isLoading,
        error,
        natureBasedVal,
        deforestationVal,
        tempC,
        tempF
    });

    if (isLoading) return <div className="p-8 text-center">Loading Model...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    if (isNaN(natureBasedVal) || isNaN(deforestationVal)) {
        console.error('NaN detected in render state!', { natureBasedVal, deforestationVal });
        return <div>Error: Invalid State</div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora">
            {/* Top Section: Graph + Temp */}
            <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">En-Roads Dashboard (Restored)</h2>

            {/* Top Section: Graph + Temp */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Graph Area */}
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <select
                            value={selectedGraphId}
                            onChange={(e) => setSelectedGraphId(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold"
                        >
                            {GRAPHS.map(g => (
                                <option key={g.id} value={g.id}>{g.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative w-full h-[300px]">
                        <canvas id="exercise1-graph-canvas" className="w-full h-full" />
                    </div>
                    <div className="flex gap-4 justify-center mt-4 text-xs font-semibold uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 bg-black"></div>
                            <span className="text-gray-600 dark:text-gray-400">Baseline</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 bg-blue-500"></div>
                            <span className="text-gray-600 dark:text-gray-400">Current Scenario</span>
                        </div>
                    </div>
                </div>

                {/* Temperature Display */}
                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl md:text-5xl font-black text-blue-500 mb-1">
                        +{tempC.toFixed(1)}°C
                    </div>
                    <div className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                        +{tempF.toFixed(1)}°F
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-xs">
                        Temperature<br />Increase by<br />2100
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-gray-700 dark:text-gray-200">Carbon-dioxide removal - nature based</label>
                        <span className="text-sm font-mono text-gray-500">{natureBasedText}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={natureBasedVal}
                        onChange={handleNatureBasedChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-gray-700 dark:text-gray-200">Deforestation</label>
                        <span className="text-sm font-mono text-gray-500">{deforestationText}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={deforestationVal}
                        onChange={handleDeforestationChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                    />
                </div>
            </div>



        </div>
    );
}
