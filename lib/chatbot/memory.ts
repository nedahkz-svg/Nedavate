import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { MAX_HISTORY_MESSAGES } from "./config";
import type { Channel, WireMessage } from "./types";

/**
 * Reuses an existing conversation if it belongs to this visitor. If no
 * conversationId is given (always the case for Telegram, which has no
 * client-side storage to remember one), reuses the visitor's most recent
 * conversation on this channel rather than starting a fresh thread on every
 * single message.
 */
export async function resolveConversation(
  visitorId: string,
  channel: Channel,
  conversationId?: string,
): Promise<string> {
  if (conversationId) {
    const { data } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .eq("visitor_id", visitorId)
      .maybeSingle();
    if (data) return data.id as string;
  }

  const { data: recent } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("visitor_id", visitorId)
    .eq("channel", channel)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (recent) return recent.id as string;

  const { data: created, error } = await supabaseAdmin
    .from("conversations")
    .insert({ visitor_id: visitorId, channel })
    .select("id")
    .single();
  if (error || !created) {
    throw new Error(`Failed to create conversation: ${error?.message}`);
  }
  return created.id as string;
}

/** Short-term memory: the last N user/assistant turns, oldest first. */
export async function getShortTerm(conversationId: string): Promise<WireMessage[]> {
  const { data } = await supabaseAdmin
    .from("chat_messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .in("role", ["user", "assistant"])
    .order("created_at", { ascending: false })
    .limit(MAX_HISTORY_MESSAGES);

  return (data ?? [])
    .reverse()
    .map((row) => ({ role: row.role as "user" | "assistant", content: row.content }));
}

export async function appendMessage(
  conversationId: string,
  role: "user" | "assistant" | "tool",
  content: string,
  toolName?: string,
) {
  await supabaseAdmin.from("chat_messages").insert({
    conversation_id: conversationId,
    role,
    content,
    tool_name: toolName ?? null,
  });
}

export type LongTermMemory = { summary: string; facts: Record<string, unknown> };

export async function getLongTerm(visitorId: string): Promise<LongTermMemory> {
  const { data } = await supabaseAdmin
    .from("visitor_memory")
    .select("summary, facts")
    .eq("visitor_id", visitorId)
    .maybeSingle();

  return {
    summary: data?.summary ?? "",
    facts: (data?.facts as Record<string, unknown>) ?? {},
  };
}

/** Merges newly-learned facts (e.g. tool args) into the visitor's long-term memory. */
export async function mergeLongTermFacts(
  visitorId: string,
  newFacts: Record<string, unknown>,
) {
  if (Object.keys(newFacts).length === 0) return;

  const current = await getLongTerm(visitorId);
  const facts = { ...current.facts, ...newFacts };

  await supabaseAdmin.from("visitor_memory").upsert({
    visitor_id: visitorId,
    facts,
    summary: current.summary,
    updated_at: new Date().toISOString(),
  });
}

/** Simple abuse guard: counts this visitor's user messages in the last N minutes. */
export async function countRecentMessages(
  visitorId: string,
  sinceMinutesAgo: number,
): Promise<number> {
  const { data: convs } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("visitor_id", visitorId);
  const ids = (convs ?? []).map((c) => c.id);
  if (ids.length === 0) return 0;

  const since = new Date(Date.now() - sinceMinutesAgo * 60_000).toISOString();
  const { count } = await supabaseAdmin
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("role", "user")
    .in("conversation_id", ids)
    .gte("created_at", since);

  return count ?? 0;
}
