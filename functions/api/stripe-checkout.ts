import Stripe from 'stripe';

export const onRequestPost = async (context: { request: Request; env: Record<string, string> }) => {
  const { request, env } = context;
  const stripe = new Stripe(env.STRIPE_SECRET_KEY || '');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  try {
    const { lineItems, userId, userEmail, userAddress } = await request.json();

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${env.VITE_SITE_URL || env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${env.VITE_SITE_URL || env.NEXT_PUBLIC_SITE_URL}/cart`,
      customer_email: userEmail || undefined,
      metadata: { userId: userId },

      // 1. DYNAMIC TAX CALCULATION
      automatic_tax: { enabled: true },

      // 2. DASHBOARD SHIPPING RATES
      shipping_options: [
        { shipping_rate: 'shr_1Tvh0DQqpuEMN1BgSn5I8L2a' },
        { shipping_rate: 'shr_1TvgzSQqpuEMN1BgCiL0hQrC' },
      ],

      // 3. ADDRESS COLLECTION FOR TAX & SHIPPING
      shipping_address_collection: { 
        allowed_countries: ['US', 'CA', 'GB'] 
      },
    };

    if (userAddress) {
      sessionConfig.payment_intent_data = {
        shipping: {
          name: userAddress.name,
          address: {
            line1: userAddress.streetAddress,
            city: userAddress.city,
            state: userAddress.stateCode,
            postal_code: userAddress.zipCode,
            country: 'US', 
          },
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestOptions = async () => {
  return new Response('OK', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
};