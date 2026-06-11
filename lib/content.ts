/**
 * ────────────────────────────────────────────────────────────────────────────
 *  NEDAVATE — single source of truth for all site copy.
 *  Edit text here; the components read from it. No need to touch JSX.
 *  Copy follows the Brand Guide voice: lead with the problem, speak in
 *  outcomes, talk to "you", no forbidden buzzwords.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  name: "Nedavate",
  tagline: "Intelligent learning. Measurable transformation.",
  taglineSecondary: "AI-powered learning. Human results.",
  domain: "transformiq.co",
  email: "hello@transformiq.co", // ← swap for your real email
  social: {
    linkedin: "https://www.linkedin.com/", // ← add your LinkedIn URL
    instagram: "https://www.instagram.com/", // ← add your Instagram URL
    twitter: "https://x.com/", // ← add your X/Twitter URL
  },
};

/** Toggle sections on/off without deleting code. */
export const features = {
  testimonials: false, // flip to true once you have real quotes
  leadMagnet: true, // the "AI Training Readiness Checklist" email capture
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How I help", href: "#how" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

export const hero = {
  eyebrow: "Instructional Design + AI Learning Consultant",
  // Problem-led headline aimed at startups & corporate L&D (priority audiences).
  headline: "Your team is growing faster than your training can keep up.",
  subhead:
    "Bad training is expensive — high turnover, slow onboarding, and courses people click through and forget. I design AI-powered, performance-driven learning your people will actually transfer to their work.",
  primaryCta: { label: "Book a free strategy call", href: "#book" },
  secondaryCta: { label: "See what I build", href: "#services" },
  // Quick proof stats — keep to 2–3, edit to real numbers when you have them.
  stats: [
    { value: "3 wks", label: "Onboarding, not 8" },
    { value: "7", label: "AI-enhanced services" },
    { value: "1 expert", label: "Strategy to SCORM" },
  ],
};

/** Coral-accented USP band — the single most important promise. */
export const usp = {
  text: "AI-powered, performance-driven training your employees will actually transfer to their work.",
};

export type Service = {
  title: string;
  description: string;
  tags: string[];
};

/** The 7 offerings, ordered to lead with what startups & L&D buy first. */
export const services: Service[] = [
  {
    title: "AI-Enhanced eLearning Design & Development",
    description:
      "End-to-end course builds using AI-assisted authoring and smart tools. Delivered in Articulate Storyline & Rise, SCORM/xAPI ready.",
    tags: ["Storyline", "Rise", "SCORM", "AI authoring"],
  },
  {
    title: "Training Modules & Learning Pathways",
    description:
      "Structured onboarding, compliance, and leadership programs built on ADDIE & SAM — enhanced with AI-generated content.",
    tags: ["Onboarding", "Compliance", "Leadership", "ADDIE", "SAM"],
  },
  {
    title: "Personalised Learning Experiences",
    description:
      "AI-driven pathways that adapt to each learner's role, pace, and knowledge gaps — so every person gets the most relevant training.",
    tags: ["Adaptive learning", "Role-based", "Personalisation"],
  },
  {
    title: "AI Agents & Workflow Automation",
    description:
      "Custom AI agents and automated workflows — from onboarding bots to knowledge assistants — so your team focuses on what matters.",
    tags: ["AI agents", "Automation", "Workflow design", "Integration"],
  },
  {
    title: "Gamification & Interactive Learning",
    description:
      "AI-powered game mechanics, branching scenarios, and simulations that adapt to learner behaviour — making training feel less like work.",
    tags: ["Branching scenarios", "Simulations", "Badges", "Rewards"],
  },
  {
    title: "AI Readiness & Workforce Upskilling",
    description:
      "Help your people understand, adopt, and embed AI tools through practical training, awareness programs, and change support.",
    tags: ["AI awareness", "Tool adoption", "Change management"],
  },
  {
    title: "Educational Resources & Training Materials",
    description:
      "AI-assisted design of workbooks, facilitator guides, job aids, and infographics — faster turnaround, higher quality.",
    tags: ["Workbooks", "Job aids", "Facilitator guides", "Infographics"],
  },
];

export const howIHelp = {
  heading: "How we work together",
  intro:
    "No fluff, no filler. A clear path from your problem to results your team can feel.",
  steps: [
    {
      step: "01",
      title: "Diagnose",
      body: "We start with the problem, not the course. What's broken — onboarding, compliance, performance — and what should change?",
    },
    {
      step: "02",
      title: "Design",
      body: "I map the learning to real outcomes and build it with AI-assisted tools — fast, on-brand, and built to scale.",
    },
    {
      step: "03",
      title: "Build & deliver",
      body: "Storyline, Rise, SCORM/xAPI, AI agents — delivered ready to drop into your LMS or workflow.",
    },
    {
      step: "04",
      title: "Measure",
      body: "Success isn't completion. We track what improved — faster onboarding, fewer mistakes, people who stay.",
    },
  ],
};

export type Project = {
  title: string;
  client: string;
  problem: string;
  build: string;
  result: string;
  tags: string[];
};

/**
 * PLACEHOLDER case studies — replace with your real projects.
 * Keep the problem → build → result structure; it's what wins project clients.
 */
export const projects: Project[] = [
  {
    title: "Onboarding rebuilt for a scaling startup",
    client: "Series-A SaaS startup · {{PLACEHOLDER}}",
    problem:
      "New hires took 8 weeks to get productive and early turnover was high. There was no L&D function internally.",
    build:
      "A role-based onboarding pathway in Rise with AI-generated knowledge checks and an onboarding assistant bot.",
    result:
      "Time-to-productive cut to ~3 weeks and a reusable onboarding system the team owns. {{REPLACE WITH REAL NUMBERS}}",
    tags: ["Rise", "Onboarding", "AI agent"],
  },
  {
    title: "Compliance training people actually finish",
    client: "Mid-size corporate L&D team · {{PLACEHOLDER}}",
    problem:
      "Annual compliance modules were long, ignored, and completed at the last minute with little retention.",
    build:
      "Scenario-based Storyline modules with branching decisions and adaptive remediation, SCORM-ready for the LMS.",
    result:
      "Higher completion and stronger knowledge-check scores, delivered on a tight freelance timeline. {{REPLACE}}",
    tags: ["Storyline", "Compliance", "Branching"],
  },
  {
    title: "Turning a coach's expertise into a course",
    client: "Executive coach · {{PLACEHOLDER}}",
    problem:
      "Deep subject expertise, but no way to package it into a polished, sellable eLearning product.",
    build:
      "A full course design — storyboard to published Rise build — with gamified milestones and downloadable workbooks.",
    result:
      "A productised course ready to sell and license, built collaboratively from existing material. {{REPLACE}}",
    tags: ["Course design", "Gamification", "Workbooks"],
  },
];

export const about = {
  heading: "About me",
  // {{ABOUT_PLACEHOLDER}} — Neda will replace this with her real bio.
  lead:
    "{{ABOUT_PLACEHOLDER}} — I'm a university curriculum developer turned instructional designer and AI learning consultant.",
  body: [
    "{{ABOUT_PLACEHOLDER}} Write 2–3 short paragraphs here. Lead with what you do for clients, then your background (eLearning, gamification, AI integration), then why you care. Keep it direct and human — talk to one person, not a crowd.",
    "{{ABOUT_PLACEHOLDER}} Mention the kinds of organisations you've worked with and the results you've driven. Cite a real number or timeline if you can — it builds trust faster than adjectives.",
  ],
  highlights: [
    "University curriculum developer",
    "Articulate Storyline & Rise",
    "Gamification & simulations",
    "AI agents & automation",
  ],
};

export const booking = {
  heading: "Let's talk",
  intro:
    "Ready to stop wasting budget on training that doesn't stick? Start with a free call — no pitch, just a clear read on what would move the needle for your team.",
  free: {
    name: "Free Strategy Call",
    duration: "20 min",
    price: "Free",
    description:
      "A focused conversation about your onboarding, training, or AI goals. You'll leave with at least one concrete idea you can use — whether we work together or not.",
    cta: "Book the free call",
  },
  paid: {
    name: "AI Strategy Session",
    duration: "60 min",
    price: "$150", // ← finalize your price here (and in Cal.com/Stripe)
    description:
      "A deep-dive working session. We map your highest-impact learning or AI opportunity and leave you with a concrete, prioritised action plan you can run with.",
    cta: "Book a paid session",
  },
};

/**
 * Lead magnet — gated download to capture visitors who aren't ready to book.
 * Shown only when features.leadMagnet === true. The form posts to /api/subscribe.
 */
export const leadMagnet = {
  eyebrow: "Free download",
  heading: "Is your team actually ready for AI-powered training?",
  subhead:
    "Most training fails before it starts. This checklist shows you exactly where your onboarding, compliance, and upskilling stand — and the fastest fixes that move the needle.",
  // What's inside — keep punchy, outcome-led.
  bullets: [
    "10 checks across onboarding, compliance & upskilling",
    "Spot the gaps costing you turnover and time",
    "A simple score + the first 3 things to fix",
  ],
  emailPlaceholder: "you@company.com",
  namePlaceholder: "First name (optional)",
  cta: "Send me the checklist",
  // File served from /public. Replace with your own branded PDF when ready.
  downloadHref: "/ai-training-readiness-checklist.html",
  successHeading: "Check complete — your checklist is ready.",
  successBody:
    "It's open and ready below. I'll also follow up with one idea tailored to teams like yours.",
  successCta: "Open the checklist",
  privacyNote: "No spam. Unsubscribe anytime.",
};

export const finalCta = {
  heading: "The future of learning is here.",
  body: "No fluff. No filler. Just intelligent learning that moves the needle.",
  cta: { label: "Book your free strategy call", href: "#book" },
};

/** Shown only when features.testimonials === true. Add real quotes here. */
export type Testimonial = { quote: string; name: string; role: string };
export const testimonials: Testimonial[] = [
  // {
  //   quote: "Neda rebuilt our onboarding and cut ramp time in half.",
  //   name: "Sarah Chen",
  //   role: "Co-founder & COO",
  // },
];
