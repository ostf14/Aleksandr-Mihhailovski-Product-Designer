import { Nav } from "@/components/Nav";
import { Impact } from "@/components/Impact";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Push Notifications Manager",
  description:
    "How to kill the send button nobody wanted to press — a self-serve push campaign manager at Seamm.",
  path: "/case/push-notifications",
});
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { NumberedList } from "@/components/NumberedList";
import { TableOfContents } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

const lessons = [
  {
    h: "Self-service tools are anxiety products.",
    p: "The primary user emotion isn't 'I want speed.' It's 'I'm terrified of a mistake reaching thousands.' The confirmation modal, live preview, and zero-state guard all address fear, not efficiency — and became the most praised features.",
  },
  {
    h: "Design for the 80%, don't hide the 20%.",
    p: "Most campaigns targeted a handful of users. A full filter system would have added complexity for everyone to serve rare cases. Modal targeting kept the default path fast without limiting power users.",
  },
  {
    h: "Redirect expensive time, don't just save time.",
    p: "The real win wasn't '30 min → 2 min.' It was freeing engineering hours that cost 3–5× more than marketing hours, and letting each team focus on what they do best.",
  },
];

const results = [
  {
    h: "100% layout accuracy",
    p: "The preview removed guesswork completely. Zero 'broken' notifications reaching users post-launch.",
  },
  {
    h: "3.75× campaign velocity",
    p: "Creation time dropped from ~30 minutes to under 2 minutes. 15 campaigns in the first month, up from 4 average. The team started testing 3 messaging variants per feature launch.",
  },
  {
    h: "Engineering freed",
    p: "15+ hours/month redirected to core product features. No more 'Can you send this campaign?' Slack messages.",
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <TableOfContents />
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
                  Push Notifications Manager
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  How to kill the send button nobody wanted to press.
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
                    Designed a push notification system that eliminated blind sending, gave
                    marketing full autonomy, and increased campaign velocity 3.75×.
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
                    {[
                      "PM",
                      "Design Lead",
                      "2 Engineers",
                      "Product designer (Me 👋)",
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

                <div className="md:pl-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Impact
                  </div>
                  <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                    {[
                      "~30 min → 2 min creation time",
                      "3.75× campaign velocity",
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
            </FadeIn>

            <div className="mt-14">
              <ImagePlaceholder
                label="Hero: Push notification composer interface"
                src="https://framerusercontent.com/images/SFAsDo6PF9csTgqHwlukYwNxpSQ.png?width=1440&height=1150"
                wide
              />
            </div>
          </header>

          {/* Impact + Before/After (merged) */}
          <div>
            <Impact />
          </div>

          {/* Why we started */}
          <div id="why-we-started" className="scroll-mt-20 mt-32 pb-32">
            <Section kicker="01 · Context" heading="Why we started">
              <Prose>
                <p>
                  Every push notification required marketers to message the engineering team via
                  Slack, wait for availability, then have a developer manually query the database
                  and send. Engineers — whose time costs significantly more — were pulled from
                  product work to handle routine marketing tasks. Marketers had no visibility into
                  how notifications would appear on users&rsquo; devices, and with no preview or
                  review step, a single typo could reach thousands of users instantly.
                </p>
                <p>
                  But unlike content that can be unpublished, push notifications are irreversible.
                  Once sent, there&rsquo;s no undo. A typo reaches 10,000 users instantly.
                </p>
                <p>Three things made this a high-anxiety task:</p>
              </Prose>

              <NumberedList
                className="mt-8"
                items={[
                  "No visual preview — marketing couldn't see how the notification would look on a device before sending.",
                  "Error-prone targeting — reaching specific users required external lists or manual IDs.",
                  "No safety net — without a review step, the fear of a mistake going to thousands of users was paralyzing.",
                ]}
              />

              <Callout className="mt-10" label="The goal">
                My goal: design an end-to-end flow that empowers non-technical admins to create,
                target, and send push notifications with confidence — and zero code.
              </Callout>

              <Callout className="mt-10" label="Key insight">
                Push notifications sat at an expensive intersection: marketing couldn&rsquo;t send
                without engineering, engineering had higher-priority work, and neither side had
                tools to prevent costly mistakes.
              </Callout>
            </Section>
          </div>

          {/* Solving blind sending */}
          <div id="blind-sending" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · Preview"
              heading={
                <>
                  Solving <em>‘blind sending’</em>
                </>
              }
            >
              <Prose>
                <p>
                  The core pattern was a real-time preview that updates as the admin types. I used
                  the actual app pop-up proportions to make the preview realistic — not a generic
                  mockup.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Notification composer with real-time device preview"
              caption="As the admin types, the preview updates instantly. No more mental simulation."
              src="https://framerusercontent.com/images/m7S3DADdFomddOUvTJSSQYpnn28.jpg?width=1440&height=1100"
            />

            <Prose className="mt-8">
              <p>
                I considered a separate Preview step — Edit, then Save, then Preview, then Send.
                But I chose live preview because it reduces friction, enables rapid iteration (3
                message variants in 2 minutes), and eliminates undo anxiety.
              </p>
            </Prose>

            <Callout className="mt-10" label="Design decision">
              Trade-off: More complex state management in code, but the UX benefit justified the
              engineering cost.
            </Callout>
          </div>

          {/* Who receives this — now includes Zero-state subblock */}
          <div id="audience" className="scroll-mt-20 pb-32">
            <Section
              kicker="03 · Targeting"
              heading={
                <>
                  Who <em>receives</em>&nbsp; this?
                </>
              }
            >
              <Prose>
                <p>
                  Audience targeting was the trickiest interaction design problem. The default
                  shows total addressable audience with an &lsquo;Everyone&rsquo; button. Custom
                  selection opens a modal for searching by username, email, or ID. The table
                  displays metadata — registration date, last activity — so admins can verify
                  they&rsquo;re selecting the right users.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Audience targeting modal with user search and metadata table"
              caption="The metadata table lets admins verify they're selecting the right users before sending."
              src="https://framerusercontent.com/images/7y8x0JDvHSnri716xUnvmd8lY.png?width=1440&height=1150"
            />

            <Prose className="mt-8">
              <p>
                I considered displaying filters directly on the main screen. But I chose a modal
                because 80% of campaigns target fewer than 50 users, simple search handles the
                majority of cases, and it keeps the main composer clean.
              </p>
            </Prose>

            <Callout className="mt-10" label="Design decision">
              80% of campaigns targeted fewer than 50 specific users — not complex segments
              needing multi-filter dashboards. A modal with search-by-name covers this in two
              clicks: open, search, select, done. The main composer stays uncluttered for the
              message itself, and the modal only appears when the admin actively chooses custom
              targeting.
            </Callout>

            {/* Zero-state subblock */}
            <div id="zero-state" className="scroll-mt-20 mt-14">
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <FadeIn>
                    <h3 className="max-w-prose mx-auto font-serif font-normal text-xl md:text-2xl tracking-tight">
                      Zero-state
                    </h3>
                  </FadeIn>
                </div>
              </div>
              <Prose className="mt-5">
                <p>
                  If zero users are selected, the system shows a large visual indicator: &lsquo;0
                  Users will receive your message.&rsquo; The send button stays disabled. This
                  sounds obvious. But without it, it&rsquo;s trivially easy to fire a campaign to
                  nobody — or worse, to everyone by accident.
                </p>
              </Prose>
              <ImagePlaceholder
                className="mt-8"
                label="Screenshot: Zero state — '0 users' indicator with disabled send button"
                caption="Obvious errors need obvious prevention."
                src="https://framerusercontent.com/images/hskAnvPWhcAfwEqWmoeYR0gs.png?width=1440&height=1100"
              />
            </div>
          </div>

          {/* Confirmation */}
          <div id="confirmation" className="scroll-mt-20 pb-32">
            <Section
              kicker="04 · Safety"
              heading={
                <>
                  The <em>anxiety-free</em>&nbsp; confirmation
                </>
              }
            >
              <Prose>
                <p>
                  This is the feature I&rsquo;m most proud of. Before the final send, a dedicated
                  review modal shows: a summary recapping the exact audience count
                  (&lsquo;Send to 238 users&rsquo;), one last look at the notification creative,
                  and a clear CTA stating the action and scope — removing all ambiguity.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Screenshot: Confirmation modal — 'Send to 238 users' with preview"
              caption="'Send to 238 users' — no room for interpretation."
              src="https://framerusercontent.com/images/P24PkByUoqf06mF8LtQSWIudZw.jpg?width=1440&height=1100"
            />

            <Callout className="mt-10" label="Key insight">
              The confirmation modal initially felt like it was slowing users down. It became the
              most-praised feature in the entire project. Users wanted confidence over speed.
            </Callout>
          </div>

          {/* Results & system design */}
          <div id="results" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Results" heading="Results & system design">
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
              The real win wasn&rsquo;t faster notifications. It was redirecting engineering hours
              — which cost 3–5× more than marketing hours — back to product work.
            </Callout>

            {/* Under the hood — design system subblock */}
            <div className="mt-14">
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <FadeIn>
                    <h3 className="max-w-prose mx-auto font-serif font-normal text-xl md:text-2xl tracking-tight">
                      Under the hood
                    </h3>
                  </FadeIn>
                </div>
              </div>
              <Prose className="mt-5">
                <p>
                  The notification manager uses the Seamm Admin Design System I maintained — form
                  inputs with validation states, button states, status indicators. A shared
                  component library reduced development time and ensured UI consistency, so the
                  team could focus on the harder, scarier parts of the workflow.
                </p>
              </Prose>
              <ImagePlaceholder
                className="mt-8"
                label="Screenshot: Shared component library and design tokens"
                src="https://framerusercontent.com/images/36tySRfTZZc2sl6wlPgyod69RA.png?width=1440&height=1150"
                caption="Same components, same patterns, lower cognitive load."
              />
            </div>
          </div>

          {/* What I learned — three cards */}
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

          <MoreCases currentId="push" />
        </article>
      </main>

      <Footer />
    </>
  );
}
