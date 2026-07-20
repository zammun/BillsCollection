import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async (req: Request) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') return new Response('OK', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });

  try {
    const { lineItems, userId, userEmail, userAddress } = await req.json();

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      customer_email: userEmail || undefined, // Auto-fills their email on the Stripe page
      metadata: { userId: userId },
    };

    // Inject saved profile address directly into the transaction to skip the Stripe form
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
    } else {
      // Fallback: Make Stripe ask for it if they are a guest or missing profile data
      sessionConfig.shipping_address_collection = { allowed_countries: ['US', 'CA', 'GB'] };
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