import { type Payment, PaymentSchema } from "@/core/domains/payment";

export type SupabasePaymentRow = {
  id: string;
  paid_at: string;
  owner_id: string;
  highest_bidder_id: string | null;
  highest_bid: number;
};

/**
 * Maps a Supabase row to a validated Payment object
 */
export const paymentMapper = (
  row: SupabasePaymentRow | null,
): Payment | null => {
  if (!row) return null;

  try {
    return PaymentSchema.parse({
      amount: Number(row.highest_bid),
      auctionId: row.id,
      paidAt: new Date(row.paid_at),
      ownerId: row.owner_id,
      highestBidderId: row.highest_bidder_id ?? undefined,
    });
  } catch (err) {
    console.warn("Invalid payment row", row, err);
    return null;
  }
};
