"use server";

import { users } from "@/core/instances/users";

export const logout = async (): Promise<void> => {
  return await users().logout();
};
