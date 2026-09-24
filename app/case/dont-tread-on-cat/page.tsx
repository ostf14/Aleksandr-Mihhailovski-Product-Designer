import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { GraphicGallery } from "@/components/GraphicGallery";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { CAT_DEV_MEDIA_SHARED } from "@/lib/cat-dev-media";
import type { GraphicItem } from "@/lib/graphic";
import { workMetadata } from "@/lib/works";

export const metadata = workMetadata("dont-tread-on-cat");

/** The announcement story trailer. */
const TRAILER_ID = "t_y_m4gaKAc";

/** Where the game is wishlisted. */
const STEAM_URL =
  "https://store.steampowered.com/app/3504010/Dont_Tread_On_Cat/";

/**
 * The Steam screenshots, laid out the way the graphic archive is — same
 * component, so the same grid and the same lightbox. No heading over them: on
 * /graphic "Gallery" separates the archive tier from the cases above it, and
 * here there is nothing to separate it from.
 *
 * No captions either. A line under a screenshot can only describe the frame
 * you are already looking at. `alt` still carries the description, because a
 * screen reader has nothing else to go on.
 *
 * Spans 3, 3, 2, 2, 2 — two across then three across, which is 6 and 6 out of
 * the grid's six columns and so two full rows. Five at the same span would
 * have left the last one alone beside half an empty row. The archive on
 * /graphic groups itself the same way and for the same reason.
 *
 * Kept at the source 1920, against the usual rule of twice the drawn width.
 * Two reasons, both about this art in particular. The lightbox is the point of
 * a gallery and it paints these near full screen, so the tile is not the size
 * that matters; and pixel art is the one thing that cannot be resampled
 * politely — halving to 960 lands cleanly on the game's own pixel grid, but
 * the browser then blows that back up by about 1.45 in the lightbox and the
 * grid goes soft. At webp they are 128-141 KB each against 450 KB of source
 * JPEG, and nothing here loads until it is scrolled to.
 */
const SCREENSHOTS: GraphicItem[] = [
  {
    src: "/cases/dont-tread-on-cat/01-hack.webp",
    width: 1920,
    height: 1080,
    span: 3,
    alt: "A guard with a glowing blade, a HACK prompt above him, the cat lying on the floor behind",
  },
  {
    src: "/cases/dont-tread-on-cat/02-leap.webp",
    width: 1920,
    height: 1080,
    span: 3,
    alt: "The cat mid-jump above warehouse shelving stacked with crates",
  },
  {
    src: "/cases/dont-tread-on-cat/03-horizon.webp",
    width: 1920,
    height: 1080,
    span: 2,
    alt: "The cat in a room of dead monitors, a huge tentacled shape standing over the skyline outside",
  },
  {
    src: "/cases/dont-tread-on-cat/04-shield.webp",
    width: 1920,
    height: 1080,
    span: 2,
    alt: "The cat behind a blue shield arc, facing a walking drone with a single orange eye",
  },
  {
    src: "/cases/dont-tread-on-cat/05-laundromat.webp",
    width: 1920,
    height: 1080,
    span: 2,
    alt: "The cat outside a lit laundromat at night, a KILL prompt over a rat further down the street",
  },
];

/**
 * The build footage, in the same grid.
 *
 * Same list and same order as on the workflow case, only tiled instead of run
 * full width — see lib/cat-dev-media.ts. These keep their captions, where the
 * screenshots above lose theirs, and the difference is not an oversight: a
 * screenshot's caption can only name what is already in the frame, while
 * "the early version sat on these heavy Unreal Blueprints" is the only thing
 * that tells you why a picture of a node graph is on this page at all.
 *
 * Two of these are GIFs 540px wide. They land in the tile at 468 and the
 * lightbox leaves them at their own size rather than blowing them up, because
 * its image is `w-auto` under a cap, not stretched to it.
 *
 * Spans 3, 3, 2, 2, 2, same as above and with a second reason here. These five
 * are not one shape — 1.78, 1.74, 1.00, 1.41 and 2.00 — and at one span the
 * square GIF stood beside the blueprint and left a hole under it as deep as
 * itself. The two that match go across the top; the three that do not are
 * narrower, where the same ratios differ by fewer pixels.
 */
const DEV_TILES: GraphicItem[] = CAT_DEV_MEDIA_SHARED.map((m, i) => ({
  src: m.src,
  alt: m.label,
  caption: m.caption,
  width: m.width,
  height: m.height,
  span: i < 2 ? 3 : 2,
}));

/**
 * An announcement page, not a case study yet.
 *
 * It carries only what is true right now: the name, that it is in development,
 * and the trailer. The empty sections a case study would have — premise, how
 * it was made, what shipped — are not here, because a heading over nothing
 * reads worse than no heading at all. They go in when there is something to
 * put under them, and the page grows into the usual case shape then.
 *
 * No table of contents for the same reason: one entry is not a contents page.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="pb-14 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  In development
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-sans text-hero font-semibold tracking-tight">
                  Don&rsquo;t Tread On Cat
                </h1>
              </FadeIn>
            </div>

            {/* Two facts, not four. The strip on the other case pages has Role,
                Scope, Team and Timeline because those pages know all four; this
                one knows two, and padding it out with "TBA" would be filler
                wearing a table's clothes. */}
            <FadeIn delay={0.1} className="shell mt-10">
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <div className="grid grid-cols-1 gap-y-8 p-6 sm:grid-cols-2 sm:gap-y-0 md:p-8">
                  <div className="sm:pr-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.5] text-fg/80">
                      Solo developer
                    </p>
                  </div>
                  <div className="sm:pl-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Status
                    </div>
                    <p className="text-[0.95rem] leading-[1.5] text-fg/80">
                      In development
                    </p>
                  </div>
                </div>

                {/* Same strip the other self-initiated cases carry along the
                    bottom of their meta card — see ReMargin and the 3D puzzle.
                    A page about a game that is on Steam and says so nowhere is
                    asking the reader to go and search for it. */}
                <div className="flex flex-col gap-3 border-t border-line px-6 py-4 md:flex-row md:items-center md:gap-6 md:px-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Links
                  </span>
                  <a
                    href={STEAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-fg/90 transition-colors hover:text-accent"
                  >
                    Steam page
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                </div>
              </div>
            </FadeIn>
          </header>

          <div className="pb-32">
            <div className="shell">
              <FadeIn>
                <YouTubeEmbed
                  id={TRAILER_ID}
                  title="Don't Tread On Cat — Announcement Story Trailer"
                  autoplay
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Don&rsquo;t Tread On Cat | Announcement Story Trailer
                </p>
              </FadeIn>
            </div>

            {/* Straight under the trailer: what the game looks like, before
                anything about how it is made.

                eagerCount 0 on both grids. The default of two is for
                /graphic, whose gallery starts near the top of the page; here
                the first screen is a video and everything below it can wait
                until it is scrolled to. On the second grid that is not a
                preference — its first tile is a 3.7 MB GIF. */}
            <div className="shell mt-12">
              <GraphicGallery items={SCREENSHOTS} eagerCount={0} />
            </div>

            {/* Build footage, shared with /case/multi-agent-workflow rather
                than copied — the list and the reasoning are in
                lib/cat-dev-media.ts. Five of its eight frames read on their
                own; the other three only mean anything next to that case's
                argument about compile times, so they stay there.

                Still no heading over them. The page carries what is true and
                nothing else, and "Development" over five pictures of the
                development is a label telling you what you can already see. */}
            <div className="shell mt-16">
              <GraphicGallery items={DEV_TILES} eagerCount={0} />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
