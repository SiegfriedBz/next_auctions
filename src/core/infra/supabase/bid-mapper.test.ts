import type { Bid } from "@/core/domains/bid";
import { bidMapper } from "./bid-mapper";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("bidMapper", () => {
  it("returns null when input is null", () => {
    expect(bidMapper(null)).toBeNull();
  });

  it("maps SupabaseBid fields to Bid correctly", () => {
    const supabaseBid = {
      id: VALID_UUID,
      auction_id: VALID_UUID,
      bidder_id: VALID_UUID,
      amount: 150,
      created_at: "2025-08-01T12:00:00.000Z",
      updated_at: "2025-08-05T12:00:00.000Z",
    };

    const expected: Bid = {
      id: VALID_UUID,
      auctionId: VALID_UUID,
      bidderId: VALID_UUID,
      amount: 150,
      createdAt: new Date("2025-08-01T12:00:00.000Z"),
      updatedAt: new Date("2025-08-05T12:00:00.000Z"),
    };

    expect(bidMapper(supabaseBid)).toEqual(expected);
  });
});
