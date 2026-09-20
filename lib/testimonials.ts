import fs from "node:fs";
import path from "node:path";

/**
 * Video testimonials.
 *
 * One registry feeding two surfaces: the /testimonials page lists all of
 * them, and a case page pulls its own with `testimonialsForWork(slug)` —
 * the same shape `moreCases` uses in lib/works.ts, so a clip never has to
 * be declared twice.
 *
 * The clips are vertical (9:16) and carry their own animated credits from
 * the speaker's social profile. That framing is deliberate: it is what
 * shows a viewer these are real, findable people rather than invented
 * quotes, so the page never crops or covers it.
 */

export type Testimonial = {
  id: string;

  /** Speaker, as it should read under the video. */
  name: string;
  /** One line: what they do, and where. */
  role: string;

  /**
   * One line: what was done FOR them, in the site's own first-person voice.
   *
   * Without it a clip is a pleasant person saying pleasant things with no
   * stated occasion — the viewer never learns what the work was. `work` below
   * covers the case where there is a case page to link to; this covers the
   * far more common one where there is not.
   */
  about: string;

  /**
   * Slug from lib/works.ts when the clip is about a specific project.
   * Drives both the link under the video and which case page embeds it.
   */
  work?: string;

  /** Paths under /public. */
  video: string;
  /** Still frame, so the page shows a face rather than a black rectangle. */
  poster?: string;
  /** WebVTT track. Required whenever `lang` is not English. */
  captions?: string;

  /** Spoken language. */
  lang: "ru" | "en";
  /** Human-readable, e.g. "1:12". Shown so nobody presses play blind. */
  duration: string;
};

/**
 * Both clips exist — they live in the owner's Drive — but a Drive iframe puts
 * Google's player chrome in the middle of the page and cannot autoplay, so
 * they are self-hosted like every other video here.
 *
 * The files are NOT in the repository yet. Nothing breaks meanwhile:
 * `availableTestimonials()` below asks the filesystem which ones are actually
 * present, and a section with none renders a placeholder instead of two
 * players pointing at 404s. Drop the files at the paths named here and they
 * appear — no code to change.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "pavel",
    name: "Pavel",
    role: "Internet marketer",
    about: "Logo design and redesign for his client",
    video: "/testimonials/pavel.mp4",
    poster: "/testimonials/pavel.jpg",
    lang: "ru",
    duration: "TODO",
  },
  {
    id: "oksana",
    name: "Oksana Stanevich",
    role: "Researcher, public health",
    about:
      "Productised the consultation service and designed the session cards",
    video: "/testimonials/oksana.mp4",
    poster: "/testimonials/oksana.jpg",
    lang: "ru",
    duration: "TODO",
  },
];

// ---- Selectors -------------------------------------------------------------

export const getTestimonial = (id: string): Testimonial | undefined =>
  TESTIMONIALS.find((t) => t.id === id);

/** Every clip recorded about a given work. */
export const testimonialsForWork = (slug: string): Testimonial[] =>
  TESTIMONIALS.filter((t) => t.work === slug);

// ---- Availability (server only) --------------------------------------------

/**
 * The clips whose files are actually on disk.
 *
 * Imports `node:fs`, so server components only — which every caller is.
 *
 * This exists so a registry entry can be written before its file arrives. The
 * alternative was to leave the registry empty and edit two files when the
 * videos land; this way the video landing IS the edit. The poster is optional
 * for the same reason: a clip plays fine without one, it just opens on a dark
 * frame instead of a face.
 */
export function availableTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) =>
    fs.existsSync(path.join(process.cwd(), "public", t.video)),
  );
}
