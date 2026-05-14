import { FadeStagger, FadeChild } from "./FadeIn";

export function NumberedList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <FadeStagger className="max-w-prose mx-auto">
          <ol className="space-y-6">
            {items.map((text, i) => (
              <FadeChild key={i} as="li" className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.125rem] leading-[1.65] text-charcoal/90">{text}</span>
              </FadeChild>
            ))}
          </ol>
        </FadeStagger>
      </div>
    </div>
  );
}
