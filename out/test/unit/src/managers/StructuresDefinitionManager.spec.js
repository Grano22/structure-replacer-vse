"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const StructuresDefinitionManager_1 = require("../../../../managers/StructuresDefinitionManager");
describe('Unit test for structure defnition manager', () => {
    const expectedStructs = [
        'text-pair'
    ];
    const structDefMng = new StructuresDefinitionManager_1.default({
        allowedStructures: expectedStructs
    });
    it("Test if manage don't have errors", () => {
        chai_1.assert.isFalse(structDefMng.hasErrors);
    });
    it('Test if given loaded structures is covered', () => {
        chai_1.assert.deepEqual(expectedStructs, structDefMng.getDefintionsNames());
    });
});
//# sourceMappingURL=StructuresDefinitionManager.spec.js.map