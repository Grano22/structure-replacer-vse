import StructuresDefinitionManager from "../managers/StructuresDefinitionManager";

export default class DataReplacerExtensionFasade {
    #structDefManager : StructuresDefinitionManager;
    #settings : ExtensionSettings

    constructor(structDefManager: StructuresDefinitionManager, settings : ExtensionSettings) {
        this.#structDefManager = structDefManager;
        this.#settings = settings;
    }

    public getDefintionsNames() : string[] {
        return this.#structDefManager.getDefintionsNames();
    }

    public getCurrLangConverters() : string[] {
        return this.#structDefManager.getCurrLangConverters();
    }
}