"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yamljs");
const validationResult_1 = require("../results/validationResult");
const StructureValidationException_1 = require("../throwable/StructureValidationException");
const StringableStructureValidator_1 = require("./StringableStructureValidator");
class YMLStructureValidator extends StringableStructureValidator_1.default {
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            YAML.parse(structStr);
        }
        catch (err) {
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid YML"));
        }
        return res;
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        return res;
    }
}
exports.default = YMLStructureValidator;
//# sourceMappingURL=YMLStructureValidator.js.map