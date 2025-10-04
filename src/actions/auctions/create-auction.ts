"use server";

import type { Auction, CreateAuctionParams } from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import type { ServerActionResult } from "../types/server-actions";

export const createAuction = async (
  params: CreateAuctionParams,
): Promise<ServerActionResult<Auction>> => {
  try {
    const auction = await auctions().create(params);
    return { success: true, data: auction };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
