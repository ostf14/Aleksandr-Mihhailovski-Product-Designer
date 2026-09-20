import { FadeStagger, FadeChild } from "./FadeIn";

export function NumberedList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <div className="shell">
        <FadeStagger className="shell-prose">
          <ol className="space-y-6">
            {items.map((text, i) => (
              <FadeChild key={i} as="li" className="flex items-baseline gap-4">
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.125rem] leading-[1.65] text-fg/90">
                  {text}
                </span>
              </FadeChild>
            ))}
          </ol>
        </FadeStagger>
      </div>
    </div>
  );
}
