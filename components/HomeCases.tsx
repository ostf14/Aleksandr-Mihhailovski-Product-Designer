"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven entry wrapper for a single case card on the home page.
 * Fades the card from 0.2 -> 1 opacity as it enters the viewport from below.
 * Opacity-only (no spring, no scale, no translate) to keep scroll cheap —
 * five of these run in parallel on the homepage.
 */
export function CaseCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1], {
    clamp: true,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        willChange: "opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
