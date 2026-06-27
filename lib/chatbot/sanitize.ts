import { toolDefinitions } from "./tools";

const TOOL_NAMES = new Set(toolDefinitions.map((t) => t.name));

/**
 * Some open-weight models occasionally leak a JSON-ish tool-call description
 * into the visible reply text instead of (or alongside) using the proper
 * tool_calls field. Strips any such balanced-brace JSON object that looks
 * like a tool call before the reply reaches the user.
 */
export function stripToolCallArtifacts(text: string): string {
  let result = "";
  let i = 0;

  while (i < text.length) {
    if (text[i] === "{") {
      const end = findMatchingBrace(text, i);
      if (end !== -1 && looksLikeToolCall(text.slice(i, end + 1))) {
        i = end + 1;
        continue;
      }
    }
    result += text[i];
    i++;
  }

  return result.replace(/\n{3,}/g, "\n\n").trim();
}

function findMatchingBrace(text: string, start: number): number {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function looksLikeToolCall(candidate: string): boolean {
  let parsed: unknown;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    return false;
  }
  if (typeof parsed !== "object" || parsed === null) return false;
  const obj = parsed as Record<string, unknown>;
  if (obj.type === "function") return true;
  return typeof obj.name === "string" && TOOL_NAMES.has(obj.name);
}
