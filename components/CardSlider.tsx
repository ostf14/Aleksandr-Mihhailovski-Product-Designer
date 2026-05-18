"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string };

type Phase = "idle" | "flying" | "snapping";

const POSITIONS = [
  { x: 0, y: 0, scale: 1, opacity: 1 },
  { x: 18, y: -10, scale: 0.96, opacity: 0.8 },
  { x: 36, y: -20, scale: 0.92, opacity: 0.55 },
  { x: 54, y: -30, scale: 0.88, opacity: 0.35 },
];

const FLY_OUT = { x: "-110%", y: 0, scale: 1, opacity: 0 };

function getPosition(index: number) {
  return POSITIONS[Math.min(index, POSITIONS.length - 1)];
}

export function CardSlider({
  slides,
  caption,
  className = "",
}: {
  slides: Slide[];
  caption?: string;
  className?: string;
}) {
  const [order, setOrder] = useState<number[]>(slides.map((_, i) => i));
  const [phase, setPhase] = useState<Phase>("idle");

  const next = () => {
    if (phase !== "idle" || slides.length < 2) return;
    setPhase("flying");
    window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setPhase("snapping");
      requestAnimationFrame(() => setPhase("idle"));
    }, 400);
  };

  return (
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="max-w-prose mx-auto">
          {/* Stack */}
          <div
            className="relative"
            style={{ aspectRatio: "1200 / 712" }}
          >
            {slides.map((s, i) => {
              const position = order.indexOf(i);
              const isFront = position === 0;
              const isLast = position === order.length - 1;

              let target: Record<string, number | string> & { zIndex: number } = {
                ...getPosition(position),
                zIndex: 10 - position,
              };
              let transition: { duration: number; ease?: number[] | string } = {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              };

              if (phase === "flying") {
                if (isFront) {
                  target = { ...FLY_OUT, zIndex: 10 };
                  transition = { duration: 0.4, ease: [0.4, 0, 1, 1] };
                } else {
                  target = {
                    ...getPosition(position - 1),
                    zIndex: 10 - (position - 1),
                  };
                  transition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
                }
              } else if (phase === "snapping" && isLast) {
                target = {
                  ...getPosition(position),
                  zIndex: 10 - position,
                };
                transition = { duration: 0 };
              }

              return (
                <motion.div
                  key={s.src}
                  className="absolute inset-0 rounded-xl overflow-hidden bg-cream-warm dark:bg-cream-deep shadow-[0_8px_32px_rgba(16,24,40,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] origin-center"
                  animate={target}
                  transition={transition}
                  aria-hidden={!isFront}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.alt ?? ""}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Next */}
          {slides.length > 1 && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={next}
                disabled={phase !== "idle"}
                aria-label="Show next slide"
                className="group flex flex-col items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight
                  size={28}
                  strokeWidth={1.75}
                  className="text-stone-400 transition-all duration-200 group-hover:text-terracotta group-hover:scale-110"
                  aria-hidden
                />
                <span className="text-[13px] text-stone-500 group-hover:text-terracotta transition-colors">
                  next
                </span>
              </button>
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
