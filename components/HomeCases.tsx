"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 1000, damping: 100, mass: 0.2 } as const;

/**
 * Scroll-driven entry wrapper for a single case card on the home page.
 * Tracks the card's position from "top enters viewport bottom" -> "top
 * reaches viewport center" and animates scale / opacity / blur over that
 * window so cards rise into focus as they enter from below.
 */
export function CaseCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.92, 1], {
    clamp: true,
  });
  const scale = useSpring(scaleRaw, SPRING);

  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.2, 1], {
    clamp: true,
  });
  const opacity = useSpring(opacityRaw, SPRING);

  const yRaw = useTransform(scrollYProgress, [0, 1], [32, 0], {
    clamp: true,
  });
  const y = useSpring(yRaw, SPRING);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
