# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Nedavate marketing + consultation website — a personal brand site for a freelance
instructional-design / AI-learning consultant. Single long-scroll landing page that drives
visitors to book a free strategy call (and a paid session) via an embedded scheduler, plus a
gated lead-magnet download. Built to deploy on Vercel.

## Commands

Node.js 20+ is required. **`npm` may not be on PATH** in a non-interactive shell — if `npm`
isn't found, use the absolute path `"C:\Program Files\nodejs\npm.cmd"` (this is also why
`.claude/launch.json` invokes `node.exe` against the Next bin directly rather than `npm`).

```bash
npm install        # first run
npm run dev        # dev server with hot reload → http://localhost:3000
npm run build      # production build (also runs lint + type-check)
npm run start      # serve the production build (run `build` first)
npm run lint       # ESLint (next/core-web-vitals)
```

There is no test suite. Verify changes by building and by loading the page.

> Preview/screenshot note: automated screenshots hang against `next dev` because its HMR
> connection keeps the network busy (page never reaches network-idle). To capture screenshots,
> run `npm run build` then `next start` and screenshot that. The booking section's Cal.com
> embed also holds an open connection — strip iframes via eval before a full-page capture, or
> screenshot a static route like `/ai-training-readiness-checklist.html`.

## Architecture

**Next.js 14 App Router + TypeScript + Tailwind.** The whole page is one route
(`app/page.tsx`) that stacks section components from `components/`. There is one API route.

The three ideas that explain most of the codebase:

1. **Content is data, not JSX.** Essentially all copy lives in `lib/content.ts` as typed
   exports (`hero`, `services`, `projects`, `about`, `booking`, `leadMagnet`, `finalCta`,
   `testimonials`, `brand`, `nav`). Components import these and render them — to change wording
   you edit `content.ts`, not the components. Unfinished copy is marked with `{{...}}`
   placeholders (e.g. `{{ABOUT_PLACEHOLDER}}`); grep `{{` to find everything awaiting real
   content.

2. **Feature flags gate optional sections.** `features` in `lib/content.ts`
   (`testimonials`, `leadMagnet`) turns sections on/off. The corresponding components
   (`Testimonials.tsx`, `LeadMagnet.tsx`) self-gate with an early `return null` when their flag
   is false — `app/page.tsx` always renders them; the flag decides visibility. (Note: hooks run
   before that early return to satisfy the rules of hooks.)

3. **Brand tokens are centralized.** Colors and the three Google fonts (Syne / DM Sans / DM
   Mono) come from `tailwind.config.ts` + `app/globals.css`, loaded via `next/font` in
   `app/layout.tsx`. Use the semantic Tailwind tokens — `indigo` (primary/headlines), `teal`
   (all CTAs/links/hover), `coral` (energiser, kept sparse), `slate`, `warm-white`, `steel`,
   and the `font-display`/`font-sans`/`font-mono` families — rather than raw hex. The
   `.mono-label` and `.container-page` component classes in `globals.css` are reused widely.

**Booking (Cal.com + Stripe).** `components/Booking.tsx` toggles between a free and paid plan
and renders `components/CalEmbed.tsx` (`@calcom/embed-react`). The two Cal links come from
`NEXT_PUBLIC_CAL_FREE_LINK` / `NEXT_PUBLIC_CAL_PAID_LINK`. Payment is handled entirely by
Cal.com's Stripe app — no card data touches this app. When the env vars are unset the section
renders a setup notice instead of the embed.

**Lead magnet.** `components/LeadMagnet.tsx` posts to `app/api/subscribe/route.ts`, which
validates the email and forwards it to whichever provider is configured: ConvertKit
(`CONVERTKIT_API_KEY` + `CONVERTKIT_FORM_ID`) or a generic webhook (`LEAD_WEBHOOK_URL`). With no
provider set it returns `{ ok: true, stored: false }` and logs a warning so the form still works
in dev. The downloadable asset is the static, printable `public/ai-training-readiness-checklist.html`.

**Animations.** `components/Reveal.tsx` wraps content in a Framer Motion scroll-in. Because it
starts at `opacity: 0` and animates on `whileInView`, below-the-fold content is invisible in a
non-scrolling static screenshot — that's expected, not a bug.

**Chatbot (RAG + memory + tools, 3 channels).** `lib/chatbot/orchestrator.ts` exports
`runChatTurn()` — the single brain entry point. It resolves visitor identity (anonymous
session id, upgraded to an email once `capture_lead` fires), loads short-term history
(`chat_messages`) and long-term facts (`visitor_memory`), retrieves RAG context from
`kb_chunks` (embedded via Google's Gemini `gemini-embedding-001`, truncated to 768 dims via
`outputDimensionality`, free tier — `GEMINI_API_KEY`)
via the `match_kb_chunks` Supabase RPC, calls OpenRouter (`OPENROUTER_MODEL`,
default `meta-llama/llama-3.3-70b-instruct`, an open-weight model) with tool-calling, and
persists the result. Three thin adapters
call it: `app/api/chat/route.ts` (native site chat + the embeddable widget's iframe, both
same-origin), `app/api/telegram/webhook/route.ts` (Telegram), and the widget itself —
`public/widget.js`, a static vanilla-JS loader any third-party site can `<script src>`, which
injects a Shadow-DOM-isolated launcher button and opens an iframe at `/widget`
(`app/widget/page.tsx`) on click. The chat UI (`components/chat/ChatPanel.tsx`) is built once
and reused by both `components/chat/ChatWidget.tsx` (native, floating) and `/widget`.

Tools live in `lib/chatbot/tools/`: `capture_lead` reuses `lib/leads.ts` (shared with
`/api/subscribe`) to write to the existing `leads` table; `update_registration` is a
v1 placeholder that just logs to `registration_requests` — there is no real registration
system yet.

All chatbot Supabase tables use `lib/supabaseAdmin.ts` (service-role key, server-only) and have
RLS enabled with no policies, so the public anon key used elsewhere in the app can't read/write
them. Schema lives in `supabase/chatbot-schema.sql` (apply manually via the Supabase SQL
editor — there's no migrations setup in this repo). After applying it, run
`npm run ingest:kb` to embed `lib/content.ts` into `kb_chunks`; re-run it whenever that copy
changes meaningfully.

To wire up Telegram after deploying, register the webhook once:
```bash
curl -X POST https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook \
  -d url=https://<your-domain>/api/telegram/webhook \
  -d secret_token=<TELEGRAM_WEBHOOK_SECRET>
```

## Conventions

- Voice/brand rules live in `Nedavate_Brand_Guide.pdf`. Copy must lead with the problem, speak
  in outcomes, address "you", and avoid the guide's forbidden words (synergise, leverage,
  robust, seamless, bespoke, cutting-edge, etc.). Keep Coral under ~10% of any view.
- Environment variables are documented in `.env.local.example`; copy it to `.env.local`.
- New image assets go in `public/` (see `public/images-go-here.md` for expected filenames).
