"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextPairsStructureParser_1 = require("../parsers/TextPairsStructureParser");
const StructureConvertionException_1 = require("../throwable/StructureConvertionException");
const AbstractStructureConverter_1 = require("./AbstractStructureConverter");
class TextPairsStructureConverter extends AbstractStructureConverter_1.default {
    toJson() {
    }
    toCurrLang(tgStruct) {
        try {
            const textStrucuturparser = new TextPairsStructureParser_1.default();
            const tgStructModel = textStrucuturparser.parse(tgStruct, {});
            const finalObj = {};
            for (const { key, value } of tgStructModel.lines) {
                finalObj[key] = value;
            }
            return finalObj;
        }
        catch (jsexc) {
            if (jsexc instanceof StructureConvertionException_1.default) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}
exports.default = TextPairsStructureConverter;
//# sourceMappingURL=TextPairsStructureConverter.js.map