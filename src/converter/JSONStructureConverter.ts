import StructureConvertionException from "../throwable/StructureConvertionException";
import AbstractStructureConverter from "./AbstractStructureConverter";
import CurrentLangStructureConverter from "./CurrentLangStructureConverter";

export default class JSONStructureConverter extends AbstractStructureConverter {
    toTextPairs(structure: any): any {
        const langDataStruct = this.toCurrLang(structure);
        for (const langDataInd in langDataStruct) {
            
        }
    }

    toCurrLang(tgStruct : string) : Record<any, any> | null {
        try {
            const parsedObj = JSON.parse(tgStruct);
            return parsedObj;
        } catch (jsexc) {
            if(jsexc instanceof StructureConvertionException) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}