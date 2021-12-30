export default class PureStringValidationStrategy {
    #allowedChars: number[];
    #disalowdChars : number[];

    constructor(allowedChars: string[], disallowedChars: string[] = []) {
        this.#allowedChars = this.#prepareChars(allowedChars);
        this.#disalowdChars = this.#prepareChars(disallowedChars);
    }

    validString(tgStr : string): boolean {
        if (tgStr.length <= 0) {
            return false;
        }
        return true;
    }

    validChar(tgChar: string): boolean {
        if (tgChar.length <= 0 || tgChar.length > 1) {
            return false;
        }
        const tgCode = tgChar.charCodeAt(0);
        return this.#allowedChars.includes(tgCode) && !this.#disalowdChars.includes(tgCode);
    }

    #prepareChars(charsIndicator : string[]) : number[] {
        const outputNums : number[] = [];
        for (const charIndicator of charsIndicator)
        {
            if (charIndicator.length > 1) {
                if(charIndicator.indexOf("-") === 1) {
                    const charRange = charIndicator.split("-");
                    const fromCharCode = charRange[0].charCodeAt(0), toCharCode = charRange[1].charCodeAt(0);
                    for (let charInd = fromCharCode; charInd < toCharCode; charInd++)
                    {
                        if (!outputNums.includes(charInd))
                        {
                            outputNums.push(charInd);
                        }
                    }
                } else if(charIndicator.indexOf(",") >= 1) {
                    const charsBag = charIndicator.split(",");
                    for (let charItem of charsBag)
                    {
                        const charCode = charItem.charCodeAt(0); 
                        if (!outputNums.includes(charCode))
                        {
                            outputNums.push(charCode);
                        }
                    }
                }
            } else if(charIndicator.length > 0) {
                outputNums.push(charIndicator.charCodeAt(0));
            } else {
                continue;
            }
        }
        return outputNums;
    }
}