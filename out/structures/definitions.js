"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JSONStructureConverter_1 = require("../converter/JSONStructureConverter");
const PHPArrayStructureConverter_1 = require("../converter/PHPArrayStructureConverter");
const YMLStructureConverter_1 = require("../converter/YMLStructureConverter");
const JSONStructureValidator_1 = require("../validators/JSONStructureValidator");
const PHPArrayStructureValidator_1 = require("../validators/PHPArrayStructureValidator");
const YMLStructureValidator_1 = require("../validators/YMLStructureValidator");
exports.default = [
    /*{
        id:'text-pair',
        name:'Text pair',
        languageContexts: [],
        languages: [],
        validators: [
            TextPairsStructureValidator
        ],
        converters: {
            '*': TextPairsStructureConverter
        },
    },*/
    {
        id: 'JSON',
        name: 'JSON',
        preferredMimes: ['application/json'],
        languageContexts: ['json'],
        languages: ['json', 'javascript'],
        validators: [
            JSONStructureValidator_1.default
        ],
        converters: {
            '*': JSONStructureConverter_1.default
        }
    },
    {
        id: 'YAML',
        name: 'YML',
        preferredMimes: ['application/x-yaml', 'text/yaml'],
        languageContexts: ['yml'],
        languages: ['yaml', 'yml'],
        validators: [
            YMLStructureValidator_1.default
        ],
        converters: {
            '*': YMLStructureConverter_1.default
        }
    },
    {
        id: 'PHPArray',
        name: 'PHP Array',
        preferredMimes: ['application/x-httpd-php'],
        languageContexts: ['php'],
        languages: ['php'],
        validators: [
            PHPArrayStructureValidator_1.default
        ],
        converters: {
            '*': PHPArrayStructureConverter_1.default
        }
    }
];
//# sourceMappingURL=definitions.js.map