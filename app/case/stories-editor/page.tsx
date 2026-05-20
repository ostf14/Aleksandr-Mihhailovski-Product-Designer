import { Nav } from "@/components/Nav";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

const tocItems: TocItem[] = [
  { id: "why-we-started", label: "Why we started" },
  { id: "blind-publishing", label: "Killing ‘blind publishing’" },
  { id: "constraints", label: "Brand-safe by design" },
  { id: "autonomy", label: "Why templates" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "What I learned" },
];

const metrics = [
  { value: "24-48h → 5 min", label: "Story creation time" },
  { value: "10×", label: "Campaign velocity" },
  { value: "~20 h/week", label: "Engineering time freed" },
];

const beforeSteps = [
  "Marketing",
  "Slack message",
  "Dev team codes story",
  "Wait 24-48h",
  "Publish",
];
const afterSteps = ["Marketing", "Visual Editor", "Instant Preview", "Publish (5 min)"];

const results = [
  {
    h: "100% marketing autonomy",
    p: "Zero Slack messages to engineering for story updates. The self-service system handled everything from creation to publishing.",
  },
  {
    h: "10× campaign velocity",
    p: "Story creation dropped from 24-48 hours to 5 minutes. Marketing launched 3-5 stories per week, up from 1-2 per month.",
  },
  {
    h: "~20 hours/week freed",
    p: "Engineering time redirected from repetitive story tasks to core product features.",
  },
];

const lessons = [
  {
    h: "10× velocity comes from removing people, not adding tools.",
    p: "The bottleneck wasn't slow software. It was a Slack message to an engineer who had other priorities. The editor didn't speed up the process — it removed a step entirely.",
  },
  {
    h: "Preview kills anxiety.",
    p: "Every tool that shows 'what you'll get' before you commit reduces fear of mistakes.",
  },
  {
    h: "Constraints are a feature, not a limitation.",
    p: "Brand-locked colors and template boundaries initially felt restrictive. Turns out, removing decisions that don't matter lets people focus on decisions that do.",
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
                  Seamm · 2023
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  Stories Editor
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  How I eliminated a 2-day content bottleneck.
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
                    Designed a no-code story editor that gave marketing full autonomy over
                    Instagram-like content creation, reducing creation time from 24-48 hours to 5
                    minutes.
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    My role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    Product Designer — UX, UI, design system
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Team
                  </div>
                  <p className="text-[15px] text-stone-500 mb-3">Seamm product team</p>
                  <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                    {["PM", "Design Lead", "2 Engineers", "Product designer (Me 👋)"].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="inline-block size-1.5 rounded-full bg-terracotta shrink-0 mt-[7px]"
                          />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="md:pl-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Impact
                  </div>
                  <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                    {["24-48h → 5 min creation time", "10× campaign velocity"].map((item) => (
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
                label="Hero: Stories Editor interface"
                src="https://framerusercontent.com/images/WqXrVnU46HVuCSUfhEXwfBQyw.png?width=1440&height=1150"
                wide
              />
            </div>
          </header>

          {/* Impact + Before/After */}
          <div>
            <Impact metrics={metrics} beforeSteps={beforeSteps} afterSteps={afterSteps} />
          </div>

          {/* 01 · Context */}
          <div id="why-we-started" className="scroll-mt-20 mt-32 pb-32">
            <Section kicker="01 · Context" heading="Why we started">
              <Prose>
                <p>
                  Seamm&rsquo;s marketing team needed to create Stories — Instagram-like vertical
                  content — to showcase products and drive engagement. Every single story required
                  a Slack message to engineering, manual asset preparation, and developer
                  intervention to code and publish.
                </p>
                <p>
                  Marketing couldn&rsquo;t see how a story would look on a user&rsquo;s device
                  before publishing. Nothing prevented wrong colors, wrong fonts, or text overflow.
                  And every change — even a typo fix — required an engineer.
                </p>
              </Prose>

              <Callout className="mt-10" label="The goal">
                Design a no-code editor that empowers marketing to create, preview, and publish
                brand-safe stories independently — transforming a multi-day engineering task into
                a 5-minute self-service workflow.
              </Callout>

              <Callout className="mt-10" label="Key insight">
                Content creation sat at the same expensive intersection as{" "}
                <a href="/case/push-notifications" className="text-terracotta underline underline-offset-2 hover:opacity-80 transition-opacity">
                  push notifications
                </a>
                : marketing couldn&rsquo;t publish without engineering, and engineering had
                higher-priority work.
              </Callout>
            </Section>
          </div>

          {/* 02 · Preview */}
          <div id="blind-publishing" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · Preview"
              heading={
                <>
                  How to kill <em>&lsquo;blind publishing&rsquo;</em>?
                </>
              }
            >
              <Prose>
                <p>
                  The core problem was what I call &lsquo;blind publishing&rsquo; — marketing had
                  zero visual feedback before content went live. They were mentally simulating
                  what the story would look like, then hoping for the best.
                </p>
                <p>
                  The solution was a real-time mobile preview. As the user types, the left panel
                  shows exactly how the story will appear on a user&rsquo;s device. Not an
                  approximation — the actual app dimensions and typography.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Stories editor with live mobile preview"
              caption="The mobile preview uses actual app dimensions and typography — what you type is what users see."
              src="https://framerusercontent.com/images/9HpyD4ysgbGpE8DvVYsWZnkKa6w.png?width=1440&height=1100"
            />

            <Callout className="mt-10" label="Design decision">
              I considered a separate Preview step (Edit → Save → Preview → Publish), but chose
              live preview because it reduces friction, enables rapid iteration (3 variants in 5
              minutes), and eliminates approval anxiety. Trade-off: more complex frontend state
              management, but the UX benefit justified the cost.
            </Callout>
          </div>

          {/* 03 · Constraints */}
          <div id="constraints" className="scroll-mt-20 pb-32">
            <Section
              kicker="03 · Constraints"
              heading={
                <>
                  How to prevent <em>brand-breaking</em>&nbsp; mistakes?
                </>
              }
            >
              <Prose>
                <p>
                  Before the editor, there were multiple incidents of wrong colors, broken links,
                  and text overflow going live. To prevent this, CTA buttons use a color picker
                  locked to the brand palette — only approved colors are selectable. Character
                  counters prevent overflow. Link destinations are validated.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Brand-locked color picker and validation"
              caption="Template constraints reduced brand inconsistency errors by ~90%."
              src="https://framerusercontent.com/images/4yQWw1rPD9dj4ohYM6Jq1lmoPE.png?width=1440&height=1100"
            />

            <Callout className="mt-10" label="Design decision">
              I considered inline editing — clicking directly on the preview. But a dedicated side
              panel shows all options at once (character limits, link types, color constraints)
              without hunting. The small mobile preview makes inline clicking error-prone.
              Trade-off: less spatial directness, but dramatically fewer errors.
            </Callout>
          </div>

          {/* 04 · Autonomy */}
          <div id="autonomy" className="scroll-mt-20 pb-32">
            <Section
              kicker="04 · Autonomy"
              heading={
                <>
                  Why <em>templates</em>, not a free-form canvas?
                </>
              }
            >
              <Prose>
                <p>
                  This was the most important design decision. I considered a Canva-style
                  free-form editor. But templates guarantee mobile optimization, prevent
                  overlapping or off-screen content, and let users focus on content instead of
                  layout.
                </p>
                <p>
                  Marketing needed speed and consistency, not design experimentation. The template
                  system became the most-valued feature — marketing wanted confidence over
                  flexibility.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Story management dashboard"
              caption="Marketing now manages all stories in one place with complete autonomy."
              src="https://framerusercontent.com/images/pkKF2y9RzwluRtga74OqCrPWk.png?width=1440&height=1100"
            />

            <Callout className="mt-10" label="Key insight">
              Reducing options turned out to be more empowering than adding them. Templates
              eliminated an entire category of anxiety — &lsquo;did I break the layout?&rsquo;
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

            <Callout className="mt-10" label="Key insight">
              The real win wasn&rsquo;t just speed. It was giving marketing complete ownership of
              their channel while guaranteeing brand safety through design constraints.
            </Callout>
          </div>

          {/* What I learned */}
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
                          <div className="group h-full bg-cream-warm rounded-lg p-5 md:p-6 flex flex-col transition-all duration-200 ease-out md:hover:-translate-y-1 md:hover:bg-cream-deep md:hover:shadow-sm">
                            <div className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium mb-3 transition-colors duration-200 ease-out md:group-hover:text-terracotta">
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

          <MoreCases currentId="stories" />
        </article>
      </main>

      <Footer />
    </>
  );
}
