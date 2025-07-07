import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { MY_ADMIN_UI_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: MY_ADMIN_UI_PLUGIN_OPTIONS, useFactory: () => MyAdminUiPlugin.options }],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
})
export class MyAdminUiPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<MyAdminUiPlugin> {
        this.options = options;
        return MyAdminUiPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'my-admin-ui-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'my-admin-ui', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}
