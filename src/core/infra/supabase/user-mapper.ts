import z from "zod";
import { type User, UserSchema } from "@/core/domains/user";

export type SupabaseUser = Pick<User, "id" | "email" | "role"> & {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export const userMapper = (row: SupabaseUser | null): User | null => {
  if (!row) return null;

  const normalized = {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    avatarUrl: row.avatar_url ?? undefined,
    role: row.role,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };

  const result = UserSchema.safeParse(normalized);
  if (!result.success) {
    console.warn("Invalid user data", z.treeifyError(result.error));
    return null;
  }

  return result.data;
};
