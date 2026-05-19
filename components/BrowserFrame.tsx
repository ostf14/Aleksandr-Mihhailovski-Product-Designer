import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  url?: string;
  className?: string;
};

export function BrowserFrame({ children, url, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-stone-200 dark:border-stone-200/40 overflow-hidden bg-cream ${className}`}
    >
      {/* Chrome */}
      <div className="h-8 bg-stone-200 dark:bg-stone-700 flex items-center px-3 relative">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-full" style={{ background: "#FF5F57" }} />
          <span aria-hidden className="size-3 rounded-full" style={{ background: "#FEBC2E" }} />
          <span aria-hidden className="size-3 rounded-full" style={{ background: "#28C840" }} />
        </div>
        {url && (
          <span className="absolute left-1/2 -translate-x-1/2 max-w-[60%] truncate text-[11px] text-stone-400">
            {url}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="overflow-auto [&>img]:block [&>img]:w-full">{children}</div>
    </div>
  );
}
