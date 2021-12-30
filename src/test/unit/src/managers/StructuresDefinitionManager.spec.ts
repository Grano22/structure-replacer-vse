import { assert } from 'chai';
import StructuresDefinitionManager from '../../../../managers/StructuresDefinitionManager';

describe('Unit test for structure defnition manager', ()=>{
    const expectedStructs = [
        'text-pair'
    ];

    const structDefMng = new StructuresDefinitionManager({
        allowedStructures: expectedStructs
    });

    it("Test if manage don't have errors", () => {
        assert.isFalse(structDefMng.hasErrors);
    });

    it('Test if given loaded structures is covered', () => {
        assert.deepEqual(expectedStructs, structDefMng.getDefintionsNames());
    });
});

