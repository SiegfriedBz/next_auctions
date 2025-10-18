"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auctions } from "@/core/instances/auctions";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

type Params = {
  auctionId: string;
} & LangParam;

export const createCheckoutSession = async (params: Params): Promise<void> => {
  const { auctionId, lang } = params;

  const [user, auction] = await Promise.all([
    users().me(),
    auctions().detailsById(auctionId),
  ]);

  if (!user) throw new Error("User not found");
  if (!auction) throw new Error("Auction not found");
  if (!auction.highestBid) throw new Error("Auction bid value not found");

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: user?.email,
    line_items: [
      {
        price_data: {
          currency: "usd", // or auction.currency
          product_data: {
            name: `Auction ${auction.title}`,
          },
          unit_amount: auction.highestBid * 100, // in cents
        },
        quantity: 1,
      },
    ],
    success_url: `${NEXT_PUBLIC_APP_URL}/${lang}/auctions/${auctionId}/stripe/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${NEXT_PUBLIC_APP_URL}/${lang}/auctions/${auctionId}/stripe/cancel`,

    metadata: { auctionId: auction.id }, // available in webhook
  });

  const sessionUrl = session.url;
  if (!sessionUrl) {
    throw new Error("sessionUrl was not created");
  }

  redirect(sessionUrl);
};
