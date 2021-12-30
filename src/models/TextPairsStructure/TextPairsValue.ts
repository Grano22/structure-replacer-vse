import TextPairsLine from "./TextPairsLine";

export default class TextPairsValue {
    #valueText = "";
    #valueCollection : TextPairsLine[] = [];

    assign(newValue : TextPairsLine[] | string) : void {
        if(typeof newValue === "string") {
            this.#valueText = newValue;
        } else if(Array.isArray(newValue)) {
            for(const newLine of newValue) {
                if(newLine instanceof TextPairsLine) {
                    this.#valueCollection.push(newLine);
                }
            }
        }
    }

    valueOf(): TextPairsLine[] | string {
        return this.#valueText!=="" ? this.#valueText : this.#valueCollection;
    }

    toString() : string {
        return this.#valueText!=="" ? this.#valueText : this.#valueCollection.map(v=>v.value.toString()).join("\n");
    }
}