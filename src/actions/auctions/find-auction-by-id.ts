"use server";

import type { Auction } from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import type { ServerActionResult } from "../types/server-actions";

type Params = { id: string };

export const findAuctionById = async (
  params: Params,
): Promise<ServerActionResult<Auction>> => {
  try {
    const data = await auctions().detailsById(params.id);

    if (!data) {
      return {
        success: false,
        message: "Auction not found",
      };
    }

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
