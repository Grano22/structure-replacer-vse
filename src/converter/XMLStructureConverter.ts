import StructureConvertionException from "../throwable/StructureConvertionException";
import AbstractStructureConverter from "./AbstractStructureConverter";
import { DOMParser } from 'xmldom';

export default class XMLStructureConverter extends AbstractStructureConverter {
    protected toCurrLang(tgStruct: any): Record<any, any> | null {
        try {
            const parsedObj = new DOMParser().parseFromString(tgStruct);
            return parsedObj;
        } catch (jsexc) {
            if(jsexc instanceof StructureConvertionException) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}