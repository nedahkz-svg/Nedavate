import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { brand } from "@/lib/content";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const title = `${brand.name} — Intelligent learning. Measurable transformation.`;
const description =
  "Instructional design + AI learning consultant. AI-powered, performance-driven training your employees will actually transfer to their work.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title,
  description,
  keywords: [
    "instructional design",
    "AI learning consultant",
    "eLearning",
    "Articulate Storyline",
    "Rise",
    "gamification",
    "AI agents",
    "workforce upskilling",
  ],
  openGraph: {
    title,
    description,
    url: `https://${brand.domain}`,
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
