import AbstractStructureSorter from "./AbstractStrutrueSorter";
import capitalize from "../tools/tools";

export default class CurrentLangStructureSorter extends AbstractStructureSorter {
    public byKeys(obj: Record<string, any>, technique : string) : Record<string, any>
    {
        const sortTechnique = 'sort' + capitalize(technique);
        if (typeof this[sortTechnique] !== "function") {
            throw new Error("Unknown sort technique: " + technique);
        }
        const objKeys = Object.keys(obj);
        const sortedKeys = this[sortTechnique](objKeys), sortedObj : Record<string, any> = {};
        for(const sortedKey of sortedKeys) {
            sortedObj[sortedKey] = obj[sortedKey];
        }
        return sortedObj;
    }
}