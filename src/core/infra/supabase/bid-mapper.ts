import z from "zod";
import { type Bid, BidSchema } from "@/core/domains/bid";

export type SupabaseBid = Pick<Bid, "id" | "amount"> & {
  auction_id: string;
  bidder_id: string;
  created_at: string;
  updated_at: string;
};

export const bidMapper = (row: SupabaseBid | null) => {
  if (!row) return null;

  const normalized = normalizeBidData(row);

  const result = BidSchema.safeParse(normalized);
  if (!result.success) {
    console.warn("Invalid bid data", z.treeifyError(result.error));
    return null;
  }

  return result.data;
};

export const normalizeBidData = (row: SupabaseBid) => {
  return {
    id: row.id,
    auctionId: row.auction_id,
    bidderId: row.bidder_id,
    amount: row.amount,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};
