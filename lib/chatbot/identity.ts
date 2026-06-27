import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Channel } from "./types";

/**
 * Resolves a stable `visitors.id` for this channel + external id.
 * Web/widget: the client-generated UUID IS the visitor id.
 * Telegram: looked up/created by `telegram_chat_id` (a stable id Telegram provides).
 */
export async function resolveVisitor(
  channel: Channel,
  externalId: string,
): Promise<string> {
  if (channel === "telegram") {
    const { data: existing } = await supabaseAdmin
      .from("visitors")
      .select("id")
      .eq("telegram_chat_id", externalId)
      .maybeSingle();
    if (existing) return existing.id as string;

    const { data: created, error } = await supabaseAdmin
      .from("visitors")
      .insert({ channel, telegram_chat_id: externalId })
      .select("id")
      .single();
    if (error || !created) {
      throw new Error(`Failed to create visitor: ${error?.message}`);
    }
    return created.id as string;
  }

  const { data: existing } = await supabaseAdmin
    .from("visitors")
    .select("id")
    .eq("id", externalId)
    .maybeSingle();
  if (existing) return existing.id as string;

  const { data: created, error } = await supabaseAdmin
    .from("visitors")
    .insert({ id: externalId, channel })
    .select("id")
    .single();
  if (error || !created) {
    throw new Error(`Failed to create visitor: ${error?.message}`);
  }
  return created.id as string;
}

/**
 * Links an email to a visitor. v1 "first-seen wins" merge: if another visitor
 * already owns that email, that earlier visitor is treated as canonical and
 * its id is returned instead of `visitorId`.
 */
export async function linkEmail(
  visitorId: string,
  email: string,
): Promise<string> {
  const { data: existing } = await supabaseAdmin
    .from("visitors")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing && existing.id !== visitorId) {
    return existing.id as string;
  }

  await supabaseAdmin
    .from("visitors")
    .update({ email, updated_at: new Date().toISOString() })
    .eq("id", visitorId);

  return visitorId;
}
