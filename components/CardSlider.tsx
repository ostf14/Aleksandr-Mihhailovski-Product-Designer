"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string };

export function CardSlider({
  slides,
  caption,
  className = "",
  aspectRatio = "1200 / 712",
}: {
  slides: Slide[];
  caption?: string;
  className?: string;
  aspectRatio?: string;
}) {
  const [index, setIndex] = useState(0);
  const lastIndex = slides.length - 1;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(lastIndex, i + 1));

  return (
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="max-w-prose mx-auto">
          <div
            className="relative overflow-hidden rounded-xl bg-cream-warm dark:bg-cream-deep"
            style={{ aspectRatio }}
          >
            {/* Horizontal track */}
            <motion.div
              className="flex h-full w-full"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              {slides.map((s) => (
                <div key={s.src} className="w-full h-full flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.alt ?? ""}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </motion.div>

            {/* Controls */}
            {slides.length > 1 && (
              <div className="absolute bottom-3 right-3 z-20 flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  disabled={index === 0}
                  aria-label="Previous slide"
                  className="size-10 rounded-full bg-charcoal/85 text-cream backdrop-blur-sm flex items-center justify-center transition-all hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                >
                  <ChevronLeft size={18} strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={index === lastIndex}
                  aria-label="Next slide"
                  className="size-10 rounded-full bg-charcoal/85 text-cream backdrop-blur-sm flex items-center justify-center transition-all hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                >
                  <ChevronRight size={18} strokeWidth={2} aria-hidden />
                </button>
              </div>
            )}

            {/* Dots */}
            {slides.length > 1 && (
              <div className="absolute bottom-5 left-4 z-20 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`size-1.5 rounded-full transition-colors ${
                      i === index ? "bg-cream" : "bg-cream/40 hover:bg-cream/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {caption && (
            <p className="mt-4 font-mono text-xs text-stone-500 text-left">{caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
