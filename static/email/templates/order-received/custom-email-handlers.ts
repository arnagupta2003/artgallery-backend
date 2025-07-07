import { OrderStateTransitionEvent } from '@vendure/core';
import {
  EmailEventListener,
  transformOrderLineAssetUrls,
  hydrateShippingLines,
} from '@vendure/email-plugin';

export const adminOrderNotificationHandler = new EmailEventListener('order-received')
  .on(OrderStateTransitionEvent)
  .filter(event => event.toState === 'PaymentAuthorized' || event.toState === 'PaymentSettled')
  .loadData(async ({ event, injector }) => {
    // Transform asset URLs for email rendering
    await transformOrderLineAssetUrls(event.ctx, event.order, injector);
    
    // Hydrate shipping lines
    const shippingLines = await hydrateShippingLines(event.ctx, event.order, injector);

    return { shippingLines };
  })
  .setRecipient(() => 'gaddeyjahnavi@email.com') // Admin's email address
  .setFrom('"DebangshuDas" <no-reply@DebangshuDas.com>') // Sender email address
  .setSubject('New Order Received: {{ order.code }}') // Email subject
  .setTemplateVars(event => ({
    order: event.order,
    shippingLines: event.data.shippingLines,
    shippingAddress: event.order.shippingAddress,
    note: 'You have received a new order that has been either Payment Authorized or Payment Settled.',
  }));
