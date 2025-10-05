import z from "zod";

// img
export const ImageSchema = z.object({
  url: z.url(),
  name: z.string().optional(),
  uploadedAt: z.date().optional(),
});

export type AuctionImage = z.infer<typeof ImageSchema>;
