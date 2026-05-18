"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Slide = { src: string; alt?: string };

type Phase = "idle" | "flying" | "snapping";

const FRONT = { y: 0, scale: 1, opacity: 1, zIndex: 10 };
const BACK = { y: -14, scale: 0.96, opacity: 0.65, zIndex: 5 };
const FLY_OUT = { y: "130%", scale: 1, opacity: 0, zIndex: 10 };
const RISING = { y: 0, scale: 1, opacity: 1, zIndex: 5 };

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
          {/* Stack: wrapper has top padding so back cards can peek above */}
          <div className="relative overflow-hidden pt-[22px]">
            <div className="relative" style={{ aspectRatio }}>
              {slides.map((s, i) => {
                const position = order.indexOf(i);
                const isFront = position === 0;
                const isBack = position === order.length - 1;

                let target = isFront ? FRONT : BACK;
                let transition: { duration: number; ease?: number[] | string } = {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                };

                if (phase === "flying") {
                  if (isFront) {
                    target = FLY_OUT;
                    transition = { duration: 0.4, ease: [0.4, 0, 1, 1] };
                  } else if (isBack) {
                    target = RISING;
                    transition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
                  }
                } else if (phase === "snapping" && isBack) {
                  target = BACK;
                  transition = { duration: 0 };
                }

                return (
                  <motion.div
                    key={s.src}
                    className="absolute inset-0 rounded-xl overflow-hidden bg-cream-warm dark:bg-cream-deep shadow-[0_8px_32px_rgba(16,24,40,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] origin-bottom"
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
                <ChevronDown
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
