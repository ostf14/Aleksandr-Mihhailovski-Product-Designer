export type TocHeading = { id: string; text: string; level: 2 | 3 };

/**
 * Heading text -> anchor id. Unicode-aware, so Cyrillic headings keep their
 * letters instead of collapsing to empty strings.
 *
 * The MDX heading components and the table of contents both call this on the
 * same text, which is what keeps the anchors in sync without a rehype plugin.
 * Two headings with identical text therefore share an id and the anchor lands
 * on the first — predictable, and cheaper than threading a counter through
 * MDX rendering.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Pulls h2/h3 headings out of raw MDX for the table of contents.
 * Fenced code blocks are skipped so a commented `## ...` inside a sample
 * never shows up as a section.
 */
export function extractHeadings(mdx: string): TocHeading[] {
  const out: TocHeading[] = [];
  let inFence = false;

  for (const line of mdx.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;

    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "").trim();
    if (!text) continue;

    out.push({ id: slugifyHeading(text), text, level });
  }

  return out;
}
