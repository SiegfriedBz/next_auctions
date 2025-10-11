import type { Notification } from "@/core/domains/notifications";
import {
  normalizeNotificationData,
  notificationMapper,
} from "./notification-mapper";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("notificationMapper", () => {
  it("returns null when input is null", () => {
    expect(notificationMapper(null)).toBeNull();
  });

  it("maps SupabaseNotification fields to Notification correctly", () => {
    const supabaseNotification = {
      id: VALID_UUID,
      recipient_id: VALID_UUID,
      auction_id: VALID_UUID,
      bidder_id: VALID_UUID,
      read: false,
      created_at: "2025-10-11T11:26:42.261Z",
      updated_at: "2025-10-11T12:00:05.990Z",
      auction: {
        id: VALID_UUID,
        owner_id: VALID_UUID,
        title: "Test Auction",
        images: [],
      },
    };

    const expected: Notification = {
      id: VALID_UUID,
      recipientId: VALID_UUID,
      auctionId: VALID_UUID,
      read: false,
      createdAt: new Date("2025-10-11T11:26:42.261Z"),
      updatedAt: new Date("2025-10-11T12:00:05.990Z"),
      auction: {
        id: VALID_UUID,
        ownerId: VALID_UUID,
        title: "Test Auction",
        images: [{ url: "https://github.com/shadcn.png" }], // placeholder as in normalize
      },
    };

    expect(notificationMapper(supabaseNotification)).toEqual(expected);
  });

  it("returns null if required fields are invalid", () => {
    const supabaseNotification = {
      id: VALID_UUID,
      recipient_id: VALID_UUID,
      auction_id: VALID_UUID,
      bidder_id: VALID_UUID,
      read: false,
      created_at: "invalid-date",
      updated_at: "invalid-date",
      auction: {
        id: VALID_UUID,
        owner_id: VALID_UUID,
        title: "Test Auction",
        images: [],
      },
    };

    expect(notificationMapper(supabaseNotification)).toBeNull();
  });

  it("normalizeNotificationData returns expected structure", () => {
    const row = {
      id: VALID_UUID,
      recipient_id: VALID_UUID,
      auction_id: VALID_UUID,
      bidder_id: VALID_UUID,
      read: true,
      created_at: "2025-10-11T11:26:42.261Z",
      updated_at: "2025-10-11T12:00:05.990Z",
      auction: {
        id: VALID_UUID,
        owner_id: VALID_UUID,
        title: "Test Auction",
        images: [],
      },
    };

    const normalized = normalizeNotificationData(row);
    expect(normalized).toEqual({
      id: VALID_UUID,
      recipientId: VALID_UUID,
      auctionId: VALID_UUID,
      read: true,
      createdAt: new Date("2025-10-11T11:26:42.261Z"),
      updatedAt: new Date("2025-10-11T12:00:05.990Z"),
      auction: {
        id: VALID_UUID,
        ownerId: VALID_UUID,
        title: "Test Auction",
        images: [{ url: "https://github.com/shadcn.png" }],
      },
    });
  });
});
