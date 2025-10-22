import { SupabaseAuctionRepository } from "../infra/supabase/supabase-auction-repository";
import { SupabaseUserRepository } from "../infra/supabase/supabase-user-repository";
import { UserService } from "../services/user-service";

export const users = () => {
  const supabaseUserRepo = new SupabaseUserRepository();
  const supabaseAuctionRepo = new SupabaseAuctionRepository();

  return new UserService(supabaseUserRepo, supabaseAuctionRepo);
};
