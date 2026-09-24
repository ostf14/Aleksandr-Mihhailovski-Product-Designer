"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";

type Slide = {
  title: string;
  images: string[];
};

type Props = {
  slides: Slide[];
  caption?: string;
  className?: string;
  height?: number;
};

export function BrowserCarousel({
  slides,
  caption,
  className = "",
  height = 500,
}: Props) {
  const [index, setIndex] = useState(0);

  /**
   * Which slides are in the DOM. A slide joins the first time it is asked for
   * and never leaves.
   *
   * The cross-fade needs both slides present at once, but that is not a reason
   * to mount all five up front: these are full-page screenshots, two to a
   * slide, and the carousel sits in the header of the page. Mounting on demand
   * means a visit that never touches the arrows costs exactly what it costs
   * today — and a second visit to a slide is instant, with its scroll position
   * where it was left.
   */
  const [mounted, setMounted] = useState<number[]>([0]);

  if (slides.length === 0) return null;

  const total = slides.length;
  const current = slides[index];

  const go = (i: number) => {
    setMounted((m) => (m.includes(i) ? m : [...m, i]));
    setIndex(i);
  };

  const prev = () => go((index - 1 + total) % total);
  const next = () => go((index + 1) % total);

  return (
    <div className={`${className}`}>
      <div className="shell">
        <div className="shell-prose">
          <div className="relative">
            <BrowserFrame url={current.title}>
              {/* Fixed stage — 300px on mobile, prop height on desktop; long slides scroll inside */}
              {/* The slides are stacked and cross-faded, in CSS — see `.cslide`
                  in globals.css.

                  This was a framer AnimatePresence in `mode="wait"`, and
                  "wait" means exactly that: the outgoing slide finishes before
                  the incoming one starts, so the frame stood empty in between
                  and every change took twice the stated duration. Both ends of
                  that also flashed, because framer runs a plain opacity fade
                  through the Web Animations API and hands the value back to
                  the inline style a frame late — the same handoff written up
                  in CLAUDE.md and in FadeIn.tsx.

                  Captured at 1440x900, sampling computed opacity every frame
                  through one press of Next: the outgoing slide ran down to
                  0.001 at t=308 and then painted a full 1 at t=325, a
                  single-frame flash of the page you were leaving; the incoming
                  one reached 1 at t=575 and painted 0 at t=592 before settling.
                  Two flashes per press, 600ms apart, which is what "мигают при
                  перелистывании" was.

                  A cross-fade has no gap and a CSS transition has no handoff. */}
              <div
                className="relative h-[300px] md:h-[var(--carousel-h)]"
                style={{ ["--carousel-h" as never]: `${height}px` }}
              >
                {slides.map((slide, i) =>
                  mounted.includes(i) ? (
                    <div
                      key={i}
                      className={`cslide ${i === index ? "on" : ""}`}
                      aria-hidden={i !== index}
                    >
                      <div className="flex flex-col gap-0">
                        {slide.images.map((src, j) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={j}
                            src={src}
                            alt={`${slide.title} — section ${j + 1}`}
                            className="block w-full"
                            loading="lazy"
                            draggable={false}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            </BrowserFrame>

            {/* Outside the frame from md up, where there is room for them.
                On a phone the shell gives the frame the full gutter-to-gutter
                width, so an arrow sitting 16px beyond it lands off-screen —
                which is what happened the moment the carousel stopped being
                double-padded. Below md they tuck just inside the edge, on a
                frosted chip so they stay legible over whatever is behind. */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous page"
                  className="absolute left-1.5 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-bg/75 text-fg backdrop-blur-sm transition-colors hover:text-accent md:left-auto md:right-[calc(100%+16px)] md:size-auto md:rounded-none md:bg-transparent md:backdrop-blur-none"
                >
                  <ChevronLeft size={24} strokeWidth={1.75} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next page"
                  className="absolute right-1.5 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-bg/75 text-fg backdrop-blur-sm transition-colors hover:text-accent md:left-[calc(100%+16px)] md:right-auto md:size-auto md:rounded-none md:bg-transparent md:backdrop-blur-none"
                >
                  <ChevronRight size={24} strokeWidth={1.75} aria-hidden />
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="mt-4 flex w-full flex-row gap-0">
              {slides.map((s, i) => {
                const isFirst = i === 0;
                const isLast = i === total - 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to ${s.title}`}
                    className={`h-[2px] flex-1 transition-colors duration-200 ease-out ${
                      i === index
                        ? "bg-accent"
                        : "bg-line-strong hover:bg-mark dark:bg-line-strong dark:hover:bg-mark"
                    } ${isFirst ? "rounded-l-full" : ""} ${isLast ? "rounded-r-full" : ""}`}
                  />
                );
              })}
            </div>
          )}

          {caption && (
            <p className="mt-4 text-left font-mono text-xs text-muted">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
