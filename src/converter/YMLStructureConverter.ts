import StructureConvertionException from "../throwable/StructureConvertionException";
//import * as YML from 'yamljs';
import * as YAML from 'yaml';

import AbstractStructureConverter from "./AbstractStructureConverter";

export default class YMLStructureConverter extends AbstractStructureConverter {
    toCurrLang(tgStruct : string) : Record<any, any> | null {
        try {
            const parsedObj = YAML.parse(tgStruct);
            return parsedObj;
        } catch (jsexc) {
            if(jsexc instanceof StructureConvertionException) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}