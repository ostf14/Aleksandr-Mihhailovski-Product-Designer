import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  url?: string;
  className?: string;
};

export function BrowserFrame({ children, url, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-bg dark:border-line/40 ${className}`}
    >
      {/* Chrome */}
      <div className="relative flex h-8 items-center bg-surface-deep px-3 dark:bg-surface-deep">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-3 rounded-full"
            style={{ background: "#FF5F57" }}
          />
          <span
            aria-hidden
            className="size-3 rounded-full"
            style={{ background: "#FEBC2E" }}
          />
          <span
            aria-hidden
            className="size-3 rounded-full"
            style={{ background: "#28C840" }}
          />
        </div>
        {url && (
          <span className="absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-[11px] text-faint">
            {url}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="overflow-auto [&>img]:block [&>img]:w-full">
        {children}
      </div>
    </div>
  );
}
