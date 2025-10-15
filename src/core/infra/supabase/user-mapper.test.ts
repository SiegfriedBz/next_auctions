import type { User } from "@/core/domains/user";
import { UserRoleSchema } from "@/core/domains/user";
import { userMapper } from "./user-mapper";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("userMapper", () => {
  it("returns null when input is null", () => {
    expect(userMapper(null)).toBeNull();
  });

  it("maps SupabaseUser fields to User correctly", () => {
    const supabaseUser = {
      id: VALID_UUID,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      avatar_url: "https://example.com/avatar.png",
      role: UserRoleSchema.enum.USER,
      created_at: "2025-08-12",
      updated_at: "2025-08-12",
    };

    const expected: User = {
      id: VALID_UUID,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      avatarUrl: "https://example.com/avatar.png",
      role: UserRoleSchema.enum.USER,
      createdAt: new Date("2025-08-12"),
      updatedAt: new Date("2025-08-12"),
    };

    expect(userMapper(supabaseUser)).toEqual(expected);
  });

  it("handles null avatar_url correctly", () => {
    const supabaseUser = {
      id: VALID_UUID,
      first_name: "John",
      last_name: "Smith",
      email: "john@example.com",
      avatar_url: null,
      role: UserRoleSchema.enum.ADMIN,
      created_at: "2025-08-12",
      updated_at: "2025-08-12",
    };

    const expected: User = {
      id: VALID_UUID,
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      avatarUrl: undefined,
      role: UserRoleSchema.enum.ADMIN,
      createdAt: new Date("2025-08-12"),
      updatedAt: new Date("2025-08-12"),
    };

    expect(userMapper(supabaseUser)).toEqual(expected);
  });

  it("returns null if normalized data is invalid", () => {
    const supabaseUser = {
      id: VALID_UUID,
      first_name: "", // invalid: min length 2
      last_name: "Doe",
      email: "invalid-email", // invalid email
      avatar_url: null,
      role: UserRoleSchema.enum.USER,
      created_at: "2025-08-12",
      updated_at: "2025-08-12",
    };

    expect(userMapper(supabaseUser)).toBeNull();
  });
});
