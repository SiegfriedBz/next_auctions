import {
  type Auction,
  type AuctionStatus,
  AuctionStatusSchema,
} from "@/core/domains/auction";

/**
 * Returns an array of statuses to which an auction can not be updated to,
 * given an auction current status and current bid
 */

type Params = Pick<Auction, "status" | "currentBid">;

export const getForbiddenNextStatuses = (params: Params): AuctionStatus[] => {
  const { status, currentBid } = params;

  const excluded: AuctionStatus[] = [];

  // An auction with bids cannot go back to draft and cannot be cancelled
  if (currentBid != null) {
    excluded.push(
      AuctionStatusSchema.enum.DRAFT,
      AuctionStatusSchema.enum.CANCELLED,
    );
  }

  // Only draft or open auctions can be closed
  if (
    status !== AuctionStatusSchema.enum.DRAFT &&
    status !== AuctionStatusSchema.enum.OPEN
  ) {
    excluded.push(AuctionStatusSchema.enum.CLOSED);
  }

  // Only draft auctions can be opened
  if (
    status !== AuctionStatusSchema.enum.DRAFT &&
    status !== AuctionStatusSchema.enum.OPEN
  ) {
    excluded.push(AuctionStatusSchema.enum.OPEN);
  }

  return excluded;
};
