import AbstractStructureConverter from "./AbstractStructureConverter";
import JSObject from "../libs/JSObject/JSObject";
import capitalize from "../tools/tools";
import CurrentLangStructurePartialConverter from "./fromCurrLang/CurrentLangStructurePartialConverter";
import Exception from "../throwable/Exception";

export default class CurrentLangStructureConverter extends AbstractStructureConverter {
    public registerConvertionMethod(tgPartialConverter : CurrentLangStructurePartialConverter): void
    {
        try {
            if(!(tgPartialConverter instanceof CurrentLangStructurePartialConverter)) {
                throw new Exception("Invalid partial converter providen in ");
            }
            Object.defineProperty(this, "to" + capitalize(tgPartialConverter.name), {
                value:(objStruct : Record<string, any>, options: Record<string, any>) => {
                    return tgPartialConverter.convert(objStruct, options);
                },
                configurable:false,
                writable:false,
                enumerable:true
            });
        } catch(exc) {
            //this.pathException(exc);
        }
    }

    public toJsObjectDeclaration(obj: Record<string, any>): string {
        try {
            const prepJSObjectDeclaration = JSObject.stringify(obj);
            return prepJSObjectDeclaration;
        } catch(jsexc) {
            return "";
        }
    }

    public toCurrLang(obj: Record<string, any>): Record<string, any> {
        return obj;
    }

    public valueOf() : string[] {
        const names = [];
        for(let methName in this) {
            if(methName.indexOf("to") === 0) {
                names.push(methName);
            }
        }
        return names;
    }
}