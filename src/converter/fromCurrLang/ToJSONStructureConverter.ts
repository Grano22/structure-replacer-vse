import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";

export default class ToJSONStructureConverter extends CurrentLangStructurePartialConverter {
    readonly name = "JSON";

    public convert(obj: Record<string, any>, options: Record<string, any> = {}) : string {
        try {
            options = Object.assign({
                replacer:null,
                space:2
            }, options);
            const prepJSON = JSON.stringify(obj, options.replacer, options.space);
            return prepJSON;
        } catch (jsexc) {
            return "";
        }
    }
}