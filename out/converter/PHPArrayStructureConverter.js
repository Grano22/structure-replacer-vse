"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PHPArray_1 = require("../libs/PHPArray/PHPArray");
const StructureConvertionException_1 = require("../throwable/StructureConvertionException");
const AbstractStructureConverter_1 = require("./AbstractStructureConverter");
class PHPArrayStructureConverter extends AbstractStructureConverter_1.default {
    toCurrLang(tgStruct) {
        try {
            const parsedObj = PHPArray_1.default.parse(tgStruct);
            return parsedObj;
        }
        catch (jsexc) {
            if (jsexc instanceof StructureConvertionException_1.default) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}
exports.default = PHPArrayStructureConverter;
//# sourceMappingURL=PHPArrayStructureConverter.js.map