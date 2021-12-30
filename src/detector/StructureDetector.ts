import ValidationResult from "../results/validationResult";
import definitions, { StructureDefinitionEntry } from "../structures/definitions";
import StructureDetectionStrategy from "./StructureDetectionStrategy";
import StructureDefinitionFactory from '../structures/StructureDefinitionFactory';

interface FileMeta {
    mimeType: string;
}

interface StructureMeta {
    language?: string;
    fileDetails?: FileMeta;
    languageContext?: any;
}

export default class StructureDetector {
    #tgValue = "";
    #language = "";
    #languageContext = "";
    #fileDetails : FileMeta | null  = null;
    #strategies : StructureDetectionStrategy;
    #reason = '';

    #userSettings : ExtensionSettings;

    get reason() {
        return this.#reason;
    }

    constructor(extensionSettings : ExtensionSettings) {
        this.#userSettings = extensionSettings;
        this.#strategies = new StructureDetectionStrategy();
    }

    public detect(structValue : string, structMeta : StructureMeta) : string {
        this.#tgValue = structValue;
        this.#configureMeta(structMeta);
        const potentiallyStructs : Array<StructureDefinitionEntry[]> = [];
        for(let defInd in definitions) {
            const structDefInfo = definitions[defInd];
            const qualificationPriority = this.#matchQualifications(structDefInfo);
            const structDef = StructureDefinitionFactory.createFromObject(structDefInfo);
            if (qualificationPriority >= 0) {
                if (!Array.isArray(potentiallyStructs[qualificationPriority])) {
                    potentiallyStructs[qualificationPriority] = [];
                }
                potentiallyStructs[qualificationPriority].push(structDef);
            }
        }
        if(potentiallyStructs.length === 0) {
            this.#reason = "Not found potentially structs";
            return "";
        }
        for(const structCollInd in potentiallyStructs) {
            for (const structInd in potentiallyStructs[structCollInd]) {
                const tgStructDef = potentiallyStructs[structCollInd][structInd];
                for (const validatorDef of tgStructDef.validators) {
                    const validationRes = validatorDef.validate(structValue) as ValidationResult;
                    if (validationRes.passed) {
                        return tgStructDef.id;
                    }
                }
            }
        }
        this.#reason = "No struct matched";
        return "";
    }

    #matchQualifications(structDef : any) : number {
        if(this.#language === "" && this.#languageContext === "") {
            return -1;
        }
        if(structDef.languages.length === 0) {
            return -1;
        }
        const langIndex = structDef.languages.indexOf(this.#language);
        const langContextIndex = structDef.languageContexts.indexOf(this.#languageContext);
        const mimeIndex = 
            typeof this.#fileDetails?.mimeType === "string" ? structDef.preferredMimes.indexOf(this.#fileDetails.mimeType) : -1;

        let totalQualification = -1;

        if(this.#userSettings?.validateUncoveredStructures) {
            totalQualification += 1;
        }
        if(langIndex <= -1 && langContextIndex <= -1 && mimeIndex <= -1) {
            return totalQualification;
        }
        if(langIndex > -1) {
            totalQualification += (structDef.languages.length - langIndex) * 2;
        }
        if(langContextIndex > -1) {
            totalQualification += langContextIndex;
        }
        if(mimeIndex > -1) {
            totalQualification += mimeIndex;
        }
        return totalQualification;
    }

    #configureMeta(structMeta : StructureMeta) : void {
        if(typeof structMeta.language === "string") {
            this.#language = structMeta.language;
        } else {
            this.#language = "";
        }
        if(typeof structMeta.languageContext === "string") {
            this.#languageContext = structMeta.languageContext;
        } else {
            this.#languageContext = "";
        }
        if(typeof structMeta.fileDetails === "object") {
            this.#fileDetails = structMeta.fileDetails;
        } else {
            this.#fileDetails = null;
        }
    }
}