import type {
  CreateUserParams,
  LoginUserParams,
  User,
} from "@/core/domains/user";
import type { UserRepository } from "@/core/ports/user-repository";
import { createClient } from "@/utils/supabase/server";
import { userMapper } from "./user-mapper";

export class SupabaseUserRepository implements UserRepository {
  async current(): Promise<User | null> {
    const client = await createClient();

    const { data: authData, error: authError } = await client.auth.getUser();

    if (authError) {
      console.log("user not found", authError);
      return null;
    }

    const { data, error } = await client
      .from("users")
      .select()
      .eq("id", authData.user.id)
      .single();

    if (error) {
      console.log("user not found", error);
      return null;
    }

    return userMapper(data);
  }

  async findById(id: string): Promise<User | null> {
    const client = await createClient();
    const { data, error } = await client
      .from("users")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.log("findById error", error);
      return null;
    }

    return userMapper(data);
  }

  async create(params: CreateUserParams): Promise<User | null> {
    const { firstName, lastName, email, password } = params;

    const client = await createClient();

    const { data: authData, error: authError } = await client.auth.signUp({
      email,
      password,
    });

    if (!authData?.user?.id || authError) {
      console.log("sign up error", authError?.message);
      throw new Error("Could not sign up user");
    }

    const { data: user, error } = await client
      .from("users")
      .insert({
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        email,
      })
      .select()
      .single();

    if (error) {
      console.log("user create error", error?.message);
      throw new Error("Could not sign up user");
    }

    return userMapper(user);
  }

  async login(params: LoginUserParams): Promise<User | null> {
    const client = await createClient();
    const { data: authData, error: authError } =
      await client.auth.signInWithPassword(params);

    if (!authData?.user?.id || authError) {
      console.log(
        "signInWithPassword error",
        authError?.message ?? "signInWithPassword error",
      );
      throw new Error("Could not login user");
    }

    const { data: user, error } = await client
      .from("users")
      .select()
      .eq("id", authData.user.id)
      .single();

    if (error) {
      console.log("login error", error?.message);
      throw new Error("Could not login user");
    }

    return userMapper(user);
  }

  async logout(): Promise<void> {
    const client = await createClient();
    const { error } = await client.auth.signOut();

    if (error) {
      console.error("logout failed", error);
      throw new Error(error.message);
    }
  }
}
