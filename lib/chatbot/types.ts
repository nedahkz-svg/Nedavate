export type Channel = "web" | "widget" | "telegram";

export type ChatRole = "system" | "user" | "assistant" | "tool";

export type ToolCallWire = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

export type WireMessage = {
  role: ChatRole;
  content: string | null;
  tool_calls?: ToolCallWire[];
  tool_call_id?: string;
};

export type ToolCall = {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
};

export type ToolContext = {
  visitorId: string;
  channel: Channel;
};

export type ToolDefinition = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  handler: (
    args: Record<string, unknown>,
    ctx: ToolContext,
  ) => Promise<Record<string, unknown>>;
};

export type RunChatTurnInput = {
  channel: Channel;
  visitorExternalId: string;
  conversationId?: string;
  userMessage: string;
};

export type RunChatTurnOutput = {
  reply: string;
  conversationId: string;
};
