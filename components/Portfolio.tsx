import { Reveal } from "./Reveal";
import { projects } from "@/lib/content";

export function Portfolio() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mono-label text-teal">Selected work</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Training that changed how teams work.
            </h2>
            <p className="mt-4 text-lg text-slate/80">
              Problem, build, result — the only three things that matter.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-indigo/10 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                {/* Case-study image placeholder — swap for a real screenshot */}
                <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-indigo/90 to-slate">
                  <span className="font-mono text-xs uppercase tracking-widest text-warm-white/50">
                    Project image
                  </span>
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-white/15 px-2 py-0.5 font-mono text-[10px] text-warm-white backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-steel">
                    {p.client}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    {p.title}
                  </h3>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-coral">
                        Problem
                      </dt>
                      <dd className="mt-1 text-slate/75">{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-teal">
                        Build
                      </dt>
                      <dd className="mt-1 text-slate/75">{p.build}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-indigo">
                        Result
                      </dt>
                      <dd className="mt-1 font-medium text-slate">{p.result}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center font-mono text-xs text-steel">
            {/* Note for Neda — remove once real projects are in. */}
            ⓘ These are placeholder case studies. Replace them in{" "}
            <span className="text-indigo">lib/content.ts</span> with your real
            projects and screenshots.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
