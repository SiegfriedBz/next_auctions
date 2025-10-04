import { SupabaseAuctionRepository } from "../infra/supabase/supabase-auction-repository";
import { SupabaseBidRepository } from "../infra/supabase/supabase-bid-repository";
import { SupabaseUserRepository } from "../infra/supabase/supabase-user-repository";
import { BidService } from "../services/bid-service";

export const bids = () => {
  const supabaseUserRepo = new SupabaseUserRepository();
  const supabaseBidRepo = new SupabaseBidRepository();
  const supabaseAuctionRepo = new SupabaseAuctionRepository();

  return new BidService(supabaseUserRepo, supabaseBidRepo, supabaseAuctionRepo);
};
