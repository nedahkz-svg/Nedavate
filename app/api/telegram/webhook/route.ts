import { NextResponse } from "next/server";
import { runChatTurn } from "@/lib/chatbot";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = request.headers.get("x-telegram-bot-api-secret-token");
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let update: { message?: { text?: string; chat?: { id?: number } } };
  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const text = update.message?.text;
  const chatId = update.message?.chat?.id;

  if (!text || !chatId) {
    // Non-text update (sticker, edited message, etc.) — nothing to do.
    return NextResponse.json({ ok: true });
  }

  try {
    const { reply } = await runChatTurn({
      channel: "telegram",
      visitorExternalId: String(chatId),
      userMessage: text,
    });

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: reply }),
      },
    );
  } catch (err) {
    console.error("[api/telegram/webhook] error:", err);
  }

  return NextResponse.json({ ok: true });
}
