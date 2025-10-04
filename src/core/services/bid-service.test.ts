import { type User, UserRoleSchema } from "@/core/domains/user";
import type { Auction } from "../domains/auction";
import type { Bid, CreateBidParams } from "../domains/bid";
import type { AuctionRepository } from "../ports/auction-repository";
import type { BidRepository } from "../ports/bid-repository";
import type { UserRepository } from "../ports/user-repository";
import { BidService } from "./bid-service";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("BidService", () => {
  let userRepo: jest.Mocked<UserRepository>;
  let bidRepo: jest.Mocked<BidRepository>;
  let auctionRepo: jest.Mocked<AuctionRepository>;
  let service: BidService;

  let user: User;
  let auction: Auction;
  let bid: Bid;

  beforeEach(() => {
    user = {
      id: VALID_UUID,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      avatarUrl: undefined,
      role: UserRoleSchema.enum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    auction = {
      id: VALID_UUID,
      ownerId: "owner-id",
      title: "Test Auction",
      description: "Test description",
      images: [],
      category: "MUSIC",
      startingPrice: 100,
      currentBid: undefined,
      status: "OPEN",
      startedAt: undefined,
      endAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    bid = {
      id: VALID_UUID,
      auctionId: auction.id,
      bidderId: user.id,
      amount: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepo = {
      me: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      count: jest.fn(),
    };
    bidRepo = {
      create: jest.fn(),
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
      amount: 120,
    };

    it("creates a bid when user is authenticated and auction is open", async () => {
      userRepo.me.mockResolvedValue(user);
      auctionRepo.findById.mockResolvedValue(auction);
      bidRepo.create.mockResolvedValue(bid);

      const result = await service.create(createParams);

      expect(result).toEqual(bid);
      expect(userRepo.me).toHaveBeenCalled();
      expect(auctionRepo.findById).toHaveBeenCalledWith(VALID_UUID);
      expect(bidRepo.create).toHaveBeenCalledWith({
        ...createParams,
        bidderId: user.id,
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
      userRepo.me.mockResolvedValue(user);
      auctionRepo.findById.mockResolvedValue({ ...auction, status: "DRAFT" });

      await expect(service.create(createParams)).rejects.toThrow(
        "Can only bid on opened auction",
      );
      expect(bidRepo.create).not.toHaveBeenCalled();
    });

    it("throws if auction ID does not match", async () => {
      userRepo.me.mockResolvedValue(user);
      auctionRepo.findById.mockResolvedValue({ ...auction, id: "other-id" });

      await expect(service.create(createParams)).rejects.toThrow(
        "Can only bid on opened auction",
      );
      expect(bidRepo.create).not.toHaveBeenCalled();
    });
  });

  describe("count", () => {
    it("returns bid count", async () => {
      bidRepo.count.mockResolvedValue(5);

      const result = await service.count({ auctionId: VALID_UUID });

      expect(result).toBe(5);
      expect(bidRepo.count).toHaveBeenCalledWith({ auctionId: VALID_UUID });
    });

    it("returns 0 when no bids", async () => {
      bidRepo.count.mockResolvedValue(0);

      const result = await service.count();

      expect(result).toBe(0);
      expect(bidRepo.count).toHaveBeenCalledWith({});
    });
  });
});
