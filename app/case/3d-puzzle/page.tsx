import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Impact } from "@/components/Impact";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "3D Museum Puzzle",
  description:
    "A rejected job application became a working prototype — reassembling a real 18th-century sculpture in the browser.",
  path: "/case/3d-puzzle",
});

const toc: TocItem[] = [
  { id: "why-this-exists", label: "Why this exists" },
  { id: "source-material", label: "Source material" },
  { id: "interaction-design", label: "Interaction design" },
  { id: "the-dock", label: "The dock" },
  { id: "completion", label: "Completion" },
  { id: "stack-and-craft", label: "Stack & craft" },
];

const metrics = [
  { value: "10M+", label: "Happy Color MAU" },
  { value: "11", label: "fragments to reassemble" },
  { value: "~2 min", label: "average solve time" },
];

const interactions = [
  {
    h: "Relative snap",
    p: "Fragments don’t snap to a fixed world position. They snap relative to their nearest neighbor’s current position. This means you can assemble sub-groups anywhere in space, and they merge correctly when brought together.",
  },
  {
    h: "Group movement",
    p: "Once two pieces snap, they become a group that moves as one. Groups grow, and groups merge with other groups. This creates a satisfying progression from chaos to order.",
  },
  {
    h: "Halo highlight",
    p: "A procedural glow marks unplaced pieces — a 512×512 CanvasTexture with pow falloff and alpha dither to avoid 8-bit banding. It lives in the 3D scene as additive-blended sprites, not a UI overlay, so it feels spatial.",
  },
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
                  A rejected job application became a working prototype that
                  outdesigns the product I applied to.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="max-w-bleed mx-auto mt-10">
              <div className="border border-stone-200 bg-cream-warm rounded-lg overflow-hidden">
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0">
                  <div className="md:pr-6">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      Design Engineer — concept, Blender, code, UI, deployment
                    </p>
                  </div>

                  <div className="md:px-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Type
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      Self-initiated prototype
                    </p>
                  </div>

                  <div className="md:pl-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Timeline
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      2025
                    </p>
                  </div>
                </div>

                <div className="border-t border-stone-200 px-6 md:px-8 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta">
                    Live prototype
                  </span>
                  <a
                    href="https://3d-puzzle-sigma.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-charcoal/90 hover:text-terracotta transition-colors"
                  >
                    3d-puzzle-sigma.vercel.app
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="max-w-bleed mx-auto">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src="https://github.com/user-attachments/assets/bae63575-bcbc-45cc-a262-1c34cc592f1f"
                controls
                className="w-full rounded-xl mt-8"
              />
            </FadeIn>
          </header>

          {/* Impact metrics */}
          <div>
            <Impact metrics={metrics} beforeSteps={[]} afterSteps={[]} />
          </div>

          {/* Why this exists */}
          <div id="why-this-exists" className="scroll-mt-20 mt-16 pb-32">
            <Section kicker="01 · Context" heading="Why this exists">
              <Prose>
                <p>
                  I applied for a design role at Happy Color — a color-by-number
                  app with 10M+ monthly active users and top-grossing ad revenue
                  rankings across multiple countries. The feedback: my UX work was
                  strong, but they needed a UI artist, not a product designer. They
                  passed.
                </p>
                <p>
                  The rejection clarified something. Happy Color monetizes a
                  gameplay loop that is essentially ‘tap cells, fill color.’ No
                  spatial reasoning, no physics, no discovery. I thought I could
                  prototype something with more depth — and prove I can design and
                  build it.
                </p>
                <p>
                  The idea: take real museum artifacts that have been 3D-scanned,
                  fragment them in Blender, and let the player reassemble them in
                  the browser.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/assembly-mid.png"
              label="Mid-assembly with fragments scattered in 3D space"
              caption="Mid-assembly — 5 of 11 fragments placed. Unsnapped pieces scattered in 3D space."
            />
          </div>

          {/* Source material */}
          <div id="source-material" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Source material" heading="Real sculptures, not stock assets">
              <Prose>
                <p>
                  Museums are mass-digitizing their collections. I found a
                  photogrammetry scan of Äskulap — a marble sculpture by Veit
                  Königer (c. 1776) from the Schönbrunn Palace garden in Vienna. I
                  fragmented it in Blender into 11 pieces and built the puzzle
                  around it.
                </p>
                <p>
                  The info panel links directly to the eMuseum Schönbrunn record —
                  the player is not just solving a puzzle, they are handling a real
                  artifact with provenance.
                </p>
              </Prose>

            <ImagePlaceholder
              className="mt-8"
              src="/info-panel.png"
              label="Slide-out museum info panel"
              caption="Slide-out panel with museum metadata sourced from the Schönbrunn eMuseum collection."
            />
            </Section>
          </div>

          {/* Interaction design */}
          <div id="interaction-design" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Interaction design" heading="Making fragments feel physical">
              <Prose>
                <p>
                  The core mechanic is drag-and-snap. But ‘close enough’ is not
                  satisfying. The pieces needed to click into place.
                </p>
              </Prose>
            </Section>

            <div className="mt-8 space-y-6">
              {interactions.map((d) => (
                <Callout key={d.h} label="Design decision">
                  <strong className="block mb-2 font-medium text-charcoal">
                    {d.h}
                  </strong>
                  <span className="text-charcoal/85">{d.p}</span>
                </Callout>
              ))}
            </div>

            <ImagePlaceholder
              className="mt-8"
              src="/halo-highlight.png"
              label="Procedural halo on remaining fragments"
              caption="Procedural halo on remaining fragments after pressing the search button."
            />
          </div>

          {/* The dock */}
          <div id="the-dock" className="scroll-mt-20 pb-32">
            <Section kicker="04 · UI" heading="The dock">
              <Prose>
                <p>
                  I wanted controls that feel like a physical instrument, not a web
                  app toolbar. The dock borrows from skeuomorphic audio interfaces —
                  inset round buttons, a dot-matrix display (Doto via Google Fonts),
                  a gold progress bar that fills as pieces snap into place.
                </p>
                <p>
                  The timer starts on first interaction. No start screen, no
                  tutorials — the puzzle is the interface.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/dock-progress.png"
              label="Skeuomorphic control dock"
              caption="Skeuomorphic control dock — Doto dot-matrix font, animated progress bar, undo/redo."
            />
          </div>

          {/* Completion */}
          <div id="completion" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Completion" heading="Puzzle Complete">
              <Prose>
                <p>
                  When the last piece snaps, the timer freezes and a completion
                  modal appears with the final time. No score, no stars, no
                  gamification theater — just the fact that you did it.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/success-popup.png"
              label="Completion modal with frozen solve time"
              caption="Completion modal with frozen solve time."
            />
          </div>

          {/* Stack & craft */}
          <div id="stack-and-craft" className="scroll-mt-20 pb-32">
            <Section kicker="06 · Stack & craft" heading="Built, not designed-then-handed-off">
              <Prose>
                <p>
                  No Figma file exists for this project. Every UI decision was made
                  in code, iterated live, shipped the same day.
                </p>
              </Prose>
            </Section>

            <Callout className="mt-8" label="Stack">
              Vite · TypeScript · React 18 · Three.js r160 · React Three Fiber ·
              Drei · Blender
            </Callout>

            <div className="px-6 md:px-10 mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="max-w-prose mx-auto flex flex-wrap gap-x-6 gap-y-3">
                  <a
                    href="https://3d-puzzle-sigma.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-charcoal/90 hover:text-terracotta transition-colors"
                  >
                    Live demo
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                  <a
                    href="https://github.com/ostf14/3d-puzzle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-charcoal/90 hover:text-terracotta transition-colors"
                  >
                    Source code
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            <Callout className="mt-10" label="Key insight">
              Prototyped with Windsurf, finished with Claude Code. The interesting
              part was not which AI tool — it was learning to direct them precisely
              enough to preserve design intent through implementation.
            </Callout>
          </div>

          <MoreCases currentId="3d-puzzle" />
        </article>
      </main>

      <Footer />
    </>
  );
}
