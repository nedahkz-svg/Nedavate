import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { hero, brand } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-warm-white pt-28 sm:pt-32">
      {/* soft brand glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[360px] w-[360px] rounded-full bg-indigo/10 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-12 pb-20 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mono-label mb-5 text-teal">{hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate/80">
              {hero.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} withArrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mono-label mt-6 text-steel">
              {brand.taglineSecondary}
            </p>
          </Reveal>
        </div>

        {/* Authority Portrait placeholder (4:5, per Brand Guide photography). */}
        <div className="lg:col-span-5">
          <Reveal delay={0.12}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo to-slate shadow-card-hover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/20 text-2xl font-display font-bold text-teal">
                  N
                </div>
                <p className="font-display text-lg font-semibold text-warm-white">
                  Your photo here
                </p>
                <p className="mt-2 font-mono text-xs leading-relaxed text-warm-white/60">
                  Authority Portrait — direct-to-camera, soft side light, slight
                  forward lean. Drop your image at /public/portrait.jpg
                </p>
              </div>
              {/* coral accent chip (sparingly used) */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-coral px-4 py-3 shadow-card">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-white">
                  Nedavate
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Proof stats strip */}
      <div className="border-y border-indigo/10 bg-white/40">
        <div className="container-page grid grid-cols-3 divide-x divide-indigo/10">
          {hero.stats.map((s) => (
            <div key={s.label} className="px-2 py-6 text-center sm:py-8">
              <div className="font-mono text-2xl font-medium text-indigo sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-steel sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
