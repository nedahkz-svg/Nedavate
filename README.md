# Nedavate — Website

**Intelligent learning. Measurable transformation.**

The personal-brand + consultation site for Nedavate (instructional design + AI
learning consultancy). Built with Next.js 14, TypeScript, and Tailwind CSS,
styled to the Nedavate Brand Guide, and ready to deploy on Vercel.

---

## Open the site (one click)

**Double-click `start-website.bat`** in this folder. It starts the site and opens
`http://localhost:3000` in your browser automatically. Keep the black window open
while you browse; **close it (or press Ctrl+C) to stop** the site.

> The site only runs while that window is open — it's served from your own
> computer, so it isn't a public link. To make it always-on and shareable, deploy
> to Vercel (see below).

## Quick start (manual / for developers)

> Requires **Node.js 20+** (already installed). If `npm` isn't recognised in a
> new terminal, open a fresh PowerShell window so it picks up the PATH, or use
> the full path `"C:\Program Files\nodejs\npm.cmd"`.

```bash
npm install        # first time only
npm run dev        # http://localhost:3000  (hot reload)
npm run build      # production build
npm run start      # serve the production build
```

---

## Editing content (no coding needed)

**Almost all text lives in one file: [`lib/content.ts`](lib/content.ts).**
Change copy there and the page updates. Key things you'll want to edit:

| What | Where in `lib/content.ts` |
|------|---------------------------|
| Your email & social links | `brand` |
| Hero headline / subhead / stats | `hero` |
| The 7 services | `services` |
| Process steps | `howIHelp` |
| Portfolio case studies (currently placeholders) | `projects` |
| **About me** (currently `{{ABOUT_PLACEHOLDER}}`) | `about` |
| Consultation names, prices, durations | `booking` |
| Turn testimonials on + add quotes | `features.testimonials` + `testimonials` |

Search the project for `{{` to find every placeholder that needs your real
content.

---

## Adding your photos & logo

Drop image files into [`public/`](public/) — see
[`public/images-go-here.md`](public/images-go-here.md) for the exact filenames
and the brand-guide photography directions. The placeholders (hero portrait,
about photo, project images, logo) are clearly marked in the components.

---

## Booking + payment (Cal.com + Stripe)

The booking section embeds **Cal.com**, which handles calendar slots and takes
payment for the paid session through **Stripe** — no card data ever touches this
site.

**One-time setup:**

1. Create a free account at <https://cal.com>.
2. Create two event types:
   - **Free Strategy Call** — 20 min, no price.
   - **AI Strategy Session** — 60 min. Open the event → **Apps** → install
     **Stripe**, connect your Stripe account, and set the price (default $150).
3. Copy `.env.local.example` to `.env.local` and set your two links (the part
   after `cal.com/`):
   ```
   NEXT_PUBLIC_CAL_FREE_LINK=your-username/free-strategy-call
   NEXT_PUBLIC_CAL_PAID_LINK=your-username/ai-strategy-session
   ```
4. Restart `npm run dev`. The scheduler appears in the **Book a time** section.

**Test the payment** in Stripe **test mode** with card `4242 4242 4242 4242`,
any future expiry, any CVC — confirm the booking and calendar invite fire.

> Until the links are set, the booking section shows a friendly "not connected
> yet" notice instead of the calendar.

---

## Lead magnet (AI Training Readiness Checklist)

A signup section captures visitors who aren't ready to book. They enter their
email and get the checklist (served from
[`public/ai-training-readiness-checklist.html`](public/ai-training-readiness-checklist.html)
— replace with your own branded PDF anytime).

The form posts to `app/api/subscribe/route.ts`, which forwards the email to your
provider. Set **one** of these in `.env.local` (and in Vercel) to actually
collect leads:

- **ConvertKit:** `CONVERTKIT_API_KEY` + `CONVERTKIT_FORM_ID`
- **Generic webhook** (Zapier/Make/n8n/Google Sheet): `LEAD_WEBHOOK_URL`

Until one is set, the form works but logs a warning and doesn't store the email.
To hide the section entirely, set `features.leadMagnet = false` in
[`lib/content.ts`](lib/content.ts). All checklist copy lives in `leadMagnet`
there too.

---

## Deploy to Vercel

1. Push this folder to a **GitHub** repo.
2. At <https://vercel.com> → **Add New → Project** → import the repo. Vercel
   auto-detects Next.js — no config needed.
3. In **Project → Settings → Environment Variables**, add
   `NEXT_PUBLIC_CAL_FREE_LINK` and `NEXT_PUBLIC_CAL_PAID_LINK`.
4. Deploy. Then **Settings → Domains** → add `transformiq.co` and follow the DNS
   instructions.

---

## Brand tokens (already wired into Tailwind)

| Colour | Hex | Role |
|--------|-----|------|
| Deep Indigo | `#2D2A6E` | Primary — headlines, nav |
| Catalyst Teal | `#0F9E78` | CTAs, links, hover |
| Performance Coral | `#E8601A` | Energiser — used sparingly (<10%) |
| Deep Slate | `#1A1A2E` | Body text, dark sections |
| Warm White | `#F5F4F0` | Backgrounds |
| Steel Gray | `#7B8FA6` | Captions, labels |

Fonts: **Syne** (display), **DM Sans** (body), **DM Mono** (technical labels) —
loaded automatically via `next/font`.

---

## Project structure

```
app/
  layout.tsx      fonts + SEO metadata
  page.tsx        assembles the sections
  globals.css     base styles + brand tokens
components/        Nav, Hero, Services, Booking, Footer, etc.
lib/content.ts     ← all site copy lives here
public/            images, favicon
```
