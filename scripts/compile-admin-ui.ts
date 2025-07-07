import path from 'path';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';

const { MyAdminUiPlugin } = require('../dist/src/plugins/my-admin-ui/my-admin-ui.plugin.js');
const { WebContentPlugin } = require('../dist/src/plugins/web-content/web-content.plugin.js');

(async () => {
  compileUiExtensions({
    outputPath: path.join(__dirname, '../dist/admin-ui'), // Keep this simple
    extensions: [
      MyAdminUiPlugin.ui,
      WebContentPlugin.ui,
    ],
    devMode: false,
  });
})();
