import { ChatPanel } from "@/components/chat/ChatPanel";

/** Rendered inside the iframe injected by /public/widget.js on third-party sites. */
export default function WidgetPage() {
  return (
    <div className="h-screen w-screen">
      <ChatPanel />
    </div>
  );
}
