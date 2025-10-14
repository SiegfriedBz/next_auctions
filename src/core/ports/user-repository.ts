import type {
  CreateUserParams,
  LoginParams,
  UpdateUserParams,
  User,
} from "../domains/user";

export type RepoUpdateUserParams = { id: string } & UpdateUserParams;

export interface UserRepository {
  me(): Promise<User | null>;
  create(params: CreateUserParams): Promise<User>;
  login(params: LoginParams): Promise<User>;
  logout(): Promise<void>;
  count(): Promise<number>;
  update(params: RepoUpdateUserParams): Promise<User>;
}
