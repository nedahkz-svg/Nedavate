export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? "";
// Open-weight model with reliable tool-calling support on OpenRouter.
export const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct";

// Google's Gemini API has a free tier for embeddings (no credit card needed).
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
export const EMBEDDING_MODEL = "gemini-embedding-001";
export const EMBEDDING_DIMENSIONS = 768;

export const RAG_TOP_K = 5;
export const RAG_MATCH_THRESHOLD = 0.5;

/** ~10 turns of short-term memory replayed into context on each new message. */
export const MAX_HISTORY_MESSAGES = 20;

/** Safety bound on the tool-calling loop — not a general agent loop. */
export const MAX_TOOL_ROUNDS = 2;
