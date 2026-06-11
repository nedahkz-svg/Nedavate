"use client";

import { useState } from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import { CalEmbed } from "./CalEmbed";
import { booking } from "@/lib/content";

const FREE_LINK = process.env.NEXT_PUBLIC_CAL_FREE_LINK;
const PAID_LINK = process.env.NEXT_PUBLIC_CAL_PAID_LINK;

type Plan = "free" | "paid";

export function Booking() {
  const [plan, setPlan] = useState<Plan>("free");
  const calLink = plan === "free" ? FREE_LINK : PAID_LINK;

  const plans = [
    { id: "free" as Plan, ...booking.free, highlight: true },
    { id: "paid" as Plan, ...booking.paid, highlight: false },
  ];

  return (
    <section id="book" className="bg-warm-white py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mono-label text-teal">Book a time</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{booking.heading}</h2>
          <p className="mt-4 text-lg text-slate/80">{booking.intro}</p>
        </div>

        {/* Plan selector cards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {plans.map((p) => {
            const active = plan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`focus-ring relative rounded-2xl border p-6 text-left transition-all ${
                  active
                    ? "border-teal bg-white shadow-card-hover ring-1 ring-teal"
                    : "border-indigo/15 bg-white/60 hover:border-teal/40 hover:bg-white"
                }`}
                aria-pressed={active}
              >
                {p.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-teal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
                    Start here
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-indigo">
                    {p.price}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-steel">
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {p.duration}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate/75">
                  {p.description}
                </p>
                <span
                  className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${
                    active ? "text-teal" : "text-indigo"
                  }`}
                >
                  {active && <Check className="h-4 w-4" aria-hidden />}
                  {active ? "Selected — pick a time below" : p.cta}
                </span>
              </button>
            );
          })}
        </div>

        {/* Embedded scheduler */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-indigo/10 bg-white shadow-card">
            {calLink ? (
              <div className="h-[640px] w-full">
                <CalEmbed key={calLink} calLink={calLink} />
              </div>
            ) : (
              <SetupNotice plan={plan} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shown until the Cal.com env links are configured. */
function SetupNotice({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <AlertCircle className="h-8 w-8 text-coral" aria-hidden />
      <h3 className="text-lg font-semibold">Booking calendar not connected yet</h3>
      <p className="max-w-md text-sm text-slate/75">
        Add your Cal.com links to <span className="font-mono text-indigo">.env.local</span>{" "}
        (see <span className="font-mono text-indigo">.env.local.example</span>) and this{" "}
        {plan === "free" ? "free call" : "paid session"} scheduler will appear
        here — with Stripe checkout on the paid event.
      </p>
    </div>
  );
}
