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
 *  - If the auction already has a bid (currentBid != null):
 *      → The auction creator cannot revert it to DRAFT.
 *      → The auction creator cannot manually close it (CLOSED).
 *
 *  - If the auction is already CLOSED:
 *      → It cannot be changed to any other state (LOCKED forever).
 */

type Params = Pick<Auction, "status" | "currentBid">;

export const getForbiddenNextStatuses = (params: Params): AuctionStatus[] => {
  const { status, currentBid } = params;

  const excluded: AuctionStatus[] = [];

  // If there are bids, prevent reverting to DRAFT or manually closing it
  if (currentBid != null) {
    excluded.push(
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
