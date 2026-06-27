import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { ToolContext } from "../types";

/**
 * PLACEHOLDER v1: no real registration system exists yet. This just records
 * whatever the model captured so nothing is lost — a human follows up.
 */
export async function updateRegistration(
  args: Record<string, unknown>,
  ctx: ToolContext,
): Promise<Record<string, unknown>> {
  const { error } = await supabaseAdmin.from("registration_requests").insert({
    visitor_id: ctx.visitorId,
    raw_args: args,
  });

  if (error) {
    console.error("[update_registration] Supabase error:", error.message);
    return { ok: false, error: "Could not record that right now." };
  }

  return {
    ok: true,
    note: "Recorded as interest. There's no live registration system yet, so a human will follow up.",
  };
}
