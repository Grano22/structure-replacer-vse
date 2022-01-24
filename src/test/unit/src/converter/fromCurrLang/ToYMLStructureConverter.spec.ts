import { assert, expect } from 'chai';
import ToYMLStructureConverter from '../../../../../converter/fromCurrLang/ToYMLStructureConverter';

describe("Test partial converter from current lang to YAML", () => {
    it("Test if result is a expected yaml structure", () => {
        // Arrange
        const exampleObject = {
            "simpleKey": "simpleValue",
            "listKey": [
                "listItem1",
                "listItem2"
            ],
            "nestedKey": {
                "nestedKey1": "nestedValue1",
                "nestedKey2": "nestedValue2"
            }
        };
        const converter = new ToYMLStructureConverter();

        // Act
        const result = converter.convert(exampleObject, {});

        // Assert
        assert.isString(result);
        expect(
            `simpleKey: simpleValue
listKey:
  - listItem1
  - listItem2
nestedKey:
  nestedKey1: nestedValue1
  nestedKey2: nestedValue2`,
        ).to.equal(result);
    });
});