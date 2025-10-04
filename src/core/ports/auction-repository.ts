import type {
  Auction,
  AuctionDetails,
  AuctionsCountParams,
  AuctionsListingParams,
  CreateAuctionParams as CreateParams,
  UpdateAuctionParams as UpdateParams,
} from "../domains/auction";

export type RepoCreateAuctionParams = { ownerId: string } & CreateParams;
export type RepoUpdateAuctionParams = UpdateParams;

export interface AuctionRepository {
  list(params: AuctionsListingParams): Promise<Auction[]>;
  count(params: AuctionsCountParams): Promise<number>;
  findById(id: string): Promise<AuctionDetails | null>;
  create(params: RepoCreateAuctionParams): Promise<Auction>;
  update(params: RepoUpdateAuctionParams): Promise<Auction>;
}
