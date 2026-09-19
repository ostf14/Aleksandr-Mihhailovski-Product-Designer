"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseCardMedia } from "./CaseCardMedia";
import { cases, workHref, type Work } from "@/lib/works";

/** Degrees of rotation at the very corner of a panel. Past ~6° the text edge
 *  starts to shimmer on non-retina displays, so this stays deliberately low. */
const TILT = 5;

/**
 * Cursor-following tilt for one panel.
 *
 * Writes four custom properties on the element rather than setting `transform`
 * directly: the CSS owns the whole expression (perspective, rotation, hover
 * lift), so a hover rule can change the lift without JS and the two never
 * fight over the same property. --px/--py drive the spotlight; --mx/--my the
 * rotation, normalised to [-0.5, 0.5] from the pointer's position in the box.
 *
 * Bound only for fine pointers: on touch there is no hover state to follow, and
 * a tilt that never resets reads as a rendering bug.
 */
function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--px", `${x * 100}%`);
      el.style.setProperty("--py", `${y * 100}%`);
      el.style.setProperty("--mx", `${x - 0.5}`);
      el.style.setProperty("--my", `${y - 0.5}`);
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}

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
        {/* viz — the cover, held at a fixed height so seven panels of mixed
            source material still scroll past at one rhythm */}
        <div className="relative h-[200px] md:h-[280px] overflow-hidden border-b border-stone-200/60 bg-cream-warm dark:bg-cream-deep">
          <div className="h-full w-full transition-transform duration-t6 ease-out-expo group-hover:scale-[1.03]">
            <CaseCardMedia src={work.cover.src} />
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-1.5 shrink-0 rounded-full bg-stone-400"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
              {work.role}
              <span className="text-stone-400/70"> | </span>
              {work.org}
            </span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="font-sans text-[26px] md:text-[30px] font-semibold leading-[1.1] tracking-tight text-[#171717] dark:text-[#ededed]">
              {work.title}
            </h3>
            <ArrowUpRight
              size={28}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-stone-400 transition-colors duration-t2 group-hover:text-terracotta"
              aria-hidden
            />
          </div>

          <p className="mt-2 max-w-[54ch] text-[15px] leading-[1.5] text-stone-500">
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
    <div
      ref={gridRef}
      className="mx-auto grid max-w-[1080px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14 lg:gap-20"
    >
      <div className="self-start md:sticky md:top-[18vh]">
        <h2 className="rv font-sans text-4xl md:text-5xl font-semibold tracking-tight text-[#171717] dark:text-[#ededed]">
          Cases
        </h2>
        <p
          className="rv mt-4 max-w-[30ch] text-[15px] leading-[1.6] text-stone-500"
          style={{ "--d": "80ms" } as CSSProperties}
        >
          {cases.length} projects — B2B tooling, editorial products, and
          prototypes built to find out whether an idea held up. Each one ends
          with what actually changed.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {cases.map((c, i) => (
          <Panel key={c.slug} work={c} index={i} />
        ))}
      </div>
    </div>
  );
}
