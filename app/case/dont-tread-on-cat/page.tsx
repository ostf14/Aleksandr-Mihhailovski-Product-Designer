import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { workMetadata } from "@/lib/works";

export const metadata = workMetadata("dont-tread-on-cat");

/** The announcement story trailer. */
const TRAILER_ID = "t_y_m4gaKAc";

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
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
