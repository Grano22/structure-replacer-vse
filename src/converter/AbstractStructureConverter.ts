import Structure from "../structures/Structure";
import Exception from "../throwable/Exception";
import StructureConvertionException from "../throwable/StructureConvertionException";
import Throwable from "../throwable/Throwable";
import capitalize from "../tools/tools";

export default abstract class AbstractStructureConverter {
    [key: string]: any;

    #exceptions : StructureConvertionException[] = [];

    constructor(converterConfig : any = {}) {
        
    }

    protected abstract toCurrLang(tgStruct : any): Record<any, any> | null;

    public canConvert(tgStructID : string) : boolean {
        return typeof this['to' + capitalize(tgStructID)] === 'function';
    }

    public convert(structure: any, tgStructID : string, options : Record<string, any> = {}): Structure | null {
        try {
            const tgMethodName = tgStructID;
            if(!this.canConvert(tgStructID)) {
                throw new Exception("Convertion type " + tgMethodName + " not found in " + this.constructor.name);
            }
            return this['to' + capitalize(tgMethodName)](structure, options);
        } catch (exc) {
            return null;
        }
    };

    public pathException(exc : StructureConvertionException): void {
        this.#exceptions.push(exc);
    }
}