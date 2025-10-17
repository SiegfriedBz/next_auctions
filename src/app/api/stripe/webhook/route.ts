import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  const endpointSecret = STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    return new Response(`Webhook Error: wrong stripe-signature`, {
      status: 400,
    });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO: Mark auction as paid in Supabase + Create Notification AUCTION_PAID
    console.log("✅ Payment confirmed for session:", session.id);
  }

  return new Response("OK", { status: 200 });
}
