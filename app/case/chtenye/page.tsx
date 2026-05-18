import { Nav } from "@/components/Nav";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { CardSlider } from "@/components/CardSlider";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { NumberedList } from "@/components/NumberedList";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

const tocItems: TocItem[] = [
  { id: "context", label: "A menu that works against its users" },
  { id: "research", label: "Three users were enough" },
  { id: "iteration", label: "Three rounds, three days" },
  { id: "structure", label: "Three principles that rewrote the navigation" },
  { id: "design", label: "Balancing density with clarity" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "What I learned" },
];

const metrics = [
  { value: "+80%", label: "Navigation task success" },
  { value: "12 → 5 categories", label: "Structure" },
  { value: "3 users, 3 rounds", label: "Test" },
];

const results = [
  {
    h: "+80% task success rate",
    p: "Navigation tasks that previously stumped every single participant — finding a video course, distinguishing content types, understanding what a category contains — now completed successfully by 4 out of 5 users.",
  },
  {
    h: "12 → 5 top-level categories",
    p: "Each category name validated through testing. Users could predict what's inside before clicking — the primary failure point of the original navigation eliminated entirely.",
  },
  {
    h: "One filterable system for all content",
    p: "Replaced category card drill-downs with flat filterable lists. Users see content immediately, can browse freely, and recognize wrong turns in one step instead of three.",
  },
];

const lessons = [
  {
    h: "Test the words, not the wireframes.",
    p: "Every navigation problem traced back to a label that meant one thing to the team and another to users. Three tests caught what months of internal discussion missed.",
  },
  {
    h: "Flat lists beat deep hierarchies.",
    p: "Users preferred browsing a filterable list over drilling down through category cards. Every extra click before seeing content is a click where they might give up.",
  },
  {
    h: "Paper prototypes get more honest feedback.",
    p: "Low fidelity forced participants to react to structure, not aesthetics. They spoke up more, questioned more, and gave feedback they'd filter out in a polished prototype.",
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <TableOfContents items={tocItems} />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          {/* Hero */}
          <header id="overview" className="scroll-mt-20 px-6 md:px-10 pt-6 md:pt-10 pb-14">
            <div className="max-w-bleed mx-auto">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3">
                  Chtenye · 2023
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  Educational Platform Redesign
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  Users couldn&rsquo;t explain what a single menu item meant.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="max-w-bleed mx-auto mt-10">
              <div className="border border-stone-200 bg-cream-warm rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0">
                <div className="md:pr-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Overview
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    Users failed basic navigation — not because of bad design, but because every
                    label was misleading. Ran user testing, rebuilt the taxonomy based on real
                    findings, and designed a scalable UI system.
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    My role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    UX Research, IA, UI Design
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Team
                  </div>
                  <p className="text-[15px] text-stone-500 mb-3">
                    Solo designer + client stakeholder
                  </p>
                </div>

                <div className="md:pl-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Impact
                  </div>
                  <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                    {["+80% task success rate", "12 → 5 categories"].map((item) => (
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
            </FadeIn>

            <div className="mt-14">
              <ImagePlaceholder
                label="Hero: Chtenye platform redesign"
                src="https://framerusercontent.com/assets/YElOuWwbVdkhKyu6y7XKEaeKI.mp4"
                wide
              />
            </div>
          </header>

          {/* Impact (metrics only) */}
          <div>
            <Impact metrics={metrics} beforeSteps={[]} afterSteps={[]} />
          </div>

          {/* 01 · Context */}
          <div id="context" className="scroll-mt-20 mt-32 pb-32">
            <Section kicker="01 · Context" heading="A menu that works against its users">
              <Prose>
                <p>
                  Chtenye is a content platform for a popular linguistics YouTuber — a curated
                  library of video courses, lectures, articles, and research papers across
                  linguistics, cultural studies, and related fields.
                </p>
                <p>
                  The site had 12 content categories in the navigation. On paper, that sounds
                  organized. In practice, users couldn&rsquo;t find anything. The category
                  &ldquo;What We Do&rdquo; contained all video content — courses, lectures,
                  interviews. But not a single test participant guessed that. They all expected a
                  mission statement or a description of past projects.
                </p>
                <p>
                  Competitors like Postnauka and Arzamas scored higher on navigation despite
                  similar content volume — they solved discovery through thematic curation, not
                  category multiplication.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Original Chtenye navigation"
              caption="Original site navigation — before any changes."
              src="/Navigation of the original website.png"
            />

            <Callout className="mt-14" label="Key insight">
              The navigation wasn&rsquo;t broken because of bad visual design. It was broken
              because every label meant something different to the team than it did to users.
            </Callout>
          </div>

          {/* 02 · Research */}
          <div id="research" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Research" heading="Three users were enough">
              <Prose>
                <p>
                  <a
                    href="https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta underline underline-offset-2 hover:opacity-80 transition-opacity"
                  >
                    Nielsen Norman Group&rsquo;s research shows that 5 users uncover 85% of
                    usability problems.
                  </a>{" "}
                  I needed only three — the problems were so severe that every participant hit
                  the same walls.
                </p>
                <p>
                  I tested three things: the live site on a tablet, a prototype built from the
                  client&rsquo;s proposed structure, and my own paper prototype with a different
                  taxonomy. Same tasks across all three: find a Polish language course, locate a
                  research paper, browse out of curiosity.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Video: Paper prototype testing session"
              caption="Three users, three test rounds — fast, cheap, and surprisingly engaging for participants."
              src="https://framerusercontent.com/assets/j3a2YSkcNlW7EuVnCnzgICbfLg.mp4"
            />

            <Prose className="mt-8">
              <p>Key findings:</p>
            </Prose>

            <NumberedList
              className="mt-8"
              items={[
                "All three users went to 'Library' looking for video content — and found only text materials. One said 'there was nowhere else to go.' Another considered leaving for YouTube entirely.",
                "'What We Do' was universally misread as an about page. Users expected mission statements and project descriptions — not the platform's entire video catalog.",
                "Category card drill-downs added 3+ steps before users could even tell they were in the wrong section. A flat filterable list would let them see the mistake in one.",
                "Users searched by format (video vs article), not by topic — but the navigation was organized by topic only.",
                "'FAQ' was interpreted as technical support ('like Gosuslugi or Yandex Taxi'). Users suggested 'Q&A' as a friendlier alternative.",
                "Footer with expanded second-level navigation became an unexpected shortcut — multiple users preferred it over the header for finding deep content.",
              ]}
            />

            <Callout className="mt-14" label="The goal">
              Fix the taxonomy before designing a single screen. If users can&rsquo;t predict
              what&rsquo;s behind a menu item, no amount of visual polish will help.
            </Callout>
          </div>

          {/* 03 · Iteration */}
          <div id="iteration" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Iteration" heading="Three rounds, three days">
              <Prose>
                <p>
                  Three test rounds, each with a different structure. The live site and the
                  client&rsquo;s proposed prototype reproduced the same navigation failures — the
                  &ldquo;What We Do&rdquo; label fooled every participant.
                </p>
                <p>
                  My prototype renamed it to &ldquo;Our Content.&rdquo; Two out of three users
                  got it immediately. But putting raw playlists on the homepage blurred the line
                  with the content page — one user said: &ldquo;I thought this IS the &lsquo;Our
                  Content&rsquo; page.&rdquo; A quick follow-up round replaced playlists with
                  preview blocks — thumbnail, description, button to the internal page — and the
                  confusion disappeared.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Photo: Paper prototypes used across the three rounds"
              caption="The mug cat has seen things. Mostly paper prototypes."
              src="/Paper prototypes.png"
            />

            <Callout className="mt-14" label="Design decision">
              Three rounds in three days. Each cost nothing but paper and 15 minutes per
              participant — and prevented building the wrong interface in code.
            </Callout>
          </div>

          {/* 04 · Structure */}
          <div id="structure" className="scroll-mt-20 pb-32">
            <Section
              kicker="04 · Structure"
              heading="Three principles that rewrote the navigation"
            >
              <Prose>
                <p>The research revealed three structural principles:</p>
              </Prose>

              <NumberedList
                className="mt-8"
                items={[
                  "Users search by format (video/article), not by topic. So format filters became the primary navigation mechanism on content pages.",
                  "Users want to browse, not drill down. Even when given filters, they preferred scrolling through a flat list over making sequential category choices. Every additional click before seeing content delayed their ability to realize they were in the wrong section.",
                  "Labels must describe what's inside, not what the team calls it internally. 'Library' sounds like books. 'What We Do' sounds like an about page. Renaming based on user mental models solved half the navigation problems before any visual design.",
                ]}
              />

              <Prose className="mt-8">
                <p>
                  The site map went from 12 overlapping categories to 5 clear entry points, each
                  with a transparent name that users could predict the contents of.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Diagram: Site map — five entry points"
              caption="Five entry points instead of twelve. Each name tested with real users before implementation."
              src="/Sitemap.png"
            />

            <Callout className="mt-14" label="Key insight">
              Category cards that force users to choose before seeing any content add steps and
              delay error recognition. A filterable list lets users see immediately if
              they&rsquo;re in the wrong place — and costs them only one step instead of three.
            </Callout>
          </div>

          {/* 05 · Design */}
          <div id="design" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Design" heading="Balancing density with clarity">
              <Prose>
                <p>
                  With the structure validated, I moved to visual design. The challenge: 12
                  content types now share a unified architecture — how do you differentiate them
                  visually without breaking the system?
                </p>
                <p>
                  A modular card system. Same grid, same attribute display, but format badges,
                  duration indicators, and color accents let users distinguish a 5-minute article
                  from a 2-hour lecture series at a glance.
                </p>
              </Prose>
            </Section>

            <CardSlider
              className="mt-8"
              caption="Three content surfaces — Shows, Videos, Library — sharing one card system. Format badges and duration indicators let users scan without reading."
              slides={[
                { src: "/cards-shows.png", alt: "Shows page card system" },
                { src: "/cards-videos.png", alt: "Videos page card system" },
                { src: "/cards-library.png", alt: "Library page card system" },
              ]}
            />

            <Callout className="mt-14" label="Design decision">
              50+ iterations of the main page to find the right information density. Each added
              element diluted scannability — the final version shows less data per card but
              enables faster decisions.
            </Callout>
          </div>

          {/* 06 · Results */}
          <div id="results" className="scroll-mt-20 pb-32">
            <Section kicker="06 · Results" heading="Results">
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <div className="max-w-prose mx-auto space-y-10">
                    {results.map((r, i) => (
                      <FadeIn key={r.h} delay={i * 0.05}>
                        <h3 className="font-serif font-normal text-xl md:text-2xl tracking-tight mb-3">
                          {r.h}
                        </h3>
                        <p className="text-[1.125rem] leading-[1.65] text-charcoal/90">{r.p}</p>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Callout className="mt-14" label="Key insight">
              The footer with expanded second-level navigation became an unexpected power
              feature. Multiple users preferred it over the header menu for deep content —
              especially on long pages where scrolling back to the top felt costly.
            </Callout>
          </div>

          {/* 07 · Lessons */}
          <div id="lessons" className="scroll-mt-20 pb-32">
            <Section
              kicker="07 · Lessons"
              heading={
                <>
                  What I <em>learned</em>
                </>
              }
            >
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <div className="max-w-prose mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                      {lessons.map((r, i) => (
                        <FadeIn key={r.h} delay={i * 0.08} className="h-full">
                          <div className="group h-full bg-cream-warm rounded-lg p-5 md:p-6 flex flex-col transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:bg-cream-deep md:hover:shadow-sm">
                            <div className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium mb-3 transition-colors duration-300 md:group-hover:text-terracotta">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <h3 className="text-base md:text-[1.0625rem] font-medium tracking-tight leading-snug mb-3">
                              {r.h}
                            </h3>
                            <p className="text-[0.9375rem] leading-[1.55] text-charcoal/80">
                              {r.p}
                            </p>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <MoreCases currentId="chtenye" />
        </article>
      </main>

      <Footer />
    </>
  );
}
