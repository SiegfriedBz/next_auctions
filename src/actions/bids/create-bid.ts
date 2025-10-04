"use server";

import { revalidatePath } from "next/cache";
import type { Bid, CreateBidParams } from "@/core/domains/bid";
import { bids } from "@/core/instances/bids";
import type { LangParam } from "@/i18n";
import type { ServerActionResult } from "../types/server-actions";

export const createBid = async (
  params: CreateBidParams & LangParam,
): Promise<ServerActionResult<Bid>> => {
  const { lang, ...rest } = params;

  try {
    const bid = await bids().create(rest);

    revalidatePath(`/${lang}/auctions`);
    // revalidatePath(`/${lang}/auctions/${bid.id}`);

    return { success: true, data: bid };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
