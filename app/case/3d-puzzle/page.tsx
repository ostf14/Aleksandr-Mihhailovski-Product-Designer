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

export const metadata = pageMetadata({
  title: "3D Museum Puzzle",
  description:
    "Applied to a casual game studio, got rejected, built a working 3D puzzle prototype instead.",
  path: "/case/3d-puzzle",
});

const toc: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "content-sourcing", label: "Content sourcing" },
  { id: "snap-logic", label: "Snap logic" },
  { id: "highlight", label: "Highlight" },
  { id: "ui", label: "UI" },
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
                  Self-initiated · 2025
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  3D Museum Puzzle
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  Applied to a casual game studio, got rejected, built a working 3D
                  puzzle prototype instead.
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
                      Self-initiated prototype
                    </p>
                  </div>

                  <div className="md:px-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Timeline
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      2025
                    </p>
                  </div>

                  <div className="md:pl-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Focus
                    </div>
                    <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                      {[
                        "3D interaction design",
                        "Procedural UI",
                        "Content pipeline",
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
                    href="https://3d-puzzle-sigma.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-charcoal/90 hover:text-terracotta transition-colors"
                  >
                    Live prototype
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                  <a
                    href="https://github.com/ostf14/3d-puzzle"
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

            <FadeIn delay={0.2} className="max-w-bleed mx-auto">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src="/demo.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-xl mt-8"
              />
            </FadeIn>
          </header>

          {/* Context */}
          <div id="context" className="scroll-mt-20 mt-16 pb-32">
            <Section kicker="01 · Context" heading="Context">
              <Prose>
                <p>
                  Applied for a product design role at a casual game studio.
                  Color-by-number app, ad-monetized. They said UX was solid but they
                  needed a UI artist. Didn’t get the offer.
                </p>
                <p>
                  I wanted to see if I could build a more mechanically complex
                  prototype from scratch — concept through deployment. Picked 3D
                  puzzles: spatial reasoning, physics-adjacent interaction, and a
                  content pipeline I could source for free.
                </p>
              </Prose>
            </Section>
          </div>

          {/* Content sourcing */}
          <div id="content-sourcing" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Content sourcing" heading="Content sourcing">
              <Prose>
                <p>
                  Museums have been releasing photogrammetry scans of their
                  collections. I took a scan of Äskulap by Veit Königer (c. 1776,
                  Schönbrunn Palace, Vienna), fragmented it in Blender into 11
                  pieces, and exported as GLB.
                </p>
                <p>
                  The app includes an info panel that links to the original eMuseum
                  Schönbrunn record — artist, date, material, provenance.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/info-panel.png"
              label="Info panel with museum metadata"
              caption="Info panel with museum metadata from the Schönbrunn eMuseum collection."
            />
          </div>

          {/* Snap logic */}
          <div id="snap-logic" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Snap logic" heading="Snap logic">
              <Prose>
                <p>
                  Standard approach: each fragment has a fixed target position in
                  world space. Drag close enough, it snaps to that position. Problem —
                  the player has to guess the absolute location, which feels arbitrary
                  in 3D.
                </p>
                <p>
                  I used relative snapping instead. A fragment snaps when it’s close
                  enough to a neighbor that’s already placed. Target position =
                  neighbor’s current position + the offset between their original
                  positions. The player doesn’t need to find the right spot in space —
                  just bring two related pieces near each other.
                </p>
                <p>
                  Snapped pairs form a group. Groups move together. When a fragment
                  bridges two groups, they merge. This came from the adjacency map
                  built at load time from original mesh positions (threshold 1.5
                  units).
                </p>
              </Prose>

              <Callout className="mt-10" label="Design decision">
                Snap threshold is 0.8 units distance + 0.26 rad rotation. Loose enough
                that it doesn’t feel fiddly, tight enough that accidental snaps are
                rare.
              </Callout>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/assembly-mid.png"
              label="Mid-assembly with fragments partially placed"
              caption="Mid-assembly — 5 of 11 fragments placed."
            />
          </div>

          {/* Highlight */}
          <div id="highlight" className="scroll-mt-20 pb-32">
            <Section kicker="04 · Highlight" heading="Highlight">
              <Prose>
                <p>
                  With 11 fragments scattered on a sphere, small pieces get lost. The
                  search button re-scatters unplaced singles to new Fibonacci sphere
                  positions and adds a temporary halo.
                </p>
                <p>
                  The halo is a procedural CanvasTexture (512×512, pow falloff with
                  alpha dither to avoid 8-bit banding), rendered as an
                  additive-blended sprite. It fades over 4.5 seconds. Groups are left
                  in place — only singles move.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/halo-highlight.png"
              label="Halo highlight on unplaced fragments"
              caption="Halo highlight on unplaced fragments after search."
            />
          </div>

          {/* UI */}
          <div id="ui" className="scroll-mt-20 pb-32">
            <Section kicker="05 · UI" heading="UI">
              <Prose>
                <p>
                  Bottom dock with three elements: undo, progress, redo. Progress
                  counter uses Doto (a dot-matrix Google Font) with a gradient fill
                  bar underneath. Timer starts on first interaction — no start screen.
                </p>
                <p>
                  Undo/redo stores full state snapshots (position, rotation, group
                  membership for every fragment). Limit 50. Vectors and sets are
                  deep-cloned to isolate snapshots from mutable scene state.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/dock-progress.png"
              label="Progress dock with undo/redo"
              caption="Progress dock — Doto font, animated fill bar, undo/redo."
            />
          </div>

          {/* Result */}
          <div id="result" className="scroll-mt-20 pb-32">
            <Section kicker="06 · Result" heading="Result">
              <Prose>
                <p>
                  Working prototype, deployed on Vercel. End-to-end: photogrammetry
                  scan → Blender fragmentation → GLB export → React Three Fiber
                  runtime → Vercel deployment. Solo — no designer-to-developer handoff
                  because there was no split.
                </p>
                <p>
                  Built with Windsurf initially, switched to Claude Code mid-project.
                  Windsurf hallucinated on Three.js-specific APIs (wrong method
                  signatures for drei hooks, outdated R3F patterns). Claude Code was
                  more reliable for R3F component structure.
                </p>
              </Prose>

              <Callout className="mt-10" label="Key insight">
                AI code tools made it practical to test approaches I wouldn’t have
                committed to manually — Fibonacci sphere scramble, procedural halo
                texture, relative snap. Each took under an hour to prototype. Without
                that, I’d have picked the simplest option.
              </Callout>
            </Section>
          </div>

          <MoreCases currentId="3d-puzzle" />
        </article>
      </main>

      <Footer />
    </>
  );
}
