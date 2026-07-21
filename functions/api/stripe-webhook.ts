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
    
    const rawUserId = session.metadata?.userId;
    const isValidUuid = rawUserId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawUserId);
    const userId = isValidUuid ? rawUserId : null;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const formattedItems = lineItems.data.map((item: any) => {
        const product = item.price.product;
        return {
          id: product.id || item.id,
          name: product.name, 
          image: product.images?.[0] || 'https://via.placeholder.com/150',
          quantity: item.quantity,
          price: (item.price.unit_amount || 0) / 100,
        };
      });

      const customerEmail = session.customer_details?.email;
      const totalAmount = (session.amount_total || 0) / 100;

      // 1. Insert into Supabase
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
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

      // 2. Send Email via Resend
      if (customerEmail) {
        const itemListHtml = formattedItems
          .map((item: any) => `<li>${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}</li>`)
          .join('');

        await resend.emails.send({
          from: 'Bills Collection <orders@billscollection.co>',
          to: customerEmail,
          subject: 'Order Confirmation - Bills Collection',
          html: `
            <h1>Thank you for your order!</h1>
            <p>We've received your payment of <strong>$${totalAmount.toFixed(2)}</strong>.</p>
            <h3>Order Details:</h3>
            <ul>${itemListHtml}</ul>
            <p>If you have any questions, reply to this email!</p>
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