"use server";

import type { LoginUserParams, User } from "@/core/domains/user";
import { users } from "@/core/instances/users";

export const login = async (params: LoginUserParams): Promise<User | null> => {
  const user = await users().login(params);

  return user;
};
