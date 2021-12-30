import AbstractStructureConverter from "./AbstractStructureConverter";
import * as YAML from 'yamljs';
import PHPArray from "../libs/PHPArray/PHPArray";
import JSObject from "../libs/JSObject/JSObject";

export default class CurrentLangStructureConverter extends AbstractStructureConverter {
    public toJSON(obj: Record<string, any>, options: Record<string, any> = {}): string {
        try {
            options = Object.assign({
                replacer:null,
                space:2
            }, options);
            const prepJSON = JSON.stringify(obj, options.replacer, options.space);
            return prepJSON;
        } catch (jsexc) {
            return "";
        }
    }

    public toYAML(obj: Record<string, any>): string {
        try {
            const prepYAML = YAML.stringify(obj, 1, 2);
            return prepYAML;
        } catch (jsexc) {
            return "";
        }
    }

    public toPHPArray(obj: Record<string, any>, options: Record<string, any> = {}): string {
        options = Object.assign({
            quoteType: PHPArray.singleQuote,
            space:2
        });
        try {
            const prepPHPArray = PHPArray.stringify(obj, options);
            return prepPHPArray;
        } catch(jsexc) {
            return "";
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

    toCurrLang(obj: Record<string, any>): Record<string, any> {
        return obj;
    }
}