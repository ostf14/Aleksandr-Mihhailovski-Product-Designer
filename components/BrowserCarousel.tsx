"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  if (slides.length === 0) return null;

  const total = slides.length;
  const current = slides[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className={`${className}`}>
      <div className="shell">
        <div className="shell-prose">
          <div className="relative">
            <BrowserFrame url={current.title}>
              {/* Fixed stage — 300px on mobile, prop height on desktop; long slides scroll inside */}
              <div
                className="relative h-[300px] md:h-[var(--carousel-h)]"
                style={{ ["--carousel-h" as never]: `${height}px` }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    className="absolute inset-0 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="flex flex-col gap-0">
                      {current.images.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={src}
                          alt={`${current.title} — section ${i + 1}`}
                          className="block w-full"
                          loading="lazy"
                          draggable={false}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
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
                    onClick={() => setIndex(i)}
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
