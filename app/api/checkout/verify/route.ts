import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
  try {
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

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const stripeEmail = session.customer_email;
    const planName = session.metadata?.plan;
    const isPaid = session.payment_status === "paid";
    if (!isPaid || stripeEmail !== user.email || !planName) {
      return NextResponse.json({ success: false, message: "Verification failed" });
    }

    // Get membership ID from Supabase based on plan name
    const { data: membership, error: lookupError } = await supabase
      .from("memberships")
      .select("id")
      .eq("name", planName)
      .single();

    if (lookupError || !membership) {
      return NextResponse.json({ error: "Membership not found" }, { status: 404 });
    }

    // Update the user's membership
    const { error: updateError } = await supabase
      .from("user_memberships")
      .update({
        membership_id: membership.id,
        start_date: new Date().toISOString(),
        payment_status: "paid",
      })
      .eq("user_id", user.id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update membership" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `✅ Payment verified and '${planName}' plan activated.`,
    });
  } catch (err) {
    console.error("Stripe verification error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}