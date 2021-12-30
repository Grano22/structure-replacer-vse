import AbstractStructureValidator, { StructureValidationData, StructureValidationOptions } from "./AbstractStructureValidator";

interface StringableStructureValidationData extends StructureValidationData {
    positionMarkers : Map<string, { from : number; to : number; }>;
    invaildChars :  string[];
    lastPosition : number;
}

export interface StringableStructureValidationOptions extends StructureValidationOptions {
    trimSides : number;
}

export default abstract class StringableStructureValidator extends AbstractStructureValidator<StringableStructureValidationData> {    
    public getDefaultValidationData(): StringableStructureValidationData {
        return {
            positionMarkers: new Map(),
            invaildChars: [],
            lastPosition: -1
        };
    }
}