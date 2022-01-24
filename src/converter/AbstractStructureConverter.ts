import Structure from "../structures/Structure";
import Exception from "../throwable/Exception";
import StructureConvertionException from "../throwable/StructureConvertionException";
import Throwable from "../throwable/Throwable";
import capitalize from "../tools/tools";

export default abstract class AbstractStructureConverter {
    [key: string]: any;

    #exceptions : Map<string, StructureConvertionException[]> = new Map();

    get exceptions() : StructureConvertionException[]
    {
        const exceptions = this.#exceptions.get('universal');
        return Array.isArray(exceptions) ? exceptions : [];
    }

    get lastException() : StructureConvertionException | null
    {
        const exceptions = this.#exceptions.get('universal');
        return Array.isArray(exceptions) ? (exceptions[exceptions.length - 1] || null) : null;
    }

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
                throw new StructureConvertionException("Convertion type " + tgMethodName + " not found in " + this.constructor.name);
            }
            return this['to' + capitalize(tgMethodName)](structure, options);
        } catch (exc) {
            if(exc instanceof StructureConvertionException) {
                this.pathException(exc);
            }
            return null;
        }
    };

    public pathException(exc : StructureConvertionException, converterTarget : string = 'universal'): void {
        if(!this.#exceptions.has(converterTarget))
        {
            this.#exceptions.set(converterTarget, []);
        }
        this.#exceptions?.get(converterTarget)?.push(exc);
    }
}