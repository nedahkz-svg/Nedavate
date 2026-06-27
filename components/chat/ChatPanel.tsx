"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { brand } from "@/lib/content";
import { useChat } from "./useChat";

/**
 * The chat UI itself — header, message list, input. Reused both as the
 * native site's floating panel (inside ChatWidget) and full-bleed inside
 * the /widget iframe used by the embeddable script.
 */
export function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isSending, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || isSending) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <div className="flex h-full w-full flex-col bg-warm-white">
      <div className="flex items-center justify-between bg-indigo px-4 py-3">
        <p className="font-display text-sm text-warm-white">{brand.name} assistant</p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-steel">
            Ask me about services, the process, or book a call — I&apos;m happy to help.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl bg-teal px-3 py-2 text-sm text-white"
                : "mr-auto max-w-[85%] rounded-2xl bg-slate/5 px-3 py-2 text-sm text-slate"
            }
          >
            {m.content}
          </div>
        ))}
        {isSending && (
          <div className="mr-auto flex items-center gap-2 text-sm text-steel">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Thinking…
          </div>
        )}
        {error && (
          <p className="text-xs text-coral" role="alert">
            {error}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-indigo/10 p-3">
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          autoComplete="off"
          className="focus-ring flex-1 rounded-full border border-indigo/15 bg-white px-4 py-2 text-sm text-slate placeholder:text-steel"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          aria-label="Send"
          className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
