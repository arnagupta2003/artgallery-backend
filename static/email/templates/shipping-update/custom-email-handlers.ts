import { OrderStateTransitionEvent } from '@vendure/core';
import { EmailEventListener, transformOrderLineAssetUrls, hydrateShippingLines } from '@vendure/email-plugin';

export const orderShippedEmailHandler = new EmailEventListener('shipping-update')
    .on(OrderStateTransitionEvent)
    .filter(event => event.toState === 'Shipped' && !!event.order.customer)
    .loadData(async ({ event, injector }) => {
        // Transform asset URLs for proper rendering in emails
        transformOrderLineAssetUrls(event.ctx, event.order, injector);
        
        // Hydrate shipping lines with additional details
        const shippingLines = await hydrateShippingLines(event.ctx, event.order, injector);

        return { shippingLines };
    })
    .setRecipient(event => event.order.customer!.emailAddress)
    .setFrom('"Your Store" <no-reply@yourstore.com>')
    .setSubject('Your order #{{ order.code }} has been shipped!')
    .setTemplateVars(event => ({
        order: event.order,
        shippingLines: event.data.shippingLines,
        shippingAddress: event.order.shippingAddress,
        invoiceUrl: `http://localhost:8080/invoice/${event.order.code}`,
        note: 'Your order has been shipped! If you need changes to the address, contact support immediately.'
    }));
