"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportError_1 = require("./ReportError");
class TypeReportError extends ReportError_1.default {
    constructor(message) {
        super(-1, message);
    }
    static byComparing(targetValue, expectedType, customMessage = '') {
        let baseTypeValue = Array.isArray(targetValue) ? 'array' : typeof targetValue, baseTypeExpected = Array.isArray(expectedType) ? 'array' : typeof expectedType;
        if (baseTypeValue === 'object') {
            baseTypeValue = targetValue?.constructor?.name ?? baseTypeValue;
        }
        if (baseTypeExpected === 'object') {
            baseTypeExpected = expectedType?.constructor?.name ?? baseTypeExpected;
        }
        let compareMessage = customMessage ? customMessage.replace('%t', baseTypeValue).replace('%v', targetValue.toString()).replace('%e', expectedType) : `Given value ${targetValue.toString()} must be compatibile with type ${baseTypeExpected}, but given ${baseTypeValue}`;
        return new TypeReportError(compareMessage);
    }
}
exports.default = TypeReportError;
//# sourceMappingURL=TypeReportError.js.map