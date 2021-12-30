"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StructureConvertionException_1 = require("../throwable/StructureConvertionException");
const YML = require("yamljs");
const AbstractStructureConverter_1 = require("./AbstractStructureConverter");
class YMLStructureConverter extends AbstractStructureConverter_1.default {
    toCurrLang(tgStruct) {
        try {
            const parsedObj = YML.parse(tgStruct);
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
exports.default = YMLStructureConverter;
//# sourceMappingURL=YMLStructureConverter.js.map