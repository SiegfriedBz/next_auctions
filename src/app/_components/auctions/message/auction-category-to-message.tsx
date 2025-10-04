import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  type AuctionCategory,
  AuctionCategorySchema,
} from "@/core/domains/auction";

export const AuctionCategoryToMessage: Record<
  AuctionCategory,
  MessageDescriptor
> = {
  [AuctionCategorySchema.enum.ART]: msg`Art`,
  [AuctionCategorySchema.enum.AUTOMOTIVE]: msg`Automotive`,
  [AuctionCategorySchema.enum.COLLECTIBLES]: msg`Collectibles`,
  [AuctionCategorySchema.enum.ELECTRONICS]: msg`Electronics`,
  [AuctionCategorySchema.enum.FASHION]: msg`Fashion`,
  [AuctionCategorySchema.enum.HOME]: msg`Home`,
  [AuctionCategorySchema.enum.MUSIC]: msg`Music`,
  [AuctionCategorySchema.enum.SPORTS]: msg`Sports`,
  [AuctionCategorySchema.enum.TOYS]: msg`Toys`,
};

export const AuctionCategoryClassNames: Record<AuctionCategory, string> = {
  [AuctionCategorySchema.enum.ART]: "bg-blue-500",
  [AuctionCategorySchema.enum.AUTOMOTIVE]: "bg-red-400",
  [AuctionCategorySchema.enum.COLLECTIBLES]: "bg-gray-500",
  [AuctionCategorySchema.enum.ELECTRONICS]: "bg-gray-500",
  [AuctionCategorySchema.enum.FASHION]: "bg-red-400",
  [AuctionCategorySchema.enum.HOME]: "bg-gray-300",
  [AuctionCategorySchema.enum.MUSIC]: "bg-amber-500",
  [AuctionCategorySchema.enum.SPORTS]: "bg-red-400",
  [AuctionCategorySchema.enum.TOYS]: "bg-red-200",
};
