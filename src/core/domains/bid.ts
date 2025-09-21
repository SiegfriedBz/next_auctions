import type { Auction } from "./auction";
import type { User } from "./user";

export type Bid = {
  id: string;
  auctionId: Auction["id"];
  bidderId: User["id"];
  amount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};
