import capitalize from "../tools/tools";

export default abstract class AbstractStructureSorter {
    [key: string]: any;

    public sort(obj: Record<string, any>, technique : string, by : string) : Record<string, any>
    {
        try {
            const sortBy = 'by' + capitalize(by);
            if (typeof this[sortBy] !== "function") {
                throw new Error("Unknown sort target: " + by);
            }
            return this[sortBy](obj, technique);
        } catch(err) {
            console.error(err);
            return obj;
        }
    }

    public sortAlphabetical(targetArray : string[]) : string[]
    {
        return targetArray.sort(function(a, b){
            if(a < b) { return -1; }
            if(a > b) { return 1; }
            return 0;
        });
    }
}