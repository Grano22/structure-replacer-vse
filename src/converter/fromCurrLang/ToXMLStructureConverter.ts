import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";
import { XMLSerializer } from "xmldom";
import XMLStruct from "../../libs/XMLStruct/XMLStruct";

export default class ToXMLStructureConverter extends CurrentLangStructurePartialConverter {
    readonly name = "XML";

    public convert(objStruct: any, options: Record<string, any>) : string {
        options = Object.assign({
            
        }, options);
        try {
            const prepPHPArray = XMLStruct.stringify(objStruct, options);
            return prepPHPArray;
        } catch(jsexc) {
            return "";
        }
    }
}