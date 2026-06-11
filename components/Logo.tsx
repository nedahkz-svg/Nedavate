/**
 * Placeholder Nedavate logo: an infinity loop with neural-network nodes
 * (per the Brand Guide concept). Replace `/public/logo.svg` and swap this
 * for an <Image> when you have the official logo files.
 */
export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const wordColor = variant === "light" ? "#F5F4F0" : "#2D2A6E";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="22"
        viewBox="0 0 68 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* infinity loop */}
        <path
          d="M22 22c0-7-5-13-11-13S0 15 0 22s5 13 11 13 11-6 11-13Zm0 0c0 7 5 13 11 13s11-6 11-13-5-13-11-13-11 6-11 13Z"
          transform="translate(11 0)"
          stroke="#0F9E78"
          strokeWidth="3"
          fill="none"
        />
        {/* neural nodes */}
        <circle cx="22" cy="22" r="3.4" fill="#2D2A6E" />
        <circle cx="44" cy="22" r="3.4" fill="#E8601A" />
        <circle cx="11" cy="22" r="2.4" fill="#0F9E78" />
        <circle cx="55" cy="22" r="2.4" fill="#0F9E78" />
      </svg>
      <span
        className="font-display text-xl font-bold tracking-tight"
        style={{ color: wordColor }}
      >
        Nedavate
      </span>
    </span>
  );
}
