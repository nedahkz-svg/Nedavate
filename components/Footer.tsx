import { Linkedin, Instagram, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { nav, brand } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate text-warm-white/80">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs font-display text-lg text-warm-white">
              {brand.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm text-warm-white/60">
              Instructional design &amp; AI learning consultancy. AI-powered,
              performance-driven training your team will actually use.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="mono-label text-warm-white/50">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-teal">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#book" className="hover:text-teal">
                  Book a call
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="mono-label text-warm-white/50">Get in touch</h3>
            <a
              href={`mailto:${brand.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-teal"
            >
              <Mail className="h-4 w-4" aria-hidden /> {brand.email}
            </a>
            <div className="mt-5 flex gap-3">
              <a
                href={brand.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-teal hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-teal hover:text-white"
              >
                <Instagram className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-warm-white/50 sm:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="font-mono">{brand.domain}</p>
        </div>
      </div>
    </footer>
  );
}
