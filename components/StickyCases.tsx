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
 * Writes custom properties on the element rather than setting `transform`
 * directly: the CSS owns the whole expression (perspective, rotation, hover
 * lift), so a hover rule can change the lift without JS and the two never
 * fight over the same property. --mx/--my are the pointer's offset from the
 * centre in [-0.5, 0.5] and drive the rotation; --sx/--sy are its position in
 * raw pixels and drive the spotlight.
 *
 * The spotlight takes pixels rather than percentages on purpose. It is a fixed
 * box moved by `transform`, not a background painted at a moving position —
 * a transform is composited, so the expensive dither filter on it rasterises
 * once and is then just pushed around, instead of re-running on every frame of
 * every pointermove.
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
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
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

/**
 * The cursor spotlight, dithered.
 *
 * Same idea as the hero portrait's filter, but applied to ALPHA rather than to
 * colour: the source is a soft radial wash of the accent, and this replaces its
 * smooth falloff with a stipple. Pull the source's alpha out into RGB, add a
 * field of noise, threshold to one bit, push the result back into alpha, and
 * fill it with flat accent. So instead of a 10%-opaque orange haze it paints
 * roughly a tenth of the pixels at full strength — which is what a translucent
 * wash *is*, once you are not allowed to be translucent.
 *
 * flood-color is set from CSS (globals.css) rather than hardcoded here, so it
 * follows --rgb-terracotta across themes; the accent is a different value in
 * light and dark.
 */
function SpotlightFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      className="absolute h-0 w-0 overflow-hidden"
    >
      <filter id="spot-dither" colorInterpolationFilters="sRGB">
        {/* alpha -> RGB, opaque */}
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 1 0
                  0 0 0 1 0
                  0 0 0 1 0
                  0 0 0 0 1"
          result="alphaGrey"
        />

        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="1"
          seed="3"
          result="noise"
        />
        {/* Red into RGB, alpha pinned to 1 — feTurbulence writes noise into
            alpha too, and premultiplied compositing then eats the variation. */}
        <feColorMatrix
          in="noise"
          type="matrix"
          values="1 0 0 0 0
                  1 0 0 0 0
                  1 0 0 0 0
                  0 0 0 0 1"
          result="noiseGrey"
        />
        {/* One octave clusters tightly around 0.5, so it gets stretched — but
            only this far. For coverage to track the wash's alpha the noise has
            to stay spread across the range: threshold(alpha + n - 0.5) leaves
            a fraction of pixels standing equal to alpha only when n is roughly
            uniform. Stretched hard enough to clip (slope 4, as in the hero
            portrait) it collapses towards 0 and 1, the comparison stops
            involving the image at all, and every pixel under the wash coin
            flips — which is exactly what the first pass did: a uniform square
            of confetti with no falloff in it. */}
        <feComponentTransfer in="noiseGrey" result="noiseAmp">
          <feFuncR type="linear" slope="2.2" intercept="-0.6" />
          <feFuncG type="linear" slope="2.2" intercept="-0.6" />
          <feFuncB type="linear" slope="2.2" intercept="-0.6" />
        </feComponentTransfer>

        {/* alpha + (noise - 0.5) */}
        <feComposite
          in="alphaGrey"
          in2="noiseAmp"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="-0.5"
          result="mixed"
        />
        <feComponentTransfer in="mixed" result="stepped">
          <feFuncR type="discrete" tableValues="0 1" />
          <feFuncG type="discrete" tableValues="0 1" />
          <feFuncB type="discrete" tableValues="0 1" />
        </feComponentTransfer>

        {/* back into alpha, then fill it with flat accent */}
        <feColorMatrix
          in="stepped"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  1 0 0 0 0"
          result="mask"
        />
        <feFlood result="accent" />
        <feComposite in="accent" in2="mask" operator="in" />
      </filter>
    </svg>
  );
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

        {/* viz — the cover, held at a fixed height so seven panels of mixed
            source material still scroll past at one rhythm */}
        <div className="relative h-[200px] md:h-[240px] overflow-hidden border-b border-stone-200/60 bg-cream-warm dark:bg-cream-deep">
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
    <div
      ref={gridRef}
      className="mx-auto grid max-w-[1080px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
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

      <SpotlightFilter />
    </div>
  );
}
