import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";
import * as YAML from 'yamljs';

export default class ToYMLStructureConverter extends CurrentLangStructurePartialConverter {
    readonly name = "YML";

    public convert(objStruct: Record<string, any>, options: Record<string, any>) : string {
        try {
            const prepYAML = YAML.stringify(objStruct, 1, 2);
            return prepYAML;
        } catch (jsexc) {
            return "";
        }
    }
}