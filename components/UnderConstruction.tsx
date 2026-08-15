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
 *
 * The clipping box is the whole viewport rather than a square in the corner.
 * A corner-sized box cut each end of the tape with two perpendicular edges at
 * once, which left a stepped notch instead of a straight end; running the tape
 * past the viewport edges means each end is severed by a single straight edge.
 */
export function UnderConstruction() {
  const pathname = usePathname();
  if (!isWipRoute(pathname)) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden print:hidden"
    >
      {/* Offsets place the band's centre ~70px (mobile) / ~100px (desktop) in
          from each edge, so both ends overshoot the viewport and get cut by
          one edge apiece — never by the corner where two edges meet. */}
      <div
        className="wip-tape-scroll absolute bottom-[54px] -right-[70px] flex h-8 w-[280px] rotate-[-45deg] items-center justify-center shadow-[0_2px_14px_rgba(0,0,0,0.28)] md:bottom-[78px] md:-right-[100px] md:h-11 md:w-[400px]"
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
