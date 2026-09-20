"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseCardMedia } from "./CaseCardMedia";
import { useTilt } from "./useTilt";
import { workHref, type Work } from "@/lib/works";

/** Delay between two panels that come into view in the same batch. */
const STAGGER_MS = 70;
/** A batch never delays anything past this, however many arrive together. */
const STAGGER_CAP_MS = 210;

/**
 * Reveal-on-enter for the whole grid, from a single observer.
 *
 * Two things here were measured going wrong and are fixed deliberately.
 *
 * 1. WHEN it fires. This used to ask for threshold 0.15 inside a root shrunk
 *    12% at the bottom. That was tuned when a panel was ~350px tall; panels are
 *    now ~500-620px, and 15% of a tall panel is a lot of pixels. Measured at
 *    1440x900: a panel sitting at top 786 — 114px of it on screen — had not
 *    fired, so the card sat there blank while visibly in view. Now it is
 *    threshold 0 against a fixed 48px inset: the moment a sliver clears the
 *    bottom edge, it goes. A fixed inset rather than a percentage because a
 *    percentage of a tall window is a large number, which is how the old value
 *    got away with it on a laptop and failed on a desktop.
 *
 * 2. The STAGGER. The delay used to be baked in per index — panel 7 carried
 *    `--d: 480ms` for its whole life. But these panels come into view one at a
 *    time as you scroll, not as a group, so the seventh card waited 480ms doing
 *    nothing and then took another 480ms to fade: a second between "should
 *    appear" and "has appeared". That is the hang.
 *
 *    The delay is now assigned per BATCH, at the moment the observer fires.
 *    Cards that genuinely arrive together still cascade; a card arriving alone
 *    — which is what scrolling actually produces — starts immediately.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".rv"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        arriving.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.setProperty(
            "--d",
            `${Math.min(i * STAGGER_MS, STAGGER_CAP_MS)}ms`,
          );
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}

function Panel({ work }: { work: Work }) {
  const tiltRef = useTilt<HTMLAnchorElement>();

  // No --d in the markup any more: the observer assigns it per batch, so a
  // panel scrolled to on its own does not inherit a queue position it is not
  // in.
  return (
    <div className="rv rv-scale">
      <a
        ref={tiltRef}
        href={workHref(work)}
        className="tiltable group relative block overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)]"
      >
        {/* The spotlight. A fixed box centred on the pointer and moved by
            transform alone — see useTilt for why that matters. */}
        <span aria-hidden className="spot" />

        {/* viz — a ratio on the desktop, not a height. 240px was chosen when
            the panel was 475 wide, which made the cover a reasonable 1.98:1;
            the panel then grew to 750 and the height stayed, so the cover
            drifted to 3.12:1 — wider than any cinema format, which is what
            made these read as stretched. 16:9 is also the native shape of the
            screenshots most of them are. Mobile keeps its fixed 150. */}
        <div className="relative h-[150px] overflow-hidden border-b border-line/60 bg-surface dark:bg-surface-deep md:aspect-video md:h-auto">
          <div className="h-full w-full transition-transform duration-t6 ease-out-expo group-hover:scale-[1.03]">
            <CaseCardMedia src={work.cover.src} />
          </div>
        </div>

        {/* Satoshi throughout. The kicker was set in the mono face, which put
            a second typeface on a card that holds three lines of text — the
            uppercase and the letterspacing already say "label" without it. */}
        <div className="relative z-[2] p-5 md:p-6">
          <div className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted dark:text-faint">
            {work.role}
            <span className="text-faint/70"> · </span>
            {work.org}
          </div>

          <div className="mt-2.5 flex items-start justify-between gap-4">
            <h3 className="font-sans text-[24px] font-semibold leading-[1.1] tracking-tight text-fg md:text-[27px]">
              {work.title}
            </h3>
            <ArrowUpRight
              size={26}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-faint transition-colors duration-t2 group-hover:text-accent"
              aria-hidden
            />
          </div>

          <p className="mt-2 text-[15px] leading-[1.5] text-muted">
            {work.blurb}
          </p>
        </div>
      </a>
    </div>
  );
}

/**
 * The cases grid, used by /product and /gamedev alike. It takes the list
 * rather than reading one, so the two sections are the same page built from
 * different halves of lib/works.ts — nothing is duplicated and nothing can
 * drift apart.
 */
export function StickyCases({
  works,
  heading = "Cases",
}: {
  works: Work[];
  heading?: string;
}) {
  const gridRef = useReveal<HTMLDivElement>();

  return (
    /* Panels take three quarters, the heading the remaining quarter. A third
       kept the left edge past the middle of the screen but paid for it with a
       void beside a one-word heading; at three quarters the heading column
       reads as a margin someone chose rather than as space left over. */
    <div
      ref={gridRef}
      className="shell grid grid-cols-1 gap-10 md:grid-cols-[1fr_3fr] md:gap-14 lg:gap-20"
    >
      <div className="self-start md:sticky md:top-[18vh]">
        {/* Heading alone for now. The standfirst that sat here was cut — the
            sticky column is the one piece of prose visible for the whole
            scroll, so a line that only describes the section wastes it. */}
        <h2 className="rv font-sans text-4xl font-semibold tracking-tight text-fg md:text-5xl">
          {heading}
        </h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {works.map((c) => (
          <Panel key={c.slug} work={c} />
        ))}
      </div>
    </div>
  );
}
