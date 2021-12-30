import Clonable from "../common/Clonable";
import ValidationResult from "../results/validationResult";
import Exception from "../throwable/Exception";

export interface StructureValidationSnapshoot {
    startDatetime: Date;
    endDatetime: Date;
    validatorRef: number;
    result: ValidationResult;
    data: StructureValidationData | null
}

export interface StructureValidationOptions {

}

export interface StructureValidationData {
    [key : string] : any;
}

export default abstract class AbstractStructureValidator<ValidationData extends StructureValidationData> 
implements Clonable<AbstractStructureValidator<any>> {
    static activeValidators : AbstractStructureValidator<any>[] = [];
    static readonly ERROR_MESSAGES = {

    };

    #id = -1;
    #snapshoots : StructureValidationSnapshoot[] = [];
    //#currentSnapshoot : StructureValidationSnapshoot | null = null;
    #validationData : ValidationData | null = null;

    static getLastID() {
        return this.activeValidators.length - 1;
    }

    get id() : number
    {
        return this.#id;
    }

    constructor() {
        const validatorOrigin = (this.constructor as typeof AbstractStructureValidator);
        validatorOrigin.activeValidators.push(this);
        this.#id = validatorOrigin.getLastID();
    }

    public abstract validationModel(structStr: any, options : StructureValidationOptions): ValidationResult;
    public abstract shortValidationModel(structStr : any, options : StructureValidationOptions) : ValidationResult;
    public abstract getDefaultValidationData() : ValidationData;

    public validate(tgStruct : any, options : StructureValidationOptions = {}) : ValidationResult {
        this.#validationData = this.getDefaultValidationData();
        const startDatetime = new Date();
        const res = this.validationModel(tgStruct, options);
        const endDatetime = new Date();
        this.#snapshoots.push({
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            validatorRef:this.#id,
            result:res,
            data:this.getValidationAllData()
        });
        res.setValidationDuration(Math.abs(endDatetime.getTime() - startDatetime.getTime()));
        return res;
    }

    public shortValidate(tgStruct : any, options : StructuredSerializeOptions = {}) : ValidationResult {
        this.#validationData = this.getDefaultValidationData();
        const startDatetime = new Date();
        const res = this.shortValidationModel(tgStruct, options);
        const endDatetime = new Date();
        this.#snapshoots.push({
            startDatetime: startDatetime,
            endDatetime:endDatetime,
            validatorRef:this.#id,
            result:res,
            data:this.getValidationAllData()
        });
        res.setValidationDuration(Math.abs(endDatetime.getTime() - startDatetime.getTime()));
        return res;
    }

    protected getValidationData(optionName : string): any
    {
        return this.#validationData ? this.#validationData[optionName] || null : null;
    }

    protected getValidationAllData(): ValidationData | null
    {
        return this.#validationData;
    }

    protected addValidationData(optionName : string, optionValue : any, optionKey = ''): void
    {
        try {
            if(this.#validationData === null) {
                throw new Exception("Validation data not initialised");
            }
            if(typeof this.#validationData[optionName] === "undefined") {
                throw new Exception("Validation option with name " + optionName + " is not defined");
            }
            if(Array.isArray(this.#validationData[optionName])) {
                this.#validationData[optionName].push(optionValue);
            } else if(this.#validationData[optionName] instanceof Map || this.#validationData[optionName] instanceof Set) {
                this.#validationData[optionName].set(optionKey, optionValue);
            } else if(typeof this.#validationData === "object") {
                this.#validationData[optionName][optionKey] = optionValue;
            } else {
                throw new Exception("Type is not a collection");
            }
        } catch(exc) {

        }
    }

    protected updateValidationData(optionName : string, optionValue : any, optionKey = ''): void
    {
        try {
            if(this.#validationData === null) {
                throw new Exception("Validation data not initialised");
            }
            if(typeof this.#validationData[optionName] === "undefined") {
                throw new Exception("Validation option with name " + optionName + " is not defined");
            }
            if(Array.isArray(this.#validationData[optionName])) {
                this.#validationData[optionName].push(optionValue);
            } else if(this.#validationData[optionName] instanceof Map || this.#validationData[optionName] instanceof Set) {
                this.#validationData[optionName].set(optionKey, optionValue);
            } else if(typeof this.#validationData === "object") {
                this.#validationData[optionName][optionKey] = optionValue;
            } else {
                throw new Exception("Type is not a collection");
            }
        } catch(exc) {
            
        }
    }

    protected setValidationData(optionName : string, optionCB : any): void
    {
        try {
            if (this.#validationData === null) {
                throw new Exception("Validation data is not initialized");
            }
            if (typeof this.#validationData[optionName] === "undefined") {
                throw new Exception("Validation option " + optionName + " do not exists");
            }
            if (typeof optionCB !== "function") {
                throw new Exception("Callback expected");
            }
            const optionValue = optionCB(this.#validationData[optionName]);
            if (typeof this.#validationData[optionName] !== typeof optionValue) {
                throw new Exception("Validation option type is incorect");
            }
            //@ts-ignore
            this.#validationData[optionName] = optionValue as ValidationData[keyof ValidationData];
        } catch(exc) {
            console.error(exc);
        }
    }

    #clearValidation() {
        this.#validationData = null;
    }

    public clone(): AbstractStructureValidator<any> {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    public cloneEmpty(): AbstractStructureValidator<any> {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, {});
    }
}