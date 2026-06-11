import {
  GraduationCap,
  Route,
  UserCog,
  Bot,
  Gamepad2,
  Rocket,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { services } from "@/lib/content";

const icons: LucideIcon[] = [
  GraduationCap, // AI-Enhanced eLearning
  Route, // Training Modules & Pathways
  UserCog, // Personalised Learning
  Bot, // AI Agents & Automation
  Gamepad2, // Gamification
  Rocket, // AI Readiness & Upskilling
  FileText, // Educational Resources
];

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mono-label text-teal">What I build</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Seven AI-enhanced services. One promise.
            </h2>
            <p className="mt-4 text-lg text-slate/80">
              Every service connects to the same outcome: training your people
              will actually transfer to their work — not just click through.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[i] ?? GraduationCap;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.05}>
                <article className="group flex h-full flex-col rounded-2xl border border-indigo/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-teal/30 hover:shadow-card-hover">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate/75">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md bg-warm-white px-2 py-1 font-mono text-[11px] tracking-wide text-steel"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
