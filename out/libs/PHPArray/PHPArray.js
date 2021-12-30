"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PHPArray parser
 * Copyright (C) 2020 Glayzzle with grano22 changes (BSD3 License)
 *
 * @package PHPArray
 * @author Adrian Błasiak <grano22@outlook.com>
 * @author Rubens Mariuzzo
 */
const PHPParser = require("php-parser");
function parseKey(expr) {
    switch (expr.kind) {
        case 'string':
            return expr.value;
        case 'number':
            return parseInt(expr.value, 10);
        case 'boolean':
            return expr.value ? 1 : 0;
        default:
            throw new Error(`Unexpected PHP key: "${expr.kind}", details: ${JSON.stringify(expr)}`);
    }
}
function parseValue(expr) {
    switch (expr.kind) {
        case 'array':
            if (expr.items.length === 0) {
                return [];
            }
            var isKeyed = expr.items.every((item) => item.key !== null);
            var items = expr.items.map(parseValue);
            if (isKeyed) {
                items = items.reduce((acc, val) => Object.assign({}, acc, val), {});
            }
            return items;
        case 'entry':
            if (expr.key) {
                return { [parseKey(expr.key)]: parseValue(expr.value) };
            }
            return parseValue(expr.value);
        case 'string':
            return expr.value;
        case 'number':
            return parseInt(expr.value, 10);
        case 'boolean':
            return !!expr.value;
        default:
            throw new Error(`Unexpected PHP value: "${expr.kind}", details: ${JSON.stringify(expr)}`);
    }
}
class PHPArray {
    static parse(source) {
        //@ts-ignore
        const parser = new PHPParser({
            parser: { extractDoc: true },
            ast: { withPositions: true },
        });
        var ast = parser.parseEval(source);
        var array = ast.children[0].expression; //.find((child : PHPParser.ExpressionStatement) => child.kind === 'array');
        if (typeof array === "undefined" || array === null) {
            throw new Error("Detected expression is not array");
        }
        return parseValue(array);
    }
    static stringify(obj, options) {
        let phpArrayStr = '[\n';
        for (const objProp in obj) {
            const objKey = options.quoteType + objProp + options.quoteType;
            if (typeof obj[objProp] === "object") {
                phpArrayStr += " ".repeat(options.space) + objKey + " => " + this.stringify(obj[objProp], options) + "\n";
            }
            else {
                let objValue = obj[objProp];
                if (typeof objValue === "string") {
                    objValue = options.quoteType + objValue + options.quoteType;
                }
                phpArrayStr += " ".repeat(options.space) + objKey + " => " + objValue + "\n";
            }
        }
        return phpArrayStr + ']';
    }
}
exports.default = PHPArray;
PHPArray.singleQuote = "'";
PHPArray.doubleQuote = '"';
//# sourceMappingURL=PHPArray.js.map