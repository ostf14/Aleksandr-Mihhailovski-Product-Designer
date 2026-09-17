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
   * Slug from lib/works.ts when the clip is about a specific project.
   * Drives both the link under the video and which case page embeds it.
   */
  work?: string;

  /** Paths under /public. */
  video: string;
  /** Still frame, so the page shows a face rather than a black rectangle. */
  poster: string;
  /** WebVTT track. Required whenever `lang` is not English. */
  captions?: string;

  /** Spoken language. */
  lang: "ru" | "en";
  /** Human-readable, e.g. "1:12". Shown so nobody presses play blind. */
  duration: string;
};

/**
 * Empty until the files land. The page renders a placeholder rather than
 * invented filler while this is empty, so the hole stays countable by eye.
 *
 * Coming: Oksana Stanevich (researcher, public health) and Pavel (internet
 * marketer), both speaking Russian, plus a third clip later.
 */
export const TESTIMONIALS: Testimonial[] = [];

// ---- Selectors -------------------------------------------------------------

export const getTestimonial = (id: string): Testimonial | undefined =>
  TESTIMONIALS.find((t) => t.id === id);

/** Every clip recorded about a given work. */
export const testimonialsForWork = (slug: string): Testimonial[] =>
  TESTIMONIALS.filter((t) => t.work === slug);
