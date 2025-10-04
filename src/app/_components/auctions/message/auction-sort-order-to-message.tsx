import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  type AuctionsSortOrder,
  AuctionsSortOrderSchema,
} from "@/core/domains/auction";

export const AuctionSortOrderToMessage: Record<
  AuctionsSortOrder,
  MessageDescriptor
> = {
  [AuctionsSortOrderSchema.enum.asc]: msg`Ascending`,
  [AuctionsSortOrderSchema.enum.desc]: msg`Descending`,
};
