"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export type NavItem = { label: string; href: string };

type Position = { left: number; width: number; opacity: number };

/**
 * Animated sliding-pill nav. Adapted from a generic black/white component to the
 * Nedavate brand: a Catalyst Teal pill slides under the hovered link, the hovered
 * label turns white for contrast, others rest in slate/indigo.
 *
 * Driven by `items` (label + href) so the links stay sourced from lib/content.ts.
 */
export function NavHeader({ items }: { items: NavItem[] }) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative flex w-fit rounded-full border border-indigo/10 bg-white/70 p-1 shadow-card backdrop-blur"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab key={item.href} href={item.href} setPosition={setPosition}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  href,
  setPosition,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block"
    >
      <Link
        href={href}
        className="focus-ring block cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-slate/80 transition-colors duration-200 hover:text-white md:px-5 md:text-base"
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  // Slide horizontally via the `x` transform (animating `left` from its initial
  // `auto` value fails in framer-motion). Vertical centering is handled by the
  // static `top-1` offset that matches the list's `p-1` padding.
  return (
    <motion.li
      initial={false}
      animate={{ x: position.left, width: position.width, opacity: position.opacity }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="absolute left-0 top-1 z-0 h-9 rounded-full bg-teal md:h-10"
    />
  );
};

export default NavHeader;
