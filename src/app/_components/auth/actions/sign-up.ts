"use server";

import type { CreateUserParams, User } from "@/core/domains/user";
import { users } from "@/core/instances/users";

export const signUp = async (
  params: CreateUserParams,
): Promise<User | null> => {
  const user = await users().create(params);

  return user;
};
