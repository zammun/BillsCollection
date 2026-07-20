import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Initialize Supabase with the Service Role Key to bypass RLS safely in the background
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    try {
      // 1. Ask Stripe for the itemized receipt (expanding the product data to get the names and images)
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // 2. Format the payload exactly how your OrdersPage interface expects it
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

      // 3. Save the complete order record to Supabase
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
          total_amount: (session.amount_total || 0) / 100,
          payment_status: 'Paid',
          fulfillment_status: 'Processing',
          stripe_session_id: session.id,
          items: formattedItems
        }]);

      if (orderError) throw orderError;
      console.log(`Order successfully recorded for user: ${userId}`);
      
    } catch (error: any) {
      console.error('Database mutation failed during webhook processing:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};