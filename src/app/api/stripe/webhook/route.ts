import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import Stripe from "stripe";
import { findAuctionById } from "@/actions/auctions/find-auction-by-id";
import { updateAuction } from "@/actions/auctions/update-auction";
import { updateAuctionPaidAt } from "@/actions/auctions/update-auction-paid-at";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return new Response(`Webhook Error: wrong stripe-signature`, {
      status: 400,
    });
  }

  let event: Stripe.Event;
  try {
    if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
      return new Response("Missing Stripe key", { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);

    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const auctionId = session.metadata?.auctionId as string;

      if (!auctionId) {
        throw new Error("Missing auction ID");
      }

      const updatedAuction = await updateAuctionPaidAt({
        id: auctionId,
        paidAt: new Date(),
      });

      if (!updatedAuction.success) {
        throw new Error("Failed to update auction");
      }
    } catch (err) {
      console.error(`Webhook Error: ${(err as Error).message}`);
      return new Response(`Webhook Error: ${(err as Error).message}`, {
        status: 400,
      });
    }
  }

  console.info("Webhook Success");
  return new Response("OK", { status: 200 });
}
