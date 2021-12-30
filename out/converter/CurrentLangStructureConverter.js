"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractStructureConverter_1 = require("./AbstractStructureConverter");
const YAML = require("yamljs");
const PHPArray_1 = require("../libs/PHPArray/PHPArray");
const JSObject_1 = require("../libs/JSObject/JSObject");
class CurrentLangStructureConverter extends AbstractStructureConverter_1.default {
    toJSON(obj, options = {}) {
        try {
            options = Object.assign({
                replacer: null,
                space: 2
            }, options);
            const prepJSON = JSON.stringify(obj, options.replacer, options.space);
            return prepJSON;
        }
        catch (jsexc) {
            return "";
        }
    }
    toYAML(obj) {
        try {
            const prepYAML = YAML.stringify(obj, 1, 2);
            return prepYAML;
        }
        catch (jsexc) {
            return "";
        }
    }
    toPHPArray(obj, options = {}) {
        options = Object.assign({
            quoteType: PHPArray_1.default.singleQuote,
            space: 2
        });
        try {
            const prepPHPArray = PHPArray_1.default.stringify(obj, options);
            return prepPHPArray;
        }
        catch (jsexc) {
            return "";
        }
    }
    toJsObjectDeclaration(obj) {
        try {
            const prepJSObjectDeclaration = JSObject_1.default.stringify(obj);
            return prepJSObjectDeclaration;
        }
        catch (jsexc) {
            return "";
        }
    }
    toCurrLang(obj) {
        return obj;
    }
}
exports.default = CurrentLangStructureConverter;
//# sourceMappingURL=CurrentLangStructureConverter.js.map