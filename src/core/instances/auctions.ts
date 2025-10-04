import { SupabaseAuctionRepository } from "../infra/supabase/supabase-auction-repository";
import { SupabaseUserRepository } from "../infra/supabase/supabase-user-repository";
import { AuctionService } from "../services/auction-service";

export const auctions = () => {
  const supabaseUserRepo = new SupabaseUserRepository();
  const supabaseAuctionRepo = new SupabaseAuctionRepository();

  return new AuctionService(supabaseUserRepo, supabaseAuctionRepo);
};
