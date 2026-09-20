import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock } from "@/components/Placeholder";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { workMetadata } from "@/lib/works";

export const metadata = workMetadata("dont-tread-on-cat");

/** The story trailer. */
const TRAILER_ID = "t_y_m4gaKAc";

/**
 * Built to the same shape as every other case page — hero, facts, numbered
 * sections, a table of contents down the side — because that is what makes it
 * read as a case rather than as a product page that wandered in.
 *
 * The one thing it has that the others do not is the trailer, and it sits
 * where a case's opening image sits.
 *
 * Almost everything here is still a hole. They are visible placeholders rather
 * than invented copy: nobody can ship filler by mistake, and the gaps are
 * countable by eye.
 */
const toc: TocItem[] = [
  { id: "trailer", label: "Trailer" },
  { id: "premise", label: "Premise" },
  { id: "making", label: "Making it" },
  { id: "status", label: "Status" },
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
          <header id="overview" className="scroll-mt-20 pb-14 pt-6 md:pt-10">
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
              <FadeIn delay={0.1}>
                <PlaceholderBlock
                  className="mt-4 max-w-[42rem]"
                  label="Одна-две строки под заголовком: что это за игра и почему в неё интересно играть. То же самое пойдёт в карточку на /gamedev."
                />
              </FadeIn>
            </div>

            {/* Facts strip — the same one every case page opens with. */}
            <FadeIn delay={0.15} className="shell mt-10">
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <div className="grid grid-cols-1 gap-y-8 p-6 md:grid-cols-4 md:gap-y-0 md:p-8">
                  <div className="md:pr-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.5] text-fg/80">
                      Solo developer
                    </p>
                  </div>
                  <div className="md:px-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Genre
                    </div>
                    <p className="text-[0.95rem] leading-[1.5] text-fg/80">
                      TODO
                    </p>
                  </div>
                  <div className="md:px-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Engine
                    </div>
                    <p className="text-[0.95rem] leading-[1.5] text-fg/80">
                      TODO
                    </p>
                  </div>
                  <div className="md:pl-6">
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

          {/* Trailer — where a case's opening image would be. */}
          <div id="trailer" className="scroll-mt-20 pb-20">
            <div className="shell">
              <FadeIn>
                <YouTubeEmbed
                  id={TRAILER_ID}
                  title="Don't Tread On Cat — story trailer"
                  autoplay
                />
                <p className="mt-2.5 font-mono text-[11px] text-muted">
                  Story trailer. Starts muted — sound is on the player.
                </p>
              </FadeIn>
            </div>
          </div>

          <Section kicker="01 · Premise" heading="TODO: заголовок раздела">
            <div id="premise" className="scroll-mt-20" />
            <Prose>
              <PlaceholderBlock label="О чём игра. Завязка, за кого играешь, что происходит. Два-три абзаца." />
            </Prose>
          </Section>

          <Section kicker="02 · Making it" heading="TODO: заголовок раздела">
            <div id="making" className="scroll-mt-20" />
            <Prose>
              <PlaceholderBlock label="Как делаешь: движок, пайплайн, что оказалось сложным, какие решения принимал и почему." />
            </Prose>
            <Callout label="Design decision" className="mt-8">
              <PlaceholderBlock label="Одно конкретное решение и его цена — то, что отличает кейс от описания игры." />
            </Callout>
          </Section>

          <Section kicker="03 · Status" heading="TODO: заголовок раздела">
            <div id="status" className="scroll-mt-20" />
            <Prose>
              <PlaceholderBlock label="Где игра сейчас и что дальше. Сюда же удобно дописывать по ходу — этот раздел и есть девлог." />
            </Prose>
          </Section>
        </article>
      </main>

      <Footer />
    </>
  );
}
