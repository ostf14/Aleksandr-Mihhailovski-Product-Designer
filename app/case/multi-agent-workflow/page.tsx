import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CAT_DEV_MEDIA } from "@/lib/cat-dev-media";
import { workMetadata } from "@/lib/works";

export const metadata = workMetadata("multi-agent-workflow");

const toc: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "experiment", label: "The experiment" },
  { id: "practice", label: "In practice" },
  { id: "decisions", label: "Decisions" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "What I learned" },
];

const agents = [
  {
    name: "Gemini 3 Pro",
    title: "Architect",
    kind: "AI Agent",
    role: "System design, state machine logic, debugging strategy.",
    output: "Architecture docs, logic flow, refactoring plans.",
  },
  {
    name: "Windsurf IDE",
    title: "Executor",
    kind: "AI Agent",
    role: "Code generation, C# syntax, Unity API implementation.",
    output: "Functional scripts, component structure.",
  },
  {
    name: "Unity 6",
    title: "Validator",
    kind: "Runtime environment",
    role: "Where everything gets tested — physics, compile errors, real-time behaviour.",
    output: "Empirical truth — does it actually work?",
  },
];

const decisions = [
  {
    h: "Unity over Unreal",
    p: "Unreal’s 10-minute compile times killed the AI iteration loop. The whole point of a multi-agent workflow is empirical validation in seconds, not minutes. Unity’s instant feedback made the methodology actually work.",
  },
  {
    h: "State machines first, graphics later",
    p: "AI excels at structured logic but hallucinates on ‘feel.’ I validated mechanics before polish — proved the system worked before letting AI near anything visual.",
  },
  {
    h: "Human as quality controller, not coder",
    p: "AI can’t tell if controls ‘feel good.’ My job became orchestration, not implementation. Intuition is faster than parameter search.",
  },
];

const results = [
  {
    h: "From days to an evening per mechanic",
    p: "Mechanics that used to take 3–4 days collapsed to a single evening of work. The architect agent handled state machine design while the executor wrote the scripts, and Unity validated each iteration in seconds. The measurement is informal — my own development time before and after — but consistent across the project.",
  },
  {
    h: "From hour-long debugging to ten-minute conversations",
    p: "Where a stubborn bug used to mean a 3-hour session, the loop became a short conversation: Gemini diagnoses, Windsurf patches, Unity confirms. The validator stage replaced most of the guessing.",
  },
  {
    h: "Solo velocity without role handoffs",
    p: "Solo project velocity that previously needed coordination across roles. Not because AI replaced anyone — because orchestration removed the handoff cost.",
  },
];

const lessons = [
  {
    h: "This workflow applies directly to product prototyping",
    p: "Gemini = product strategist (defines system logic). Windsurf = engineer (implements). Browser runtime = user (validates). Same three-stage pipeline. Same separation of roles. Same speed gains when you orchestrate correctly.",
  },
  {
    h: "The skill isn’t coding — it’s orchestration",
    p: "Knowing when to let AI run vs when to intervene is the new craft. One concrete example: AI repeatedly suggested over-engineered solutions for the suspicion state machine — abstract base classes, interface hierarchies — when the right move was three plain if-statements. Stepping back at the wrong moment costs hours; stepping in at the right moment saves them.",
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
          <header id="overview" className="scroll-mt-20 pb-14 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Process · AI Workflow · 2024–2025
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-sans text-hero font-semibold tracking-tight">
                  Multi-Agent AI Workflow
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-fg/70">
                  I built an AI-orchestrated prototyping pipeline — and what it
                  taught me about product design.
                </p>
              </FadeIn>
            </div>

            {/* Cover banner — above the overview */}
            <div className="mt-10">
              <ImagePlaceholder
                label="Multi-Agent AI Workflow cover"
                src="/cases/multi-agent-workflow/cover.jpg"
                wide
              />
            </div>

            <FadeIn delay={0.15} className="shell mt-12">
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <div className="grid grid-cols-1 gap-y-8 p-6 md:grid-cols-4 md:gap-y-0 md:p-8">
                  <div className="md:pr-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                      Solo builder / methodology designer
                    </p>
                  </div>

                  <div className="md:border-l md:border-line md:px-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Project
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                      Internal R&amp;D
                      <span className="mt-1 block text-xs text-muted">
                        sandbox: ‘Don’t Tread on Cat’ game prototype
                      </span>
                    </p>
                  </div>

                  <div className="md:border-l md:border-line md:px-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Timeline
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                      2024–2025
                    </p>
                  </div>

                  <div className="md:border-l md:border-line md:pl-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Focus
                    </div>
                    <ul className="space-y-1.5 text-xs leading-[1.55] text-fg/90">
                      {["AI orchestration", "Prototyping methodology"].map(
                        (item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span
                              aria-hidden
                              className="mt-[7px] inline-block size-1.5 shrink-0 rounded-full bg-mark"
                            />
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </header>

          {/* Context */}
          <div id="context" className="mt-16 scroll-mt-20 pb-32">
            <Section
              kicker="01 · Context"
              heading="Can AI replace specialised roles?"
            >
              <Prose>
                <p>
                  Product development traditionally needs specialised teams:
                  architects design logic, engineers write code, QA validates.
                  For solo builders, this creates a trade-off — build fast but
                  brittle, or build properly but slowly.
                </p>
                <p>
                  I wanted to test a hypothesis: can AI agents replace these
                  specialised roles if orchestrated correctly?
                </p>
                <p>
                  I picked game development as the sandbox. High complexity,
                  fast feedback loops, empirical validation through runtime
                  testing. The real goal wasn’t shipping a game — it was a
                  workflow I could bring back to product design and prototyping.
                </p>
              </Prose>

              <Callout className="mt-10" label="The goal">
                Design an AI-orchestrated pipeline where each stage plays a
                specialised role. Prove it works by shipping something hard.
              </Callout>
            </Section>
          </div>

          {/* Experiment */}
          <div id="experiment" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · The experiment"
              heading="A pipeline of two AI tools and a runtime"
            >
              <Prose>
                <p className="!text-[0.95rem] italic !leading-[1.6] text-fg/60">
                  Note: I use ‘multi-agent’ loosely throughout — a pipeline of
                  distinct AI tools coordinated by a human, not autonomous
                  agent-to-agent communication.
                </p>
                <p>
                  I designed a three-role pipeline: two AI agents and the game
                  engine itself as the validator. Each had a distinct job and
                  clear boundaries — no overlap, no ambiguity about who owns
                  what.
                </p>
              </Prose>
            </Section>

            <div className="mt-8">
              <div className="shell">
                <div className="shell-prose">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                    {agents.map((a, i) => (
                      <FadeIn key={a.name} delay={i * 0.08} className="h-full">
                        <div className="group flex h-full flex-col rounded-lg bg-surface p-5 transition-all duration-200 ease-out md:p-6 md:hover:-translate-y-1 md:hover:bg-surface-deep md:hover:shadow-sm">
                          <div className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 ease-out md:group-hover:text-accent">
                            {a.kind}
                          </div>
                          <h3 className="mb-1 text-base font-medium leading-snug tracking-tight md:text-[1.0625rem]">
                            {a.name}
                          </h3>
                          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                            {a.title}
                          </div>
                          <p className="mb-2 text-[0.9375rem] leading-[1.55] text-fg/80">
                            <span className="font-medium text-fg">Role.</span>{" "}
                            {a.role}
                          </p>
                          <p className="text-[0.9375rem] leading-[1.55] text-fg/80">
                            <span className="font-medium text-fg">Output.</span>{" "}
                            {a.output}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Callout className="mt-10" label="Key insight">
              AI excels at structured logic but hallucinates on ‘feel.’ The
              validator stage is where the runtime tells you what the model
              can’t.
            </Callout>
          </div>

          {/* In practice */}
          <div id="practice" className="scroll-mt-20 pb-32">
            <Section
              kicker="03 · In practice"
              heading="What the loop actually looked like"
            >
              <Prose>
                <p>
                  In practice the three stages ran in fast cycles: Gemini
                  described a state-machine change, Windsurf wrote the C#, Unity
                  ran the build, I watched the result. If the build broke or the
                  behaviour felt wrong, the validator output became the next
                  prompt for the architect.
                </p>
              </Prose>
            </Section>

            {/* The footage is in lib/cat-dev-media.ts, because the game's own
                page shows five of these frames too — see the note there. The
                order and the captions are unchanged; what used to be eight
                hand-written blocks is now the same eight from one list. */}
            {CAT_DEV_MEDIA.map((m) => (
              <ImagePlaceholder
                key={m.src}
                className="mt-8"
                src={m.src}
                label={m.label}
                caption={m.caption}
              />
            ))}
          </div>

          {/* Decisions */}
          <div id="decisions" className="scroll-mt-20 pb-32">
            <Section
              kicker="04 · Decisions"
              heading="Three calls that made the workflow viable"
            >
              <Prose>
                <p>
                  Every decision was about preserving the empirical loop. The
                  moment a validation step became slower than the agent reply,
                  the whole approach lost its leverage.
                </p>
              </Prose>
            </Section>

            <div className="mt-8 space-y-6">
              {decisions.map((d) => (
                <Callout key={d.h} label="Design decision">
                  <strong className="mb-2 block font-medium text-fg">
                    {d.h}
                  </strong>
                  <span className="text-fg/85">{d.p}</span>
                </Callout>
              ))}
            </div>
          </div>

          {/* Results */}
          <div id="results" className="scroll-mt-20 pb-32">
            <Section
              kicker="05 · Results"
              heading="What the orchestration actually bought"
            >
              <div className="">
                <div className="shell">
                  <div className="shell-prose space-y-10">
                    {results.map((r, i) => (
                      <FadeIn key={r.h} delay={i * 0.05}>
                        <h3 className="mb-3 font-sans text-xl font-semibold tracking-tight md:text-2xl">
                          {r.h}
                        </h3>
                        <p className="text-[1.125rem] leading-[1.65] text-fg/90">
                          {r.p}
                        </p>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* Lessons */}
          <div id="lessons" className="scroll-mt-20 pb-32">
            <Section
              kicker="06 · Lessons"
              heading={
                <>
                  What I <em>learned</em>
                </>
              }
            >
              <div className="">
                <div className="shell">
                  <div className="shell-prose">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                      {lessons.map((r, i) => (
                        <FadeIn key={r.h} delay={i * 0.08} className="h-full">
                          <div className="group flex h-full flex-col rounded-lg bg-surface p-5 transition-all duration-200 ease-out md:p-6 md:hover:-translate-y-1 md:hover:bg-surface-deep md:hover:shadow-sm">
                            <div className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 ease-out md:group-hover:text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <h3 className="mb-3 text-base font-medium leading-snug tracking-tight md:text-[1.0625rem]">
                              {r.h}
                            </h3>
                            <p className="text-[0.9375rem] leading-[1.55] text-fg/80">
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

          <MoreCases currentId="multi-agent-workflow" />
        </article>
      </main>

      <Footer />
    </>
  );
}
