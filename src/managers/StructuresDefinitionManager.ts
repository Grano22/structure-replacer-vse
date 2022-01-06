import AbstractStructureConverter from "../converter/AbstractStructureConverter";
import CurrentLangStructureConverter from "../converter/CurrentLangStructureConverter";
import CurrentLangStructurePartialConverter from "../converter/fromCurrLang/CurrentLangStructurePartialConverter";
import definitions from "../structures/definitions";
import StructureDefinition from "../structures/StructureDefinition";
import StructureDefinitionFactory from "../structures/StructureDefinitionFactory";
import Exception from "../throwable/Exception";
import StructureConvertionException from "../throwable/StructureConvertionException";
import capitalize from "../tools/tools";

export interface StructureDefinitionManagerSetup {
    allowedStructures?: string[];
    disallowedStructures?: string[];
    nativeLangConverters?: CurrentLangStructurePartialConverter[];
}

export default class StructuresDefinitionManager
{
    #preloadedDefinitions : Map<string, StructureDefinition> = new Map();
    #loadedDefinitions : Map<string, StructureDefinition> = new Map();
    #exceptions : Exception[] = [];
    #currLangConverter : CurrentLangStructureConverter;

    get errors() : Exception[] {
        return this.#exceptions;
    }

    get hasErrors() : boolean {
        return this.#exceptions.length > 0;
    }

    constructor(setup : StructureDefinitionManagerSetup) {
        this.#currLangConverter = new CurrentLangStructureConverter();
        this.#config(setup);
        this.#loadDefinitions(setup);
    }

    public convertTo(tgValue : string, fromType : string, toType : string, toOptions : Record<string, any> = {}) : string {
        try {
            if (!this.#loadedDefinitions.has(fromType)) {
                throw new StructureConvertionException("Type converter " + fromType + " do not exists");
            }
            const tgStruct = this.#loadedDefinitions.get(fromType), tgConverter = tgStruct?.converters["*"];
            if (typeof tgConverter === "undefined" || tgConverter === null) {
                throw new StructureConvertionException("Structure " + fromType + " do not have any converters");
            }
            if (!(tgConverter instanceof AbstractStructureConverter)) {
                throw new StructureConvertionException("Structure " + fromType + " converter is invaild");
            }
            console.log(toType, fromType, tgConverter);
            if (tgConverter.canConvert(toType)) {
                return (tgConverter.convert(tgValue, toType, toOptions) || '').toString();
            } else {
                if (!this.#currLangConverter.canConvert(toType)) {
                    throw new StructureConvertionException("Structure " + fromType + " cannot be converted from native lang to " + toType);
                }
                const currLangResult = tgConverter.convert(tgValue, 'currLang');
                return (this.#currLangConverter.convert(currLangResult, toType, toOptions) || '').toString();
            }
        } catch(err) {
            if(err instanceof StructureConvertionException) {
                this.#addException(err);
            }
            return tgValue;
        }
    }

    public getDefintionsNames() : string[] {
        const preloadedDefsNames = Array.from(this.#preloadedDefinitions.keys()) as string[];
        const loadedDefsNames = Array.from(this.#loadedDefinitions.keys()) as string[];
        return loadedDefsNames.concat(preloadedDefsNames);
    }

    public getCurrLangConverters() : string[] {
        return this.#currLangConverter.valueOf();
    }

    public getDefinition(id : string) : StructureDefinition | null {
        if(this.#preloadedDefinitions.has(id)) {
            return this.#preloadedDefinitions.get(id) || null;
        }
        if(this.#loadedDefinitions.has(id)) {
            return this.#loadedDefinitions.get(id) || null;
        }
        this.#addException(new Exception("Structure definition with id : " + id + " not found"));
        return null;
    }

    #config(setup : StructureDefinitionManagerSetup): void {
        const isValid = this.#validateConfig(setup);
        if (isValid) {
            this.#loadDefinitions(setup);
            if(Array.isArray(setup.nativeLangConverters)) {
                for (const partialConverter of setup.nativeLangConverters) {
                    this.#currLangConverter.registerConvertionMethod(partialConverter);
                }
            }
        } else {

        }
    }

    #validateConfig(setup : StructureDefinitionManagerSetup): boolean {
        try {
            if(!Array.isArray(setup.allowedStructures)) {
                throw new Exception("allowedStructures must be an array");
            }
            if(!Array.isArray(setup.disallowedStructures)) {
                throw new Exception("disallowedStructures must be an array");
            }
            for(const structID in setup.allowedStructures) {
                if(setup.disallowedStructures.indexOf(structID) > -1) {
                    throw new Exception("Disallowed structures ids for example : " + structID + " cannot be also allowed");
                }
            }
            return true;
        } catch(exc) {
            //this.#addException(exc);
            return false;
        }
    }

    #loadDefinitions(setup : StructureDefinitionManagerSetup): void {
        let definitionsToLoad = definitions.map(def => def.id || '') as string[];
        if(Array.isArray(setup.allowedStructures) && setup.allowedStructures.length > 0) {
            definitionsToLoad = definitionsToLoad.map(def=>(setup!.allowedStructures || []).includes(def) ? def : '');
        }
        for(const definitionInd in definitionsToLoad) {
            if(definitionsToLoad[definitionInd] !== '') {
                const tgDefinition = StructureDefinitionFactory.createFromObject(definitions[definitionInd]);
                this.#loadedDefinitions.set(definitionsToLoad[definitionInd], tgDefinition);
            }
        }
    }

    #addException(exc : Exception) {
        this.#exceptions.push(exc);
    }
}