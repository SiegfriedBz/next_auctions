import z from "zod";
import {
  type Notification,
  NotificationSchema,
} from "@/core/domains/notifications";
import type { SupabaseAuction } from "./auction-mapper";

export type SupabaseNotification = Pick<Notification, "id" | "read"> & {
  recipient_id: string;
  auction_id: string;
  bidder_id: string;
  created_at: string;
  updated_at: string;
  auction: Pick<SupabaseAuction, "id" | "owner_id" | "title" | "images">;
};

export const notificationMapper = (row: SupabaseNotification | null) => {
  if (!row) return null;

  const normalized = normalizeNotificationData(row);

  const result = NotificationSchema.safeParse(normalized);
  if (!result.success) {
    console.warn("Invalid notification data", z.treeifyError(result.error));
    return null;
  }

  return result.data;
};

export const normalizeNotificationData = (row: SupabaseNotification) => {
  return {
    id: row.id,
    recipientId: row.recipient_id,
    auctionId: row.auction_id,
    read: row.read,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    auction: {
      id: row.auction.id,
      title: row.auction.title,
      ownerId: row.auction.owner_id,
      images: row.auction.images ?? [],
    },
  };
};
