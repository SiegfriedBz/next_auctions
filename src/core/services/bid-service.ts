import { AuctionStatusSchema, type ListingReturn } from "../domains/auction";
import type {
  Bid,
  BidsCountParams,
  BidsListingParams,
  CreateBidParams,
} from "../domains/bid";
import type { AuctionRepository } from "../ports/auction-repository";
import type { BidRepository } from "../ports/bid-repository";
import type { UserRepository } from "../ports/user-repository";

export class BidService {
  constructor(
    readonly userRepo: UserRepository,
    readonly bidRepo: BidRepository,
    readonly auctionRepo: AuctionRepository,
  ) {}

  async create(params: CreateBidParams): Promise<Bid> {
    const me = await this.userRepo.me();

    // RLS auth_users_can_insert_bids_on_open_auctions
    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    const auction = await this.auctionRepo.findById(params.auctionId);

    // RLS auth_users_can_insert_bids_on_open_auctions
    if (
      !auction?.id ||
      auction.id !== params.auctionId ||
      auction.status !== AuctionStatusSchema.enum.OPEN
    ) {
      throw new Error("Can only bid on opened auction");
    }

    return await this.bidRepo.create({ ...params, bidderId: me.id });
  }

  async listing(params: BidsListingParams = {}): Promise<ListingReturn<Bid>> {
    const { filterBy = {} } = params;

    const [list, total] = await Promise.all([
      this.bidRepo.list({ filterBy }),
      this.bidRepo.count({ filterBy }),
    ]);

    return { list, total };
  }

  async count(params: BidsCountParams = {}): Promise<number> {
    return await this.bidRepo.count(params);
  }
}
