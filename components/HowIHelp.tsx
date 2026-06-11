import { Reveal } from "./Reveal";
import { howIHelp } from "@/lib/content";

export function HowIHelp() {
  return (
    <section id="how" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mono-label text-teal">The process</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{howIHelp.heading}</h2>
            <p className="mt-4 text-lg text-slate/80">{howIHelp.intro}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howIHelp.steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl bg-warm-white p-6">
                <span className="font-mono text-sm font-medium text-teal">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate/75">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
