import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

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
          <header
            id="overview"
            className="scroll-mt-20 px-6 md:px-10 pt-6 md:pt-10 pb-14"
          >
            <div className="max-w-bleed mx-auto">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3">
                  Process · AI Workflow · 2024–2025
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  Multi-Agent AI Workflow
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  I built an AI-orchestrated prototyping pipeline — and what it taught
                  me about product design.
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

            <FadeIn delay={0.15} className="max-w-bleed mx-auto mt-12">
              <div className="border border-stone-200 bg-cream-warm rounded-lg overflow-hidden">
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0">
                  <div className="md:pr-6">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      Solo builder / methodology designer
                    </p>
                  </div>

                  <div className="md:px-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Project
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      Internal R&amp;D
                      <span className="block text-stone-500 text-xs mt-1">
                        sandbox: ‘Don’t Tread on Cat’ game prototype
                      </span>
                    </p>
                  </div>

                  <div className="md:px-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Timeline
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                      2024–2025
                    </p>
                  </div>

                  <div className="md:pl-6 md:border-l md:border-stone-200">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                      Focus
                    </div>
                    <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                      {["AI orchestration", "Prototyping methodology"].map((item) => (
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

              </div>
            </FadeIn>
          </header>

          {/* Context */}
          <div id="context" className="scroll-mt-20 mt-16 pb-32">
            <Section kicker="01 · Context" heading="Can AI replace specialised roles?">
              <Prose>
                <p>
                  Product development traditionally needs specialised teams: architects
                  design logic, engineers write code, QA validates. For solo builders,
                  this creates a trade-off — build fast but brittle, or build properly
                  but slowly.
                </p>
                <p>
                  I wanted to test a hypothesis: can AI agents replace these specialised
                  roles if orchestrated correctly?
                </p>
                <p>
                  I picked game development as the sandbox. High complexity, fast
                  feedback loops, empirical validation through runtime testing. The real
                  goal wasn’t shipping a game — it was a workflow I could bring back to
                  product design and prototyping.
                </p>
              </Prose>

              <Callout className="mt-10" label="The goal">
                Design an AI-orchestrated pipeline where each stage plays a specialised
                role. Prove it works by shipping something hard.
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
                <p className="!text-[0.95rem] !leading-[1.6] italic text-charcoal/60">
                  Note: I use ‘multi-agent’ loosely throughout — a pipeline of distinct
                  AI tools coordinated by a human, not autonomous agent-to-agent
                  communication.
                </p>
                <p>
                  I designed a three-role pipeline: two AI agents and the game engine
                  itself as the validator. Each had a distinct job and clear
                  boundaries — no overlap, no ambiguity about who owns what.
                </p>
              </Prose>
            </Section>

            <div className="px-6 md:px-10 mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="max-w-prose mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {agents.map((a, i) => (
                      <FadeIn key={a.name} delay={i * 0.08} className="h-full">
                        <div className="group h-full bg-cream-warm rounded-lg p-5 md:p-6 flex flex-col transition-all duration-200 ease-out md:hover:-translate-y-1 md:hover:bg-cream-deep md:hover:shadow-sm">
                          <div className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium mb-3 transition-colors duration-200 ease-out md:group-hover:text-terracotta">
                            {a.kind}
                          </div>
                          <h3 className="text-base md:text-[1.0625rem] font-medium tracking-tight leading-snug mb-1">
                            {a.name}
                          </h3>
                          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                            {a.title}
                          </div>
                          <p className="text-[0.9375rem] leading-[1.55] text-charcoal/80 mb-2">
                            <span className="font-medium text-charcoal">Role.</span>{" "}
                            {a.role}
                          </p>
                          <p className="text-[0.9375rem] leading-[1.55] text-charcoal/80">
                            <span className="font-medium text-charcoal">Output.</span>{" "}
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
              AI excels at structured logic but hallucinates on ‘feel.’ The validator
              stage is where the runtime tells you what the model can’t.
            </Callout>
          </div>

          {/* In practice */}
          <div id="practice" className="scroll-mt-20 pb-32">
            <Section kicker="03 · In practice" heading="What the loop actually looked like">
              <Prose>
                <p>
                  In practice the three stages ran in fast cycles: Gemini described a
                  state-machine change, Windsurf wrote the C#, Unity ran the build, I
                  watched the result. If the build broke or the behaviour felt wrong,
                  the validator output became the next prompt for the architect.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/demo-1.gif"
              label="Side-by-side: code in Windsurf, runtime in Unity"
              caption="Side-by-side: code in Windsurf, runtime in Unity."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/demo-2.gif"
              label="Gameplay prototype"
              caption="Gameplay prototype."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/unity-editor.png"
              label="Unity editor showing the running state machine"
              caption="Unity editor: state machine running."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/demo-3.gif"
              label="Iteration cycle in the editor"
              caption="Early prototype."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/screenshot-1.jpg"
              label="Runtime view of the prototype"
              caption="Runtime view."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/blueprint.png"
              label="Unreal Blueprint architecture from the earlier attempt"
              caption="Before convenient code-first with Windsurf, the early version sat on these heavy Unreal Blueprints."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/blueprint-runtime.png"
              label="Unreal compile times that killed iteration speed"
              caption="Why Unreal didn’t work: 10-min compile times killed iteration loops."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/multi-agent-workflow/discord.png"
              label="Sharing progress with the dev community"
              caption="Sharing progress with the dev community."
            />
          </div>

          {/* Decisions */}
          <div id="decisions" className="scroll-mt-20 pb-32">
            <Section kicker="04 · Decisions" heading="Three calls that made the workflow viable">
              <Prose>
                <p>
                  Every decision was about preserving the empirical loop. The moment a
                  validation step became slower than the agent reply, the whole approach
                  lost its leverage.
                </p>
              </Prose>
            </Section>

            <div className="mt-8 space-y-6">
              {decisions.map((d) => (
                <Callout key={d.h} label="Design decision">
                  <strong className="block mb-2 font-medium text-charcoal">{d.h}</strong>
                  <span className="text-charcoal/85">{d.p}</span>
                </Callout>
              ))}
            </div>
          </div>

          {/* Results */}
          <div id="results" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Results" heading="What the orchestration actually bought">
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <div className="max-w-prose mx-auto space-y-10">
                    {results.map((r, i) => (
                      <FadeIn key={r.h} delay={i * 0.05}>
                        <h3 className="font-serif font-normal text-xl md:text-2xl tracking-tight mb-3">
                          {r.h}
                        </h3>
                        <p className="text-[1.125rem] leading-[1.65] text-charcoal/90">
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
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <div className="max-w-prose mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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

          <MoreCases currentId="multi-agent" />
        </article>
      </main>

      <Footer />
    </>
  );
}
