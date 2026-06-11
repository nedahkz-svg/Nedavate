import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="bg-slate py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl text-warm-white sm:text-4xl lg:text-5xl">
              {finalCta.heading}
            </h2>
            <p className="mt-5 text-lg text-warm-white/70">{finalCta.body}</p>
            <div className="mt-8 flex justify-center">
              <Button href={finalCta.cta.href} withArrow>
                {finalCta.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
