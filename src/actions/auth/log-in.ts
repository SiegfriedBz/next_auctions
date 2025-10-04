"use server";

import type { LoginParams, User } from "@/core/domains/user";
import { users } from "@/core/instances/users";
import type { ServerActionResult } from "../types/server-actions";

export const login = async (
  params: LoginParams,
): Promise<ServerActionResult<User>> => {
  try {
    const user = await users().login(params);
    return { success: true, data: user };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
