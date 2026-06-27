"use client";

import { useState } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";

/** Floating chat launcher + panel, mounted once on the native site. */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-indigo/10 shadow-card-hover">
          <ChatPanel />
        </div>
      )}
      <ChatLauncher isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
    </div>
  );
}
