import { AnimatedNumber } from "./AnimatedNumber";
import { FadeIn } from "./FadeIn";

type Metric = {
  value: string;
  label: string;
};

const defaultMetrics: Metric[] = [
  { value: "~30 min → 2 min", label: "Campaign creation time" },
  { value: "3.75×", label: "Campaign velocity" },
  { value: "15+ h/month", label: "Engineering time freed" },
];

const defaultBeforeSteps = [
  "Marketers",
  "Slack message",
  "Dev team codes",
  "Wait",
  "Send",
];
const defaultAfterSteps = ["Marketers", "Visual composer", "Send"];

export function Impact({
  metrics = defaultMetrics,
  beforeSteps = defaultBeforeSteps,
  afterSteps = defaultAfterSteps,
}: {
  metrics?: Metric[];
  beforeSteps?: string[];
  afterSteps?: string[];
} = {}) {
  const showFlow = beforeSteps.length > 0 || afterSteps.length > 0;
  return (
    <section className="">
      <div className="shell">
        <FadeIn>
          <div className="space-y-6 rounded-2xl border border-line bg-surface p-8">
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 md:gap-x-0 md:gap-y-0">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`${i > 0 ? "md:border-l md:border-line" : ""} ${
                    i === 0 ? "md:pr-6" : i === 2 ? "md:pl-6" : "md:px-6"
                  }`}
                >
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {m.label}
                  </div>
                  <div className="font-sans text-h2 font-semibold leading-none tracking-tight text-fg">
                    <AnimatedNumber value={m.value} />
                  </div>
                </div>
              ))}
            </div>

            {showFlow && (
              <>
                {/* Divider */}
                <div aria-hidden className="h-px bg-surface-deep" />

                {/* Before / After workflow */}
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-6">
                  {/* Before */}
                  <div>
                    <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      Before
                    </div>
                    <div className="flex flex-col items-stretch">
                      {beforeSteps.map((step, i, arr) => (
                        <div key={step} className="contents">
                          <div className="rounded-lg bg-surface-deep px-4 py-2 text-center text-sm text-muted">
                            {step}
                          </div>
                          {i < arr.length - 1 && (
                            <div
                              aria-hidden
                              className="h-4 w-px self-center bg-line-strong"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow between columns */}
                  <div
                    aria-hidden
                    className="hidden items-center justify-center self-center text-2xl text-faint md:flex"
                  >
                    →
                  </div>

                  {/* After */}
                  <div>
                    <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      After
                    </div>
                    <div className="flex flex-col items-stretch">
                      {afterSteps.map((step, i, arr) => (
                        <div key={step} className="contents">
                          <div className="rounded-lg border border-accent bg-bg px-4 py-2 text-center text-sm text-fg">
                            {step}
                          </div>
                          {i < arr.length - 1 && (
                            <div
                              aria-hidden
                              className="h-4 w-px self-center bg-line-strong"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
