import { z } from "zod";
import { UserSchema } from "./user";

// enums
export const AuctionCategorySchema = z.enum([
  "ELECTRONICS",
  "FASHION",
  "COLLECTIBLES",
  "ART",
  "MUSIC",
  "SPORTS",
  "HOME",
  "TOYS",
  "AUTOMOTIVE",
]);
export type AuctionCategory = z.infer<typeof AuctionCategorySchema>;

export const AuctionStatusSchema = z.enum([
  "DRAFT",
  "OPEN",
  "CLOSED",
  "CANCELLED",
]);
export type AuctionStatus = z.infer<typeof AuctionStatusSchema>;

// img
export const AuctionImageSchema = z.object({
  url: z.url(),
  name: z.string().optional(),
  uploadedAt: z.date().optional(),
});

export type AuctionImage = z.infer<typeof AuctionImageSchema>;

// Auction
export const AuctionSchema = z.object({
  id: z.uuid(),
  ownerId: z.uuid(),
  title: z.string(),
  description: z.string(),
  images: z.array(AuctionImageSchema),
  category: AuctionCategorySchema,
  startingPrice: z
    .number()
    .min(1, { message: "Starting price must be greater than 1" }),
  currentBid: z.number().optional(),
  status: AuctionStatusSchema,
  startedAt: z.date().optional(),
  endAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Auction = z.infer<typeof AuctionSchema>;

// AuctionDetailsSchema for auction details page
export const AuctionDetailsSchema = AuctionSchema.extend({
  owner: UserSchema.omit({
    role: true,
    createdAt: true,
    updatedAt: true,
  }).nullable(),
});

export type AuctionDetails = z.infer<typeof AuctionDetailsSchema>;

export type AuctionsListingParams = {
  filterBy?: Partial<Pick<Auction, "title" | "status" | "category">>;
  orderBy?: {
    key: AuctionsSortKey;
    order: AuctionsSortOrder;
  };
  pagination?: {
    page: number;
    size: number;
  };
};

export type AuctionsCountParams = Omit<AuctionsListingParams, "pagination">;

// create & update params - FE
const BaseAuctionFields = AuctionSchema.pick({
  title: true,
  description: true,
  category: true,
  startingPrice: true,
});

const BaseAuctionUpdateFields = AuctionSchema.pick({ id: true }).extend(
  BaseAuctionFields.shape,
);

// create auction - FE params
export const CreateAuctionStatusSchema = z.enum([
  AuctionStatusSchema.enum.DRAFT,
  AuctionStatusSchema.enum.OPEN,
]);
export const CreateAuctionParamsSchema = BaseAuctionFields.extend({
  endAt: AuctionSchema.shape.endAt.optional(),
  status: CreateAuctionStatusSchema,
  images: z.array(AuctionImageSchema).optional(),
});
export type CreateAuctionParams = z.infer<typeof CreateAuctionParamsSchema>;

// update auction - FE params
export const UpdateAuctionStatusSchema = AuctionStatusSchema;
export const UpdateAuctionParamsSchema = BaseAuctionUpdateFields.extend({
  endAt: AuctionSchema.shape.endAt.optional(),
  status: UpdateAuctionStatusSchema,
  images: z.array(AuctionImageSchema).optional(),
});
export type UpdateAuctionParams = z.infer<typeof UpdateAuctionParamsSchema>;

// Sorting
export const SORTABLE_KEYS = [
  "category",
  "status",
  "startingPrice",
  "createdAt",
] as const;
export const AuctionsSortKeySchema = z.enum(SORTABLE_KEYS);
export type AuctionsSortKey = z.infer<typeof AuctionsSortKeySchema>;
export const AuctionsSortOrderSchema = z.enum(["asc", "desc"]);
export type AuctionsSortOrder = z.infer<typeof AuctionsSortOrderSchema>;

export const ORDER_COLUMN_MAP: Record<string, string> = {
  createdAt: "created_at",
  startingPrice: "starting_price",
};
