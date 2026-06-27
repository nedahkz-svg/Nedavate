import { insertLead } from "@/lib/leads";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { linkEmail } from "../identity";
import type { ToolContext } from "../types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function captureLead(
  args: Record<string, unknown>,
  ctx: ToolContext,
): Promise<Record<string, unknown>> {
  const email = String(args.email ?? "").trim();
  const name = args.name ? String(args.name).trim() : null;

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "That doesn't look like a valid email address." };
  }

  const { error } = await insertLead(supabaseAdmin, {
    name,
    email,
    source: `chatbot-${ctx.channel}`,
  });

  if (error) return { ok: false, error: "Could not save your details right now." };

  await linkEmail(ctx.visitorId, email);

  return { ok: true };
}
