import { DOMParser } from "xmldom";
import ValidationResult from "../results/validationResult";
import StructureValidationException from "../throwable/StructureValidationException";
import { StructureValidationOptions } from "./AbstractStructureValidator";
import StringableStructureValidator from "./StringableStructureValidator";

export default class XMLStructureValidator extends StringableStructureValidator {
    public validationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            new DOMParser().parseFromString(structStr);
        } catch(err) {
            res.addExceptions(new StructureValidationException(this, "Invalid YML"));
        }
        return res;
    }

    public shortValidationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            new DOMParser().parseFromString(structStr);
        } catch(err) {
            res.addExceptions(new StructureValidationException(this, "Invalid YML"));
        }
        return res;
    }
}