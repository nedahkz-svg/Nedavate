import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { embedText } from "./embeddings";
import { RAG_MATCH_THRESHOLD, RAG_TOP_K } from "./config";

export type KbChunk = {
  id: number;
  source: string;
  content: string;
  similarity: number;
};

/** Degrades to no context (rather than failing the whole chat turn) if embedding or search fails. */
export async function retrieveContext(query: string): Promise<KbChunk[]> {
  let embedding: number[];
  try {
    embedding = await embedText(query);
  } catch (err) {
    console.error("[rag] embedText error:", err);
    return [];
  }

  const { data, error } = await supabaseAdmin.rpc("match_kb_chunks", {
    query_embedding: embedding,
    match_count: RAG_TOP_K,
    match_threshold: RAG_MATCH_THRESHOLD,
  });

  if (error) {
    console.error("[rag] match_kb_chunks error:", error.message);
    return [];
  }

  return (data ?? []) as KbChunk[];
}

export function formatContext(chunks: KbChunk[]): string {
  if (chunks.length === 0) return "";
  return chunks.map((c) => `[${c.source}]\n${c.content}`).join("\n\n");
}
