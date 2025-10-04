import z from "zod";

export const BidSchema = z.object({
  id: z.uuid(),
  auctionId: z.uuid(),
  bidderId: z.uuid(),
  amount: z.number().min(1, { message: "Bid must be greater than 1" }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Bid = z.infer<typeof BidSchema>;

export type BidsListingParams = {
  filterBy?: Partial<Pick<Bid, "auctionId" | "bidderId" | "amount">>;
  pagination?: {
    page: number;
    size: number;
  };
};

export type BidsCountParams = Omit<BidsListingParams, "pagination">;

// create bid - FE params
export const CreateBidParamsSchema = BidSchema.omit({
  id: true,
  bidderId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateBidParams = z.infer<typeof CreateBidParamsSchema>;
