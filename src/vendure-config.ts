// import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';

import { Request, Response, NextFunction } from 'express';

import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import 'dotenv/config';
import path from 'path';
import { MyAdminUiPlugin } from './plugins/my-admin-ui/my-admin-ui.plugin';
import { WebContentPlugin } from './plugins/web-content/web-content.plugin';
import { LanguageCode } from '@vendure/common/lib/generated-types';
import { adminOrderNotificationHandler } from '../static/email/templates/order-received/custom-email-handlers';
import express from 'express';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +process.env.PORT || 3000;

export const config: VendureConfig = {
   apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        cors: {
            origin: ['https://artgallery-six.vercel.app' , 'https://www.debangshudasart.com'],
            credentials: true,
        },
            middleware: [
        {
            handler: (req: Request, res: Response, next: NextFunction) => {
            req.app.set('trust proxy', true);
            next();
            },
            route: '/',
        },
        ],
        ...(IS_DEV ? {
            adminApiPlayground: {
            settings: { 'request.credentials': 'include' },
            },
            adminApiDebug: true,
            shopApiPlayground: {
            settings: { 'request.credentials': 'include' },
            },
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
            secret: process.env.COOKIE_SECRET,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
        },
    },

    dbConnectionOptions: {
        type: 'postgres',
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: process.env.DB_NAME,
        schema: process.env.DB_SCHEMA,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {
        Product: [
            {
                name: 'shortDescription',
                type: 'string',
                label: [{ languageCode: LanguageCode.en, value: 'Description' }],
                ui: { component: 'textarea-form-input' },
                public: true,
            },
            {
                name: 'size',
                type: 'string',
                label: [{ languageCode: LanguageCode.en, value: 'Size of the Painting' }],
                public: true,
            },
            {
                name: 'medium',
                type: 'string',
                label: [{ languageCode: LanguageCode.en, value: 'Medium' }],
                description: [{ languageCode: LanguageCode.en, value: 'e.g. Oil on Canvas' }],
                public: true,
            },
            {
                name: 'availableIn',
                type: 'string',
                label: [{ languageCode: LanguageCode.en, value: 'Available In' }],
                description: [{ languageCode: LanguageCode.en, value: 'Paper / Canvas / Cloth' }],
                public: true,
            },
            {
                name: 'courierCostIndia',
                type: 'float',
                label: [{ languageCode: LanguageCode.en, value: 'Courier Cost (India)' }],
                public: true,
            },
            {
                name: 'courierCostOutsideIndia',
                type: 'float',
                label: [{ languageCode: LanguageCode.en, value: 'Courier Cost (Outside India)' }],
                public: true,
            },
            {
                name: 'year',
                type: 'string',
                label: [{ languageCode: LanguageCode.en, value: 'Year' }],
                public: true,
            },
        ],
    },
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: process.env.ASSET_UPLOAD_DIR || path.join(__dirname, '../static/assets'),
            assetUrlPrefix: IS_DEV ? undefined : 'https://your-domain.com/assets/', // ✅ Replace if needed
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: [...defaultEmailHandlers, adminOrderNotificationHandler],
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                fromAddress: '"Your Store" <no-reply@yourstore.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
            },
        }),

        // AdminUiPlugin.init({
        //     route: 'admin',
        //     port: serverPort + 2,
        //     adminUiConfig: {
        //         apiPort: serverPort,
        //     },
        //     app: compileUiExtensions({
        //         outputPath: path.join(__dirname, '../admin-ui'),
        //         extensions: [
        //             MyAdminUiPlugin.ui,
        //             WebContentPlugin.ui,
        //         ],
        //         devMode: false,
        //     }),
        // }),

        AdminUiPlugin.init({
            route: 'admin',
            port: serverPort + 2,
            app: {
                path: path.join(__dirname, 'admin-ui/dist/browser'),
            },
        }),
        MyAdminUiPlugin.init({}),
        WebContentPlugin.init({}),
    ],
};
