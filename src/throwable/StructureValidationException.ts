import AbstractStructureValidator from "../validators/AbstractStructureValidator";
import Exception from "./Exception";

export default class StructureValidationException extends Exception {
    #structID: string;

    constructor(tgStruct : AbstractStructureValidator<any>, message: string) {
        super(message);
        this.#structID = (tgStruct.constructor as any).name;
    }
}