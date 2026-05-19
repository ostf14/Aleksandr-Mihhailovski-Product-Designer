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
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="max-w-prose mx-auto">
          <div className="relative">
            <BrowserFrame url={current.title}>
              {/* Fixed-height stage so the layout doesn't jump between slides */}
              <div className="relative" style={{ height }}>
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

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous page"
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-charcoal/70 text-cream flex items-center justify-center transition-colors hover:bg-charcoal/90 shadow-md z-10"
                >
                  <ChevronLeft size={18} strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next page"
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-charcoal/70 text-cream flex items-center justify-center transition-colors hover:bg-charcoal/90 shadow-md z-10"
                >
                  <ChevronRight size={18} strokeWidth={2} aria-hidden />
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="mt-4 mx-auto flex flex-row gap-1.5 max-w-[200px]">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${s.title}`}
                  className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ease-out ${
                    i === index
                      ? "bg-terracotta"
                      : "bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500"
                  }`}
                />
              ))}
            </div>
          )}

          {caption && (
            <p className="mt-4 font-mono text-xs text-stone-500 text-left">{caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
