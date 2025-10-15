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

export const AuctionStatusSchema = z.enum(["DRAFT", "OPEN", "CLOSED"]);
export type AuctionStatus = z.infer<typeof AuctionStatusSchema>;

// Auction
export const AuctionSchema = z.object({
  id: z.uuid(),
  ownerId: z.uuid(),
  highestBidderId: z.uuid().optional(),
  highestBid: z.number().optional(),
  title: z.string(),
  description: z.string(),
  storageId: z.uuid().optional(),
  images: z.array(z.string()).optional(),
  category: AuctionCategorySchema,
  startingPrice: z
    .number()
    .min(1, { message: "Starting price must be greater than 1" }),

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
}).extend({
  highestBidder: UserSchema.omit({
    role: true,
    createdAt: true,
    updatedAt: true,
  }).nullable(),
});

export type AuctionDetails = z.infer<typeof AuctionDetailsSchema>;

export type AuctionsListingParams = {
  filterBy?: Partial<
    Pick<Auction, "title" | "status" | "category" | "ownerId">
  > & { ids?: string[] };
  orderBy?: {
    key: AuctionsSortKey;
    order: AuctionsSortOrder;
  };
  pagination?: {
    page: number;
    size: number;
  };
};

export type ListingReturn<T> = { list: T[]; total: number };

export type AuctionsCountParams = Omit<
  AuctionsListingParams,
  "pagination" | "orderBy"
>;

// create & update params - FE
const BaseAuctionFields = AuctionSchema.pick({
  title: true,
  description: true,
  category: true,
  startingPrice: true,
  storageId: true,
  images: true,
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
});
export type CreateAuctionParams = z.infer<typeof CreateAuctionParamsSchema>;

// update auction - FE params
export const UpdateAuctionStatusSchema = AuctionStatusSchema;
export const UpdateAuctionParamsSchema = BaseAuctionUpdateFields.extend({
  endAt: AuctionSchema.shape.endAt.optional(),
  status: UpdateAuctionStatusSchema,
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
