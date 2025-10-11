import type {
  Notification,
  NotificationsCountParams,
  NotificationsListingParams,
  UpdateNotificationParams,
} from "@/core/domains/notifications";
import type { NotificationRepository } from "@/core/ports/notification-repository";
import { createClient } from "@/utils/supabase/server";
import { notificationMapper } from "./notification-mapper";

export class SupabaseNotificationRepository implements NotificationRepository {
  async list(params: NotificationsListingParams): Promise<Notification[]> {
    const { filterBy } = params;

    const client = await createClient();

    let query = client
      .from("notifications")
      .select("*,auction:auctions(id,owner_id,title,images)")
      .order("updated_at", { ascending: false });

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      switch (key) {
        case "recipientId": {
          if (value) {
            query = query.eq("recipient_id", value);
          }
          break;
        }
        case "read": {
          if (value !== undefined && value !== null) {
            query = query.eq("read", value);
          }
          break;
        }
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("SupabaseNotificationRepository list error", error);
      return [];
    }

    if (!data) return [];

    return data
      .map(notificationMapper)
      .filter(
        (notification): notification is Notification => notification !== null,
      );
  }

  async count(params: NotificationsCountParams): Promise<number> {
    const { filterBy } = params;

    const client = await createClient();

    let query = client
      .from("notifications")
      .select("*", { count: "exact", head: true });

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      switch (key) {
        case "recipientId": {
          if (value) {
            query = query.eq("recipient_id", value);
          }
          break;
        }
        case "read": {
          if (value !== undefined && value !== null) {
            query = query.eq("read", value);
          }
          break;
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      console.error("SupabaseNotificationRepository count error", error);
      return 0;
    }

    return count ?? 0;
  }

  async findById(id: string): Promise<Notification | null> {
    const client = await createClient();

    const { data, error } = await client
      .from("notifications")
      .select("*,auction:auctions(id,owner_id,title,images)")
      .eq("id", id)
      .single();

    if (error) {
      console.log("SupabaseNotificationRepository findById error", error);
      return null;
    }

    return notificationMapper(data);
  }

  async update(params: UpdateNotificationParams): Promise<Notification> {
    const { id, read } = params;

    const client = await createClient();

    const { data: notification, error } = await client
      .from("notifications")
      .update({
        read,
      })
      .eq("id", id)
      .select("*,auction:auctions(id,owner_id,title,images)")
      .single();

    if (error || !notification) {
      throw new Error(`DB update failed: ${error?.message}`);
    }

    const mapped = notificationMapper(notification);
    if (!mapped) throw new Error("Updated notification is invalid");

    return mapped;
  }
}
