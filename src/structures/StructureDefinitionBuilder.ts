import StructureDefinition from "./StructureDefinition";

export default class StructureDefinitionBuilder {
    name() {
        
    }

    build() {
        /*return new StructureDefinition({
            id: this.#createID(),
        });*/
    }

    #createID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}