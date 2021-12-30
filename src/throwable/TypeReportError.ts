import ReportError from "./ReportError";

export default class TypeReportError extends ReportError {
    constructor(message : string) {
        super(-1, message);
    }

    static byComparing(targetValue : any, expectedType : any, customMessage : string = ''): TypeReportError
    {
        let baseTypeValue = Array.isArray(targetValue) ? 'array' : typeof targetValue, baseTypeExpected = Array.isArray(expectedType) ? 'array' : typeof expectedType;
        if (baseTypeValue === 'object')
        {   
            baseTypeValue = targetValue?.constructor?.name ?? baseTypeValue;
        }
        if (baseTypeExpected === 'object')
        {
            baseTypeExpected = expectedType?.constructor?.name ?? baseTypeExpected;
        }
        let compareMessage = customMessage ? customMessage.replace('%t', baseTypeValue).replace('%v', targetValue.toString()).replace('%e', expectedType) : `Given value ${targetValue.toString()} must be compatibile with type ${baseTypeExpected}, but given ${baseTypeValue}`;
        return new TypeReportError(compareMessage);
    }
}