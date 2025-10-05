import type {
  CreateUserParams,
  LoginParams,
  UpdateUserParams,
  User,
  UsersCountParams,
} from "../domains/user";

export type RepoUpdateUserParams = { id: string } & UpdateUserParams;

export interface UserRepository {
  me(): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(params: CreateUserParams): Promise<User>;
  login(params: LoginParams): Promise<User>;
  logout(): Promise<void>;
  count(params: UsersCountParams): Promise<number>;
  update(params: RepoUpdateUserParams): Promise<User>;
}
