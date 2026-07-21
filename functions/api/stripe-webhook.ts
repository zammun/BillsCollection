import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const onRequestPost = async (context: { request: Request; env: Record<string, string> }) => {
  const { request, env } = context;
  
  const stripe = new Stripe(env.STRIPE_SECRET_KEY || '');
  const supabase = createClient(
    env.VITE_SUPABASE_URL || env.SUPABASE_URL || '',
    env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  const resend = new Resend(env.RESEND_API_KEY || '');

  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') || '';
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'Valued Customer';
    
    // 1. Validate metadata userId
    const rawUserId = session.metadata?.userId;
    const isValidUuid = rawUserId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawUserId);
    let finalUserId = isValidUuid ? rawUserId : null;

    // 2. FALLBACK: If no valid userId in metadata, lookup user in Supabase by email
    if (!finalUserId && customerEmail) {
      try {
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const matchedUser = usersData?.users?.find(
          (u) => u.email?.toLowerCase() === customerEmail.toLowerCase()
        );
        if (matchedUser) {
          finalUserId = matchedUser.id;
        }
      } catch (lookupErr) {
        console.warn('Fallback user lookup by email failed:', lookupErr);
      }
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const formattedItems = lineItems.data.map((item: any) => {
        const product = item.price.product;
        return {
          id: product.id || item.id,
          name: product.name, 
          image: product.images?.[0] || '',
          quantity: item.quantity,
          price: (item.price.unit_amount || 0) / 100,
        };
      });

      const totalAmount = (session.amount_total || 0) / 100;

      // 3. Insert order into Supabase
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: finalUserId,
          customer_email: customerEmail,
          total_amount: totalAmount,
          payment_status: 'Paid',
          fulfillment_status: 'Processing',
          stripe_session_id: session.id,
          items: formattedItems
        }]);

      if (orderError) {
        console.error('Supabase Order Insert Error:', orderError);
        throw orderError;
      }

      // 4. Send Confirmation Email via Resend
      if (customerEmail) {
        const itemListHtml = formattedItems
          .map((item: any) => `
            <tr>
              <td style="padding: 16px 0; border-bottom: 1px solid #e2e0d9;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    ${
                      item.image
                        ? `<td width="64" style="padding-right: 16px; vertical-align: top;">
                            <img src="${item.image}" alt="${item.name}" width="64" height="64" style="border-radius: 8px; object-fit: cover; display: block; background-color: #faf8f5; border: 1px solid #e2e0d9;" />
                          </td>`
                        : ''
                    }
                    <td style="vertical-align: top;">
                      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">${item.name}</p>
                      <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Qty: ${item.quantity}</p>
                    </td>
                    <td align="right" style="vertical-align: top; font-size: 14px; font-weight: 600; color: #0f172a;">
                      $${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `).join('');

        await resend.emails.send({
          from: 'Bills Collection <orders@billscollection.co>',
          to: customerEmail,
          subject: `Order Confirmed - Bills Collection (#${session.id.slice(-8).toUpperCase()})`,
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f3ef; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f3ef; padding: 40px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e0d9; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background-color: #0f172a; padding: 32px 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #faf8f5; letter-spacing: 3px; text-transform: uppercase;">
                BILLS COLLECTION
              </h1>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              
              <!-- Greeting & Status Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #F35C7A; color: #ffffff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">
                      Order Confirmed ✓
                    </span>
                    <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #0f172a;">
                      Thank you for your order, ${customerName}!
                    </h2>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                      We’ve received your order and are preparing it for shipment.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Order Reference ID Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px; background-color: #faf8f5; border-radius: 12px; border: 1px solid #e2e0d9; padding: 16px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 1px;">Order Reference</p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 700; color: #0f172a; font-family: monospace;">#${session.id.slice(-8).toUpperCase()}</p>
                  </td>
                </tr>
              </table>

              <!-- Purchased Items List -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px;">
                ${itemListHtml}
              </table>

              <!-- Order Total Breakdown -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 20px;">
                <tr>
                  <td style="font-size: 16px; font-weight: 700; color: #0f172a; padding-top: 16px; border-top: 2px solid #0f172a;">Total Paid</td>
                  <td align="right" style="font-size: 18px; font-weight: 800; color: #F35C7A; padding-top: 16px; border-top: 2px solid #0f172a;">
                    $${totalAmount.toFixed(2)}
                  </td>
                </tr>
              </table>

              <!-- View Orders Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="https://billscollection.co/track-order" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background-color: #0f172a; color: #ffffff; text-align: center; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 16px 24px; border-radius: 12px;">
                      View Order & Status
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #faf8f5; border-top: 1px solid #e2e0d9; padding: 24px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
              <p style="margin: 0;">Have questions? Reply directly to this email or contact <a href="mailto:support@billscollection.co" style="color: #0f172a; text-decoration: underline;">support@billscollection.co</a></p>
              <p style="margin: 8px 0 0 0;">© ${new Date().getFullYear()} Bills Collection. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        });
      }
      
    } catch (error: any) {
      console.error('Database mutation or email dispatch failed:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};