"use server";

import type { Notification } from "@/core/domains/notifications";
import { notifications } from "@/core/instances/notifications";
import type { ServerActionResult } from "../types/server-actions";

type Params = { id: string };

export const findNotificationById = async (
  params: Params,
): Promise<ServerActionResult<Notification>> => {
  try {
    const data = await notifications().detailsById(params.id);

    if (!data) {
      return {
        success: false,
        message: "Notification not found",
      };
    }

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
