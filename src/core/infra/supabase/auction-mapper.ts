import z from "zod";
import { type Auction, AuctionSchema } from "@/core/domains/auction";

export type SupabaseAuction = Pick<
  Auction,
  "id" | "title" | "description" | "category" | "status" | "images"
> & {
  owner_id: string;
  highest_bidder_id: string | null;
  starting_price: number;
  highest_bid: number | null;
  started_at: string | null;
  end_at: string | null;
  created_at: string;
  updated_at: string;
  storage_id: string | null;
};

export const auctionMapper = (row: SupabaseAuction | null) => {
  if (!row) return null;

  const normalized = normalizeAuctionData(row);

  const result = AuctionSchema.safeParse(normalized);
  if (!result.success) {
    console.warn("Invalid auction data", z.treeifyError(result.error));
    return null;
  }

  return result.data;
};

export const normalizeAuctionData = (row: SupabaseAuction) => {
  return {
    id: row.id,
    ownerId: row.owner_id,
    title: row.title,
    description: row.description,
    storageId: row.storage_id ?? undefined,
    images: row.images ?? [],
    category: row.category,
    startingPrice: row.starting_price,
    highestBidderId: row.highest_bidder_id ?? undefined,
    highestBid: row.highest_bid ?? undefined,
    status: row.status,
    startedAt: row.started_at ? new Date(row.started_at) : undefined,
    endAt: row.end_at ? new Date(row.end_at) : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};
