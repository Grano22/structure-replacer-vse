import TextPairsStructureParser from "../parsers/TextPairsStructureParser";
import StructureConvertionException from "../throwable/StructureConvertionException";
import AbstractStructureConverter from "./AbstractStructureConverter";

export default class TextPairsStructureConverter extends AbstractStructureConverter {
    public toJson() {

    }

    protected toCurrLang(tgStruct : string) : Record<any,any> | null {
        try {
            const textStrucuturparser = new TextPairsStructureParser();
            const tgStructModel = textStrucuturparser.parse(tgStruct, {});
            const finalObj : Record<string, any> = {};
            for (const { key, value } of tgStructModel.lines) {
                finalObj[key] = value;
            }
            return finalObj;
        } catch(jsexc) {
            if(jsexc instanceof StructureConvertionException) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}