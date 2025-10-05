import z from "zod";
import { type Auction, AuctionSchema } from "@/core/domains/auction";
import type { AuctionImage } from "@/core/domains/image";

export type SupabaseAuctionImage = Pick<AuctionImage, "url" | "name"> & {
  uploaded_at?: string;
};

export type SupabaseAuction = Pick<
  Auction,
  "id" | "title" | "description" | "category" | "status"
> & {
  owner_id: string;
  images: SupabaseAuctionImage[];
  starting_price: number;
  current_bid?: number;
  started_at?: string;
  end_at?: string;
  created_at: string;
  updated_at: string;
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
  // TODO FIX
  // const normalizedImages: AuctionImage[] = row.images?.map((img) => ({
  //   url: img.url,
  //   name: img.name ?? undefined,
  //   uploadedAt: img.uploaded_at ? new Date(img.uploaded_at) : undefined,
  // }));

  return {
    id: row.id,
    ownerId: row.owner_id,
    title: row.title,
    description: row.description,
    images: [{ url: "https://github.com/shadcn.png" }],
    category: row.category,
    startingPrice: row.starting_price,
    currentBid: row.current_bid ?? undefined,
    status: row.status,
    startedAt: row.started_at ? new Date(row.started_at) : undefined,
    endAt: row.end_at ? new Date(row.end_at) : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};
