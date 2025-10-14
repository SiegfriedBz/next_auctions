import type {
  CreateUserParams,
  LoginParams,
  UpdateUserParams,
  User,
} from "../domains/user";
import type { UserRepository } from "../ports/user-repository";

export class UserService {
  constructor(readonly userRepo: UserRepository) {}

  async me(): Promise<User | null> {
    return await this.userRepo.me();
  }

  async create(params: CreateUserParams): Promise<User> {
    return await this.userRepo.create(params);
  }

  async login(params: LoginParams): Promise<User> {
    return await this.userRepo.login(params);
  }

  async logout(): Promise<void> {
    return await this.userRepo.logout();
  }

  async count(): Promise<number> {
    return await this.userRepo.count();
  }

  async update(params: UpdateUserParams): Promise<User> {
    const me = await this.me();

    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    return await this.userRepo.update({ ...params, id: me.id });
  }
}
