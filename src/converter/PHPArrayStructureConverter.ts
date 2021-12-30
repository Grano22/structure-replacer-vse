import PHPArray from "../libs/PHPArray/PHPArray";
import StructureConvertionException from "../throwable/StructureConvertionException";
import AbstractStructureConverter from "./AbstractStructureConverter";

export default class PHPArrayStructureConverter extends AbstractStructureConverter {
    public toCurrLang(tgStruct: any): Record<any, any> | null {
        try {
            const parsedObj = PHPArray.parse(tgStruct);
            return parsedObj;
        } catch(jsexc) {
            if(jsexc instanceof StructureConvertionException) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}