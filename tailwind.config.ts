import type { Config } from "tailwindcss";

/**
 * Nedavate brand design tokens — sourced directly from the Brand Guide v1.0.
 * Deep Indigo dominates. Catalyst Teal is the action colour (all CTAs/links/hover).
 * Performance Coral is the energiser — reserved for USP callouts/stats (max ~10%).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#2D2A6E", // Deep Indigo — primary
          deep: "#2D2A6E",
        },
        teal: {
          DEFAULT: "#0F9E78", // Catalyst Teal — secondary / CTAs
          dark: "#0B7D5F",
        },
        coral: {
          DEFAULT: "#E8601A", // Performance Coral — energiser (use sparingly)
        },
        slate: {
          DEFAULT: "#1A1A2E", // Deep Slate — body text / dark backgrounds
        },
        warm: {
          white: "#F5F4F0", // Warm White — page / card backgrounds
        },
        steel: {
          DEFAULT: "#7B8FA6", // Steel Gray — captions / labels / dividers
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,26,46,0.04), 0 8px 24px rgba(45,42,110,0.06)",
        "card-hover":
          "0 2px 4px rgba(26,26,46,0.06), 0 16px 40px rgba(45,42,110,0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
