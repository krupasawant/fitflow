import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
  
  const supabase = createServerSupabaseClient();

  // Get logged-in user details
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { priceId, plan } = await req.json();

  if (!priceId || !plan) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }


  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
     metadata: { user_id: user.id ,
      plan: plan, 

     }, 
  });

  return NextResponse.json({ url: session.url });
}
