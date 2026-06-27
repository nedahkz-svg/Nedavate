import type { SupabaseClient } from "@supabase/supabase-js";

export type InsertLeadInput = {
  name?: string | null;
  email: string;
  source: string;
};

/** Inserts a row into the `leads` table. Shared by /api/subscribe and the chatbot's capture_lead tool. */
export async function insertLead(
  client: SupabaseClient,
  { name, email, source }: InsertLeadInput,
) {
  const { error } = await client
    .from("leads")
    .insert({ name: name || null, email, source });
  if (error) console.error("[leads] Supabase error:", error.message);
  return { error };
}
