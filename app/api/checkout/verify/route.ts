import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
  try {
    console.log("ON VERIFY");
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    // Supabase auth
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch Stripe session
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify conditions
    const stripeEmail = checkoutSession.customer_email;
    const isPaid = checkoutSession.payment_status === "paid";

    if (isPaid && stripeEmail === user.email) {
      return NextResponse.json({
        success: true,
        message: `Payment successful for ${user.email}`,
      });
    }

    return NextResponse.json({ success: false, message: "Verification failed" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
