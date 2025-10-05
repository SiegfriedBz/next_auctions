"use server";

import type { UpdateUserParams, User } from "@/core/domains/user";
import { users } from "@/core/instances/users";
import type { ServerActionResult } from "../types/server-actions";

export const updateUser = async (
  params: UpdateUserParams,
): Promise<ServerActionResult<User>> => {
  try {
    const user = await users().update(params);
    return { success: true, data: user };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
