import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * A numbered series with prev/next navigation.
 *
 * The lecture course is the first one; the game devlog is the second and
 * reuses this shape verbatim — a second `Series` object with its own
 * `basePath` and `contentDir` is the whole of it. Everything below the type
 * definitions is parameterised by the series, so nothing needs copying.
 */
export type SeriesEntry = {
  slug: string;
  number: number;
  title: string;
  /** ISO 8601, e.g. "2026-03-14". */
  date: string;
  description: string;
  /** Human-facing, already localised, e.g. "12 мин". */
  readingTime: string;
  /**
   * Which languages this entry exists in. Every lecture is Russian-only for
   * now, so this reads as a constant — but it is the field a future language
   * switcher checks to decide whether a translation exists and where to point.
   */
  locales: string[];
};

export type Series = {
  id: string;
  /** Route prefix; entry URLs are `${basePath}/${slug}`. */
  basePath: string;
  /** Directory holding the MDX bodies, relative to the repo root. */
  contentDir: string;
  entries: SeriesEntry[];
};

// ---- Data ------------------------------------------------------------------

export const LECTURES: Series = {
  id: "lectures",
  basePath: "/ru/lectures",
  contentDir: "content/lectures",
  entries: [
    {
      slug: "lecture-1",
      number: 1,
      title: "TODO: заголовок лекции 1",
      date: "2026-01-01",
      description: "TODO: описание лекции 1",
      readingTime: "TODO",
      locales: ["ru"],
    },
    {
      slug: "lecture-2",
      number: 2,
      title: "TODO: заголовок лекции 2",
      date: "2026-01-01",
      description: "TODO: описание лекции 2",
      readingTime: "TODO",
      locales: ["ru"],
    },
    {
      slug: "lecture-3",
      number: 3,
      title: "TODO: заголовок лекции 3",
      date: "2026-01-01",
      description: "TODO: описание лекции 3",
      readingTime: "TODO",
      locales: ["ru"],
    },
    {
      slug: "lecture-4",
      number: 4,
      title: "TODO: заголовок лекции 4",
      date: "2026-01-01",
      description: "TODO: описание лекции 4",
      readingTime: "TODO",
      locales: ["ru"],
    },
  ],
};

// ---- Selectors -------------------------------------------------------------

/** Entries in reading order, regardless of how the array was written. */
export const orderedEntries = (series: Series): SeriesEntry[] =>
  [...series.entries].sort((a, b) => a.number - b.number);

export const getEntry = (
  series: Series,
  slug: string,
): SeriesEntry | undefined => series.entries.find((e) => e.slug === slug);

export const entryHref = (series: Series, entry: SeriesEntry): string =>
  `${series.basePath}/${entry.slug}`;

export const prevEntry = (
  series: Series,
  slug: string,
): SeriesEntry | undefined => {
  const ordered = orderedEntries(series);
  const i = ordered.findIndex((e) => e.slug === slug);
  return i > 0 ? ordered[i - 1] : undefined;
};

export const nextEntry = (
  series: Series,
  slug: string,
): SeriesEntry | undefined => {
  const ordered = orderedEntries(series);
  const i = ordered.findIndex((e) => e.slug === slug);
  return i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : undefined;
};

// ---- Content loading (server only) -----------------------------------------

/**
 * Reads an entry's MDX body off disk.
 *
 * The registry above stays the single source of truth for everything the site
 * chrome needs — ordering, prev/next, metadata. Frontmatter carries the same
 * fields so a file is self-describing when opened on its own, and this loader
 * throws when the two disagree rather than letting an index and a page quietly
 * show different titles.
 *
 * Imports `node:fs`, so it must only ever be called from a server component.
 */
export function loadEntryBody(series: Series, entry: SeriesEntry): string {
  const file = path.join(
    process.cwd(),
    series.contentDir,
    `${entry.slug}.mdx`,
  );
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  if (typeof data.number === "number" && data.number !== entry.number) {
    throw new Error(
      `${series.contentDir}/${entry.slug}.mdx: frontmatter number ${data.number} does not match registry number ${entry.number}`,
    );
  }
  if (typeof data.title === "string" && data.title !== entry.title) {
    throw new Error(
      `${series.contentDir}/${entry.slug}.mdx: frontmatter title "${data.title}" does not match registry title "${entry.title}"`,
    );
  }

  return content;
}
