import type { Metadata } from "next";
import { pageMetadata } from "./site";

export type Discipline = "product" | "graphic" | "engineering";
export type WorkKind = "case" | "gallery";

export type Cover =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type Work = {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  org: string;
  year?: string;
  kind: WorkKind;
  disciplines: Discipline[];
  cover: Cover;
  href?: string;
  metaTitle?: string;
  metaDescription?: string;
};

/**
 * Ordered registry of every case study and gallery on the site.
 * Card lists, metadata builders, and future discipline filters all read
 * from here — adding a new piece of work is one entry.
 */
export const WORKS: Work[] = [
  {
    slug: "3d-puzzle",
    title: "3D Museum Puzzle",
    blurb:
      "Applied to a casual game studio, got rejected, built a working 3D puzzle prototype instead.",
    role: "Design Engineer",
    org: "Self-initiated",
    kind: "case",
    disciplines: ["engineering", "product"],
    cover: {
      type: "video",
      src: "/demo-card.mp4",
      alt: "3D museum puzzle prototype in motion",
    },
  },
  {
    slug: "remargin",
    title: "ReMargin",
    blurb:
      "I wanted a reader where annotations matter as much as the text. Built one.",
    role: "Design Engineer",
    org: "Self-initiated",
    kind: "case",
    disciplines: ["engineering", "product"],
    cover: {
      type: "image",
      src: "/Hero.png",
      alt: "ReMargin reader — margin notes connected to highlighted text",
    },
  },
  {
    slug: "push-notifications",
    title: "Push Notifications",
    blurb: "How to kill the send button nobody wanted to press",
    role: "Product Designer",
    org: "Seamm",
    kind: "case",
    disciplines: ["product"],
    cover: {
      type: "image",
      src: "https://framerusercontent.com/images/SFAsDo6PF9csTgqHwlukYwNxpSQ.png",
      alt: "Push Notifications manager UI",
    },
    metaTitle: "Push Notifications Manager",
    metaDescription:
      "How to kill the send button nobody wanted to press — a self-serve push campaign manager at Seamm.",
  },
  {
    slug: "multi-agent-workflow",
    title: "Multi-Agent AI Workflow",
    blurb:
      "I built a 10× prototyping workflow using AI agents — and what it taught me about product design",
    role: "Solo Builder",
    org: "Internal R&D",
    kind: "case",
    disciplines: ["engineering", "product"],
    cover: {
      type: "image",
      src: "/cases/multi-agent-workflow/cover.jpg",
      alt: "Multi-agent AI workflow — orchestrated prototyping pipeline",
    },
    metaDescription:
      "I built an AI-orchestrated prototyping pipeline — and what it taught me about product design.",
  },
  {
    slug: "stories-editor",
    title: "Stories Editor",
    blurb: "How I eliminated a 2-day content publishing bottleneck",
    role: "Product Designer",
    org: "Seamm",
    kind: "case",
    disciplines: ["product"],
    cover: {
      type: "image",
      src: "https://framerusercontent.com/images/WqXrVnU46HVuCSUfhEXwfBQyw.png",
      alt: "Stories editor UI",
    },
    metaDescription:
      "How I eliminated a 2-day content publishing bottleneck with a self-serve stories editor at Seamm.",
  },
  {
    slug: "chtenye",
    title: "Educational Platform Redesign",
    blurb: "Users couldn’t explain what a single menu item meant",
    role: "Product Designer",
    org: "Chtenye",
    kind: "case",
    disciplines: ["product"],
    cover: {
      type: "image",
      src: "https://framerusercontent.com/images/aMajMUWlnqMZzKjWE2RnsGDhKo.jpg",
      alt: "Chtenye educational platform — redesigned navigation",
    },
    metaTitle: "Chtenye — Educational Platform Redesign",
    metaDescription:
      "Information architecture and platform redesign for an edtech product users found impossible to navigate.",
  },
  {
    slug: "my-sleeping-gypsy",
    title: "My Sleeping Gypsy",
    blurb:
      "How to sell heritage craftsmanship without looking like fast fashion",
    role: "Web Designer",
    org: "Freelance",
    kind: "case",
    disciplines: ["product", "graphic"],
    cover: {
      type: "image",
      src: "/cases/msg/cover.png",
      alt: "My Sleeping Gypsy — heritage linen brand e-commerce",
    },
    metaDescription:
      "Selling heritage craftsmanship without looking like fast fashion — e-commerce redesign for a linen brand.",
  },
  {
    slug: "other",
    title: "Other website design works",
    blurb:
      "A selection of websites and landing pages I’ve designed over the years.",
    role: "Gallery",
    org: "2018–24",
    year: "2018–24",
    kind: "gallery",
    disciplines: ["product"],
    cover: {
      type: "image",
      src: "/cases/gallery/seamm-homepage.jpg",
      alt: "Website design works gallery cover",
    },
    href: "/other",
  },
];

// ---- Selectors -------------------------------------------------------------

export const cases = WORKS.filter((w) => w.kind === "case");
export const galleries = WORKS.filter((w) => w.kind === "gallery");

export const getWork = (slug: string): Work | undefined =>
  WORKS.find((w) => w.slug === slug);

export const byDiscipline = (d: Discipline): Work[] =>
  WORKS.filter((w) => w.disciplines.includes(d));

/**
 * Every case except `slug` (used to power the "More cases" section at the
 * bottom of each case page). Slice with `n` when a shortlist is wanted;
 * default is the full remainder to match the existing MoreCases behavior.
 */
export const moreCases = (slug: string, n = cases.length): Work[] =>
  cases.filter((w) => w.slug !== slug).slice(0, n);

/**
 * Canonical route for a work. Explicit `href` wins (used by the "other"
 * gallery which lives at /other, not /case/other); otherwise cases go to
 * /case/<slug> and galleries to /<slug>.
 */
export const workHref = (w: Work): string =>
  w.href ?? (w.kind === "gallery" ? `/${w.slug}` : `/case/${w.slug}`);

// ---- Metadata --------------------------------------------------------------

/**
 * Build a Next Metadata object for a work by slug. Wraps pageMetadata so
 * per-page files stay one-liners (`export const metadata = workMetadata("remargin")`)
 * and the OG title/description come from the same registry as the cards.
 */
export function workMetadata(slug: string): Metadata {
  const w = getWork(slug);
  if (!w) {
    throw new Error(`workMetadata: no work registered for slug "${slug}"`);
  }
  return pageMetadata({
    title: w.metaTitle ?? w.title,
    description: w.metaDescription ?? w.blurb,
    path: workHref(w),
  });
}
