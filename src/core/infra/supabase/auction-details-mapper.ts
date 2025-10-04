import z from "zod";
import { AuctionDetailsSchema } from "@/core/domains/auction";
import { normalizeAuctionData, type SupabaseAuction } from "./auction-mapper";
import type { SupabaseUser } from "./user-mapper";

type SupabaseAuctionDetails = SupabaseAuction & {
  owner: Pick<
    SupabaseUser,
    "id" | "email" | "first_name" | "last_name" | "avatar_url"
  > | null;
};

export const auctionDetailsMapper = (row: SupabaseAuctionDetails | null) => {
  if (!row) return null;

  const normalized = {
    ...normalizeAuctionData(row),
    owner: row?.owner
      ? {
          id: row?.owner?.id,
          email: row?.owner?.email,
          firstName: row?.owner?.first_name,
          lastName: row?.owner?.last_name,
          avatarUrl: row?.owner?.avatar_url ?? undefined,
        }
      : null,
  };

  const result = AuctionDetailsSchema.safeParse(normalized);
  if (!result.success) {
    console.warn("Invalid auction details data", z.treeifyError(result.error));
    return null;
  }

  return result.data;
};
