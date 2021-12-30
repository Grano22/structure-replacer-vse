import * as assert from 'assert';
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test if JSON can be converted to YAML', async () => {
		const commandResult = await vscode.commands.executeCommand('data_replacer.replace_data_structure');

	});
});
