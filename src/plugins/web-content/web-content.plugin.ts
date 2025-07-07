import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

import { contentAdminApiExtensions } from './api/api-extensions';
import { ContentAdminResolver } from './api/content-admin.resolver';
import { WEB_CONTENT_PLUGIN_OPTIONS } from './constants';
import { Content } from './entities/content.entity';
import { ContentService } from './services/content.service';
import { PluginInitOptions } from './types';
import { shopApiExtensions } from './api/shop-api.extensions';
import { ContentShopResolver } from './api/content-shop.resolver';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        { provide: WEB_CONTENT_PLUGIN_OPTIONS, useFactory: () => WebContentPlugin.options },
        ContentService,
    ],
    configuration: config => {
        // Add plugin-specific configurations here
        return config;
    },
    compatibility: '^3.0.0',
    entities: [Content],
    adminApiExtensions: {
        schema: contentAdminApiExtensions,
        resolvers: [ContentAdminResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [ContentShopResolver],
    },
})
export class WebContentPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<WebContentPlugin> {
        this.options = options;
        return WebContentPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'web-content-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'web-content', filePath: 'routes.ts' }],
        providers: ['providers.ts'], // Optional, ensure it exists
    };
}
