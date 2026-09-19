"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseCardMedia } from "./CaseCardMedia";
import { useTilt } from "./useTilt";
import { cases, workHref, type Work } from "@/lib/works";

/**
 * Reveal-on-enter for the whole grid, from a single observer.
 *
 * The stagger lives in CSS (`--d` per child, read by the `.rv` transition
 * delay) instead of in a chain of timeouts, so a fast scroll past the section
 * cannot leave half the panels mid-flight. `once: true` semantics — the
 * observer unobserves each element the first time it lands.
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
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}

function Panel({ work, index }: { work: Work; index: number }) {
  const tiltRef = useTilt<HTMLAnchorElement>();

  return (
    <div
      className="rv rv-scale"
      style={{ "--d": `${index * 80}ms` } as CSSProperties}
    >
      <a
        ref={tiltRef}
        href={workHref(work)}
        className="tiltable group relative block overflow-hidden rounded-2xl border border-stone-200/60 bg-white dark:bg-cream-warm shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)]"
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
        <div className="relative h-[150px] md:h-auto md:aspect-video overflow-hidden border-b border-stone-200/60 bg-cream-warm dark:bg-cream-deep">
          <div className="h-full w-full transition-transform duration-t6 ease-out-expo group-hover:scale-[1.03]">
            <CaseCardMedia src={work.cover.src} />
          </div>
        </div>

        {/* Satoshi throughout. The kicker was set in the mono face, which put
            a second typeface on a card that holds three lines of text — the
            uppercase and the letterspacing already say "label" without it. */}
        <div className="relative z-[2] p-5 md:p-6">
          <div className="font-sans text-[11px] uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
            {work.role}
            <span className="text-stone-400/70"> · </span>
            {work.org}
          </div>

          <div className="mt-2.5 flex items-start justify-between gap-4">
            <h3 className="font-sans text-[24px] md:text-[27px] font-semibold leading-[1.1] tracking-tight text-[#171717] dark:text-[#ededed]">
              {work.title}
            </h3>
            <ArrowUpRight
              size={26}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-stone-400 transition-colors duration-t2 group-hover:text-terracotta"
              aria-hidden
            />
          </div>

          <p className="mt-2 text-[15px] leading-[1.5] text-stone-500">
            {work.blurb}
          </p>
        </div>
      </a>
    </div>
  );
}

export function StickyCases() {
  const gridRef = useReveal<HTMLDivElement>();

  return (
    /* Panels take three quarters, the heading the remaining quarter. A third
       kept the left edge past the middle of the screen but paid for it with a
       void beside a one-word heading; at three quarters the heading column
       reads as a margin someone chose rather than as space left over. */
    <div
      ref={gridRef}
      className="mx-auto grid max-w-[1080px] grid-cols-1 gap-10 md:grid-cols-[1fr_3fr] md:gap-14 lg:gap-20"
    >
      <div className="self-start md:sticky md:top-[18vh]">
        {/* Heading alone for now. The standfirst that sat here was cut — the
            sticky column is the one piece of prose visible for the whole
            scroll, so a line that only describes the section wastes it. */}
        <h2 className="rv font-sans text-4xl md:text-5xl font-semibold tracking-tight text-[#171717] dark:text-[#ededed]">
          Cases
        </h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {cases.map((c, i) => (
          <Panel key={c.slug} work={c} index={i} />
        ))}
      </div>
    </div>
  );
}
