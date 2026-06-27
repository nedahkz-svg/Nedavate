import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL, GEMINI_API_KEY } from "./config";

/** Embeds a single string via Google's Gemini API gemini-embedding-001, truncated to 768 dims (free tier). */
export async function embedText(text: string): Promise<number[]> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${EMBEDDING_MODEL}`,
        content: { parts: [{ text }] },
        outputDimensionality: EMBEDDING_DIMENSIONS,
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Gemini embeddings request failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.embedding.values as number[];
}
