"use server";

import type { CreateUserParams, User } from "@/core/domains/user";
import { users } from "@/core/instances/users";
import type { ServerActionResult } from "../types/server-actions";

export const signUp = async (
  params: CreateUserParams,
): Promise<ServerActionResult<User>> => {
  try {
    const user = await users().create(params);
    return { success: true, data: user };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
