import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  type AuctionStatus,
  AuctionStatusSchema,
} from "@/core/domains/auction";

export const AuctionStatusToMessage: Record<AuctionStatus, MessageDescriptor> =
  {
    [AuctionStatusSchema.enum.CLOSED]: msg`Closed`,
    [AuctionStatusSchema.enum.DRAFT]: msg`Draft`,
    [AuctionStatusSchema.enum.OPEN]: msg`Open`,
  };

export const AuctionStatusClassNames: Record<AuctionStatus, string> = {
  [AuctionStatusSchema.enum.CLOSED]: "bg-amber-600",
  [AuctionStatusSchema.enum.DRAFT]: "bg-yellow-500",
  [AuctionStatusSchema.enum.OPEN]: "bg-blue-500",
};
