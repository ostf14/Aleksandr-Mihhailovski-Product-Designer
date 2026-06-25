import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";
import { DesignSystemShowcase } from "./DesignSystemShowcase";

export const metadata = pageMetadata({
  title: "ReMargin",
  description:
    "I wanted a reader where annotations matter as much as the text. Built one.",
  path: "/case/remargin",
});

const toc: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "core-interaction", label: "Core interaction" },
  { id: "export", label: "Export architecture" },
  { id: "library", label: "Library" },
  { id: "technical", label: "Technical decisions" },
  { id: "design-system", label: "Design system" },
  { id: "result", label: "Result" },
];

export default function Page() {
  return (
    <>
      <Nav />
      <TableOfContents items={toc} />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          {/* Hero */}
          <header
            id="overview"
            className="scroll-mt-20 px-6 md:px-10 pt-6 md:pt-10 pb-14"
          >
            <div className="max-w-bleed mx-auto">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3">
                  Self-initiated · 2026
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  ReMargin
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  I wanted a reader where annotations matter as much as the text.
                  Built one.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="max-w-bleed mx-auto mt-10">
              <div className="border border-stone-200 bg-cream-warm rounded-lg overflow-hidden">
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0">
                  <div className="md:pr-6">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      Design Engineer
                    </p>
                  </div>

                  <div className="md:px-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Project
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      Self-initiated product
                    </p>
                  </div>

                  <div className="md:px-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Timeline
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      2026
                    </p>
                  </div>

                  <div className="md:pl-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Focus
                    </div>
                    <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                      {[
                        "Product design",
                        "Frontend engineering",
                        "Information architecture",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="inline-block size-1.5 rounded-full bg-terracotta shrink-0 mt-[7px]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-stone-200 px-6 md:px-8 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta">
                    Links
                  </span>
                  <a
                    href="https://remargin-sage.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-charcoal/90 hover:text-terracotta transition-colors"
                  >
                    Live app
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                  <a
                    href="https://github.com/ostf14/remargin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-charcoal/90 hover:text-terracotta transition-colors"
                  >
                    Source
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                </div>
              </div>
            </FadeIn>

            <div className="mt-8">
              <ImagePlaceholder
                label="ReMargin — a reader where annotations matter as much as the text"
                src="/Hero.png"
                wide
              />
            </div>
          </header>

          {/* Context */}
          <div id="context" className="scroll-mt-20 mt-16 pb-32">
            <Section kicker="01 · Context" heading="Readers handle reading, not thinking">
              <Prose>
                <p>
                  Every EPUB reader handles reading. None of them handle thinking.
                  Apple Books locks your notes. Kindle makes export painful. Moon+
                  Reader buries annotations in settings. I wanted a reader where
                  highlights and margin notes are the point — not a feature hidden
                  behind three taps.
                </p>
                <p>
                  The target user is someone who reads to write: researchers, PhD
                  students, Zettelkasten practitioners. People who need their
                  annotations to leave the app.
                </p>
              </Prose>
            </Section>
          </div>

          {/* Core interaction */}
          <div id="core-interaction" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Core interaction" heading="The margin note">
              <Prose>
                <p>
                  The margin note. Not in a sidebar, not in a popup — on the page
                  margin, connected to the highlighted text with a line. Like
                  handwriting in a physical book. Desktop only: on mobile, the margin
                  collapses and notes live in a bottom sheet.
                </p>
                <p>
                  Five highlight colors with keyboard shortcuts 1–5. No menu hunting.
                  Select text, press a number. Done.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/Core%20interaction%20-%20Desktop.png"
              label="Margin notes with connector lines on desktop"
              caption="Margin notes with connector lines on desktop — highlights with the popover color picker."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/Core%20interaction%20-%20Mob.png"
              label="Mobile bottom sheet after text selection"
              caption="Mobile bottom sheet after text selection."
            />

            <Callout className="mt-10" label="Design decision">
              Highlights have no confirmation step. The color is the action. ‘Add
              note’ is a separate explicit choice — most highlights don’t need a note,
              and forcing the dialog kills reading flow.
            </Callout>
          </div>

          {/* Export architecture */}
          <div id="export" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Export architecture" heading="Export shaped everything">
              <Prose>
                <p>
                  Every annotation exports as a standalone Markdown file with YAML
                  frontmatter: book title, author, page number, color, date. Per-book
                  zip, all-books zip. Drag into Obsidian — it just works.
                </p>
                <p>
                  This was the product requirement that shaped everything else. If
                  export is the primary output, then every annotation needs to carry
                  enough metadata to be useful outside the app.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/Export%20-%20Obsidian.png"
              label="Exported annotation as Markdown with YAML frontmatter"
              caption="Exported annotation as Markdown with YAML frontmatter."
            />
          </div>

          {/* Library */}
          <div id="library" className="scroll-mt-20 pb-32">
            <Section kicker="04 · Library" heading="Library as knowledge dashboard">
              <Prose>
                <p>
                  Two views: Grid (book cards with covers) and Notes (cross-book
                  annotation feed). The Notes view shows all highlights across all
                  books, grouped by source, with inline editing and search.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/Library%20-%20grid.png"
              label="Grid view with book cards"
              caption="Grid view with book cards."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/Library%20-%20notes.png"
              label="Notes view — cross-book annotation dashboard"
              caption="Notes view — cross-book annotation dashboard."
            />
          </div>

          {/* Technical decisions */}
          <div id="technical" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Technical decisions" heading="Technical decisions">
              <Prose>
                <p>
                  Local-first. IndexedDB for files, localStorage for metadata. No
                  server, no auth. All data stays on the device.
                </p>
                <p>
                  epub.js. rendition.on(‘selected’) fires 1 out of 20 times under
                  rapid selection. The fix: bypass epub.js events, listen on the
                  iframe document directly, convert ranges to CFI manually.
                </p>
                <p>
                  Typography. Space Grotesk for UI, Newsreader for the reading
                  surface, DM Serif Display for the logo.
                </p>
                <p>
                  AI-assisted engineering. Built with Claude Code as the primary
                  coding tool. My role: product decisions, design direction,
                  architecture, prompts, QA. Claude Code: implementation, debugging,
                  iteration. This workflow let me ship a full product solo in 10
                  days — something that would otherwise require a small team.
                </p>
              </Prose>
            </Section>
          </div>

          {/* Design system */}
          <div id="design-system" className="scroll-mt-20 pb-32">
            <Section
              kicker="06 · Design system"
              heading="Tokens, not magic numbers"
            >
              <Prose>
                <p>
                  Every color, radius, spacing value, and font-size in the
                  codebase resolves to a CSS custom property. Two themes (dark
                  with warm cream light), three type families, a 4px spacing
                  grid, and five highlight colors — all tokenized and used
                  consistently across 8 component stylesheets.
                </p>
              </Prose>
            </Section>

            <div className="mt-10">
              <DesignSystemShowcase />
            </div>
          </div>

          {/* Result */}
          <div id="result" className="scroll-mt-20 pb-32">
            <Section kicker="07 · Result" heading="Result">
              <Prose>
                <p>
                  Solo build — design, engineering, deployment. PWA installable. Two
                  demo books seeded on first visit (public domain from Project
                  Gutenberg).
                </p>
              </Prose>

              <Callout className="mt-10" label="Key insight">
                PDF support was built, shipped, and removed. The rendering was stable
                but text selection, zoom, and annotations across two parallel reader
                architectures created a maintenance surface I couldn’t sustain alone.
                Cutting PDF and polishing EPUB was the right product decision — depth
                over breadth.
              </Callout>
            </Section>
          </div>

          <MoreCases currentId="remargin" />
        </article>
      </main>

      <Footer />
    </>
  );
}
