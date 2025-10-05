import type {
  CreateUserParams,
  LoginParams,
  User,
  UsersCountParams,
} from "@/core/domains/user";
import type {
  RepoUpdateUserParams,
  UserRepository,
} from "@/core/ports/user-repository";
import { createClient } from "@/utils/supabase/server";
import { userMapper } from "./user-mapper";

export class SupabaseUserRepository implements UserRepository {
  async me(): Promise<User | null> {
    const client = await createClient();

    const { data: authData, error: authError } = await client.auth.getUser();
    if (authError || !authData.user?.id) return null;

    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error) return null;

    return userMapper(data);
  }

  async findById(id: string): Promise<User | null> {
    const client = await createClient();

    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return userMapper(data);
  }

  async create(params: CreateUserParams): Promise<User> {
    const client = await createClient();
    const { firstName, lastName, email, password } = params;

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await client.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user?.id) {
      throw new Error(`Auth signup failed: ${authError?.message}`);
    }

    // Insert into users table
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

    if (error || !user) {
      throw new Error(`DB insert failed: ${error?.message}`);
    }

    const mapped = userMapper(user);
    if (!mapped) throw new Error("Inserted user is invalid");

    return mapped;
  }

  async login(params: LoginParams): Promise<User> {
    const client = await createClient();

    const { data: authData, error: authError } =
      await client.auth.signInWithPassword(params);

    if (authError || !authData.user?.id) {
      throw new Error(`Login failed: ${authError?.message}`);
    }

    const { data: user, error } = await client
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !user) {
      throw new Error(`DB fetch after login failed: ${error?.message}`);
    }

    const mapped = userMapper(user);
    if (!mapped) throw new Error("Fetched user is invalid");

    return mapped;
  }

  async logout(): Promise<void> {
    const client = await createClient();
    const { error } = await client.auth.signOut();

    if (error) throw new Error(`Logout failed: ${error.message}`);
  }

  async count(params: UsersCountParams): Promise<number> {
    const { filterBy } = params;
    const client = await createClient();

    let query = client
      .from("users")
      .select("*", { count: "exact", head: true });

    // filters
    for (const key in filterBy) {
      const value = filterBy[key as keyof typeof filterBy];
      if (!value) continue;

      switch (key) {
        case "role": {
          query = query.eq("role", value);
          break;
        }

        case "email": {
          query = query.eq("email", value);
          break;
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      console.error("SupabaseUserRepository count error", error);
      return 0;
    }

    return count ?? 0;
  }

  async update(params: RepoUpdateUserParams): Promise<User> {
    const client = await createClient();
    const { id, firstName, lastName } = params;

    const { data: user, error } = await client
      .from("users")
      .update({
        first_name: firstName,
        last_name: lastName,
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !user) {
      throw new Error(`DB update failed: ${error?.message}`);
    }

    const mapped = userMapper(user);
    if (!mapped) throw new Error("Updated user is invalid");

    return mapped;
  }
}
