export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type LoginUserParams = Pick<User, "email"> & { password: string };

export type CreateUserParams = LoginUserParams &
  Pick<User, "firstName" | "lastName">;
