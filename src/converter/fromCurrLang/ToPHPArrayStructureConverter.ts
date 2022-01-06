import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";
import PHPArray from "../../libs/PHPArray/PHPArray";

export default class ToPHPArrayStructureConverter extends CurrentLangStructurePartialConverter {
    readonly name = "PHPArray";

    public convert(objStruct: Record<string, any>, options: Record<string, any>) : string {
        options = Object.assign({
            newLines:true,
            quoteType: PHPArray.singleQuote,
            space:2
        }, options);
        try {
            const prepPHPArray = PHPArray.stringify(objStruct, options);
            return prepPHPArray;
        } catch(jsexc) {
            return "";
        }
    }
}