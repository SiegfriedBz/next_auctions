jest.mock("@/core/infra/supabase/supabase-user-repository");
jest.mock("@/core/infra/supabase/supabase-auction-repository");
jest.mock("@/core/infra/supabase/supabase-bid-repository");

import { SupabaseAuctionRepository } from "@/core/infra/supabase/supabase-auction-repository";
import { SupabaseBidRepository } from "@/core/infra/supabase/supabase-bid-repository";
import { SupabaseUserRepository } from "@/core/infra/supabase/supabase-user-repository";
import { BidService } from "../services/bid-service";
import { bids } from "./bids";

describe("bids factory", () => {
  let service: BidService;
  beforeEach(() => {
    service = bids();
  });

  it("returns a BidService instance", () => {
    expect(service).toBeInstanceOf(BidService);
  });

  it("injects the correct SupabaseRepositories into BidService", () => {
    // `repo` is private, but we can still check the constructor was called
    expect(SupabaseUserRepository).toHaveBeenCalledTimes(1);
    expect(SupabaseBidRepository).toHaveBeenCalledTimes(1);
    expect(SupabaseAuctionRepository).toHaveBeenCalledTimes(1);

    // Optionally, spy on methods if you expose repo or add tests in integration
  });
});
