import { Reveal } from "./Reveal";
import { usp } from "@/lib/content";

/**
 * The single most important promise. Indigo background with a Coral accent —
 * Coral stays under ~10% of the design, used here only on the rule + quote mark.
 */
export function UspBand() {
  return (
    <section className="bg-indigo py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-display text-5xl leading-none text-coral">
              &ldquo;
            </span>
            <p className="mt-2 font-display text-2xl font-semibold leading-snug text-warm-white sm:text-3xl lg:text-4xl">
              {usp.text}
            </p>
            <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-coral" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
