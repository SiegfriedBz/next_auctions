import type {
  Notification,
  NotificationsCountParams,
  NotificationsListingParams,
  UpdateNotificationParams,
} from "../domains/notifications";

export interface NotificationRepository {
  list(params: NotificationsListingParams): Promise<Notification[]>;
  count(params: NotificationsCountParams): Promise<number>;
  findById(id: string): Promise<Notification | null>;
  update(params: UpdateNotificationParams): Promise<Notification>;
}
