"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegexpHelper {
    static createGroupFromCharacterRanges(charsRanges) {
        let finalGroup = '';
        for (const charRange of charsRanges) {
            finalGroup += this.createGroupFromCharacterRange(charRange);
        }
        return finalGroup;
    }
    static createGroupFromCharacterRange(charRange) {
        let finalGroup = '(';
        if (charRange.length > 1) {
            if (charRange.indexOf("-") === 1) {
                finalGroup += '[' + charRange + ']';
            }
            else if (charRange.indexOf(",") >= 1) {
                finalGroup += charRange.replace(",", "|");
            }
            else {
                finalGroup += charRange;
            }
        }
        return finalGroup + ')';
    }
}
exports.default = RegexpHelper;
//# sourceMappingURL=RegexpHelper.js.map