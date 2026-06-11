import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-200 focus-ring disabled:opacity-60";

const sizes = "px-6 py-3 text-base";

const variants: Record<Variant, string> = {
  // Catalyst Teal is the action colour for all primary CTAs.
  primary:
    "bg-teal text-white shadow-card hover:bg-teal-dark hover:shadow-card-hover hover:-translate-y-0.5",
  secondary:
    "border border-indigo/20 bg-transparent text-indigo hover:border-teal hover:text-teal",
  ghost: "text-indigo hover:text-teal",
};

export function Button({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  const classes = `${base} ${sizes} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
