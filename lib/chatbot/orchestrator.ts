import { MAX_TOOL_ROUNDS } from "./config";
import { resolveVisitor } from "./identity";
import {
  appendMessage,
  getLongTerm,
  getShortTerm,
  mergeLongTermFacts,
  resolveConversation,
} from "./memory";
import { callChat } from "./openrouter";
import { buildSystemPrompt } from "./prompt";
import { formatContext, retrieveContext } from "./rag";
import { stripToolCallArtifacts } from "./sanitize";
import { dispatchTool, toolDefinitions } from "./tools";
import type { RunChatTurnInput, RunChatTurnOutput, WireMessage } from "./types";

const FALLBACK_REPLY =
  "Sorry, I had trouble putting that together — could you try rephrasing?";

/** The single brain entry point all three channels (web, widget, Telegram) call. */
export async function runChatTurn(
  input: RunChatTurnInput,
): Promise<RunChatTurnOutput> {
  const visitorId = await resolveVisitor(input.channel, input.visitorExternalId);
  const conversationId = await resolveConversation(
    visitorId,
    input.channel,
    input.conversationId,
  );

  const [history, longTerm, chunks] = await Promise.all([
    getShortTerm(conversationId),
    getLongTerm(visitorId),
    retrieveContext(input.userMessage),
  ]);

  await appendMessage(conversationId, "user", input.userMessage);

  const systemPrompt = buildSystemPrompt({
    ragContext: formatContext(chunks),
    longTermSummary: longTerm.summary,
    facts: longTerm.facts,
  });

  const wireMessages: WireMessage[] = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: input.userMessage },
  ];

  const collectedFacts: Record<string, unknown> = {};
  let finalContent: string | null = null;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const result = await callChat(wireMessages, toolDefinitions);

    if (result.toolCalls.length === 0) {
      finalContent = result.content;
      break;
    }

    wireMessages.push(result.assistantMessage);

    for (const call of result.toolCalls) {
      const toolResult = await dispatchTool(call.name, call.arguments, {
        visitorId,
        channel: input.channel,
      });
      await appendMessage(
        conversationId,
        "tool",
        JSON.stringify({ args: call.arguments, result: toolResult }),
        call.name,
      );
      collectedFacts[call.name] = call.arguments;
      wireMessages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(toolResult),
      });
    }
  }

  if (finalContent === null) {
    // Tool rounds exhausted — force one last plain-text reply, no tools offered.
    const closing = await callChat(wireMessages, []);
    finalContent = closing.content;
  }

  const reply = stripToolCallArtifacts(finalContent || "") || FALLBACK_REPLY;

  await appendMessage(conversationId, "assistant", reply);
  await mergeLongTermFacts(visitorId, collectedFacts);

  return { reply, conversationId };
}
