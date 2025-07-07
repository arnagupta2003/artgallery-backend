import { addNavMenuItem, addNavMenuSection, addActionBarItem} from '@vendure/admin-ui/core';
import { registerDataTableComponent } from '@vendure/admin-ui/core';
import gql from 'graphql-tag';
import html2pdf from 'html2pdf.js';
import { EmptyColumnComponent } from './components/my-admin-ui/my-admin-ui.component';

const ORDER_DETAIL_QUERY = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      code
      orderPlacedAt
      total
      currencyCode
      state
      customer {
        firstName
        lastName
        emailAddress
      }
      shippingAddress {
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        phoneNumber  
      }
      lines {
        quantity
        productVariant {
          id
          name
          sku
        }
        discountedLinePriceWithTax
      }
      payments {
        id
        state
        amount
        method
      }
    }
  }
`;

interface Order {
  id: string;
  code: string;
  orderPlacedAt: string;
  total: number;
  currencyCode: string;
  customer: {
    firstName: string;
    lastName: string;
    emailAddress?: string;
  };
  shippingAddress: {
    fullName: string;
    streetLine1: string;
    streetLine2?: string | null;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    phoneNumber?: string; // <-- Added
  };
  lines: Array<{
    quantity: number;
    productVariant: {
      id: string;
      name: string;
      sku: string;
    };
    discountedLinePriceWithTax: number;
  }>;
  state: string;
  payments?: Array<{
    id: string;
    state: string;
    amount: number;
    method: string;
  }>;
}

interface GetOrderQueryResponse {
  order: Order;
}

interface GetOrderQueryVariables {
  id: string;
}

export default [
  addNavMenuItem(
    {
      id: 'customer-groups',
      label: 'Customer groups',
      routerLink: ['/customer', 'groups'],
      requiresPermission: '__disable__',
    },
    'customers'
  ),

  addNavMenuSection(
    {
      id: 'marketing',
      label: '',
      items: [],
    },
    '__disable__'
  ),


  registerDataTableComponent({
    tableId: 'order-list',
    columnId: 'updated-at',
    component: EmptyColumnComponent,
  }),

  registerDataTableComponent({
    tableId: 'product-list',
    columnId: 'number-of-variants',
    component: EmptyColumnComponent,
  }),
  registerDataTableComponent({
    tableId: 'product-list',
    columnId: 'slug',
    component: EmptyColumnComponent,
  }),

   addNavMenuSection({
     id: 'settings',
       label: '',
       items: [],
    },
     '__disable__'
   ),

   addNavMenuSection({
     id: 'system',
       label: '',
       items: [],
    },
     '__disable__'
   ),

  addActionBarItem({
    id: 'copy-invoice',
    label: 'Copy invoice',
    icon: 'copy',
    locationId: 'order-detail',
    onClick: async (event, context) => {
      try {
        const orderId = context.route.snapshot.params.id;

        // Use query and extract data via queryRef
        const queryResult = context.dataService.query<GetOrderQueryResponse, GetOrderQueryVariables>(
          ORDER_DETAIL_QUERY,
          { id: orderId }
        );

        // Wait for the query result using .toPromise()
        const result = await queryResult.single$.toPromise();

        if (!result?.order) {
          throw new Error('Order not found');
        }

        const order = result.order;
        const template = `
Dear ${order.customer.firstName} ${order.customer.lastName},

Thank you for your order!

Order Details:
- Order Code: ${order.code}
- Order Date: ${order.orderPlacedAt}
- Total Price: ${order.total} ${order.currencyCode}
- Order Status: ${order.state}

Shipping Details:
- Price: ${order.total} ${order.currencyCode}
- Address: 
  ${order.shippingAddress.fullName}
  ${order.shippingAddress.streetLine1}, ${order.shippingAddress.city}
  ${order.shippingAddress.province}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}

Order Items:
${order.lines
    .map(
      (line) =>
        `${line.quantity} x ${line.productVariant.name} (SKU: ${line.productVariant.sku}) - ${line.discountedLinePriceWithTax} ${order.currencyCode}`
    )
    .join('\n')}

Payment Summary:
${order.payments
    ?.map((payment) => `- ${payment.method}: ${payment.amount} (${payment.state})`)
    .join('\n') || 'No payment information available.'}
`;

        // Copy the invoice template to the clipboard
        const textarea = document.createElement('textarea');
        textarea.value = template;
        document.body.appendChild(textarea);
        textarea.select();
        const successfulCopy = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successfulCopy) {
          context.notificationService.success('Invoice copied to clipboard!');
        } else {
          context.notificationService.error('Failed to copy invoice to clipboard.');
        }
      } catch (error) {
        context.notificationService.error('Error copying invoice: ' + error);
      }
    },
  }),

  addActionBarItem({
    id: 'download-invoice',
    label: 'Download invoice',
    icon: 'download',
    locationId: 'order-detail',
    onClick: async (event, context) => {
      try {
        const orderId = context.route.snapshot.params.id;
  
        const queryResult = context.dataService.query<GetOrderQueryResponse, GetOrderQueryVariables>(
          ORDER_DETAIL_QUERY,
          { id: orderId }
        );
  
        const result = await queryResult.single$.toPromise();
        if (!result?.order) {
          throw new Error('Order not found');
        }
  
        const order = result.order;
  
        // Build HTML for the invoice with even more professional styling
        const invoiceHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; max-width: 750px; margin: auto; background: #f4f4f4; border: 1px solid #ddd; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 30px;">
              <h1 style="color: #2c3e50; font-size: 28px; margin-bottom: 10px;">Debangshu Das Art Gallery</h1>
              <p style="color: #7f8c8d; font-size: 12px; margin-bottom: 10px;">
                 B - 104, Deb Art Studio, Bidhan Nagar, Durgapur, West Bengal, 110020 <br>
                <strong>Phone:</strong> +91 43609 32095 
                <strong>Email:</strong> <a href="mailto:debangshuart@gmail.com">debangshuart@gmail.com</a><br>
              </p>

              <p style="color: #2c3e50; font-size: 16px; margin-bottom: 20px;">Order Invoice</p>
              <h2 style="color: #34495e; font-size: 24px; margin-bottom: 5px;">Order #${order.code}</h2>
              
            </div>
            
            <div style="border-bottom: 2px solid #ddd; margin-bottom: 30px;"></div>
  
            <h3 style="color: #2c3e50; font-size: 20px;">Customer Details</h3>
            <p style="color: #555; font-size: 16px;">
              ${order.customer.firstName} ${order.customer.lastName}<br/>
              ${order.customer.emailAddress || ''}<br/>
              ${order.shippingAddress.phoneNumber ? `Phone: ${order.shippingAddress.phoneNumber}` : ''}
            </p>
  
            <h3 style="color: #2c3e50; font-size: 20px;">Shipping Address</h3>
            <p style="color: #555; font-size: 16px;">
              ${order.shippingAddress.fullName || ''}<br/>
              ${order.shippingAddress.streetLine1 || ''}<br/>
              ${order.shippingAddress.city || ''}, ${order.shippingAddress.province || ''} ${order.shippingAddress.postalCode || ''}<br/>
              ${order.shippingAddress.country || ''}
            </p>
  
            <h3 style="color: #2c3e50; font-size: 20px;">Order Items</h3>
            <ul style="color: #555; font-size: 16px; padding-left: 20px; list-style-type: none; margin-bottom: 20px;">
              ${order.lines
                .map(
                  (line) =>
                    `<li style="margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                      ${line.quantity} × ${line.productVariant.name} (SKU: ${line.productVariant.sku}) - 
                      <strong>${line.discountedLinePriceWithTax/100} ${order.currencyCode}</strong>
                    </li>`
                )
                .join('')}
            </ul>
  
            <div style="border-top: 2px solid #ddd; margin-top: 20px; padding-top: 20px;">
              <h3 style="color: #2c3e50; font-size: 20px;">Total Amount</h3>
              <p style="color: #2c3e50; font-size: 18px;">
                <strong>${order.total/100} ${order.currencyCode}</strong>
              </p>
            </div>
  
            <div style="border-top: 2px solid #ddd; margin-top: 20px; padding-top: 20px;">
              <h3 style="color: #2c3e50; font-size: 20px;">Payment Information</h3>
              <ul style="color: #555; font-size: 16px; padding-left: 20px; list-style-type: none; margin-bottom: 20px;">
                ${
                  order.payments?.length
                    ? order.payments
                        .map(
                          (p) =>
                            `<li style="margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                              ${p.method} - ${p.amount} (${p.state})
                            </li>`
                        )
                        .join('')
                    : '<li>No payment information available</li>'
                }
              </ul>
            </div>
  
            <div style="border-top: 2px solid #ddd; margin-top: 30px; text-align: center; padding-top: 20px;">
              <p style="color: #7f8c8d; font-size: 14px;">Thank you for choosing Debangshu Das Art Gallery!</p>
            </div>
          </div>
        `;
  
        // Create invisible element and generate PDF
        const tempElement = document.createElement('div');
        tempElement.innerHTML = invoiceHtml;
        document.body.appendChild(tempElement);
  
        await html2pdf().from(tempElement).save(`invoice-${order.code}.pdf`);
        document.body.removeChild(tempElement);
  
        context.notificationService.success('Invoice downloaded!');
      } catch (error) {
        context.notificationService.error('Error generating invoice: ' + error);
      }
    },
  }),

];
