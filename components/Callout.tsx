import { ReactNode } from "react";
import { Crosshair, GitBranch, Lightbulb, type LucideIcon } from "lucide-react";
import { FadeIn } from "./FadeIn";

const iconMap: Record<string, LucideIcon> = {
  "the goal": Crosshair,
  "key insight": Lightbulb,
  "design decision": GitBranch,
};

export function Callout({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  const Icon = label ? iconMap[label.toLowerCase()] : null;

  return (
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <FadeIn className="max-w-prose mx-auto">
          <div className="bg-cream-warm rounded-lg px-7 py-7 md:px-9 md:py-8">
            {label && (
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                {Icon && <Icon size={14} strokeWidth={1.75} aria-hidden />}
                <span>{label}</span>
              </div>
            )}
            <div className="text-[1.125rem] leading-[1.65] text-charcoal">{children}</div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
