import { Nav } from "@/components/Nav";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { NumberedList } from "@/components/NumberedList";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

const tocItems: TocItem[] = [
  { id: "why-failing", label: "Why the site was failing" },
  { id: "validation", label: "Testing before designing" },
  { id: "structure", label: "From 12 silos to one system" },
  { id: "design", label: "50 iterations" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "What I learned" },
];

const metrics = [
  { value: "+80%", label: "Task success rate" },
  { value: "12 → 5", label: "Top-level categories" },
  { value: "1 model", label: "For all content types" },
];

const results = [
  {
    h: "+80% task success rate",
    p: "Navigation tasks that previously confused the majority of users — finding a specific lecture, distinguishing content types, accessing the library — now completed successfully by 4 out of 5 participants.",
  },
  {
    h: "12 → 5 top-level categories",
    p: "Simplified navigation from 12 overlapping categories to 5 clear entry points. New content types can be added without creating new menu items — they inherit the existing attribute structure.",
  },
  {
    h: "One data model for everything",
    p: "Videos, articles, courses, podcasts — all share the same attribute system. One card component, one filter system, one sort mechanism. Adding a new content type is a data entry task, not a redesign.",
  },
];

const lessons = [
  {
    h: "Fix the data model, not the menu.",
    p: "Navigation problems that look like UI issues are usually structural. Without rethinking the information architecture, visual reshuffling just moves the confusion to a different place.",
  },
  {
    h: "Paper prototypes are underrated.",
    p: "Fast, cheap, and surprisingly fun for participants. The analog format cuts through screen fatigue — people engage more, speak up more, and give feedback they'd filter out in a polished prototype.",
  },
  {
    h: "Name things for users, not for the org chart.",
    p: "Categories named after internal content classifications meant nothing to users. Renaming based on what people actually expect to find inside solved half the navigation problems before any visual design began.",
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
                  12 content types, zero navigation logic.
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
                    Redesigned the information architecture and UI for a content platform with
                    12+ fragmented categories. Users couldn&rsquo;t orient themselves in a large
                    volume of diverse content. Built a unified taxonomy, scalable data model, and
                    a complete visual redesign.
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    My role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    Research, UX Strategy, UI Design, System Architecture
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
                    {["+80% task success rate", "12 → 5 top-level categories"].map((item) => (
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
                src="https://framerusercontent.com/images/aMajMUWlnqMZzKjWE2RnsGDhKo.jpg?width=1440&height=1150"
                wide
              />
            </div>
          </header>

          {/* Impact (metrics only — no before/after) */}
          <div>
            <Impact metrics={metrics} beforeSteps={[]} afterSteps={[]} />
          </div>

          {/* 01 · Context */}
          <div id="why-failing" className="scroll-mt-20 mt-32 pb-32">
            <Section kicker="01 · Context" heading="Why the site was failing its users">
              <Prose>
                <p>
                  Chtenye is a content platform for a popular linguistics YouTuber — a curated
                  library of books, articles, lectures, and courses across linguistics, cultural
                  studies, and related fields. The content expands and enriches what&rsquo;s
                  covered on the channel.
                </p>
                <p>
                  The problem: in a large volume of diverse content, users simply couldn&rsquo;t
                  orient themselves. Over time, every new content type got its own category in the
                  navigation. 12 categories, many with overlapping or opaque names. Users
                  didn&rsquo;t know what &lsquo;Modern Russian&rsquo; or &lsquo;Speech
                  Nuance&rsquo; actually contained. Every new content type made the menu longer
                  and navigation worse.
                </p>
                <p>
                  Competitors like Postnauka and Arzamas scored higher on navigation despite
                  having similar content volume — they solved discovery through thematic
                  curation, not category multiplication.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Competitive analysis of content navigation"
              caption="Despite high content quality, Chtenye lagged behind competitors in navigation ease."
              src="https://framerusercontent.com/images/TC8KyY9pfmyC2mxraDlMNZFk.png?width=1440&height=1100"
            />

            <Callout className="mt-14" label="The goal">
              Rebuild the information architecture from the data model up — not just redesign the
              menu, but fix the underlying structure that keeps breaking it.
            </Callout>

            <Callout className="mt-14" label="Key insight">
              The navigation wasn&rsquo;t failing because of bad UI. It was failing because every
              content type lived in its own silo with its own rules. The problem was structural,
              not visual.
            </Callout>
          </div>

          {/* 02 · Validation */}
          <div id="validation" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Validation" heading="Testing before designing a pixel">
              <Prose>
                <p>
                  Before touching visual design, I tested the new navigation concepts on paper
                  prototypes with real users of the platform. Quick 10-15 second tasks: find a
                  lecture, open the library, navigate to donations.
                </p>
                <p>Five participants, three key findings:</p>
              </Prose>

              <NumberedList
                className="mt-8"
                items={[
                  "Users didn't understand what hides behind category names like 'Modern Russian' or 'Speech Nuance.' The labels were opaque — people couldn't predict what content they'd find inside. Merged into a clearer parent category with transparent naming.",
                  "Users searched by content format (video/article), not topic. Added format filters to category pages.",
                  "'Language Learning' label was misleading — users expected language courses, not linguistics theory. Renamed to 'Linguistics & Language' to match the actual content scope.",
                ]}
              />
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Photo: Paper prototype testing session"
              caption="In just two days, I validated the current interface issues and my hypotheses with real users — fast, cheap, and surprisingly engaging for participants."
              src="https://framerusercontent.com/images/8EB2e2lI7evSaeNjL5APSkObOVo.png?width=1440&height=1100"
            />

            <Callout className="mt-14" label="Design decision">
              Paper prototypes over wireframes. Beyond speed and cost, there&rsquo;s a
              collaboration bonus: instead of a tedious task at a computer, paper testing feels
              like an almost analog game in a digital world. Participants were more engaged, more
              vocal, and gave feedback they&rsquo;d filter out in a polished prototype.
            </Callout>
          </div>

          {/* 03 · Structure */}
          <div id="structure" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Structure" heading="How to turn 12 silos into one system">
              <Prose>
                <p>
                  The core architectural move: instead of giving each content type its own
                  navigation bucket, I defined a shared set of attributes that every content type
                  has in common.
                </p>
                <p>
                  Category. Series. Duration. Format. Publication date. These five attributes
                  became the backbone of the entire system — they drive the UI cards, the
                  filters, the sort mechanisms, and the content entry workflow.
                </p>
                <p>
                  The site map went from a flat list of 12 categories to a hierarchical structure
                  with 5 clear entry points. Each entry point leads to content that can be
                  filtered by format, series, or topic.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Diagram: Unified data model"
              caption="One data model for all content types. Every card, filter, and sort mechanism maps to the same attribute structure."
              src="https://framerusercontent.com/images/1ADmWIgqswzjNpyDgHKce7KBQ4.png?width=1440&height=1100"
            />

            <Callout className="mt-14" label="Key insight">
              Data modeling isn&rsquo;t a backend concern — it&rsquo;s the foundation of
              navigation design. Define the semantic structure before touching visual design.
            </Callout>
          </div>

          {/* 04 · Design */}
          <div id="design" className="scroll-mt-20 pb-32">
            <Section kicker="04 · Design" heading="50 iterations to find the balance">
              <Prose>
                <p>
                  The visual challenge: how do you display 12 content types that now share a
                  unified structure without making everything look the same?
                </p>
                <p>
                  The solution was a modular card system. Same underlying grid, same attribute
                  display, but visual markers — color accents, format badges, duration indicators
                  — differentiate content types at a glance. Users can scan a mixed feed and
                  immediately know what&rsquo;s a 5-minute article vs. a 2-hour lecture series.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Modular card system on main feed"
              caption="Information density balanced with visual clarity. Format badges and duration indicators let users scan without reading."
              src="https://framerusercontent.com/images/aQaozj7Y9nYAvjKnxLHLpLadsgU.jpg?width=1440&height=1100"
            />

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Course pages with sequential ordering"
              caption="Course pages use the same card system but with sequential ordering and progress indicators."
              src="https://framerusercontent.com/images/sqCCzA1N0SQhmDvS59ZeTCoXazs.jpg?width=1440&height=1100"
            />

            <Callout className="mt-14" label="Design decision">
              I iterated through 50+ versions of the main page to find the right information
              density. The temptation was to show everything — but each added element diluted
              scannability. The final version shows less data per card but enables faster
              decisions.
            </Callout>
          </div>

          {/* 05 · Results */}
          <div id="results" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Results" heading="Results">
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
              The scalable structure means growth doesn&rsquo;t break navigation. New content
              types slot into existing categories and inherit all filtering and sorting
              automatically.
            </Callout>
          </div>

          {/* 06 · Lessons */}
          <div id="lessons" className="scroll-mt-20 pb-32">
            <Section
              kicker="06 · Lessons"
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
