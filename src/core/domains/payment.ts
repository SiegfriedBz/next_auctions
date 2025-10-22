import z from "zod";
import { AuctionSchema } from "./auction";

export const PaymentSchema = z.object({
  amount: z.number(),
  paidAt: z.date(),
  auctionId: AuctionSchema.shape.id,
  ownerId: AuctionSchema.shape.ownerId,
  highestBidderId: AuctionSchema.shape.highestBidderId,
});

export type Payment = z.infer<typeof PaymentSchema>;

export const PaymentRangeSchema = z.enum([
  "LAST_WEEK",
  "LAST_MONTH",
  "LAST_YEAR",
  "SINCE_SIGNUP",
]);
export type PaymentRange = z.infer<typeof PaymentRangeSchema>;
