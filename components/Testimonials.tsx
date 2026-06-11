import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { testimonials, features } from "@/lib/content";

/**
 * Hidden until `features.testimonials` is true AND there is at least one quote.
 * Add quotes in lib/content.ts, then flip the flag.
 */
export function Testimonials() {
  if (!features.testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mono-label text-teal">In their words</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Results clients can feel.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.05}>
              <figure className="flex h-full flex-col rounded-2xl border border-indigo/10 bg-warm-white p-6">
                <Quote className="h-6 w-6 text-teal" aria-hidden />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold text-indigo">{t.name}</div>
                  <div className="text-sm text-steel">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
