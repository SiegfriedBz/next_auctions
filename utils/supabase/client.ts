import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""

export function createClient() {

  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}