jest.mock("@/core/infra/supabase/supabase-user-repository");
jest.mock("@/core/infra/supabase/supabase-auction-repository");

import { SupabaseAuctionRepository } from "@/core/infra/supabase/supabase-auction-repository";
import { SupabaseUserRepository } from "@/core/infra/supabase/supabase-user-repository";
import { AuctionService } from "../services/auction-service";
import { auctions } from "./auctions";

describe("auctions factory", () => {
  let service: AuctionService;
  beforeEach(() => {
    service = auctions();
  });

  it("returns a AuctionService instance", () => {
    expect(service).toBeInstanceOf(AuctionService);
  });

  it("injects the correct SupabaseRepositories into UserService", () => {
    // `repo` is private, but we can still check the constructor was called
    expect(SupabaseUserRepository).toHaveBeenCalledTimes(1);
    expect(SupabaseAuctionRepository).toHaveBeenCalledTimes(1);

    // Optionally, spy on methods if you expose repo or add tests in integration
  });
});
