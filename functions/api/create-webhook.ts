import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const onRequestPost = async (context: { request: Request; env: Record<string, string> }) => {
  const { request, env } = context;

  const stripe = new Stripe(env.STRIPE_SECRET_KEY || '');
  const supabase = createClient(
    env.VITE_SUPABASE_URL || env.SUPABASE_URL || '',
    env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') || '';
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET || '';

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
      
    } catch (error: any) {
      console.error('Database mutation failed during webhook processing:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};