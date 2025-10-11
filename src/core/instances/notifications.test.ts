jest.mock("@/core/infra/supabase/supabase-user-repository");
jest.mock("@/core/infra/supabase/supabase-notification-repository");

import { SupabaseNotificationRepository } from "@/core/infra/supabase/supabase-notification-repository";
import { SupabaseUserRepository } from "@/core/infra/supabase/supabase-user-repository";
import { NotificationService } from "../services/notification-service";
import { notifications } from "./notifications";

describe("notifications factory", () => {
  let service: NotificationService;
  beforeEach(() => {
    service = notifications();
  });

  it("returns a NotificationService instance", () => {
    expect(service).toBeInstanceOf(NotificationService);
  });

  it("injects the correct SupabaseRepositories into NotificationService", () => {
    // `repo` is private, but we can still check the constructor was called
    expect(SupabaseUserRepository).toHaveBeenCalledTimes(1);
    expect(SupabaseNotificationRepository).toHaveBeenCalledTimes(1);

    // Optionally, spy on methods if you expose repo or add tests in integration
  });
});
