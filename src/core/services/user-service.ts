import type { CreateUserParams, LoginUserParams, User } from "../domains/user";
import type { UserRepository } from "../ports/user-repository";

export class UserService {
  constructor(readonly userRepo: UserRepository) {}

  async current(): Promise<User | null> {
    const user = await this.userRepo.current();

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo.findById(id);

    return user;
  }

  async create(params: CreateUserParams): Promise<User | null> {
    const user = await this.userRepo.create(params);

    return user;
  }

  async login(params: LoginUserParams): Promise<User | null> {
    return await this.userRepo.login(params);
  }

  async logout(): Promise<void> {
    return await this.userRepo.logout();
  }
}
