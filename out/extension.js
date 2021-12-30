"use strict";
/**
 * Structure replacer visual studio code extension
 * Copyright (C) 2021 Grano22 (BSD3 License)
 *
 * @package StructureReplacerExtension
 * @author Adrian Błasiak <grano22@outlook.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const StructureDetector_1 = require("./detector/StructureDetector");
const items_1 = require("./gui/quickPickMenu/items");
const StructuresDefinitionManager_1 = require("./managers/StructuresDefinitionManager");
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
//# sourceMappingURL=extension.js.map