import { AnimatedNumber } from "./AnimatedNumber";
import { FadeIn } from "./FadeIn";

type Metric = {
  value: string;
  label: string;
};

const metrics: Metric[] = [
  { value: "~30 min → 2 min", label: "Campaign creation time" },
  { value: "3.75×", label: "Campaign velocity" },
  { value: "15+ h/month", label: "Engineering time freed" },
];

const beforeSteps = ["Marketers", "Slack message", "Dev team codes", "Wait", "Send"];
const afterSteps = ["Marketers", "Visual composer", "Send"];

export function Impact() {
  return (
    <section className="px-6 md:px-10">
      <div className="max-w-bleed mx-auto">
        <FadeIn>
          <div className="border border-stone-200 bg-cream-warm rounded-2xl p-8 space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 gap-x-6 md:gap-x-0">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`${i > 0 ? "md:border-l md:border-stone-200" : ""} ${
                    i === 0 ? "md:pr-6" : i === 2 ? "md:pl-6" : "md:px-6"
                  }`}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-2">
                    {m.label}
                  </div>
                  <div className="font-serif text-charcoal tracking-tight text-h2 leading-none whitespace-nowrap">
                    <AnimatedNumber value={m.value} />
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div aria-hidden className="h-px bg-stone-200" />

            {/* Before / After workflow */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-6 items-start">
              {/* Before */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-4">
                  Before
                </div>
                <div className="flex flex-col items-stretch">
                  {beforeSteps.map((step, i, arr) => (
                    <div key={step} className="contents">
                      <div className="bg-stone-200 text-stone-500 rounded-lg px-4 py-2 text-sm text-center">
                        {step}
                      </div>
                      {i < arr.length - 1 && (
                        <div aria-hidden className="self-center w-px h-4 bg-stone-300" />
                      )}
                    </div>
                  ))}
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
                  {afterSteps.map((step, i, arr) => (
                    <div key={step} className="contents">
                      <div className="bg-cream border border-terracotta text-charcoal rounded-lg px-4 py-2 text-sm text-center">
                        {step}
                      </div>
                      {i < arr.length - 1 && (
                        <div aria-hidden className="self-center w-px h-4 bg-terracotta/40" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
