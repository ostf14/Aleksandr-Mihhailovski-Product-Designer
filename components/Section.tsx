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
        <div className="px-6 md:px-10 mb-5">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="max-w-prose mx-auto">
              {kicker && (
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400 mb-3">
                  {kicker}
                </div>
              )}
              {heading && (
                <h2 className="font-serif font-normal text-h2 tracking-tight">{heading}</h2>
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
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <FadeIn className="max-w-prose mx-auto">
          <div className="text-[1.125rem] leading-[1.7] text-charcoal/90 space-y-6">{children}</div>
        </FadeIn>
      </div>
    </div>
  );
}
