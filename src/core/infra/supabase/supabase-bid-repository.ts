import type {
  Bid,
  BidsCountParams,
  BidsListingParams,
} from "@/core/domains/bid";
import type {
  BidRepository,
  RepoCreateBidParams,
} from "@/core/ports/bid-repository";
import { createClient } from "@/utils/supabase/server";
import { bidMapper } from "./bid-mapper";

export class SupabaseBidRepository implements BidRepository {
  async create(params: RepoCreateBidParams): Promise<Bid> {
    const { auctionId, amount, bidderId } = params;

    const client = await createClient();

    // Insert into bids table
    const { data: bid, error } = await client
      .from("bids")
      .insert({
        auction_id: auctionId,
        bidder_id: bidderId,
        amount,
      })
      .select()
      .single();

    if (error || !bid) {
      throw new Error(`DB insert failed: ${error?.message}`);
    }

    const mapped = bidMapper(bid);
    if (!mapped) throw new Error("Inserted bid is invalid");

    return mapped;
  }

  async list(params: BidsListingParams): Promise<Bid[]> {
    const { filterBy } = params;

    const client = await createClient();
    let query = client.from("bids").select();

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      if (!value) continue;

      switch (key) {
        case "auctionId": {
          query = query.eq("auction_id", value);
          break;
        }
        case "bidderId": {
          query = query.eq("bidder_id", value);
          break;
        }
        case "amount": {
          query = query.eq("amount", value);
          break;
        }
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("SupabaseBidRepository list error", error);
      return [];
    }

    if (!data) return [];

    return data.map(bidMapper).filter((bid): bid is Bid => bid !== null);
  }

  async count(params: BidsCountParams): Promise<number> {
    const { filterBy } = params;
    const client = await createClient();

    let query = client.from("bids").select("*", { count: "exact", head: true });

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      if (!value) continue;

      switch (key) {
        case "auctionId": {
          query = query.eq("auction_id", value);
          break;
        }

        case "bidderId": {
          query = query.eq("bidder_id", value);
          break;
        }

        case "amount": {
          query = query.eq("amount", value);
          break;
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      console.error("SupabaseBidRepository count error", error);
      return 0;
    }

    return count ?? 0;
  }
}
