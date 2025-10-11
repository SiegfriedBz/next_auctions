"use server";

import type {
  Notification,
  UpdateNotificationParams,
} from "@/core/domains/notifications";
import { notifications } from "@/core/instances/notifications";
import type { ServerActionResult } from "../types/server-actions";

export const updateNotification = async (
  params: UpdateNotificationParams,
): Promise<ServerActionResult<Notification>> => {
  try {
    const notification = await notifications().update(params);
    return { success: true, data: notification };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message ?? "Unknown error",
    };
  }
};
