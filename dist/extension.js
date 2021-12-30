/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StructureDetector_instances, _StructureDetector_tgValue, _StructureDetector_language, _StructureDetector_languageContext, _StructureDetector_fileDetails, _StructureDetector_strategies, _StructureDetector_reason, _StructureDetector_userSettings, _StructureDetector_matchQualifications, _StructureDetector_configureMeta;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(3);
const StructureDetectionStrategy_1 = __webpack_require__(165);
const StructureDefinitionFactory_1 = __webpack_require__(166);
class StructureDetector {
    constructor(extensionSettings) {
        _StructureDetector_instances.add(this);
        _StructureDetector_tgValue.set(this, "");
        _StructureDetector_language.set(this, "");
        _StructureDetector_languageContext.set(this, "");
        _StructureDetector_fileDetails.set(this, null);
        _StructureDetector_strategies.set(this, void 0);
        _StructureDetector_reason.set(this, '');
        _StructureDetector_userSettings.set(this, void 0);
        __classPrivateFieldSet(this, _StructureDetector_userSettings, extensionSettings, "f");
        __classPrivateFieldSet(this, _StructureDetector_strategies, new StructureDetectionStrategy_1.default(), "f");
    }
    get reason() {
        return __classPrivateFieldGet(this, _StructureDetector_reason, "f");
    }
    detect(structValue, structMeta) {
        __classPrivateFieldSet(this, _StructureDetector_tgValue, structValue, "f");
        __classPrivateFieldGet(this, _StructureDetector_instances, "m", _StructureDetector_configureMeta).call(this, structMeta);
        const potentiallyStructs = [];
        for (let defInd in definitions_1.default) {
            const structDefInfo = definitions_1.default[defInd];
            const qualificationPriority = __classPrivateFieldGet(this, _StructureDetector_instances, "m", _StructureDetector_matchQualifications).call(this, structDefInfo);
            const structDef = StructureDefinitionFactory_1.default.createFromObject(structDefInfo);
            if (qualificationPriority >= 0) {
                if (!Array.isArray(potentiallyStructs[qualificationPriority])) {
                    potentiallyStructs[qualificationPriority] = [];
                }
                potentiallyStructs[qualificationPriority].push(structDef);
            }
        }
        if (potentiallyStructs.length === 0) {
            __classPrivateFieldSet(this, _StructureDetector_reason, "Not found potentially structs", "f");
            return "";
        }
        for (const structCollInd in potentiallyStructs) {
            for (const structInd in potentiallyStructs[structCollInd]) {
                const tgStructDef = potentiallyStructs[structCollInd][structInd];
                for (const validatorDef of tgStructDef.validators) {
                    const validationRes = validatorDef.validate(structValue);
                    if (validationRes.passed) {
                        return tgStructDef.id;
                    }
                }
            }
        }
        __classPrivateFieldSet(this, _StructureDetector_reason, "No struct matched", "f");
        return "";
    }
}
exports["default"] = StructureDetector;
_StructureDetector_tgValue = new WeakMap(), _StructureDetector_language = new WeakMap(), _StructureDetector_languageContext = new WeakMap(), _StructureDetector_fileDetails = new WeakMap(), _StructureDetector_strategies = new WeakMap(), _StructureDetector_reason = new WeakMap(), _StructureDetector_userSettings = new WeakMap(), _StructureDetector_instances = new WeakSet(), _StructureDetector_matchQualifications = function _StructureDetector_matchQualifications(structDef) {
    if (__classPrivateFieldGet(this, _StructureDetector_language, "f") === "" && __classPrivateFieldGet(this, _StructureDetector_languageContext, "f") === "") {
        return -1;
    }
    if (structDef.languages.length === 0) {
        return -1;
    }
    const langIndex = structDef.languages.indexOf(__classPrivateFieldGet(this, _StructureDetector_language, "f"));
    const langContextIndex = structDef.languageContexts.indexOf(__classPrivateFieldGet(this, _StructureDetector_languageContext, "f"));
    const mimeIndex = typeof __classPrivateFieldGet(this, _StructureDetector_fileDetails, "f")?.mimeType === "string" ? structDef.preferredMimes.indexOf(__classPrivateFieldGet(this, _StructureDetector_fileDetails, "f").mimeType) : -1;
    let totalQualification = -1;
    if (__classPrivateFieldGet(this, _StructureDetector_userSettings, "f")?.validateUncoveredStructures) {
        totalQualification += 1;
    }
    if (langIndex <= -1 && langContextIndex <= -1 && mimeIndex <= -1) {
        return totalQualification;
    }
    if (langIndex > -1) {
        totalQualification += (structDef.languages.length - langIndex) * 2;
    }
    if (langContextIndex > -1) {
        totalQualification += langContextIndex;
    }
    if (mimeIndex > -1) {
        totalQualification += mimeIndex;
    }
    return totalQualification;
}, _StructureDetector_configureMeta = function _StructureDetector_configureMeta(structMeta) {
    if (typeof structMeta.language === "string") {
        __classPrivateFieldSet(this, _StructureDetector_language, structMeta.language, "f");
    }
    else {
        __classPrivateFieldSet(this, _StructureDetector_language, "", "f");
    }
    if (typeof structMeta.languageContext === "string") {
        __classPrivateFieldSet(this, _StructureDetector_languageContext, structMeta.languageContext, "f");
    }
    else {
        __classPrivateFieldSet(this, _StructureDetector_languageContext, "", "f");
    }
    if (typeof structMeta.fileDetails === "object") {
        __classPrivateFieldSet(this, _StructureDetector_fileDetails, structMeta.fileDetails, "f");
    }
    else {
        __classPrivateFieldSet(this, _StructureDetector_fileDetails, null, "f");
    }
};


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const JSONStructureConverter_1 = __webpack_require__(4);
const PHPArrayStructureConverter_1 = __webpack_require__(9);
const YMLStructureConverter_1 = __webpack_require__(143);
const JSONStructureValidator_1 = __webpack_require__(156);
const PHPArrayStructureValidator_1 = __webpack_require__(163);
const YMLStructureValidator_1 = __webpack_require__(164);
exports["default"] = [
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


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const StructureConvertionException_1 = __webpack_require__(5);
const AbstractStructureConverter_1 = __webpack_require__(7);
class JSONStructureConverter extends AbstractStructureConverter_1.default {
    toTextPairs(structure) {
        const langDataStruct = this.toCurrLang(structure);
        for (const langDataInd in langDataStruct) {
        }
    }
    toCurrLang(tgStruct) {
        try {
            const parsedObj = JSON.parse(tgStruct);
            return parsedObj;
        }
        catch (jsexc) {
            if (jsexc instanceof StructureConvertionException_1.default) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}
exports["default"] = JSONStructureConverter;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Exception_1 = __webpack_require__(6);
class StructureConvertionException extends Exception_1.default {
}
exports["default"] = StructureConvertionException;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * @class
 * @classdesc Exception
 */
class Exception {
    /**
     * Create Exception
     * @since 1.0.0
     */
    constructor(message, code = -1, previous = null) {
        this.message = message;
        this.code = code;
        if (typeof process !== 'undefined' &&
            typeof process.versions.node !== 'undefined') {
            this.fileName = __dirname; //new Error().stack.split('\n')[1].split('(')[1].split(')')[0];
        }
        else if (typeof window !== "undefined" &&
            typeof window["HTMLScriptElement"] !== "undefined") {
            const allScriptsTags = document.getElementsByTagName("script");
            this.fileName = allScriptsTags[allScriptsTags.length - 1].src;
        }
        else {
            this.fileName = "unknown";
        }
        this.lineNumber = -1;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.code;
    }
    getFile() {
        return this.fileName;
    }
    getLine() {
        return this.lineNumber;
    }
    getTrace() {
        return [];
    }
    getTraceAsSring() {
        return this.getTrace().join();
    }
    getPrevious() {
        return null;
    }
    toString() {
        return this.message;
    }
    valueOf() {
        return this.message;
    }
}
exports["default"] = Exception;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractStructureConverter_exceptions;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Exception_1 = __webpack_require__(6);
const tools_1 = __webpack_require__(8);
class AbstractStructureConverter {
    constructor(converterConfig = {}) {
        _AbstractStructureConverter_exceptions.set(this, []);
    }
    canConvert(tgStructID) {
        return typeof this['to' + (0, tools_1.default)(tgStructID)] === 'function';
    }
    convert(structure, tgStructID, options = {}) {
        try {
            const tgMethodName = tgStructID;
            if (!this.canConvert(tgStructID)) {
                throw new Exception_1.default("Convertion type " + tgMethodName + " not found in " + this.constructor.name);
            }
            return this['to' + (0, tools_1.default)(tgMethodName)](structure, options);
        }
        catch (exc) {
            return null;
        }
    }
    ;
    pathException(exc) {
        __classPrivateFieldGet(this, _AbstractStructureConverter_exceptions, "f").push(exc);
    }
}
exports["default"] = AbstractStructureConverter;
_AbstractStructureConverter_exceptions = new WeakMap();


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports["default"] = capitalize;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const PHPArray_1 = __webpack_require__(10);
const StructureConvertionException_1 = __webpack_require__(5);
const AbstractStructureConverter_1 = __webpack_require__(7);
class PHPArrayStructureConverter extends AbstractStructureConverter_1.default {
    toCurrLang(tgStruct) {
        try {
            const parsedObj = PHPArray_1.default.parse(tgStruct);
            return parsedObj;
        }
        catch (jsexc) {
            if (jsexc instanceof StructureConvertionException_1.default) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}
exports["default"] = PHPArrayStructureConverter;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * PHPArray parser
 * Copyright (C) 2020 Glayzzle with grano22 changes (BSD3 License)
 *
 * @package PHPArray
 * @author Adrian Błasiak <grano22@outlook.com>
 * @author Rubens Mariuzzo
 */
const PHPParser = __webpack_require__(11);
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
exports["default"] = PHPArray;
PHPArray.singleQuote = "'";
PHPArray.doubleQuote = '"';


/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2020 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const lexer = __webpack_require__(12);
const parser = __webpack_require__(21);
const tokens = __webpack_require__(37);
const AST = __webpack_require__(38);

/**
 * @private
 */
function combine(src, to) {
  const keys = Object.keys(src);
  let i = keys.length;
  while (i--) {
    const k = keys[i];
    const val = src[k];
    if (val === null) {
      delete to[k];
    } else if (typeof val === "function") {
      to[k] = val.bind(to);
    } else if (Array.isArray(val)) {
      to[k] = Array.isArray(to[k]) ? to[k].concat(val) : val;
    } else if (typeof val === "object") {
      to[k] = typeof to[k] === "object" ? combine(val, to[k]) : val;
    } else {
      to[k] = val;
    }
  }
  return to;
}

/**
 * Initialise a new parser instance with the specified options
 *
 * @class
 * @memberOf module:php-parser
 * @tutorial Engine
 * @example
 * var parser = require('php-parser');
 * var instance = new parser({
 *   parser: {
 *     extractDoc: true,
 *     suppressErrors: true,
 *     version: 704 // or '7.4'
 *   },
 *   ast: {
 *     withPositions: true
 *   },
 *   lexer: {
 *     short_tags: true,
 *     asp_tags: true
 *   }
 * });
 *
 * var evalAST = instance.parseEval('some php code');
 * var codeAST = instance.parseCode('<?php some php code', 'foo.php');
 * var tokens = instance.tokenGetAll('<?php some php code');
 *
 * @param {Object} options - List of options
 * @property {Lexer} lexer
 * @property {Parser} parser
 * @property {AST} ast
 * @property {Object} tokens
 */
const Engine = function (options) {
  if (typeof this === "function") {
    return new this(options);
  }
  this.tokens = tokens;
  this.lexer = new lexer(this);
  this.ast = new AST();
  this.parser = new parser(this.lexer, this.ast);
  if (options && typeof options === "object") {
    // disable php7 from lexer if already disabled from parser
    if (options.parser) {
      if (!options.lexer) {
        options.lexer = {};
      }
      if (options.parser.version) {
        if (typeof options.parser.version === "string") {
          let version = options.parser.version.split(".");
          version = parseInt(version[0]) * 100 + parseInt(version[1]);
          if (isNaN(version)) {
            throw new Error("Bad version number : " + options.parser.version);
          } else {
            options.parser.version = version;
          }
        } else if (typeof options.parser.version !== "number") {
          throw new Error("Expecting a number for version");
        }
        if (options.parser.version < 500 || options.parser.version > 704) {
          throw new Error("Can only handle versions between 5.x to 7.x");
        }
      }
    }
    combine(options, this);

    // same version flags based on parser options
    this.lexer.version = this.parser.version;
  }
};

/**
 * Check if the inpyt is a buffer or a string
 * @private
 * @param  {Buffer|String} buffer Input value that can be either a buffer or a string
 * @return {String}   Returns the string from input
 */
const getStringBuffer = function (buffer) {
  return typeof buffer.write === "function" ? buffer.toString() : buffer;
};

/**
 * Creates a new instance (Helper)
 * @param {Object} options
 * @return {Engine}
 * @private
 */
Engine.create = function (options) {
  return new Engine(options);
};

/**
 * Evaluate the buffer
 * @private
 */
Engine.parseEval = function (buffer, options) {
  const self = new Engine(options);
  return self.parseEval(buffer);
};

/**
 * Parse an evaluating mode string (no need to open php tags)
 * @param {String} buffer
 * @return {Program}
 */
Engine.prototype.parseEval = function (buffer) {
  this.lexer.mode_eval = true;
  this.lexer.all_tokens = false;
  buffer = getStringBuffer(buffer);
  return this.parser.parse(buffer, "eval");
};

/**
 * Static function that parse a php code with open/close tags
 * @private
 */
Engine.parseCode = function (buffer, filename, options) {
  if (typeof filename === "object" && !options) {
    // retro-compatibility
    options = filename;
    filename = "unknown";
  }
  const self = new Engine(options);
  return self.parseCode(buffer, filename);
};

/**
 * Function that parse a php code with open/close tags
 *
 * Sample code :
 * ```php
 * <?php $x = 1;
 * ```
 *
 * Usage :
 * ```js
 * var parser = require('php-parser');
 * var phpParser = new parser({
 *   // some options
 * });
 * var ast = phpParser.parseCode('...php code...', 'foo.php');
 * ```
 * @param {String} buffer - The code to be parsed
 * @param {String} filename - Filename
 * @return {Program}
 */
Engine.prototype.parseCode = function (buffer, filename) {
  this.lexer.mode_eval = false;
  this.lexer.all_tokens = false;
  buffer = getStringBuffer(buffer);
  return this.parser.parse(buffer, filename);
};

/**
 * Split the buffer into tokens
 * @private
 */
Engine.tokenGetAll = function (buffer, options) {
  const self = new Engine(options);
  return self.tokenGetAll(buffer);
};

/**
 * Extract tokens from the specified buffer.
 * > Note that the output tokens are *STRICLY* similar to PHP function `token_get_all`
 * @param {String} buffer
 * @return {String[]} - Each item can be a string or an array with following informations [token_name, text, line_number]
 */
Engine.prototype.tokenGetAll = function (buffer) {
  this.lexer.mode_eval = false;
  this.lexer.all_tokens = true;
  buffer = getStringBuffer(buffer);
  const EOF = this.lexer.EOF;
  const names = this.tokens.values;
  this.lexer.setInput(buffer);
  let token = this.lexer.lex() || EOF;
  const result = [];
  while (token != EOF) {
    let entry = this.lexer.yytext;
    if (names.hasOwnProperty(token)) {
      entry = [names[token], entry, this.lexer.yylloc.first_line];
    }
    result.push(entry);
    token = this.lexer.lex() || EOF;
  }
  return result;
};

/** @module php-parser */

// exports the function
module.exports = Engine;

// makes libraries public
module.exports.tokens = tokens;
module.exports.lexer = lexer;
module.exports.AST = AST;
module.exports.parser = parser;
module.exports.combine = combine;
module.exports.Engine = Engine;

// allow the default export in index.d.ts
module.exports["default"] = Engine;


/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/**
 * This is the php lexer. It will tokenize the string for helping the
 * parser to build the AST from its grammar.
 *
 * @constructor Lexer
 * @memberOf module:php-parser
 * @property {number} EOF
 * @property {boolean} all_tokens defines if all tokens must be retrieved (used by token_get_all only)
 * @property {boolean} comment_tokens extracts comments tokens
 * @property {boolean} mode_eval enables the evald mode (ignore opening tags)
 * @property {boolean} asp_tags disables by default asp tags mode
 * @property {boolean} short_tags enables by default short tags mode
 * @property {object} keywords List of php keyword
 * @property {object} castKeywords List of php keywords for type casting
 */
const Lexer = function (engine) {
  this.engine = engine;
  this.tok = this.engine.tokens.names;
  this.EOF = 1;
  this.debug = false;
  this.all_tokens = true;
  this.comment_tokens = false;
  this.mode_eval = false;
  this.asp_tags = false;
  this.short_tags = false;
  this.version = 704;
  this.yyprevcol = 0;
  this.keywords = {
    __class__: this.tok.T_CLASS_C,
    __trait__: this.tok.T_TRAIT_C,
    __function__: this.tok.T_FUNC_C,
    __method__: this.tok.T_METHOD_C,
    __line__: this.tok.T_LINE,
    __file__: this.tok.T_FILE,
    __dir__: this.tok.T_DIR,
    __namespace__: this.tok.T_NS_C,
    exit: this.tok.T_EXIT,
    die: this.tok.T_EXIT,
    function: this.tok.T_FUNCTION,
    const: this.tok.T_CONST,
    return: this.tok.T_RETURN,
    try: this.tok.T_TRY,
    catch: this.tok.T_CATCH,
    finally: this.tok.T_FINALLY,
    throw: this.tok.T_THROW,
    if: this.tok.T_IF,
    elseif: this.tok.T_ELSEIF,
    endif: this.tok.T_ENDIF,
    else: this.tok.T_ELSE,
    while: this.tok.T_WHILE,
    endwhile: this.tok.T_ENDWHILE,
    do: this.tok.T_DO,
    for: this.tok.T_FOR,
    endfor: this.tok.T_ENDFOR,
    foreach: this.tok.T_FOREACH,
    endforeach: this.tok.T_ENDFOREACH,
    declare: this.tok.T_DECLARE,
    enddeclare: this.tok.T_ENDDECLARE,
    instanceof: this.tok.T_INSTANCEOF,
    as: this.tok.T_AS,
    switch: this.tok.T_SWITCH,
    endswitch: this.tok.T_ENDSWITCH,
    case: this.tok.T_CASE,
    default: this.tok.T_DEFAULT,
    break: this.tok.T_BREAK,
    continue: this.tok.T_CONTINUE,
    goto: this.tok.T_GOTO,
    echo: this.tok.T_ECHO,
    print: this.tok.T_PRINT,
    class: this.tok.T_CLASS,
    interface: this.tok.T_INTERFACE,
    trait: this.tok.T_TRAIT,
    extends: this.tok.T_EXTENDS,
    implements: this.tok.T_IMPLEMENTS,
    new: this.tok.T_NEW,
    clone: this.tok.T_CLONE,
    var: this.tok.T_VAR,
    eval: this.tok.T_EVAL,
    include: this.tok.T_INCLUDE,
    include_once: this.tok.T_INCLUDE_ONCE,
    require: this.tok.T_REQUIRE,
    require_once: this.tok.T_REQUIRE_ONCE,
    namespace: this.tok.T_NAMESPACE,
    use: this.tok.T_USE,
    insteadof: this.tok.T_INSTEADOF,
    global: this.tok.T_GLOBAL,
    isset: this.tok.T_ISSET,
    empty: this.tok.T_EMPTY,
    __halt_compiler: this.tok.T_HALT_COMPILER,
    static: this.tok.T_STATIC,
    abstract: this.tok.T_ABSTRACT,
    final: this.tok.T_FINAL,
    private: this.tok.T_PRIVATE,
    protected: this.tok.T_PROTECTED,
    public: this.tok.T_PUBLIC,
    unset: this.tok.T_UNSET,
    list: this.tok.T_LIST,
    array: this.tok.T_ARRAY,
    callable: this.tok.T_CALLABLE,
    or: this.tok.T_LOGICAL_OR,
    and: this.tok.T_LOGICAL_AND,
    xor: this.tok.T_LOGICAL_XOR,
  };
  this.castKeywords = {
    int: this.tok.T_INT_CAST,
    integer: this.tok.T_INT_CAST,
    real: this.tok.T_DOUBLE_CAST,
    double: this.tok.T_DOUBLE_CAST,
    float: this.tok.T_DOUBLE_CAST,
    string: this.tok.T_STRING_CAST,
    binary: this.tok.T_STRING_CAST,
    array: this.tok.T_ARRAY_CAST,
    object: this.tok.T_OBJECT_CAST,
    bool: this.tok.T_BOOL_CAST,
    boolean: this.tok.T_BOOL_CAST,
    unset: this.tok.T_UNSET_CAST,
  };
};

/**
 * Initialize the lexer with the specified input
 * @function Lexer#setInput
 * @memberOf module:php-parser
 */
Lexer.prototype.setInput = function (input) {
  this._input = input;
  this.size = input.length;
  this.yylineno = 1;
  this.offset = 0;
  this.yyprevcol = 0;
  this.yytext = "";
  this.yylloc = {
    first_offset: 0,
    first_line: 1,
    first_column: 0,
    prev_offset: 0,
    prev_line: 1,
    prev_column: 0,
    last_line: 1,
    last_column: 0,
  };
  this.tokens = [];
  if (this.version > 703) {
    this.keywords.fn = this.tok.T_FN;
  } else {
    delete this.keywords.fn;
  }
  this.done = this.offset >= this.size;
  if (!this.all_tokens && this.mode_eval) {
    this.conditionStack = ["INITIAL"];
    this.begin("ST_IN_SCRIPTING");
  } else {
    this.conditionStack = [];
    this.begin("INITIAL");
  }
  // https://github.com/php/php-src/blob/999e32b65a8a4bb59e27e538fa68ffae4b99d863/Zend/zend_language_scanner.h#L59
  // Used for heredoc and nowdoc
  this.heredoc_label = {
    label: "",
    length: 0,
    indentation: 0,
    indentation_uses_spaces: false,
    finished: false,
    /*
     * this used for parser to detemine the if current node segment is first encaps node.
     * if ture, the indentation will remove from the begining. and if false, the prev node
     * might be a variable '}' ,and the leading spaces should not be removed util meet the
     * first \n
     */
    first_encaps_node: false,
    // for backward compatible
    toString: function () {
      this.label;
    },
  };
  return this;
};

/**
 * consumes and returns one char from the input
 * @function Lexer#input
 * @memberOf module:php-parser
 */
Lexer.prototype.input = function () {
  const ch = this._input[this.offset];
  if (!ch) return "";
  this.yytext += ch;
  this.offset++;
  if (ch === "\r" && this._input[this.offset] === "\n") {
    this.yytext += "\n";
    this.offset++;
  }
  if (ch === "\n" || ch === "\r") {
    this.yylloc.last_line = ++this.yylineno;
    this.yyprevcol = this.yylloc.last_column;
    this.yylloc.last_column = 0;
  } else {
    this.yylloc.last_column++;
  }
  return ch;
};

/**
 * revert eating specified size
 * @function Lexer#unput
 * @memberOf module:php-parser
 */
Lexer.prototype.unput = function (size) {
  if (size === 1) {
    // 1 char unput (most cases)
    this.offset--;
    if (
      this._input[this.offset] === "\n" &&
      this._input[this.offset - 1] === "\r"
    ) {
      this.offset--;
      size++;
    }
    if (
      this._input[this.offset] === "\r" ||
      this._input[this.offset] === "\n"
    ) {
      this.yylloc.last_line--;
      this.yylineno--;
      this.yylloc.last_column = this.yyprevcol;
    } else {
      this.yylloc.last_column--;
    }
    this.yytext = this.yytext.substring(0, this.yytext.length - size);
  } else if (size > 0) {
    this.offset -= size;
    if (size < this.yytext.length) {
      this.yytext = this.yytext.substring(0, this.yytext.length - size);
      // re-calculate position
      this.yylloc.last_line = this.yylloc.first_line;
      this.yylloc.last_column = this.yyprevcol = this.yylloc.first_column;
      for (let i = 0; i < this.yytext.length; i++) {
        let c = this.yytext[i];
        if (c === "\r") {
          c = this.yytext[++i];
          this.yyprevcol = this.yylloc.last_column;
          this.yylloc.last_line++;
          this.yylloc.last_column = 0;
          if (c !== "\n") {
            if (c === "\r") {
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
          }
        } else if (c === "\n") {
          this.yyprevcol = this.yylloc.last_column;
          this.yylloc.last_line++;
          this.yylloc.last_column = 0;
        } else {
          this.yylloc.last_column++;
        }
      }
      this.yylineno = this.yylloc.last_line;
    } else {
      // reset full text
      this.yytext = "";
      this.yylloc.last_line = this.yylineno = this.yylloc.first_line;
      this.yylloc.last_column = this.yylloc.first_column;
    }
  }

  return this;
};

/**
 * check if the text matches
 * @function Lexer#tryMatch
 * @memberOf module:php-parser
 * @param {string} text
 * @returns {boolean}
 */
Lexer.prototype.tryMatch = function (text) {
  return text === this.ahead(text.length);
};

/**
 * check if the text matches
 * @function Lexer#tryMatchCaseless
 * @memberOf module:php-parser
 * @param {string} text
 * @returns {boolean}
 */
Lexer.prototype.tryMatchCaseless = function (text) {
  return text === this.ahead(text.length).toLowerCase();
};

/**
 * look ahead
 * @function Lexer#ahead
 * @memberOf module:php-parser
 * @param {number} size
 * @returns {string}
 */
Lexer.prototype.ahead = function (size) {
  let text = this._input.substring(this.offset, this.offset + size);
  if (
    text[text.length - 1] === "\r" &&
    this._input[this.offset + size + 1] === "\n"
  ) {
    text += "\n";
  }
  return text;
};

/**
 * consume the specified size
 * @function Lexer#consume
 * @memberOf module:php-parser
 * @param {number} size
 * @returns {Lexer}
 */
Lexer.prototype.consume = function (size) {
  for (let i = 0; i < size; i++) {
    const ch = this._input[this.offset];
    if (!ch) break;
    this.yytext += ch;
    this.offset++;
    if (ch === "\r" && this._input[this.offset] === "\n") {
      this.yytext += "\n";
      this.offset++;
      i++;
    }
    if (ch === "\n" || ch === "\r") {
      this.yylloc.last_line = ++this.yylineno;
      this.yyprevcol = this.yylloc.last_column;
      this.yylloc.last_column = 0;
    } else {
      this.yylloc.last_column++;
    }
  }
  return this;
};

/**
 * Gets the current state
 * @function Lexer#getState
 * @memberOf module:php-parser
 */
Lexer.prototype.getState = function () {
  return {
    yytext: this.yytext,
    offset: this.offset,
    yylineno: this.yylineno,
    yyprevcol: this.yyprevcol,
    yylloc: {
      first_offset: this.yylloc.first_offset,
      first_line: this.yylloc.first_line,
      first_column: this.yylloc.first_column,
      last_line: this.yylloc.last_line,
      last_column: this.yylloc.last_column,
    },
    heredoc_label: this.heredoc_label,
  };
};

/**
 * Sets the current lexer state
 * @function Lexer#setState
 * @memberOf module:php-parser
 */
Lexer.prototype.setState = function (state) {
  this.yytext = state.yytext;
  this.offset = state.offset;
  this.yylineno = state.yylineno;
  this.yyprevcol = state.yyprevcol;
  this.yylloc = state.yylloc;
  if (state.heredoc_label) {
    this.heredoc_label = state.heredoc_label;
  }
  return this;
};

/**
 * prepend next token
 * @function Lexer#appendToken
 * @memberOf module:php-parser
 * @param {*} value
 * @param {*} ahead
 * @returns {Lexer}
 */
Lexer.prototype.appendToken = function (value, ahead) {
  this.tokens.push([value, ahead]);
  return this;
};

/**
 * return next match that has a token
 * @function Lexer#lex
 * @memberOf module:php-parser
 * @returns {number|string}
 */
Lexer.prototype.lex = function () {
  this.yylloc.prev_offset = this.offset;
  this.yylloc.prev_line = this.yylloc.last_line;
  this.yylloc.prev_column = this.yylloc.last_column;
  let token = this.next() || this.lex();
  if (!this.all_tokens) {
    while (
      token === this.tok.T_WHITESPACE || // ignore white space
      (!this.comment_tokens &&
        (token === this.tok.T_COMMENT || // ignore single lines comments
          token === this.tok.T_DOC_COMMENT)) || // ignore doc comments
      // ignore open tags
      token === this.tok.T_OPEN_TAG
    ) {
      token = this.next() || this.lex();
    }
    if (token == this.tok.T_OPEN_TAG_WITH_ECHO) {
      // https://github.com/php/php-src/blob/7ff186434e82ee7be7c59d0db9a976641cf7b09c/Zend/zend_compile.c#L1683
      // open tag with echo statement
      return this.tok.T_ECHO;
    } else if (token === this.tok.T_CLOSE_TAG) {
      // https://github.com/php/php-src/blob/7ff186434e82ee7be7c59d0db9a976641cf7b09c/Zend/zend_compile.c#L1680
      return ";"; /* implicit ; */
    }
  }
  if (!this.yylloc.prev_offset) {
    this.yylloc.prev_offset = this.yylloc.first_offset;
    this.yylloc.prev_line = this.yylloc.first_line;
    this.yylloc.prev_column = this.yylloc.first_column;
  }
  /*else if (this.yylloc.prev_offset === this.offset && this.offset !== this.size) {
    throw new Error('Infinite loop @ ' + this.offset + ' / ' + this.size);
  }*/
  return token;
};

/**
 * activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
 * @function Lexer#begin
 * @memberOf module:php-parser
 * @param {*} condition
 * @returns {Lexer}
 */
Lexer.prototype.begin = function (condition) {
  this.conditionStack.push(condition);
  this.curCondition = condition;
  this.stateCb = this["match" + condition];
  if (typeof this.stateCb !== "function") {
    throw new Error('Undefined condition state "' + condition + '"');
  }
  return this;
};

/**
 * pop the previously active lexer condition state off the condition stack
 * @function Lexer#popState
 * @memberOf module:php-parser
 * @returns {string|*}
 */
Lexer.prototype.popState = function () {
  const n = this.conditionStack.length - 1;
  const condition = n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
  this.curCondition = this.conditionStack[this.conditionStack.length - 1];
  this.stateCb = this["match" + this.curCondition];
  if (typeof this.stateCb !== "function") {
    throw new Error('Undefined condition state "' + this.curCondition + '"');
  }
  return condition;
};

/**
 * return next match in input
 * @function Lexer#next
 * @memberOf module:php-parser
 * @returns {number|*}
 */
Lexer.prototype.next = function () {
  let token;
  if (!this._input) {
    this.done = true;
  }
  this.yylloc.first_offset = this.offset;
  this.yylloc.first_line = this.yylloc.last_line;
  this.yylloc.first_column = this.yylloc.last_column;
  this.yytext = "";
  if (this.done) {
    this.yylloc.prev_offset = this.yylloc.first_offset;
    this.yylloc.prev_line = this.yylloc.first_line;
    this.yylloc.prev_column = this.yylloc.first_column;
    return this.EOF;
  }
  if (this.tokens.length > 0) {
    token = this.tokens.shift();
    if (typeof token[1] === "object") {
      this.setState(token[1]);
    } else {
      this.consume(token[1]);
    }
    token = token[0];
  } else {
    token = this.stateCb.apply(this, []);
  }
  if (this.offset >= this.size && this.tokens.length === 0) {
    this.done = true;
  }
  if (this.debug) {
    let tName = token;
    if (typeof tName === "number") {
      tName = this.engine.tokens.values[tName];
    } else {
      tName = '"' + tName + '"';
    }
    const e = new Error(
      tName +
        "\tfrom " +
        this.yylloc.first_line +
        "," +
        this.yylloc.first_column +
        "\t - to " +
        this.yylloc.last_line +
        "," +
        this.yylloc.last_column +
        '\t"' +
        this.yytext +
        '"'
    );
    // eslint-disable-next-line no-console
    console.error(e.stack);
  }
  return token;
};

// extends the lexer with states
[
  __webpack_require__(13),
  __webpack_require__(14),
  __webpack_require__(15),
  __webpack_require__(16),
  __webpack_require__(17),
  __webpack_require__(18),
  __webpack_require__(19),
  __webpack_require__(20),
].forEach(function (ext) {
  for (const k in ext) {
    Lexer.prototype[k] = ext[k];
  }
});

module.exports = Lexer;


/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads a single line comment
   */
  T_COMMENT: function () {
    while (this.offset < this.size) {
      const ch = this.input();
      if (ch === "\n" || ch === "\r") {
        return this.tok.T_COMMENT;
      } else if (
        ch === "?" &&
        !this.aspTagMode &&
        this._input[this.offset] === ">"
      ) {
        this.unput(1);
        return this.tok.T_COMMENT;
      } else if (
        ch === "%" &&
        this.aspTagMode &&
        this._input[this.offset] === ">"
      ) {
        this.unput(1);
        return this.tok.T_COMMENT;
      }
    }
    return this.tok.T_COMMENT;
  },
  /*
   * Behaviour : https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1927
   */
  T_DOC_COMMENT: function () {
    let ch = this.input();
    let token = this.tok.T_COMMENT;
    if (ch === "*") {
      // started with '/*' , check is next is '*'
      ch = this.input();
      if (this.is_WHITESPACE()) {
        // check if next is WHITESPACE
        token = this.tok.T_DOC_COMMENT;
      }
      if (ch === "/") {
        return token;
      } else {
        this.unput(1); // reset
      }
    }
    while (this.offset < this.size) {
      ch = this.input();
      if (ch === "*" && this._input[this.offset] === "/") {
        this.input();
        break;
      }
    }
    return token;
  },
};


/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  nextINITIAL: function () {
    if (
      this.conditionStack.length > 1 &&
      this.conditionStack[this.conditionStack.length - 1] === "INITIAL"
    ) {
      // Return to HEREDOC/ST_DOUBLE_QUOTES mode
      this.popState();
    } else {
      this.begin("ST_IN_SCRIPTING");
    }
    return this;
  },
  matchINITIAL: function () {
    while (this.offset < this.size) {
      let ch = this.input();
      if (ch == "<") {
        ch = this.ahead(1);
        if (ch == "?") {
          if (this.tryMatch("?=")) {
            this.unput(1)
              .appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3)
              .nextINITIAL();
            break;
          } else if (this.tryMatchCaseless("?php")) {
            ch = this._input[this.offset + 4];
            if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
              this.unput(1).appendToken(this.tok.T_OPEN_TAG, 6).nextINITIAL();
              break;
            }
          }
          if (this.short_tags) {
            this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
            break;
          }
        } else if (this.asp_tags && ch == "%") {
          if (this.tryMatch("%=")) {
            this.aspTagMode = true;
            this.unput(1)
              .appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3)
              .nextINITIAL();
            break;
          } else {
            this.aspTagMode = true;
            this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
            break;
          }
        }
      }
    }
    if (this.yytext.length > 0) {
      return this.tok.T_INLINE_HTML;
    } else {
      return false;
    }
  },
};


/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/* istanbul ignore else  */
let MAX_LENGTH_OF_LONG = 10;
let long_min_digits = "2147483648";
if (process.arch == "x64") {
  MAX_LENGTH_OF_LONG = 19;
  long_min_digits = "9223372036854775808";
}

module.exports = {
  consume_NUM: function () {
    let ch = this.yytext[0];
    let hasPoint = ch === ".";
    if (ch === "0") {
      ch = this.input();
      // check if hexa
      if (ch === "x" || ch === "X") {
        ch = this.input();
        if (ch !== "_" && this.is_HEX()) {
          return this.consume_HNUM();
        } else {
          this.unput(ch ? 2 : 1);
        }
        // check binary notation
      } else if (ch === "b" || ch === "B") {
        ch = this.input();
        if ((ch !== "_" && ch === "0") || ch === "1") {
          return this.consume_BNUM();
        } else {
          this.unput(ch ? 2 : 1);
        }
        // @fixme check octal notation ? not usefull
      } else if (!this.is_NUM()) {
        if (ch) this.unput(1);
      }
    }

    while (this.offset < this.size) {
      const prev = ch;
      ch = this.input();

      if (ch === "_") {
        if (prev === "_") {
          // restriction : next to underscore / 1__1;
          this.unput(2); // keep 1
          break;
        }
        if (prev === ".") {
          // next to decimal point  "1._0"
          this.unput(1); // keep 1.
          break;
        }
        if (prev === "e" || prev === "E") {
          // next to e "1e_10"
          this.unput(2); // keep 1
          break;
        }
      } else if (ch === ".") {
        if (hasPoint) {
          // no multiple points "1.0.5"
          this.unput(1); // keep 1.0
          break;
        }
        if (prev === "_") {
          // next to decimal point  "1_.0"
          this.unput(2); // keep 1
          break;
        }
        hasPoint = true;
        continue;
      } else if (ch === "e" || ch === "E") {
        if (prev === "_") {
          // next to e "1_e10"
          this.unput(1);
          break;
        }
        let undo = 2;
        ch = this.input();
        if (ch === "+" || ch === "-") {
          // 1e-5
          undo = 3;
          ch = this.input();
        }
        if (this.is_NUM_START()) {
          this.consume_LNUM();
          return this.tok.T_DNUMBER;
        }
        this.unput(ch ? undo : undo - 1); // keep only 1
        break;
      }

      if (!this.is_NUM()) {
        // example : 10.0a
        if (ch) this.unput(1); // keep 10.0
        break;
      }
    }

    if (hasPoint) {
      return this.tok.T_DNUMBER;
    } else if (this.yytext.length < MAX_LENGTH_OF_LONG - 1) {
      return this.tok.T_LNUMBER;
    } else {
      if (
        this.yytext.length < MAX_LENGTH_OF_LONG ||
        (this.yytext.length == MAX_LENGTH_OF_LONG &&
          this.yytext < long_min_digits)
      ) {
        return this.tok.T_LNUMBER;
      }
      return this.tok.T_DNUMBER;
    }
  },
  // read hexa
  consume_HNUM: function () {
    while (this.offset < this.size) {
      const ch = this.input();
      if (!this.is_HEX()) {
        if (ch) this.unput(1);
        break;
      }
    }
    return this.tok.T_LNUMBER;
  },
  // read a generic number
  consume_LNUM: function () {
    while (this.offset < this.size) {
      const ch = this.input();
      if (!this.is_NUM()) {
        if (ch) this.unput(1);
        break;
      }
    }
    return this.tok.T_LNUMBER;
  },
  // read binary
  consume_BNUM: function () {
    let ch;
    while (this.offset < this.size) {
      ch = this.input();
      if (ch !== "0" && ch !== "1" && ch !== "_") {
        if (ch) this.unput(1);
        break;
      }
    }
    return this.tok.T_LNUMBER;
  },
};


/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  matchST_LOOKING_FOR_PROPERTY: function () {
    let ch = this.input();
    if (ch === "-") {
      ch = this.input();
      if (ch === ">") {
        // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1296
        return this.tok.T_OBJECT_OPERATOR;
      }
      if (ch) this.unput(1);
    } else if (this.is_WHITESPACE()) {
      return this.tok.T_WHITESPACE;
    } else if (this.is_LABEL_START()) {
      // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1300
      this.consume_LABEL();
      this.popState();
      return this.tok.T_STRING;
    }
    // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1306
    this.popState();
    if (ch) this.unput(1);
    return false;
  },
  matchST_LOOKING_FOR_VARNAME: function () {
    let ch = this.input();

    // SHIFT STATE
    this.popState();
    this.begin("ST_IN_SCRIPTING");

    if (this.is_LABEL_START()) {
      this.consume_LABEL();
      ch = this.input();
      if (ch === "[" || ch === "}") {
        this.unput(1);
        return this.tok.T_STRING_VARNAME;
      } else {
        // any char (that's started with a label sequence)
        this.unput(this.yytext.length);
      }
    } else {
      // any char (thats not a label start sequence)
      if (ch) this.unput(1);
    }
    // stops looking for a varname and starts the scripting mode
    return false;
  },
  matchST_VAR_OFFSET: function () {
    const ch = this.input();
    if (this.is_NUM_START()) {
      this.consume_NUM();
      return this.tok.T_NUM_STRING;
    } else if (ch === "]") {
      this.popState();
      return "]";
    } else if (ch === "$") {
      this.input();
      if (this.is_LABEL_START()) {
        this.consume_LABEL();
        return this.tok.T_VARIABLE;
      } else {
        throw new Error("Unexpected terminal");
      }
    } else if (this.is_LABEL_START()) {
      this.consume_LABEL();
      return this.tok.T_STRING;
    } else if (
      this.is_WHITESPACE() ||
      ch === "\\" ||
      ch === "'" ||
      ch === "#"
    ) {
      return this.tok.T_ENCAPSED_AND_WHITESPACE;
    } else if (
      ch === "[" ||
      ch === "{" ||
      ch === "}" ||
      ch === '"' ||
      ch === "`" ||
      this.is_TOKEN()
    ) {
      return ch;
    } else {
      throw new Error("Unexpected terminal");
    }
  },
};


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  matchST_IN_SCRIPTING: function () {
    let ch = this.input();
    switch (ch) {
      case " ":
      case "\t":
      case "\n":
      case "\r":
      case "\r\n":
        return this.T_WHITESPACE();
      case "#":
        return this.T_COMMENT();
      case "/":
        if (this._input[this.offset] === "/") {
          return this.T_COMMENT();
        } else if (this._input[this.offset] === "*") {
          this.input();
          return this.T_DOC_COMMENT();
        }
        return this.consume_TOKEN();
      case "'":
        return this.T_CONSTANT_ENCAPSED_STRING();
      case '"':
        return this.ST_DOUBLE_QUOTES();
      case "`":
        this.begin("ST_BACKQUOTE");
        return "`";
      case "?":
        if (!this.aspTagMode && this.tryMatch(">")) {
          this.input();
          const nextCH = this._input[this.offset];
          if (nextCH === "\n" || nextCH === "\r") this.input();
          if (this.conditionStack.length > 1) {
            this.begin("INITIAL");
          }
          return this.tok.T_CLOSE_TAG;
        }
        return this.consume_TOKEN();
      case "%":
        if (this.aspTagMode && this._input[this.offset] === ">") {
          this.input(); // consume the '>'
          ch = this._input[this.offset]; // read next
          if (ch === "\n" || ch === "\r") {
            this.input(); // consume the newline
          }
          this.aspTagMode = false;
          if (this.conditionStack.length > 1) {
            this.begin("INITIAL");
          }
          return this.tok.T_CLOSE_TAG;
        }
        return this.consume_TOKEN();
      case "{":
        this.begin("ST_IN_SCRIPTING");
        return "{";
      case "}":
        if (this.conditionStack.length > 2) {
          // Return to HEREDOC/ST_DOUBLE_QUOTES mode
          this.popState();
        }
        return "}";
      default:
        if (ch === ".") {
          ch = this.input();
          if (this.is_NUM_START()) {
            return this.consume_NUM();
          } else {
            if (ch) this.unput(1);
          }
        }
        if (this.is_NUM_START()) {
          return this.consume_NUM();
        } else if (this.is_LABEL_START()) {
          return this.consume_LABEL().T_STRING();
        } else if (this.is_TOKEN()) {
          return this.consume_TOKEN();
        }
    }
    throw new Error(
      'Bad terminal sequence "' +
        ch +
        '" at line ' +
        this.yylineno +
        " (offset " +
        this.offset +
        ")"
    );
  },

  T_WHITESPACE: function () {
    while (this.offset < this.size) {
      const ch = this.input();
      if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
        continue;
      }
      if (ch) this.unput(1);
      break;
    }
    return this.tok.T_WHITESPACE;
  },
};


/***/ }),
/* 18 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const newline = ["\n", "\r"];
const valid_after_heredoc = ["\n", "\r", ";"];
const valid_after_heredoc_73 = valid_after_heredoc.concat([
  "\t",
  " ",
  ",",
  "]",
  ")",
  "/",
  "=",
  "!",
]);

module.exports = {
  T_CONSTANT_ENCAPSED_STRING: function () {
    let ch;
    while (this.offset < this.size) {
      ch = this.input();
      if (ch == "\\") {
        this.input();
      } else if (ch == "'") {
        break;
      }
    }
    return this.tok.T_CONSTANT_ENCAPSED_STRING;
  },
  // check if matching a HEREDOC state
  is_HEREDOC: function () {
    const revert = this.offset;
    if (
      this._input[this.offset - 1] === "<" &&
      this._input[this.offset] === "<" &&
      this._input[this.offset + 1] === "<"
    ) {
      this.offset += 3;

      // optional tabs / spaces
      if (this.is_TABSPACE()) {
        while (this.offset < this.size) {
          this.offset++;
          if (!this.is_TABSPACE()) {
            break;
          }
        }
      }

      // optional quotes
      let tChar = this._input[this.offset - 1];
      if (tChar === "'" || tChar === '"') {
        this.offset++;
      } else {
        tChar = null;
      }

      // required label
      if (this.is_LABEL_START()) {
        let yyoffset = this.offset - 1;
        while (this.offset < this.size) {
          this.offset++;
          if (!this.is_LABEL()) {
            break;
          }
        }
        const yylabel = this._input.substring(yyoffset, this.offset - 1);
        if (!tChar || tChar === this._input[this.offset - 1]) {
          // required ending quote
          if (tChar) this.offset++;
          // require newline
          if (newline.includes(this._input[this.offset - 1])) {
            // go go go
            this.heredoc_label.label = yylabel;
            this.heredoc_label.length = yylabel.length;
            this.heredoc_label.finished = false;
            yyoffset = this.offset - revert;
            this.offset = revert;
            this.consume(yyoffset);
            if (tChar === "'") {
              this.begin("ST_NOWDOC");
            } else {
              this.begin("ST_HEREDOC");
            }
            // prematch to get the indentation information from end of doc
            this.prematch_ENDOFDOC();
            return this.tok.T_START_HEREDOC;
          }
        }
      }
    }
    this.offset = revert;
    return false;
  },
  ST_DOUBLE_QUOTES: function () {
    let ch;
    while (this.offset < this.size) {
      ch = this.input();
      if (ch == "\\") {
        this.input();
      } else if (ch == '"') {
        break;
      } else if (ch == "$") {
        ch = this.input();
        if (ch == "{" || this.is_LABEL_START()) {
          this.unput(2);
          break;
        }
        if (ch) this.unput(1);
      } else if (ch == "{") {
        ch = this.input();
        if (ch == "$") {
          this.unput(2);
          break;
        }
        if (ch) this.unput(1);
      }
    }
    if (ch == '"') {
      return this.tok.T_CONSTANT_ENCAPSED_STRING;
    } else {
      let prefix = 1;
      if (this.yytext[0] === "b" || this.yytext[0] === "B") {
        prefix = 2;
      }
      if (this.yytext.length > 2) {
        this.appendToken(
          this.tok.T_ENCAPSED_AND_WHITESPACE,
          this.yytext.length - prefix
        );
      }
      this.unput(this.yytext.length - prefix);
      this.begin("ST_DOUBLE_QUOTES");
      return this.yytext;
    }
  },

  // check if its a DOC end sequence
  isDOC_MATCH: function (offset, consumeLeadingSpaces) {
    // @fixme : check if out of text limits

    // consumeLeadingSpaces is false happen DOC prematch END HEREDOC stage.

    // Ensure current state is really after a new line break, not after a such as ${variables}
    const prev_ch = this._input[offset - 2];
    if (!newline.includes(prev_ch)) {
      return false;
    }

    // skip leading spaces or tabs
    let indentation_uses_spaces = false;
    let indentation_uses_tabs = false;
    // reset heredoc_label structure
    let indentation = 0;
    let leading_ch = this._input[offset - 1];

    if (this.version >= 703) {
      while (leading_ch === "\t" || leading_ch === " ") {
        if (leading_ch === " ") {
          indentation_uses_spaces = true;
        } else if (leading_ch === "\t") {
          indentation_uses_tabs = true;
        }

        leading_ch = this._input[offset + indentation];
        indentation++;
      }

      // Move offset to skip leading whitespace
      offset = offset + indentation;

      // return out if there was only whitespace on this line
      if (newline.includes(this._input[offset - 1])) {
        return false;
      }
    }

    if (
      this._input.substring(
        offset - 1,
        offset - 1 + this.heredoc_label.length
      ) === this.heredoc_label.label
    ) {
      const ch = this._input[offset - 1 + this.heredoc_label.length];
      if (
        (this.version >= 703
          ? valid_after_heredoc_73
          : valid_after_heredoc
        ).includes(ch)
      ) {
        if (consumeLeadingSpaces) {
          this.consume(indentation);
          // https://wiki.php.net/rfc/flexible_heredoc_nowdoc_syntaxes
          if (indentation_uses_spaces && indentation_uses_tabs) {
            throw new Error(
              "Parse error:  mixing spaces and tabs in ending marker at line " +
                this.yylineno +
                " (offset " +
                this.offset +
                ")"
            );
          }
        } else {
          // Called in prematch_ENDOFDOC
          this.heredoc_label.indentation = indentation;
          this.heredoc_label.indentation_uses_spaces = indentation_uses_spaces;
          this.heredoc_label.first_encaps_node = true;
        }
        return true;
      }
    }

    return false;
  },

  /*
   * Prematch the end of HEREDOC/NOWDOC end tag to preset the
   * context of this.heredoc_label
   */
  prematch_ENDOFDOC: function () {
    // reset heredoc
    this.heredoc_label.indentation_uses_spaces = false;
    this.heredoc_label.indentation = 0;
    this.heredoc_label.first_encaps_node = true;
    let offset = this.offset + 1;

    while (offset < this._input.length) {
      // if match heredoc_label structrue will be set
      if (this.isDOC_MATCH(offset, false)) {
        return;
      }

      if (!newline.includes(this._input[offset - 1])) {
        // skip one line
        while (
          !newline.includes(this._input[offset++]) &&
          offset < this._input.length
        ) {
          // skip
        }
      }

      offset++;
    }
  },

  matchST_NOWDOC: function () {
    // edge case : empty now doc
    if (this.isDOC_MATCH(this.offset, true)) {
      // @fixme : never reached (may be caused by quotes)
      this.consume(this.heredoc_label.length);
      this.popState();
      return this.tok.T_END_HEREDOC;
    }
    // SCANNING CONTENTS
    let ch = this._input[this.offset - 1];
    while (this.offset < this.size) {
      if (newline.includes(ch)) {
        ch = this.input();
        if (this.isDOC_MATCH(this.offset, true)) {
          this.unput(1).popState();
          this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
          return this.tok.T_ENCAPSED_AND_WHITESPACE;
        }
      } else {
        ch = this.input();
      }
    }
    // too bad ! reached end of document (will get a parse error)
    return this.tok.T_ENCAPSED_AND_WHITESPACE;
  },

  matchST_HEREDOC: function () {
    // edge case : empty here doc
    let ch = this.input();
    if (this.isDOC_MATCH(this.offset, true)) {
      this.consume(this.heredoc_label.length - 1);
      this.popState();
      return this.tok.T_END_HEREDOC;
    }
    // SCANNING CONTENTS
    while (this.offset < this.size) {
      if (ch === "\\") {
        ch = this.input(); // ignore next
        if (!newline.includes(ch)) {
          ch = this.input();
        }
      }

      if (newline.includes(ch)) {
        ch = this.input();
        if (this.isDOC_MATCH(this.offset, true)) {
          this.unput(1).popState();
          this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
          return this.tok.T_ENCAPSED_AND_WHITESPACE;
        }
      } else if (ch === "$") {
        ch = this.input();
        if (ch === "{") {
          // start of ${
          this.begin("ST_LOOKING_FOR_VARNAME");
          if (this.yytext.length > 2) {
            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
            this.unput(2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
          }
        } else if (this.is_LABEL_START()) {
          // start of $var...
          const yyoffset = this.offset;
          const next = this.consume_VARIABLE();
          if (this.yytext.length > this.offset - yyoffset + 2) {
            this.appendToken(next, this.offset - yyoffset + 2);
            this.unput(this.offset - yyoffset + 2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            return next;
          }
          //console.log(this.yytext);
        }
      } else if (ch === "{") {
        ch = this.input();
        if (ch === "$") {
          // start of {$...
          this.begin("ST_IN_SCRIPTING");
          if (this.yytext.length > 2) {
            this.appendToken(this.tok.T_CURLY_OPEN, 1);
            this.unput(2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            this.unput(1);
            return this.tok.T_CURLY_OPEN;
          }
        }
      } else {
        ch = this.input();
      }
    }

    // too bad ! reached end of document (will get a parse error)
    return this.tok.T_ENCAPSED_AND_WHITESPACE;
  },

  consume_VARIABLE: function () {
    this.consume_LABEL();
    const ch = this.input();
    if (ch == "[") {
      this.unput(1);
      this.begin("ST_VAR_OFFSET");
      return this.tok.T_VARIABLE;
    } else if (ch === "-") {
      if (this.input() === ">") {
        this.input();
        if (this.is_LABEL_START()) {
          this.begin("ST_LOOKING_FOR_PROPERTY");
        }
        this.unput(3);
        return this.tok.T_VARIABLE;
      } else {
        this.unput(2);
      }
    } else {
      if (ch) this.unput(1);
    }
    return this.tok.T_VARIABLE;
  },
  // HANDLES BACKQUOTES
  matchST_BACKQUOTE: function () {
    let ch = this.input();
    if (ch === "$") {
      ch = this.input();
      if (ch === "{") {
        this.begin("ST_LOOKING_FOR_VARNAME");
        return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
      } else if (this.is_LABEL_START()) {
        const tok = this.consume_VARIABLE();
        return tok;
      }
    } else if (ch === "{") {
      if (this._input[this.offset] === "$") {
        this.begin("ST_IN_SCRIPTING");
        return this.tok.T_CURLY_OPEN;
      }
    } else if (ch === "`") {
      this.popState();
      return "`";
    }

    // any char
    while (this.offset < this.size) {
      if (ch === "\\") {
        this.input();
      } else if (ch === "`") {
        this.unput(1);
        this.popState();
        this.appendToken("`", 1);
        break;
      } else if (ch === "$") {
        ch = this.input();
        if (ch === "{") {
          this.begin("ST_LOOKING_FOR_VARNAME");
          if (this.yytext.length > 2) {
            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
            this.unput(2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
          }
        } else if (this.is_LABEL_START()) {
          // start of $var...
          const yyoffset = this.offset;
          const next = this.consume_VARIABLE();
          if (this.yytext.length > this.offset - yyoffset + 2) {
            this.appendToken(next, this.offset - yyoffset + 2);
            this.unput(this.offset - yyoffset + 2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            return next;
          }
        }
        continue;
      } else if (ch === "{") {
        ch = this.input();
        if (ch === "$") {
          // start of {$...
          this.begin("ST_IN_SCRIPTING");
          if (this.yytext.length > 2) {
            this.appendToken(this.tok.T_CURLY_OPEN, 1);
            this.unput(2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            this.unput(1);
            return this.tok.T_CURLY_OPEN;
          }
        }
        continue;
      }
      ch = this.input();
    }
    return this.tok.T_ENCAPSED_AND_WHITESPACE;
  },

  matchST_DOUBLE_QUOTES: function () {
    let ch = this.input();
    if (ch === "$") {
      ch = this.input();
      if (ch === "{") {
        this.begin("ST_LOOKING_FOR_VARNAME");
        return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
      } else if (this.is_LABEL_START()) {
        const tok = this.consume_VARIABLE();
        return tok;
      }
    } else if (ch === "{") {
      if (this._input[this.offset] === "$") {
        this.begin("ST_IN_SCRIPTING");
        return this.tok.T_CURLY_OPEN;
      }
    } else if (ch === '"') {
      this.popState();
      return '"';
    }

    // any char
    while (this.offset < this.size) {
      if (ch === "\\") {
        this.input();
      } else if (ch === '"') {
        this.unput(1);
        this.popState();
        this.appendToken('"', 1);
        break;
      } else if (ch === "$") {
        ch = this.input();
        if (ch === "{") {
          this.begin("ST_LOOKING_FOR_VARNAME");
          if (this.yytext.length > 2) {
            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
            this.unput(2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
          }
        } else if (this.is_LABEL_START()) {
          // start of $var...
          const yyoffset = this.offset;
          const next = this.consume_VARIABLE();
          if (this.yytext.length > this.offset - yyoffset + 2) {
            this.appendToken(next, this.offset - yyoffset + 2);
            this.unput(this.offset - yyoffset + 2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            return next;
          }
        }
        if (ch) this.unput(1);
      } else if (ch === "{") {
        ch = this.input();
        if (ch === "$") {
          // start of {$...
          this.begin("ST_IN_SCRIPTING");
          if (this.yytext.length > 2) {
            this.appendToken(this.tok.T_CURLY_OPEN, 1);
            this.unput(2);
            return this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else {
            // @fixme : yytext = '"{$' (this.yytext.length > 3)
            this.unput(1);
            return this.tok.T_CURLY_OPEN;
          }
        }
        if (ch) this.unput(1);
      }
      ch = this.input();
    }
    return this.tok.T_ENCAPSED_AND_WHITESPACE;
  },
};


/***/ }),
/* 19 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  T_STRING: function () {
    const token = this.yytext.toLowerCase();
    let id = this.keywords[token];
    if (typeof id !== "number") {
      if (token === "yield") {
        if (this.version >= 700 && this.tryMatch(" from")) {
          this.consume(5);
          id = this.tok.T_YIELD_FROM;
        } else {
          id = this.tok.T_YIELD;
        }
      } else {
        id = this.tok.T_STRING;
        if (token === "b" || token === "B") {
          const ch = this.input(1);
          if (ch === '"') {
            return this.ST_DOUBLE_QUOTES();
          } else if (ch === "'") {
            return this.T_CONSTANT_ENCAPSED_STRING();
          } else if (ch) {
            this.unput(1);
          }
        }
      }
    }
    return id;
  },
  // reads a custom token
  consume_TOKEN: function () {
    const ch = this._input[this.offset - 1];
    const fn = this.tokenTerminals[ch];
    if (fn) {
      return fn.apply(this, []);
    } else {
      return this.yytext;
    }
  },
  // list of special char tokens
  tokenTerminals: {
    $: function () {
      this.offset++;
      if (this.is_LABEL_START()) {
        this.offset--;
        this.consume_LABEL();
        return this.tok.T_VARIABLE;
      } else {
        this.offset--;
        return "$";
      }
    },
    "-": function () {
      const nchar = this._input[this.offset];
      if (nchar === ">") {
        this.begin("ST_LOOKING_FOR_PROPERTY").input();
        return this.tok.T_OBJECT_OPERATOR;
      } else if (nchar === "-") {
        this.input();
        return this.tok.T_DEC;
      } else if (nchar === "=") {
        this.input();
        return this.tok.T_MINUS_EQUAL;
      }
      return "-";
    },
    "\\": function () {
      return this.tok.T_NS_SEPARATOR;
    },
    "/": function () {
      if (this._input[this.offset] === "=") {
        this.input();
        return this.tok.T_DIV_EQUAL;
      }
      return "/";
    },
    ":": function () {
      if (this._input[this.offset] === ":") {
        this.input();
        return this.tok.T_DOUBLE_COLON;
      } else {
        return ":";
      }
    },
    "(": function () {
      const initial = this.offset;
      this.input();
      if (this.is_TABSPACE()) {
        this.consume_TABSPACE().input();
      }
      if (this.is_LABEL_START()) {
        const yylen = this.yytext.length;
        this.consume_LABEL();
        const castToken = this.yytext.substring(yylen - 1).toLowerCase();
        const castId = this.castKeywords[castToken];
        if (typeof castId === "number") {
          this.input();
          if (this.is_TABSPACE()) {
            this.consume_TABSPACE().input();
          }
          if (this._input[this.offset - 1] === ")") {
            return castId;
          }
        }
      }
      // revert the check
      this.unput(this.offset - initial);
      return "(";
    },
    "=": function () {
      const nchar = this._input[this.offset];
      if (nchar === ">") {
        this.input();
        return this.tok.T_DOUBLE_ARROW;
      } else if (nchar === "=") {
        if (this._input[this.offset + 1] === "=") {
          this.consume(2);
          return this.tok.T_IS_IDENTICAL;
        } else {
          this.input();
          return this.tok.T_IS_EQUAL;
        }
      }
      return "=";
    },
    "+": function () {
      const nchar = this._input[this.offset];
      if (nchar === "+") {
        this.input();
        return this.tok.T_INC;
      } else if (nchar === "=") {
        this.input();
        return this.tok.T_PLUS_EQUAL;
      }
      return "+";
    },
    "!": function () {
      if (this._input[this.offset] === "=") {
        if (this._input[this.offset + 1] === "=") {
          this.consume(2);
          return this.tok.T_IS_NOT_IDENTICAL;
        } else {
          this.input();
          return this.tok.T_IS_NOT_EQUAL;
        }
      }
      return "!";
    },
    "?": function () {
      if (this.version >= 700 && this._input[this.offset] === "?") {
        if (this.version >= 704 && this._input[this.offset + 1] === "=") {
          this.consume(2);
          return this.tok.T_COALESCE_EQUAL;
        } else {
          this.input();
          return this.tok.T_COALESCE;
        }
      }
      return "?";
    },
    "<": function () {
      let nchar = this._input[this.offset];
      if (nchar === "<") {
        nchar = this._input[this.offset + 1];
        if (nchar === "=") {
          this.consume(2);
          return this.tok.T_SL_EQUAL;
        } else if (nchar === "<") {
          if (this.is_HEREDOC()) {
            return this.tok.T_START_HEREDOC;
          }
        }
        this.input();
        return this.tok.T_SL;
      } else if (nchar === "=") {
        this.input();
        if (this.version >= 700 && this._input[this.offset] === ">") {
          this.input();
          return this.tok.T_SPACESHIP;
        } else {
          return this.tok.T_IS_SMALLER_OR_EQUAL;
        }
      } else if (nchar === ">") {
        this.input();
        return this.tok.T_IS_NOT_EQUAL;
      }
      return "<";
    },
    ">": function () {
      let nchar = this._input[this.offset];
      if (nchar === "=") {
        this.input();
        return this.tok.T_IS_GREATER_OR_EQUAL;
      } else if (nchar === ">") {
        nchar = this._input[this.offset + 1];
        if (nchar === "=") {
          this.consume(2);
          return this.tok.T_SR_EQUAL;
        } else {
          this.input();
          return this.tok.T_SR;
        }
      }
      return ">";
    },
    "*": function () {
      const nchar = this._input[this.offset];
      if (nchar === "=") {
        this.input();
        return this.tok.T_MUL_EQUAL;
      } else if (nchar === "*") {
        this.input();
        if (this._input[this.offset] === "=") {
          this.input();
          return this.tok.T_POW_EQUAL;
        } else {
          return this.tok.T_POW;
        }
      }
      return "*";
    },
    ".": function () {
      const nchar = this._input[this.offset];
      if (nchar === "=") {
        this.input();
        return this.tok.T_CONCAT_EQUAL;
      } else if (nchar === "." && this._input[this.offset + 1] === ".") {
        this.consume(2);
        return this.tok.T_ELLIPSIS;
      }
      return ".";
    },
    "%": function () {
      if (this._input[this.offset] === "=") {
        this.input();
        return this.tok.T_MOD_EQUAL;
      }
      return "%";
    },
    "&": function () {
      const nchar = this._input[this.offset];
      if (nchar === "=") {
        this.input();
        return this.tok.T_AND_EQUAL;
      } else if (nchar === "&") {
        this.input();
        return this.tok.T_BOOLEAN_AND;
      }
      return "&";
    },
    "|": function () {
      const nchar = this._input[this.offset];
      if (nchar === "=") {
        this.input();
        return this.tok.T_OR_EQUAL;
      } else if (nchar === "|") {
        this.input();
        return this.tok.T_BOOLEAN_OR;
      }
      return "|";
    },
    "^": function () {
      if (this._input[this.offset] === "=") {
        this.input();
        return this.tok.T_XOR_EQUAL;
      }
      return "^";
    },
  },
};


/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const tokens = ";:,.\\[]()|^&+-/*=%!~$<>?@";

module.exports = {
  // check if the char can be a numeric
  is_NUM: function () {
    const ch = this._input.charCodeAt(this.offset - 1);
    return (ch > 47 && ch < 58) || ch === 95;
  },

  // check if the char can be a numeric
  is_NUM_START: function () {
    const ch = this._input.charCodeAt(this.offset - 1);
    return ch > 47 && ch < 58;
  },

  // check if current char can be a label
  is_LABEL: function () {
    const ch = this._input.charCodeAt(this.offset - 1);
    return (
      (ch > 96 && ch < 123) ||
      (ch > 64 && ch < 91) ||
      ch === 95 ||
      (ch > 47 && ch < 58) ||
      ch > 126
    );
  },

  // check if current char can be a label
  is_LABEL_START: function () {
    const ch = this._input.charCodeAt(this.offset - 1);
    // A - Z
    if (ch > 64 && ch < 91) return true;
    // a - z
    if (ch > 96 && ch < 123) return true;
    // _ (95)
    if (ch === 95) return true;
    // utf8 / extended
    if (ch > 126) return true;
    // else
    return false;
  },

  // reads each char of the label
  consume_LABEL: function () {
    while (this.offset < this.size) {
      const ch = this.input();
      if (!this.is_LABEL()) {
        if (ch) this.unput(1);
        break;
      }
    }
    return this;
  },

  // check if current char is a token char
  is_TOKEN: function () {
    const ch = this._input[this.offset - 1];
    return tokens.indexOf(ch) !== -1;
  },
  // check if current char is a whitespace
  is_WHITESPACE: function () {
    const ch = this._input[this.offset - 1];
    return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
  },
  // check if current char is a whitespace (without newlines)
  is_TABSPACE: function () {
    const ch = this._input[this.offset - 1];
    return ch === " " || ch === "\t";
  },
  // consume all whitespaces (excluding newlines)
  consume_TABSPACE: function () {
    while (this.offset < this.size) {
      const ch = this.input();
      if (!this.is_TABSPACE()) {
        if (ch) this.unput(1);
        break;
      }
    }
    return this;
  },
  // check if current char can be a hexadecimal number
  is_HEX: function () {
    const ch = this._input.charCodeAt(this.offset - 1);
    // 0 - 9
    if (ch > 47 && ch < 58) return true;
    // A - F
    if (ch > 64 && ch < 71) return true;
    // a - f
    if (ch > 96 && ch < 103) return true;
    // _ (code 95)
    if (ch === 95) return true;
    // else
    return false;
  },
};


/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/**
 * @private
 */
function isNumber(n) {
  return n != "." && n != "," && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * The PHP Parser class that build the AST tree from the lexer
 *
 * @constructor Parser
 * @memberOf module:php-parser
 * @tutorial Parser
 * @property {Lexer} lexer - current lexer instance
 * @property {AST} ast - the AST factory instance
 * @property {number|string} token - current token
 * @property {boolean} extractDoc - should extract documentation as AST node
 * @property {boolean} extractTokens - should extract each token
 * @property {boolean} suppressErrors - should ignore parsing errors and continue
 * @property {boolean} debug - should output debug informations
 */
const Parser = function (lexer, ast) {
  this.lexer = lexer;
  this.ast = ast;
  this.tok = lexer.tok;
  this.EOF = lexer.EOF;
  this.token = null;
  this.prev = null;
  this.debug = false;
  this.version = 704;
  this.extractDoc = false;
  this.extractTokens = false;
  this.suppressErrors = false;
  const mapIt = function (item) {
    return [item, null];
  };
  this.entries = {
    // reserved_non_modifiers
    IDENTIFIER: new Map(
      [
        this.tok.T_ABSTRACT,
        this.tok.T_ARRAY,
        this.tok.T_AS,
        this.tok.T_BREAK,
        this.tok.T_CALLABLE,
        this.tok.T_CASE,
        this.tok.T_CATCH,
        this.tok.T_CLASS,
        this.tok.T_CLASS_C,
        this.tok.T_CLONE,
        this.tok.T_CONST,
        this.tok.T_CONTINUE,
        this.tok.T_DECLARE,
        this.tok.T_DEFAULT,
        this.tok.T_DIR,
        this.tok.T_DO,
        this.tok.T_ECHO,
        this.tok.T_ELSE,
        this.tok.T_ELSEIF,
        this.tok.T_EMPTY,
        this.tok.T_ENDDECLARE,
        this.tok.T_ENDFOR,
        this.tok.T_ENDFOREACH,
        this.tok.T_ENDIF,
        this.tok.T_ENDSWITCH,
        this.tok.T_ENDWHILE,
        this.tok.T_EVAL,
        this.tok.T_EXIT,
        this.tok.T_EXTENDS,
        this.tok.T_FILE,
        this.tok.T_FINAL,
        this.tok.T_FINALLY,
        this.tok.T_FN,
        this.tok.T_FOR,
        this.tok.T_FOREACH,
        this.tok.T_FUNC_C,
        this.tok.T_FUNCTION,
        this.tok.T_GLOBAL,
        this.tok.T_GOTO,
        this.tok.T_IF,
        this.tok.T_IMPLEMENTS,
        this.tok.T_INCLUDE,
        this.tok.T_INCLUDE_ONCE,
        this.tok.T_INSTANCEOF,
        this.tok.T_INSTEADOF,
        this.tok.T_INTERFACE,
        this.tok.T_ISSET,
        this.tok.T_LINE,
        this.tok.T_LIST,
        this.tok.T_LOGICAL_AND,
        this.tok.T_LOGICAL_OR,
        this.tok.T_LOGICAL_XOR,
        this.tok.T_METHOD_C,
        this.tok.T_NAMESPACE,
        this.tok.T_NEW,
        this.tok.T_NS_C,
        this.tok.T_PRINT,
        this.tok.T_PRIVATE,
        this.tok.T_PROTECTED,
        this.tok.T_PUBLIC,
        this.tok.T_REQUIRE,
        this.tok.T_REQUIRE_ONCE,
        this.tok.T_RETURN,
        this.tok.T_STATIC,
        this.tok.T_SWITCH,
        this.tok.T_THROW,
        this.tok.T_TRAIT,
        this.tok.T_TRY,
        this.tok.T_UNSET,
        this.tok.T_USE,
        this.tok.T_VAR,
        this.tok.T_WHILE,
        this.tok.T_YIELD,
      ].map(mapIt)
    ),
    VARIABLE: new Map(
      [
        this.tok.T_VARIABLE,
        "$",
        "&",
        this.tok.T_NS_SEPARATOR,
        this.tok.T_STRING,
        this.tok.T_NAMESPACE,
        this.tok.T_STATIC,
      ].map(mapIt)
    ),
    SCALAR: new Map(
      [
        this.tok.T_CONSTANT_ENCAPSED_STRING,
        this.tok.T_START_HEREDOC,
        this.tok.T_LNUMBER,
        this.tok.T_DNUMBER,
        this.tok.T_ARRAY,
        "[",
        this.tok.T_CLASS_C,
        this.tok.T_TRAIT_C,
        this.tok.T_FUNC_C,
        this.tok.T_METHOD_C,
        this.tok.T_LINE,
        this.tok.T_FILE,
        this.tok.T_DIR,
        this.tok.T_NS_C,
        '"',
        'b"',
        'B"',
        "-",
        this.tok.T_NS_SEPARATOR,
      ].map(mapIt)
    ),
    T_MAGIC_CONST: new Map(
      [
        this.tok.T_CLASS_C,
        this.tok.T_TRAIT_C,
        this.tok.T_FUNC_C,
        this.tok.T_METHOD_C,
        this.tok.T_LINE,
        this.tok.T_FILE,
        this.tok.T_DIR,
        this.tok.T_NS_C,
      ].map(mapIt)
    ),
    T_MEMBER_FLAGS: new Map(
      [
        this.tok.T_PUBLIC,
        this.tok.T_PRIVATE,
        this.tok.T_PROTECTED,
        this.tok.T_STATIC,
        this.tok.T_ABSTRACT,
        this.tok.T_FINAL,
      ].map(mapIt)
    ),
    EOS: new Map([";", this.EOF, this.tok.T_INLINE_HTML].map(mapIt)),
    EXPR: new Map(
      [
        "@",
        "-",
        "+",
        "!",
        "~",
        "(",
        "`",
        this.tok.T_LIST,
        this.tok.T_CLONE,
        this.tok.T_INC,
        this.tok.T_DEC,
        this.tok.T_NEW,
        this.tok.T_ISSET,
        this.tok.T_EMPTY,
        this.tok.T_INCLUDE,
        this.tok.T_INCLUDE_ONCE,
        this.tok.T_REQUIRE,
        this.tok.T_REQUIRE_ONCE,
        this.tok.T_EVAL,
        this.tok.T_INT_CAST,
        this.tok.T_DOUBLE_CAST,
        this.tok.T_STRING_CAST,
        this.tok.T_ARRAY_CAST,
        this.tok.T_OBJECT_CAST,
        this.tok.T_BOOL_CAST,
        this.tok.T_UNSET_CAST,
        this.tok.T_EXIT,
        this.tok.T_PRINT,
        this.tok.T_YIELD,
        this.tok.T_STATIC,
        this.tok.T_FUNCTION,
        this.tok.T_FN,
        // using VARIABLES :
        this.tok.T_VARIABLE,
        "$",
        this.tok.T_NS_SEPARATOR,
        this.tok.T_STRING,
        // using SCALAR :
        this.tok.T_STRING, // @see variable.js line 45 > conflict with variable = shift/reduce :)
        this.tok.T_CONSTANT_ENCAPSED_STRING,
        this.tok.T_START_HEREDOC,
        this.tok.T_LNUMBER,
        this.tok.T_DNUMBER,
        this.tok.T_ARRAY,
        "[",
        this.tok.T_CLASS_C,
        this.tok.T_TRAIT_C,
        this.tok.T_FUNC_C,
        this.tok.T_METHOD_C,
        this.tok.T_LINE,
        this.tok.T_FILE,
        this.tok.T_DIR,
        this.tok.T_NS_C,
        '"',
        'b"',
        'B"',
        "-",
        this.tok.T_NS_SEPARATOR,
      ].map(mapIt)
    ),
  };
};

/**
 * helper : gets a token name
 * @function Parser#getTokenName
 * @memberOf module:php-parser
 */
Parser.prototype.getTokenName = function (token) {
  if (!isNumber(token)) {
    return "'" + token + "'";
  } else {
    if (token == this.EOF) return "the end of file (EOF)";
    return this.lexer.engine.tokens.values[token];
  }
};

/**
 * main entry point : converts a source code to AST
 * @function Parser#parse
 * @memberOf module:php-parser
 */
Parser.prototype.parse = function (code, filename) {
  this._errors = [];
  this.filename = filename || "eval";
  this.currentNamespace = [""];
  if (this.extractDoc) {
    this._docs = [];
  } else {
    this._docs = null;
  }
  if (this.extractTokens) {
    this._tokens = [];
  } else {
    this._tokens = null;
  }
  this._docIndex = 0;
  this._lastNode = null;
  this.lexer.setInput(code);
  this.lexer.all_tokens = this.extractTokens;
  this.lexer.comment_tokens = this.extractDoc;
  this.length = this.lexer._input.length;
  this.innerList = false;
  this.innerListForm = false;
  const program = this.node("program");
  const childs = [];
  this.next();
  while (this.token != this.EOF) {
    childs.push(this.read_start());
  }
  // append last comment
  if (
    childs.length === 0 &&
    this.extractDoc &&
    this._docs.length > this._docIndex
  ) {
    childs.push(this.node("noop")());
  }
  // #176 : register latest position
  this.prev = [
    this.lexer.yylloc.last_line,
    this.lexer.yylloc.last_column,
    this.lexer.offset,
  ];
  const result = program(childs, this._errors, this._docs, this._tokens);
  if (this.debug) {
    const errors = this.ast.checkNodes();
    if (errors.length > 0) {
      errors.forEach(function (error) {
        if (error.position) {
          // eslint-disable-next-line no-console
          console.log(
            "Node at line " +
              error.position.line +
              ", column " +
              error.position.column
          );
        }
        // eslint-disable-next-line no-console
        console.log(error.stack.join("\n"));
      });
      throw new Error("Some nodes are not closed");
    }
  }
  return result;
};

/**
 * Raise an error
 * @function Parser#raiseError
 * @memberOf module:php-parser
 */
Parser.prototype.raiseError = function (message, msgExpect, expect, token) {
  message += " on line " + this.lexer.yylloc.first_line;
  if (!this.suppressErrors) {
    const err = new SyntaxError(
      message,
      this.filename,
      this.lexer.yylloc.first_line
    );
    err.lineNumber = this.lexer.yylloc.first_line;
    err.fileName = this.filename;
    err.columnNumber = this.lexer.yylloc.first_column;
    throw err;
  }
  // Error node :
  const node = this.ast.prepare("error", null, this)(
    message,
    token,
    this.lexer.yylloc.first_line,
    expect
  );
  this._errors.push(node);
  return node;
};

/**
 * handling errors
 * @function Parser#error
 * @memberOf module:php-parser
 */
Parser.prototype.error = function (expect) {
  let msg = "Parse Error : syntax error";
  let token = this.getTokenName(this.token);
  let msgExpect = "";

  if (this.token !== this.EOF) {
    if (isNumber(this.token)) {
      let symbol = this.text();
      if (symbol.length > 10) {
        symbol = symbol.substring(0, 7) + "...";
      }
      token = "'" + symbol + "' (" + token + ")";
    }
    msg += ", unexpected " + token;
  }
  if (expect && !Array.isArray(expect)) {
    if (isNumber(expect) || expect.length === 1) {
      msgExpect = ", expecting " + this.getTokenName(expect);
    }
    msg += msgExpect;
  }
  return this.raiseError(msg, msgExpect, expect, token);
};

/**
 * Creates a new AST node
 * @function Parser#node
 * @memberOf module:php-parser
 */
Parser.prototype.node = function (name) {
  if (this.extractDoc) {
    let docs = null;
    if (this._docIndex < this._docs.length) {
      docs = this._docs.slice(this._docIndex);
      this._docIndex = this._docs.length;
      if (this.debug) {
        // eslint-disable-next-line no-console
        console.log(new Error("Append docs on " + name));
        // eslint-disable-next-line no-console
        console.log(docs);
      }
    }
    const node = this.ast.prepare(name, docs, this);
    /*
     * TOKENS :
     * node1 commentA token commmentB node2 commentC token commentD node3 commentE token
     *
     * AST :
     * structure:S1 [
     *    left: node1 ( trail: commentA ),
     *    right: structure:S2 [
     *       node2 (lead: commentB, trail: commentC),
     *       node3 (lead: commentD)
     *    ],
     *    trail: commentE
     * ]
     *
     * Algorithm :
     *
     * Attach the last comments on parent of current node
     * If a new node is started and the parent has a trailing comment
     * the move it on previous node
     *
     * start S2
     * start node1
     * consume node1 & set commentA as trailingComment on S2
     * start S2
     * S1 has a trailingComment, attach it on node1
     * ...
     * NOTE : As the trailingComment Behavior depends on AST, it will be build on
     * the AST layer - last child node will keep it's trailingComment nodes
     */
    node.postBuild = function (self) {
      if (this._docIndex < this._docs.length) {
        if (this._lastNode) {
          const offset = this.prev[2];
          let max = this._docIndex;
          for (; max < this._docs.length; max++) {
            if (this._docs[max].offset > offset) {
              break;
            }
          }
          if (max > this._docIndex) {
            // inject trailing comment on child node
            this._lastNode.setTrailingComments(
              this._docs.slice(this._docIndex, max)
            );
            this._docIndex = max;
          }
        } else if (this.token === this.EOF) {
          // end of content
          self.setTrailingComments(this._docs.slice(this._docIndex));
          this._docIndex = this._docs.length;
        }
      }
      this._lastNode = self;
    }.bind(this);
    return node;
  }
  return this.ast.prepare(name, null, this);
};

/**
 * expects an end of statement or end of file
 * @function Parser#expectEndOfStatement
 * @memberOf module:php-parser
 * @return {boolean}
 */
Parser.prototype.expectEndOfStatement = function (node) {
  if (this.token === ";") {
    // include only real ';' statements
    // https://github.com/glayzzle/php-parser/issues/164
    if (node && this.lexer.yytext === ";") {
      node.includeToken(this);
    }
  } else if (this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) {
    this.error(";");
    return false;
  }
  this.next();
  return true;
};

const ignoreStack = ["parser.next", "parser.node", "parser.showlog"];
/**
 * outputs some debug information on current token
 * @private
 * @function Parser#showlog
 * @memberOf module:php-parser
 */
Parser.prototype.showlog = function () {
  const stack = new Error().stack.split("\n");
  let line;
  for (let offset = 2; offset < stack.length; offset++) {
    line = stack[offset].trim();
    let found = false;
    for (let i = 0; i < ignoreStack.length; i++) {
      if (line.substring(3, 3 + ignoreStack[i].length) === ignoreStack[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      break;
    }
  }
  // eslint-disable-next-line no-console
  console.log(
    "Line " +
      this.lexer.yylloc.first_line +
      " : " +
      this.getTokenName(this.token) +
      ">" +
      this.lexer.yytext +
      "<" +
      " @-->" +
      line
  );
  return this;
};

/**
 * Force the parser to check the current token.
 *
 * If the current token does not match to expected token,
 * the an error will be raised.
 *
 * If the suppressError mode is activated, then the error will
 * be added to the program error stack and this function will return `false`.
 *
 * @function Parser#expect
 * @memberOf module:php-parser
 * @param {String|Number} token
 * @return {boolean}
 * @throws Error
 */
Parser.prototype.expect = function (token) {
  if (Array.isArray(token)) {
    if (token.indexOf(this.token) === -1) {
      this.error(token);
      return false;
    }
  } else if (this.token != token) {
    this.error(token);
    return false;
  }
  return true;
};

/**
 * Returns the current token contents
 * @function Parser#text
 * @memberOf module:php-parser
 * @return {String}
 */
Parser.prototype.text = function () {
  return this.lexer.yytext;
};

/**
 * consume the next token
 * @function Parser#next
 * @memberOf module:php-parser
 */
Parser.prototype.next = function () {
  // prepare the back command
  if (this.token !== ";" || this.lexer.yytext === ";") {
    // ignore '?>' from automated resolution
    // https://github.com/glayzzle/php-parser/issues/168
    this.prev = [
      this.lexer.yylloc.last_line,
      this.lexer.yylloc.last_column,
      this.lexer.offset,
    ];
  }

  // eating the token
  this.lex();

  // showing the debug
  if (this.debug) {
    this.showlog();
  }

  // handling comments
  if (this.extractDoc) {
    while (
      this.token === this.tok.T_COMMENT ||
      this.token === this.tok.T_DOC_COMMENT
    ) {
      // APPEND COMMENTS
      if (this.token === this.tok.T_COMMENT) {
        this._docs.push(this.read_comment());
      } else {
        this._docs.push(this.read_doc_comment());
      }
    }
  }

  return this;
};

/**
 * Eating a token
 * @function Parser#lex
 * @memberOf module:php-parser
 */
Parser.prototype.lex = function () {
  // append on token stack
  if (this.extractTokens) {
    do {
      // the token
      this.token = this.lexer.lex() || this.EOF;
      if (this.token === this.EOF) return this;
      let entry = this.lexer.yytext;
      if (this.lexer.engine.tokens.values.hasOwnProperty(this.token)) {
        entry = [
          this.lexer.engine.tokens.values[this.token],
          entry,
          this.lexer.yylloc.first_line,
          this.lexer.yylloc.first_offset,
          this.lexer.offset,
        ];
      } else {
        entry = [
          null,
          entry,
          this.lexer.yylloc.first_line,
          this.lexer.yylloc.first_offset,
          this.lexer.offset,
        ];
      }
      this._tokens.push(entry);
      if (this.token === this.tok.T_CLOSE_TAG) {
        // https://github.com/php/php-src/blob/7ff186434e82ee7be7c59d0db9a976641cf7b09c/Zend/zend_compile.c#L1680
        this.token = ";";
        return this;
      } else if (this.token === this.tok.T_OPEN_TAG_WITH_ECHO) {
        this.token = this.tok.T_ECHO;
        return this;
      }
    } while (
      this.token === this.tok.T_WHITESPACE || // ignore white space
      (!this.extractDoc &&
        (this.token === this.tok.T_COMMENT || // ignore single lines comments
          this.token === this.tok.T_DOC_COMMENT)) || // ignore doc comments
      // ignore open tags
      this.token === this.tok.T_OPEN_TAG
    );
  } else {
    this.token = this.lexer.lex() || this.EOF;
  }
  return this;
};

/**
 * Check if token is of specified type
 * @function Parser#is
 * @memberOf module:php-parser
 */
Parser.prototype.is = function (type) {
  if (Array.isArray(type)) {
    return type.indexOf(this.token) !== -1;
  }
  return this.entries[type].has(this.token);
};

// extends the parser with syntax files
[
  __webpack_require__(22),
  __webpack_require__(23),
  __webpack_require__(24),
  __webpack_require__(25),
  __webpack_require__(26),
  __webpack_require__(27),
  __webpack_require__(28),
  __webpack_require__(29),
  __webpack_require__(30),
  __webpack_require__(31),
  __webpack_require__(32),
  __webpack_require__(33),
  __webpack_require__(34),
  __webpack_require__(35),
  __webpack_require__(36),
].forEach(function (ext) {
  for (const k in ext) {
    if (Parser.prototype.hasOwnProperty(k)) {
      // @see https://github.com/glayzzle/php-parser/issues/234
      throw new Error("Function " + k + " is already defined - collision");
    }
    Parser.prototype[k] = ext[k];
  }
});

module.exports = Parser;


/***/ }),
/* 22 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Parse an array
   * ```ebnf
   * array ::= T_ARRAY '(' array_pair_list ')' |
   *   '[' array_pair_list ']'
   * ```
   */
  read_array: function () {
    let expect = null;
    let shortForm = false;
    const result = this.node("array");

    if (this.token === this.tok.T_ARRAY) {
      this.next().expect("(");
      expect = ")";
    } else {
      shortForm = true;
      expect = "]";
    }
    let items = [];
    if (this.next().token !== expect) {
      items = this.read_array_pair_list(shortForm);
    }
    this.expect(expect);
    this.next();
    return result(shortForm, items);
  },
  /*
   * Reads an array of items
   * ```ebnf
   * array_pair_list ::= array_pair (',' array_pair?)*
   * ```
   */
  read_array_pair_list: function (shortForm) {
    const self = this;
    return this.read_list(
      function () {
        return self.read_array_pair(shortForm);
      },
      ",",
      true
    );
  },
  /*
   * Reads an entry
   * array_pair:
   *  expr T_DOUBLE_ARROW expr
   *  | expr
   *  | expr T_DOUBLE_ARROW '&' variable
   *  | '&' variable
   *  | expr T_DOUBLE_ARROW T_LIST '(' array_pair_list ')'
   *  | T_LIST '(' array_pair_list ')'
   */
  read_array_pair: function (shortForm) {
    if (
      (!shortForm && this.token === ")") ||
      (shortForm && this.token === "]")
    ) {
      return;
    }

    if (this.token === ",") {
      return this.node("noop")();
    }

    const entry = this.node("entry");

    let key = null;
    let value = null;
    let byRef = false;
    let unpack = false;

    if (this.token === "&") {
      this.next();
      byRef = true;
      value = this.read_variable(true, false);
    } else if (this.token === this.tok.T_ELLIPSIS && this.version >= 704) {
      this.next();
      if (this.token === "&") {
        this.error();
      }
      unpack = true;
      value = this.read_expr();
    } else {
      const expr = this.read_expr();

      if (this.token === this.tok.T_DOUBLE_ARROW) {
        this.next();
        key = expr;

        if (this.token === "&") {
          this.next();
          byRef = true;
          value = this.read_variable(true, false);
        } else {
          value = this.read_expr();
        }
      } else {
        value = expr;
      }
    }

    return entry(key, value, byRef, unpack);
  },
};


/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * reading a class
   * ```ebnf
   * class ::= class_scope? T_CLASS T_STRING (T_EXTENDS NAMESPACE_NAME)? (T_IMPLEMENTS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' CLASS_BODY '}'
   * ```
   */
  read_class_declaration_statement: function () {
    const result = this.node("class");
    const flag = this.read_class_modifiers();
    // graceful mode : ignore token & go next
    if (this.token !== this.tok.T_CLASS) {
      this.error(this.tok.T_CLASS);
      this.next();
      return null;
    }
    this.next().expect(this.tok.T_STRING);
    let propName = this.node("identifier");
    const name = this.text();
    this.next();
    propName = propName(name);
    const propExtends = this.read_extends_from();
    const propImplements = this.read_implements_list();
    this.expect("{");
    const body = this.next().read_class_body();
    return result(propName, propExtends, propImplements, body, flag);
  },

  read_class_modifiers: function () {
    return [0, 0, this.read_class_modifier()];
  },

  read_class_modifier: function () {
    const result = 0;

    if (this.token === this.tok.T_ABSTRACT) {
      this.next();
      return 1;
    } else if (this.token === this.tok.T_FINAL) {
      this.next();
      return 2;
    }

    return result;
  },

  /*
   * Reads a class body
   * ```ebnf
   *   class_body ::= (member_flags? (T_VAR | T_STRING | T_FUNCTION))*
   * ```
   */
  read_class_body: function () {
    let result = [];

    while (this.token !== this.EOF && this.token !== "}") {
      if (this.token === this.tok.T_COMMENT) {
        result.push(this.read_comment());
        continue;
      }

      if (this.token === this.tok.T_DOC_COMMENT) {
        result.push(this.read_doc_comment());
        continue;
      }

      // check T_USE trait
      if (this.token === this.tok.T_USE) {
        result = result.concat(this.read_trait_use_statement());
        continue;
      }

      // read member flags
      const flags = this.read_member_flags(false);

      // check constant
      if (this.token === this.tok.T_CONST) {
        const constants = this.read_constant_list(flags);
        if (this.expect(";")) {
          this.next();
        }
        result = result.concat(constants);
        continue;
      }

      // jump over T_VAR then land on T_VARIABLE
      if (this.token === this.tok.T_VAR) {
        this.next().expect(this.tok.T_VARIABLE);
        flags[0] = null; // public (as null)
        flags[1] = 0; // non static var
      }

      if (this.token === this.tok.T_FUNCTION) {
        // reads a function
        result.push(this.read_function(false, flags));
      } else if (
        this.token === this.tok.T_VARIABLE ||
        // support https://wiki.php.net/rfc/typed_properties_v2
        (this.version >= 704 &&
          (this.token === "?" ||
            this.token === this.tok.T_CALLABLE ||
            this.token === this.tok.T_ARRAY ||
            this.token === this.tok.T_NS_SEPARATOR ||
            this.token === this.tok.T_STRING ||
            this.token === this.tok.T_NAMESPACE))
      ) {
        // reads a variable
        const variables = this.read_variable_list(flags);
        this.expect(";");
        this.next();
        result = result.concat(variables);
      } else {
        // raise an error
        this.error([
          this.tok.T_CONST,
          this.tok.T_VARIABLE,
          this.tok.T_FUNCTION,
        ]);
        // ignore token
        this.next();
      }
    }
    this.expect("}");
    this.next();
    return result;
  },
  /*
   * Reads variable list
   * ```ebnf
   *  variable_list ::= (variable_declaration ',')* variable_declaration
   * ```
   */
  read_variable_list: function (flags) {
    const result = this.node("propertystatement");

    const properties = this.read_list(
      /*
       * Reads a variable declaration
       *
       * ```ebnf
       *  variable_declaration ::= T_VARIABLE '=' scalar
       * ```
       */
      function read_variable_declaration() {
        const result = this.node("property");
        const [nullable, type] = this.read_optional_type();
        this.expect(this.tok.T_VARIABLE);
        let propName = this.node("identifier");
        const name = this.text().substring(1); // ignore $
        this.next();
        propName = propName(name);
        if (this.token === ";" || this.token === ",") {
          return result(propName, null, nullable, type);
        } else if (this.token === "=") {
          // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L815
          return result(propName, this.next().read_expr(), nullable, type);
        } else {
          this.expect([",", ";", "="]);
          return result(propName, null, nullable, type);
        }
      },
      ","
    );

    return result(null, properties, flags);
  },
  /*
   * Reads constant list
   * ```ebnf
   *  constant_list ::= T_CONST (constant_declaration ',')* constant_declaration
   * ```
   */
  read_constant_list: function (flags) {
    if (this.expect(this.tok.T_CONST)) {
      this.next();
    }
    const result = this.node("classconstant");
    const items = this.read_list(
      /*
       * Reads a constant declaration
       *
       * ```ebnf
       *  constant_declaration ::= (T_STRING | IDENTIFIER) '=' expr
       * ```
       * @return {Constant} [:link:](AST.md#constant)
       */
      function read_constant_declaration() {
        const result = this.node("constant");
        let constName = null;
        let value = null;
        if (
          this.token === this.tok.T_STRING ||
          (this.version >= 700 && this.is("IDENTIFIER"))
        ) {
          constName = this.node("identifier");
          const name = this.text();
          this.next();
          constName = constName(name);
        } else {
          this.expect("IDENTIFIER");
        }
        if (this.expect("=")) {
          value = this.next().read_expr();
        }
        return result(constName, value);
      },
      ","
    );

    return result(null, items, flags);
  },
  /*
   * Read member flags
   * @return array
   *  1st index : 0 => public, 1 => protected, 2 => private
   *  2nd index : 0 => instance member, 1 => static member
   *  3rd index : 0 => normal, 1 => abstract member, 2 => final member
   */
  read_member_flags: function (asInterface) {
    const result = [-1, -1, -1];
    if (this.is("T_MEMBER_FLAGS")) {
      let idx = 0,
        val = 0;
      do {
        switch (this.token) {
          case this.tok.T_PUBLIC:
            idx = 0;
            val = 0;
            break;
          case this.tok.T_PROTECTED:
            idx = 0;
            val = 1;
            break;
          case this.tok.T_PRIVATE:
            idx = 0;
            val = 2;
            break;
          case this.tok.T_STATIC:
            idx = 1;
            val = 1;
            break;
          case this.tok.T_ABSTRACT:
            idx = 2;
            val = 1;
            break;
          case this.tok.T_FINAL:
            idx = 2;
            val = 2;
            break;
        }
        if (asInterface) {
          if (idx == 0 && val == 2) {
            // an interface can't be private
            this.expect([this.tok.T_PUBLIC, this.tok.T_PROTECTED]);
            val = -1;
          } else if (idx == 2 && val == 1) {
            // an interface cant be abstract
            this.error();
            val = -1;
          }
        }
        if (result[idx] !== -1) {
          // already defined flag
          this.error();
        } else if (val !== -1) {
          result[idx] = val;
        }
      } while (this.next().is("T_MEMBER_FLAGS"));
    }

    if (result[1] == -1) result[1] = 0;
    if (result[2] == -1) result[2] = 0;
    return result;
  },

  /*
   * optional_type:
   *	  /- empty -/	{ $$ = NULL; }
   *   |	type_expr	{ $$ = $1; }
   * ;
   *
   * type_expr:
   *		type		{ $$ = $1; }
   *	|	'?' type	{ $$ = $2; $$->attr |= ZEND_TYPE_NULLABLE; }
   *	|	union_type	{ $$ = $1; }
   * ;
   *
   * type:
   * 		T_ARRAY		{ $$ = zend_ast_create_ex(ZEND_AST_TYPE, IS_ARRAY); }
   * 	|	T_CALLABLE	{ $$ = zend_ast_create_ex(ZEND_AST_TYPE, IS_CALLABLE); }
   * 	|	name		{ $$ = $1; }
   * ;
   *
   * union_type:
   * 		type '|' type       { $$ = zend_ast_create_list(2, ZEND_AST_TYPE_UNION, $1, $3); }
   * 	|	union_type '|' type { $$ = zend_ast_list_add($1, $3); }
   * ;
   */
  read_optional_type: function () {
    let nullable = false;
    if (this.token === "?") {
      nullable = true;
      this.next();
    }
    let type = this.read_type();
    if (nullable && !type) {
      this.raiseError(
        "Expecting a type definition combined with nullable operator"
      );
    }
    if (!nullable && !type) {
      return [false, null];
    }
    if (this.token === "|") {
      type = [type];
      do {
        this.next();
        const variant = this.read_type();
        if (!variant) {
          this.raiseError("Expecting a type definition");
          break;
        }
        type.push(variant);
      } while (this.token === "|");
    }
    return [nullable, type];
  },

  /*
   * reading an interface
   * ```ebnf
   * interface ::= T_INTERFACE T_STRING (T_EXTENDS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' INTERFACE_BODY '}'
   * ```
   */
  read_interface_declaration_statement: function () {
    const result = this.node("interface");
    if (this.token !== this.tok.T_INTERFACE) {
      this.error(this.tok.T_INTERFACE);
      this.next();
      return null;
    }
    this.next().expect(this.tok.T_STRING);
    let propName = this.node("identifier");
    const name = this.text();
    this.next();
    propName = propName(name);
    const propExtends = this.read_interface_extends_list();
    this.expect("{");
    const body = this.next().read_interface_body();
    return result(propName, propExtends, body);
  },
  /*
   * Reads an interface body
   * ```ebnf
   *   interface_body ::= (member_flags? (T_CONST | T_FUNCTION))*
   * ```
   */
  read_interface_body: function () {
    let result = [];

    while (this.token !== this.EOF && this.token !== "}") {
      if (this.token === this.tok.T_COMMENT) {
        result.push(this.read_comment());
        continue;
      }

      if (this.token === this.tok.T_DOC_COMMENT) {
        result.push(this.read_doc_comment());
        continue;
      }

      // read member flags
      const flags = this.read_member_flags(true);

      // check constant
      if (this.token == this.tok.T_CONST) {
        const constants = this.read_constant_list(flags);
        if (this.expect(";")) {
          this.next();
        }
        result = result.concat(constants);
      } else if (this.token === this.tok.T_FUNCTION) {
        // reads a function
        const method = this.read_function_declaration(2, flags);
        method.parseFlags(flags);
        result.push(method);
        if (this.expect(";")) {
          this.next();
        }
      } else {
        // raise an error
        this.error([this.tok.T_CONST, this.tok.T_FUNCTION]);
        this.next();
      }
    }
    if (this.expect("}")) {
      this.next();
    }
    return result;
  },
  /*
   * reading a trait
   * ```ebnf
   * trait ::= T_TRAIT T_STRING (T_EXTENDS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' FUNCTION* '}'
   * ```
   */
  read_trait_declaration_statement: function () {
    const result = this.node("trait");
    // graceful mode : ignore token & go next
    if (this.token !== this.tok.T_TRAIT) {
      this.error(this.tok.T_TRAIT);
      this.next();
      return null;
    }
    this.next().expect(this.tok.T_STRING);
    let propName = this.node("identifier");
    const name = this.text();
    this.next();
    propName = propName(name);
    this.expect("{");
    const body = this.next().read_class_body();
    return result(propName, body);
  },
  /*
   * reading a use statement
   * ```ebnf
   * trait_use_statement ::= namespace_name (',' namespace_name)* ('{' trait_use_alias '}')?
   * ```
   */
  read_trait_use_statement: function () {
    // defines use statements
    const node = this.node("traituse");
    this.expect(this.tok.T_USE) && this.next();
    const traits = [this.read_namespace_name()];
    let adaptations = null;
    while (this.token === ",") {
      traits.push(this.next().read_namespace_name());
    }
    if (this.token === "{") {
      adaptations = [];
      // defines alias statements
      while (this.next().token !== this.EOF) {
        if (this.token === "}") break;
        adaptations.push(this.read_trait_use_alias());
        this.expect(";");
      }
      if (this.expect("}")) {
        this.next();
      }
    } else {
      if (this.expect(";")) {
        this.next();
      }
    }
    return node(traits, adaptations);
  },
  /*
   * Reading trait alias
   * ```ebnf
   * trait_use_alias ::= namespace_name ( T_DOUBLE_COLON T_STRING )? (T_INSTEADOF namespace_name) | (T_AS member_flags? T_STRING)
   * ```
   * name list : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L303
   * trait adaptation : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L742
   */
  read_trait_use_alias: function () {
    const node = this.node();
    let trait = null;
    let method;

    if (this.is("IDENTIFIER")) {
      method = this.node("identifier");
      const methodName = this.text();
      this.next();
      method = method(methodName);
    } else {
      method = this.read_namespace_name();

      if (this.token === this.tok.T_DOUBLE_COLON) {
        this.next();
        if (
          this.token === this.tok.T_STRING ||
          (this.version >= 700 && this.is("IDENTIFIER"))
        ) {
          trait = method;
          method = this.node("identifier");
          const methodName = this.text();
          this.next();
          method = method(methodName);
        } else {
          this.expect(this.tok.T_STRING);
        }
      } else {
        // convert identifier as string
        method = method.name;
      }
    }

    // handle trait precedence
    if (this.token === this.tok.T_INSTEADOF) {
      return node(
        "traitprecedence",
        trait,
        method,
        this.next().read_name_list()
      );
    } else if (this.token === this.tok.T_AS) {
      // handle trait alias
      let flags = null;
      let alias = null;
      if (this.next().is("T_MEMBER_FLAGS")) {
        flags = this.read_member_flags();
      }

      if (
        this.token === this.tok.T_STRING ||
        (this.version >= 700 && this.is("IDENTIFIER"))
      ) {
        alias = this.node("identifier");
        const name = this.text();
        this.next();
        alias = alias(name);
      } else if (flags === false) {
        // no visibility flags and no name => too bad
        this.expect(this.tok.T_STRING);
      }

      return node("traitalias", trait, method, alias, flags);
    }

    // handle errors
    this.expect([this.tok.T_AS, this.tok.T_INSTEADOF]);
    return node("traitalias", trait, method, null, null);
  },
};


/***/ }),
/* 24 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   *  Comments with // or # or / * ... * /
   */
  read_comment: function () {
    const text = this.text();
    let result = this.ast.prepare(
      text.substring(0, 2) === "/*" ? "commentblock" : "commentline",
      null,
      this
    );
    const offset = this.lexer.yylloc.first_offset;
    // handle location on comment
    const prev = this.prev;
    this.prev = [
      this.lexer.yylloc.last_line,
      this.lexer.yylloc.last_column,
      this.lexer.offset,
    ];
    this.lex();
    result = result(text);
    result.offset = offset;
    this.prev = prev;
    return result;
  },
  /*
   * Comments with / ** ... * /
   */
  read_doc_comment: function () {
    let result = this.ast.prepare("commentblock", null, this);
    const offset = this.lexer.yylloc.first_offset;
    const text = this.text();
    const prev = this.prev;
    this.prev = [
      this.lexer.yylloc.last_line,
      this.lexer.yylloc.last_column,
      this.lexer.offset,
    ];
    this.lex();
    result = result(text);
    result.offset = offset;
    this.prev = prev;
    return result;
  },
};


/***/ }),
/* 25 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  read_expr: function (expr) {
    const result = this.node();
    if (this.token === "@") {
      if (!expr) {
        expr = this.next().read_expr();
      }
      return result("silent", expr);
    }
    if (!expr) {
      expr = this.read_expr_item();
    }
    // binary operations
    if (this.token === "|")
      return result("bin", "|", expr, this.next().read_expr());
    if (this.token === "&")
      return result("bin", "&", expr, this.next().read_expr());
    if (this.token === "^")
      return result("bin", "^", expr, this.next().read_expr());
    if (this.token === ".")
      return result("bin", ".", expr, this.next().read_expr());
    if (this.token === "+")
      return result("bin", "+", expr, this.next().read_expr());
    if (this.token === "-")
      return result("bin", "-", expr, this.next().read_expr());
    if (this.token === "*")
      return result("bin", "*", expr, this.next().read_expr());
    if (this.token === "/")
      return result("bin", "/", expr, this.next().read_expr());
    if (this.token === "%")
      return result("bin", "%", expr, this.next().read_expr());
    if (this.token === this.tok.T_POW)
      return result("bin", "**", expr, this.next().read_expr());
    if (this.token === this.tok.T_SL)
      return result("bin", "<<", expr, this.next().read_expr());
    if (this.token === this.tok.T_SR)
      return result("bin", ">>", expr, this.next().read_expr());
    // more binary operations (formerly bool)
    if (this.token === this.tok.T_BOOLEAN_OR)
      return result("bin", "||", expr, this.next().read_expr());
    if (this.token === this.tok.T_LOGICAL_OR)
      return result("bin", "or", expr, this.next().read_expr());
    if (this.token === this.tok.T_BOOLEAN_AND)
      return result("bin", "&&", expr, this.next().read_expr());
    if (this.token === this.tok.T_LOGICAL_AND)
      return result("bin", "and", expr, this.next().read_expr());
    if (this.token === this.tok.T_LOGICAL_XOR)
      return result("bin", "xor", expr, this.next().read_expr());
    if (this.token === this.tok.T_IS_IDENTICAL)
      return result("bin", "===", expr, this.next().read_expr());
    if (this.token === this.tok.T_IS_NOT_IDENTICAL)
      return result("bin", "!==", expr, this.next().read_expr());
    if (this.token === this.tok.T_IS_EQUAL)
      return result("bin", "==", expr, this.next().read_expr());
    if (this.token === this.tok.T_IS_NOT_EQUAL)
      return result("bin", "!=", expr, this.next().read_expr());
    if (this.token === "<")
      return result("bin", "<", expr, this.next().read_expr());
    if (this.token === ">")
      return result("bin", ">", expr, this.next().read_expr());
    if (this.token === this.tok.T_IS_SMALLER_OR_EQUAL)
      return result("bin", "<=", expr, this.next().read_expr());
    if (this.token === this.tok.T_IS_GREATER_OR_EQUAL)
      return result("bin", ">=", expr, this.next().read_expr());
    if (this.token === this.tok.T_SPACESHIP)
      return result("bin", "<=>", expr, this.next().read_expr());
    if (this.token === this.tok.T_INSTANCEOF) {
      expr = result(
        "bin",
        "instanceof",
        expr,
        this.next().read_class_name_reference()
      );
      if (
        this.token !== ";" &&
        this.token !== this.tok.T_INLINE_HTML &&
        this.token !== this.EOF
      ) {
        expr = this.read_expr(expr);
      }
    }

    // extra operations :
    // $username = $_GET['user'] ?? 'nobody';
    if (this.token === this.tok.T_COALESCE)
      return result("bin", "??", expr, this.next().read_expr());

    // extra operations :
    // $username = $_GET['user'] ? true : false;
    if (this.token === "?") {
      let trueArg = null;
      if (this.next().token !== ":") {
        trueArg = this.read_expr();
      }
      this.expect(":") && this.next();
      return result("retif", expr, trueArg, this.read_expr());
    } else {
      // see #193
      result.destroy(expr);
    }

    return expr;
  },

  /*
   * Reads a cast expression
   */
  read_expr_cast: function (type) {
    return this.node("cast")(type, this.text(), this.next().read_expr());
  },

  /*
   * Read a isset variable
   */
  read_isset_variable: function () {
    return this.read_expr();
  },

  /*
   * Reads isset variables
   */
  read_isset_variables: function () {
    return this.read_function_list(this.read_isset_variable, ",");
  },

  /*
   * Reads internal PHP functions
   */
  read_internal_functions_in_yacc: function () {
    let result = null;
    switch (this.token) {
      case this.tok.T_ISSET:
        {
          result = this.node("isset");
          if (this.next().expect("(")) {
            this.next();
          }
          const variables = this.read_isset_variables();
          if (this.expect(")")) {
            this.next();
          }
          result = result(variables);
        }
        break;
      case this.tok.T_EMPTY:
        {
          result = this.node("empty");
          if (this.next().expect("(")) {
            this.next();
          }
          const expression = this.read_expr();
          if (this.expect(")")) {
            this.next();
          }
          result = result(expression);
        }
        break;
      case this.tok.T_INCLUDE:
        result = this.node("include")(false, false, this.next().read_expr());
        break;
      case this.tok.T_INCLUDE_ONCE:
        result = this.node("include")(true, false, this.next().read_expr());
        break;
      case this.tok.T_EVAL:
        {
          result = this.node("eval");
          if (this.next().expect("(")) {
            this.next();
          }
          const expr = this.read_expr();
          if (this.expect(")")) {
            this.next();
          }
          result = result(expr);
        }
        break;
      case this.tok.T_REQUIRE:
        result = this.node("include")(false, true, this.next().read_expr());
        break;
      case this.tok.T_REQUIRE_ONCE:
        result = this.node("include")(true, true, this.next().read_expr());
        break;
    }

    return result;
  },

  /*
   * Reads optional expression
   */
  read_optional_expr: function (stopToken) {
    if (this.token !== stopToken) {
      return this.read_expr();
    }

    return null;
  },

  /*
   * Reads exit expression
   */
  read_exit_expr: function () {
    let expression = null;

    if (this.token === "(") {
      this.next();
      expression = this.read_optional_expr(")");
      this.expect(")") && this.next();
    }

    return expression;
  },

  /*
   * ```ebnf
   * Reads an expression
   *  expr ::= @todo
   * ```
   */
  read_expr_item: function () {
    let result, expr;
    if (this.token === "+")
      return this.node("unary")("+", this.next().read_expr());
    if (this.token === "-")
      return this.node("unary")("-", this.next().read_expr());
    if (this.token === "!")
      return this.node("unary")("!", this.next().read_expr());
    if (this.token === "~")
      return this.node("unary")("~", this.next().read_expr());

    if (this.token === "(") {
      expr = this.next().read_expr();
      expr.parenthesizedExpression = true;
      this.expect(")") && this.next();
      return this.handleDereferencable(expr);
    }

    if (this.token === "`") {
      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1048
      return this.read_encapsed_string("`");
    }

    if (this.token === this.tok.T_LIST) {
      let assign = null;
      const isInner = this.innerList;
      result = this.node("list");
      if (!isInner) {
        assign = this.node("assign");
      }
      if (this.next().expect("(")) {
        this.next();
      }

      if (!this.innerList) this.innerList = true;

      // reads inner items
      const assignList = this.read_array_pair_list(false);
      if (this.expect(")")) {
        this.next();
      }

      // check if contains at least one assignment statement
      let hasItem = false;
      for (let i = 0; i < assignList.length; i++) {
        if (assignList[i] !== null && assignList[i].kind !== "noop") {
          hasItem = true;
          break;
        }
      }
      if (!hasItem) {
        this.raiseError(
          "Fatal Error :  Cannot use empty list on line " +
            this.lexer.yylloc.first_line
        );
      }

      // handles the node resolution
      if (!isInner) {
        this.innerList = false;
        if (this.expect("=")) {
          return assign(
            result(assignList, false),
            this.next().read_expr(),
            "="
          );
        } else {
          // error fallback : list($a, $b);
          return result(assignList, false);
        }
      } else {
        return result(assignList, false);
      }
    }

    if (this.token === this.tok.T_CLONE)
      return this.node("clone")(this.next().read_expr());

    switch (this.token) {
      case this.tok.T_INC:
        return this.node("pre")("+", this.next().read_variable(false, false));

      case this.tok.T_DEC:
        return this.node("pre")("-", this.next().read_variable(false, false));

      case this.tok.T_NEW:
        return this.read_new_expr();

      case this.tok.T_ISSET:
      case this.tok.T_EMPTY:
      case this.tok.T_INCLUDE:
      case this.tok.T_INCLUDE_ONCE:
      case this.tok.T_EVAL:
      case this.tok.T_REQUIRE:
      case this.tok.T_REQUIRE_ONCE:
        return this.read_internal_functions_in_yacc();
      case this.tok.T_INT_CAST:
        return this.read_expr_cast("int");

      case this.tok.T_DOUBLE_CAST:
        return this.read_expr_cast("float");

      case this.tok.T_STRING_CAST:
        return this.read_expr_cast(
          this.text().indexOf("binary") !== -1 ? "binary" : "string"
        );

      case this.tok.T_ARRAY_CAST:
        return this.read_expr_cast("array");

      case this.tok.T_OBJECT_CAST:
        return this.read_expr_cast("object");

      case this.tok.T_BOOL_CAST:
        return this.read_expr_cast("bool");

      case this.tok.T_UNSET_CAST:
        return this.read_expr_cast("unset");

      case this.tok.T_EXIT: {
        const useDie = this.lexer.yytext.toLowerCase() === "die";
        result = this.node("exit");
        this.next();
        const expression = this.read_exit_expr();
        return result(expression, useDie);
      }

      case this.tok.T_PRINT:
        return this.node("print")(this.next().read_expr());

      // T_YIELD (expr (T_DOUBLE_ARROW expr)?)?
      case this.tok.T_YIELD: {
        let value = null;
        let key = null;
        result = this.node("yield");
        if (this.next().is("EXPR")) {
          // reads the yield return value
          value = this.read_expr();
          if (this.token === this.tok.T_DOUBLE_ARROW) {
            // reads the yield returned key
            key = value;
            value = this.next().read_expr();
          }
        }
        return result(value, key);
      }

      // T_YIELD_FROM expr
      case this.tok.T_YIELD_FROM:
        result = this.node("yieldfrom");
        expr = this.next().read_expr();
        return result(expr);

      case this.tok.T_FN:
      case this.tok.T_FUNCTION:
        return this.read_inline_function();

      case this.tok.T_STATIC: {
        const backup = [this.token, this.lexer.getState()];
        this.next();
        if (
          this.token === this.tok.T_FUNCTION ||
          (this.version >= 704 && this.token === this.tok.T_FN)
        ) {
          // handles static function
          return this.read_inline_function([0, 1, 0]);
        } else {
          // rollback
          this.lexer.tokens.push(backup);
          this.next();
        }
      }
    }

    // SCALAR | VARIABLE
    if (this.is("VARIABLE")) {
      result = this.node();
      expr = this.read_variable(false, false);

      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L877
      // should accept only a variable
      const isConst =
        expr.kind === "identifier" ||
        (expr.kind === "staticlookup" && expr.offset.kind === "identifier");

      // VARIABLES SPECIFIC OPERATIONS
      switch (this.token) {
        case "=": {
          if (isConst) this.error("VARIABLE");
          if (this.next().token == "&") {
            return this.read_assignref(result, expr);
          }
          return result("assign", expr, this.read_expr(), "=");
        }

        // operations :
        case this.tok.T_PLUS_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "+=");

        case this.tok.T_MINUS_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "-=");

        case this.tok.T_MUL_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "*=");

        case this.tok.T_POW_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "**=");

        case this.tok.T_DIV_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "/=");

        case this.tok.T_CONCAT_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), ".=");

        case this.tok.T_MOD_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "%=");

        case this.tok.T_AND_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "&=");

        case this.tok.T_OR_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "|=");

        case this.tok.T_XOR_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "^=");

        case this.tok.T_SL_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "<<=");

        case this.tok.T_SR_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), ">>=");

        case this.tok.T_COALESCE_EQUAL:
          if (isConst) this.error("VARIABLE");
          return result("assign", expr, this.next().read_expr(), "??=");

        case this.tok.T_INC:
          if (isConst) this.error("VARIABLE");
          this.next();
          return result("post", "+", expr);
        case this.tok.T_DEC:
          if (isConst) this.error("VARIABLE");
          this.next();
          return result("post", "-", expr);
        default:
          // see #193
          result.destroy(expr);
      }
    } else if (this.is("SCALAR")) {
      result = this.node();
      expr = this.read_scalar();
      if (expr.kind === "array" && expr.shortForm && this.token === "=") {
        // list assign
        const list = this.convertToList(expr);
        if (expr.loc) list.loc = expr.loc;
        const right = this.next().read_expr();
        return result("assign", list, right, "=");
      } else {
        // see #189 - swap docs on nodes
        result.destroy(expr);
      }
      // classic array
      return this.handleDereferencable(expr);
    } else {
      this.error("EXPR");
      this.next();
    }

    // returns variable | scalar
    return expr;
  },

  /*
   * Recursively convert nested array to nested list.
   */
  convertToList: function (array) {
    const convertedItems = array.items.map((entry) => {
      if (
        entry.value &&
        entry.value.kind === "array" &&
        entry.value.shortForm
      ) {
        entry.value = this.convertToList(entry.value);
      }
      return entry;
    });
    const node = this.node("list")(convertedItems, true);
    if (array.loc) node.loc = array.loc;
    if (array.leadingComments) node.leadingComments = array.leadingComments;
    if (array.trailingComments) node.trailingComments = array.trailingComments;
    return node;
  },

  /*
   * Reads assignment
   * @param {*} left
   */
  read_assignref: function (result, left) {
    this.next();
    let right;
    if (this.token === this.tok.T_NEW) {
      if (this.version >= 700) {
        this.error();
      }
      right = this.read_new_expr();
    } else {
      right = this.read_variable(false, false);
    }

    return result("assignref", left, right);
  },

  /*
   *
   * inline_function:
   * 		function returns_ref backup_doc_comment '(' parameter_list ')' lexical_vars return_type
   * 		backup_fn_flags '{' inner_statement_list '}' backup_fn_flags
   * 			{ $$ = zend_ast_create_decl(ZEND_AST_CLOSURE, $2 | $13, $1, $3,
   * 				  zend_string_init("{closure}", sizeof("{closure}") - 1, 0),
   * 				  $5, $7, $11, $8); CG(extra_fn_flags) = $9; }
   * 	|	fn returns_ref '(' parameter_list ')' return_type backup_doc_comment T_DOUBLE_ARROW backup_fn_flags backup_lex_pos expr backup_fn_flags
   * 			{ $$ = zend_ast_create_decl(ZEND_AST_ARROW_FUNC, $2 | $12, $1, $7,
   * 				  zend_string_init("{closure}", sizeof("{closure}") - 1, 0), $4, NULL,
   * 				  zend_ast_create(ZEND_AST_RETURN, $11), $6);
   * 				  ((zend_ast_decl *) $$)->lex_pos = $10;
   * 				  CG(extra_fn_flags) = $9; }   *
   */
  read_inline_function: function (flags) {
    if (this.token === this.tok.T_FUNCTION) {
      return this.read_function(true, flags);
    }
    // introduced in PHP 7.4
    if (!this.version >= 704) {
      this.raiseError("Arrow Functions are not allowed");
    }
    // as an arrowfunc
    const node = this.node("arrowfunc");
    // eat T_FN
    if (this.expect(this.tok.T_FN)) this.next();
    // check the &
    const isRef = this.is_reference();
    // ...
    if (this.expect("(")) this.next();
    const params = this.read_parameter_list();
    if (this.expect(")")) this.next();
    let nullable = false;
    let returnType = null;
    if (this.token === ":") {
      if (this.next().token === "?") {
        nullable = true;
        this.next();
      }
      returnType = this.read_type();
    }
    if (this.expect(this.tok.T_DOUBLE_ARROW)) this.next();
    const body = this.read_expr();
    return node(
      params,
      isRef,
      body,
      returnType,
      nullable,
      flags ? true : false
    );
  },

  /*
   * ```ebnf
   *    new_expr ::= T_NEW (namespace_name function_argument_list) | (T_CLASS ... class declaration)
   * ```
   * https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L850
   */
  read_new_expr: function () {
    const result = this.node("new");
    this.expect(this.tok.T_NEW) && this.next();
    let args = [];
    if (this.token === this.tok.T_CLASS) {
      const what = this.node("class");
      // Annonymous class declaration
      if (this.next().token === "(") {
        args = this.read_argument_list();
      }
      const propExtends = this.read_extends_from();
      const propImplements = this.read_implements_list();
      let body = null;
      if (this.expect("{")) {
        body = this.next().read_class_body();
      }
      return result(
        what(null, propExtends, propImplements, body, [0, 0, 0]),
        args
      );
    }
    // Already existing class
    const name = this.read_new_class_name();
    if (this.token === "(") {
      args = this.read_argument_list();
    }
    return result(name, args);
  },
  /*
   * Reads a class name
   * ```ebnf
   * read_new_class_name ::= namespace_name | variable
   * ```
   */
  read_new_class_name: function () {
    if (
      this.token === this.tok.T_NS_SEPARATOR ||
      this.token === this.tok.T_STRING ||
      this.token === this.tok.T_NAMESPACE
    ) {
      let result = this.read_namespace_name(true);
      if (this.token === this.tok.T_DOUBLE_COLON) {
        result = this.read_static_getter(result);
      }
      return result;
    } else if (this.is("VARIABLE")) {
      return this.read_variable(true, false);
    } else {
      this.expect([this.tok.T_STRING, "VARIABLE"]);
    }
  },
  handleDereferencable: function (expr) {
    while (this.token !== this.EOF) {
      if (
        this.token === this.tok.T_OBJECT_OPERATOR ||
        this.token === this.tok.T_DOUBLE_COLON
      ) {
        expr = this.recursive_variable_chain_scan(expr, false, false, true);
      } else if (this.token === this.tok.T_CURLY_OPEN || this.token === "[") {
        expr = this.read_dereferencable(expr);
      } else if (this.token === "(") {
        // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1118
        expr = this.node("call")(expr, this.read_argument_list());
      } else {
        return expr;
      }
    }
    return expr;
  },
};


/***/ }),
/* 26 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * checks if current token is a reference keyword
   */
  is_reference: function () {
    if (this.token == "&") {
      this.next();
      return true;
    }
    return false;
  },
  /*
   * checks if current token is a variadic keyword
   */
  is_variadic: function () {
    if (this.token === this.tok.T_ELLIPSIS) {
      this.next();
      return true;
    }
    return false;
  },
  /*
   * reading a function
   * ```ebnf
   * function ::= function_declaration code_block
   * ```
   */
  read_function: function (closure, flag) {
    const result = this.read_function_declaration(
      closure ? 1 : flag ? 2 : 0,
      flag && flag[1] === 1
    );
    if (flag && flag[2] == 1) {
      // abstract function :
      result.parseFlags(flag);
      if (this.expect(";")) {
        this.next();
      }
    } else {
      if (this.expect("{")) {
        result.body = this.read_code_block(false);
        if (result.loc && result.body.loc) {
          result.loc.end = result.body.loc.end;
        }
      }
      if (!closure && flag) {
        result.parseFlags(flag);
      }
    }
    return result;
  },
  /*
   * reads a function declaration (without his body)
   * ```ebnf
   * function_declaration ::= T_FUNCTION '&'?  T_STRING '(' parameter_list ')'
   * ```
   */
  read_function_declaration: function (type, isStatic) {
    let nodeName = "function";
    if (type === 1) {
      nodeName = "closure";
    } else if (type === 2) {
      nodeName = "method";
    }
    const result = this.node(nodeName);

    if (this.expect(this.tok.T_FUNCTION)) {
      this.next();
    }
    const isRef = this.is_reference();
    let name = false,
      use = [],
      returnType = null,
      nullable = false;
    if (type !== 1) {
      const nameNode = this.node("identifier");
      if (type === 2) {
        if (this.version >= 700) {
          if (this.token === this.tok.T_STRING || this.is("IDENTIFIER")) {
            name = this.text();
            this.next();
          } else if (this.version < 704) {
            this.error("IDENTIFIER");
          }
        } else if (this.token === this.tok.T_STRING) {
          name = this.text();
          this.next();
        } else {
          this.error("IDENTIFIER");
        }
      } else {
        if (this.version >= 700) {
          if (this.token === this.tok.T_STRING) {
            name = this.text();
            this.next();
          } else if (this.version >= 704) {
            if (!this.expect("(")) {
              this.next();
            }
          } else {
            this.error(this.tok.T_STRING);
            this.next();
          }
        } else {
          if (this.expect(this.tok.T_STRING)) {
            name = this.text();
          }
          this.next();
        }
      }
      name = nameNode(name);
    }
    if (this.expect("(")) this.next();
    const params = this.read_parameter_list();
    if (this.expect(")")) this.next();
    if (type === 1) {
      use = this.read_lexical_vars();
    }
    if (this.token === ":") {
      if (this.next().token === "?") {
        nullable = true;
        this.next();
      }
      returnType = this.read_type();
    }
    if (type === 1) {
      // closure
      return result(params, isRef, use, returnType, nullable, isStatic);
    }
    return result(name, params, isRef, returnType, nullable);
  },

  read_lexical_vars: function () {
    let result = [];

    if (this.token === this.tok.T_USE) {
      this.next();
      this.expect("(") && this.next();
      result = this.read_lexical_var_list();
      this.expect(")") && this.next();
    }

    return result;
  },

  read_lexical_var_list: function () {
    return this.read_list(this.read_lexical_var, ",");
  },

  /*
   * ```ebnf
   * lexical_var ::= '&'? T_VARIABLE
   * ```
   */
  read_lexical_var: function () {
    if (this.token === "&") {
      return this.read_byref(this.read_lexical_var.bind(this));
    }
    const result = this.node("variable");
    this.expect(this.tok.T_VARIABLE);
    const name = this.text().substring(1);
    this.next();
    return result(name, false);
  },
  /*
   * reads a list of parameters
   * ```ebnf
   *  parameter_list ::= (parameter ',')* parameter?
   * ```
   */
  read_parameter_list: function () {
    const result = [];
    if (this.token != ")") {
      while (this.token != this.EOF) {
        result.push(this.read_parameter());
        if (this.token == ",") {
          this.next();
        } else if (this.token == ")") {
          break;
        } else {
          this.error([",", ")"]);
          break;
        }
      }
    }
    return result;
  },
  /*
   * ```ebnf
   *  parameter ::= type? '&'? T_ELLIPSIS? T_VARIABLE ('=' expr)?
   * ```
   * @see https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L640
   */
  read_parameter: function () {
    const node = this.node("parameter");
    let parameterName = null;
    let value = null;
    let type = null;
    let nullable = false;
    if (this.token === "?") {
      this.next();
      nullable = true;
    }
    type = this.read_type();
    if (nullable && !type) {
      this.raiseError(
        "Expecting a type definition combined with nullable operator"
      );
    }
    const isRef = this.is_reference();
    const isVariadic = this.is_variadic();
    if (this.expect(this.tok.T_VARIABLE)) {
      parameterName = this.node("identifier");
      const name = this.text().substring(1);
      this.next();
      parameterName = parameterName(name);
    }
    if (this.token == "=") {
      value = this.next().read_expr();
    }
    return node(parameterName, type, value, isRef, isVariadic, nullable);
  },
  /*
   * Reads a list of arguments
   * ```ebnf
   *  function_argument_list ::= '(' (argument_list (',' argument_list)*)? ')'
   * ```
   */
  read_argument_list: function () {
    let result = [];
    this.expect("(") && this.next();
    if (this.token !== ")") {
      result = this.read_non_empty_argument_list();
    }
    this.expect(")") && this.next();
    return result;
  },
  /*
   * Reads non empty argument list
   */
  read_non_empty_argument_list: function () {
    let wasVariadic = false;

    return this.read_function_list(
      function () {
        const argument = this.read_argument();
        if (argument) {
          if (wasVariadic) {
            this.raiseError("Unexpected argument after a variadic argument");
          }
          if (argument.kind === "variadic") {
            wasVariadic = true;
          }
        }
        return argument;
      }.bind(this),
      ","
    );
  },
  /*
   * ```ebnf
   *    argument_list ::= T_ELLIPSIS? expr
   * ```
   */
  read_argument: function () {
    if (this.token === this.tok.T_ELLIPSIS) {
      return this.node("variadic")(this.next().read_expr());
    }
    return this.read_expr();
  },
  /*
   * read type hinting
   * ```ebnf
   *  type ::= T_ARRAY | T_CALLABLE | namespace_name
   * ```
   */
  read_type: function () {
    const result = this.node();
    if (this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE) {
      const type = this.text();
      this.next();
      return result("typereference", type.toLowerCase(), type);
    } else if (this.token === this.tok.T_STRING) {
      const type = this.text();
      const backup = [this.token, this.lexer.getState()];
      this.next();
      if (
        this.token !== this.tok.T_NS_SEPARATOR &&
        this.ast.typereference.types.indexOf(type.toLowerCase()) > -1
      ) {
        return result("typereference", type.toLowerCase(), type);
      } else {
        // rollback a classic namespace
        this.lexer.tokens.push(backup);
        this.next();
        // fix : destroy not consumed node (release comments)
        result.destroy();
        return this.read_namespace_name();
      }
    } else if (
      this.token === this.tok.T_NAMESPACE ||
      this.token === this.tok.T_NS_SEPARATOR
    ) {
      // fix : destroy not consumed node (release comments)
      result.destroy();
      return this.read_namespace_name();
    }
    // fix : destroy not consumed node (release comments)
    result.destroy();
    return null;
  },
};


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads an IF statement
   *
   * ```ebnf
   *  if ::= T_IF '(' expr ')' ':' ...
   * ```
   */
  read_if: function () {
    const result = this.node("if");
    const test = this.next().read_if_expr();
    let body = null;
    let alternate = null;
    let shortForm = false;

    if (this.token === ":") {
      shortForm = true;
      this.next();
      body = this.node("block");
      const items = [];
      while (this.token !== this.EOF && this.token !== this.tok.T_ENDIF) {
        if (this.token === this.tok.T_ELSEIF) {
          alternate = this.read_elseif_short();
          break;
        } else if (this.token === this.tok.T_ELSE) {
          alternate = this.read_else_short();
          break;
        }
        items.push(this.read_inner_statement());
      }
      body = body(null, items);
      this.expect(this.tok.T_ENDIF) && this.next();
      this.expectEndOfStatement();
    } else {
      body = this.read_statement();
      if (this.token === this.tok.T_ELSEIF) {
        alternate = this.read_if();
      } else if (this.token === this.tok.T_ELSE) {
        alternate = this.next().read_statement();
      }
    }
    return result(test, body, alternate, shortForm);
  },
  /*
   * reads an if expression : '(' expr ')'
   */
  read_if_expr: function () {
    this.expect("(") && this.next();
    const result = this.read_expr();
    this.expect(")") && this.next();
    return result;
  },
  /*
   * reads an elseif (expr): statements
   */
  read_elseif_short: function () {
    let alternate = null;
    const result = this.node("if");
    const test = this.next().read_if_expr();
    if (this.expect(":")) this.next();
    const body = this.node("block");
    const items = [];
    while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) {
      if (this.token === this.tok.T_ELSEIF) {
        alternate = this.read_elseif_short();
        break;
      } else if (this.token === this.tok.T_ELSE) {
        alternate = this.read_else_short();
        break;
      }
      items.push(this.read_inner_statement());
    }
    return result(test, body(null, items), alternate, true);
  },
  /*
   *
   */
  read_else_short: function () {
    if (this.next().expect(":")) this.next();
    const body = this.node("block");
    const items = [];
    while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) {
      items.push(this.read_inner_statement());
    }
    return body(null, items);
  },
};


/***/ }),
/* 28 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads a while statement
   * ```ebnf
   * while ::= T_WHILE (statement | ':' inner_statement_list T_ENDWHILE ';')
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L587
   * @return {While}
   */
  read_while: function () {
    const result = this.node("while");
    this.expect(this.tok.T_WHILE) && this.next();
    let test = null;
    let body = null;
    let shortForm = false;
    if (this.expect("(")) this.next();
    test = this.read_expr();
    if (this.expect(")")) this.next();
    if (this.token === ":") {
      shortForm = true;
      body = this.read_short_form(this.tok.T_ENDWHILE);
    } else {
      body = this.read_statement();
    }
    return result(test, body, shortForm);
  },
  /*
   * Reads a do / while loop
   * ```ebnf
   * do ::= T_DO statement T_WHILE '(' expr ')' ';'
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L423
   * @return {Do}
   */
  read_do: function () {
    const result = this.node("do");
    this.expect(this.tok.T_DO) && this.next();
    let test = null;
    let body = null;
    body = this.read_statement();
    if (this.expect(this.tok.T_WHILE)) {
      if (this.next().expect("(")) this.next();
      test = this.read_expr();
      if (this.expect(")")) this.next();
      if (this.expect(";")) this.next();
    }
    return result(test, body);
  },
  /*
   * Read a for incremental loop
   * ```ebnf
   * for ::= T_FOR '(' for_exprs ';' for_exprs ';' for_exprs ')' for_statement
   * for_statement ::= statement | ':' inner_statement_list T_ENDFOR ';'
   * for_exprs ::= expr? (',' expr)*
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L425
   * @return {For}
   */
  read_for: function () {
    const result = this.node("for");
    this.expect(this.tok.T_FOR) && this.next();
    let init = [];
    let test = [];
    let increment = [];
    let body = null;
    let shortForm = false;
    if (this.expect("(")) this.next();
    if (this.token !== ";") {
      init = this.read_list(this.read_expr, ",");
      if (this.expect(";")) this.next();
    } else {
      this.next();
    }
    if (this.token !== ";") {
      test = this.read_list(this.read_expr, ",");
      if (this.expect(";")) this.next();
    } else {
      this.next();
    }
    if (this.token !== ")") {
      increment = this.read_list(this.read_expr, ",");
      if (this.expect(")")) this.next();
    } else {
      this.next();
    }
    if (this.token === ":") {
      shortForm = true;
      body = this.read_short_form(this.tok.T_ENDFOR);
    } else {
      body = this.read_statement();
    }
    return result(init, test, increment, body, shortForm);
  },
  /*
   * Reads a foreach loop
   * ```ebnf
   * foreach ::= '(' expr T_AS foreach_variable (T_DOUBLE_ARROW foreach_variable)? ')' statement
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L438
   * @return {Foreach}
   */
  read_foreach: function () {
    const result = this.node("foreach");
    this.expect(this.tok.T_FOREACH) && this.next();
    let source = null;
    let key = null;
    let value = null;
    let body = null;
    let shortForm = false;
    if (this.expect("(")) this.next();
    source = this.read_expr();
    if (this.expect(this.tok.T_AS)) {
      this.next();
      value = this.read_foreach_variable();
      if (this.token === this.tok.T_DOUBLE_ARROW) {
        key = value;
        value = this.next().read_foreach_variable();
      }
    }

    // grammatically correct but not supported by PHP
    if (key && key.kind === "list") {
      this.raiseError("Fatal Error : Cannot use list as key element");
    }

    if (this.expect(")")) this.next();

    if (this.token === ":") {
      shortForm = true;
      body = this.read_short_form(this.tok.T_ENDFOREACH);
    } else {
      body = this.read_statement();
    }
    return result(source, key, value, body, shortForm);
  },
  /*
   * Reads a foreach variable statement
   * ```ebnf
   * foreach_variable =
   *    variable |
   *    '&' variable |
   *    T_LIST '(' assignment_list ')' |
   *    '[' assignment_list ']'
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L544
   * @return {Expression}
   */
  read_foreach_variable: function () {
    if (this.token === this.tok.T_LIST || this.token === "[") {
      const isShort = this.token === "[";
      const result = this.node("list");
      this.next();
      if (!isShort && this.expect("(")) this.next();
      const assignList = this.read_array_pair_list(isShort);
      if (this.expect(isShort ? "]" : ")")) this.next();
      return result(assignList, isShort);
    } else {
      return this.read_variable(false, false);
    }
  },
};


/***/ }),
/* 29 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * ```ebnf
   * start ::= (namespace | top_statement)*
   * ```
   */
  read_start: function () {
    if (this.token == this.tok.T_NAMESPACE) {
      return this.read_namespace();
    } else {
      return this.read_top_statement();
    }
  },
};


/***/ }),
/* 30 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads a namespace declaration block
   * ```ebnf
   * namespace ::= T_NAMESPACE namespace_name? '{'
   *    top_statements
   * '}'
   * | T_NAMESPACE namespace_name ';' top_statements
   * ```
   * @see http://php.net/manual/en/language.namespaces.php
   * @return {Namespace}
   */
  read_namespace: function () {
    const result = this.node("namespace");
    let body;
    this.expect(this.tok.T_NAMESPACE) && this.next();
    let name;

    if (this.token == "{") {
      name = {
        name: [""],
      };
    } else {
      name = this.read_namespace_name();
    }
    this.currentNamespace = name;

    if (this.token == ";") {
      this.currentNamespace = name;
      body = this.next().read_top_statements();
      this.expect(this.EOF);
      return result(name.name, body, false);
    } else if (this.token == "{") {
      this.currentNamespace = name;
      body = this.next().read_top_statements();
      this.expect("}") && this.next();
      if (
        body.length === 0 &&
        this.extractDoc &&
        this._docs.length > this._docIndex
      ) {
        body.push(this.node("noop")());
      }
      return result(name.name, body, true);
    } else if (this.token === "(") {
      // @fixme after merging #478
      name.resolution = this.ast.reference.RELATIVE_NAME;
      name.name = name.name.substring(1);
      result.destroy();
      return this.node("call")(name, this.read_argument_list());
    } else {
      this.error(["{", ";"]);
      // graceful mode :
      this.currentNamespace = name;
      body = this.read_top_statements();
      this.expect(this.EOF);
      return result(name, body, false);
    }
  },
  /*
   * Reads a namespace name
   * ```ebnf
   *  namespace_name ::= T_NS_SEPARATOR? (T_STRING T_NS_SEPARATOR)* T_STRING
   * ```
   * @see http://php.net/manual/en/language.namespaces.rules.php
   * @return {Reference}
   */
  read_namespace_name: function (resolveReference) {
    const result = this.node();
    let relative = false;
    if (this.token === this.tok.T_NAMESPACE) {
      this.next().expect(this.tok.T_NS_SEPARATOR) && this.next();
      relative = true;
    }
    const names = this.read_list(
      this.tok.T_STRING,
      this.tok.T_NS_SEPARATOR,
      true
    );
    if (
      !relative &&
      names.length === 1 &&
      (resolveReference || this.token !== "(")
    ) {
      if (names[0].toLowerCase() === "parent") {
        return result("parentreference", names[0]);
      } else if (names[0].toLowerCase() === "self") {
        return result("selfreference", names[0]);
      }
    }
    return result("name", names, relative);
  },
  /*
   * Reads a use statement
   * ```ebnf
   * use_statement ::= T_USE
   *   use_type? use_declarations |
   *   use_type use_statement '{' use_declarations '}' |
   *   use_statement '{' use_declarations(=>typed) '}'
   * ';'
   * ```
   * @see http://php.net/manual/en/language.namespaces.importing.php
   * @return {UseGroup}
   */
  read_use_statement: function () {
    let result = this.node("usegroup");
    let items = [];
    let name = null;
    this.expect(this.tok.T_USE) && this.next();
    const type = this.read_use_type();
    items.push(this.read_use_declaration(false));
    if (this.token === ",") {
      items = items.concat(this.next().read_use_declarations(false));
    } else if (this.token === "{") {
      name = items[0].name;
      items = this.next().read_use_declarations(type === null);
      this.expect("}") && this.next();
    }
    result = result(name, type, items);
    this.expect(";") && this.next();
    return result;
  },
  /*
   *
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1045
   */
  read_class_name_reference: function () {
    // resolved as the same
    return this.read_variable(true, false);
  },
  /*
   * Reads a use declaration
   * ```ebnf
   * use_declaration ::= use_type? namespace_name use_alias
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L380
   * @return {UseItem}
   */
  read_use_declaration: function (typed) {
    const result = this.node("useitem");
    let type = null;
    if (typed) type = this.read_use_type();
    const name = this.read_namespace_name();
    const alias = this.read_use_alias();
    return result(name.name, alias, type);
  },
  /*
   * Reads a list of use declarations
   * ```ebnf
   * use_declarations ::= use_declaration (',' use_declaration)*
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L380
   * @return {UseItem[]}
   */
  read_use_declarations: function (typed) {
    const result = [this.read_use_declaration(typed)];
    while (this.token === ",") {
      this.next();
      if (typed) {
        if (
          this.token !== this.tok.T_FUNCTION &&
          this.token !== this.tok.T_CONST &&
          this.token !== this.tok.T_STRING
        ) {
          break;
        }
      } else if (
        this.token !== this.tok.T_STRING &&
        this.token !== this.tok.T_NS_SEPARATOR
      ) {
        break;
      }
      result.push(this.read_use_declaration(typed));
    }
    return result;
  },
  /*
   * Reads a use statement
   * ```ebnf
   * use_alias ::= (T_AS T_STRING)?
   * ```
   * @return {String|null}
   */
  read_use_alias: function () {
    let result = null;
    if (this.token === this.tok.T_AS) {
      if (this.next().expect(this.tok.T_STRING)) {
        const aliasName = this.node("identifier");
        const name = this.text();
        this.next();
        result = aliasName(name);
      }
    }
    return result;
  },
  /*
   * Reads the namespace type declaration
   * ```ebnf
   * use_type ::= (T_FUNCTION | T_CONST)?
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L335
   * @return {String|null} Possible values : function, const
   */
  read_use_type: function () {
    if (this.token === this.tok.T_FUNCTION) {
      this.next();
      return this.ast.useitem.TYPE_FUNCTION;
    } else if (this.token === this.tok.T_CONST) {
      this.next();
      return this.ast.useitem.TYPE_CONST;
    }
    return null;
  },
};


/***/ }),
/* 31 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const specialChar = {
  "\\": "\\",
  $: "$",
  n: "\n",
  r: "\r",
  t: "\t",
  f: String.fromCharCode(12),
  v: String.fromCharCode(11),
  e: String.fromCharCode(27),
};

module.exports = {
  /*
   * Unescape special chars
   */
  resolve_special_chars: function (text, doubleQuote) {
    if (!doubleQuote) {
      // single quote fix
      return text.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
    }
    return text
      .replace(/\\"/, '"')
      .replace(
        /\\([\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})/g,
        ($match, p1, p2) => {
          if (specialChar[p1]) {
            return specialChar[p1];
          } else if ("x" === p1[0] || "X" === p1[0]) {
            return String.fromCodePoint(parseInt(p1.substr(1), 16));
          } else if ("u" === p1[0]) {
            return String.fromCodePoint(parseInt(p2, 16));
          } else {
            return String.fromCodePoint(parseInt(p1, 8));
          }
        }
      );
  },

  /*
   * Remove all leading spaces each line for heredoc text if there is a indentation
   * @param {string} text
   * @param {number} indentation
   * @param {boolean} indentation_uses_spaces
   * @param {boolean} first_encaps_node if it is behind a variable, the first N spaces should not be removed
   */
  remove_heredoc_leading_whitespace_chars: function (
    text,
    indentation,
    indentation_uses_spaces,
    first_encaps_node
  ) {
    if (indentation === 0) {
      return text;
    }

    this.check_heredoc_indentation_level(
      text,
      indentation,
      indentation_uses_spaces,
      first_encaps_node
    );

    const matchedChar = indentation_uses_spaces ? " " : "\t";
    const removementRegExp = new RegExp(
      `\\n${matchedChar}{${indentation}}`,
      "g"
    );
    const removementFirstEncapsNodeRegExp = new RegExp(
      `^${matchedChar}{${indentation}}`
    );

    // Rough replace, need more check
    if (first_encaps_node) {
      // Remove text leading whitespace
      text = text.replace(removementFirstEncapsNodeRegExp, "");
    }

    // Remove leading whitespace after \n
    return text.replace(removementRegExp, "\n");
  },

  /*
   * Check indentation level of heredoc in text, if mismatch, raiseError
   * @param {string} text
   * @param {number} indentation
   * @param {boolean} indentation_uses_spaces
   * @param {boolean} first_encaps_node if it is behind a variable, the first N spaces should not be removed
   */
  check_heredoc_indentation_level: function (
    text,
    indentation,
    indentation_uses_spaces,
    first_encaps_node
  ) {
    const textSize = text.length;
    let offset = 0;
    let leadingWhitespaceCharCount = 0;
    /*
     * @var inCoutingState {boolean} reset to true after a new line
     * @private
     */
    let inCoutingState = true;
    const chToCheck = indentation_uses_spaces ? " " : "\t";
    let inCheckState = false;
    if (!first_encaps_node) {
      // start from first \n
      offset = text.indexOf("\n");
      // if no \n, just return
      if (offset === -1) {
        return;
      }
      offset++;
    }
    while (offset < textSize) {
      if (inCoutingState) {
        if (text[offset] === chToCheck) {
          leadingWhitespaceCharCount++;
        } else {
          inCheckState = true;
        }
      } else {
        inCoutingState = false;
      }

      if (
        text[offset] !== "\n" &&
        inCheckState &&
        leadingWhitespaceCharCount < indentation
      ) {
        this.raiseError(
          `Invalid body indentation level (expecting an indentation at least ${indentation})`
        );
      } else {
        inCheckState = false;
      }

      if (text[offset] === "\n") {
        // Reset counting state
        inCoutingState = true;
        leadingWhitespaceCharCount = 0;
      }
      offset++;
    }
  },

  /*
   * Reads dereferencable scalar
   */
  read_dereferencable_scalar: function () {
    let result = null;

    switch (this.token) {
      case this.tok.T_CONSTANT_ENCAPSED_STRING:
        {
          let value = this.node("string");
          const text = this.text();
          let offset = 0;
          if (text[0] === "b" || text[0] === "B") {
            offset = 1;
          }
          const isDoubleQuote = text[offset] === '"';
          this.next();
          const textValue = this.resolve_special_chars(
            text.substring(offset + 1, text.length - 1),
            isDoubleQuote
          );
          value = value(
            isDoubleQuote,
            textValue,
            offset === 1, // unicode flag
            text
          );
          if (this.token === this.tok.T_DOUBLE_COLON) {
            // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1151
            result = this.read_static_getter(value);
          } else {
            // dirrect string
            result = value;
          }
        }
        break;
      case this.tok.T_ARRAY: // array parser
        result = this.read_array();
        break;
      case "[": // short array format
        result = this.read_array();
        break;
    }

    return result;
  },

  /*
   * ```ebnf
   *  scalar ::= T_MAGIC_CONST
   *       | T_LNUMBER | T_DNUMBER
   *       | T_START_HEREDOC T_ENCAPSED_AND_WHITESPACE? T_END_HEREDOC
   *       | '"' encaps_list '"'
   *       | T_START_HEREDOC encaps_list T_END_HEREDOC
   *       | namespace_name (T_DOUBLE_COLON T_STRING)?
   * ```
   */
  read_scalar: function () {
    if (this.is("T_MAGIC_CONST")) {
      return this.get_magic_constant();
    } else {
      let value, node;
      switch (this.token) {
        // NUMERIC
        case this.tok.T_LNUMBER: // long
        case this.tok.T_DNUMBER: {
          // double
          const result = this.node("number");
          value = this.text();
          this.next();
          return result(value, null);
        }
        case this.tok.T_START_HEREDOC:
          if (this.lexer.curCondition === "ST_NOWDOC") {
            const start = this.lexer.yylloc.first_offset;
            node = this.node("nowdoc");
            value = this.next().text();
            // strip the last line return char
            if (this.lexer.heredoc_label.indentation > 0) {
              value = value.substring(
                0,
                value.length - this.lexer.heredoc_label.indentation
              );
            }
            const lastCh = value[value.length - 1];
            if (lastCh === "\n") {
              if (value[value.length - 2] === "\r") {
                // windows style
                value = value.substring(0, value.length - 2);
              } else {
                // linux style
                value = value.substring(0, value.length - 1);
              }
            } else if (lastCh === "\r") {
              // mac style
              value = value.substring(0, value.length - 1);
            }
            this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE) && this.next();
            this.expect(this.tok.T_END_HEREDOC) && this.next();
            const raw = this.lexer._input.substring(
              start,
              this.lexer.yylloc.first_offset
            );
            node = node(
              this.remove_heredoc_leading_whitespace_chars(
                value,
                this.lexer.heredoc_label.indentation,
                this.lexer.heredoc_label.indentation_uses_spaces,
                this.lexer.heredoc_label.first_encaps_node
              ),
              raw,
              this.lexer.heredoc_label.label
            );
            return node;
          } else {
            return this.read_encapsed_string(this.tok.T_END_HEREDOC);
          }

        case '"':
          return this.read_encapsed_string('"');

        case 'b"':
        case 'B"': {
          return this.read_encapsed_string('"', true);
        }

        // TEXTS
        case this.tok.T_CONSTANT_ENCAPSED_STRING:
        case this.tok.T_ARRAY: // array parser
        case "[": // short array format
          return this.read_dereferencable_scalar();
        default: {
          const err = this.error("SCALAR");
          // graceful mode : ignore token & return error node
          this.next();
          return err;
        }
      }
    }
  },
  /*
   * Handles the dereferencing
   */
  read_dereferencable: function (expr) {
    let result, offset;
    const node = this.node("offsetlookup");
    if (this.token === "[") {
      offset = this.next().read_expr();
      if (this.expect("]")) this.next();
      result = node(expr, offset);
    } else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
      offset = this.read_encapsed_string_item(false);
      result = node(expr, offset);
    }
    return result;
  },
  /*
   * Reads and extracts an encapsed item
   * ```ebnf
   * encapsed_string_item ::= T_ENCAPSED_AND_WHITESPACE
   *  | T_DOLLAR_OPEN_CURLY_BRACES expr '}'
   *  | T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '}'
   *  | T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '[' expr ']' '}'
   *  | T_CURLY_OPEN variable '}'
   *  | variable
   *  | variable '[' expr ']'
   *  | variable T_OBJECT_OPERATOR T_STRING
   * ```
   * @return {String|Variable|Expr|Lookup}
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1219
   */
  read_encapsed_string_item: function (isDoubleQuote) {
    const encapsedPart = this.node("encapsedpart");
    let syntax = null;
    let curly = false;
    let result = this.node(),
      offset,
      node,
      name;

    // plain text
    // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1222
    if (this.token === this.tok.T_ENCAPSED_AND_WHITESPACE) {
      const text = this.text();
      this.next();

      // if this.lexer.heredoc_label.first_encaps_node -> remove first indents
      result = result(
        "string",
        false,
        this.version >= 703 && !this.lexer.heredoc_label.finished
          ? this.remove_heredoc_leading_whitespace_chars(
              this.resolve_special_chars(text, isDoubleQuote),
              this.lexer.heredoc_label.indentation,
              this.lexer.heredoc_label.indentation_uses_spaces,
              this.lexer.heredoc_label.first_encaps_node
            )
          : text,
        false,
        text
      );
    } else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
      syntax = "simple";
      curly = true;
      // dynamic variable name
      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1239
      name = null;
      if (this.next().token === this.tok.T_STRING_VARNAME) {
        name = this.node("variable");
        const varName = this.text();
        this.next();
        // check if lookup an offset
        // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1243
        if (this.token === "[") {
          name = name(varName, false);
          node = this.node("offsetlookup");
          offset = this.next().read_expr();
          this.expect("]") && this.next();
          result = node(name, offset);
        } else {
          result = name(varName, false);
        }
      } else {
        result = result("variable", this.read_expr(), false);
      }
      this.expect("}") && this.next();
    } else if (this.token === this.tok.T_CURLY_OPEN) {
      // expression
      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1246
      syntax = "complex";
      result.destroy();
      result = this.next().read_variable(false, false);
      this.expect("}") && this.next();
    } else if (this.token === this.tok.T_VARIABLE) {
      syntax = "simple";
      // plain variable
      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1231
      result.destroy();
      result = this.read_simple_variable();

      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1233
      if (this.token === "[") {
        node = this.node("offsetlookup");
        offset = this.next().read_encaps_var_offset();
        this.expect("]") && this.next();
        result = node(result, offset);
      }

      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1236
      if (this.token === this.tok.T_OBJECT_OPERATOR) {
        node = this.node("propertylookup");
        this.next().expect(this.tok.T_STRING);
        const what = this.node("identifier");
        name = this.text();
        this.next();
        result = node(result, what(name));
      }

      // error / fallback
    } else {
      this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE);
      const value = this.text();
      this.next();
      // consider it as string
      result.destroy();
      result = result("string", false, value, false, value);
    }

    // reset first_encaps_node to false after access any node
    this.lexer.heredoc_label.first_encaps_node = false;
    return encapsedPart(result, syntax, curly);
  },
  /*
   * Reads an encapsed string
   */
  read_encapsed_string: function (expect, isBinary = false) {
    const labelStart = this.lexer.yylloc.first_offset;
    let node = this.node("encapsed");
    this.next();
    const start = this.lexer.yylloc.prev_offset - (isBinary ? 1 : 0);
    const value = [];
    let type = null;

    if (expect === "`") {
      type = this.ast.encapsed.TYPE_SHELL;
    } else if (expect === '"') {
      type = this.ast.encapsed.TYPE_STRING;
    } else {
      type = this.ast.encapsed.TYPE_HEREDOC;
    }

    // reading encapsed parts
    while (this.token !== expect && this.token !== this.EOF) {
      value.push(this.read_encapsed_string_item(true));
    }
    if (
      value.length > 0 &&
      value[value.length - 1].kind === "encapsedpart" &&
      value[value.length - 1].expression.kind === "string"
    ) {
      const node = value[value.length - 1].expression;
      const lastCh = node.value[node.value.length - 1];
      if (lastCh === "\n") {
        if (node.value[node.value.length - 2] === "\r") {
          // windows style
          node.value = node.value.substring(0, node.value.length - 2);
        } else {
          // linux style
          node.value = node.value.substring(0, node.value.length - 1);
        }
      } else if (lastCh === "\r") {
        // mac style
        node.value = node.value.substring(0, node.value.length - 1);
      }
    }
    this.expect(expect) && this.next();
    const raw = this.lexer._input.substring(
      type === "heredoc" ? labelStart : start - 1,
      this.lexer.yylloc.first_offset
    );
    node = node(value, raw, type);

    if (expect === this.tok.T_END_HEREDOC) {
      node.label = this.lexer.heredoc_label.label;
      this.lexer.heredoc_label.finished = true;
    }
    return node;
  },
  /*
   * Constant token
   */
  get_magic_constant: function () {
    const result = this.node("magic");
    const name = this.text();
    this.next();
    return result(name.toUpperCase(), name);
  },
};


/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * reading a list of top statements (helper for top_statement*)
   * ```ebnf
   *  top_statements ::= top_statement*
   * ```
   */
  read_top_statements: function () {
    let result = [];
    while (this.token !== this.EOF && this.token !== "}") {
      const statement = this.read_top_statement();
      if (statement) {
        if (Array.isArray(statement)) {
          result = result.concat(statement);
        } else {
          result.push(statement);
        }
      }
    }
    return result;
  },
  /*
   * reading a top statement
   * ```ebnf
   *  top_statement ::=
   *       namespace | function | class
   *       | interface | trait
   *       | use_statements | const_list
   *       | statement
   * ```
   */
  read_top_statement: function () {
    switch (this.token) {
      case this.tok.T_FUNCTION:
        return this.read_function(false, false);
      // optional flags
      case this.tok.T_ABSTRACT:
      case this.tok.T_FINAL:
      case this.tok.T_CLASS:
        return this.read_class_declaration_statement();
      case this.tok.T_INTERFACE:
        return this.read_interface_declaration_statement();
      case this.tok.T_TRAIT:
        return this.read_trait_declaration_statement();
      case this.tok.T_USE:
        return this.read_use_statement();
      case this.tok.T_CONST: {
        const result = this.node("constantstatement");
        const items = this.next().read_const_list();
        this.expectEndOfStatement();
        return result(null, items);
      }
      case this.tok.T_NAMESPACE:
        return this.read_namespace();
      case this.tok.T_HALT_COMPILER: {
        const result = this.node("halt");
        if (this.next().expect("(")) this.next();
        if (this.expect(")")) this.next();
        this.expect(";");
        this.lexer.done = true;
        return result(this.lexer._input.substring(this.lexer.offset));
      }
      default:
        return this.read_statement();
    }
  },
  /*
   * reads a list of simple inner statements (helper for inner_statement*)
   * ```ebnf
   *  inner_statements ::= inner_statement*
   * ```
   */
  read_inner_statements: function () {
    let result = [];
    while (this.token != this.EOF && this.token !== "}") {
      const statement = this.read_inner_statement();
      if (statement) {
        if (Array.isArray(statement)) {
          result = result.concat(statement);
        } else {
          result.push(statement);
        }
      }
    }
    return result;
  },
  /*
   * Reads a list of constants declaration
   * ```ebnf
   *   const_list ::= T_CONST T_STRING '=' expr (',' T_STRING '=' expr)* ';'
   * ```
   */
  read_const_list: function () {
    return this.read_list(
      function () {
        this.expect(this.tok.T_STRING);
        const result = this.node("constant");
        let constName = this.node("identifier");
        const name = this.text();
        this.next();
        constName = constName(name);
        if (this.expect("=")) {
          return result(constName, this.next().read_expr());
        } else {
          // fallback
          return result(constName, null);
        }
      },
      ",",
      false
    );
  },
  /*
   * Reads a list of constants declaration
   * ```ebnf
   *   declare_list ::= IDENTIFIER '=' expr (',' IDENTIFIER '=' expr)*
   * ```
   * @retrurn {Array}
   */
  read_declare_list: function () {
    const result = [];
    while (this.token != this.EOF && this.token !== ")") {
      this.expect(this.tok.T_STRING);
      const directive = this.node("declaredirective");
      let key = this.node("identifier");
      const name = this.text();
      this.next();
      key = key(name);
      let value = null;
      if (this.expect("=")) {
        value = this.next().read_expr();
      }
      result.push(directive(key, value));
      if (this.token !== ",") break;
      this.next();
    }
    return result;
  },
  /*
   * reads a simple inner statement
   * ```ebnf
   *  inner_statement ::= '{' inner_statements '}' | token
   * ```
   */
  read_inner_statement: function () {
    switch (this.token) {
      case this.tok.T_FUNCTION:
        return this.read_function(false, false);
      // optional flags
      case this.tok.T_ABSTRACT:
      case this.tok.T_FINAL:
      case this.tok.T_CLASS:
        return this.read_class_declaration_statement();
      case this.tok.T_INTERFACE:
        return this.read_interface_declaration_statement();
      case this.tok.T_TRAIT:
        return this.read_trait_declaration_statement();
      case this.tok.T_HALT_COMPILER: {
        this.raiseError(
          "__HALT_COMPILER() can only be used from the outermost scope"
        );
        // fallback : returns a node but does not stop the parsing
        let node = this.node("halt");
        this.next().expect("(") && this.next();
        this.expect(")") && this.next();
        node = node(this.lexer._input.substring(this.lexer.offset));
        this.expect(";") && this.next();
        return node;
      }
      default:
        return this.read_statement();
    }
  },
  /*
   * Reads statements
   */
  read_statement: function () {
    switch (this.token) {
      case "{":
        return this.read_code_block(false);

      case this.tok.T_IF:
        return this.read_if();

      case this.tok.T_SWITCH:
        return this.read_switch();

      case this.tok.T_FOR:
        return this.read_for();

      case this.tok.T_FOREACH:
        return this.read_foreach();

      case this.tok.T_WHILE:
        return this.read_while();

      case this.tok.T_DO:
        return this.read_do();

      case this.tok.T_COMMENT:
        return this.read_comment();

      case this.tok.T_DOC_COMMENT:
        return this.read_doc_comment();

      case this.tok.T_RETURN: {
        const result = this.node("return");
        this.next();
        const expr = this.read_optional_expr(";");
        this.expectEndOfStatement();
        return result(expr);
      }

      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L429
      case this.tok.T_BREAK:
      case this.tok.T_CONTINUE: {
        const result = this.node(
          this.token === this.tok.T_CONTINUE ? "continue" : "break"
        );
        this.next();
        const level = this.read_optional_expr(";");
        this.expectEndOfStatement();
        return result(level);
      }

      case this.tok.T_GLOBAL: {
        const result = this.node("global");
        const items = this.next().read_list(this.read_simple_variable, ",");
        this.expectEndOfStatement();
        return result(items);
      }

      case this.tok.T_STATIC: {
        const current = [this.token, this.lexer.getState()];
        const result = this.node();
        if (this.next().token === this.tok.T_DOUBLE_COLON) {
          // static keyword for a class
          this.lexer.tokens.push(current);
          const expr = this.next().read_expr();
          this.expectEndOfStatement(expr);
          return result("expressionstatement", expr);
        }
        if (this.token === this.tok.T_FUNCTION) {
          return this.read_function(true, [0, 1, 0]);
        }
        const items = this.read_variable_declarations();
        this.expectEndOfStatement();
        return result("static", items);
      }

      case this.tok.T_ECHO: {
        const result = this.node("echo");
        const text = this.text();
        const shortForm = text === "<?=" || text === "<%=";
        const expressions = this.next().read_function_list(this.read_expr, ",");
        this.expectEndOfStatement();
        return result(expressions, shortForm);
      }

      case this.tok.T_INLINE_HTML: {
        const value = this.text();
        let prevChar =
          this.lexer.yylloc.first_offset > 0
            ? this.lexer._input[this.lexer.yylloc.first_offset - 1]
            : null;
        const fixFirstLine = prevChar === "\r" || prevChar === "\n";
        // revert back the first stripped line
        if (fixFirstLine) {
          if (
            prevChar === "\n" &&
            this.lexer.yylloc.first_offset > 1 &&
            this.lexer._input[this.lexer.yylloc.first_offset - 2] === "\r"
          ) {
            prevChar = "\r\n";
          }
        }
        const result = this.node("inline");
        this.next();
        return result(value, fixFirstLine ? prevChar + value : value);
      }

      case this.tok.T_UNSET: {
        const result = this.node("unset");
        this.next().expect("(") && this.next();
        const variables = this.read_function_list(this.read_variable, ",");
        this.expect(")") && this.next();
        this.expect(";") && this.next();
        return result(variables);
      }

      case this.tok.T_DECLARE: {
        const result = this.node("declare");
        const body = [];
        let mode;
        this.next().expect("(") && this.next();
        const directives = this.read_declare_list();
        this.expect(")") && this.next();
        if (this.token === ":") {
          this.next();
          while (
            this.token != this.EOF &&
            this.token !== this.tok.T_ENDDECLARE
          ) {
            // @todo : check declare_statement from php / not valid
            body.push(this.read_top_statement());
          }
          if (
            body.length === 0 &&
            this.extractDoc &&
            this._docs.length > this._docIndex
          ) {
            body.push(this.node("noop")());
          }
          this.expect(this.tok.T_ENDDECLARE) && this.next();
          this.expectEndOfStatement();
          mode = this.ast.declare.MODE_SHORT;
        } else if (this.token === "{") {
          this.next();
          while (this.token != this.EOF && this.token !== "}") {
            // @todo : check declare_statement from php / not valid
            body.push(this.read_top_statement());
          }
          if (
            body.length === 0 &&
            this.extractDoc &&
            this._docs.length > this._docIndex
          ) {
            body.push(this.node("noop")());
          }
          this.expect("}") && this.next();
          mode = this.ast.declare.MODE_BLOCK;
        } else {
          this.expect(";") && this.next();
          mode = this.ast.declare.MODE_NONE;
        }
        return result(directives, body, mode);
      }

      case this.tok.T_TRY:
        return this.read_try();

      case this.tok.T_THROW: {
        const result = this.node("throw");
        const expr = this.next().read_expr();
        this.expectEndOfStatement();
        return result(expr);
      }

      // ignore this (extra ponctuation)
      case ";": {
        this.next();
        return null;
      }

      case this.tok.T_STRING: {
        const result = this.node();
        const current = [this.token, this.lexer.getState()];
        const labelNameText = this.text();
        let labelName = this.node("identifier");
        // AST : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L457
        if (this.next().token === ":") {
          labelName = labelName(labelNameText);
          this.next();
          return result("label", labelName);
        } else {
          labelName.destroy();
        }

        // default fallback expr / T_STRING '::' (etc...)
        result.destroy();
        this.lexer.tokens.push(current);
        const statement = this.node("expressionstatement");
        const expr = this.next().read_expr();
        this.expectEndOfStatement(expr);
        return statement(expr);
      }

      case this.tok.T_GOTO: {
        const result = this.node("goto");
        let labelName = null;
        if (this.next().expect(this.tok.T_STRING)) {
          labelName = this.node("identifier");
          const name = this.text();
          this.next();
          labelName = labelName(name);
          this.expectEndOfStatement();
        }
        return result(labelName);
      }

      default: {
        // default fallback expr
        const statement = this.node("expressionstatement");
        const expr = this.read_expr();
        this.expectEndOfStatement(expr);
        return statement(expr);
      }
    }
  },
  /*
   * ```ebnf
   *  code_block ::= '{' (inner_statements | top_statements) '}'
   * ```
   */
  read_code_block: function (top) {
    const result = this.node("block");
    this.expect("{") && this.next();
    const body = top
      ? this.read_top_statements()
      : this.read_inner_statements();
    if (
      body.length === 0 &&
      this.extractDoc &&
      this._docs.length > this._docIndex
    ) {
      body.push(this.node("noop")());
    }
    this.expect("}") && this.next();
    return result(null, body);
  },
};


/***/ }),
/* 33 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads a switch statement
   * ```ebnf
   *  switch ::= T_SWITCH '(' expr ')' switch_case_list
   * ```
   * @return {Switch}
   * @see http://php.net/manual/en/control-structures.switch.php
   */
  read_switch: function () {
    const result = this.node("switch");
    this.expect(this.tok.T_SWITCH) && this.next();
    this.expect("(") && this.next();
    const test = this.read_expr();
    this.expect(")") && this.next();
    const shortForm = this.token === ":";
    const body = this.read_switch_case_list();
    return result(test, body, shortForm);
  },
  /*
   * ```ebnf
   *  switch_case_list ::= '{' ';'? case_list* '}' | ':' ';'? case_list* T_ENDSWITCH ';'
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L566
   */
  read_switch_case_list: function () {
    // DETECT SWITCH MODE
    let expect = null;
    const result = this.node("block");
    const items = [];
    if (this.token === "{") {
      expect = "}";
    } else if (this.token === ":") {
      expect = this.tok.T_ENDSWITCH;
    } else {
      this.expect(["{", ":"]);
    }
    this.next();
    // OPTIONNAL ';'
    // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L570
    if (this.token === ";") {
      this.next();
    }
    // EXTRACTING CASES
    while (this.token !== this.EOF && this.token !== expect) {
      items.push(this.read_case_list(expect));
    }
    if (
      items.length === 0 &&
      this.extractDoc &&
      this._docs.length > this._docIndex
    ) {
      items.push(this.node("noop")());
    }
    // CHECK END TOKEN
    this.expect(expect) && this.next();
    if (expect === this.tok.T_ENDSWITCH) {
      this.expectEndOfStatement();
    }
    return result(null, items);
  },
  /*
   * ```ebnf
   *   case_list ::= ((T_CASE expr) | T_DEFAULT) (':' | ';') inner_statement*
   * ```
   */
  read_case_list: function (stopToken) {
    const result = this.node("case");
    let test = null;
    if (this.token === this.tok.T_CASE) {
      test = this.next().read_expr();
    } else if (this.token === this.tok.T_DEFAULT) {
      // the default entry - no condition
      this.next();
    } else {
      this.expect([this.tok.T_CASE, this.tok.T_DEFAULT]);
    }
    // case_separator
    this.expect([":", ";"]) && this.next();
    const body = this.node("block");
    const items = [];
    while (
      this.token !== this.EOF &&
      this.token !== stopToken &&
      this.token !== this.tok.T_CASE &&
      this.token !== this.tok.T_DEFAULT
    ) {
      items.push(this.read_inner_statement());
    }
    return result(test, body(null, items));
  },
};


/***/ }),
/* 34 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * ```ebnf
   *  try ::= T_TRY '{' inner_statement* '}'
   *          (
   *              T_CATCH '(' namespace_name variable ')' '{'  inner_statement* '}'
   *          )*
   *          (T_FINALLY '{' inner_statement* '}')?
   * ```
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L448
   * @return {Try}
   */
  read_try: function () {
    this.expect(this.tok.T_TRY);
    const result = this.node("try");
    let always = null;
    const catches = [];
    const body = this.next().read_statement();
    // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L455
    while (this.token === this.tok.T_CATCH) {
      const item = this.node("catch");
      this.next().expect("(") && this.next();
      const what = this.read_list(this.read_namespace_name, "|", false);
      const variable = this.read_variable(true, false);
      this.expect(")");
      catches.push(item(this.next().read_statement(), what, variable));
    }
    if (this.token === this.tok.T_FINALLY) {
      always = this.next().read_statement();
    }
    return result(body, catches, always);
  },
};


/***/ }),
/* 35 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads a short form of tokens
   * @param {Number} token - The ending token
   * @return {Block}
   */
  read_short_form: function (token) {
    const body = this.node("block");
    const items = [];
    if (this.expect(":")) this.next();
    while (this.token != this.EOF && this.token !== token) {
      items.push(this.read_inner_statement());
    }
    if (
      items.length === 0 &&
      this.extractDoc &&
      this._docs.length > this._docIndex
    ) {
      items.push(this.node("noop")());
    }
    if (this.expect(token)) this.next();
    this.expectEndOfStatement();
    return body(null, items);
  },

  /*
   * https://wiki.php.net/rfc/trailing-comma-function-calls
   * @param {*} item
   * @param {*} separator
   */
  read_function_list: function (item, separator) {
    const result = [];
    do {
      if (this.token == separator && this.version >= 703 && result.length > 0) {
        result.push(this.node("noop")());
        break;
      }
      result.push(item.apply(this, []));
      if (this.token != separator) {
        break;
      }
      if (this.next().token == ")" && this.version >= 703) {
        break;
      }
    } while (this.token != this.EOF);
    return result;
  },

  /*
   * Helper : reads a list of tokens / sample : T_STRING ',' T_STRING ...
   * ```ebnf
   * list ::= separator? ( item separator )* item
   * ```
   */
  read_list: function (item, separator, preserveFirstSeparator) {
    const result = [];

    if (this.token == separator) {
      if (preserveFirstSeparator) {
        result.push(typeof item === "function" ? this.node("noop")() : null);
      }
      this.next();
    }

    if (typeof item === "function") {
      do {
        const itemResult = item.apply(this, []);
        if (itemResult) {
          result.push(itemResult);
        }
        if (this.token != separator) {
          break;
        }
      } while (this.next().token != this.EOF);
    } else {
      if (this.expect(item)) {
        result.push(this.text());
      } else {
        return [];
      }
      while (this.next().token != this.EOF) {
        if (this.token != separator) break;
        // trim current separator & check item
        if (this.next().token != item) break;
        result.push(this.text());
      }
    }
    return result;
  },

  /*
   * Reads a list of names separated by a comma
   *
   * ```ebnf
   * name_list ::= namespace (',' namespace)*
   * ```
   *
   * Sample code :
   * ```php
   * <?php class foo extends bar, baz { }
   * ```
   *
   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L726
   * @return {Reference[]}
   */
  read_name_list: function () {
    return this.read_list(this.read_namespace_name, ",", false);
  },

  /*
   * Reads the byref token and assign it to the specified node
   * @param {*} cb
   */
  read_byref: function (cb) {
    let byref = this.node("byref");
    this.next();
    byref = byref(null);
    const result = cb();
    if (result) {
      this.ast.swapLocations(result, byref, result, this);
      result.byref = true;
    }
    return result;
  },

  /*
   * Reads a list of variables declarations
   *
   * ```ebnf
   * variable_declaration ::= T_VARIABLE ('=' expr)?*
   * variable_declarations ::= variable_declaration (',' variable_declaration)*
   * ```
   *
   * Sample code :
   * ```php
   * <?php static $a = 'hello', $b = 'world';
   * ```
   * @return {StaticVariable[]} Returns an array composed by a list of variables, or
   * assign values
   */
  read_variable_declarations: function () {
    return this.read_list(function () {
      const node = this.node("staticvariable");
      let variable = this.node("variable");
      // plain variable name
      if (this.expect(this.tok.T_VARIABLE)) {
        const name = this.text().substring(1);
        this.next();
        variable = variable(name, false);
      } else {
        variable = variable("#ERR", false);
      }
      if (this.token === "=") {
        return node(variable, this.next().read_expr());
      } else {
        return variable;
      }
    }, ",");
  },

  /*
   * Reads class extends
   */
  read_extends_from: function () {
    if (this.token === this.tok.T_EXTENDS) {
      return this.next().read_namespace_name();
    }

    return null;
  },

  /*
   * Reads interface extends list
   */
  read_interface_extends_list: function () {
    if (this.token === this.tok.T_EXTENDS) {
      return this.next().read_name_list();
    }

    return null;
  },

  /*
   * Reads implements list
   */
  read_implements_list: function () {
    if (this.token === this.tok.T_IMPLEMENTS) {
      return this.next().read_name_list();
    }

    return null;
  },
};


/***/ }),
/* 36 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


module.exports = {
  /*
   * Reads a variable
   *
   * ```ebnf
   *   variable ::= &? ...complex @todo
   * ```
   *
   * Some samples of parsed code :
   * ```php
   *  &$var                      // simple var
   *  $var                      // simple var
   *  classname::CONST_NAME     // dynamic class name with const retrieval
   *  foo()                     // function call
   *  $var->func()->property    // chained calls
   * ```
   */
  read_variable: function (read_only, encapsed) {
    let result;

    // check the byref flag
    if (this.token === "&") {
      return this.read_byref(
        this.read_variable.bind(this, read_only, encapsed)
      );
    }

    // reads the entry point
    if (this.is([this.tok.T_VARIABLE, "$"])) {
      result = this.read_reference_variable(encapsed);
    } else if (
      this.is([
        this.tok.T_NS_SEPARATOR,
        this.tok.T_STRING,
        this.tok.T_NAMESPACE,
      ])
    ) {
      result = this.node();
      const name = this.read_namespace_name();
      if (
        this.token != this.tok.T_DOUBLE_COLON &&
        this.token != "(" &&
        ["parentreference", "selfreference"].indexOf(name.kind) === -1
      ) {
        // @see parser.js line 130 : resolves a conflict with scalar
        const literal = name.name.toLowerCase();
        if (literal === "true") {
          result = name.destroy(result("boolean", true, name.name));
        } else if (literal === "false") {
          result = name.destroy(result("boolean", false, name.name));
        } else if (literal === "null") {
          result = name.destroy(result("nullkeyword", name.name));
        } else {
          result.destroy(name);
          result = name;
        }
      } else {
        // @fixme possible #193 bug
        result.destroy(name);
        result = name;
      }
    } else if (this.token === this.tok.T_STATIC) {
      result = this.node("staticreference");
      const raw = this.text();
      this.next();
      result = result(raw);
    } else {
      this.expect("VARIABLE");
    }

    // static mode
    if (this.token === this.tok.T_DOUBLE_COLON) {
      result = this.read_static_getter(result, encapsed);
    }

    return this.recursive_variable_chain_scan(result, read_only, encapsed);
  },

  // resolves a static call
  read_static_getter: function (what, encapsed) {
    const result = this.node("staticlookup");
    let offset, name;
    if (this.next().is([this.tok.T_VARIABLE, "$"])) {
      offset = this.read_reference_variable(encapsed);
    } else if (
      this.token === this.tok.T_STRING ||
      this.token === this.tok.T_CLASS ||
      (this.version >= 700 && this.is("IDENTIFIER"))
    ) {
      offset = this.node("identifier");
      name = this.text();
      this.next();
      offset = offset(name);
    } else if (this.token === "{") {
      offset = this.node("literal");
      name = this.next().read_expr();
      this.expect("}") && this.next();
      offset = offset("literal", name, null);
      this.expect("(");
    } else {
      this.error([this.tok.T_VARIABLE, this.tok.T_STRING]);
      // graceful mode : set getter as error node and continue
      offset = this.node("identifier");
      name = this.text();
      this.next();
      offset = offset(name);
    }
    return result(what, offset);
  },

  read_what: function (is_static_lookup = false) {
    let what = null;
    let name = null;
    switch (this.next().token) {
      case this.tok.T_STRING:
        what = this.node("identifier");
        name = this.text();
        this.next();
        what = what(name);

        if (is_static_lookup && this.token === this.tok.T_OBJECT_OPERATOR) {
          this.error();
        }
        break;
      case this.tok.T_VARIABLE:
        what = this.node("variable");
        name = this.text().substring(1);
        this.next();
        what = what(name, false);
        break;
      case "$":
        what = this.node();
        this.next().expect(["$", "{", this.tok.T_VARIABLE]);
        if (this.token === "{") {
          // $obj->${$varname}
          name = this.next().read_expr();
          this.expect("}") && this.next();
          what = what("variable", name, true);
        } else {
          // $obj->$$varname
          name = this.read_expr();
          what = what("variable", name, false);
        }
        break;
      case "{":
        what = this.node("encapsedpart");
        name = this.next().read_expr();
        this.expect("}") && this.next();
        what = what(name, "complex", false);
        break;
      default:
        this.error([this.tok.T_STRING, this.tok.T_VARIABLE, "$", "{"]);
        // graceful mode : set what as error mode & continue
        what = this.node("identifier");
        name = this.text();
        this.next();
        what = what(name);
        break;
    }

    return what;
  },

  recursive_variable_chain_scan: function (result, read_only, encapsed) {
    let node, offset;
    recursive_scan_loop: while (this.token != this.EOF) {
      switch (this.token) {
        case "(":
          if (read_only) {
            // @fixme : add more informations & test
            return result;
          } else {
            result = this.node("call")(result, this.read_argument_list());
          }
          break;
        case "[":
        case "{": {
          const backet = this.token;
          const isSquareBracket = backet === "[";
          node = this.node("offsetlookup");
          this.next();
          offset = false;
          if (encapsed) {
            offset = this.read_encaps_var_offset();
            this.expect(isSquareBracket ? "]" : "}") && this.next();
          } else {
            const isCallableVariable = isSquareBracket
              ? this.token !== "]"
              : this.token !== "}";
            // callable_variable : https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L1122
            if (isCallableVariable) {
              offset = this.read_expr();
              this.expect(isSquareBracket ? "]" : "}") && this.next();
            } else {
              this.next();
            }
          }
          result = node(result, offset);
          break;
        }
        case this.tok.T_DOUBLE_COLON:
          // @see https://github.com/glayzzle/php-parser/issues/107#issuecomment-354104574
          if (
            result.kind === "staticlookup" &&
            result.offset.kind === "identifier"
          ) {
            this.error();
          }

          node = this.node("staticlookup");
          result = node(result, this.read_what(true));

          // fix 185
          // static lookup dereferencables are limited to staticlookup over functions
          /*if (dereferencable && this.token !== "(") {
            this.error("(");
          }*/
          break;
        case this.tok.T_OBJECT_OPERATOR: {
          node = this.node("propertylookup");
          result = node(result, this.read_what());
          break;
        }
        default:
          break recursive_scan_loop;
      }
    }
    return result;
  },
  /*
   * https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L1231
   */
  read_encaps_var_offset: function () {
    let offset = this.node();
    if (this.token === this.tok.T_STRING) {
      const text = this.text();
      this.next();
      offset = offset("identifier", text);
    } else if (this.token === this.tok.T_NUM_STRING) {
      const num = this.text();
      this.next();
      offset = offset("number", num, null);
    } else if (this.token === "-") {
      this.next();
      const num = -1 * this.text();
      this.expect(this.tok.T_NUM_STRING) && this.next();
      offset = offset("number", num, null);
    } else if (this.token === this.tok.T_VARIABLE) {
      const name = this.text().substring(1);
      this.next();
      offset = offset("variable", name, false);
    } else {
      this.expect([
        this.tok.T_STRING,
        this.tok.T_NUM_STRING,
        "-",
        this.tok.T_VARIABLE,
      ]);
      // fallback : consider as identifier
      const text = this.text();
      this.next();
      offset = offset("identifier", text);
    }
    return offset;
  },
  /*
   * ```ebnf
   *  reference_variable ::=  simple_variable ('[' OFFSET ']')* | '{' EXPR '}'
   * ```
   * <code>
   *  $foo[123];      // foo is an array ==> gets its entry
   *  $foo{1};        // foo is a string ==> get the 2nd char offset
   *  ${'foo'}[123];  // get the dynamic var $foo
   *  $foo[123]{1};   // gets the 2nd char from the 123 array entry
   * </code>
   */
  read_reference_variable: function (encapsed) {
    let result = this.read_simple_variable();
    let offset;
    while (this.token != this.EOF) {
      const node = this.node();
      if (this.token == "{" && !encapsed) {
        // @fixme check coverage, not sure thats working
        offset = this.next().read_expr();
        this.expect("}") && this.next();
        result = node("offsetlookup", result, offset);
      } else {
        node.destroy();
        break;
      }
    }
    return result;
  },
  /*
   * ```ebnf
   *  simple_variable ::= T_VARIABLE | '$' '{' expr '}' | '$' simple_variable
   * ```
   */
  read_simple_variable: function () {
    let result = this.node("variable");
    let name;
    if (
      this.expect([this.tok.T_VARIABLE, "$"]) &&
      this.token === this.tok.T_VARIABLE
    ) {
      // plain variable name
      name = this.text().substring(1);
      this.next();
      result = result(name, false);
    } else {
      if (this.token === "$") this.next();
      // dynamic variable name
      switch (this.token) {
        case "{": {
          const expr = this.next().read_expr();
          this.expect("}") && this.next();
          result = result(expr, true);
          break;
        }
        case "$": // $$$var
          result = result(this.read_simple_variable(), false);
          break;
        case this.tok.T_VARIABLE: {
          // $$var
          name = this.text().substring(1);
          const node = this.node("variable");
          this.next();
          result = result(node(name, false), false);
          break;
        }
        default:
          this.error(["{", "$", this.tok.T_VARIABLE]);
          // graceful mode
          name = this.text();
          this.next();
          result = result(name, false);
      }
    }
    return result;
  },
};


/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/**
 * @memberOf module:php-parser
 * @readonly
 * @enum
 */
const TokenNames = {
  T_HALT_COMPILER: 101,
  T_USE: 102,
  T_ENCAPSED_AND_WHITESPACE: 103,
  T_OBJECT_OPERATOR: 104,
  T_STRING: 105,
  T_DOLLAR_OPEN_CURLY_BRACES: 106,
  T_STRING_VARNAME: 107,
  T_CURLY_OPEN: 108,
  T_NUM_STRING: 109,
  T_ISSET: 110,
  T_EMPTY: 111,
  T_INCLUDE: 112,
  T_INCLUDE_ONCE: 113,
  T_EVAL: 114,
  T_REQUIRE: 115,
  T_REQUIRE_ONCE: 116,
  T_NAMESPACE: 117,
  T_NS_SEPARATOR: 118,
  T_AS: 119,
  T_IF: 120,
  T_ENDIF: 121,
  T_WHILE: 122,
  T_DO: 123,
  T_FOR: 124,
  T_SWITCH: 125,
  T_BREAK: 126,
  T_CONTINUE: 127,
  T_RETURN: 128,
  T_GLOBAL: 129,
  T_STATIC: 130,
  T_ECHO: 131,
  T_INLINE_HTML: 132,
  T_UNSET: 133,
  T_FOREACH: 134,
  T_DECLARE: 135,
  T_TRY: 136,
  T_THROW: 137,
  T_GOTO: 138,
  T_FINALLY: 139,
  T_CATCH: 140,
  T_ENDDECLARE: 141,
  T_LIST: 142,
  T_CLONE: 143,
  T_PLUS_EQUAL: 144,
  T_MINUS_EQUAL: 145,
  T_MUL_EQUAL: 146,
  T_DIV_EQUAL: 147,
  T_CONCAT_EQUAL: 148,
  T_MOD_EQUAL: 149,
  T_AND_EQUAL: 150,
  T_OR_EQUAL: 151,
  T_XOR_EQUAL: 152,
  T_SL_EQUAL: 153,
  T_SR_EQUAL: 154,
  T_INC: 155,
  T_DEC: 156,
  T_BOOLEAN_OR: 157,
  T_BOOLEAN_AND: 158,
  T_LOGICAL_OR: 159,
  T_LOGICAL_AND: 160,
  T_LOGICAL_XOR: 161,
  T_SL: 162,
  T_SR: 163,
  T_IS_IDENTICAL: 164,
  T_IS_NOT_IDENTICAL: 165,
  T_IS_EQUAL: 166,
  T_IS_NOT_EQUAL: 167,
  T_IS_SMALLER_OR_EQUAL: 168,
  T_IS_GREATER_OR_EQUAL: 169,
  T_INSTANCEOF: 170,
  T_INT_CAST: 171,
  T_DOUBLE_CAST: 172,
  T_STRING_CAST: 173,
  T_ARRAY_CAST: 174,
  T_OBJECT_CAST: 175,
  T_BOOL_CAST: 176,
  T_UNSET_CAST: 177,
  T_EXIT: 178,
  T_PRINT: 179,
  T_YIELD: 180,
  T_YIELD_FROM: 181,
  T_FUNCTION: 182,
  T_DOUBLE_ARROW: 183,
  T_DOUBLE_COLON: 184,
  T_ARRAY: 185,
  T_CALLABLE: 186,
  T_CLASS: 187,
  T_ABSTRACT: 188,
  T_TRAIT: 189,
  T_FINAL: 190,
  T_EXTENDS: 191,
  T_INTERFACE: 192,
  T_IMPLEMENTS: 193,
  T_VAR: 194,
  T_PUBLIC: 195,
  T_PROTECTED: 196,
  T_PRIVATE: 197,
  T_CONST: 198,
  T_NEW: 199,
  T_INSTEADOF: 200,
  T_ELSEIF: 201,
  T_ELSE: 202,
  T_ENDSWITCH: 203,
  T_CASE: 204,
  T_DEFAULT: 205,
  T_ENDFOR: 206,
  T_ENDFOREACH: 207,
  T_ENDWHILE: 208,
  T_CONSTANT_ENCAPSED_STRING: 209,
  T_LNUMBER: 210,
  T_DNUMBER: 211,
  T_LINE: 212,
  T_FILE: 213,
  T_DIR: 214,
  T_TRAIT_C: 215,
  T_METHOD_C: 216,
  T_FUNC_C: 217,
  T_NS_C: 218,
  T_START_HEREDOC: 219,
  T_END_HEREDOC: 220,
  T_CLASS_C: 221,
  T_VARIABLE: 222,
  T_OPEN_TAG: 223,
  T_OPEN_TAG_WITH_ECHO: 224,
  T_CLOSE_TAG: 225,
  T_WHITESPACE: 226,
  T_COMMENT: 227,
  T_DOC_COMMENT: 228,
  T_ELLIPSIS: 229,
  T_COALESCE: 230,
  T_POW: 231,
  T_POW_EQUAL: 232,
  T_SPACESHIP: 233,
  T_COALESCE_EQUAL: 234,
  T_FN: 235,
};

/**
 * PHP AST Tokens
 * @readonly
 * @memberOf module:php-parser
 *
 * @type {object}
 * @property {Object.<number, string>} values
 * @property {TokenNames} names
 */
const tokens = {
  values: {
    101: "T_HALT_COMPILER",
    102: "T_USE",
    103: "T_ENCAPSED_AND_WHITESPACE",
    104: "T_OBJECT_OPERATOR",
    105: "T_STRING",
    106: "T_DOLLAR_OPEN_CURLY_BRACES",
    107: "T_STRING_VARNAME",
    108: "T_CURLY_OPEN",
    109: "T_NUM_STRING",
    110: "T_ISSET",
    111: "T_EMPTY",
    112: "T_INCLUDE",
    113: "T_INCLUDE_ONCE",
    114: "T_EVAL",
    115: "T_REQUIRE",
    116: "T_REQUIRE_ONCE",
    117: "T_NAMESPACE",
    118: "T_NS_SEPARATOR",
    119: "T_AS",
    120: "T_IF",
    121: "T_ENDIF",
    122: "T_WHILE",
    123: "T_DO",
    124: "T_FOR",
    125: "T_SWITCH",
    126: "T_BREAK",
    127: "T_CONTINUE",
    128: "T_RETURN",
    129: "T_GLOBAL",
    130: "T_STATIC",
    131: "T_ECHO",
    132: "T_INLINE_HTML",
    133: "T_UNSET",
    134: "T_FOREACH",
    135: "T_DECLARE",
    136: "T_TRY",
    137: "T_THROW",
    138: "T_GOTO",
    139: "T_FINALLY",
    140: "T_CATCH",
    141: "T_ENDDECLARE",
    142: "T_LIST",
    143: "T_CLONE",
    144: "T_PLUS_EQUAL",
    145: "T_MINUS_EQUAL",
    146: "T_MUL_EQUAL",
    147: "T_DIV_EQUAL",
    148: "T_CONCAT_EQUAL",
    149: "T_MOD_EQUAL",
    150: "T_AND_EQUAL",
    151: "T_OR_EQUAL",
    152: "T_XOR_EQUAL",
    153: "T_SL_EQUAL",
    154: "T_SR_EQUAL",
    155: "T_INC",
    156: "T_DEC",
    157: "T_BOOLEAN_OR",
    158: "T_BOOLEAN_AND",
    159: "T_LOGICAL_OR",
    160: "T_LOGICAL_AND",
    161: "T_LOGICAL_XOR",
    162: "T_SL",
    163: "T_SR",
    164: "T_IS_IDENTICAL",
    165: "T_IS_NOT_IDENTICAL",
    166: "T_IS_EQUAL",
    167: "T_IS_NOT_EQUAL",
    168: "T_IS_SMALLER_OR_EQUAL",
    169: "T_IS_GREATER_OR_EQUAL",
    170: "T_INSTANCEOF",
    171: "T_INT_CAST",
    172: "T_DOUBLE_CAST",
    173: "T_STRING_CAST",
    174: "T_ARRAY_CAST",
    175: "T_OBJECT_CAST",
    176: "T_BOOL_CAST",
    177: "T_UNSET_CAST",
    178: "T_EXIT",
    179: "T_PRINT",
    180: "T_YIELD",
    181: "T_YIELD_FROM",
    182: "T_FUNCTION",
    183: "T_DOUBLE_ARROW",
    184: "T_DOUBLE_COLON",
    185: "T_ARRAY",
    186: "T_CALLABLE",
    187: "T_CLASS",
    188: "T_ABSTRACT",
    189: "T_TRAIT",
    190: "T_FINAL",
    191: "T_EXTENDS",
    192: "T_INTERFACE",
    193: "T_IMPLEMENTS",
    194: "T_VAR",
    195: "T_PUBLIC",
    196: "T_PROTECTED",
    197: "T_PRIVATE",
    198: "T_CONST",
    199: "T_NEW",
    200: "T_INSTEADOF",
    201: "T_ELSEIF",
    202: "T_ELSE",
    203: "T_ENDSWITCH",
    204: "T_CASE",
    205: "T_DEFAULT",
    206: "T_ENDFOR",
    207: "T_ENDFOREACH",
    208: "T_ENDWHILE",
    209: "T_CONSTANT_ENCAPSED_STRING",
    210: "T_LNUMBER",
    211: "T_DNUMBER",
    212: "T_LINE",
    213: "T_FILE",
    214: "T_DIR",
    215: "T_TRAIT_C",
    216: "T_METHOD_C",
    217: "T_FUNC_C",
    218: "T_NS_C",
    219: "T_START_HEREDOC",
    220: "T_END_HEREDOC",
    221: "T_CLASS_C",
    222: "T_VARIABLE",
    223: "T_OPEN_TAG",
    224: "T_OPEN_TAG_WITH_ECHO",
    225: "T_CLOSE_TAG",
    226: "T_WHITESPACE",
    227: "T_COMMENT",
    228: "T_DOC_COMMENT",
    229: "T_ELLIPSIS",
    230: "T_COALESCE",
    231: "T_POW",
    232: "T_POW_EQUAL",
    233: "T_SPACESHIP",
    234: "T_COALESCE_EQUAL",
    235: "T_FN",
  },
  names: TokenNames,
};

module.exports = Object.freeze(tokens);


/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Location = __webpack_require__(39);
const Position = __webpack_require__(40);

/**
 * ## Class hierarchy
 *
 * - [Location](#location)
 * - [Position](#position)
 * - [Node](#node)
 *   - [Noop](#noop)
 *   - [NullKeyword](#nullkeyword)
 *   - [StaticVariable](#staticvariable)
 *   - [EncapsedPart](#encapsedpart)
 *   - [Constant](#constant)
 *   - [Identifier](#identifier)
 *   - [Reference](#reference)
 *     - [TypeReference](#typereference)
 *     - [ParentReference](#parentreference)
 *     - [StaticReference](#staticreference)
 *     - [SelfReference](#selfreference)
 *     - [Name](#name)
 *   - [TraitUse](#traituse)
 *   - [TraitAlias](#traitalias)
 *   - [TraitPrecedence](#traitprecedence)
 *   - [Comment](#comment)
 *     - [CommentLine](#commentline)
 *     - [CommentBlock](#commentblock)
 *   - [Error](#error)
 *   - [Expression](#expression)
 *     - [Entry](#entry)
 *     - [ArrowFunc](#arrowfunc)
 *     - [Closure](#closure)
 *     - [ByRef](#byref)
 *     - [Silent](#silent)
 *     - [RetIf](#retif)
 *     - [New](#new)
 *     - [Include](#include)
 *     - [Call](#call)
 *     - [Eval](#eval)
 *     - [Exit](#exit)
 *     - [Clone](#clone)
 *     - [Assign](#assign)
 *     - [AssignRef](#assignref)
 *     - [Array](#array)
 *     - [List](#list)
 *     - [Variable](#variable)
 *     - [Variadic](#variadic)
 *     - [Yield](#yield)
 *     - [YieldFrom](#yieldfrom)
 *     - [Print](#print)
 *     - [Isset](#isset)
 *     - [Empty](#empty)
 *     - [Lookup](#lookup)
 *       - [PropertyLookup](#propertylookup)
 *       - [StaticLookup](#staticlookup)
 *       - [OffsetLookup](#offsetlookup)
 *     - [Operation](#operation)
 *       - [Pre](#pre)
 *       - [Post](#post)
 *       - [Bin](#bin)
 *       - [Unary](#unary)
 *       - [Cast](#cast)
 *     - [Literal](#literal)
 *       - [Boolean](#boolean)
 *       - [String](#string)
 *       - [Number](#number)
 *       - [Inline](#inline)
 *       - [Magic](#magic)
 *       - [Nowdoc](#nowdoc)
 *       - [Encapsed](#encapsed)
 *   - [Statement](#statement)
 *     - [ConstantStatement](#constantstatement)
 *       - [ClassConstant](#classconstant)
 *     - [Return](#return)
 *     - [Label](#label)
 *     - [Continue](#continue)
 *     - [Case](#case)
 *     - [Break](#break)
 *     - [Echo](#echo)
 *     - [Unset](#unset)
 *     - [Halt](#halt)
 *     - [Declare](#declare)
 *     - [Global](#global)
 *     - [Static](#static)
 *     - [If](#if)
 *     - [Do](#do)
 *     - [While](#while)
 *     - [For](#for)
 *     - [Foreach](#foreach)
 *     - [Switch](#switch)
 *     - [Goto](#goto)
 *     - [Try](#try)
 *     - [Catch](#catch)
 *     - [Throw](#throw)
 *     - [UseGroup](#usegroup)
 *     - [UseItem](#useitem)
 *     - [Block](#block)
 *       - [Program](#program)
 *       - [Namespace](#namespace)
 *     - [PropertyStatement](#propertystatement)
 *     - [Property](#property)
 *     - [Declaration](#declaration)
 *       - [Class](#class)
 *       - [Interface](#interface)
 *       - [Trait](#trait)
 *       - [Function](#function)
 *         - [Method](#method)
 *       - [Parameter](#parameter)
 * ---
 */

/**
 * The AST builder class
 * @constructor AST
 * @memberOf module:php-parser
 * @tutorial AST
 * @property {Boolean} withPositions - Should locate any node (by default false)
 * @property {Boolean} withSource - Should extract the node original code (by default false)
 */
const AST = function (withPositions, withSource) {
  this.withPositions = withPositions;
  this.withSource = withSource;
};

/**
 * Create a position node from specified parser
 * including it's lexer current state
 * @private
 * @function AST#position
 * @memberOf module:php-parser
 * @param {Parser} parser
 * @return {Position}
 */
AST.prototype.position = function (parser) {
  return new Position(
    parser.lexer.yylloc.first_line,
    parser.lexer.yylloc.first_column,
    parser.lexer.yylloc.first_offset
  );
};

// operators in ascending order of precedence
AST.precedence = {};
[
  ["or"],
  ["xor"],
  ["and"],
  ["="],
  ["?"],
  ["??"],
  ["||"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "!=", "===", "!==", /* '<>', */ "<=>"],
  ["<", "<=", ">", ">="],
  ["<<", ">>"],
  ["+", "-", "."],
  ["*", "/", "%"],
  ["!"],
  ["instanceof"],
  ["cast", "silent"],
  ["**"],
  // TODO: [ (array)
  // TODO: clone, new
].forEach(function (list, index) {
  list.forEach(function (operator) {
    AST.precedence[operator] = index + 1;
  });
});

/**
 * @private
 * @function AST#isRightAssociative
 * @memberOf module:php-parser
 * @param operator
 * @return {boolean}
 */
AST.prototype.isRightAssociative = function (operator) {
  return operator === "**" || operator === "??";
};

/**
 * Change parent node informations after swapping childs
 * @private
 * @function AST#swapLocations
 * @memberOf module:php-parser
 */
AST.prototype.swapLocations = function (target, first, last, parser) {
  if (this.withPositions) {
    target.loc.start = first.loc.start;
    target.loc.end = last.loc.end;
    if (this.withSource) {
      target.loc.source = parser.lexer._input.substring(
        target.loc.start.offset,
        target.loc.end.offset
      );
    }
  }
};

/**
 * Includes locations from first & last into the target
 * @private
 * @function AST#resolveLocations
 * @memberOf module:php-parser
 */
AST.prototype.resolveLocations = function (target, first, last, parser) {
  if (this.withPositions) {
    if (target.loc.start.offset > first.loc.start.offset) {
      target.loc.start = first.loc.start;
    }
    if (target.loc.end.offset < last.loc.end.offset) {
      target.loc.end = last.loc.end;
    }
    if (this.withSource) {
      target.loc.source = parser.lexer._input.substring(
        target.loc.start.offset,
        target.loc.end.offset
      );
    }
  }
};

/**
 * Check and fix precence, by default using right
 * @private
 * @function AST#resolvePrecedence
 * @memberOf module:php-parser
 */
AST.prototype.resolvePrecedence = function (result, parser) {
  let buffer, lLevel, rLevel;
  // handling precendence
  if (result.kind === "call") {
    // including what argument into location
    this.resolveLocations(result, result.what, result, parser);
  } else if (
    result.kind === "propertylookup" ||
    result.kind === "staticlookup" ||
    (result.kind === "offsetlookup" && result.offset)
  ) {
    // including what argument into location
    this.resolveLocations(result, result.what, result.offset, parser);
  } else if (result.kind === "bin") {
    if (result.right && !result.right.parenthesizedExpression) {
      if (result.right.kind === "bin") {
        lLevel = AST.precedence[result.type];
        rLevel = AST.precedence[result.right.type];
        if (
          lLevel &&
          rLevel &&
          rLevel <= lLevel &&
          (result.type !== result.right.type ||
            !this.isRightAssociative(result.type))
        ) {
          // https://github.com/glayzzle/php-parser/issues/79
          // shift precedence
          buffer = result.right;
          result.right = result.right.left;
          this.swapLocations(result, result.left, result.right, parser);
          buffer.left = this.resolvePrecedence(result, parser);
          this.swapLocations(buffer, buffer.left, buffer.right, parser);
          result = buffer;
        }
      } else if (result.right.kind === "retif") {
        lLevel = AST.precedence[result.type];
        rLevel = AST.precedence["?"];
        if (lLevel && rLevel && rLevel <= lLevel) {
          buffer = result.right;
          result.right = result.right.test;
          this.swapLocations(result, result.left, result.right, parser);
          buffer.test = this.resolvePrecedence(result, parser);
          this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
          result = buffer;
        }
      }
    }
  } else if (
    (result.kind === "silent" || result.kind === "cast") &&
    result.expr &&
    !result.expr.parenthesizedExpression
  ) {
    // https://github.com/glayzzle/php-parser/issues/172
    if (result.expr.kind === "bin") {
      buffer = result.expr;
      result.expr = result.expr.left;
      this.swapLocations(result, result, result.expr, parser);
      buffer.left = this.resolvePrecedence(result, parser);
      this.swapLocations(buffer, buffer.left, buffer.right, parser);
      result = buffer;
    } else if (result.expr.kind === "retif") {
      buffer = result.expr;
      result.expr = result.expr.test;
      this.swapLocations(result, result, result.expr, parser);
      buffer.test = this.resolvePrecedence(result, parser);
      this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
      result = buffer;
    }
  } else if (result.kind === "unary") {
    // https://github.com/glayzzle/php-parser/issues/75
    if (result.what && !result.what.parenthesizedExpression) {
      // unary precedence is allways lower
      if (result.what.kind === "bin") {
        buffer = result.what;
        result.what = result.what.left;
        this.swapLocations(result, result, result.what, parser);
        buffer.left = this.resolvePrecedence(result, parser);
        this.swapLocations(buffer, buffer.left, buffer.right, parser);
        result = buffer;
      } else if (result.what.kind === "retif") {
        buffer = result.what;
        result.what = result.what.test;
        this.swapLocations(result, result, result.what, parser);
        buffer.test = this.resolvePrecedence(result, parser);
        this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
        result = buffer;
      }
    }
  } else if (result.kind === "retif") {
    // https://github.com/glayzzle/php-parser/issues/77
    if (
      result.falseExpr &&
      result.falseExpr.kind === "retif" &&
      !result.falseExpr.parenthesizedExpression
    ) {
      buffer = result.falseExpr;
      result.falseExpr = buffer.test;
      this.swapLocations(result, result.test, result.falseExpr, parser);
      buffer.test = this.resolvePrecedence(result, parser);
      this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
      result = buffer;
    }
  } else if (result.kind === "assign") {
    // https://github.com/glayzzle/php-parser/issues/81
    if (
      result.right &&
      result.right.kind === "bin" &&
      !result.right.parenthesizedExpression
    ) {
      lLevel = AST.precedence["="];
      rLevel = AST.precedence[result.right.type];
      // only shifts with and, xor, or
      if (lLevel && rLevel && rLevel < lLevel) {
        buffer = result.right;
        result.right = result.right.left;
        buffer.left = result;
        this.swapLocations(buffer, buffer.left, result.right, parser);
        result = buffer;
      }
    }
  } else if (result.kind === "expressionstatement") {
    this.swapLocations(result, result.expression, result, parser);
  }
  return result;
};

/**
 * Prepares an AST node
 * @private
 * @function AST#prepare
 * @memberOf module:php-parser
 * @param {String|null} kind - Defines the node type
 * @param {*} docs - (if null, the kind must be passed at the function call)
 * @param {Parser} parser - The parser instance (use for extracting locations)
 * @return {Function}
 */
AST.prototype.prepare = function (kind, docs, parser) {
  let start = null;
  if (this.withPositions || this.withSource) {
    start = this.position(parser);
  }
  const self = this;
  // returns the node
  const result = function () {
    let location = null;
    const args = Array.prototype.slice.call(arguments);
    args.push(docs);
    if (self.withPositions || self.withSource) {
      let src = null;
      if (self.withSource) {
        src = parser.lexer._input.substring(start.offset, parser.prev[2]);
      }
      // if with source, need location on swapLocations function
      location = new Location(
        src,
        start,
        new Position(parser.prev[0], parser.prev[1], parser.prev[2])
      );
      // last argument is allways the location
      args.push(location);
    }
    // handle lazy kind definitions
    if (!kind) {
      kind = args.shift();
    }
    // build the object
    const node = self[kind];
    if (typeof node !== "function") {
      throw new Error('Undefined node "' + kind + '"');
    }
    const astNode = Object.create(node.prototype);
    node.apply(astNode, args);
    result.instance = astNode;
    if (result.trailingComments) {
      // buffer of trailingComments
      astNode.trailingComments = result.trailingComments;
    }
    if (typeof result.postBuild === "function") {
      result.postBuild(astNode);
    }
    if (parser.debug) {
      delete AST.stack[result.stackUid];
    }
    return self.resolvePrecedence(astNode, parser);
  };
  if (parser.debug) {
    if (!AST.stack) {
      AST.stack = {};
      AST.stackUid = 1;
    }
    AST.stack[++AST.stackUid] = {
      position: start,
      stack: new Error().stack.split("\n").slice(3, 5),
    };
    result.stackUid = AST.stackUid;
  }

  /**
   * Sets a list of trailing comments
   * @private
   * @param {*} docs
   */
  result.setTrailingComments = function (docs) {
    if (result.instance) {
      // already created
      result.instance.setTrailingComments(docs);
    } else {
      result.trailingComments = docs;
    }
  };

  /**
   * Release a node without using it on the AST
   * @private
   * @param {*} target
   */
  result.destroy = function (target) {
    if (docs) {
      // release current docs stack
      if (target) {
        if (!target.leadingComments) {
          target.leadingComments = docs;
        } else {
          target.leadingComments = docs.concat(target.leadingComments);
        }
      } else {
        parser._docIndex = parser._docs.length - docs.length;
      }
    }
    if (parser.debug) {
      delete AST.stack[result.stackUid];
    }
  };
  return result;
};

AST.prototype.checkNodes = function () {
  const errors = [];
  for (const k in AST.stack) {
    if (AST.stack.hasOwnProperty(k)) {
      errors.push(AST.stack[k]);
    }
  }
  AST.stack = {};
  return errors;
};

// Define all AST nodes
[
  __webpack_require__(41),
  __webpack_require__(44),
  __webpack_require__(45),
  __webpack_require__(46),
  __webpack_require__(47),
  __webpack_require__(49),
  __webpack_require__(51),
  __webpack_require__(53),
  __webpack_require__(54),
  __webpack_require__(55),
  __webpack_require__(56),
  __webpack_require__(57),
  __webpack_require__(58),
  __webpack_require__(59),
  __webpack_require__(61),
  __webpack_require__(63),
  __webpack_require__(64),
  __webpack_require__(65),
  __webpack_require__(66),
  __webpack_require__(67),
  __webpack_require__(68),
  __webpack_require__(62),
  __webpack_require__(69),
  __webpack_require__(60),
  __webpack_require__(70),
  __webpack_require__(71),
  __webpack_require__(72),
  __webpack_require__(73),
  __webpack_require__(74),
  __webpack_require__(75),
  __webpack_require__(76),
  __webpack_require__(77),
  __webpack_require__(78),
  __webpack_require__(79),
  __webpack_require__(80),
  __webpack_require__(42),
  __webpack_require__(81),
  __webpack_require__(82),
  __webpack_require__(83),
  __webpack_require__(84),
  __webpack_require__(85),
  __webpack_require__(86),
  __webpack_require__(87),
  __webpack_require__(88),
  __webpack_require__(89),
  __webpack_require__(90),
  __webpack_require__(91),
  __webpack_require__(92),
  __webpack_require__(93),
  __webpack_require__(94),
  __webpack_require__(95),
  __webpack_require__(52),
  __webpack_require__(96),
  __webpack_require__(97),
  __webpack_require__(98),
  __webpack_require__(99),
  __webpack_require__(101),
  __webpack_require__(102),
  __webpack_require__(43),
  __webpack_require__(103),
  __webpack_require__(104),
  __webpack_require__(105),
  __webpack_require__(106),
  __webpack_require__(107),
  __webpack_require__(48),
  __webpack_require__(108),
  __webpack_require__(109),
  __webpack_require__(110),
  __webpack_require__(111),
  __webpack_require__(112),
  __webpack_require__(113),
  __webpack_require__(114),
  __webpack_require__(115),
  __webpack_require__(116),
  __webpack_require__(100),
  __webpack_require__(117),
  __webpack_require__(118),
  __webpack_require__(119),
  __webpack_require__(120),
  __webpack_require__(50),
  __webpack_require__(121),
  __webpack_require__(122),
  __webpack_require__(123),
  __webpack_require__(124),
  __webpack_require__(125),
  __webpack_require__(126),
  __webpack_require__(127),
  __webpack_require__(128),
  __webpack_require__(129),
  __webpack_require__(130),
  __webpack_require__(131),
  __webpack_require__(132),
  __webpack_require__(133),
  __webpack_require__(134),
  __webpack_require__(135),
  __webpack_require__(136),
  __webpack_require__(137),
  __webpack_require__(138),
  __webpack_require__(139),
  __webpack_require__(140),
  __webpack_require__(141),
  __webpack_require__(142),
].forEach(function (ctor) {
  AST.prototype[ctor.kind] = ctor;
});

module.exports = AST;


/***/ }),
/* 39 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/**
 * Defines the location of the node (with it's source contents as string)
 * @constructor Location
 * @memberOf module:php-parser
 * @property {string|null} source
 * @property {Position} start
 * @property {Position} end
 */
const Location = function (source, start, end) {
  this.source = source;
  this.start = start;
  this.end = end;
};

module.exports = Location;


/***/ }),
/* 40 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/**
 * Each Position object consists of a line number (1-indexed) and a column number (0-indexed):
 * @constructor Position
 * @memberOf module:php-parser
 * @property {number} line
 * @property {number} column
 * @property {number} offset
 */
const Position = function (line, column, offset) {
  this.line = line;
  this.column = column;
  this.offset = offset;
};

module.exports = Position;


/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expr = __webpack_require__(42);
const KIND = "array";

/**
 * Defines an array structure
 * @constructor Array
 * @memberOf module:php-parser
 * @example
 * // PHP code :
 * [1, 'foo' => 'bar', 3]
 *
 * // AST structure :
 * {
 *  "kind": "array",
 *  "shortForm": true
 *  "items": [
 *    {"kind": "number", "value": "1"},
 *    {
 *      "kind": "entry",
 *      "key": {"kind": "string", "value": "foo", "isDoubleQuote": false},
 *      "value": {"kind": "string", "value": "bar", "isDoubleQuote": false}
 *    },
 *    {"kind": "number", "value": "3"}
 *  ]
 * }
 * @extends {Expression}
 * @property {Entry|Expression|Variable} items List of array items
 * @property {boolean} shortForm Indicate if the short array syntax is used, ex `[]` instead `array()`
 */
module.exports = Expr.extends(
  KIND,
  function Array(shortForm, items, docs, location) {
    Expr.apply(this, [KIND, docs, location]);
    this.items = items;
    this.shortForm = shortForm;
  }
);


/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "expression";

/**
 * Any expression node. Since the left-hand side of an assignment may
 * be any expression in general, an expression can also be a pattern.
 * @constructor Expression
 * @memberOf module:php-parser
 * @extends {Node}
 */
module.exports = Node.extends(KIND, function Expression(kind, docs, location) {
  Node.apply(this, [kind || KIND, docs, location]);
});


/***/ }),
/* 43 */
/***/ ((module) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


/**
 * A generic AST node
 * @constructor Node
 * @memberOf module:php-parser
 * @property {Location|null} loc
 * @property {CommentBlock[]|Comment[]|null} leadingComments
 * @property {CommentBlock[]|Comment[]|null} trailingComments
 * @property {string} kind
 */
const Node = function Node(kind, docs, location) {
  this.kind = kind;
  if (docs) {
    this.leadingComments = docs;
  }
  if (location) {
    this.loc = location;
  }
};

/**
 * Attach comments to current node
 * @function Node#setTrailingComments
 * @memberOf module:php-parser
 * @param {*} docs
 */
Node.prototype.setTrailingComments = function (docs) {
  this.trailingComments = docs;
};

/**
 * Destroying an unused node
 * @function Node#destroy
 * @memberOf module:php-parser
 */
Node.prototype.destroy = function (node) {
  if (!node) {
    throw new Error(
      "Node already initialized, you must swap with another node"
    );
  }
  if (this.leadingComments) {
    if (node.leadingComments) {
      node.leadingComments = Array.concat(
        this.leadingComments,
        node.leadingComments
      );
    } else {
      node.leadingComments = this.leadingComments;
    }
  }
  if (this.trailingComments) {
    if (node.trailingComments) {
      node.trailingComments = Array.concat(
        this.trailingComments,
        node.trailingComments
      );
    } else {
      node.trailingComments = this.trailingComments;
    }
  }
  return node;
};

/**
 * Includes current token position of the parser
 * @function Node#includeToken
 * @memberOf module:php-parser
 * @param {*} parser
 */
Node.prototype.includeToken = function (parser) {
  if (this.loc) {
    if (this.loc.end) {
      this.loc.end.line = parser.lexer.yylloc.last_line;
      this.loc.end.column = parser.lexer.yylloc.last_column;
      this.loc.end.offset = parser.lexer.offset;
    }
    if (parser.ast.withSource) {
      this.loc.source = parser.lexer._input.substring(
        this.loc.start.offset,
        parser.lexer.offset
      );
    }
  }
  return this;
};

/**
 * Helper for extending the Node class
 * @function Node.extends
 * @memberOf module:php-parser
 * @param {string} type
 * @param {Function} constructor
 * @return {Function}
 */
Node.extends = function (type, constructor) {
  constructor.prototype = Object.create(this.prototype);
  constructor.extends = this.extends;
  constructor.prototype.constructor = constructor;
  constructor.kind = type;
  return constructor;
};

module.exports = Node;


/***/ }),
/* 44 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "arrowfunc";

/**
 * Defines an arrow function (it's like a closure)
 * @constructor ArrowFunc
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Parameter[]} arguments
 * @property {Identifier} type
 * @property {Expression} body
 * @property {boolean} byref
 * @property {boolean} nullable
 * @property {boolean} isStatic
 */
module.exports = Expression.extends(
  KIND,
  function Closure(
    args,
    byref,
    body,
    type,
    nullable,
    isStatic,
    docs,
    location
  ) {
    Expression.apply(this, [KIND, docs, location]);
    this.arguments = args;
    this.byref = byref;
    this.body = body;
    this.type = type;
    this.nullable = nullable;
    this.isStatic = isStatic || false;
  }
);


/***/ }),
/* 45 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "assign";

/**
 * Assigns a value to the specified target
 * @constructor Assign
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} left
 * @property {Expression} right
 * @property {String} operator
 */
module.exports = Expression.extends(
  KIND,
  function Assign(left, right, operator, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.left = left;
    this.right = right;
    this.operator = operator;
  }
);


/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "assignref";

/**
 * Assigns a value to the specified target
 * @constructor AssignRef
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} left
 * @property {Expression} right
 * @property {String} operator
 */
module.exports = Expression.extends(
  KIND,
  function AssignRef(left, right, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.left = left;
    this.right = right;
  }
);


/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Operation = __webpack_require__(48);
const KIND = "bin";
/**
 * Binary operations
 * @constructor Bin
 * @memberOf module:php-parser
 * @extends {Operation}
 * @property {String} type
 * @property {Expression} left
 * @property {Expression} right
 */
module.exports = Operation.extends(
  KIND,
  function Bin(type, left, right, docs, location) {
    Operation.apply(this, [KIND, docs, location]);
    this.type = type;
    this.left = left;
    this.right = right;
  }
);


/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expr = __webpack_require__(42);
const KIND = "operation";

/**
 * Defines binary operations
 * @constructor Operation
 * @memberOf module:php-parser
 * @extends {Expression}
 */
module.exports = Expr.extends(KIND, function Operation(kind, docs, location) {
  Expr.apply(this, [kind || KIND, docs, location]);
});


/***/ }),
/* 49 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "block";

/**
 * A block statement, i.e., a sequence of statements surrounded by braces.
 * @constructor Block
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Node[]} children
 */
module.exports = Statement.extends(
  KIND,
  function Block(kind, children, docs, location) {
    Statement.apply(this, [kind || KIND, docs, location]);
    this.children = children.filter(Boolean);
  }
);


/***/ }),
/* 50 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "statement";

/**
 * Any statement.
 * @constructor Statement
 * @memberOf module:php-parser
 * @extends {Node}
 */
module.exports = Node.extends(KIND, function Statement(kind, docs, location) {
  Node.apply(this, [kind || KIND, docs, location]);
});


/***/ }),
/* 51 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "boolean";

/**
 * Defines a boolean value (true/false)
 * @constructor Boolean
 * @memberOf module:php-parser
 * @extends {Literal}
 */
module.exports = Literal.extends(
  KIND,
  function Boolean(value, raw, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
  }
);


/***/ }),
/* 52 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "literal";

/**
 * Defines an array structure
 * @constructor Literal
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {string} raw
 * @property {Node|string|number|boolean|null} value
 */
module.exports = Expression.extends(
  KIND,
  function Literal(kind, value, raw, docs, location) {
    Expression.apply(this, [kind || KIND, docs, location]);
    this.value = value;
    if (raw) {
      this.raw = raw;
    }
  }
);


/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "break";

/**
 * A break statement
 * @constructor Break
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Number|Null} level
 */
module.exports = Statement.extends(KIND, function Break(level, docs, location) {
  Statement.apply(this, [KIND, docs, location]);
  this.level = level;
});


/***/ }),
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "byref";

/**
 * Passing by Reference - so the function can modify the variable
 * @constructor ByRef
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {ExpressionStatement} what
 */
module.exports = Expression.extends(KIND, function ByRef(what, docs, location) {
  Expression.apply(this, [KIND, docs, location]);
  this.what = what;
});


/***/ }),
/* 55 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "call";

/**
 * Executes a call statement
 * @constructor Call
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Identifier|Variable} what
 * @property {Variable[]} arguments
 */
module.exports = Expression.extends(
  KIND,
  function Call(what, args, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.what = what;
    this.arguments = args;
  }
);


/***/ }),
/* 56 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "case";

/**
 * A switch case statement
 * @constructor Case
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression|null} test - if null, means that the default case
 * @property {Block|null} body
 */
module.exports = Statement.extends(
  KIND,
  function Case(test, body, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.test = test;
    this.body = body;
  }
);


/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Operation = __webpack_require__(48);
const KIND = "cast";

/**
 * Binary operations
 * @constructor Cast
 * @memberOf module:php-parser
 * @extends {Operation}
 * @property {String} type
 * @property {String} raw
 * @property {Expression} expr
 */
module.exports = Operation.extends(
  KIND,
  function Cast(type, raw, expr, docs, location) {
    Operation.apply(this, [KIND, docs, location]);
    this.type = type;
    this.raw = raw;
    this.expr = expr;
  }
);


/***/ }),
/* 58 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "catch";

/**
 * Defines a catch statement
 * @constructor Catch
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Identifier[]} what
 * @property {Variable} variable
 * @property {Statement} body
 * @see http://php.net/manual/en/language.exceptions.php
 */
module.exports = Statement.extends(
  KIND,
  function Catch(body, what, variable, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.body = body;
    this.what = what;
    this.variable = variable;
  }
);


/***/ }),
/* 59 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Declaration = __webpack_require__(60);
const KIND = "class";

/**
 * A class definition
 * @constructor Class
 * @memberOf module:php-parser
 * @extends {Declaration}
 * @property {Identifier|null} extends
 * @property {Identifier[]} implements
 * @property {Declaration[]} body
 * @property {boolean} isAnonymous
 * @property {boolean} isAbstract
 * @property {boolean} isFinal
 */
module.exports = Declaration.extends(
  KIND,
  function Class(name, ext, impl, body, flags, docs, location) {
    Declaration.apply(this, [KIND, name, docs, location]);
    this.isAnonymous = name ? false : true;
    this.extends = ext;
    this.implements = impl;
    this.body = body;
    this.parseFlags(flags);
  }
);


/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "declaration";

const IS_UNDEFINED = "";
const IS_PUBLIC = "public";
const IS_PROTECTED = "protected";
const IS_PRIVATE = "private";

/**
 * A declaration statement (function, class, interface...)
 * @constructor Declaration
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Identifier|string} name
 */
const Declaration = Statement.extends(
  KIND,
  function Declaration(kind, name, docs, location) {
    Statement.apply(this, [kind || KIND, docs, location]);
    this.name = name;
  }
);

/**
 * Generic flags parser
 * @function
 * @name Declaration#parseFlags
 * @memberOf module:php-parser
 * @param {Array<number|null>} flags
 * @return {void}
 */
Declaration.prototype.parseFlags = function (flags) {
  this.isAbstract = flags[2] === 1;
  this.isFinal = flags[2] === 2;
  if (this.kind !== "class") {
    if (flags[0] === -1) {
      this.visibility = IS_UNDEFINED;
    } else if (flags[0] === null) {
      this.visibility = null;
    } else if (flags[0] === 0) {
      this.visibility = IS_PUBLIC;
    } else if (flags[0] === 1) {
      this.visibility = IS_PROTECTED;
    } else if (flags[0] === 2) {
      this.visibility = IS_PRIVATE;
    }
    this.isStatic = flags[1] === 1;
  }
};

module.exports = Declaration;


/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const ConstantStatement = __webpack_require__(62);
const KIND = "classconstant";

const IS_UNDEFINED = "";
const IS_PUBLIC = "public";
const IS_PROTECTED = "protected";
const IS_PRIVATE = "private";

/**
 * Defines a class/interface/trait constant
 * @constructor ClassConstant
 * @memberOf module:php-parser
 * @extends {ConstantStatement}
 * @property {string} visibility
 */
const ClassConstant = ConstantStatement.extends(
  KIND,
  function ClassConstant(kind, constants, flags, docs, location) {
    ConstantStatement.apply(this, [kind || KIND, constants, docs, location]);
    this.parseFlags(flags);
  }
);

/**
 * Generic flags parser
 * @function
 * @name ClassConstant#parseFlags
 * @memberOf module:php-parser
 * @param {Array<number|null>} flags
 * @return {void}
 */
ClassConstant.prototype.parseFlags = function (flags) {
  if (flags[0] === -1) {
    this.visibility = IS_UNDEFINED;
  } else if (flags[0] === null) {
    this.visibility = null;
  } else if (flags[0] === 0) {
    this.visibility = IS_PUBLIC;
  } else if (flags[0] === 1) {
    this.visibility = IS_PROTECTED;
  } else if (flags[0] === 2) {
    this.visibility = IS_PRIVATE;
  }
};

module.exports = ClassConstant;


/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "constantstatement";

/**
 * Declares a constants into the current scope
 * @constructor ConstantStatement
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Constant[]} constants
 */
module.exports = Statement.extends(
  KIND,
  function ConstantStatement(kind, constants, docs, location) {
    Statement.apply(this, [kind || KIND, docs, location]);
    this.constants = constants;
  }
);


/***/ }),
/* 63 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "clone";

/**
 * Defines a clone call
 * @constructor Clone
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} what
 */
module.exports = Expression.extends(KIND, function Clone(what, docs, location) {
  Expression.apply(this, [KIND, docs, location]);
  this.what = what;
});


/***/ }),
/* 64 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "closure";

/**
 * Defines a closure
 * @constructor Closure
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Parameter[]} arguments
 * @property {Variable[]} uses
 * @property {Identifier} type
 * @property {Boolean} byref
 * @property {boolean} nullable
 * @property {Block|null} body
 * @property {boolean} isStatic
 */
module.exports = Expression.extends(
  KIND,
  function Closure(
    args,
    byref,
    uses,
    type,
    nullable,
    isStatic,
    docs,
    location
  ) {
    Expression.apply(this, [KIND, docs, location]);
    this.uses = uses;
    this.arguments = args;
    this.byref = byref;
    this.type = type;
    this.nullable = nullable;
    this.isStatic = isStatic || false;
    this.body = null;
  }
);


/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);

/**
 * Abstract documentation node (ComentLine or CommentBlock)
 * @constructor Comment
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {String} value
 */
module.exports = Node.extends(
  "comment",
  function Comment(kind, value, docs, location) {
    Node.apply(this, [kind, docs, location]);
    this.value = value;
  }
);


/***/ }),
/* 66 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Comment = __webpack_require__(65);
const KIND = "commentblock";

/**
 * A comment block (multiline)
 * @constructor CommentBlock
 * @memberOf module:php-parser
 * @extends {Comment}
 */
module.exports = Comment.extends(
  KIND,
  function CommentBlock(value, docs, location) {
    Comment.apply(this, [KIND, value, docs, location]);
  }
);


/***/ }),
/* 67 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Comment = __webpack_require__(65);
const KIND = "commentline";

/**
 * A single line comment
 * @constructor CommentLine
 * @memberOf module:php-parser
 * @extends {Comment}
 */
module.exports = Comment.extends(
  KIND,
  function CommentLine(value, docs, location) {
    Comment.apply(this, [KIND, value, docs, location]);
  }
);


/***/ }),
/* 68 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "constant";

/**
 * Defines a constant
 * @constructor Constant
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {string} name
 * @property {Node|string|number|boolean|null} value
 */
module.exports = Node.extends(
  KIND,
  function Constant(name, value, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.name = name;
    this.value = value;
  }
);


/***/ }),
/* 69 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "continue";

/**
 * A continue statement
 * @constructor Continue
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {number|null} level
 */
module.exports = Statement.extends(
  KIND,
  function Continue(level, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.level = level;
  }
);


/***/ }),
/* 70 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Block = __webpack_require__(49);
const KIND = "declare";

/**
 * The declare construct is used to set execution directives for a block of code
 * @constructor Declare
 * @memberOf module:php-parser
 * @extends {Block}
 * @property {Array[]} directives
 * @property {String} mode
 * @see http://php.net/manual/en/control-structures.declare.php
 */
const Declare = Block.extends(
  KIND,
  function Declare(directives, body, mode, docs, location) {
    Block.apply(this, [KIND, body, docs, location]);
    this.directives = directives;
    this.mode = mode;
  }
);

/**
 * The node is declared as a short tag syntax :
 * ```php
 * <?php
 * declare(ticks=1):
 * // some statements
 * enddeclare;
 * ```
 * @constant {String} Declare#MODE_SHORT
 * @memberOf module:php-parser
 */
Declare.MODE_SHORT = "short";

/**
 * The node is declared bracket enclosed code :
 * ```php
 * <?php
 * declare(ticks=1) {
 * // some statements
 * }
 * ```
 * @constant {String} Declare#MODE_BLOCK
 * @memberOf module:php-parser
 */
Declare.MODE_BLOCK = "block";

/**
 * The node is declared as a simple statement. In order to make things simpler
 * children of the node are automatically collected until the next
 * declare statement.
 * ```php
 * <?php
 * declare(ticks=1);
 * // some statements
 * declare(ticks=2);
 * // some statements
 * ```
 * @constant {String} Declare#MODE_NONE
 * @memberOf module:php-parser
 */
Declare.MODE_NONE = "none";

module.exports = Declare;


/***/ }),
/* 71 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "declaredirective";

/**
 * Defines a constant
 * @constructor DeclareDirective
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {Identifier} name
 * @property {Node|string|number|boolean|null} value
 */
module.exports = Node.extends(
  KIND,
  function DeclareDirective(key, value, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.key = key;
    this.value = value;
  }
);


/***/ }),
/* 72 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "do";

/**
 * Defines a do/while statement
 * @constructor Do
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} test
 * @property {Statement} body
 */
module.exports = Statement.extends(
  KIND,
  function Do(test, body, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.test = test;
    this.body = body;
  }
);


/***/ }),
/* 73 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "echo";

/**
 * Defines system based call
 * @constructor Echo
 * @memberOf module:php-parser
 * @property {boolean} shortForm
 * @extends {Statement}
 */
module.exports = Statement.extends(
  KIND,
  function Echo(expressions, shortForm, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.shortForm = shortForm;
    this.expressions = expressions;
  }
);


/***/ }),
/* 74 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "empty";

/**
 * Defines an empty check call
 * @constructor Empty
 * @memberOf module:php-parser
 * @extends {Expression}
 */
module.exports = Expression.extends(
  KIND,
  function Empty(expression, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.expression = expression;
  }
);


/***/ }),
/* 75 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "encapsed";

/**
 * Defines an encapsed string (contains expressions)
 * @constructor Encapsed
 * @memberOf module:php-parser
 * @extends {Literal}
 * @property {String} type - Defines the type of encapsed string (shell, heredoc, string)
 * @property {String|Null} label - The heredoc label, defined only when the type is heredoc
 */
const Encapsed = Literal.extends(
  KIND,
  function Encapsed(value, raw, type, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
    this.type = type;
  }
);

/**
 * The node is a double quote string :
 * ```php
 * <?php
 * echo "hello $world";
 * ```
 * @constant {String} Encapsed#TYPE_STRING - `string`
 * @memberOf module:php-parser
 */
Encapsed.TYPE_STRING = "string";

/**
 * The node is a shell execute string :
 * ```php
 * <?php
 * echo `ls -larth $path`;
 * ```
 * @constant {String} Encapsed#TYPE_SHELL - `shell`
 * @memberOf module:php-parser
 */
Encapsed.TYPE_SHELL = "shell";

/**
 * The node is a shell execute string :
 * ```php
 * <?php
 * echo <<<STR
 *  Hello $world
 * STR
 * ;
 * ```
 * @constant {String} Encapsed#TYPE_HEREDOC - `heredoc`
 * @memberOf module:php-parser
 */
Encapsed.TYPE_HEREDOC = "heredoc";

/**
 * The node contains a list of constref / variables / expr :
 * ```php
 * <?php
 * echo $foo->bar_$baz;
 * ```
 * @constant {String} Encapsed#TYPE_OFFSET - `offset`
 * @memberOf module:php-parser
 */
Encapsed.TYPE_OFFSET = "offset";

module.exports = Encapsed;


/***/ }),
/* 76 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "encapsedpart";

/**
 * Part of `Encapsed` node
 * @constructor EncapsedPart
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} expression
 * @property {String} syntax
 * @property {Boolean} curly
 */
module.exports = Expression.extends(
  KIND,
  function EncapsedPart(expression, syntax, curly, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.expression = expression;
    this.syntax = syntax;
    this.curly = curly;
  }
);


/***/ }),
/* 77 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "entry";

/**
 * An array entry - see [Array](#array)
 * @constructor Entry
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Node|null} key The entry key/offset
 * @property {Node} value The entry value
 * @property {Boolean} byRef By reference
 * @property {Boolean} unpack Argument unpacking
 */
module.exports = Expression.extends(
  KIND,
  function Entry(key, value, byRef, unpack, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.key = key;
    this.value = value;
    this.byRef = byRef;
    this.unpack = unpack;
  }
);


/***/ }),
/* 78 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "error";

/**
 * Defines an error node (used only on silentMode)
 * @constructor Error
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {string} message
 * @property {number} line
 * @property {number|string} token
 * @property {string|array} expected
 */
module.exports = Node.extends(
  KIND,
  function Error(message, token, line, expected, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.message = message;
    this.token = token;
    this.line = line;
    this.expected = expected;
  }
);


/***/ }),
/* 79 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "eval";

/**
 * Defines an eval statement
 * @constructor Eval
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Node} source
 */
module.exports = Expression.extends(
  KIND,
  function Eval(source, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.source = source;
  }
);


/***/ }),
/* 80 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "exit";

/**
 * Defines an exit / die call
 * @constructor Exit
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Node|null} expression
 * @property {boolean} useDie
 */
module.exports = Expression.extends(
  KIND,
  function Exit(expression, useDie, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.expression = expression;
    this.useDie = useDie;
  }
);


/***/ }),
/* 81 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "expressionstatement";

/**
 * Defines an expression based statement
 * @constructor ExpressionStatement
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} expression
 */
module.exports = Statement.extends(
  KIND,
  function ExpressionStatement(expr, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.expression = expr;
  }
);


/***/ }),
/* 82 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "for";

/**
 * Defines a for iterator
 * @constructor For
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression[]} init
 * @property {Expression[]} test
 * @property {Expression[]} increment
 * @property {Statement} body
 * @property {boolean} shortForm
 * @see http://php.net/manual/en/control-structures.for.php
 */
module.exports = Statement.extends(
  KIND,
  function For(init, test, increment, body, shortForm, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.init = init;
    this.test = test;
    this.increment = increment;
    this.shortForm = shortForm;
    this.body = body;
  }
);


/***/ }),
/* 83 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "foreach";

/**
 * Defines a foreach iterator
 * @constructor Foreach
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} source
 * @property {Expression|null} key
 * @property {Expression} value
 * @property {Statement} body
 * @property {boolean} shortForm
 * @see http://php.net/manual/en/control-structures.foreach.php
 */
module.exports = Statement.extends(
  KIND,
  function Foreach(source, key, value, body, shortForm, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.source = source;
    this.key = key;
    this.value = value;
    this.shortForm = shortForm;
    this.body = body;
  }
);


/***/ }),
/* 84 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Declaration = __webpack_require__(60);
const KIND = "function";

/**
 * Defines a classic function
 * @constructor Function
 * @memberOf module:php-parser
 * @extends {Declaration}
 * @property {Parameter[]} arguments
 * @property {Identifier} type
 * @property {boolean} byref
 * @property {boolean} nullable
 * @property {Block|null} body
 */
module.exports = Declaration.extends(
  KIND,
  function _Function(name, args, byref, type, nullable, docs, location) {
    Declaration.apply(this, [KIND, name, docs, location]);
    this.arguments = args;
    this.byref = byref;
    this.type = type;
    this.nullable = nullable;
    this.body = null;
  }
);


/***/ }),
/* 85 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "global";

/**
 * Imports a variable from the global scope
 * @constructor Global
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Variable[]} items
 */
module.exports = Statement.extends(
  KIND,
  function Global(items, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.items = items;
  }
);


/***/ }),
/* 86 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "goto";

/**
 * Defines goto statement
 * @constructor Goto
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {string} label
 * @see {Label}
 */
module.exports = Statement.extends(KIND, function Goto(label, docs, location) {
  Statement.apply(this, [KIND, docs, location]);
  this.label = label;
});


/***/ }),
/* 87 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "halt";

/**
 * Halts the compiler execution
 * @constructor Halt
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {String} after - String after the halt statement
 * @see http://php.net/manual/en/function.halt-compiler.php
 */
module.exports = Statement.extends(KIND, function Halt(after, docs, location) {
  Statement.apply(this, [KIND, docs, location]);
  this.after = after;
});


/***/ }),
/* 88 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "identifier";

/**
 * Defines an identifier node
 * @constructor Identifier
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {string} name
 */
const Identifier = Node.extends(
  KIND,
  function Identifier(name, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.name = name;
  }
);

module.exports = Identifier;


/***/ }),
/* 89 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "if";

/**
 * Defines a if statement
 * @constructor If
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} test
 * @property {Block} body
 * @property {Block|If|null} alternate
 * @property {boolean} shortForm
 */
module.exports = Statement.extends(
  KIND,
  function If(test, body, alternate, shortForm, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.test = test;
    this.body = body;
    this.alternate = alternate;
    this.shortForm = shortForm;
  }
);


/***/ }),
/* 90 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "include";

/**
 * Defines system include call
 * @constructor Include
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Node} target
 * @property {boolean} once
 * @property {boolean} require
 */
module.exports = Expression.extends(
  KIND,
  function Include(once, require, target, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.once = once;
    this.require = require;
    this.target = target;
  }
);


/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "inline";

/**
 * Defines inline html output (treated as echo output)
 * @constructor Inline
 * @memberOf module:php-parser
 * @extends {Literal}
 */
module.exports = Literal.extends(
  KIND,
  function Inline(value, raw, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
  }
);


/***/ }),
/* 92 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Declaration = __webpack_require__(60);
const KIND = "interface";

/**
 * An interface definition
 * @constructor Interface
 * @memberOf module:php-parser
 * @extends {Declaration}
 * @property {Identifier[]} extends
 * @property {Declaration[]} body
 */
module.exports = Declaration.extends(
  KIND,
  function Interface(name, ext, body, docs, location) {
    Declaration.apply(this, [KIND, name, docs, location]);
    this.extends = ext;
    this.body = body;
  }
);


/***/ }),
/* 93 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "isset";

/**
 * Defines an isset call
 * @constructor Isset
 * @memberOf module:php-parser
 * @extends {Expression}
 */
module.exports = Expression.extends(
  KIND,
  function Isset(variables, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.variables = variables;
  }
);


/***/ }),
/* 94 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "label";

/**
 * A label statement (referenced by goto)
 * @constructor Label
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {String} name
 */
module.exports = Statement.extends(KIND, function Label(name, docs, location) {
  Statement.apply(this, [KIND, docs, location]);
  this.name = name;
});


/***/ }),
/* 95 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "list";

/**
 * Defines list assignment
 * @constructor List
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {boolean} shortForm
 */
module.exports = Expression.extends(
  KIND,
  function List(items, shortForm, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.items = items;
    this.shortForm = shortForm;
  }
);


/***/ }),
/* 96 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expr = __webpack_require__(42);
const KIND = "lookup";

/**
 * Lookup on an offset in the specified object
 * @constructor Lookup
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} what
 * @property {Expression} offset
 */
module.exports = Expr.extends(
  KIND,
  function Lookup(kind, what, offset, docs, location) {
    Expr.apply(this, [kind || KIND, docs, location]);
    this.what = what;
    this.offset = offset;
  }
);


/***/ }),
/* 97 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "magic";

/**
 * Defines magic constant
 * @constructor Magic
 * @memberOf module:php-parser
 * @extends {Literal}
 */
module.exports = Literal.extends(
  KIND,
  function Magic(value, raw, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
  }
);


/***/ }),
/* 98 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Function_ = __webpack_require__(84);
const KIND = "method";

/**
 * Defines a class/interface/trait method
 * @constructor Method
 * @memberOf module:php-parser
 * @extends {Function}
 * @property {boolean} isAbstract
 * @property {boolean} isFinal
 * @property {boolean} isStatic
 * @property {string} visibility
 */
module.exports = Function_.extends(KIND, function Method() {
  Function_.apply(this, arguments);
  this.kind = KIND;
});


/***/ }),
/* 99 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Reference = __webpack_require__(100);
const KIND = "name";

/**
 * Defines a class reference node
 * @constructor Name
 * @memberOf module:php-parser
 * @extends {Reference}
 * @property {string} name
 * @property {string} resolution
 */
const Name = Reference.extends(
  KIND,
  function Name(name, isRelative, docs, location) {
    Reference.apply(this, [KIND, docs, location]);
    if (isRelative) {
      this.resolution = Name.RELATIVE_NAME;
    } else if (name.length === 1) {
      this.resolution = Name.UNQUALIFIED_NAME;
    } else if (!name[0]) {
      this.resolution = Name.FULL_QUALIFIED_NAME;
    } else {
      this.resolution = Name.QUALIFIED_NAME;
    }
    this.name = name.join("\\");
  }
);

/**
 * This is an identifier without a namespace separator, such as Foo
 * @constant {String} Name#UNQUALIFIED_NAME
 * @memberOf module:php-parser
 */
Name.UNQUALIFIED_NAME = "uqn";
/**
 * This is an identifier with a namespace separator, such as Foo\Bar
 * @constant {String} Name#QUALIFIED_NAME
 * @memberOf module:php-parser
 */
Name.QUALIFIED_NAME = "qn";
/**
 * This is an identifier with a namespace separator that begins with
 * a namespace separator, such as \Foo\Bar. The namespace \Foo is also
 * a fully qualified name.
 * @constant {String} Name#FULL_QUALIFIED_NAME
 * @memberOf module:php-parser
 */
Name.FULL_QUALIFIED_NAME = "fqn";
/**
 * This is an identifier starting with namespace, such as namespace\Foo\Bar.
 * @constant {String} Name#RELATIVE_NAME
 * @memberOf module:php-parser
 */
Name.RELATIVE_NAME = "rn";

module.exports = Name;


/***/ }),
/* 100 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "reference";

/**
 * Defines a reference node
 * @constructor Reference
 * @memberOf module:php-parser
 * @extends {Node}
 */
const Reference = Node.extends(KIND, function Reference(kind, docs, location) {
  Node.apply(this, [kind || KIND, docs, location]);
});

module.exports = Reference;


/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Block = __webpack_require__(49);
const KIND = "namespace";

/**
 * The main program node
 * @constructor Namespace
 * @memberOf module:php-parser
 * @extends {Block}
 * @property {string} name
 * @property {boolean} withBrackets
 */
module.exports = Block.extends(
  KIND,
  function Namespace(name, children, withBrackets, docs, location) {
    Block.apply(this, [KIND, children, docs, location]);
    this.name = name;
    this.withBrackets = withBrackets || false;
  }
);


/***/ }),
/* 102 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "new";

/**
 * Creates a new instance of the specified class
 * @constructor New
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Identifier|Variable|Class} what
 * @property {Variable[]} arguments
 */
module.exports = Expression.extends(
  KIND,
  function New(what, args, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.what = what;
    this.arguments = args;
  }
);


/***/ }),
/* 103 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "noop";

/**
 * Ignore this node, it implies a no operation block, for example :
 * [$foo, $bar, /* here a noop node * /]
 * @constructor Noop
 * @memberOf module:php-parser
 * @extends {Node}
 */
module.exports = Node.extends(KIND, function Noop(docs, location) {
  Node.apply(this, [KIND, docs, location]);
});


/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "nowdoc";

/**
 * Defines a nowdoc string
 * @constructor NowDoc
 * @memberOf module:php-parser
 * @extends {Literal}
 * @property {string} label
 * @property {string} raw
 */
module.exports = Literal.extends(
  KIND,
  function Nowdoc(value, raw, label, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
    this.label = label;
  }
);


/***/ }),
/* 105 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "nullkeyword";

/**
 * Represents the null keyword
 * @constructor NullKeyword
 * @memberOf module:php-parser
 * @extends {Node}
 */
module.exports = Node.extends(KIND, function NullKeyword(raw, docs, location) {
  Node.apply(this, [KIND, docs, location]);
  this.raw = raw;
});


/***/ }),
/* 106 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "number";

/**
 * Defines a numeric value
 * @constructor Number
 * @memberOf module:php-parser
 * @extends {Literal}
 */
module.exports = Literal.extends(
  KIND,
  function Number(value, raw, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
  }
);


/***/ }),
/* 107 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Lookup = __webpack_require__(96);
const KIND = "offsetlookup";

/**
 * Lookup on an offset in an array
 * @constructor OffsetLookup
 * @memberOf module:php-parser
 * @extends {Lookup}
 */
module.exports = Lookup.extends(
  KIND,
  function OffsetLookup(what, offset, docs, location) {
    Lookup.apply(this, [KIND, what, offset, docs, location]);
  }
);


/***/ }),
/* 108 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Declaration = __webpack_require__(60);
const KIND = "parameter";

/**
 * Defines a function parameter
 * @constructor Parameter
 * @memberOf module:php-parser
 * @extends {Declaration}
 * @property {Identifier|null} type
 * @property {Node|null} value
 * @property {boolean} byref
 * @property {boolean} variadic
 * @property {boolean} nullable
 */
module.exports = Declaration.extends(
  KIND,
  function Parameter(
    name,
    type,
    value,
    isRef,
    isVariadic,
    nullable,
    docs,
    location
  ) {
    Declaration.apply(this, [KIND, name, docs, location]);
    this.value = value;
    this.type = type;
    this.byref = isRef;
    this.variadic = isVariadic;
    this.nullable = nullable;
  }
);


/***/ }),
/* 109 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Reference = __webpack_require__(100);
const KIND = "parentreference";

/**
 * Defines a class reference node
 * @constructor ParentReference
 * @memberOf module:php-parser
 * @extends {Reference}
 */
const ParentReference = Reference.extends(
  KIND,
  function ParentReference(raw, docs, location) {
    Reference.apply(this, [KIND, docs, location]);
    this.raw = raw;
  }
);
module.exports = ParentReference;


/***/ }),
/* 110 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Operation = __webpack_require__(48);
const KIND = "post";

/**
 * Defines a post operation `$i++` or `$i--`
 * @constructor Post
 * @memberOf module:php-parser
 * @extends {Operation}
 * @property {String} type
 * @property {Variable} what
 */
module.exports = Operation.extends(
  KIND,
  function Post(type, what, docs, location) {
    Operation.apply(this, [KIND, docs, location]);
    this.type = type;
    this.what = what;
  }
);


/***/ }),
/* 111 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Operation = __webpack_require__(48);
const KIND = "pre";

/**
 * Defines a pre operation `++$i` or `--$i`
 * @constructor Pre
 * @memberOf module:php-parser
 * @extends {Operation}
 * @property {String} type
 * @property {Variable} what
 */
module.exports = Operation.extends(
  KIND,
  function Pre(type, what, docs, location) {
    Operation.apply(this, [KIND, docs, location]);
    this.type = type;
    this.what = what;
  }
);


/***/ }),
/* 112 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "print";

/**
 * Outputs
 * @constructor Print
 * @memberOf module:php-parser
 * @extends {Expression}
 */
module.exports = Expression.extends(
  KIND,
  function Print(expression, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.expression = expression;
  }
);


/***/ }),
/* 113 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Block = __webpack_require__(49);
const KIND = "program";

/**
 * The main program node
 * @constructor Program
 * @memberOf module:php-parser
 * @extends {Block}
 * @property {Error[]} errors
 * @property {Comment[]|null} comments
 * @property {String[]|null} tokens
 */
module.exports = Block.extends(
  KIND,
  function Program(children, errors, comments, tokens, docs, location) {
    Block.apply(this, [KIND, children, docs, location]);
    this.errors = errors;
    if (comments) {
      this.comments = comments;
    }
    if (tokens) {
      this.tokens = tokens;
    }
  }
);


/***/ }),
/* 114 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "property";

/**
 * Defines a class property
 * @constructor Property
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {string} name
 * @property {Node|null} value
 * @property {boolean} nullable
 * @property {Identifier|Array<Identifier>|null} type
 */
module.exports = Statement.extends(
  KIND,
  function Property(name, value, nullable, type, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.name = name;
    this.value = value;
    this.nullable = nullable;
    this.type = type;
  }
);


/***/ }),
/* 115 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Lookup = __webpack_require__(96);
const KIND = "propertylookup";

/**
 * Lookup to an object property
 * @constructor PropertyLookup
 * @memberOf module:php-parser
 * @extends {Lookup}
 */
module.exports = Lookup.extends(
  KIND,
  function PropertyLookup(what, offset, docs, location) {
    Lookup.apply(this, [KIND, what, offset, docs, location]);
  }
);


/***/ }),
/* 116 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "propertystatement";

const IS_UNDEFINED = "";
const IS_PUBLIC = "public";
const IS_PROTECTED = "protected";
const IS_PRIVATE = "private";

/**
 * Declares a properties into the current scope
 * @constructor PropertyStatement
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Property[]} properties
 */
const PropertyStatement = Statement.extends(
  KIND,
  function PropertyStatement(kind, properties, flags, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.properties = properties;
    this.parseFlags(flags);
  }
);

/**
 * Generic flags parser
 * @function PropertyStatement#parseFlags
 * @memberOf module:php-parser
 * @param {Array<number|null>} flags
 * @return {void}
 */
PropertyStatement.prototype.parseFlags = function (flags) {
  if (flags[0] === -1) {
    this.visibility = IS_UNDEFINED;
  } else if (flags[0] === null) {
    this.visibility = null;
  } else if (flags[0] === 0) {
    this.visibility = IS_PUBLIC;
  } else if (flags[0] === 1) {
    this.visibility = IS_PROTECTED;
  } else if (flags[0] === 2) {
    this.visibility = IS_PRIVATE;
  }

  this.isStatic = flags[1] === 1;
};

module.exports = PropertyStatement;


/***/ }),
/* 117 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "retif";

/**
 * Defines a short if statement that returns a value
 * @constructor RetIf
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} test
 * @property {Expression} trueExpr
 * @property {Expression} falseExpr
 */
module.exports = Expression.extends(
  KIND,
  function RetIf(test, trueExpr, falseExpr, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.test = test;
    this.trueExpr = trueExpr;
    this.falseExpr = falseExpr;
  }
);


/***/ }),
/* 118 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "return";

/**
 * A continue statement
 * @constructor Return
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression|null} expr
 */
module.exports = Statement.extends(KIND, function Return(expr, docs, location) {
  Statement.apply(this, [KIND, docs, location]);
  this.expr = expr;
});


/***/ }),
/* 119 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Reference = __webpack_require__(100);
const KIND = "selfreference";

/**
 * Defines a class reference node
 * @constructor SelfReference
 * @memberOf module:php-parser
 * @extends {Reference}
 */
const SelfReference = Reference.extends(
  KIND,
  function SelfReference(raw, docs, location) {
    Reference.apply(this, [KIND, docs, location]);
    this.raw = raw;
  }
);
module.exports = SelfReference;


/***/ }),
/* 120 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "silent";

/**
 * Avoids to show/log warnings & notices from the inner expression
 * @constructor Silent
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} expr
 */
module.exports = Expression.extends(
  KIND,
  function Silent(expr, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.expr = expr;
  }
);


/***/ }),
/* 121 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "static";

/**
 * Declares a static variable into the current scope
 * @constructor Static
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {StaticVariable[]} variables
 */
module.exports = Statement.extends(
  KIND,
  function Static(variables, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.variables = variables;
  }
);


/***/ }),
/* 122 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "staticvariable";

/**
 * Defines a constant
 * @constructor StaticVariable
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {Variable} variable
 * @property {Node|string|number|boolean|null} defaultValue
 */
module.exports = Node.extends(
  KIND,
  function StaticVariable(variable, defaultValue, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.variable = variable;
    this.defaultValue = defaultValue;
  }
);


/***/ }),
/* 123 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Lookup = __webpack_require__(96);
const KIND = "staticlookup";

/**
 * Lookup to a static property
 * @constructor StaticLookup
 * @memberOf module:php-parser
 * @extends {Lookup}
 */
module.exports = Lookup.extends(
  KIND,
  function StaticLookup(what, offset, docs, location) {
    Lookup.apply(this, [KIND, what, offset, docs, location]);
  }
);


/***/ }),
/* 124 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Reference = __webpack_require__(100);
const KIND = "staticreference";

/**
 * Defines a class reference node
 * @constructor StaticReference
 * @memberOf module:php-parser
 * @extends {Reference}
 */
const StaticReference = Reference.extends(
  KIND,
  function StaticReference(raw, docs, location) {
    Reference.apply(this, [KIND, docs, location]);
    this.raw = raw;
  }
);
module.exports = StaticReference;


/***/ }),
/* 125 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Literal = __webpack_require__(52);
const KIND = "string";

/**
 * Defines a string (simple or double quoted) - chars are already escaped
 * @constructor String
 * @memberOf module:php-parser
 * @extends {Literal}
 * @property {boolean} unicode
 * @property {boolean} isDoubleQuote
 * @see {Encapsed}
 */
module.exports = Literal.extends(
  KIND,
  function String(isDoubleQuote, value, unicode, raw, docs, location) {
    Literal.apply(this, [KIND, value, raw, docs, location]);
    this.unicode = unicode;
    this.isDoubleQuote = isDoubleQuote;
  }
);


/***/ }),
/* 126 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "switch";

/**
 * Defines a switch statement
 * @constructor Switch
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} test
 * @property {Block} body
 * @property {boolean} shortForm
 */
module.exports = Statement.extends(
  KIND,
  function Switch(test, body, shortForm, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.test = test;
    this.body = body;
    this.shortForm = shortForm;
  }
);


/***/ }),
/* 127 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "throw";

/**
 * Defines a throw statement
 * @constructor Throw
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} what
 */
module.exports = Statement.extends(KIND, function Throw(what, docs, location) {
  Statement.apply(this, [KIND, docs, location]);
  this.what = what;
});


/***/ }),
/* 128 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Declaration = __webpack_require__(60);
const KIND = "trait";

/**
 * A trait definition
 * @constructor Trait
 * @memberOf module:php-parser
 * @extends {Declaration}
 * @property {Declaration[]} body
 */
module.exports = Declaration.extends(
  KIND,
  function Trait(name, body, docs, location) {
    Declaration.apply(this, [KIND, name, docs, location]);
    this.body = body;
  }
);


/***/ }),
/* 129 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "traitalias";

const IS_UNDEFINED = "";
const IS_PUBLIC = "public";
const IS_PROTECTED = "protected";
const IS_PRIVATE = "private";

/**
 * Defines a trait alias
 * @constructor TraitAlias
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {Identifier|null} trait
 * @property {Identifier} method
 * @property {Identifier|null} as
 * @property {string|null} visibility
 */
module.exports = Node.extends(
  KIND,
  function TraitAlias(trait, method, as, flags, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.trait = trait;
    this.method = method;
    this.as = as;
    this.visibility = IS_UNDEFINED;
    if (flags) {
      if (flags[0] === 0) {
        this.visibility = IS_PUBLIC;
      } else if (flags[0] === 1) {
        this.visibility = IS_PROTECTED;
      } else if (flags[0] === 2) {
        this.visibility = IS_PRIVATE;
      }
    }
  }
);


/***/ }),
/* 130 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "traitprecedence";

/**
 * Defines a trait alias
 * @constructor TraitPrecedence
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {Identifier|null} trait
 * @property {Identifier} method
 * @property {Identifier[]} instead
 */
module.exports = Node.extends(
  KIND,
  function TraitPrecedence(trait, method, instead, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.trait = trait;
    this.method = method;
    this.instead = instead;
  }
);


/***/ }),
/* 131 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Node = __webpack_require__(43);
const KIND = "traituse";

/**
 * Defines a trait usage
 * @constructor TraitUse
 * @memberOf module:php-parser
 * @extends {Node}
 * @property {Identifier[]} traits
 * @property {Node[]|null} adaptations
 */
module.exports = Node.extends(
  KIND,
  function TraitUse(traits, adaptations, docs, location) {
    Node.apply(this, [KIND, docs, location]);
    this.traits = traits;
    this.adaptations = adaptations;
  }
);


/***/ }),
/* 132 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "try";

/**
 * Defines a try statement
 * @constructor Try
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Block} body
 * @property {Catch[]} catches
 * @property {Block} allways
 */
module.exports = Statement.extends(
  KIND,
  function Try(body, catches, always, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.body = body;
    this.catches = catches;
    this.always = always;
  }
);


/***/ }),
/* 133 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Reference = __webpack_require__(100);
const KIND = "typereference";

/**
 * Defines a class reference node
 * @constructor TypeReference
 * @memberOf module:php-parser
 * @extends {Reference}
 * @property {string} name
 */
const TypeReference = Reference.extends(
  KIND,
  function TypeReference(name, raw, docs, location) {
    Reference.apply(this, [KIND, docs, location]);
    this.name = name;
    this.raw = raw;
  }
);

TypeReference.types = [
  "int",
  "float",
  "string",
  "bool",
  "object",
  "array",
  "callable",
  "iterable",
  "void",
];

module.exports = TypeReference;


/***/ }),
/* 134 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Operation = __webpack_require__(48);
const KIND = "unary";

/**
 * Unary operations
 * @constructor Unary
 * @memberOf module:php-parser
 * @extends {Operation}
 * @property {string} type
 * @property {Expression} what
 */
module.exports = Operation.extends(
  KIND,
  function Unary(type, what, docs, location) {
    Operation.apply(this, [KIND, docs, location]);
    this.type = type;
    this.what = what;
  }
);


/***/ }),
/* 135 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "unset";

/**
 * Deletes references to a list of variables
 * @constructor Unset
 * @memberOf module:php-parser
 * @extends {Statement}
 */
module.exports = Statement.extends(
  KIND,
  function Unset(variables, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.variables = variables;
  }
);


/***/ }),
/* 136 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "usegroup";

/**
 * Defines a use statement (with a list of use items)
 * @constructor UseGroup
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {string|null} name
 * @property {string|null} type - Possible value : function, const
 * @property {UseItem[]} item
 * @see {Namespace}
 * @see http://php.net/manual/en/language.namespaces.importing.php
 */
module.exports = Statement.extends(
  KIND,
  function UseGroup(name, type, items, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.name = name;
    this.type = type;
    this.items = items;
  }
);


/***/ }),
/* 137 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "useitem";

/**
 * Defines a use statement (from namespace)
 * @constructor UseItem
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {string} name
 * @property {string|null} type - Possible value : function, const
 * @property {Identifier|null} alias
 * @see {Namespace}
 * @see http://php.net/manual/en/language.namespaces.importing.php
 */
const UseItem = Statement.extends(
  KIND,
  function UseItem(name, alias, type, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.name = name;
    this.alias = alias;
    this.type = type;
  }
);

/**
 * Importing a constant
 * @constant {string} UseItem#TYPE_CONST
 * @memberOf module:php-parser
 */
UseItem.TYPE_CONST = "const";
/**
 * Importing a function
 * @constant {string} UseItem#TYPE_FUNC
 * @memberOf module:php-parser
 */
UseItem.TYPE_FUNCTION = "function";

module.exports = UseItem;


/***/ }),
/* 138 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "variable";

/**
 * Any expression node. Since the left-hand side of an assignment may
 * be any expression in general, an expression can also be a pattern.
 * @constructor Variable
 * @memberOf module:php-parser
 * @extends {Expression}
 * @example
 * // PHP code :
 * $foo
 * // AST output
 * {
 *  "kind": "variable",
 *  "name": "foo",
 *  "curly": false
 * }
 * @property {string|Node} name The variable name (can be a complex expression when the name is resolved dynamically)
 * @property {boolean} curly Indicate if the name is defined between curlies, ex `${foo}`
 */
module.exports = Expression.extends(
  KIND,
  function Variable(name, curly, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.name = name;
    this.curly = curly || false;
  }
);


/***/ }),
/* 139 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "variadic";

/**
 * Introduce a list of items into the arguments of the call
 * @constructor Variadic
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Array|Expression} what
 * @see https://wiki.php.net/rfc/argument_unpacking
 */
module.exports = Expression.extends(
  KIND,
  function variadic(what, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.what = what;
  }
);


/***/ }),
/* 140 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Statement = __webpack_require__(50);
const KIND = "while";

/**
 * Defines a while statement
 * @constructor While
 * @memberOf module:php-parser
 * @extends {Statement}
 * @property {Expression} test
 * @property {Statement} body
 * @property {boolean} shortForm
 */
module.exports = Statement.extends(
  KIND,
  function While(test, body, shortForm, docs, location) {
    Statement.apply(this, [KIND, docs, location]);
    this.test = test;
    this.body = body;
    this.shortForm = shortForm;
  }
);


/***/ }),
/* 141 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "yield";

/**
 * Defines a yield generator statement
 * @constructor Yield
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression|null} value
 * @property {Expression|null} key
 * @see http://php.net/manual/en/language.generators.syntax.php
 */
module.exports = Expression.extends(
  KIND,
  function Yield(value, key, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.value = value;
    this.key = key;
  }
);


/***/ }),
/* 142 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */


const Expression = __webpack_require__(42);
const KIND = "yieldfrom";

/**
 * Defines a yield from generator statement
 * @constructor YieldFrom
 * @memberOf module:php-parser
 * @extends {Expression}
 * @property {Expression} value
 * @see http://php.net/manual/en/language.generators.syntax.php
 */
module.exports = Expression.extends(
  KIND,
  function YieldFrom(value, docs, location) {
    Expression.apply(this, [KIND, docs, location]);
    this.value = value;
  }
);


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const StructureConvertionException_1 = __webpack_require__(5);
const YML = __webpack_require__(144);
const AbstractStructureConverter_1 = __webpack_require__(7);
class YMLStructureConverter extends AbstractStructureConverter_1.default {
    toCurrLang(tgStruct) {
        try {
            const parsedObj = YML.parse(tgStruct);
            return parsedObj;
        }
        catch (jsexc) {
            if (jsexc instanceof StructureConvertionException_1.default) {
                this.pathException(jsexc);
            }
            return null;
        }
    }
}
exports["default"] = YMLStructureConverter;


/***/ }),
/* 144 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.4
var Dumper, Parser, Utils, Yaml;

Parser = __webpack_require__(145);

Dumper = __webpack_require__(155);

Utils = __webpack_require__(149);

Yaml = (function() {
  function Yaml() {}

  Yaml.parse = function(input, exceptionOnInvalidType, objectDecoder) {
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    return new Parser().parse(input, exceptionOnInvalidType, objectDecoder);
  };

  Yaml.parseFile = function(path, callback, exceptionOnInvalidType, objectDecoder) {
    var input;
    if (callback == null) {
      callback = null;
    }
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    if (callback != null) {
      return Utils.getStringFromFile(path, (function(_this) {
        return function(input) {
          var result;
          result = null;
          if (input != null) {
            result = _this.parse(input, exceptionOnInvalidType, objectDecoder);
          }
          callback(result);
        };
      })(this));
    } else {
      input = Utils.getStringFromFile(path);
      if (input != null) {
        return this.parse(input, exceptionOnInvalidType, objectDecoder);
      }
      return null;
    }
  };

  Yaml.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    var yaml;
    if (inline == null) {
      inline = 2;
    }
    if (indent == null) {
      indent = 4;
    }
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectEncoder == null) {
      objectEncoder = null;
    }
    yaml = new Dumper();
    yaml.indentation = indent;
    return yaml.dump(input, inline, 0, exceptionOnInvalidType, objectEncoder);
  };

  Yaml.stringify = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    return this.dump(input, inline, indent, exceptionOnInvalidType, objectEncoder);
  };

  Yaml.load = function(path, callback, exceptionOnInvalidType, objectDecoder) {
    return this.parseFile(path, callback, exceptionOnInvalidType, objectDecoder);
  };

  return Yaml;

})();

if (typeof window !== "undefined" && window !== null) {
  window.YAML = Yaml;
}

if (typeof window === "undefined" || window === null) {
  this.YAML = Yaml;
}

module.exports = Yaml;


/***/ }),
/* 145 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated by CoffeeScript 1.12.4
var Inline, ParseException, ParseMore, Parser, Pattern, Utils;

Inline = __webpack_require__(146);

Pattern = __webpack_require__(147);

Utils = __webpack_require__(149);

ParseException = __webpack_require__(152);

ParseMore = __webpack_require__(153);

Parser = (function() {
  Parser.prototype.PATTERN_FOLDED_SCALAR_ALL = new Pattern('^(?:(?<type>![^\\|>]*)\\s+)?(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$');

  Parser.prototype.PATTERN_FOLDED_SCALAR_END = new Pattern('(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$');

  Parser.prototype.PATTERN_SEQUENCE_ITEM = new Pattern('^\\-((?<leadspaces>\\s+)(?<value>.+?))?\\s*$');

  Parser.prototype.PATTERN_ANCHOR_VALUE = new Pattern('^&(?<ref>[^ ]+) *(?<value>.*)');

  Parser.prototype.PATTERN_COMPACT_NOTATION = new Pattern('^(?<key>' + Inline.REGEX_QUOTED_STRING + '|[^ \'"\\{\\[].*?) *\\:(\\s+(?<value>.+?))?\\s*$');

  Parser.prototype.PATTERN_MAPPING_ITEM = new Pattern('^(?<key>' + Inline.REGEX_QUOTED_STRING + '|[^ \'"\\[\\{].*?) *\\:(\\s+(?<value>.+?))?\\s*$');

  Parser.prototype.PATTERN_DECIMAL = new Pattern('\\d+');

  Parser.prototype.PATTERN_INDENT_SPACES = new Pattern('^ +');

  Parser.prototype.PATTERN_TRAILING_LINES = new Pattern('(\n*)$');

  Parser.prototype.PATTERN_YAML_HEADER = new Pattern('^\\%YAML[: ][\\d\\.]+.*\n', 'm');

  Parser.prototype.PATTERN_LEADING_COMMENTS = new Pattern('^(\\#.*?\n)+', 'm');

  Parser.prototype.PATTERN_DOCUMENT_MARKER_START = new Pattern('^\\-\\-\\-.*?\n', 'm');

  Parser.prototype.PATTERN_DOCUMENT_MARKER_END = new Pattern('^\\.\\.\\.\\s*$', 'm');

  Parser.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION = {};

  Parser.prototype.CONTEXT_NONE = 0;

  Parser.prototype.CONTEXT_SEQUENCE = 1;

  Parser.prototype.CONTEXT_MAPPING = 2;

  function Parser(offset) {
    this.offset = offset != null ? offset : 0;
    this.lines = [];
    this.currentLineNb = -1;
    this.currentLine = '';
    this.refs = {};
  }

  Parser.prototype.parse = function(value, exceptionOnInvalidType, objectDecoder) {
    var alias, allowOverwrite, block, c, context, data, e, first, i, indent, isRef, j, k, key, l, lastKey, len, len1, len2, len3, lineCount, m, matches, mergeNode, n, name, parsed, parsedItem, parser, ref, ref1, ref2, refName, refValue, val, values;
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    this.currentLineNb = -1;
    this.currentLine = '';
    this.lines = this.cleanup(value).split("\n");
    data = null;
    context = this.CONTEXT_NONE;
    allowOverwrite = false;
    while (this.moveToNextLine()) {
      if (this.isCurrentLineEmpty()) {
        continue;
      }
      if ("\t" === this.currentLine[0]) {
        throw new ParseException('A YAML file cannot contain tabs as indentation.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
      isRef = mergeNode = false;
      if (values = this.PATTERN_SEQUENCE_ITEM.exec(this.currentLine)) {
        if (this.CONTEXT_MAPPING === context) {
          throw new ParseException('You cannot define a sequence item when in a mapping');
        }
        context = this.CONTEXT_SEQUENCE;
        if (data == null) {
          data = [];
        }
        if ((values.value != null) && (matches = this.PATTERN_ANCHOR_VALUE.exec(values.value))) {
          isRef = matches.ref;
          values.value = matches.value;
        }
        if (!(values.value != null) || '' === Utils.trim(values.value, ' ') || Utils.ltrim(values.value, ' ').indexOf('#') === 0) {
          if (this.currentLineNb < this.lines.length - 1 && !this.isNextLineUnIndentedCollection()) {
            c = this.getRealCurrentLineNb() + 1;
            parser = new Parser(c);
            parser.refs = this.refs;
            data.push(parser.parse(this.getNextEmbedBlock(null, true), exceptionOnInvalidType, objectDecoder));
          } else {
            data.push(null);
          }
        } else {
          if (((ref = values.leadspaces) != null ? ref.length : void 0) && (matches = this.PATTERN_COMPACT_NOTATION.exec(values.value))) {
            c = this.getRealCurrentLineNb();
            parser = new Parser(c);
            parser.refs = this.refs;
            block = values.value;
            indent = this.getCurrentLineIndentation();
            if (this.isNextLineIndented(false)) {
              block += "\n" + this.getNextEmbedBlock(indent + values.leadspaces.length + 1, true);
            }
            data.push(parser.parse(block, exceptionOnInvalidType, objectDecoder));
          } else {
            data.push(this.parseValue(values.value, exceptionOnInvalidType, objectDecoder));
          }
        }
      } else if ((values = this.PATTERN_MAPPING_ITEM.exec(this.currentLine)) && values.key.indexOf(' #') === -1) {
        if (this.CONTEXT_SEQUENCE === context) {
          throw new ParseException('You cannot define a mapping item when in a sequence');
        }
        context = this.CONTEXT_MAPPING;
        if (data == null) {
          data = {};
        }
        Inline.configure(exceptionOnInvalidType, objectDecoder);
        try {
          key = Inline.parseScalar(values.key);
        } catch (error) {
          e = error;
          e.parsedLine = this.getRealCurrentLineNb() + 1;
          e.snippet = this.currentLine;
          throw e;
        }
        if ('<<' === key) {
          mergeNode = true;
          allowOverwrite = true;
          if (((ref1 = values.value) != null ? ref1.indexOf('*') : void 0) === 0) {
            refName = values.value.slice(1);
            if (this.refs[refName] == null) {
              throw new ParseException('Reference "' + refName + '" does not exist.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            refValue = this.refs[refName];
            if (typeof refValue !== 'object') {
              throw new ParseException('YAML merge keys used with a scalar value instead of an object.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            if (refValue instanceof Array) {
              for (i = j = 0, len = refValue.length; j < len; i = ++j) {
                value = refValue[i];
                if (data[name = String(i)] == null) {
                  data[name] = value;
                }
              }
            } else {
              for (key in refValue) {
                value = refValue[key];
                if (data[key] == null) {
                  data[key] = value;
                }
              }
            }
          } else {
            if ((values.value != null) && values.value !== '') {
              value = values.value;
            } else {
              value = this.getNextEmbedBlock();
            }
            c = this.getRealCurrentLineNb() + 1;
            parser = new Parser(c);
            parser.refs = this.refs;
            parsed = parser.parse(value, exceptionOnInvalidType);
            if (typeof parsed !== 'object') {
              throw new ParseException('YAML merge keys used with a scalar value instead of an object.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            if (parsed instanceof Array) {
              for (l = 0, len1 = parsed.length; l < len1; l++) {
                parsedItem = parsed[l];
                if (typeof parsedItem !== 'object') {
                  throw new ParseException('Merge items must be objects.', this.getRealCurrentLineNb() + 1, parsedItem);
                }
                if (parsedItem instanceof Array) {
                  for (i = m = 0, len2 = parsedItem.length; m < len2; i = ++m) {
                    value = parsedItem[i];
                    k = String(i);
                    if (!data.hasOwnProperty(k)) {
                      data[k] = value;
                    }
                  }
                } else {
                  for (key in parsedItem) {
                    value = parsedItem[key];
                    if (!data.hasOwnProperty(key)) {
                      data[key] = value;
                    }
                  }
                }
              }
            } else {
              for (key in parsed) {
                value = parsed[key];
                if (!data.hasOwnProperty(key)) {
                  data[key] = value;
                }
              }
            }
          }
        } else if ((values.value != null) && (matches = this.PATTERN_ANCHOR_VALUE.exec(values.value))) {
          isRef = matches.ref;
          values.value = matches.value;
        }
        if (mergeNode) {

        } else if (!(values.value != null) || '' === Utils.trim(values.value, ' ') || Utils.ltrim(values.value, ' ').indexOf('#') === 0) {
          if (!(this.isNextLineIndented()) && !(this.isNextLineUnIndentedCollection())) {
            if (allowOverwrite || data[key] === void 0) {
              data[key] = null;
            }
          } else {
            c = this.getRealCurrentLineNb() + 1;
            parser = new Parser(c);
            parser.refs = this.refs;
            val = parser.parse(this.getNextEmbedBlock(), exceptionOnInvalidType, objectDecoder);
            if (allowOverwrite || data[key] === void 0) {
              data[key] = val;
            }
          }
        } else {
          val = this.parseValue(values.value, exceptionOnInvalidType, objectDecoder);
          if (allowOverwrite || data[key] === void 0) {
            data[key] = val;
          }
        }
      } else {
        lineCount = this.lines.length;
        if (1 === lineCount || (2 === lineCount && Utils.isEmpty(this.lines[1]))) {
          try {
            value = Inline.parse(this.lines[0], exceptionOnInvalidType, objectDecoder);
          } catch (error) {
            e = error;
            e.parsedLine = this.getRealCurrentLineNb() + 1;
            e.snippet = this.currentLine;
            throw e;
          }
          if (typeof value === 'object') {
            if (value instanceof Array) {
              first = value[0];
            } else {
              for (key in value) {
                first = value[key];
                break;
              }
            }
            if (typeof first === 'string' && first.indexOf('*') === 0) {
              data = [];
              for (n = 0, len3 = value.length; n < len3; n++) {
                alias = value[n];
                data.push(this.refs[alias.slice(1)]);
              }
              value = data;
            }
          }
          return value;
        } else if ((ref2 = Utils.ltrim(value).charAt(0)) === '[' || ref2 === '{') {
          try {
            return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
          } catch (error) {
            e = error;
            e.parsedLine = this.getRealCurrentLineNb() + 1;
            e.snippet = this.currentLine;
            throw e;
          }
        }
        throw new ParseException('Unable to parse.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
      if (isRef) {
        if (data instanceof Array) {
          this.refs[isRef] = data[data.length - 1];
        } else {
          lastKey = null;
          for (key in data) {
            lastKey = key;
          }
          this.refs[isRef] = data[lastKey];
        }
      }
    }
    if (Utils.isEmpty(data)) {
      return null;
    } else {
      return data;
    }
  };

  Parser.prototype.getRealCurrentLineNb = function() {
    return this.currentLineNb + this.offset;
  };

  Parser.prototype.getCurrentLineIndentation = function() {
    return this.currentLine.length - Utils.ltrim(this.currentLine, ' ').length;
  };

  Parser.prototype.getNextEmbedBlock = function(indentation, includeUnindentedCollection) {
    var data, indent, isItUnindentedCollection, newIndent, removeComments, removeCommentsPattern, unindentedEmbedBlock;
    if (indentation == null) {
      indentation = null;
    }
    if (includeUnindentedCollection == null) {
      includeUnindentedCollection = false;
    }
    this.moveToNextLine();
    if (indentation == null) {
      newIndent = this.getCurrentLineIndentation();
      unindentedEmbedBlock = this.isStringUnIndentedCollectionItem(this.currentLine);
      if (!(this.isCurrentLineEmpty()) && 0 === newIndent && !unindentedEmbedBlock) {
        throw new ParseException('Indentation problem.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
    } else {
      newIndent = indentation;
    }
    data = [this.currentLine.slice(newIndent)];
    if (!includeUnindentedCollection) {
      isItUnindentedCollection = this.isStringUnIndentedCollectionItem(this.currentLine);
    }
    removeCommentsPattern = this.PATTERN_FOLDED_SCALAR_END;
    removeComments = !removeCommentsPattern.test(this.currentLine);
    while (this.moveToNextLine()) {
      indent = this.getCurrentLineIndentation();
      if (indent === newIndent) {
        removeComments = !removeCommentsPattern.test(this.currentLine);
      }
      if (removeComments && this.isCurrentLineComment()) {
        continue;
      }
      if (this.isCurrentLineBlank()) {
        data.push(this.currentLine.slice(newIndent));
        continue;
      }
      if (isItUnindentedCollection && !this.isStringUnIndentedCollectionItem(this.currentLine) && indent === newIndent) {
        this.moveToPreviousLine();
        break;
      }
      if (indent >= newIndent) {
        data.push(this.currentLine.slice(newIndent));
      } else if (Utils.ltrim(this.currentLine).charAt(0) === '#') {

      } else if (0 === indent) {
        this.moveToPreviousLine();
        break;
      } else {
        throw new ParseException('Indentation problem.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
    }
    return data.join("\n");
  };

  Parser.prototype.moveToNextLine = function() {
    if (this.currentLineNb >= this.lines.length - 1) {
      return false;
    }
    this.currentLine = this.lines[++this.currentLineNb];
    return true;
  };

  Parser.prototype.moveToPreviousLine = function() {
    this.currentLine = this.lines[--this.currentLineNb];
  };

  Parser.prototype.parseValue = function(value, exceptionOnInvalidType, objectDecoder) {
    var e, foldedIndent, matches, modifiers, pos, ref, ref1, val;
    if (0 === value.indexOf('*')) {
      pos = value.indexOf('#');
      if (pos !== -1) {
        value = value.substr(1, pos - 2);
      } else {
        value = value.slice(1);
      }
      if (this.refs[value] === void 0) {
        throw new ParseException('Reference "' + value + '" does not exist.', this.currentLine);
      }
      return this.refs[value];
    }
    if (matches = this.PATTERN_FOLDED_SCALAR_ALL.exec(value)) {
      modifiers = (ref = matches.modifiers) != null ? ref : '';
      foldedIndent = Math.abs(parseInt(modifiers));
      if (isNaN(foldedIndent)) {
        foldedIndent = 0;
      }
      val = this.parseFoldedScalar(matches.separator, this.PATTERN_DECIMAL.replace(modifiers, ''), foldedIndent);
      if (matches.type != null) {
        Inline.configure(exceptionOnInvalidType, objectDecoder);
        return Inline.parseScalar(matches.type + ' ' + val);
      } else {
        return val;
      }
    }
    if ((ref1 = value.charAt(0)) === '[' || ref1 === '{' || ref1 === '"' || ref1 === "'") {
      while (true) {
        try {
          return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
        } catch (error) {
          e = error;
          if (e instanceof ParseMore && this.moveToNextLine()) {
            value += "\n" + Utils.trim(this.currentLine, ' ');
          } else {
            e.parsedLine = this.getRealCurrentLineNb() + 1;
            e.snippet = this.currentLine;
            throw e;
          }
        }
      }
    } else {
      if (this.isNextLineIndented()) {
        value += "\n" + this.getNextEmbedBlock();
      }
      return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
    }
  };

  Parser.prototype.parseFoldedScalar = function(separator, indicator, indentation) {
    var isCurrentLineBlank, j, len, line, matches, newText, notEOF, pattern, ref, text;
    if (indicator == null) {
      indicator = '';
    }
    if (indentation == null) {
      indentation = 0;
    }
    notEOF = this.moveToNextLine();
    if (!notEOF) {
      return '';
    }
    isCurrentLineBlank = this.isCurrentLineBlank();
    text = '';
    while (notEOF && isCurrentLineBlank) {
      if (notEOF = this.moveToNextLine()) {
        text += "\n";
        isCurrentLineBlank = this.isCurrentLineBlank();
      }
    }
    if (0 === indentation) {
      if (matches = this.PATTERN_INDENT_SPACES.exec(this.currentLine)) {
        indentation = matches[0].length;
      }
    }
    if (indentation > 0) {
      pattern = this.PATTERN_FOLDED_SCALAR_BY_INDENTATION[indentation];
      if (pattern == null) {
        pattern = new Pattern('^ {' + indentation + '}(.*)$');
        Parser.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION[indentation] = pattern;
      }
      while (notEOF && (isCurrentLineBlank || (matches = pattern.exec(this.currentLine)))) {
        if (isCurrentLineBlank) {
          text += this.currentLine.slice(indentation);
        } else {
          text += matches[1];
        }
        if (notEOF = this.moveToNextLine()) {
          text += "\n";
          isCurrentLineBlank = this.isCurrentLineBlank();
        }
      }
    } else if (notEOF) {
      text += "\n";
    }
    if (notEOF) {
      this.moveToPreviousLine();
    }
    if ('>' === separator) {
      newText = '';
      ref = text.split("\n");
      for (j = 0, len = ref.length; j < len; j++) {
        line = ref[j];
        if (line.length === 0 || line.charAt(0) === ' ') {
          newText = Utils.rtrim(newText, ' ') + line + "\n";
        } else {
          newText += line + ' ';
        }
      }
      text = newText;
    }
    if ('+' !== indicator) {
      text = Utils.rtrim(text);
    }
    if ('' === indicator) {
      text = this.PATTERN_TRAILING_LINES.replace(text, "\n");
    } else if ('-' === indicator) {
      text = this.PATTERN_TRAILING_LINES.replace(text, '');
    }
    return text;
  };

  Parser.prototype.isNextLineIndented = function(ignoreComments) {
    var EOF, currentIndentation, ret;
    if (ignoreComments == null) {
      ignoreComments = true;
    }
    currentIndentation = this.getCurrentLineIndentation();
    EOF = !this.moveToNextLine();
    if (ignoreComments) {
      while (!EOF && this.isCurrentLineEmpty()) {
        EOF = !this.moveToNextLine();
      }
    } else {
      while (!EOF && this.isCurrentLineBlank()) {
        EOF = !this.moveToNextLine();
      }
    }
    if (EOF) {
      return false;
    }
    ret = false;
    if (this.getCurrentLineIndentation() > currentIndentation) {
      ret = true;
    }
    this.moveToPreviousLine();
    return ret;
  };

  Parser.prototype.isCurrentLineEmpty = function() {
    var trimmedLine;
    trimmedLine = Utils.trim(this.currentLine, ' ');
    return trimmedLine.length === 0 || trimmedLine.charAt(0) === '#';
  };

  Parser.prototype.isCurrentLineBlank = function() {
    return '' === Utils.trim(this.currentLine, ' ');
  };

  Parser.prototype.isCurrentLineComment = function() {
    var ltrimmedLine;
    ltrimmedLine = Utils.ltrim(this.currentLine, ' ');
    return ltrimmedLine.charAt(0) === '#';
  };

  Parser.prototype.cleanup = function(value) {
    var count, i, indent, j, l, len, len1, line, lines, ref, ref1, ref2, smallestIndent, trimmedValue;
    if (value.indexOf("\r") !== -1) {
      value = value.split("\r\n").join("\n").split("\r").join("\n");
    }
    count = 0;
    ref = this.PATTERN_YAML_HEADER.replaceAll(value, ''), value = ref[0], count = ref[1];
    this.offset += count;
    ref1 = this.PATTERN_LEADING_COMMENTS.replaceAll(value, '', 1), trimmedValue = ref1[0], count = ref1[1];
    if (count === 1) {
      this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
      value = trimmedValue;
    }
    ref2 = this.PATTERN_DOCUMENT_MARKER_START.replaceAll(value, '', 1), trimmedValue = ref2[0], count = ref2[1];
    if (count === 1) {
      this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
      value = trimmedValue;
      value = this.PATTERN_DOCUMENT_MARKER_END.replace(value, '');
    }
    lines = value.split("\n");
    smallestIndent = -1;
    for (j = 0, len = lines.length; j < len; j++) {
      line = lines[j];
      if (Utils.trim(line, ' ').length === 0) {
        continue;
      }
      indent = line.length - Utils.ltrim(line).length;
      if (smallestIndent === -1 || indent < smallestIndent) {
        smallestIndent = indent;
      }
    }
    if (smallestIndent > 0) {
      for (i = l = 0, len1 = lines.length; l < len1; i = ++l) {
        line = lines[i];
        lines[i] = line.slice(smallestIndent);
      }
      value = lines.join("\n");
    }
    return value;
  };

  Parser.prototype.isNextLineUnIndentedCollection = function(currentIndentation) {
    var notEOF, ret;
    if (currentIndentation == null) {
      currentIndentation = null;
    }
    if (currentIndentation == null) {
      currentIndentation = this.getCurrentLineIndentation();
    }
    notEOF = this.moveToNextLine();
    while (notEOF && this.isCurrentLineEmpty()) {
      notEOF = this.moveToNextLine();
    }
    if (false === notEOF) {
      return false;
    }
    ret = false;
    if (this.getCurrentLineIndentation() === currentIndentation && this.isStringUnIndentedCollectionItem(this.currentLine)) {
      ret = true;
    }
    this.moveToPreviousLine();
    return ret;
  };

  Parser.prototype.isStringUnIndentedCollectionItem = function() {
    return this.currentLine === '-' || this.currentLine.slice(0, 2) === '- ';
  };

  return Parser;

})();

module.exports = Parser;


/***/ }),
/* 146 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated by CoffeeScript 1.12.4
var DumpException, Escaper, Inline, ParseException, ParseMore, Pattern, Unescaper, Utils,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Pattern = __webpack_require__(147);

Unescaper = __webpack_require__(148);

Escaper = __webpack_require__(151);

Utils = __webpack_require__(149);

ParseException = __webpack_require__(152);

ParseMore = __webpack_require__(153);

DumpException = __webpack_require__(154);

Inline = (function() {
  function Inline() {}

  Inline.REGEX_QUOTED_STRING = '(?:"(?:[^"\\\\]*(?:\\\\.[^"\\\\]*)*)"|\'(?:[^\']*(?:\'\'[^\']*)*)\')';

  Inline.PATTERN_TRAILING_COMMENTS = new Pattern('^\\s*#.*$');

  Inline.PATTERN_QUOTED_SCALAR = new Pattern('^' + Inline.REGEX_QUOTED_STRING);

  Inline.PATTERN_THOUSAND_NUMERIC_SCALAR = new Pattern('^(-|\\+)?[0-9,]+(\\.[0-9]+)?$');

  Inline.PATTERN_SCALAR_BY_DELIMITERS = {};

  Inline.settings = {};

  Inline.configure = function(exceptionOnInvalidType, objectDecoder) {
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = null;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    this.settings.exceptionOnInvalidType = exceptionOnInvalidType;
    this.settings.objectDecoder = objectDecoder;
  };

  Inline.parse = function(value, exceptionOnInvalidType, objectDecoder) {
    var context, result;
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    this.settings.exceptionOnInvalidType = exceptionOnInvalidType;
    this.settings.objectDecoder = objectDecoder;
    if (value == null) {
      return '';
    }
    value = Utils.trim(value);
    if (0 === value.length) {
      return '';
    }
    context = {
      exceptionOnInvalidType: exceptionOnInvalidType,
      objectDecoder: objectDecoder,
      i: 0
    };
    switch (value.charAt(0)) {
      case '[':
        result = this.parseSequence(value, context);
        ++context.i;
        break;
      case '{':
        result = this.parseMapping(value, context);
        ++context.i;
        break;
      default:
        result = this.parseScalar(value, null, ['"', "'"], context);
    }
    if (this.PATTERN_TRAILING_COMMENTS.replace(value.slice(context.i), '') !== '') {
      throw new ParseException('Unexpected characters near "' + value.slice(context.i) + '".');
    }
    return result;
  };

  Inline.dump = function(value, exceptionOnInvalidType, objectEncoder) {
    var ref, result, type;
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectEncoder == null) {
      objectEncoder = null;
    }
    if (value == null) {
      return 'null';
    }
    type = typeof value;
    if (type === 'object') {
      if (value instanceof Date) {
        return value.toISOString();
      } else if (objectEncoder != null) {
        result = objectEncoder(value);
        if (typeof result === 'string' || (result != null)) {
          return result;
        }
      }
      return this.dumpObject(value);
    }
    if (type === 'boolean') {
      return (value ? 'true' : 'false');
    }
    if (Utils.isDigits(value)) {
      return (type === 'string' ? "'" + value + "'" : String(parseInt(value)));
    }
    if (Utils.isNumeric(value)) {
      return (type === 'string' ? "'" + value + "'" : String(parseFloat(value)));
    }
    if (type === 'number') {
      return (value === 2e308 ? '.Inf' : (value === -2e308 ? '-.Inf' : (isNaN(value) ? '.NaN' : value)));
    }
    if (Escaper.requiresDoubleQuoting(value)) {
      return Escaper.escapeWithDoubleQuotes(value);
    }
    if (Escaper.requiresSingleQuoting(value)) {
      return Escaper.escapeWithSingleQuotes(value);
    }
    if ('' === value) {
      return '""';
    }
    if (Utils.PATTERN_DATE.test(value)) {
      return "'" + value + "'";
    }
    if ((ref = value.toLowerCase()) === 'null' || ref === '~' || ref === 'true' || ref === 'false') {
      return "'" + value + "'";
    }
    return value;
  };

  Inline.dumpObject = function(value, exceptionOnInvalidType, objectSupport) {
    var j, key, len1, output, val;
    if (objectSupport == null) {
      objectSupport = null;
    }
    if (value instanceof Array) {
      output = [];
      for (j = 0, len1 = value.length; j < len1; j++) {
        val = value[j];
        output.push(this.dump(val));
      }
      return '[' + output.join(', ') + ']';
    } else {
      output = [];
      for (key in value) {
        val = value[key];
        output.push(this.dump(key) + ': ' + this.dump(val));
      }
      return '{' + output.join(', ') + '}';
    }
  };

  Inline.parseScalar = function(scalar, delimiters, stringDelimiters, context, evaluate) {
    var i, joinedDelimiters, match, output, pattern, ref, ref1, strpos, tmp;
    if (delimiters == null) {
      delimiters = null;
    }
    if (stringDelimiters == null) {
      stringDelimiters = ['"', "'"];
    }
    if (context == null) {
      context = null;
    }
    if (evaluate == null) {
      evaluate = true;
    }
    if (context == null) {
      context = {
        exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
        objectDecoder: this.settings.objectDecoder,
        i: 0
      };
    }
    i = context.i;
    if (ref = scalar.charAt(i), indexOf.call(stringDelimiters, ref) >= 0) {
      output = this.parseQuotedScalar(scalar, context);
      i = context.i;
      if (delimiters != null) {
        tmp = Utils.ltrim(scalar.slice(i), ' ');
        if (!(ref1 = tmp.charAt(0), indexOf.call(delimiters, ref1) >= 0)) {
          throw new ParseException('Unexpected characters (' + scalar.slice(i) + ').');
        }
      }
    } else {
      if (!delimiters) {
        output = scalar.slice(i);
        i += output.length;
        strpos = output.indexOf(' #');
        if (strpos !== -1) {
          output = Utils.rtrim(output.slice(0, strpos));
        }
      } else {
        joinedDelimiters = delimiters.join('|');
        pattern = this.PATTERN_SCALAR_BY_DELIMITERS[joinedDelimiters];
        if (pattern == null) {
          pattern = new Pattern('^(.+?)(' + joinedDelimiters + ')');
          this.PATTERN_SCALAR_BY_DELIMITERS[joinedDelimiters] = pattern;
        }
        if (match = pattern.exec(scalar.slice(i))) {
          output = match[1];
          i += output.length;
        } else {
          throw new ParseException('Malformed inline YAML string (' + scalar + ').');
        }
      }
      if (evaluate) {
        output = this.evaluateScalar(output, context);
      }
    }
    context.i = i;
    return output;
  };

  Inline.parseQuotedScalar = function(scalar, context) {
    var i, match, output;
    i = context.i;
    if (!(match = this.PATTERN_QUOTED_SCALAR.exec(scalar.slice(i)))) {
      throw new ParseMore('Malformed inline YAML string (' + scalar.slice(i) + ').');
    }
    output = match[0].substr(1, match[0].length - 2);
    if ('"' === scalar.charAt(i)) {
      output = Unescaper.unescapeDoubleQuotedString(output);
    } else {
      output = Unescaper.unescapeSingleQuotedString(output);
    }
    i += match[0].length;
    context.i = i;
    return output;
  };

  Inline.parseSequence = function(sequence, context) {
    var e, i, isQuoted, len, output, ref, value;
    output = [];
    len = sequence.length;
    i = context.i;
    i += 1;
    while (i < len) {
      context.i = i;
      switch (sequence.charAt(i)) {
        case '[':
          output.push(this.parseSequence(sequence, context));
          i = context.i;
          break;
        case '{':
          output.push(this.parseMapping(sequence, context));
          i = context.i;
          break;
        case ']':
          return output;
        case ',':
        case ' ':
        case "\n":
          break;
        default:
          isQuoted = ((ref = sequence.charAt(i)) === '"' || ref === "'");
          value = this.parseScalar(sequence, [',', ']'], ['"', "'"], context);
          i = context.i;
          if (!isQuoted && typeof value === 'string' && (value.indexOf(': ') !== -1 || value.indexOf(":\n") !== -1)) {
            try {
              value = this.parseMapping('{' + value + '}');
            } catch (error) {
              e = error;
            }
          }
          output.push(value);
          --i;
      }
      ++i;
    }
    throw new ParseMore('Malformed inline YAML string ' + sequence);
  };

  Inline.parseMapping = function(mapping, context) {
    var done, i, key, len, output, shouldContinueWhileLoop, value;
    output = {};
    len = mapping.length;
    i = context.i;
    i += 1;
    shouldContinueWhileLoop = false;
    while (i < len) {
      context.i = i;
      switch (mapping.charAt(i)) {
        case ' ':
        case ',':
        case "\n":
          ++i;
          context.i = i;
          shouldContinueWhileLoop = true;
          break;
        case '}':
          return output;
      }
      if (shouldContinueWhileLoop) {
        shouldContinueWhileLoop = false;
        continue;
      }
      key = this.parseScalar(mapping, [':', ' ', "\n"], ['"', "'"], context, false);
      i = context.i;
      done = false;
      while (i < len) {
        context.i = i;
        switch (mapping.charAt(i)) {
          case '[':
            value = this.parseSequence(mapping, context);
            i = context.i;
            if (output[key] === void 0) {
              output[key] = value;
            }
            done = true;
            break;
          case '{':
            value = this.parseMapping(mapping, context);
            i = context.i;
            if (output[key] === void 0) {
              output[key] = value;
            }
            done = true;
            break;
          case ':':
          case ' ':
          case "\n":
            break;
          default:
            value = this.parseScalar(mapping, [',', '}'], ['"', "'"], context);
            i = context.i;
            if (output[key] === void 0) {
              output[key] = value;
            }
            done = true;
            --i;
        }
        ++i;
        if (done) {
          break;
        }
      }
    }
    throw new ParseMore('Malformed inline YAML string ' + mapping);
  };

  Inline.evaluateScalar = function(scalar, context) {
    var cast, date, exceptionOnInvalidType, firstChar, firstSpace, firstWord, objectDecoder, raw, scalarLower, subValue, trimmedScalar;
    scalar = Utils.trim(scalar);
    scalarLower = scalar.toLowerCase();
    switch (scalarLower) {
      case 'null':
      case '':
      case '~':
        return null;
      case 'true':
        return true;
      case 'false':
        return false;
      case '.inf':
        return 2e308;
      case '.nan':
        return 0/0;
      case '-.inf':
        return 2e308;
      default:
        firstChar = scalarLower.charAt(0);
        switch (firstChar) {
          case '!':
            firstSpace = scalar.indexOf(' ');
            if (firstSpace === -1) {
              firstWord = scalarLower;
            } else {
              firstWord = scalarLower.slice(0, firstSpace);
            }
            switch (firstWord) {
              case '!':
                if (firstSpace !== -1) {
                  return parseInt(this.parseScalar(scalar.slice(2)));
                }
                return null;
              case '!str':
                return Utils.ltrim(scalar.slice(4));
              case '!!str':
                return Utils.ltrim(scalar.slice(5));
              case '!!int':
                return parseInt(this.parseScalar(scalar.slice(5)));
              case '!!bool':
                return Utils.parseBoolean(this.parseScalar(scalar.slice(6)), false);
              case '!!float':
                return parseFloat(this.parseScalar(scalar.slice(7)));
              case '!!timestamp':
                return Utils.stringToDate(Utils.ltrim(scalar.slice(11)));
              default:
                if (context == null) {
                  context = {
                    exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
                    objectDecoder: this.settings.objectDecoder,
                    i: 0
                  };
                }
                objectDecoder = context.objectDecoder, exceptionOnInvalidType = context.exceptionOnInvalidType;
                if (objectDecoder) {
                  trimmedScalar = Utils.rtrim(scalar);
                  firstSpace = trimmedScalar.indexOf(' ');
                  if (firstSpace === -1) {
                    return objectDecoder(trimmedScalar, null);
                  } else {
                    subValue = Utils.ltrim(trimmedScalar.slice(firstSpace + 1));
                    if (!(subValue.length > 0)) {
                      subValue = null;
                    }
                    return objectDecoder(trimmedScalar.slice(0, firstSpace), subValue);
                  }
                }
                if (exceptionOnInvalidType) {
                  throw new ParseException('Custom object support when parsing a YAML file has been disabled.');
                }
                return null;
            }
            break;
          case '0':
            if ('0x' === scalar.slice(0, 2)) {
              return Utils.hexDec(scalar);
            } else if (Utils.isDigits(scalar)) {
              return Utils.octDec(scalar);
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else {
              return scalar;
            }
            break;
          case '+':
            if (Utils.isDigits(scalar)) {
              raw = scalar;
              cast = parseInt(raw);
              if (raw === String(cast)) {
                return cast;
              } else {
                return raw;
              }
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
              return parseFloat(scalar.replace(',', ''));
            }
            return scalar;
          case '-':
            if (Utils.isDigits(scalar.slice(1))) {
              if ('0' === scalar.charAt(1)) {
                return -Utils.octDec(scalar.slice(1));
              } else {
                raw = scalar.slice(1);
                cast = parseInt(raw);
                if (raw === String(cast)) {
                  return -cast;
                } else {
                  return -raw;
                }
              }
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
              return parseFloat(scalar.replace(',', ''));
            }
            return scalar;
          default:
            if (date = Utils.stringToDate(scalar)) {
              return date;
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
              return parseFloat(scalar.replace(',', ''));
            }
            return scalar;
        }
    }
  };

  return Inline;

})();

module.exports = Inline;


/***/ }),
/* 147 */
/***/ ((module) => {

// Generated by CoffeeScript 1.12.4
var Pattern;

Pattern = (function() {
  Pattern.prototype.regex = null;

  Pattern.prototype.rawRegex = null;

  Pattern.prototype.cleanedRegex = null;

  Pattern.prototype.mapping = null;

  function Pattern(rawRegex, modifiers) {
    var _char, capturingBracketNumber, cleanedRegex, i, len, mapping, name, part, subChar;
    if (modifiers == null) {
      modifiers = '';
    }
    cleanedRegex = '';
    len = rawRegex.length;
    mapping = null;
    capturingBracketNumber = 0;
    i = 0;
    while (i < len) {
      _char = rawRegex.charAt(i);
      if (_char === '\\') {
        cleanedRegex += rawRegex.slice(i, +(i + 1) + 1 || 9e9);
        i++;
      } else if (_char === '(') {
        if (i < len - 2) {
          part = rawRegex.slice(i, +(i + 2) + 1 || 9e9);
          if (part === '(?:') {
            i += 2;
            cleanedRegex += part;
          } else if (part === '(?<') {
            capturingBracketNumber++;
            i += 2;
            name = '';
            while (i + 1 < len) {
              subChar = rawRegex.charAt(i + 1);
              if (subChar === '>') {
                cleanedRegex += '(';
                i++;
                if (name.length > 0) {
                  if (mapping == null) {
                    mapping = {};
                  }
                  mapping[name] = capturingBracketNumber;
                }
                break;
              } else {
                name += subChar;
              }
              i++;
            }
          } else {
            cleanedRegex += _char;
            capturingBracketNumber++;
          }
        } else {
          cleanedRegex += _char;
        }
      } else {
        cleanedRegex += _char;
      }
      i++;
    }
    this.rawRegex = rawRegex;
    this.cleanedRegex = cleanedRegex;
    this.regex = new RegExp(this.cleanedRegex, 'g' + modifiers.replace('g', ''));
    this.mapping = mapping;
  }

  Pattern.prototype.exec = function(str) {
    var index, matches, name, ref;
    this.regex.lastIndex = 0;
    matches = this.regex.exec(str);
    if (matches == null) {
      return null;
    }
    if (this.mapping != null) {
      ref = this.mapping;
      for (name in ref) {
        index = ref[name];
        matches[name] = matches[index];
      }
    }
    return matches;
  };

  Pattern.prototype.test = function(str) {
    this.regex.lastIndex = 0;
    return this.regex.test(str);
  };

  Pattern.prototype.replace = function(str, replacement) {
    this.regex.lastIndex = 0;
    return str.replace(this.regex, replacement);
  };

  Pattern.prototype.replaceAll = function(str, replacement, limit) {
    var count;
    if (limit == null) {
      limit = 0;
    }
    this.regex.lastIndex = 0;
    count = 0;
    while (this.regex.test(str) && (limit === 0 || count < limit)) {
      this.regex.lastIndex = 0;
      str = str.replace(this.regex, replacement);
      count++;
    }
    return [str, count];
  };

  return Pattern;

})();

module.exports = Pattern;


/***/ }),
/* 148 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated by CoffeeScript 1.12.4
var Pattern, Unescaper, Utils;

Utils = __webpack_require__(149);

Pattern = __webpack_require__(147);

Unescaper = (function() {
  function Unescaper() {}

  Unescaper.PATTERN_ESCAPED_CHARACTER = new Pattern('\\\\([0abt\tnvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})');

  Unescaper.unescapeSingleQuotedString = function(value) {
    return value.replace(/\'\'/g, '\'');
  };

  Unescaper.unescapeDoubleQuotedString = function(value) {
    if (this._unescapeCallback == null) {
      this._unescapeCallback = (function(_this) {
        return function(str) {
          return _this.unescapeCharacter(str);
        };
      })(this);
    }
    return this.PATTERN_ESCAPED_CHARACTER.replace(value, this._unescapeCallback);
  };

  Unescaper.unescapeCharacter = function(value) {
    var ch;
    ch = String.fromCharCode;
    switch (value.charAt(1)) {
      case '0':
        return ch(0);
      case 'a':
        return ch(7);
      case 'b':
        return ch(8);
      case 't':
        return "\t";
      case "\t":
        return "\t";
      case 'n':
        return "\n";
      case 'v':
        return ch(11);
      case 'f':
        return ch(12);
      case 'r':
        return ch(13);
      case 'e':
        return ch(27);
      case ' ':
        return ' ';
      case '"':
        return '"';
      case '/':
        return '/';
      case '\\':
        return '\\';
      case 'N':
        return ch(0x0085);
      case '_':
        return ch(0x00A0);
      case 'L':
        return ch(0x2028);
      case 'P':
        return ch(0x2029);
      case 'x':
        return Utils.utf8chr(Utils.hexDec(value.substr(2, 2)));
      case 'u':
        return Utils.utf8chr(Utils.hexDec(value.substr(2, 4)));
      case 'U':
        return Utils.utf8chr(Utils.hexDec(value.substr(2, 8)));
      default:
        return '';
    }
  };

  return Unescaper;

})();

module.exports = Unescaper;


/***/ }),
/* 149 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated by CoffeeScript 1.12.4
var Pattern, Utils,
  hasProp = {}.hasOwnProperty;

Pattern = __webpack_require__(147);

Utils = (function() {
  function Utils() {}

  Utils.REGEX_LEFT_TRIM_BY_CHAR = {};

  Utils.REGEX_RIGHT_TRIM_BY_CHAR = {};

  Utils.REGEX_SPACES = /\s+/g;

  Utils.REGEX_DIGITS = /^\d+$/;

  Utils.REGEX_OCTAL = /[^0-7]/gi;

  Utils.REGEX_HEXADECIMAL = /[^a-f0-9]/gi;

  Utils.PATTERN_DATE = new Pattern('^' + '(?<year>[0-9][0-9][0-9][0-9])' + '-(?<month>[0-9][0-9]?)' + '-(?<day>[0-9][0-9]?)' + '(?:(?:[Tt]|[ \t]+)' + '(?<hour>[0-9][0-9]?)' + ':(?<minute>[0-9][0-9])' + ':(?<second>[0-9][0-9])' + '(?:\.(?<fraction>[0-9]*))?' + '(?:[ \t]*(?<tz>Z|(?<tz_sign>[-+])(?<tz_hour>[0-9][0-9]?)' + '(?::(?<tz_minute>[0-9][0-9]))?))?)?' + '$', 'i');

  Utils.LOCAL_TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

  Utils.trim = function(str, _char) {
    var regexLeft, regexRight;
    if (_char == null) {
      _char = '\\s';
    }
    regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[_char];
    if (regexLeft == null) {
      this.REGEX_LEFT_TRIM_BY_CHAR[_char] = regexLeft = new RegExp('^' + _char + '' + _char + '*');
    }
    regexLeft.lastIndex = 0;
    regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[_char];
    if (regexRight == null) {
      this.REGEX_RIGHT_TRIM_BY_CHAR[_char] = regexRight = new RegExp(_char + '' + _char + '*$');
    }
    regexRight.lastIndex = 0;
    return str.replace(regexLeft, '').replace(regexRight, '');
  };

  Utils.ltrim = function(str, _char) {
    var regexLeft;
    if (_char == null) {
      _char = '\\s';
    }
    regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[_char];
    if (regexLeft == null) {
      this.REGEX_LEFT_TRIM_BY_CHAR[_char] = regexLeft = new RegExp('^' + _char + '' + _char + '*');
    }
    regexLeft.lastIndex = 0;
    return str.replace(regexLeft, '');
  };

  Utils.rtrim = function(str, _char) {
    var regexRight;
    if (_char == null) {
      _char = '\\s';
    }
    regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[_char];
    if (regexRight == null) {
      this.REGEX_RIGHT_TRIM_BY_CHAR[_char] = regexRight = new RegExp(_char + '' + _char + '*$');
    }
    regexRight.lastIndex = 0;
    return str.replace(regexRight, '');
  };

  Utils.isEmpty = function(value) {
    return !value || value === '' || value === '0' || (value instanceof Array && value.length === 0) || this.isEmptyObject(value);
  };

  Utils.isEmptyObject = function(value) {
    var k;
    return value instanceof Object && ((function() {
      var results;
      results = [];
      for (k in value) {
        if (!hasProp.call(value, k)) continue;
        results.push(k);
      }
      return results;
    })()).length === 0;
  };

  Utils.subStrCount = function(string, subString, start, length) {
    var c, i, j, len, ref, sublen;
    c = 0;
    string = '' + string;
    subString = '' + subString;
    if (start != null) {
      string = string.slice(start);
    }
    if (length != null) {
      string = string.slice(0, length);
    }
    len = string.length;
    sublen = subString.length;
    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (subString === string.slice(i, sublen)) {
        c++;
        i += sublen - 1;
      }
    }
    return c;
  };

  Utils.isDigits = function(input) {
    this.REGEX_DIGITS.lastIndex = 0;
    return this.REGEX_DIGITS.test(input);
  };

  Utils.octDec = function(input) {
    this.REGEX_OCTAL.lastIndex = 0;
    return parseInt((input + '').replace(this.REGEX_OCTAL, ''), 8);
  };

  Utils.hexDec = function(input) {
    this.REGEX_HEXADECIMAL.lastIndex = 0;
    input = this.trim(input);
    if ((input + '').slice(0, 2) === '0x') {
      input = (input + '').slice(2);
    }
    return parseInt((input + '').replace(this.REGEX_HEXADECIMAL, ''), 16);
  };

  Utils.utf8chr = function(c) {
    var ch;
    ch = String.fromCharCode;
    if (0x80 > (c %= 0x200000)) {
      return ch(c);
    }
    if (0x800 > c) {
      return ch(0xC0 | c >> 6) + ch(0x80 | c & 0x3F);
    }
    if (0x10000 > c) {
      return ch(0xE0 | c >> 12) + ch(0x80 | c >> 6 & 0x3F) + ch(0x80 | c & 0x3F);
    }
    return ch(0xF0 | c >> 18) + ch(0x80 | c >> 12 & 0x3F) + ch(0x80 | c >> 6 & 0x3F) + ch(0x80 | c & 0x3F);
  };

  Utils.parseBoolean = function(input, strict) {
    var lowerInput;
    if (strict == null) {
      strict = true;
    }
    if (typeof input === 'string') {
      lowerInput = input.toLowerCase();
      if (!strict) {
        if (lowerInput === 'no') {
          return false;
        }
      }
      if (lowerInput === '0') {
        return false;
      }
      if (lowerInput === 'false') {
        return false;
      }
      if (lowerInput === '') {
        return false;
      }
      return true;
    }
    return !!input;
  };

  Utils.isNumeric = function(input) {
    this.REGEX_SPACES.lastIndex = 0;
    return typeof input === 'number' || typeof input === 'string' && !isNaN(input) && input.replace(this.REGEX_SPACES, '') !== '';
  };

  Utils.stringToDate = function(str) {
    var date, day, fraction, hour, info, minute, month, second, tz_hour, tz_minute, tz_offset, year;
    if (!(str != null ? str.length : void 0)) {
      return null;
    }
    info = this.PATTERN_DATE.exec(str);
    if (!info) {
      return null;
    }
    year = parseInt(info.year, 10);
    month = parseInt(info.month, 10) - 1;
    day = parseInt(info.day, 10);
    if (info.hour == null) {
      date = new Date(Date.UTC(year, month, day));
      return date;
    }
    hour = parseInt(info.hour, 10);
    minute = parseInt(info.minute, 10);
    second = parseInt(info.second, 10);
    if (info.fraction != null) {
      fraction = info.fraction.slice(0, 3);
      while (fraction.length < 3) {
        fraction += '0';
      }
      fraction = parseInt(fraction, 10);
    } else {
      fraction = 0;
    }
    if (info.tz != null) {
      tz_hour = parseInt(info.tz_hour, 10);
      if (info.tz_minute != null) {
        tz_minute = parseInt(info.tz_minute, 10);
      } else {
        tz_minute = 0;
      }
      tz_offset = (tz_hour * 60 + tz_minute) * 60000;
      if ('-' === info.tz_sign) {
        tz_offset *= -1;
      }
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (tz_offset) {
      date.setTime(date.getTime() - tz_offset);
    }
    return date;
  };

  Utils.strRepeat = function(str, number) {
    var i, res;
    res = '';
    i = 0;
    while (i < number) {
      res += str;
      i++;
    }
    return res;
  };

  Utils.getStringFromFile = function(path, callback) {
    var data, fs, j, len1, name, ref, req, xhr;
    if (callback == null) {
      callback = null;
    }
    xhr = null;
    if (typeof window !== "undefined" && window !== null) {
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        ref = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
        for (j = 0, len1 = ref.length; j < len1; j++) {
          name = ref[j];
          try {
            xhr = new ActiveXObject(name);
          } catch (error) {}
        }
      }
    }
    if (xhr != null) {
      if (callback != null) {
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
              return callback(xhr.responseText);
            } else {
              return callback(null);
            }
          }
        };
        xhr.open('GET', path, true);
        return xhr.send(null);
      } else {
        xhr.open('GET', path, false);
        xhr.send(null);
        if (xhr.status === 200 || xhr.status === 0) {
          return xhr.responseText;
        }
        return null;
      }
    } else {
      req = undefined;
      fs = __webpack_require__(150);
      if (callback != null) {
        return fs.readFile(path, function(err, data) {
          if (err) {
            return callback(null);
          } else {
            return callback(String(data));
          }
        });
      } else {
        data = fs.readFileSync(path);
        if (data != null) {
          return String(data);
        }
        return null;
      }
    }
  };

  return Utils;

})();

module.exports = Utils;


/***/ }),
/* 150 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 151 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated by CoffeeScript 1.12.4
var Escaper, Pattern;

Pattern = __webpack_require__(147);

Escaper = (function() {
  var ch;

  function Escaper() {}

  Escaper.LIST_ESCAPEES = ['\\', '\\\\', '\\"', '"', "\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f", "\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x19", "\x1a", "\x1b", "\x1c", "\x1d", "\x1e", "\x1f", (ch = String.fromCharCode)(0x0085), ch(0x00A0), ch(0x2028), ch(0x2029)];

  Escaper.LIST_ESCAPED = ['\\\\', '\\"', '\\"', '\\"', "\\0", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\a", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r", "\\x0e", "\\x0f", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1a", "\\e", "\\x1c", "\\x1d", "\\x1e", "\\x1f", "\\N", "\\_", "\\L", "\\P"];

  Escaper.MAPPING_ESCAPEES_TO_ESCAPED = (function() {
    var i, j, mapping, ref;
    mapping = {};
    for (i = j = 0, ref = Escaper.LIST_ESCAPEES.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      mapping[Escaper.LIST_ESCAPEES[i]] = Escaper.LIST_ESCAPED[i];
    }
    return mapping;
  })();

  Escaper.PATTERN_CHARACTERS_TO_ESCAPE = new Pattern('[\\x00-\\x1f]|\xc2\x85|\xc2\xa0|\xe2\x80\xa8|\xe2\x80\xa9');

  Escaper.PATTERN_MAPPING_ESCAPEES = new Pattern(Escaper.LIST_ESCAPEES.join('|').split('\\').join('\\\\'));

  Escaper.PATTERN_SINGLE_QUOTING = new Pattern('[\\s\'":{}[\\],&*#?]|^[-?|<>=!%@`]');

  Escaper.requiresDoubleQuoting = function(value) {
    return this.PATTERN_CHARACTERS_TO_ESCAPE.test(value);
  };

  Escaper.escapeWithDoubleQuotes = function(value) {
    var result;
    result = this.PATTERN_MAPPING_ESCAPEES.replace(value, (function(_this) {
      return function(str) {
        return _this.MAPPING_ESCAPEES_TO_ESCAPED[str];
      };
    })(this));
    return '"' + result + '"';
  };

  Escaper.requiresSingleQuoting = function(value) {
    return this.PATTERN_SINGLE_QUOTING.test(value);
  };

  Escaper.escapeWithSingleQuotes = function(value) {
    return "'" + value.replace(/'/g, "''") + "'";
  };

  return Escaper;

})();

module.exports = Escaper;


/***/ }),
/* 152 */
/***/ ((module) => {

// Generated by CoffeeScript 1.12.4
var ParseException,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ParseException = (function(superClass) {
  extend(ParseException, superClass);

  function ParseException(message, parsedLine, snippet) {
    this.message = message;
    this.parsedLine = parsedLine;
    this.snippet = snippet;
  }

  ParseException.prototype.toString = function() {
    if ((this.parsedLine != null) && (this.snippet != null)) {
      return '<ParseException> ' + this.message + ' (line ' + this.parsedLine + ': \'' + this.snippet + '\')';
    } else {
      return '<ParseException> ' + this.message;
    }
  };

  return ParseException;

})(Error);

module.exports = ParseException;


/***/ }),
/* 153 */
/***/ ((module) => {

// Generated by CoffeeScript 1.12.4
var ParseMore,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ParseMore = (function(superClass) {
  extend(ParseMore, superClass);

  function ParseMore(message, parsedLine, snippet) {
    this.message = message;
    this.parsedLine = parsedLine;
    this.snippet = snippet;
  }

  ParseMore.prototype.toString = function() {
    if ((this.parsedLine != null) && (this.snippet != null)) {
      return '<ParseMore> ' + this.message + ' (line ' + this.parsedLine + ': \'' + this.snippet + '\')';
    } else {
      return '<ParseMore> ' + this.message;
    }
  };

  return ParseMore;

})(Error);

module.exports = ParseMore;


/***/ }),
/* 154 */
/***/ ((module) => {

// Generated by CoffeeScript 1.12.4
var DumpException,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DumpException = (function(superClass) {
  extend(DumpException, superClass);

  function DumpException(message, parsedLine, snippet) {
    this.message = message;
    this.parsedLine = parsedLine;
    this.snippet = snippet;
  }

  DumpException.prototype.toString = function() {
    if ((this.parsedLine != null) && (this.snippet != null)) {
      return '<DumpException> ' + this.message + ' (line ' + this.parsedLine + ': \'' + this.snippet + '\')';
    } else {
      return '<DumpException> ' + this.message;
    }
  };

  return DumpException;

})(Error);

module.exports = DumpException;


/***/ }),
/* 155 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated by CoffeeScript 1.12.4
var Dumper, Inline, Utils;

Utils = __webpack_require__(149);

Inline = __webpack_require__(146);

Dumper = (function() {
  function Dumper() {}

  Dumper.indentation = 4;

  Dumper.prototype.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    var i, key, len, output, prefix, value, willBeInlined;
    if (inline == null) {
      inline = 0;
    }
    if (indent == null) {
      indent = 0;
    }
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectEncoder == null) {
      objectEncoder = null;
    }
    output = '';
    prefix = (indent ? Utils.strRepeat(' ', indent) : '');
    if (inline <= 0 || typeof input !== 'object' || input instanceof Date || Utils.isEmpty(input)) {
      output += prefix + Inline.dump(input, exceptionOnInvalidType, objectEncoder);
    } else {
      if (input instanceof Array) {
        for (i = 0, len = input.length; i < len; i++) {
          value = input[i];
          willBeInlined = inline - 1 <= 0 || typeof value !== 'object' || Utils.isEmpty(value);
          output += prefix + '-' + (willBeInlined ? ' ' : "\n") + this.dump(value, inline - 1, (willBeInlined ? 0 : indent + this.indentation), exceptionOnInvalidType, objectEncoder) + (willBeInlined ? "\n" : '');
        }
      } else {
        for (key in input) {
          value = input[key];
          willBeInlined = inline - 1 <= 0 || typeof value !== 'object' || Utils.isEmpty(value);
          output += prefix + Inline.dump(key, exceptionOnInvalidType, objectEncoder) + ':' + (willBeInlined ? ' ' : "\n") + this.dump(value, inline - 1, (willBeInlined ? 0 : indent + this.indentation), exceptionOnInvalidType, objectEncoder) + (willBeInlined ? "\n" : '');
        }
      }
    }
    return output;
  };

  return Dumper;

})();

module.exports = Dumper;


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validationResult_1 = __webpack_require__(157);
const StructureValidationException_1 = __webpack_require__(160);
const StringableStructureValidator_1 = __webpack_require__(161);
class JSONStructureValidator extends StringableStructureValidator_1.default {
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            JSON.parse(structStr);
        }
        catch (err) {
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid JSON"));
        }
        return res;
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        if (!/^\{\w+:\w+(,\w+:\w+)*\}$/.test(structStr)) {
            res.addExceptions();
        }
        return res;
    }
}
exports["default"] = JSONStructureValidator;


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ValidationResult_exceptions, _ValidationResult_registerDatetime, _ValidationResult_validationDuration, _ValidationResult_params;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Exception_1 = __webpack_require__(6);
const ReportError_1 = __webpack_require__(158);
const TypeReportError_1 = __webpack_require__(159);
class ValidationResult {
    constructor(initialExceptions = []) {
        _ValidationResult_exceptions.set(this, []);
        _ValidationResult_registerDatetime.set(this, void 0);
        _ValidationResult_validationDuration.set(this, -1);
        _ValidationResult_params.set(this, new Map());
        __classPrivateFieldSet(this, _ValidationResult_registerDatetime, new Date(), "f");
        this.addExceptions(...initialExceptions);
    }
    get passed() {
        return __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").length === 0;
    }
    get isValid() {
        return __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").length === 0;
    }
    get registerDatetime() {
        return __classPrivateFieldGet(this, _ValidationResult_registerDatetime, "f");
    }
    get validationDuration() {
        return __classPrivateFieldGet(this, _ValidationResult_validationDuration, "f");
    }
    get exceptions() {
        return __classPrivateFieldGet(this, _ValidationResult_exceptions, "f");
    }
    setValidationDuration(duration = 0) {
        if (__classPrivateFieldGet(this, _ValidationResult_validationDuration, "f") === -1 && duration > 0) {
            __classPrivateFieldSet(this, _ValidationResult_validationDuration, duration, "f");
        }
    }
    addExceptions(...exceptions) {
        for (const exception of exceptions) {
            if (!(exception instanceof Exception_1.default || exception instanceof ReportError_1.default)) {
                __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").push(TypeReportError_1.default.byComparing(exception, Exception_1.default));
            }
            else {
                __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").push(exception);
            }
        }
    }
    setParam(name, value) {
        __classPrivateFieldGet(this, _ValidationResult_params, "f").set(name, value);
        return this;
    }
    getParam(name) {
        return __classPrivateFieldGet(this, _ValidationResult_params, "f").has(name) ? __classPrivateFieldGet(this, _ValidationResult_params, "f").get(name) : null;
    }
    [(_ValidationResult_exceptions = new WeakMap(), _ValidationResult_registerDatetime = new WeakMap(), _ValidationResult_validationDuration = new WeakMap(), _ValidationResult_params = new WeakMap(), Symbol.toPrimitive)](hint) {
        return this.passed;
    }
    valueOf() {
        return this.passed;
    }
    toString() {
        return this.passed ? 'Passed' : '';
    }
}
exports["default"] = ValidationResult;


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReportError_message, _ReportError_code, _ReportError_fileName, _ReportError_lineNumber;
Object.defineProperty(exports, "__esModule", ({ value: true }));
class ReportError extends Error {
    constructor(code, message) {
        super();
        _ReportError_message.set(this, void 0);
        _ReportError_code.set(this, void 0);
        _ReportError_fileName.set(this, void 0);
        _ReportError_lineNumber.set(this, void 0);
        __classPrivateFieldSet(this, _ReportError_message, message, "f");
        __classPrivateFieldSet(this, _ReportError_code, code, "f");
        __classPrivateFieldSet(this, _ReportError_fileName, "", "f");
        __classPrivateFieldSet(this, _ReportError_lineNumber, 0, "f");
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ReportError);
        }
    }
    get message() {
        return __classPrivateFieldGet(this, _ReportError_message, "f");
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return __classPrivateFieldGet(this, _ReportError_code, "f");
    }
    getFile() {
        return __classPrivateFieldGet(this, _ReportError_fileName, "f");
    }
    getLine() {
        return __classPrivateFieldGet(this, _ReportError_lineNumber, "f");
    }
    getTrace() {
        return [];
    }
    getTraceAsSring() {
        return this.getTrace().join();
    }
    getPrevious() {
        return null;
    }
    toString() {
        return this.message;
    }
    valueOf() {
        return this.message;
    }
}
exports["default"] = ReportError;
_ReportError_message = new WeakMap(), _ReportError_code = new WeakMap(), _ReportError_fileName = new WeakMap(), _ReportError_lineNumber = new WeakMap();


/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ReportError_1 = __webpack_require__(158);
class TypeReportError extends ReportError_1.default {
    constructor(message) {
        super(-1, message);
    }
    static byComparing(targetValue, expectedType, customMessage = '') {
        let baseTypeValue = Array.isArray(targetValue) ? 'array' : typeof targetValue, baseTypeExpected = Array.isArray(expectedType) ? 'array' : typeof expectedType;
        if (baseTypeValue === 'object') {
            baseTypeValue = targetValue?.constructor?.name ?? baseTypeValue;
        }
        if (baseTypeExpected === 'object') {
            baseTypeExpected = expectedType?.constructor?.name ?? baseTypeExpected;
        }
        let compareMessage = customMessage ? customMessage.replace('%t', baseTypeValue).replace('%v', targetValue.toString()).replace('%e', expectedType) : `Given value ${targetValue.toString()} must be compatibile with type ${baseTypeExpected}, but given ${baseTypeValue}`;
        return new TypeReportError(compareMessage);
    }
}
exports["default"] = TypeReportError;


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _StructureValidationException_structID;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Exception_1 = __webpack_require__(6);
class StructureValidationException extends Exception_1.default {
    constructor(tgStruct, message) {
        super(message);
        _StructureValidationException_structID.set(this, void 0);
        __classPrivateFieldSet(this, _StructureValidationException_structID, tgStruct.constructor.name, "f");
    }
}
exports["default"] = StructureValidationException;
_StructureValidationException_structID = new WeakMap();


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const AbstractStructureValidator_1 = __webpack_require__(162);
class StringableStructureValidator extends AbstractStructureValidator_1.default {
    getDefaultValidationData() {
        return {
            positionMarkers: new Map(),
            invaildChars: [],
            lastPosition: -1
        };
    }
}
exports["default"] = StringableStructureValidator;


/***/ }),
/* 162 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractStructureValidator_instances, _AbstractStructureValidator_id, _AbstractStructureValidator_snapshoots, _AbstractStructureValidator_validationData, _AbstractStructureValidator_clearValidation;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Exception_1 = __webpack_require__(6);
class AbstractStructureValidator {
    constructor() {
        _AbstractStructureValidator_instances.add(this);
        _AbstractStructureValidator_id.set(this, -1);
        _AbstractStructureValidator_snapshoots.set(this, []);
        //#currentSnapshoot : StructureValidationSnapshoot | null = null;
        _AbstractStructureValidator_validationData.set(this, null);
        const validatorOrigin = this.constructor;
        validatorOrigin.activeValidators.push(this);
        __classPrivateFieldSet(this, _AbstractStructureValidator_id, validatorOrigin.getLastID(), "f");
    }
    static getLastID() {
        return this.activeValidators.length - 1;
    }
    get id() {
        return __classPrivateFieldGet(this, _AbstractStructureValidator_id, "f");
    }
    validate(tgStruct, options = {}) {
        __classPrivateFieldSet(this, _AbstractStructureValidator_validationData, this.getDefaultValidationData(), "f");
        const startDatetime = new Date();
        const res = this.validationModel(tgStruct, options);
        const endDatetime = new Date();
        __classPrivateFieldGet(this, _AbstractStructureValidator_snapshoots, "f").push({
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            validatorRef: __classPrivateFieldGet(this, _AbstractStructureValidator_id, "f"),
            result: res,
            data: this.getValidationAllData()
        });
        res.setValidationDuration(Math.abs(endDatetime.getTime() - startDatetime.getTime()));
        return res;
    }
    shortValidate(tgStruct, options = {}) {
        __classPrivateFieldSet(this, _AbstractStructureValidator_validationData, this.getDefaultValidationData(), "f");
        const startDatetime = new Date();
        const res = this.shortValidationModel(tgStruct, options);
        const endDatetime = new Date();
        __classPrivateFieldGet(this, _AbstractStructureValidator_snapshoots, "f").push({
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            validatorRef: __classPrivateFieldGet(this, _AbstractStructureValidator_id, "f"),
            result: res,
            data: this.getValidationAllData()
        });
        res.setValidationDuration(Math.abs(endDatetime.getTime() - startDatetime.getTime()));
        return res;
    }
    getValidationData(optionName) {
        return __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") ? __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] || null : null;
    }
    getValidationAllData() {
        return __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f");
    }
    addValidationData(optionName, optionValue, optionKey = '') {
        try {
            if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === null) {
                throw new Exception_1.default("Validation data not initialised");
            }
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] === "undefined") {
                throw new Exception_1.default("Validation option with name " + optionName + " is not defined");
            }
            if (Array.isArray(__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName])) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].push(optionValue);
            }
            else if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Map || __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Set) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].set(optionKey, optionValue);
            }
            else if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === "object") {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName][optionKey] = optionValue;
            }
            else {
                throw new Exception_1.default("Type is not a collection");
            }
        }
        catch (exc) {
        }
    }
    updateValidationData(optionName, optionValue, optionKey = '') {
        try {
            if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === null) {
                throw new Exception_1.default("Validation data not initialised");
            }
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] === "undefined") {
                throw new Exception_1.default("Validation option with name " + optionName + " is not defined");
            }
            if (Array.isArray(__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName])) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].push(optionValue);
            }
            else if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Map || __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Set) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].set(optionKey, optionValue);
            }
            else if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === "object") {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName][optionKey] = optionValue;
            }
            else {
                throw new Exception_1.default("Type is not a collection");
            }
        }
        catch (exc) {
        }
    }
    setValidationData(optionName, optionCB) {
        try {
            if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === null) {
                throw new Exception_1.default("Validation data is not initialized");
            }
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] === "undefined") {
                throw new Exception_1.default("Validation option " + optionName + " do not exists");
            }
            if (typeof optionCB !== "function") {
                throw new Exception_1.default("Callback expected");
            }
            const optionValue = optionCB(__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName]);
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] !== typeof optionValue) {
                throw new Exception_1.default("Validation option type is incorect");
            }
            //@ts-ignore
            __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] = optionValue;
        }
        catch (exc) {
            console.error(exc);
        }
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    cloneEmpty() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, {});
    }
}
exports["default"] = AbstractStructureValidator;
_AbstractStructureValidator_id = new WeakMap(), _AbstractStructureValidator_snapshoots = new WeakMap(), _AbstractStructureValidator_validationData = new WeakMap(), _AbstractStructureValidator_instances = new WeakSet(), _AbstractStructureValidator_clearValidation = function _AbstractStructureValidator_clearValidation() {
    __classPrivateFieldSet(this, _AbstractStructureValidator_validationData, null, "f");
};
AbstractStructureValidator.activeValidators = [];
AbstractStructureValidator.ERROR_MESSAGES = {};


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const PHPArray_1 = __webpack_require__(10);
const validationResult_1 = __webpack_require__(157);
const StructureValidationException_1 = __webpack_require__(160);
const StringableStructureValidator_1 = __webpack_require__(161);
class PHPArrayStructureValidator extends StringableStructureValidator_1.default {
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            PHPArray_1.default.parse(structStr);
        }
        catch (err) {
            console.error(err);
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid PHP Array"));
        }
        return res;
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            PHPArray_1.default.parse(structStr);
        }
        catch (err) {
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid PHP Array"));
        }
        return res;
    }
}
exports["default"] = PHPArrayStructureValidator;


/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const YAML = __webpack_require__(144);
const validationResult_1 = __webpack_require__(157);
const StructureValidationException_1 = __webpack_require__(160);
const StringableStructureValidator_1 = __webpack_require__(161);
class YMLStructureValidator extends StringableStructureValidator_1.default {
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        try {
            YAML.parse(structStr);
        }
        catch (err) {
            res.addExceptions(new StructureValidationException_1.default(this, "Invalid YML"));
        }
        return res;
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        return res;
    }
}
exports["default"] = YMLStructureValidator;


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class StructureDetectionStrategy {
    constructor() {
    }
    byJSONFile() {
    }
}
exports["default"] = StructureDetectionStrategy;


/***/ }),
/* 166 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _StructureDefinitionFactory_createID;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const StructureDefinition_1 = __webpack_require__(167);
class StructureDefinitionFactory {
    static createFromObject(tgObject) {
        const prepValidators = [], prepConverters = {};
        for (const structValidator of tgObject.validators) {
            const val = new structValidator();
            prepValidators.push(val);
        }
        for (const structConverterType in tgObject.converters) {
            const conv = new tgObject.converters[structConverterType]();
            prepConverters[structConverterType] = conv;
        }
        const structDef = new StructureDefinition_1.default({
            uid: __classPrivateFieldGet(this, _a, "m", _StructureDefinitionFactory_createID).call(this),
            id: tgObject.id || "",
            name: tgObject.name || "",
            description: tgObject.description || "",
            languages: tgObject.languages || [],
            languageContexts: tgObject.languageContexts || [],
            converters: prepConverters,
            validators: prepValidators,
            version: tgObject.version || .1,
        });
        return structDef;
    }
}
exports["default"] = StructureDefinitionFactory;
_a = StructureDefinitionFactory, _StructureDefinitionFactory_createID = function _StructureDefinitionFactory_createID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


/***/ }),
/* 167 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StructureDefinition_uid, _StructureDefinition_id, _StructureDefinition_name, _StructureDefinition_languageContexts, _StructureDefinition_languages, _StructureDefinition_validators, _StructureDefinition_converters;
Object.defineProperty(exports, "__esModule", ({ value: true }));
class StructureDefinition {
    constructor(configMeta) {
        _StructureDefinition_uid.set(this, void 0);
        _StructureDefinition_id.set(this, void 0);
        _StructureDefinition_name.set(this, '');
        _StructureDefinition_languageContexts.set(this, []);
        _StructureDefinition_languages.set(this, []);
        _StructureDefinition_validators.set(this, []);
        _StructureDefinition_converters.set(this, {});
        __classPrivateFieldSet(this, _StructureDefinition_uid, configMeta.uid, "f");
        __classPrivateFieldSet(this, _StructureDefinition_id, configMeta.id, "f");
        __classPrivateFieldSet(this, _StructureDefinition_name, configMeta.name, "f");
        __classPrivateFieldSet(this, _StructureDefinition_languageContexts, configMeta.languageContexts || [], "f");
        __classPrivateFieldSet(this, _StructureDefinition_languages, configMeta.languages || [], "f");
        __classPrivateFieldSet(this, _StructureDefinition_validators, configMeta.validators || [], "f");
        __classPrivateFieldSet(this, _StructureDefinition_converters, configMeta.converters || {}, "f");
    }
    get uid() {
        return __classPrivateFieldGet(this, _StructureDefinition_uid, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _StructureDefinition_id, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _StructureDefinition_name, "f");
    }
    get languageContexts() {
        return __classPrivateFieldGet(this, _StructureDefinition_languageContexts, "f");
    }
    get languages() {
        return __classPrivateFieldGet(this, _StructureDefinition_languages, "f");
    }
    get validators() {
        return __classPrivateFieldGet(this, _StructureDefinition_validators, "f");
    }
    get converters() {
        return __classPrivateFieldGet(this, _StructureDefinition_converters, "f");
    }
    setName(name) {
        __classPrivateFieldSet(this, _StructureDefinition_name, name, "f");
    }
}
exports["default"] = StructureDefinition;
_StructureDefinition_uid = new WeakMap(), _StructureDefinition_id = new WeakMap(), _StructureDefinition_name = new WeakMap(), _StructureDefinition_languageContexts = new WeakMap(), _StructureDefinition_languages = new WeakMap(), _StructureDefinition_validators = new WeakMap(), _StructureDefinition_converters = new WeakMap();


/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = [
    // {
    //     id:'text-pair',
    //     label:'$(symbol-type-parameter) Text pair',
    //     description:'Convert structure to text pair structure',
    //     detail:'Text pair is a structure that contains two strings. It is used to store text pairs.',
    // },
    // {
    //     id:'jsObjectDeclaration',
    //     label:'$(symbol-object) JavaScript Object Declaration',
    //     description:'Convert structure to JavaScript Object Declaration',
    //     detail:'JavaScript Object Declaration is a structure that contains a JavaScript object declaration.',
    // },
    // {
    //     id:'php-object-declaration',
    //     label:'PHP Object Declaration',
    // },
    {
        id: 'PHPArray',
        label: '$(notebook-mimetype) PHP Array',
        description: 'Convert structure to PHP array',
        detail: 'PHP array with squere brackets',
        extension: 'php'
    },
    {
        id: 'JSON',
        label: '$(symbol-object) JSON',
        description: 'Convert structure to pretty JSON',
        detail: 'Pretty-printed JSON',
        extension: 'json'
    },
    {
        id: 'JSON',
        label: '$(file-code) Minified JSON',
        description: 'Convert structure to minified JSON',
        detail: 'Minified JSON',
        extension: 'json',
        convertionOptions: {
            space: 0,
            replacer: null
        }
    },
    // {
    //     id:'BSON',
    //     label:'BSON',
    // },
    {
        id: 'YAML',
        label: '$(symbol-constructor) YAML',
        extension: 'yml'
    },
    // {
    //     id:'XML',
    //     label:'XML'
    // },
    // {
    //     id:'SQL',
    //     label:'SQL Bump',
    // },
    // {
    //     id:'html-table',
    //     label:'HTML table',
    // },
    // {
    //     id:'html-table-row',
    //     label:'HTML table (with header)'
    // },
    // {
    //     id:'html-definition-list',
    //     label:'HTML Definition List'
    // },
    // {
    //     id:'typescript-object-declaration',
    //     label:'TypeScript Object Declaration',
    // },
    // {
    //     id:'typescript-interface',
    //     label:'TypeScript Interface',
    // },
    // {
    //     id:'typescript-class',
    //     label:'TypeScript Class',
    // },
    // {
    //     id:'typescript-enum',
    //     label:'TypeScript Enum',
    // }
];


/***/ }),
/* 169 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StructuresDefinitionManager_instances, _StructuresDefinitionManager_preloadedDefinitions, _StructuresDefinitionManager_loadedDefinitions, _StructuresDefinitionManager_exceptions, _StructuresDefinitionManager_config, _StructuresDefinitionManager_validateConfig, _StructuresDefinitionManager_loadDefinitions, _StructuresDefinitionManager_addException;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AbstractStructureConverter_1 = __webpack_require__(7);
const CurrentLangStructureConverter_1 = __webpack_require__(170);
const definitions_1 = __webpack_require__(3);
const StructureDefinitionFactory_1 = __webpack_require__(166);
const Exception_1 = __webpack_require__(6);
const StructureConvertionException_1 = __webpack_require__(5);
class StructuresDefinitionManager {
    constructor(setup) {
        _StructuresDefinitionManager_instances.add(this);
        _StructuresDefinitionManager_preloadedDefinitions.set(this, new Map());
        _StructuresDefinitionManager_loadedDefinitions.set(this, new Map());
        _StructuresDefinitionManager_exceptions.set(this, []);
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_config).call(this, setup);
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_loadDefinitions).call(this, setup);
    }
    get errors() {
        return __classPrivateFieldGet(this, _StructuresDefinitionManager_exceptions, "f");
    }
    get hasErrors() {
        return __classPrivateFieldGet(this, _StructuresDefinitionManager_exceptions, "f").length > 0;
    }
    convertTo(tgValue, fromType, toType) {
        try {
            if (!__classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").has(fromType)) {
                throw new StructureConvertionException_1.default("Type converter " + fromType + " do not exists");
            }
            const tgStruct = __classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").get(fromType), tgConverter = tgStruct?.converters["*"];
            if (typeof tgConverter === "undefined" || tgConverter === null) {
                throw new StructureConvertionException_1.default("Structure " + fromType + " do not have any converters");
            }
            if (!(tgConverter instanceof AbstractStructureConverter_1.default)) {
                throw new StructureConvertionException_1.default("Structure " + fromType + " converter is invaild");
            }
            console.log(toType, fromType, tgConverter);
            if (tgConverter.canConvert(toType)) {
                return (tgConverter.convert(tgValue, toType) || '').toString();
            }
            else {
                const currLangConverter = new CurrentLangStructureConverter_1.default();
                if (!currLangConverter.canConvert(toType)) {
                    throw new StructureConvertionException_1.default("Structure " + fromType + " cannot be converted from native lang to " + toType);
                }
                const currLangResult = tgConverter.convert(tgValue, 'currLang');
                return (currLangConverter.convert(currLangResult, toType) || '').toString();
            }
        }
        catch (err) {
            if (err instanceof StructureConvertionException_1.default) {
                __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_addException).call(this, err);
            }
            return tgValue;
        }
    }
    getDefintionsNames() {
        return Array.from(__classPrivateFieldGet(this, _StructuresDefinitionManager_preloadedDefinitions, "f").keys());
    }
    getDefinition(id) {
        if (__classPrivateFieldGet(this, _StructuresDefinitionManager_preloadedDefinitions, "f").has(id)) {
            return __classPrivateFieldGet(this, _StructuresDefinitionManager_preloadedDefinitions, "f").get(id) || null;
        }
        if (__classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").has(id)) {
            return __classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").get(id) || null;
        }
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_addException).call(this, new Exception_1.default("Structure definition with id : " + id + " not found"));
        return null;
    }
}
exports["default"] = StructuresDefinitionManager;
_StructuresDefinitionManager_preloadedDefinitions = new WeakMap(), _StructuresDefinitionManager_loadedDefinitions = new WeakMap(), _StructuresDefinitionManager_exceptions = new WeakMap(), _StructuresDefinitionManager_instances = new WeakSet(), _StructuresDefinitionManager_config = function _StructuresDefinitionManager_config(setup) {
    const isValid = __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_validateConfig).call(this, setup);
    if (isValid) {
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_loadDefinitions).call(this, setup);
    }
    else {
    }
}, _StructuresDefinitionManager_validateConfig = function _StructuresDefinitionManager_validateConfig(setup) {
    try {
        if (!Array.isArray(setup.allowedStructures)) {
            throw new Exception_1.default("allowedStructures must be an array");
        }
        if (!Array.isArray(setup.disallowedStructures)) {
            throw new Exception_1.default("disallowedStructures must be an array");
        }
        for (const structID in setup.allowedStructures) {
            if (setup.disallowedStructures.indexOf(structID) > -1) {
                throw new Exception_1.default("Disallowed structures ids for example : " + structID + " cannot be also allowed");
            }
        }
        return true;
    }
    catch (exc) {
        //this.#addException(exc);
        return false;
    }
}, _StructuresDefinitionManager_loadDefinitions = function _StructuresDefinitionManager_loadDefinitions(setup) {
    let definitionsToLoad = definitions_1.default.map(def => def.id || '');
    if (Array.isArray(setup.allowedStructures) && setup.allowedStructures.length > 0) {
        definitionsToLoad = definitionsToLoad.map(def => (setup.allowedStructures || []).includes(def) ? def : '');
    }
    for (const definitionInd in definitionsToLoad) {
        if (definitionsToLoad[definitionInd] !== '') {
            const tgDefinition = StructureDefinitionFactory_1.default.createFromObject(definitions_1.default[definitionInd]);
            __classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").set(definitionsToLoad[definitionInd], tgDefinition);
        }
    }
}, _StructuresDefinitionManager_addException = function _StructuresDefinitionManager_addException(exc) {
    __classPrivateFieldGet(this, _StructuresDefinitionManager_exceptions, "f").push(exc);
};


/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const AbstractStructureConverter_1 = __webpack_require__(7);
const YAML = __webpack_require__(144);
const PHPArray_1 = __webpack_require__(10);
const JSObject_1 = __webpack_require__(171);
class CurrentLangStructureConverter extends AbstractStructureConverter_1.default {
    toJSON(obj, options = {}) {
        try {
            options = Object.assign({
                replacer: null,
                space: 2
            }, options);
            const prepJSON = JSON.stringify(obj, options.replacer, options.space);
            return prepJSON;
        }
        catch (jsexc) {
            return "";
        }
    }
    toYAML(obj) {
        try {
            const prepYAML = YAML.stringify(obj, 1, 2);
            return prepYAML;
        }
        catch (jsexc) {
            return "";
        }
    }
    toPHPArray(obj, options = {}) {
        options = Object.assign({
            quoteType: PHPArray_1.default.singleQuote,
            space: 2
        });
        try {
            const prepPHPArray = PHPArray_1.default.stringify(obj, options);
            return prepPHPArray;
        }
        catch (jsexc) {
            return "";
        }
    }
    toJsObjectDeclaration(obj) {
        try {
            const prepJSObjectDeclaration = JSObject_1.default.stringify(obj);
            return prepJSObjectDeclaration;
        }
        catch (jsexc) {
            return "";
        }
    }
    toCurrLang(obj) {
        return obj;
    }
}
exports["default"] = CurrentLangStructureConverter;


/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class JSObject {
    static stringify(obj) {
        return '';
    }
}
exports["default"] = JSObject;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

/**
 * Structure replacer visual studio code extension
 * Copyright (C) 2021 Grano22 (BSD3 License)
 *
 * @package StructureReplacerExtension
 * @author Adrian Błasiak <grano22@outlook.com>
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const StructureDetector_1 = __webpack_require__(2);
const items_1 = __webpack_require__(168);
const StructuresDefinitionManager_1 = __webpack_require__(169);
function activate(context) {
    const extensionSettings = vscode.workspace.getConfiguration('vestibule-bs');
    const structMng = new StructuresDefinitionManager_1.default({
        allowedStructures: [],
        disallowedStructures: []
    });
    const disposableReplaceDataStruct = vscode.commands.registerCommand('data_replacer.replace_data_structure', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var selectedAllRange = editor.document.getText(selection);
        if (selectedAllRange.length <= 0) {
            vscode.window.showInformationMessage('Any text required to detect data structure');
            return;
        }
        const structureDetector = new StructureDetector_1.default(extensionSettings);
        const structureID = structureDetector.detect(selectedAllRange, {
            language: editor.document.languageId
        });
        if (structureID === '') {
            vscode.window.showErrorMessage('Source structure cannot be matched. ' + structureDetector.reason);
            return;
        }
        const allItems = items_1.default;
        vscode.window.showQuickPick(allItems, {
            title: 'Select target structure',
            placeHolder: 'Select a subaction'
        }).then(selectedOutputStruct => {
            const tgStruct = selectedOutputStruct?.id || '';
            if (tgStruct === '') {
                vscode.window.showInformationMessage(`Target structure is invalid`);
                return;
            }
            if (tgStruct === structureID) {
                vscode.window.showInformationMessage(`Structure cannot be converted due is already ${structureID}`);
                return;
            }
            const outputStruct = structMng.convertTo(selectedAllRange, structureID, tgStruct);
            if (structMng.hasErrors) {
                vscode.window.showErrorMessage(`Failed to convert from ${structureID} to ${tgStruct} structure type due to ${structMng.errors.join("\n")}`);
            }
            else {
                editor?.edit(editorBuilder => {
                    editorBuilder.replace(selection, outputStruct);
                });
            }
        });
    });
    const disposableGenerateFileWithDataStruct = vscode.commands.registerCommand('data_replacer.generate_file_data_structure', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var selectedAllRange = editor.document.getText(selection);
        if (selectedAllRange.length <= 0) {
            vscode.window.showInformationMessage('Any text required to detect data structure');
            return;
        }
        const structureDetector = new StructureDetector_1.default(extensionSettings);
        const structureID = structureDetector.detect(selectedAllRange, {
            language: editor.document.languageId
        });
        if (structureID === '') {
            vscode.window.showErrorMessage('Source structure cannot be matched. ' + structureDetector.reason);
            return;
        }
        const allItems = items_1.default;
        vscode.window.showQuickPick(allItems, {
            title: 'Select target structure',
            placeHolder: 'Select a subaction'
        }).then(async (selectedOutputStruct) => {
            const tgStruct = selectedOutputStruct?.id || '';
            if (tgStruct === '') {
                vscode.window.showInformationMessage(`Target structure is invalid`);
                return;
            }
            if (tgStruct === structureID) {
                vscode.window.showInformationMessage(`Structure cannot be converted due is already ${structureID}`);
                return;
            }
            const outputStruct = structMng.convertTo(selectedAllRange, structureID, tgStruct);
            if (structMng.hasErrors) {
                vscode.window.showErrorMessage(`Failed to convert from ${structureID} to ${tgStruct} structure type due to ${structMng.errors.join("\n")}`);
            }
            else {
                const newDocTab = await vscode.workspace.openTextDocument({
                    language: selectedOutputStruct?.extension || 'txt',
                    content: outputStruct
                });
                vscode.window.showTextDocument(newDocTab);
            }
        });
    });
    context.subscriptions.push(disposableReplaceDataStruct);
    context.subscriptions.push(disposableGenerateFileWithDataStruct);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map