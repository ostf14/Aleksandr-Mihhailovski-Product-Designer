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

  /**
   * Where the clip lives. Exactly one of these.
   *
   * `video` is a path under /public — full control of the player, but the
   * file has to fit in the repository. `youtube` is a video id, for clips too
   * large to commit: it costs the player's own chrome, which is a fair trade
   * for a talking head and would not have been for the game trailer.
   */
  video?: string;
  youtube?: string;
  /** Still frame, so a self-hosted clip opens on a face. YouTube has its own. */
  poster?: string;
  /** WebVTT track for a self-hosted clip. */
  captions?: string;
  /**
   * The clip can be followed in English.
   *
   * Separate from `captions` because it is a different fact. `captions` is a
   * file this site serves; this is a promise about the picture — subtitles
   * burned in by whoever cut the clip, or YouTube's own track, neither of
   * which the page can see from here. Both end up saying ENG SUB under the
   * video, which is the only thing a visitor deciding whether to press play
   * on a Russian clip actually needs to know.
   */
  subtitled?: boolean;

  /** Spoken language. */
  lang: "ru" | "en";
  /**
   * Human-readable, e.g. "1:12", so nobody presses play blind. Optional for a
   * YouTube clip, whose player prints it on the thumbnail already.
   */
  duration?: string;
};

/**
 * Both clips are on YouTube rather than in the repository.
 *
 * Not the first choice — a self-hosted file gives the player no chrome but
 * ours. It was the right one anyway: the source files are already efficiently
 * compressed (re-exporting one at 720p made it THREE TIMES larger, which is
 * what an already-well-compressed file does when a consumer tool re-encodes it
 * at a fixed bitrate), so there was no honest way to get them small enough to
 * commit, and video in git is permanent weight in every future clone.
 *
 * A talking head can afford the YouTube frame in a way the game trailer could
 * not: the clip IS the content here, where there it sat at the top of a page
 * that had to look like ours.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "pavel",
    name: "Pavel",
    role: "Internet marketer",
    about: "Logo design and redesign for his client",
    youtube: "TD6DtHNmPFs",
    lang: "ru",
    subtitled: true,
  },
  {
    id: "oksana",
    name: "Oksana Stanevich",
    role: "MD, infectious disease physician and researcher",
    about: "Positioning, copy and design for her consultation service",
    work: "med-consultations",
    youtube: "Hxc1L59B7A4",
    lang: "ru",
    subtitled: true,
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
  return TESTIMONIALS.filter(
    (t) =>
      t.youtube ||
      (t.video && fs.existsSync(path.join(process.cwd(), "public", t.video))),
  );
}
