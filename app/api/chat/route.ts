import { NextResponse } from "next/server";
import { runChatTurn } from "@/lib/chatbot";
import { resolveVisitor } from "@/lib/chatbot/identity";
import { countRecentMessages } from "@/lib/chatbot/memory";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MINUTES = 5;
const RATE_LIMIT_MAX_MESSAGES = 20;

/** Used by both the native site chat and the embeddable widget's iframe (same-origin). */
export async function POST(request: Request) {
  let body: { message?: string; visitorId?: string; conversationId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = String(body.message ?? "").trim();
  const visitorExternalId = String(body.visitorId ?? "").trim();

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is empty or too long." }, { status: 422 });
  }
  if (!visitorExternalId) {
    return NextResponse.json({ error: "Missing visitor id." }, { status: 422 });
  }

  try {
    const visitorId = await resolveVisitor("web", visitorExternalId);
    const recentCount = await countRecentMessages(visitorId, RATE_LIMIT_WINDOW_MINUTES);
    if (recentCount >= RATE_LIMIT_MAX_MESSAGES) {
      return NextResponse.json(
        { error: "You're sending messages a bit fast — please wait a moment." },
        { status: 429 },
      );
    }

    const { reply, conversationId } = await runChatTurn({
      channel: "web",
      visitorExternalId,
      conversationId: body.conversationId,
      userMessage: message,
    });

    return NextResponse.json({ reply, conversationId });
  } catch (err) {
    console.error("[api/chat] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
}
