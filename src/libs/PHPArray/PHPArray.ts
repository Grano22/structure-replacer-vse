/**
 * PHPArray parser
 * Copyright (C) 2020 Glayzzle with grano22 changes (BSD3 License)
 * 
 * @package PHPArray
 * @author Adrian Błasiak <grano22@outlook.com>
 * @author Rubens Mariuzzo
 */
import * as PHPParser from 'php-parser';

function parseKey(expr : any) {
  switch(expr.kind) {
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

function parseValue(expr: any): any {
  switch(expr.kind) {
    case 'array':
      if (expr.items.length === 0) {
        return [];
      }
      var isKeyed = expr.items.every((item : any) => item.key !== null);
      var items = expr.items.map(parseValue);
      if (isKeyed) {
        items = items.reduce((acc : any, val : any) => Object.assign({}, acc, val), {});
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

export default class PHPArray {
    static readonly singleQuote = "'";
    static readonly doubleQuote = '"'; 

    public static parse(source : string) : Record<string, any> {
        //@ts-ignore
        const parser = new PHPParser({
            parser: { extractDoc: true },
            ast: { withPositions: true },
        });
        var ast = parser.parseEval(source);
        var array = ast.children[0].expression as PHPParser.Array; //.find((child : PHPParser.ExpressionStatement) => child.kind === 'array');
        if (typeof array === "undefined" || array === null) {
           throw new Error("Detected expression is not array");
        }
        return parseValue(array);
    }

    public static stringify(obj : Record<string, any>, options : Record<string, any>): string {
        options = Object.assign({ before:0, newLines:true, lastComma:true }, options);
        let phpArrayStr = '[';
        if (options.newLines) {
          phpArrayStr += "\n";
        }
        const objKeys = Object.keys(obj) as string[];
        for(const objKeyInd in objKeys) {
            const objProp = objKeys[objKeyInd];
            const objKey = options.quoteType + objProp + options.quoteType;
            if(typeof obj[objProp] === "object") {
                phpArrayStr += " ".repeat(options.before) + " ".repeat(options.space) + objKey + " => " + this.stringify(obj[objProp], { quoteType:options.quoteType, space:options.space, before:options.before + options.space, newLines:options.newLines, lastComma:options.lastComma });
                if (options.lastComma || +objKeyInd < objKeys.length - 1) {
                  phpArrayStr += ",";
                }
                if (options.newLines) {
                  phpArrayStr += "\n";
                }
            } else {
                let objValue = obj[objProp];
                if (typeof objValue === "string") {
                    objValue = options.quoteType + objValue + options.quoteType;
                }
                phpArrayStr += " ".repeat(options.before) + " ".repeat(options.space) + objKey + " => " + objValue; 
                if (options.lastComma || +objKeyInd < objKeys.length - 1) {
                  phpArrayStr += ",";
                }
                if(options.newLines) {
                    phpArrayStr += "\n";
                }
            }
        }
        return phpArrayStr + " ".repeat(options.before) + ']';
    }
}