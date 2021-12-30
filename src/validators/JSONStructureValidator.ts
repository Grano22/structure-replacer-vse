import ValidationResult from "../results/validationResult";
import validationResult from "../results/validationResult";
import StructureValidationException from "../throwable/StructureValidationException";
import { StructureValidationOptions } from "./AbstractStructureValidator";
import StringableStructureValidator from "./StringableStructureValidator";

export default class JSONStructureValidator extends StringableStructureValidator {
    public validationModel(structStr: string, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            JSON.parse(structStr);
        } catch(err) {
            res.addExceptions(new StructureValidationException(this, "Invalid JSON"));
        }
        return res;
    }

    public shortValidationModel(structStr: string, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        if(!/^\{\w+:\w+(,\w+:\w+)*\}$/.test(structStr)) {
            res.addExceptions();
        }
        return res;
    }
}