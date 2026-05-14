import { Nav } from "@/components/Nav";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { NumberedList } from "@/components/NumberedList";
import { TableOfContents } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

const lessons = [
  {
    h: "Reducing anxiety is more valuable than saving time.",
    p: "The confirmation modal, the live preview, the zero-state indicator — these all 'slow down' the workflow by seconds. Users loved them. Preventing errors matters more than raw speed.",
  },
  {
    h: "'Simple by default, powerful when needed' is a principle, not a compromise.",
    p: "The modal-based targeting could have been a full filter system. But 80% of use cases didn't need it. Designing for the common case — and making the advanced case accessible — created a tool that felt simple without being limited.",
  },
  {
    h: "Self-service tools are anxiety products.",
    p: "The primary emotion isn't 'I want to go fast.' It's 'I'm terrified of making a mistake that reaches thousands of users.' Every design decision should be filtered through that lens.",
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

      <main className="pt-6 md:pt-28">
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
            </div>

            <FadeIn delay={0.15} className="max-w-bleed mx-auto mt-10">
              <div className="border border-stone-200 bg-cream-warm rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0">
                <div className="md:pr-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-3">
                    Overview
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    Designed a push notification system that eliminated blind sending, gave
                    marketing full autonomy, and increased campaign velocity 3.75×.
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-3">
                    My role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    Product Designer — UX, UI, design system
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-3">
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
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-3">
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
              <ImagePlaceholder label="Hero: Push notification composer interface" wide />
            </div>
          </header>

          {/* Impact */}
          <div>
            <Impact />
          </div>

          {/* Before / After workflow */}
          <div className="mt-14 px-6 md:px-10">
            <FadeIn className="max-w-prose mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-6 items-start">
                {/* Before */}
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-4">
                    Before
                  </div>
                  <div className="flex flex-col items-stretch">
                    {["Marketers", "Slack message", "Dev team codes", "Wait", "Send"].map(
                      (step, i, arr) => (
                        <div key={step} className="contents">
                          <div className="bg-stone-200 text-stone-500 rounded-lg px-4 py-2 text-sm text-center line-through opacity-50">
                            {step}
                          </div>
                          {i < arr.length - 1 && (
                            <div
                              aria-hidden
                              className="self-center w-px h-4 bg-stone-300"
                            />
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Arrow between columns */}
                <div
                  aria-hidden
                  className="hidden md:flex items-center justify-center text-2xl text-terracotta self-center"
                >
                  →
                </div>

                {/* After */}
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-4">
                    After
                  </div>
                  <div className="flex flex-col items-stretch">
                    {["Marketers", "Visual composer", "Send"].map((step, i, arr) => (
                      <div key={step} className="contents">
                        <div className="bg-cream-warm border border-terracotta text-charcoal rounded-lg px-4 py-2 text-sm text-center">
                          {step}
                        </div>
                        {i < arr.length - 1 && (
                          <div
                            aria-hidden
                            className="self-center w-px h-4 bg-terracotta/40"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Why we started */}
          <div id="why-we-started" className="scroll-mt-20 mt-32 pb-32">
            <Section kicker="01 · Context" heading="Why we started">
              <Prose>
                <p>
                  Seamm&rsquo;s marketing team needed to re-engage users and announce new features
                  through push notifications. Every campaign required a Slack message to
                  engineering, manual database queries, and developer intervention to send.
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

              <Callout className="mt-14" label="The goal">
                My goal: design an end-to-end flow that empowers non-technical admins to create,
                target, and send push notifications with confidence — and zero code.
              </Callout>

              <Callout className="mt-14" label="Key insight">
                Every change, no matter how small, required an engineer. Marketing was paralyzed.
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
            />

            <Prose className="mt-8">
              <p>
                I considered a separate Preview step — Edit, then Save, then Preview, then Send.
                But I chose live preview because it reduces friction, enables rapid iteration (3
                message variants in 2 minutes), and eliminates undo anxiety.
              </p>
            </Prose>

            <Callout className="mt-14" label="Design decision">
              <em>Trade-off:</em> More complex state management in code, but the UX benefit
              justified the engineering cost.
            </Callout>
          </div>

          {/* Who receives this — now includes Zero-state subblock */}
          <div id="audience" className="scroll-mt-20 pb-32">
            <Section
              kicker="03 · Targeting"
              heading={
                <>
                  Who <em>receives</em> this?
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
            />

            <Prose className="mt-8">
              <p>
                I considered displaying filters directly on the main screen. But I chose a modal
                because 80% of campaigns target fewer than 50 users, simple search handles the
                majority of cases, and it keeps the main composer clean.
              </p>
            </Prose>

            <Callout className="mt-14" label="Design decision">
              &lsquo;Simple by default, powerful when needed&rsquo; — this approach matched how
              the team actually worked.
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
              />
            </div>
          </div>

          {/* Confirmation */}
          <div id="confirmation" className="scroll-mt-20 pb-32">
            <Section
              kicker="04 · Safety"
              heading={
                <>
                  The <em>anxiety-free</em> confirmation
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
            />

            <Callout className="mt-14" label="Key insight">
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

            <Callout className="mt-14" label="Key insight">
              Marketing wanted confidence over flexibility. Reducing options turned out to be more
              empowering than adding them.
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
        </article>
      </main>

      <Footer />
    </>
  );
}
