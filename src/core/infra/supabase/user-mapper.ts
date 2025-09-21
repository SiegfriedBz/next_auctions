import type { User, UserRole } from "@/core/domains/user";

type SupabaseUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export const userMapper = (user: SupabaseUser | null): User | null => {
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    avatarUrl: user.avatar_url,
    role: user.role,
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.updated_at),
  };
};
