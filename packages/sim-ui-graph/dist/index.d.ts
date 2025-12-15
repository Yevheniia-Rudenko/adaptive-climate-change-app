import { HexColor, GraphDatasetSpec, Point, GraphSpec, StringKey } from '@climateinteractive/sim-core';

/** The font style for a graph. */
interface GraphFontStyle {
    /** CSS-style font family string (can include comma-separated fallbacks). */
    family?: string;
    /** CSS-style font style. */
    style?: string;
    /** CSS-style hex color. */
    color?: HexColor;
}
/** The axis style for a graph. */
interface GraphAxisStyle {
    /** Whether the axis label should be shown. */
    axisLabelVisible?: boolean;
    /** The font style for the axis label (overrides the general font style). */
    axisLabelFont?: GraphFontStyle;
    /** Whether the tick labels should be shown. */
    tickLabelsVisible?: boolean;
    /** The font style for the tick labels (overrides the general font style). */
    tickLabelFont?: GraphFontStyle;
    /** Whether the tick lines should be shown. */
    tickLinesVisible?: boolean;
    /** The maximum number of ticks to display. */
    tickMaxCount?: number;
    /**
     * The scale factor to apply to the width of the tick label area.  Currently
     * this only applies to the y axis.
     */
    tickAreaScale?: number;
    /** Whether the grid lines should be shown. */
    gridLinesVisible?: boolean;
    /** The color used for grid lines. */
    gridLineColor?: HexColor;
}
/** The style parameters for a graph dataset (plot). */
interface GraphDatasetStyle {
    /**
     * The line width, in pixels.
     */
    lineWidth?: number;
    /**
     * The line dash pattern, in pixels.  The first value of each pair is the length
     * of the dash, and the second value is the length of the gap.
     */
    lineDash?: number[];
    /**
     * The radius of scatter points, in pixels.
     */
    pointRadius?: number;
}
/**
 * Options for graph view styling.
 */
interface GraphStyle {
    /**
     * The general font style for the graph.
     */
    font?: GraphFontStyle;
    /**
     * The style for the x axis.
     */
    xAxis?: GraphAxisStyle;
    /**
     * The style for the y axis.
     */
    yAxis?: GraphAxisStyle;
    /**
     * Optional callback to customize the font size for axis labels.
     * If defined, this will be called after layout events (e.g. after
     * the browser window is resized.)
     *
     * @return The font size for axis labels, in pixels.
     */
    getAxisLabelFontSize?(): number;
    /**
     * Optional callback to customize the font size for tick labels.
     * If defined, this will be called after layout events (e.g. after
     * the browser window is resized.)
     *
     * @return The font size for tick labels, in pixels.
     */
    getTickLabelFontSize?(): number;
    /**
     * Optional callback to customize the default line width for graph
     * datasets.  If defined, this will be called after layout events (e.g.,
     * after the browser window is resized).  If undefined, a default value
     * will be used.
     *
     * @return The default line width for graph datasets, in pixels.
     */
    getDefaultLineWidth?(): number;
    /**
     * Optional callback to customize graph dataset style parameters.
     * If defined, this will be called after layout events (e.g., after
     * the browser window is resized).
     *
     * @param datasetSpec The spec for the dataset to be styled.
     * @param lineWidthInPx The default line width.  This will be the value provided by
     * `getDefaultLineWidth` if defined, otherwise will be a default value.
     * @return The style for the given dataset.
     */
    getDatasetStyle?(datasetSpec: GraphDatasetSpec, lineWidthInPx: number): GraphDatasetStyle;
}

/** View model for a graph dataset. */
interface GraphDatasetViewModel {
    /** The spec that describes the dataset. */
    spec: GraphDatasetSpec;
    /** Whether the dataset is visible. */
    visible: boolean;
    /** The overridden color for the dataset.  If undefined, the color from the spec will be used. */
    color?: HexColor;
    /** The opacity for the dataset. */
    opacity?: number;
    /** The array of points in the dataset. */
    points: Point[];
}
/** Describes the bounding box of the graph content. */
interface GraphBox {
    left: number;
    top: number;
    right: number;
    bottom: number;
    yMin?: number;
    yMax?: number;
}
/** Options for graph view appearance. */
interface GraphViewOptions {
    /**
     * The graph styling options.
     */
    style?: GraphStyle;
    /**
     * Whether to enable built-in graph animations.  If undefined, defaults to true.
     */
    animations?: boolean;
    /**
     * Whether to enable built-in responsive resize support.  If undefined, defaults to true.
     */
    responsive?: boolean;
    /**
     * Whether to show a tick and dashed vertical line for the current year.  If undefined, defaults
     * to false.
     */
    showCurrentYear?: boolean;
    /**
     * The tooltip mode.  If 'normal', the default tooltip behavior is used.  If 'vertical-line',
     * the tooltip will follow the mouse location, a vertical line will be drawn through the
     * current year, and all data points will be displayed in the tooltip.   If undefined, defaults
     * to 'normal'.
     */
    tooltipMode?: 'normal' | 'vertical-line';
}
/** View model for a graph. */
interface GraphViewModel {
    /** The spec that describes the graph datasets and visuals. */
    spec: GraphSpec;
    /**
     * Called after the graph view has been resized.
     *
     * @param box The bounding box for the graph content.
     */
    onResize?: (box: GraphBox) => void;
    /**
     * Return the view model for each dataset to display in the graph.
     */
    getDatasets(): GraphDatasetViewModel[];
    /**
     * Optional callback used to specify the dataset that should be highlighted.
     *
     * @return The spec for the highlighted dataset, or undefined if no dataset
     * should be highlighted.
     */
    getHighlightedDataset?(): GraphDatasetSpec | undefined;
    /**
     * Return the translated string for the given key.
     *
     * @param key The string key.
     * @param values The optional map of values to substitute into the template string.
     */
    getStringForKey(key: StringKey, values?: {
        [key: string]: string;
    }): string;
    /**
     * Return a formatted string for the given y-axis tick value.
     *
     * @param value The number value.
     */
    formatYAxisTickValue(value: number): string;
    /**
     * Return a formatted string for the given y-axis tooltip value.
     *
     * @param value The number value.
     */
    formatYAxisTooltipValue(value: number): string;
}

/**
 * Wraps a native chart element.
 */
declare class GraphView {
    readonly canvas: HTMLCanvasElement;
    readonly viewModel: GraphViewModel;
    private readonly tooltipsAvailable;
    private chart;
    constructor(canvas: HTMLCanvasElement, viewModel: GraphViewModel, options: GraphViewOptions, tooltipsEnabled: boolean);
    /**
     * Set whether animations should be enabled.
     *
     * Note that if you want to disable animations entirely, it is better to
     * set `animations` to false in `GraphViewOptions` to avoid initializing
     * animation support in the underlying chart library.  This method is mainly
     * useful in cases where animations are disabled initially but you want to
     * enable them later.
     */
    setAnimationsEnabled(enabled: boolean): void;
    /**
     * Set whether tooltips should be displayed.  This has no effect on
     * graph types (e.g. bar graphs) for which tooltips are always disabled.
     */
    setTooltipsEnabled(enabled: boolean): void;
    /**
     * Update all labels to use the appropriate translated strings.
     * This should be called after the current locale/language has
     * changed to ensure that the labels are updated.  This will also
     * cause the chart to refresh its ticks and tooltips to use
     * the correct locale-specific formatting based on the current
     * locale value.
     */
    updateLabels(): void;
    /**
     * Update the chart to reflect the latest data from the model.
     * This should be called after the model has produced new outputs.
     *
     * @param animated Whether to animate the data when it is updated.
     */
    updateData(animated?: boolean): void;
    /**
     * Destroy the chart and any associated resources.
     */
    destroy(): void;
}

export { type GraphAxisStyle, type GraphBox, type GraphDatasetStyle, type GraphDatasetViewModel, type GraphFontStyle, type GraphStyle, GraphView, type GraphViewModel, type GraphViewOptions };
