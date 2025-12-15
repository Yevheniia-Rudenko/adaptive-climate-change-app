import { InputValue, InputVarId as InputVarId$1, Series, Outputs, ModelRunner } from '@sdeverywhere/runtime';
export { InputCallbacks, ModelListing, ModelRunner, Outputs, Series } from '@sdeverywhere/runtime';
import { SliderSpec, SwitchSpec, PolicyGroupId, StringKey, InputId, GraphId, GraphSpec, OutcomeSpec, OutputVarId, InputVarId } from '@climateinteractive/sim-core';
export { DataTableRowSpec, DataTableSpec, DataTableValueId, FormatString, GraphAlternateSpec, GraphDatasetLabelStyle, GraphDatasetSpec, GraphId, GraphKind, GraphLegendItemSpec, GraphSide, GraphSpec, HexColor, InputId, InputVarId, LegendItemStyle, LineStyle, LineStyleModifier, OutcomeSpec, OutputVarId, Point, PolicyGroupId, SimulationModeId, SliderSpec, StringKey, SwitchSpec, UnitSystem } from '@climateinteractive/sim-core';

/** An input is either a slider or a switch (with associated sliders). */
type InputSpec = SliderSpec | SwitchSpec;

/** Describes a group of policy sliders and switches displayed in the "advanced" view. */
interface PolicyGroupSpec {
    /** The group ID. */
    readonly id: PolicyGroupId;
    /** The key for the group title string. */
    readonly titleKey: StringKey;
    /** The key for the short title string (used in basic view). */
    readonly shortTitleKey: StringKey;
    /** The key for the group description string. */
    readonly descriptionKey: StringKey;
    /** The URL for the extended help page. */
    readonly helpUrl: string;
    /** The inputs (sliders and switches) for this group. */
    readonly inputIds: ReadonlyArray<InputId>;
    /** The set of section headers for this group. */
    readonly sectionHeaders: Readonly<Record<InputId, StringKey>>;
    /** The related graphs for this group. */
    readonly graphIds: ReadonlyArray<GraphId>;
}

/**
 * Describes a group of inputs in the "assumptions" panel.  If the `inputIds`
 * array is empty, the `titleKey` represents a category title that can be
 * displayed in a header/separator.
 */
interface AssumptionGroupSpec {
    /** The key for the group title string. */
    readonly titleKey: StringKey;
    /** The inputs (sliders and switches) to show in this group. */
    readonly inputIds: ReadonlyArray<InputId>;
}

/**
 * Exposes all the configuration that can be used to build a user
 * interface around the En-ROADS model.
 */
declare class Config {
    readonly modelVersion: string;
    readonly inputs: ReadonlyMap<InputId, InputSpec>;
    readonly graphs: ReadonlyMap<GraphId, GraphSpec>;
    readonly policyGroups: ReadonlyMap<PolicyGroupId, PolicyGroupSpec>;
    readonly assumptionGroups: ReadonlyArray<AssumptionGroupSpec>;
    readonly outcomes: ReadonlyArray<OutcomeSpec>;
    /**
     * @hidden This is intended for use by `getDefaultConfig` only.
     *
     * @param modelVersion The model version string.
     * @param inputs The available input specs; these are in the order expected by the model.
     * @param graphs The available graph specs.
     * @param policyGroups The available policy group specs.
     * @param assumptionGroups The available assumption group specs.
     * @param outcomes The available outcome specs.
     */
    constructor(modelVersion: string, inputs: ReadonlyMap<InputId, InputSpec>, graphs: ReadonlyMap<GraphId, GraphSpec>, policyGroups: ReadonlyMap<PolicyGroupId, PolicyGroupSpec>, assumptionGroups: ReadonlyArray<AssumptionGroupSpec>, outcomes: ReadonlyArray<OutcomeSpec>);
    /**
     * Return the set of output variables that are needed for reference data.  This
     * includes output variables that appear with a "Ref" dataset in one or more
     * graph specs, as well as variables used for outcomes.
     */
    getRefOutputs(): Set<OutputVarId>;
    /**
     * Return the set of input variables that are needed for special model runs
     * to compute damage and social cost of carbon.  This currently only includes
     * assumptions and inputs in the Population and Economic Growth policy groups.
     */
    getDamageInputs(): Set<InputVarId>;
}
/**
 * Return the default configuration for the included model instance.
 */
declare function getDefaultConfig(): Config;

/**
 * Represents a slider (range) input to the model.
 */
interface SliderInput extends InputValue {
    kind: 'slider';
    /** The spec that describes how the slider can be displayed in a user interface. */
    spec: SliderSpec;
}
/**
 * Represents a switch (on/off) input to the model.
 */
interface SwitchInput extends InputValue {
    kind: 'switch';
    /** The spec that describes how the switch can be displayed in a user interface. */
    spec: SwitchSpec;
}
/**
 * Represents an input to the model.
 */
type Input = SliderInput | SwitchInput;
/**
 * Create an `Input` instance that can be used by the `ModelContext` class.
 * When the input value is changed, it will cause the `ModelContext` to
 * automatically run the En-ROADS model and produce new outputs.
 *
 * @param spec The spec for the slider or switch input.
 */
declare function createModelInput(spec: InputSpec): Input;
/**
 * Create an `InputValue` that is only used to hold a simple value (no spec, no callbacks).
 *
 * @hidden
 */
declare function createSimpleInputValue(varId: InputVarId$1, defaultValue?: number): InputValue;

/** The name of a data source for external datasets, e.g., 'Ref', 'Constants'. */
type SourceName = string & {
    __brand?: 'SourceName';
};
/** Type alias for a map that holds all reference data for a given source name. */
type RefDataMap = Map<SourceName, Map<OutputVarId, Series>>;
/** Specifies the model inputs and outputs to be used for a reference run. */
interface RefScenario {
    /** The name of the data source associated with the reference data. */
    sourceName: SourceName;
    /** The set of input {ID, value} pairs that are passed to the model for a reference run. */
    inputs: Map<InputId, number>;
    /** The set of output variable IDs for which data will be captured from a reference run. */
    outputs: OutputVarId[];
}

/**
 * Holds values related to the social cost of carbon.
 */
interface SocialCostOutputs {
    /** The "Social Cost of Carbon" value. */
    socialCostOfCarbon: number;
}

/**
 * Defines a context that holds a distinct set of model inputs and outputs.
 * These inputs and outputs are kept separate from those in other contexts,
 * which allows an application to use the same underlying model to run with
 * multiple I/O contexts.
 */
declare class ModelContext {
    private readonly inputs;
    private readonly refData;
    /**
     * A copy of the values of the `inputs` map in array form for easier/faster linear access.
     * @hidden This is intended for use by `ModelScheduler` only.
     */
    readonly inputsArray: Input[];
    /**
     * The structure into which the model outputs will be stored.
     * @hidden This is intended for use by `ModelScheduler` only.
     */
    readonly outputs: Outputs;
    /**
     * Whether a model run is needed for this context.
     * @hidden This is intended for use by `ModelScheduler` only.
     */
    runNeeded: boolean;
    /** Whether to enable special model runs to 2300. */
    private socialCostActive;
    /**
     * Called when the outputs have been updated after a model run.
     */
    onOutputsChanged?: () => void;
    /**
     * Called when the "Social Cost of Carbon" values have been updated after special
     * model runs.
     */
    onSocialCostOutputsChanged?: (outputs: SocialCostOutputs) => void;
    /**
     * Called when the `socialCostActive` flag is changed.
     * @hidden For internal use only.
     */
    onSocialCostActiveChanged?: (active: boolean) => void;
    /**
     * @hidden This is intended for use by `Model` only.
     *
     * @param inputs The input values, in the same order as in the spec file passed to `sde`.
     * @param outputs The structure into which the model outputs will be stored.
     * @param refData Reference data for a subset of variables.
     */
    constructor(inputs: Map<InputId, Input>, outputs: Outputs, refData: RefDataMap);
    /**
     * Return the model input for the given input ID, or undefined if there is
     * no input for that ID.
     */
    getInputForId(inputId: InputId): Input | undefined;
    /**
     * Return the series data for the given model output variable.
     *
     * @param varId The ID of the output variable associated with the data.
     * @param sourceName The external data source name (e.g. "Ref"), or
     * undefined to use the latest model output data.
     */
    getSeriesForVar(varId: OutputVarId, sourceName?: SourceName): Series | undefined;
    /**
     * Return whether the special "Social Cost of Carbon" runs are enabled.
     */
    isSocialCostActive(): boolean;
    /**
     * Set whether the "Social Cost of Carbon" value should be computed by
     * running the model to 2300.
     *
     * @param active Whether special model runs are needed.
     */
    setSocialCostActive(active: boolean): void;
}

/**
 * High-level interface to the runnable En-ROADS model.  This is built on top
 * of `WasmModel` but presents a simplified interface that makes it easier
 * to work with the En-ROADS model in an application.
 *
 * When one or more input values are changed, this class will schedule a model
 * run to be completed as soon as possible.  When the model run has completed,
 * the output data will be saved (accessible using the `getSeriesForVar` function),
 * and `onOutputsChanged` is called to notify that new data is available.
 *
 * It is recommended to use `createAsyncModel` to create a `Model` instance that
 * runs the Wasm model asynchronously in a worker thread.  For less common use
 * cases, it is also possible to run the model synchronously on the JavaScript
 * thread, though this is not recommended (see `createModel` for more details).
 */
declare class Model {
    private readonly runner;
    private readonly refData;
    /** The model scheduler. */
    private readonly scheduler;
    /**
     * @hidden This is intended for use by `createModel` only.
     *
     * @param runner The model runner.
     * @param initialOutputs The `Outputs` instance from the initial reference run.
     * @param refData Reference data for a subset of variables.
     */
    constructor(runner: ModelRunner, initialOutputs: Outputs, refData: RefDataMap);
    /**
     * Run the model (asynchronously) with the inputs configured according to the
     * given scenario and capture the model outputs, which can be accessed later
     * using {@link ModelContext.getSeriesForVar}.
     *
     * Note that currently this method must only be called before the scheduler
     * has started (i.e., at application initialization time); it will throw an
     * error if called after the scheduler has started.
     *
     * @param refScenario The scenario that specifies the input values to be used
     * for the reference run and the outputs to be captured.
     * @return A promise that resolves when the reference run is complete.
     */
    addRefData(refScenario: RefScenario): Promise<void>;
    /**
     * Add a new context that holds a distinct set of model inputs and outputs.
     * These inputs and outputs are kept separate from those in other contexts,
     * which allows an application to use the same underlying model to run with
     * multiple I/O contexts.
     *
     * Note that contexts created before the first scheduled model run will
     * inherit the baseline/reference scenario outputs, but as a memory-saving
     * measure, contexts created after that first run will initially have output
     * values set to zero.
     *
     * @param inputs The input values, in the same order as in the spec file passed to `sde`.
     * If undefined, a map of `Input` instances will be initialized according to the input
     * specs in the default `Config`.
     */
    addContext(inputs?: Map<InputId, Input>): ModelContext;
}
/**
 * Create a `ModelRunner` instance that runs the En-ROADS wasm model on the JS thread.
 *
 * This is an asynchronous operation because it loads the wasm model asynchronously.
 */
declare function createDefaultModelRunner(): Promise<ModelRunner>;
/**
 * Create a `Model` instance that uses the given `ModelRunner`.
 *
 * This is an asynchronous operation because it performs an initial
 * model run to capture the reference/baseline data.
 *
 * @param runner The model runner.
 * @param externalData Additional external datasets that will be available for display in graphs.
 */
declare function createModel(runner: ModelRunner, externalData?: RefDataMap): Promise<Model>;
/**
 * Create a `ModelRunner` instance that runs the En-ROADS wasm model
 * asynchronously in a Web Worker (in a browser context) or in a worker
 * thread (in a Node.js context).
 *
 * This asynchronous runner reduces the burden on the browser's JavaScript
 * thread and keeps the user interface more responsive when moving sliders, etc.
 *
 * This is an asynchronous operation because it loads the wasm model asynchronously.
 */
declare function createAsyncModelRunner(): Promise<ModelRunner>;
/**
 * Create a `Model` instance that runs the En-ROADS wasm model asynchronously
 * in a Web Worker (in a browser context) or in a worker thread (in a Node.js
 * context).
 *
 * This is an asynchronous operation because it performs an initial
 * model run to capture the reference/baseline data.
 */
declare function createAsyncModel(): Promise<Model>;
/**
 * Create a mock model for testing purposes.
 *
 * @hidden
 */
declare function createMockModel(): Model;

/**
 * Create an `Outputs` instance that is initialized to hold output data
 * produced by the En-ROADS wasm model.
 */
declare function createDefaultOutputs(): Outputs;

export { type AssumptionGroupSpec, Config, type Input, type InputSpec, Model, ModelContext, type PolicyGroupSpec, type RefDataMap, type RefScenario, type SliderInput, type SocialCostOutputs, type SourceName, type SwitchInput, createAsyncModel, createAsyncModelRunner, createDefaultModelRunner, createDefaultOutputs, createMockModel, createModel, createModelInput, createSimpleInputValue, getDefaultConfig };
