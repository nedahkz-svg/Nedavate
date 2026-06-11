"use client";

import { useState } from "react";
import { Check, Download, Loader2, FileCheck2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { leadMagnet, features } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export function LeadMagnet() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  if (!features.leadMagnet) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const name = String(form.get("name") ?? "");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="checklist" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-indigo/10 bg-indigo shadow-card-hover">
            <div className="grid items-stretch gap-0 lg:grid-cols-2">
              {/* Left: the pitch */}
              <div className="p-8 sm:p-12">
                <p className="mono-label text-coral">{leadMagnet.eyebrow}</p>
                <h2 className="mt-3 text-2xl text-warm-white sm:text-3xl lg:text-4xl">
                  {leadMagnet.heading}
                </h2>
                <p className="mt-4 max-w-md text-warm-white/70">
                  {leadMagnet.subhead}
                </p>
                <ul className="mt-6 space-y-3">
                  {leadMagnet.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-warm-white/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: the form / success state */}
              <div className="flex flex-col justify-center border-t border-white/10 bg-slate p-8 sm:p-12 lg:border-l lg:border-t-0">
                {status === "success" ? (
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-teal">
                      <FileCheck2 className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-xl text-warm-white">
                      {leadMagnet.successHeading}
                    </h3>
                    <p className="mt-2 text-sm text-warm-white/70">
                      {leadMagnet.successBody}
                    </p>
                    <a
                      href={leadMagnet.downloadHref}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
                    >
                      <Download className="h-4 w-4" aria-hidden />
                      {leadMagnet.successCta}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <label htmlFor="lm-name" className="sr-only">
                      First name
                    </label>
                    <input
                      id="lm-name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      placeholder={leadMagnet.namePlaceholder}
                      className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-warm-white placeholder:text-warm-white/40"
                    />
                    <label htmlFor="lm-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="lm-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={leadMagnet.emailPlaceholder}
                      className="focus-ring mt-3 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-warm-white placeholder:text-warm-white/40"
                    />

                    {status === "error" && (
                      <p className="mt-3 text-sm text-coral" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        leadMagnet.cta
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-warm-white/50">
                      {leadMagnet.privacyNote}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
