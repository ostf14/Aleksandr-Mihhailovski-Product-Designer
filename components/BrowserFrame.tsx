import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  url?: string;
  className?: string;
};

export function BrowserFrame({ children, url, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-line dark:border-line/40 overflow-hidden bg-bg ${className}`}
    >
      {/* Chrome */}
      <div className="h-8 bg-surface-deep dark:bg-surface-deep flex items-center px-3 relative">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-full" style={{ background: "#FF5F57" }} />
          <span aria-hidden className="size-3 rounded-full" style={{ background: "#FEBC2E" }} />
          <span aria-hidden className="size-3 rounded-full" style={{ background: "#28C840" }} />
        </div>
        {url && (
          <span className="absolute left-1/2 -translate-x-1/2 max-w-[60%] truncate text-[11px] text-faint">
            {url}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="overflow-auto [&>img]:block [&>img]:w-full">{children}</div>
    </div>
  );
}
