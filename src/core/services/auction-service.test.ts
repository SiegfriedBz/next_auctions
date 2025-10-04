import { type User, UserRoleSchema } from "@/core/domains/user";
import type { UserRepository } from "@/core/ports/user-repository";
import {
  type Auction,
  AuctionCategorySchema,
  type AuctionDetails,
  AuctionsSortKeySchema,
  AuctionsSortOrderSchema,
  type CreateAuctionParams,
  type UpdateAuctionParams,
} from "../domains/auction";
import type { AuctionRepository } from "../ports/auction-repository";
import { AuctionService } from "./auction-service";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("AuctionService", () => {
  let userRepo: jest.Mocked<UserRepository>;
  let auctionRepo: jest.Mocked<AuctionRepository>;
  let service: AuctionService;
  let user: User;
  let auction: Auction;
  let auctionDetails: AuctionDetails;

  beforeEach(() => {
    user = {
      id: VALID_UUID,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      avatarUrl: "https://github.com/shadcn.png",
      role: UserRoleSchema.enum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    auction = {
      id: VALID_UUID,
      ownerId: user.id,
      title: "Test Auction",
      description: "Test description",
      images: [{ url: "https://github.com/shadcn.png" }],
      category: "MUSIC",
      startingPrice: 100,
      currentBid: undefined,
      status: "DRAFT",
      startedAt: undefined,
      endAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    auctionDetails = {
      ...auction,
      owner: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };

    userRepo = {
      me: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      count: jest.fn(),
    };
    auctionRepo = {
      list: jest.fn(),
      count: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    service = new AuctionService(userRepo, auctionRepo);
  });

  describe("listing", () => {
    it("returns list of auctions and total count", async () => {
      auctionRepo.list.mockResolvedValue([auction]);
      auctionRepo.count.mockResolvedValue(1);

      const result = await service.listing();

      expect(result).toEqual({ list: [auction], total: 1 });
      expect(auctionRepo.list).toHaveBeenCalled();
      expect(auctionRepo.count).toHaveBeenCalled();
    });

    it("passes filters, order, pagination to repo", async () => {
      auctionRepo.list.mockResolvedValue([auction]);
      auctionRepo.count.mockResolvedValue(1);

      const params = {
        filterBy: { category: AuctionCategorySchema.enum.MUSIC },
        orderBy: {
          key: AuctionsSortKeySchema.enum.category,
          order: AuctionsSortOrderSchema.enum.desc,
        },
        pagination: { page: 1, size: 2 },
      };

      await service.listing(params);

      expect(auctionRepo.list).toHaveBeenCalledWith(params);
      expect(auctionRepo.count).toHaveBeenCalledWith({
        filterBy: params.filterBy,
      });
    });
  });

  describe("detailsById", () => {
    it("returns auction details when user is authenticated", async () => {
      userRepo.me.mockResolvedValue(user);
      auctionRepo.findById.mockResolvedValue(auctionDetails);

      const result = await service.detailsById(VALID_UUID);

      expect(result).toEqual(auctionDetails);
      expect(userRepo.me).toHaveBeenCalled();
      expect(auctionRepo.findById).toHaveBeenCalledWith(VALID_UUID);
    });

    it("throws error if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);

      await expect(service.detailsById(VALID_UUID)).rejects.toThrow(
        "Only authenticated user allowed",
      );
      expect(auctionRepo.findById).not.toHaveBeenCalled();
    });

    it("returns null if auction not found", async () => {
      userRepo.me.mockResolvedValue(user);
      auctionRepo.findById.mockResolvedValue(null);

      const result = await service.detailsById(VALID_UUID);

      expect(result).toBeNull();
    });

    it("handles auction details with missing owner fields", async () => {
      userRepo.me.mockResolvedValue(user);

      const partialOwnerAuction: AuctionDetails = {
        ...auction,
        owner: {
          id: user.id,
          firstName: undefined as unknown as string,
          lastName: undefined as unknown as string,
          email: undefined as unknown as string,
          avatarUrl: undefined,
        },
      };

      auctionRepo.findById.mockResolvedValue(partialOwnerAuction);

      const result = await service.detailsById(VALID_UUID);

      expect(result).toEqual(partialOwnerAuction);
      expect(userRepo.me).toHaveBeenCalled();
      expect(auctionRepo.findById).toHaveBeenCalledWith(VALID_UUID);
    });
  });

  describe("create", () => {
    const createParams: CreateAuctionParams = {
      title: "New Auction",
      description: "Some description",
      images: [{ url: "https://github.com/shadcn.png" }],
      category: "MUSIC",
      startingPrice: 50,
      status: "DRAFT",
    };

    it("creates an auction when user is authenticated", async () => {
      userRepo.me.mockResolvedValue(user);
      auctionRepo.create.mockResolvedValue(auction);

      const result = await service.create(createParams);

      expect(result).toEqual(auction);
      expect(userRepo.me).toHaveBeenCalled();
      expect(auctionRepo.create).toHaveBeenCalledWith({
        ...createParams,
        ownerId: user.id,
      });
    });

    it("throws error if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);

      await expect(service.create(createParams)).rejects.toThrow(
        "Only authenticated user allowed",
      );
      expect(auctionRepo.create).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    const updateParams: UpdateAuctionParams = {
      ...auction,
      title: "Updated title",
      description: "Updated desc",
      status: "OPEN" as const,
    };

    it("updates auction if user is owner and status is valid", async () => {
      userRepo.me.mockResolvedValue(user);
      auctionRepo.findById.mockResolvedValue(auctionDetails);
      auctionRepo.update.mockResolvedValue({ ...auction, ...updateParams });

      const result = await service.update(updateParams);

      expect(result.title).toBe("Updated title");
      expect(auctionRepo.update).toHaveBeenCalledWith(updateParams);
    });

    it("throws if user is not authenticated", async () => {
      userRepo.me.mockResolvedValue(null);

      await expect(service.update(updateParams)).rejects.toThrow(
        "Only authenticated user allowed",
      );
    });

    it("throws if user is not the owner", async () => {
      userRepo.me.mockResolvedValue({ ...user, id: "other-id" });
      auctionRepo.findById.mockResolvedValue(auctionDetails);

      await expect(service.update(updateParams)).rejects.toThrow(
        "Only auction owner allowed",
      );
    });

    it("throws if status change is forbidden", async () => {
      userRepo.me.mockResolvedValue(user);

      const blockedStatus = "OPEN" as const;
      auctionRepo.findById.mockResolvedValue({
        ...auctionDetails,
        currentBid: 50,
        status: "CANCELLED",
      });

      await expect(
        service.update({ ...updateParams, status: blockedStatus }),
      ).rejects.toThrow("Can not set this status");
    });
  });

  describe("count", () => {
    it("returns total auction count from repo", async () => {
      auctionRepo.count.mockResolvedValue(5);
      const result = await service.count({ filterBy: { status: "DRAFT" } });
      expect(result).toBe(5);
      expect(auctionRepo.count).toHaveBeenCalledWith({
        filterBy: { status: "DRAFT" },
      });
    });

    it("returns 0 if repo returns 0", async () => {
      auctionRepo.count.mockResolvedValue(0);
      const result = await service.count();
      expect(result).toBe(0);
    });

    it("calls repo.count with filters", async () => {
      auctionRepo.count.mockResolvedValue(5);

      const params = {
        filterBy: { category: AuctionCategorySchema.enum.MUSIC },
      };
      const result = await service.count(params);

      expect(result).toBe(5);
      expect(auctionRepo.count).toHaveBeenCalledWith(params);
    });

    it("calls repo.count with default empty params", async () => {
      auctionRepo.count.mockResolvedValue(0);

      const result = await service.count();

      expect(result).toBe(0);
      expect(auctionRepo.count).toHaveBeenCalledWith({});
    });
  });
});
