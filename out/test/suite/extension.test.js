"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// import * as myExtension from '../../extension';
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('Test if JSON can be converted to YAML', async () => {
        const commandResult = await vscode.commands.executeCommand('data_replacer.replace_data_structure');
        console.log(commandResult);
        //assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        //assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });
});
//# sourceMappingURL=extension.test.js.map