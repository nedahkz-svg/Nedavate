"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { NavHeader } from "./ui/nav-header";
import { nav } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-indigo/10 bg-warm-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page relative flex h-16 items-center justify-between">
        <Link href="#top" className="focus-ring rounded-md" aria-label="Nedavate home">
          <Logo />
        </Link>

        {/* Animated sliding-pill nav, centered. Links sourced from lib/content.ts. */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <NavHeader items={nav} />
        </div>

        <div className="hidden md:block">
          <Button href="#book" withArrow>
            Book a call
          </Button>
        </div>

        <button
          className="focus-ring rounded-md p-2 text-indigo md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-indigo/10 bg-warm-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate hover:bg-indigo/5 hover:text-teal"
              >
                {item.label}
              </Link>
            ))}
            <Button href="#book" className="mt-2 w-full" withArrow>
              Book a call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
