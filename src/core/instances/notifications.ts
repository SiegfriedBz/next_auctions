import { SupabaseNotificationRepository } from "../infra/supabase/supabase-notification-repository";
import { SupabaseUserRepository } from "../infra/supabase/supabase-user-repository";
import { NotificationService } from "../services/notification-service";

export const notifications = () => {
  const supabaseUserRepo = new SupabaseUserRepository();
  const supabaseNotificationRepo = new SupabaseNotificationRepository();

  return new NotificationService(supabaseUserRepo, supabaseNotificationRepo);
};
