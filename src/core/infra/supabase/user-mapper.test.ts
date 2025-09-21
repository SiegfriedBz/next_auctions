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
      created_at: "2025-08-12",
      updated_at: "2025-08-12",
    };

    const expected: User = {
      id: "123",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      avatarUrl: "https://example.com/avatar.png",
      role: UserRole.USER,
      createdAt: new Date("2025-08-12"),
      updatedAt: new Date("2025-08-12"),
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
      created_at: "2025-08-12",
      updated_at: "2025-08-12",
    };

    const expected: User = {
      id: "456",
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      avatarUrl: undefined,
      role: UserRole.ADMIN,
      createdAt: new Date("2025-08-12"),
      updatedAt: new Date("2025-08-12"),
    };

    expect(userMapper(supabaseUser)).toEqual(expected);
  });
});
