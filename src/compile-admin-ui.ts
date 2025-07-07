import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { MyAdminUiPlugin } from './plugins/my-admin-ui/my-admin-ui.plugin';
import { WebContentPlugin } from './plugins/web-content/web-content.plugin';

compileUiExtensions({
    outputPath: path.join(__dirname, '../admin-ui'),
    extensions: [
        MyAdminUiPlugin.ui,
        WebContentPlugin.ui,
    ],
    devMode: false,
    baseHref: '/admin/', // must match route
}).compile?.().then(() => {
    process.exit(0);
});
