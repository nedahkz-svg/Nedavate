import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lead-magnet signup handler.
 *
 * It forwards the email to whichever provider you've configured via env vars:
 *   1. ConvertKit  — set CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID
 *   2. Generic webhook (Zapier/Make/n8n/etc.) — set LEAD_WEBHOOK_URL
 *
 * If neither is set, it still returns success (so the form works in dev) but
 * logs a warning and reports stored:false. Connect a provider before launch
 * so you actually capture leads. See README.md → "Lead magnet".
 */
export async function POST(request: Request) {
  let email = "";
  let name = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim();
    name = String(body?.name ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  try {
    const stored = await forwardToProvider(email, name);
    if (!stored) {
      console.warn(
        "[subscribe] No email provider configured — lead NOT stored. " +
          "Set CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID or LEAD_WEBHOOK_URL.",
      );
    }
    return NextResponse.json({ ok: true, stored });
  } catch (err) {
    console.error("[subscribe] Provider error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
}

/** Returns true if a provider actually received the lead. */
async function forwardToProvider(email: string, name: string): Promise<boolean> {
  const { CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID, LEAD_WEBHOOK_URL } = process.env;

  if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
          first_name: name || undefined,
        }),
      },
    );
    if (!res.ok) throw new Error(`ConvertKit ${res.status}`);
    return true;
  }

  if (LEAD_WEBHOOK_URL) {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        source: "ai-training-readiness-checklist",
        ts: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return true;
  }

  return false;
}
