import { type User, UserRole } from "@/core/domains/user";
import type { UserRepository } from "@/core/ports/user-repository";
import { UserService } from "@/core/services/user-service";

describe("UserService", () => {
  let repo: jest.Mocked<UserRepository>;
  let service: UserService;
  let user: User;

  beforeEach(() => {
    repo = {
      current: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    };
    service = new UserService(repo);

    user = {
      id: "u1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      avatarUrl: undefined,
      role: UserRole.USER,
    };
  });

  describe("current", () => {
    it("returns current authenticated user", async () => {
      repo.current.mockResolvedValue(null);
      expect(await service.current()).toBeNull();
    });
  });

  describe("findById", () => {
    it("returns user by id", async () => {
      repo.findById.mockResolvedValue(user);

      const result = await service.findById("u1");

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
});
