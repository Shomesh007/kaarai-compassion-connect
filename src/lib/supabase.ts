import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

/**
 * Supabase client instance.
 * If the env vars are missing the client is still created (with empty strings)
 * so the app can fall back to local default data without crashing.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Returns true when valid Supabase credentials have been configured. */
export const isSupabaseConfigured = (): boolean =>
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);
