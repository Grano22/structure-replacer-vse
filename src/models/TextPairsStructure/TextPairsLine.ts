import TextPairsValue from "./TextPairsValue";

export default class TextPairsLine {
    #key: string = "";
    #value: TextPairsValue = new TextPairsValue;
    #separator = "-";

    get key(): string {
        return this.#key;
    }

    get value(): TextPairsValue {
        return this.#value;
    }

    constructor(key = "", value = "") {
        this.#key = key;
        this.#value.assign(value);
    }

    setKey(key: string): void {
        this.#key = key;
    }

    setValue(value: TextPairsLine[] | string): void {
        this.#value.assign(value);
    }

    toString(): string {
        return `${this.#key}${this.#separator}${this.#value.toString()}`;
    }
}