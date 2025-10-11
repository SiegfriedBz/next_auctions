import type {
  Bid,
  BidsCountParams,
  BidsListingParams,
  CreateBidParams as CreateParams,
} from "../domains/bid";

export type RepoCreateBidParams = CreateParams & { bidderId: string };

export interface BidRepository {
  create(params: RepoCreateBidParams): Promise<Bid>;
  list(params: BidsListingParams): Promise<Bid[]>;
  count(params: BidsCountParams): Promise<number>;
}
