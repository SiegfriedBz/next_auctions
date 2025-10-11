import z from "zod";
import { AuctionSchema } from "./auction";

export const NotificationSchema = z.object({
  id: z.uuid(),
  recipientId: z.uuid(),
  auctionId: z.uuid(),
  read: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  auction: AuctionSchema.pick({
    id: true,
    title: true,
    ownerId: true,
    images: true,
  }),
});
export type Notification = z.infer<typeof NotificationSchema>;

export type NotificationsListingParams = {
  filterBy?: Partial<Pick<Notification, "recipientId" | "read">>;
};

export type NotificationsCountParams = NotificationsListingParams;

// update notification params
export const UpdateNotificationParamsSchema = NotificationSchema.pick({
  id: true,
  read: true,
});
export type UpdateNotificationParams = z.infer<
  typeof UpdateNotificationParamsSchema
>;
