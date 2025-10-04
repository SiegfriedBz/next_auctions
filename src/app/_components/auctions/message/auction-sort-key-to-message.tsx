import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  type AuctionsSortKey,
  AuctionsSortKeySchema,
} from "@/core/domains/auction";

export const AuctionSortKeyToMessage: Record<
  AuctionsSortKey,
  MessageDescriptor
> = {
  [AuctionsSortKeySchema.enum.category]: msg`Category`,
  [AuctionsSortKeySchema.enum.status]: msg`Status`,
  [AuctionsSortKeySchema.enum.startingPrice]: msg`Starting Price`,
  [AuctionsSortKeySchema.enum.createdAt]: msg`Created at`,
};
