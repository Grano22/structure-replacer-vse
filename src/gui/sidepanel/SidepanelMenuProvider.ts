import { CancellationToken, Uri, Webview, WebviewView, WebviewViewProvider, WebviewViewResolveContext } from 'vscode';
import DataReplacerExtensionFasade from '../../fasades/DataReplacerExtensionFasade';
import { getNonce } from '../../tools/tools';
import { getExtensionURI } from '../../tools/vscodeTools';

export default class SidepanelMenuProivder implements WebviewViewProvider {
    public static readonly viewType = 'dataReplacer.structureView';

    private _view?: WebviewView;

    constructor(
		private readonly _extensionUri: Uri,
		private readonly _accessor: DataReplacerExtensionFasade
	) { }

    public resolveWebviewView(
		webviewView: WebviewView,
		context: WebviewViewResolveContext,
		_token: CancellationToken,
    ) : Thenable<void> | void {
        webviewView.webview.options= {
            enableScripts:true,
            localResourceRoots: [
				this._extensionUri
			]
        };
        webviewView.webview.html = this.#getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'colorSelected':
					{
						//vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
						break;
					}
			}
		});
    }

	#getHtmlForWebview(webview: Webview) {
		const styleResetUri = webview.asWebviewUri(
		  	Uri.joinPath(this._extensionUri, "media", "reset.css")
		);
		const styleVSCodeUri = webview.asWebviewUri(
		  	Uri.joinPath(this._extensionUri, "media", "vscode.css")
		);
	
		const scriptUri = webview.asWebviewUri(
		  	Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.js")
		);
		const styleMainUri = webview.asWebviewUri(
		  	Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
		);

		const toolkitUri = getExtensionURI(webview, this._extensionUri, [
			"node_modules",
			"@vscode",
			"webview-ui-toolkit",
			"dist",
			"toolkit.js",
	]);
	
		// Use a nonce to only allow a specific script to be run.
		const nonce = getNonce();
	
		return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
				webview.cspSource
				}; script-src 'nonce-${nonce}';">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<link href="${styleResetUri}" rel="stylesheet" type="text/css">
					<link href="${styleVSCodeUri}" rel="stylesheet" type="text/css">
					<link href="${styleMainUri}" rel="stylesheet">
					<script type="module" nonce="${nonce}" src="${toolkitUri}"></script>
					<script nonce="${nonce}">
					const tsvscode = acquireVsCodeApi();

					</script>
				</head>
		  		<body>
				  	<vscode-panels>
						<vscode-panel-tab id="tab-1">ABOUT</vscode-panel-tab>
						<vscode-panel-view id="view-1">
							<div class="panel-view-content">
								<h3>Enabled converters</h3>
								<h4>General</h4>
								<ul>
									${this._accessor.getDefintionsNames().map(converter => `<li>${converter}</li>`).join('')}
								</ul>
								<h4>Current language interceptor</h4>
								<ul>
									${this._accessor.getCurrLangConverters().map(converter => `<li>${converter}</li>`).join('')}
								</ul>
							</div>
						</vscode-panel-view>
					</vscode-panels>
				</body>
				</html>`;
	  }
}