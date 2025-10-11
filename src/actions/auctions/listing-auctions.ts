"use server";

import type {
  Auction,
  AuctionsListingParams,
  ListingReturn,
} from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import type { ServerActionResult } from "../types/server-actions";

export const listingAuctions = async (
  params: AuctionsListingParams,
): Promise<ServerActionResult<ListingReturn<Auction>>> => {
  try {
    const data = await auctions().listing(params);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
