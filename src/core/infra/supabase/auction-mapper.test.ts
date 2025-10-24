import {
  type Auction,
  AuctionCategorySchema,
  AuctionStatusSchema,
} from "@/core/domains/auction";
import { auctionMapper } from "./auction-mapper";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("auctionMapper", () => {
  it("returns null when input is null", () => {
    expect(auctionMapper(null)).toBeNull();
  });

  it("maps SupabaseAuction fields to Auction correctly", () => {
    const supabaseAuction = {
      id: VALID_UUID,
      owner_id: VALID_UUID,
      title: "Vintage Guitar",
      description: "Classic 70s guitar",
      category: AuctionCategorySchema.enum.MUSIC,
      status: AuctionStatusSchema.enum.OPEN,
      starting_price: 100,
      highest_bidder_id: VALID_UUID,
      highest_bid: 150,
      storage_id: VALID_UUID,
      images: ["https://github.com/shadcn.png"],
      started_at: "2025-08-12T12:00:00.000Z",
      end_at: "2025-08-20T12:00:00.000Z",
      created_at: "2025-08-01T12:00:00.000Z",
      updated_at: "2025-08-05T12:00:00.000Z",
      paid_at: "2025-08-20T12:00:00.000Z",
    };

    const expected: Auction = {
      id: VALID_UUID,
      ownerId: VALID_UUID,
      title: "Vintage Guitar",
      description: "Classic 70s guitar",
      category: AuctionCategorySchema.enum.MUSIC,
      status: AuctionStatusSchema.enum.OPEN,
      startingPrice: 100,
      highestBidderId: VALID_UUID,
      highestBid: 150,
      storageId: VALID_UUID,
      images: ["https://github.com/shadcn.png"],
      startedAt: new Date("2025-08-12T12:00:00.000Z"),
      endAt: new Date("2025-08-20T12:00:00.000Z"),
      createdAt: new Date("2025-08-01T12:00:00.000Z"),
      updatedAt: new Date("2025-08-05T12:00:00.000Z"),
      paidAt: new Date("2025-08-20T12:00:00.000Z"),
    };

    expect(auctionMapper(supabaseAuction)).toEqual(expected);
  });

  it("handles optional fields correctly", () => {
    const supabaseAuction = {
      id: VALID_UUID,
      owner_id: VALID_UUID,
      title: "Vintage Guitar",
      description: "Classic 70s guitar",
      category: AuctionCategorySchema.enum.MUSIC,
      status: AuctionStatusSchema.enum.DRAFT,
      highest_bidder_id: null,
      highest_bid: null,
      starting_price: 100,
      storage_id: null,
      images: [],
      created_at: "2025-08-01T12:00:00.000Z",
      updated_at: "2025-08-05T12:00:00.000Z",
      started_at: null,
      end_at: null,
      paid_at: null,
    };

    const expected: Auction = {
      id: VALID_UUID,
      ownerId: VALID_UUID,
      title: "Vintage Guitar",
      description: "Classic 70s guitar",
      category: AuctionCategorySchema.enum.MUSIC,
      status: AuctionStatusSchema.enum.DRAFT,
      highestBidderId: undefined,
      highestBid: undefined,
      startingPrice: 100,
      storageId: undefined,
      images: [],
      createdAt: new Date("2025-08-01T12:00:00.000Z"),
      updatedAt: new Date("2025-08-05T12:00:00.000Z"),
      startedAt: undefined,
      endAt: undefined,
      paidAt: undefined,
    };

    expect(auctionMapper(supabaseAuction)).toEqual(expected);
  });
});
