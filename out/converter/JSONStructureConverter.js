"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StructureConvertionException_1 = require("../throwable/StructureConvertionException");
const AbstractStructureConverter_1 = require("./AbstractStructureConverter");
class JSONStructureConverter extends AbstractStructureConverter_1.default {
    toTextPairs(structure) {
        const langDataStruct = this.toCurrLang(structure);
        for (const langDataInd in langDataStruct) {
        }
    }
    toCurrLang(tgStruct) {
        try {
            const parsedObj = JSON.parse(tgStruct);
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
exports.default = JSONStructureConverter;
//# sourceMappingURL=JSONStructureConverter.js.map