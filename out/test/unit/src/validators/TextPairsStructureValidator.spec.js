"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const TextPairsStructureValidator_1 = require("../../../../validators/TextPairsStructureValidator");
describe.skip('Test validation parts in TextPairStructureValidator', () => {
    const textPairStructureValidator = new TextPairsStructureValidator_1.default();
    const positiveValidationStruct = `
        AdamekXD - ma to
        Szykowne - jest
        Towiele - jest
    `;
    it('Expect positive validation', async () => {
        // Assign
        // Act
        const validationResult = textPairStructureValidator.validate(positiveValidationStruct);
        // Assertion
        chai_1.assert.isTrue(validationResult.isValid);
    });
    it('Expect negative validation because of missing value', async () => {
        // Assign
        const negativeValidationStruct = `
            Rusek - ToJest
            $ada
            Rikko-
        `;
        // Act
        const validationResult = textPairStructureValidator.validate(negativeValidationStruct);
        // Assertion
        chai_1.assert.isFalse(validationResult.isValid);
    });
    it("Detect invaild character when not trimed", async () => {
        // Assign
        // Act
        const validationResult = textPairStructureValidator.validate(positiveValidationStruct, false);
        const tgInvaildChars = validationResult.getParam("invalidChars");
        // Assertion
        chai_1.assert.deepEqual(["\n"], tgInvaildChars);
    });
    it("Test if have valid markes", async () => {
        // Assign
        const expectedMarkers = {
            key: {
                from: 0,
                to: 8
            },
            separator: {
                from: 8,
                to: 9
            },
            lineSeparator: {
                from: 16,
                to: 16
            },
            value: {
                from: 10,
                to: 15
            }
        };
        // Act
        const validationResult = textPairStructureValidator.validate(positiveValidationStruct);
        const tgMarkers = validationResult.getParam("markers");
        // Assertion
        chai_1.assert.deepEqual(expectedMarkers, tgMarkers);
    });
});
//# sourceMappingURL=TextPairsStructureValidator.spec.js.map