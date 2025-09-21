import type { CreateUserParams, LoginUserParams, User } from "../domains/user";

export interface UserRepository {
  current(): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(params: CreateUserParams): Promise<User | null>;
  login(params: LoginUserParams): Promise<User | null>;
  logout(): Promise<void>;
}
