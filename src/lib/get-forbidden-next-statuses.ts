import {
  type Auction,
  type AuctionStatus,
  AuctionStatusSchema,
} from "@/core/domains/auction";

/**
 * Compute which statuses are forbidden as next states
 * for a given auction.
 *
 * There are exactly 3 possible statuses:
 *  - DRAFT
 *  - OPEN
 *  - CLOSED
 *
 * Rules:
 *  - If the auction already has a bid (highestBid != null):
 *      → The auction creator cannot update (blocked by RLS).
 *
 *  - If the auction is already CLOSED:
 *      → It cannot be changed to any other state (LOCKED forever).
 */

type Params = Pick<Auction, "status" | "highestBid">;

export const getForbiddenNextStatuses = (params: Params): AuctionStatus[] => {
  const { status, highestBid } = params;

  const excluded: AuctionStatus[] = [];

  // If there is a bid, all statuses are forbidden (update blocked by RLS)
  if (highestBid != null) {
    excluded.push(
      AuctionStatusSchema.enum.OPEN,
      AuctionStatusSchema.enum.DRAFT,
      AuctionStatusSchema.enum.CLOSED,
    );
  }

  // Once CLOSED, forbid changing to any other status (final state)
  if (status === AuctionStatusSchema.enum.CLOSED) {
    excluded.push(
      AuctionStatusSchema.enum.DRAFT,
      AuctionStatusSchema.enum.OPEN,
    );
  }

  return excluded;
};
