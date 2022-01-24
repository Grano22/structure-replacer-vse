import ValidationResult from "../results/validationResult";
import StructureValidationException from "../throwable/StructureValidationException";
import { countChars } from "../tools/tools";
import { StructureValidationOptions } from "./AbstractStructureValidator";
import StringableStructureValidator from "./StringableStructureValidator";

export default class URLEncodedParamsStructureValidator extends StringableStructureValidator {
    public validationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        try {
            const pairs = structStr.split("&");
            if (pairs.length === 0) {
                throw new StructureValidationException(this, "Invalid URL encoded params");
            }
            for (const pair of pairs) {
                if (countChars(pair, '=') !== 1) {
                    throw new StructureValidationException(this, "Invalid URL no equal sign");
                }
                const [ key, value ] = pair.split("=");
                if (!this.#validateKey(key)) {
                    throw new StructureValidationException(this, "Invalid URL encoded key in param");
                }
                if (!this.#validateValue(value)) {
                    throw new StructureValidationException(this, "Invalid URL encoded value in param");
                }
            }
        } catch(err) {
            res.addExceptions(new StructureValidationException(this, "Invalid URL encoded params"));
        }
        return res;
    }
    
    public shortValidationModel(structStr: any, options: StructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        return res;
    }

    #validateKey(key : string) : boolean {
        return !(/!#$&-;=?-_a-z~]+/.test(key));
    }

    #validateValue(value : string) {
        return !(/!#$&-;=?-[]_a-z~]+/.test(value));
    }
}