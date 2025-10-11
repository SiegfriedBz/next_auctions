import type { ListingReturn } from "../domains/auction";
import type {
  Notification,
  NotificationsCountParams,
  NotificationsListingParams,
  UpdateNotificationParams,
} from "../domains/notifications";
import type { NotificationRepository } from "../ports/notification-repository";
import type { UserRepository } from "../ports/user-repository";

export class NotificationService {
  constructor(
    readonly userRepo: UserRepository,
    readonly notificationRepo: NotificationRepository,
  ) {}

  async listing(
    params: NotificationsListingParams = {},
  ): Promise<ListingReturn<Notification>> {
    const me = await this.userRepo.me();
    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    const filterBy = {
      ...params.filterBy,
      recipientId: me.id,
    };

    const [list, total] = await Promise.all([
      this.notificationRepo.list({ filterBy }),
      this.notificationRepo.count({ filterBy }),
    ]);

    return { list, total };
  }

  async count(params: NotificationsCountParams = {}): Promise<number> {
    const me = await this.userRepo.me();
    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    const filterBy = {
      ...params.filterBy,
      recipientId: me.id,
    };

    return await this.notificationRepo.count({ filterBy });
  }

  async detailsById(id: string): Promise<Notification | null> {
    const me = await this.userRepo.me();
    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    return await this.notificationRepo.findById(id);
  }

  async update(params: UpdateNotificationParams): Promise<Notification> {
    const [me, notification] = await Promise.all([
      this.userRepo.me(),
      this.notificationRepo.findById(params.id),
    ]);

    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (me.id !== notification.recipientId) {
      throw new Error("Only recipient can update notification");
    }

    return await this.notificationRepo.update(params);
  }
}
