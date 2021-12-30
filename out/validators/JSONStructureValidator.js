"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationResult_1 = require("../results/validationResult");
const StructureValidationException_1 = require("../throwable/StructureValidationException");
const StringableStructureValidator_1 = require("./StringableStructureValidator");
class JSONStructureValidator extends StringableStructureValidator_1.default {
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            JSON.parse(structStr);
        }
        catch (err) {
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid JSON"));
        }
        return res;
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        if (!/^\{\w+:\w+(,\w+:\w+)*\}$/.test(structStr)) {
            res.addExceptions();
        }
        return res;
    }
}
exports.default = JSONStructureValidator;
//# sourceMappingURL=JSONStructureValidator.js.map