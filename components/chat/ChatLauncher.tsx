"use client";

import { MessageCircle, X } from "lucide-react";

export function ChatLauncher({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-card-hover transition-transform hover:-translate-y-0.5"
    >
      {isOpen ? (
        <X className="h-6 w-6" aria-hidden />
      ) : (
        <MessageCircle className="h-6 w-6" aria-hidden />
      )}
    </button>
  );
}
