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
  // Virtual index space: [last clone, ...real slides, first clone].
  // Start at 1 so the first real slide is showing.
  const total = slides.length;
  const [index, setIndex] = useState(1);
  const [animEnabled, setAnimEnabled] = useState(true);
  const [locked, setLocked] = useState(false);

  if (total === 0) return null;

  const track = [slides[total - 1], ...slides, slides[0]];
  const realIndex = ((index - 1 + total) % total + total) % total;

  const move = (delta: number) => {
    if (locked) return;
    setLocked(true);
    setAnimEnabled(true);
    setIndex((i) => i + delta);
  };

  const goTo = (i: number) => {
    if (locked || i === realIndex) return;
    setLocked(true);
    setAnimEnabled(true);
    setIndex(i + 1);
  };

  const onAnimEnd = () => {
    // Snap back from clones to the real slide instantly.
    if (index === total + 1) {
      setAnimEnabled(false);
      setIndex(1);
    } else if (index === 0) {
      setAnimEnabled(false);
      setIndex(total);
    } else {
      setLocked(false);
    }
  };

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
              transition={{
                duration: animEnabled ? 0.45 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              onAnimationComplete={onAnimEnd}
            >
              {track.map((s, i) => (
                <div key={i} className="w-full h-full flex-shrink-0">
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

            {/* Controls (always dark pills — visible on light + dark themes) */}
            {total > 1 && (
              <>
                <div className="absolute bottom-3 right-3 z-20 flex gap-2">
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    aria-label="Previous slide"
                    className="size-10 rounded-full bg-charcoal/85 text-cream backdrop-blur-sm flex items-center justify-center transition-all hover:bg-charcoal shadow-md"
                  >
                    <ChevronLeft size={18} strokeWidth={2} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label="Next slide"
                    className="size-10 rounded-full bg-charcoal/85 text-cream backdrop-blur-sm flex items-center justify-center transition-all hover:bg-charcoal shadow-md"
                  >
                    <ChevronRight size={18} strokeWidth={2} aria-hidden />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 h-10 px-3 rounded-full bg-charcoal/85 backdrop-blur-sm shadow-md">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`size-1.5 rounded-full transition-colors ${
                        i === realIndex ? "bg-cream" : "bg-cream/40 hover:bg-cream/70"
                      }`}
                    />
                  ))}
                </div>
              </>
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
