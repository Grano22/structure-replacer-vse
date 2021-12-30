"use strict";
var _StructureDefinitionBuilder_instances, _StructureDefinitionBuilder_createID;
Object.defineProperty(exports, "__esModule", { value: true });
class StructureDefinitionBuilder {
    constructor() {
        _StructureDefinitionBuilder_instances.add(this);
    }
    name() {
    }
    build() {
        /*return new StructureDefinition({
            id: this.#createID(),
        });*/
    }
}
exports.default = StructureDefinitionBuilder;
_StructureDefinitionBuilder_instances = new WeakSet(), _StructureDefinitionBuilder_createID = function _StructureDefinitionBuilder_createID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
//# sourceMappingURL=StructureDefinitionBuilder.js.map