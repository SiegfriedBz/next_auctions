"use server";

import type { Auction, UpdateAuctionParams } from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import type { ServerActionResult } from "../types/server-actions";

export const updateAuction = async (
  params: UpdateAuctionParams,
): Promise<ServerActionResult<Auction>> => {
  try {
    const auction = await auctions().update(params);
    return { success: true, data: auction };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
