import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";
//import * as YAML from 'yamljs';
import * as YAML from 'yaml';

export default class ToYMLStructureConverter extends CurrentLangStructurePartialConverter {
    readonly name = "YAML";

    public convert(objStruct: Record<string, any>, options: Record<string, any>) : string {
        try {
            const prepYAML = YAML.stringify(objStruct, {
                indent:2
            });
            return prepYAML;
        } catch (jsexc) {
            return "";
        }
    }
}