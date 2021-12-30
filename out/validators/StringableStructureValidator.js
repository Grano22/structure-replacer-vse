"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractStructureValidator_1 = require("./AbstractStructureValidator");
class StringableStructureValidator extends AbstractStructureValidator_1.default {
    getDefaultValidationData() {
        return {
            positionMarkers: new Map(),
            invaildChars: [],
            lastPosition: -1
        };
    }
}
exports.default = StringableStructureValidator;
//# sourceMappingURL=StringableStructureValidator.js.map