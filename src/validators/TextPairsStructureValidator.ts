import RegexpHelper from "../helpers/RegexpHelper";
import ValidationResult from "../results/validationResult";
import Exception from "../throwable/Exception";
import StructureValidationException from "../throwable/StructureValidationException";
import TypeReportError from "../throwable/TypeReportError";
import { StructureValidationOptions } from "./AbstractStructureValidator";
import PureStringValidationStrategy from "./strategies/PureStringValidationStrategy";
import StringableStructureValidator, { StringableStructureValidationOptions } from "./StringableStructureValidator";

interface TextPairsStructureValidationOptions extends StringableStructureValidationOptions {
    keyChars: string[];
    separatorChars: string[];
    valueChars: string[];
    lineSeperatorChars: string[];
}

export default class TextPairsStructureValidator extends StringableStructureValidator {
    public getInvaildChars(markerName : string) : string[]
    {
        return this.getValidationData("invaildChars");
    }

    public shortValidationModel(structStr: any, options: TextPairsStructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        new RegExp(
            RegexpHelper.createGroupFromCharacterRanges(options.keyChars) + 
            RegexpHelper.createGroupFromCharacterRanges(options.separatorChars) +
            RegexpHelper.createGroupFromCharacterRanges(options.valueChars) +
            RegexpHelper.createGroupFromCharacterRanges(options.lineSeperatorChars)
        ).test(structStr);
        return res;
    }

    public validationModel(structStr: string, options : TextPairsStructureValidationOptions): ValidationResult {
        const res = new ValidationResult();
        if(options.trimSides) {
            structStr = structStr.trimLeft().trimRight();
        }
        try {
            const hasKey = this.#validateKey(structStr);
            if (!hasKey) {
                throw new StructureValidationException(this, "Key is not valid");
            }
            const hasSeparator = this.#validateSeparator(structStr);
            if(!hasSeparator) {
                throw new StructureValidationException(this, "Separator is not valid");
            }
            const hasValue = this.#validateValue(structStr);
            if (!hasValue) {
                throw new StructureValidationException(this, "Value is not valid");
            }
            const hasLineSeparator = this.#validateLineSeparator(structStr);
            if (!hasLineSeparator) {
                throw new StructureValidationException(this, "Line separator is not valid");
            }
            res.setParam("markers", this.getValidationData("positionMarkers"));
        } catch(err) {
            if(err instanceof StructureValidationException) {
                res.addExceptions(err);
            } else {
                res.addExceptions(TypeReportError.byComparing(err, StructureValidationException));
            }
        }
        return res;
    }

    #validateKey(tgStr : string) : boolean {
        return this.#validateByRange(tgStr, ["a-z", "A-Z", "0-9", "_"], "key");
    }

    #validateValue(tgStr : string) : boolean {
        return this.#validateByRange(tgStr, ["a-z", "A-Z", "0-9", "_"], "value");
    }

    #validateSeparator(tgStr : string) : boolean {
        return this.#validateByRange(tgStr, ["-"], "separator");
    }

    #validateLineSeparator(tgStr : string) : boolean {
        return this.#validateByRange(tgStr, ["\n"], "lineSeparator");
    }

    #validateByRange(tgStr : string, allowChars : string[], markerName : string) : boolean {
        const strValidator = new PureStringValidationStrategy(allowChars), lastPos = this.getValidationData("lastPosition");
        for (let chr = lastPos; chr < tgStr.length; chr++) {
            if (!strValidator.validChar(tgStr[chr])) {
                this.addValidationData("positionMarkers", { from:lastPos, to:chr }, markerName);
                if (chr === lastPos) {
                    return false;
                }
                this.addValidationData("invaildChars", tgStr[chr]);
                this.setValidationData("lastPosition", ()=>chr);
                return true;
            }
        }
        return true;
    }
}
