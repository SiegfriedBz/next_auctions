"use server";

import { users } from "@/core/instances/users";
import type { ServerActionResult } from "../types/server-actions";

export const logout = async (): Promise<ServerActionResult<void>> => {
  try {
    await users().logout();
    return { success: true, data: undefined };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
