import { assert } from 'chai';
import YMLStructureConverter from '../../../../converter/YMLStructureConverter';

describe("Test YAML converter", () => {
    it("Test if yaml structure can be converter to native lang", () => {
        // Arrange
        const exampleYMLStruct = `simpleKey: simpleValue,
        listKey:
            - listItem1
            - listItem2,
        nestedKey:
            nestedKey1: nestedValue1
            nestedKey2: nestedValue2`;
        const converter = new YMLStructureConverter();

        // Act
        const result = converter.toCurrLang(exampleYMLStruct);

        // Arrange
        assert.isObject(result);
        assert.equal(
            {
                "simpleKey": "simpleValue",
                "listKey": [
                    "listItem1",
                    "listItem2"
                ],
                "nestedKey": {
                    "nestedKey1": "nestedValue1",
                    "nestedKey2": "nestedValue2"
                }
            },
            result
        );
    });
});