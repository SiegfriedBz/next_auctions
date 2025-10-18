"use server";

import type {
  Auction,
  UpdateAuctionPaidAtParams,
} from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import type { ServerActionResult } from "../types/server-actions";

/** called from stripe webhook */
export const updateAuctionPaidAt = async (
  params: UpdateAuctionPaidAtParams,
): Promise<ServerActionResult<Auction>> => {
  try {
    const auction = await auctions().updatePaidAt(params);
    return { success: true, data: auction };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
