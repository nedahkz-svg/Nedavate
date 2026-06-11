import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        {/* Deep Work / In Flow portrait placeholder */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate to-indigo shadow-card-hover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 p-6 text-center">
                <p className="font-display text-lg font-semibold text-warm-white">
                  Your photo here
                </p>
                <p className="mt-2 font-mono text-xs leading-relaxed text-warm-white/60">
                  Deep Work / In Flow — at your laptop, teal screen glow, genuine
                  focus. Drop your image at /public/about.jpg
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <p className="mono-label text-teal">Who you&rsquo;re working with</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{about.heading}</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-slate">
              {about.lead}
            </p>
            {about.body.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-slate/80">
                {para}
              </p>
            ))}

            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-slate">
                  <Check className="h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
