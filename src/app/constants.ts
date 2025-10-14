import {
  type AuctionCategory,
  AuctionCategorySchema,
  type AuctionStatus,
  AuctionStatusSchema,
} from "@/core/domains/auction";
import { AuctionCategoryToMessage } from "./_components/auctions/message/auction-category-to-message";
import { AuctionStatusToMessage } from "./_components/auctions/message/auction-status-to-message";

export const CATEGORY_OPTIONS = Object.keys(AuctionCategorySchema.enum).map(
  (key) => {
    return {
      value: key as AuctionCategory,
      label: AuctionCategoryToMessage[key as AuctionCategory],
    };
  },
);

export const STATUS_OPTIONS = Object.keys(AuctionStatusSchema.enum).map(
  (key) => {
    return {
      value: key as AuctionStatus,
      label: AuctionStatusToMessage[key as AuctionStatus],
    };
  },
);

export const EXCLUDED_STATUSES_ON_CREATE: AuctionStatus[] = [
  AuctionStatusSchema.enum.CLOSED,
];

export const TOMORROW = new Date(Date.now() + 24 * 3600 * 1000);
