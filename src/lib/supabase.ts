import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

/** Returns true when valid Supabase credentials have been configured. */
export const isSupabaseConfigured = (): boolean =>
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

/**
 * Supabase client instance.
 * If the env vars are missing we use a placeholder URL so the client
 * constructor doesn't throw. All queries will fail gracefully and the
 * app falls back to local default data.
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
);
