export default class RegexpHelper {
    static createGroupFromCharacterRanges(charsRanges : string[]) : string {
        let finalGroup = '';
        for (const charRange of charsRanges) {
           finalGroup += this.createGroupFromCharacterRange(charRange);
        }
        return finalGroup;
    }

    static createGroupFromCharacterRange(charRange : string) : string {
        let finalGroup = '(';
        if (charRange.length > 1) {
            if(charRange.indexOf("-") === 1) {
                finalGroup += '[' + charRange + ']';
            } else if(charRange.indexOf(",") >= 1) {
                finalGroup += charRange.replace(",", "|");
            } else {
                finalGroup += charRange;
            }
        }
        return finalGroup + ')';
    }
}