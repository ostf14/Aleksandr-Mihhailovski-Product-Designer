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

export function Impact() {
  return (
    <section className="px-6 md:px-10">
      <div className="max-w-bleed mx-auto">
        <FadeIn>
          <div className="border border-stone-200 bg-cream-warm rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`${i > 0 ? "md:border-l md:border-stone-200" : ""} ${
                  i === 0 ? "md:pr-6" : i === 2 ? "md:pl-6" : "md:px-6"
                }`}
              >
                <div className="font-mono text-terracotta leading-none tracking-tight text-[clamp(1.375rem,2.4vw,1.625rem)] whitespace-nowrap">
                  <AnimatedNumber value={m.value} />
                </div>
                <div className="mt-3 text-xs md:text-[13px] text-stone-500 leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
