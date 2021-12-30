import PHPArray from "../libs/PHPArray/PHPArray";
import ValidationResult from "../results/validationResult";
import validationResult from "../results/validationResult";
import StructureValidationException from "../throwable/StructureValidationException";
import { StructureValidationOptions } from "./AbstractStructureValidator";
import StringableStructureValidator from "./StringableStructureValidator";

export default class PHPArrayStructureValidator extends StringableStructureValidator {
    public validationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            PHPArray.parse(structStr);
        } catch(err) {
            console.error(err);
            res.addExceptions(new StructureValidationException(this, "Invalid PHP Array"));
        }
        return res;
    }

    public shortValidationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            PHPArray.parse(structStr);
        } catch(err) {
            res.addExceptions(new StructureValidationException(this, "Invalid PHP Array"));
        }
        return res;
    }
}