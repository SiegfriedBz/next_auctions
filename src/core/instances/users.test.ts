// Mock the SupabaseUserRepository to avoid real Supabase calls
jest.mock("@/core/infra/supabase/supabase-user-repository");

import { SupabaseUserRepository } from "@/core/infra/supabase/supabase-user-repository";
import { UserService } from "@/core/services/user-service";
import { users } from "./users";

describe("users factory", () => {
  let service: UserService;
  beforeEach(() => {
    service = users();
  });

  it("returns a UserService instance", () => {
    expect(service).toBeInstanceOf(UserService);
  });

  it("injects a SupabaseUserRepository into UserService", () => {
    // `repo` is private, but we can still check the constructor was called
    expect(SupabaseUserRepository).toHaveBeenCalledTimes(1);

    // Optionally, spy on methods if you expose repo or add tests in integration
  });
});
