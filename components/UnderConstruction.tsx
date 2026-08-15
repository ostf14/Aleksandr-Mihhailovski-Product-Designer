"use client";

import { usePathname } from "next/navigation";
import { isWipRoute } from "@/lib/site";

/**
 * Hazard tape stretched across the bottom-right corner on routes still listed
 * in WIP_ROUTES.
 *
 * Colours are hard-coded signal yellow and near-black on purpose — pulling
 * them from the site palette would make the tape read as decoration, and it
 * has to read as scaffolding that is coming down again.
 *
 * Sits at z-30: under the nav (z-50) and the scroll-to-top button (z-40),
 * both of which live in this same corner. Combined with pointer-events-none,
 * nothing it overlaps loses a click or a hover.
 */
export function UnderConstruction() {
  const pathname = usePathname();
  if (!isWipRoute(pathname)) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 right-0 z-30 size-[190px] md:size-[280px] overflow-hidden print:hidden"
    >
      <div
        className="wip-tape-scroll absolute left-1/2 top-1/2 flex h-8 w-[290px] -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] items-center justify-center shadow-[0_2px_14px_rgba(0,0,0,0.28)] md:h-11 md:w-[420px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #FFD500 0 14px, #101010 14px 28px)",
        }}
      >
        <span className="bg-[#101010] px-3 py-[3px] font-mono text-[8px] font-medium uppercase tracking-[0.24em] text-[#FFD500] whitespace-nowrap md:px-4 md:py-1 md:text-[11px] md:tracking-[0.3em]">
          {/* Negative end margin cancels the trailing letter-space so the
              label sits optically centred on the tape. */}
          <span className="-mr-[0.24em] md:-mr-[0.3em] inline-block">
            Under construction
          </span>
        </span>
      </div>
    </div>
  );
}
