"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PHPArray_1 = require("../libs/PHPArray/PHPArray");
const validationResult_1 = require("../results/validationResult");
const StructureValidationException_1 = require("../throwable/StructureValidationException");
const StringableStructureValidator_1 = require("./StringableStructureValidator");
class PHPArrayStructureValidator extends StringableStructureValidator_1.default {
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            PHPArray_1.default.parse(structStr);
        }
        catch (err) {
            console.error(err);
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid PHP Array"));
        }
        return res;
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            PHPArray_1.default.parse(structStr);
        }
        catch (err) {
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid PHP Array"));
        }
        return res;
    }
}
exports.default = PHPArrayStructureValidator;
//# sourceMappingURL=PHPArrayStructureValidator.js.map