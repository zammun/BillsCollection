import { createClient } from '@supabase/supabase-js';

export const onRequestPost = async (context: { request: Request; env: Record<string, string> }) => {
  const { request, env } = context;

  const supabase = createClient(
    env.VITE_SUPABASE_URL || env.SUPABASE_URL || '',
    env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  try {
    const { orderId, email } = await request.json();

    if (!orderId || !email) {
      return new Response(JSON.stringify({ error: 'Order ID and Email are required.' }), { status: 400 });
    }

    // Query order requiring BOTH order ID/stripe session ID and matching email
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .or(`id.eq.${orderId},stripe_session_id.eq.${orderId}`)
      .ilike('customer_email', email.trim())
      .single();

    if (error || !order) {
      return new Response(JSON.stringify({ error: 'No order found matching those details.' }), { status: 404 });
    }

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};