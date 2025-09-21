import type { User } from "@/core/domains/user";
import { UserRole } from "@/core/domains/user";
import { userMapper } from "./user-mapper";

describe("userMapper", () => {
  it("returns null when input is null", () => {
    expect(userMapper(null)).toBeNull();
  });

  it("maps SupabaseUser fields to User correctly", () => {
    const supabaseUser = {
      id: "123",
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      avatar_url: "https://example.com/avatar.png",
      role: UserRole.USER,
    };

    const expected: User = {
      id: "123",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      avatarUrl: "https://example.com/avatar.png",
      role: UserRole.USER,
    };

    expect(userMapper(supabaseUser)).toEqual(expected);
  });

  it("handles optional avatar_url correctly (undefined)", () => {
    const supabaseUser = {
      id: "456",
      first_name: "John",
      last_name: "Smith",
      email: "john@example.com",
      role: UserRole.ADMIN,
    };

    const expected: User = {
      id: "456",
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      avatarUrl: undefined,
      role: UserRole.ADMIN,
    };

    expect(userMapper(supabaseUser)).toEqual(expected);
  });
});
