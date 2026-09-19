import { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

export function Section({
  id,
  heading,
  kicker,
  children,
}: {
  id?: string;
  heading?: ReactNode;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      {(heading || kicker) && (
        <div className="mb-5">
          <div className="shell">
            <FadeIn className="shell-prose">
              {kicker && (
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400 mb-3">
                  {kicker}
                </div>
              )}
              {heading && (
                <h2 className="font-sans font-semibold text-h2 tracking-tight">{heading}</h2>
              )}
            </FadeIn>
          </div>
        </div>
      )}
      {children}
    </section>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <div className="shell">
        <FadeIn className="shell-prose">
          <div className="text-[1.125rem] leading-[1.7] text-charcoal/90 space-y-6">{children}</div>
        </FadeIn>
      </div>
    </div>
  );
}
