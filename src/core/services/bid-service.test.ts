import type { Auction, AuctionDetails } from "@/core/domains/auction";
import { AuctionStatusSchema } from "@/core/domains/auction";
import type { User } from "@/core/domains/user";
import { UserRoleSchema } from "@/core/domains/user";
import type {
  Bid,
  BidsCountParams,
  BidsListingParams,
  CreateBidParams,
} from "../domains/bid";
import type { AuctionRepository } from "../ports/auction-repository";
import type { BidRepository } from "../ports/bid-repository";
import type { UserRepository } from "../ports/user-repository";
import { BidService } from "./bid-service";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";
const VALID_UUID_2 = "00000000-0000-0000-0000-000000000001";

describe("BidService", () => {
  let userRepo: jest.Mocked<UserRepository>;
  let bidRepo: jest.Mocked<BidRepository>;
  let auctionRepo: jest.Mocked<AuctionRepository>;
  let service: BidService;

  let owner: User;
  let bidder: User;
  let auction: Auction;
  let auctionDetails: AuctionDetails;
  let bid: Bid;

  beforeEach(() => {
    owner = {
      id: VALID_UUID,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      avatarUrl: "https://github.com/shadcn.png",
      role: UserRoleSchema.enum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    bidder = {
      id: VALID_UUID_2,
      firstName: "Bob",
      lastName: "Smart",
      email: "bob@example.com",
      avatarUrl: undefined,
      role: UserRoleSchema.enum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    auction = {
      id: VALID_UUID,
      ownerId: owner.id,
      title: "Test Auction",
      description: "Test description",
      images: [],
      category: "MUSIC",
      startingPrice: 100,
      currentBid: undefined,
      status: AuctionStatusSchema.enum.OPEN,
      startedAt: new Date(),
      endAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    auctionDetails = {
      ...auction,
      owner: {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        avatarUrl: owner.avatarUrl,
      },
    };

    bid = {
      id: VALID_UUID,
      auctionId: auction.id,
      bidderId: bidder.id,
      amount: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepo = {
      me: jest.fn(),
      create: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };

    bidRepo = {
      create: jest.fn(),
      list: jest.fn(),
      count: jest.fn(),
    };

    auctionRepo = {
      list: jest.fn(),
      count: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    service = new BidService(userRepo, bidRepo, auctionRepo);
  });

  describe("create", () => {
    const createParams: CreateBidParams = {
      auctionId: VALID_UUID,
      amount: 100,
    };

    it("creates a bid when user is authenticated and auction is open", async () => {
      userRepo.me.mockResolvedValue(bidder);
      auctionRepo.findById.mockResolvedValue(auctionDetails);
      bidRepo.create.mockResolvedValue(bid);

      const result = await service.create(createParams);

      expect(result).toEqual(bid);
      expect(userRepo.me).toHaveBeenCalled();
      expect(auctionRepo.findById).toHaveBeenCalledWith(createParams.auctionId);
      expect(bidRepo.create).toHaveBeenCalledWith({
        ...createParams,
        bidderId: bidder.id,
      });
    });

    it("throws if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);

      await expect(service.create(createParams)).rejects.toThrow(
        "Only authenticated user allowed",
      );
      expect(auctionRepo.findById).not.toHaveBeenCalled();
      expect(bidRepo.create).not.toHaveBeenCalled();
    });

    it("throws if auction is not open", async () => {
      userRepo.me.mockResolvedValue(bidder);
      auctionRepo.findById.mockResolvedValue({
        ...auctionDetails,
        status: AuctionStatusSchema.enum.CLOSED,
      });

      await expect(service.create(createParams)).rejects.toThrow(
        "Can only bid on opened auction",
      );
      expect(bidRepo.create).not.toHaveBeenCalled();
    });
  });

  describe("listing", () => {
    it("returns list of bids and total count", async () => {
      bidRepo.list.mockResolvedValue([bid]);
      bidRepo.count.mockResolvedValue(1);

      const params: BidsListingParams = { filterBy: { auctionId: VALID_UUID } };
      const result = await service.listing(params);

      expect(result).toEqual({ list: [bid], total: 1 });
      expect(bidRepo.list).toHaveBeenCalledWith({ filterBy: params.filterBy });
      expect(bidRepo.count).toHaveBeenCalledWith({ filterBy: params.filterBy });
    });

    it("returns empty list if no bids", async () => {
      bidRepo.list.mockResolvedValue([]);
      bidRepo.count.mockResolvedValue(0);

      const result = await service.listing();

      expect(result).toEqual({ list: [], total: 0 });
      expect(bidRepo.list).toHaveBeenCalledWith({ filterBy: {} });
      expect(bidRepo.count).toHaveBeenCalledWith({ filterBy: {} });
    });
  });

  describe("count", () => {
    it("returns total bid count from repo", async () => {
      bidRepo.count.mockResolvedValue(5);

      const params: BidsCountParams = { filterBy: { auctionId: VALID_UUID } };
      const result = await service.count(params);

      expect(result).toBe(5);
      expect(bidRepo.count).toHaveBeenCalledWith(params);
    });

    it("returns 0 if repo returns 0", async () => {
      bidRepo.count.mockResolvedValue(0);

      const result = await service.count();
      expect(result).toBe(0);
      expect(bidRepo.count).toHaveBeenCalledWith({});
    });
  });
});
