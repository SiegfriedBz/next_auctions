import { SupabaseUserRepository } from "../infra/supabase/supabase-user-repository";
import { UserService } from "../services/user-service";

export const users = () => {
  const supabaseUserRepo = new SupabaseUserRepository();

  return new UserService(supabaseUserRepo);
};
