import type {
  Bid,
  BidsCountParams,
  CreateBidParams as CreateParams,
} from "../domains/bid";

export type RepoCreateBidParams = CreateParams & { bidderId: string };

export interface BidRepository {
  create(params: RepoCreateBidParams): Promise<Bid>;
  count(params: BidsCountParams): Promise<number>;
}
