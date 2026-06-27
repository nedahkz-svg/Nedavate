import { brand } from "@/lib/content";
import { OPENROUTER_API_KEY, OPENROUTER_MODEL } from "./config";
import type { ToolCall, ToolDefinition, WireMessage } from "./types";

export type ChatCompletionResult = {
  content: string | null;
  toolCalls: ToolCall[];
  assistantMessage: WireMessage;
};

/** Calls OpenRouter's OpenAI-compatible chat completions endpoint. */
export async function callChat(
  messages: WireMessage[],
  tools: ToolDefinition[],
): Promise<ChatCompletionResult> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": `https://${brand.domain}`,
      "X-Title": brand.name,
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
      ...(tools.length > 0
        ? { tools: tools.map(toToolSchema), tool_choice: "auto" }
        : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenRouter request failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const message = data?.choices?.[0]?.message ?? {};
  const toolCalls: ToolCall[] = (message.tool_calls ?? []).map((tc: any) => ({
    id: tc.id,
    name: tc.function?.name,
    arguments: parseArguments(tc.function?.arguments),
  }));

  return {
    content: message.content ?? null,
    toolCalls,
    assistantMessage: {
      role: "assistant",
      content: message.content ?? null,
      tool_calls: message.tool_calls,
    },
  };
}

function toToolSchema(tool: ToolDefinition) {
  return {
    type: "function" as const,
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  };
}

function parseArguments(raw: string | undefined): Record<string, unknown> {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
