import type { User } from "@/core/domains/user";
import { UserRoleSchema } from "@/core/domains/user";
import type {
  Notification,
  NotificationsCountParams,
  NotificationsListingParams,
  UpdateNotificationParams,
} from "../domains/notifications";
import type { NotificationRepository } from "../ports/notification-repository";
import type { UserRepository } from "../ports/user-repository";
import { NotificationService } from "./notification-service";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";
const VALID_UUID_2 = "00000000-0000-0000-0000-000000000001";

describe("NotificationService", () => {
  let userRepo: jest.Mocked<UserRepository>;
  let notificationRepo: jest.Mocked<NotificationRepository>;
  let service: NotificationService;
  let user: User;
  let notification: Notification;

  beforeEach(() => {
    user = {
      id: VALID_UUID,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      avatarUrl: "https://github.com/shadcn.png",
      role: UserRoleSchema.enum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    notification = {
      id: VALID_UUID_2,
      recipientId: user.id,
      auctionId: VALID_UUID,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      auction: {
        id: VALID_UUID,
        ownerId: user.id,
        title: "Test Auction",
        images: ["https://github.com/shadcn.png"],
      },
    };

    userRepo = {
      me: jest.fn(),
      create: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };

    notificationRepo = {
      list: jest.fn(),
      count: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    service = new NotificationService(userRepo, notificationRepo);
  });

  describe("listing", () => {
    it("returns notifications list and total count for authenticated user", async () => {
      userRepo.me.mockResolvedValue(user);
      notificationRepo.list.mockResolvedValue([notification]);
      notificationRepo.count.mockResolvedValue(1);

      const params: NotificationsListingParams = { filterBy: { read: false } };
      const result = await service.listing(params);

      expect(result).toEqual({ list: [notification], total: 1 });
      expect(userRepo.me).toHaveBeenCalled();
      expect(notificationRepo.list).toHaveBeenCalledWith({
        filterBy: { ...params.filterBy, recipientId: user.id },
      });
      expect(notificationRepo.count).toHaveBeenCalledWith({
        filterBy: { ...params.filterBy, recipientId: user.id },
      });
    });

    it("throws if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);
      await expect(service.listing()).rejects.toThrow(
        "Only authenticated user allowed",
      );
    });
  });

  describe("count", () => {
    it("returns total count for authenticated user", async () => {
      userRepo.me.mockResolvedValue(user);
      notificationRepo.count.mockResolvedValue(5);

      const params: NotificationsCountParams = { filterBy: { read: false } };
      const result = await service.count(params);

      expect(result).toBe(5);
      expect(notificationRepo.count).toHaveBeenCalledWith({
        filterBy: { ...params.filterBy, recipientId: user.id },
      });
    });

    it("throws if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);
      await expect(service.count()).rejects.toThrow(
        "Only authenticated user allowed",
      );
    });
  });

  describe("detailsById", () => {
    it("returns notification details for authenticated user", async () => {
      userRepo.me.mockResolvedValue(user);
      notificationRepo.findById.mockResolvedValue(notification);

      const result = await service.detailsById(VALID_UUID_2);

      expect(result).toEqual(notification);
      expect(notificationRepo.findById).toHaveBeenCalledWith(VALID_UUID_2);
    });

    it("throws if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);
      await expect(service.detailsById(VALID_UUID_2)).rejects.toThrow(
        "Only authenticated user allowed",
      );
    });
  });

  describe("update", () => {
    let updateParams: UpdateNotificationParams;

    beforeEach(() => {
      updateParams = {
        id: notification.id,
        read: true,
      };
    });

    it("updates notification when user is recipient", async () => {
      userRepo.me.mockResolvedValue(user);
      notificationRepo.findById.mockResolvedValue(notification);
      notificationRepo.update.mockResolvedValue({
        ...notification,
        ...updateParams,
      });

      const result = await service.update(updateParams);

      expect(result.read).toBe(true);
      expect(notificationRepo.update).toHaveBeenCalledWith(updateParams);
    });

    it("throws if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);
      await expect(service.update(updateParams)).rejects.toThrow(
        "Only authenticated user allowed",
      );
    });

    it("throws if notification not found", async () => {
      userRepo.me.mockResolvedValue(user);
      notificationRepo.findById.mockResolvedValue(null);
      await expect(service.update(updateParams)).rejects.toThrow(
        "Notification not found",
      );
    });

    it("throws if user is not the recipient", async () => {
      userRepo.me.mockResolvedValue({ ...user, id: VALID_UUID_2 }); // different user
      notificationRepo.findById.mockResolvedValue(notification);
      await expect(service.update(updateParams)).rejects.toThrow(
        "Only recipient can update notification",
      );
    });
  });
});
