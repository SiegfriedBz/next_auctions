import {
  type Auction,
  type AuctionDetails,
  type AuctionsCountParams,
  type AuctionsListingParams,
  ORDER_COLUMN_MAP,
} from "@/core/domains/auction";
import type {
  AuctionRepository,
  RepoCreateAuctionParams,
  RepoUpdateAuctionParams,
} from "@/core/ports/auction-repository";
import { createClient } from "@/utils/supabase/server";
import { auctionDetailsMapper } from "./auction-details-mapper";
import { auctionMapper } from "./auction-mapper";

export class SupabaseAuctionRepository implements AuctionRepository {
  async list(params: AuctionsListingParams): Promise<Auction[]> {
    const { filterBy, orderBy, pagination } = params;

    const client = await createClient();
    let query = client.from("auctions").select();

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      if (!value) continue;

      switch (key) {
        case "title": {
          query = query.ilike("title", `%${value}%`);
          break;
        }
        case "status": {
          query = query.eq("status", value);
          break;
        }
        case "category": {
          query = query.eq("category", value);
          break;
        }
        case "ownerId": {
          query = query.eq("owner_id", value);
          break;
        }
      }
    }

    // orderBy
    if (orderBy) {
      const { key, order } = orderBy;
      const column = ORDER_COLUMN_MAP[key] ?? key;
      query = query.order(column, { ascending: order === "asc" });
    }

    // Pagination
    if (pagination) {
      const { page, size } = pagination;
      const from = page * size;
      const to = from + size - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) {
      console.error("SupabaseAuctionRepository list error", error);
      return [];
    }

    if (!data) return [];

    return data
      .map(auctionMapper)
      .filter((auction): auction is Auction => auction !== null);
  }

  async count(params: AuctionsCountParams): Promise<number> {
    const { filterBy } = params;
    const client = await createClient();

    let query = client
      .from("auctions")
      .select("*", { count: "exact", head: true });

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      if (!value) continue;

      switch (key) {
        case "title": {
          query = query.ilike("title", `%${value}%`);
          break;
        }
        case "status": {
          query = query.eq("status", value);
          break;
        }
        case "category": {
          query = query.eq("category", value);
          break;
        }
        case "ownerId": {
          query = query.eq("owner_id", value);
          break;
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      console.error("SupabaseAuctionRepository count error", error);
      return 0;
    }

    return count ?? 0;
  }

  async findById(id: string): Promise<AuctionDetails | null> {
    const client = await createClient();

    const { data, error } = await client
      .from("auctions")
      .select(`*,
        owner:users_public!auctions_owner_id_fkey(id, first_name, last_name, email, avatar_url),
        highest_bidder:users_public!auctions_highest_bidder_id_fkey(id, first_name, last_name, email, avatar_url)
        `)
      .eq("id", id)
      .single();

    if (error) {
      console.log("SupabaseAuctionRepository findById error", error);
      return null;
    }

    return auctionDetailsMapper(data);
  }

  async create(params: RepoCreateAuctionParams): Promise<Auction> {
    const {
      ownerId,
      title,
      description,
      startingPrice,
      category,
      endAt,
      status,
      images,
      storageId,
    } = params;

    const client = await createClient();

    // Insert into auctions table
    const { data: auction, error } = await client
      .from("auctions")
      .insert({
        owner_id: ownerId,
        starting_price: startingPrice,
        end_at: endAt,
        title,
        description,
        category,
        status,
        images,
        storage_id: storageId,
      })
      .select()
      .single();

    if (error || !auction) {
      throw new Error(`DB insert failed: ${error?.message}`);
    }

    const mapped = auctionMapper(auction);
    if (!mapped) throw new Error("Inserted auction is invalid");

    return mapped;
  }

  async update(params: RepoUpdateAuctionParams): Promise<Auction> {
    const {
      id,
      title,
      description,
      startingPrice,
      category,
      status,
      endAt,
      paidAt,
      images,
      storageId,
    } = params;

    const client = await createClient();

    const { data: auction, error } = await client
      .from("auctions")
      .update({
        starting_price: startingPrice,
        end_at: endAt,
        paid_at: paidAt,
        title,
        description,
        category,
        status,
        images,
        storage_id: storageId,
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error || !auction) {
      throw new Error(`DB update failed: ${error?.message}`);
    }

    const mapped = auctionMapper(auction);
    if (!mapped) throw new Error("Updated auction is invalid");

    return mapped;
  }
}
