import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.",
      );
    }
    client = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  }
  return client;
}

/**
 * Server-only Supabase client using the service-role key.
 * Bypasses RLS — only import this from server code (API routes, scripts),
 * never from a "use client" component or anything shipped to the browser.
 *
 * Created lazily (on first property access, i.e. inside a request handler)
 * rather than at module load, so importing this file doesn't itself require
 * the env vars to be set — Next.js evaluates route modules at build time
 * during "collect page data," before any request (and before .env values
 * necessarily exist, e.g. in CI).
 */
export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, _receiver) {
    const real = getClient();
    const value = (real as unknown as Record<string, unknown>)[prop as string];
    return typeof value === "function" ? value.bind(real) : value;
  },
});
