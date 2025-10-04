import z from "zod";

// enums
export const UserRoleSchema = z.enum(["USER", "ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

// user
export const UserSchema = z.object({
  id: z.uuid(),
  firstName: z
    .string()
    .min(2, { message: `First name must be at least 2 characters` })
    .max(50),
  lastName: z
    .string()
    .min(2, { message: `Last name must be at least 2 characters` })
    .max(50),
  email: z.email({ message: `Please enter a valid email address` }),
  avatarUrl: z.string().optional(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof UserSchema>;

export type UsersListingParams = {
  filterBy?: Partial<Pick<User, "email" | "role">>;
  pagination?: {
    page: number;
    size: number;
  };
};

export type UsersCountParams = Omit<UsersListingParams, "pagination">;

// create params
const PasswordSchema = z
  .string()
  .min(6, { message: `Password must be at least 6 characters` })
  .max(50);

export const CreateUserParamsSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  avatarUrl: true,
})
  .extend({ role: UserRoleSchema.optional() })
  .extend({ password: PasswordSchema });
export type CreateUserParams = z.infer<typeof CreateUserParamsSchema>;

// login params
export const LoginParamsSchema = CreateUserParamsSchema.pick({
  email: true,
  password: true,
});
export type LoginParams = z.infer<typeof LoginParamsSchema>;
