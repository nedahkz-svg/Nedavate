import type { ToolContext, ToolDefinition } from "../types";
import { captureLead } from "./captureLead";
import { updateRegistration } from "./updateRegistration";

export const toolDefinitions: ToolDefinition[] = [
  {
    name: "capture_lead",
    description:
      "Save a visitor's contact info when they share their name/email or ask to be contacted or kept updated.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's first name, if given." },
        email: { type: "string", description: "Visitor's email address." },
      },
      required: ["email"],
    },
    handler: captureLead,
  },
  {
    name: "update_registration",
    description:
      "Record a visitor's interest in registering or enrolling for a session or program. This is a placeholder — a human follows up, there's no live registration system yet.",
    parameters: {
      type: "object",
      properties: {
        program: { type: "string", description: "Which program/session they're interested in." },
        details: { type: "string", description: "Any other relevant detail the visitor shared." },
      },
      required: [],
    },
    handler: updateRegistration,
  },
];

export async function dispatchTool(
  name: string,
  args: Record<string, unknown>,
  ctx: ToolContext,
): Promise<Record<string, unknown>> {
  const tool = toolDefinitions.find((t) => t.name === name);
  if (!tool) return { ok: false, error: `Unknown tool: ${name}` };

  try {
    return await tool.handler(args, ctx);
  } catch (err) {
    console.error(`[tools] ${name} threw:`, err);
    return { ok: false, error: "Tool execution failed." };
  }
}
