import { type User, UserRoleSchema } from "@/core/domains/user";
import type { UserRepository } from "@/core/ports/user-repository";
import { UserService } from "@/core/services/user-service";

const VALID_UUID = "00000000-0000-0000-0000-000000000000";

describe("UserService", () => {
  let repo: jest.Mocked<UserRepository>;
  let service: UserService;
  let user: User;

  beforeEach(() => {
    repo = {
      me: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };
    service = new UserService(repo);

    user = {
      id: VALID_UUID,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      avatarUrl: undefined,
      role: UserRoleSchema.enum.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe("me", () => {
    it("returns current authenticated user", async () => {
      repo.me.mockResolvedValue(user);
      expect(await service.me()).toEqual(user);
    });
  });

  describe("detailsById", () => {
    it("returns user by id", async () => {
      repo.findById.mockResolvedValue(user);

      const result = await service.detailsById("u1");

      expect(result).toEqual(user);
      expect(repo.findById).toHaveBeenCalledWith("u1");
    });
  });

  describe("create", () => {
    it("creates a new user via the repository", async () => {
      repo.create.mockResolvedValue(user);

      const result = await service.create({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: "secret",
      });

      expect(result).toEqual(user);
      expect(repo.create).toHaveBeenCalledWith({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: "secret",
      });
    });
  });

  describe("login", () => {
    it("login user via the repository", async () => {
      repo.login.mockResolvedValue(user);

      const result = await service.login({
        email: "jane@example.com",
        password: "secret",
      });

      expect(result).toEqual(user);
      expect(repo.login).toHaveBeenCalledWith({
        email: "jane@example.com",
        password: "secret",
      });
    });
  });

  describe("logout", () => {
    it("calls logout on repo", async () => {
      await service.logout();
      expect(repo.logout).toHaveBeenCalled();
    });
  });

  describe("count", () => {
    it("calls count on the repository with params", async () => {
      repo.count.mockResolvedValue(42);

      const params = { filterBy: { role: user.role } };
      const result = await service.count(params);

      expect(result).toBe(42);
      expect(repo.count).toHaveBeenCalledWith(params);
    });

    it("calls count on the repository with default params", async () => {
      repo.count.mockResolvedValue(0);

      const result = await service.count();

      expect(result).toBe(0);
      expect(repo.count).toHaveBeenCalledWith({});
    });
  });

  describe("update", () => {
    it("throws an error when no user is authenticated", async () => {
      repo.me.mockResolvedValue(null);

      await expect(
        service.update({
          firstName: "John",
          lastName: "Doe",
        }),
      ).rejects.toThrow("Only authenticated user allowed");

      expect(repo.me).toHaveBeenCalled();
      expect(repo.update).not.toHaveBeenCalled();
    });

    it("updates the user when authenticated", async () => {
      repo.me.mockResolvedValue(user);
      repo.update.mockResolvedValue({
        ...user,
        firstName: "John",
        lastName: "Doe",
      });

      const params = {
        firstName: "John",
        lastName: "Doe",
      };

      const result = await service.update(params);

      expect(repo.me).toHaveBeenCalled();
      expect(repo.update).toHaveBeenCalledWith({
        ...params,
        id: VALID_UUID,
      });
      expect(result).toEqual({
        ...user,
        firstName: "John",
        lastName: "Doe",
      });
    });
  });
});
