"use client";

import { useCallback, useRef, useState } from "react";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const VISITOR_ID_KEY = "nedavate_visitor_id";
const CONVERSATION_ID_KEY = "nedavate_conversation_id";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const visitorIdRef = useRef<string>("");
  const conversationIdRef = useRef<string | undefined>(undefined);

  if (!visitorIdRef.current && typeof window !== "undefined") {
    visitorIdRef.current = getOrCreateVisitorId();
    conversationIdRef.current =
      window.localStorage.getItem(CONVERSATION_ID_KEY) ?? undefined;
  }

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsSending(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          visitorId: visitorIdRef.current,
          conversationId: conversationIdRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      conversationIdRef.current = data.conversationId;
      window.localStorage.setItem(CONVERSATION_ID_KEY, data.conversationId);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setIsSending(false);
    }
  }, []);

  return { messages, sendMessage, isSending, error };
}
