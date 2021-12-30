import AbstractStructureConverter from "../converter/AbstractStructureConverter";
import AbstractStructureValidator from "../validators/AbstractStructureValidator";
import StructureDefinition from "./StructureDefinition";

export default class StructureDefinitionFactory {
    public static createFromObject(tgObject : Record<string , any>): StructureDefinition
    {
        const prepValidators : AbstractStructureValidator<any>[] = [], prepConverters : { [key: string] : AbstractStructureConverter } = {};
        
        for(const structValidator of tgObject.validators) {
            const val = new structValidator();
            prepValidators.push(val);
        }

        for(const structConverterType in tgObject.converters) {
            const conv = new tgObject.converters[structConverterType]();
            prepConverters[structConverterType] = conv;
        }

        const structDef = new StructureDefinition({
            uid: this.#createID(),
            id: tgObject.id || "",
            name: tgObject.name || "",
            description: tgObject.description || "",
            languages: tgObject.languages || [],
            languageContexts: tgObject.languageContexts || [],
            converters: prepConverters,
            validators: prepValidators,
            version: tgObject.version || .1,
        });

        return structDef;
    }

    static #createID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}