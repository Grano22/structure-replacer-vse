import * as YAML from 'yamljs';
import ValidationResult from "../results/validationResult";
import validationResult from "../results/validationResult";
import StructureValidationException from '../throwable/StructureValidationException';
import { StructureValidationOptions } from "./AbstractStructureValidator";
import StringableStructureValidator from "./StringableStructureValidator";

export default class YMLStructureValidator extends StringableStructureValidator {
    public validationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            YAML.parse(structStr);
        } catch(err) {
            res.addExceptions(new StructureValidationException(this, "Invalid YML"));
        }
        return res;
    }

    public shortValidationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        return res;
    }
}