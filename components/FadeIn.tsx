"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "li" | "p" | "h1" | "h2" | "h3";
};

// Opacity-only reveal. Animating translateY as well meant every block that
// wrapped a full-res image/GIF had its large layer re-composited each frame
// while scrolling through case pages — janky. A pure alpha fade has no
// geometry to recompose, so it stays smooth even over heavy media.
const variants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Reduced motion is handled in CSS, via the `data-fade` hook and an
 * !important landing in globals.css — NOT by branching here.
 *
 * Branching was actively broken. useReducedMotion() returns null on the server
 * and on the first client render, so the server always emitted the motion
 * element with framer's inline style="opacity:0". When the hook then flipped to
 * true, this component swapped to a plain tag — but React reconciles div-to-div
 * as the same element and only removes props IT set, and that opacity was set
 * imperatively by framer. The inline zero stayed on the node with nothing left
 * running to clear it. Measured on /case/push-notifications with reduce-motion
 * emulated: 41 of 273 blocks permanently invisible.
 *
 * A CSS !important declaration beats a non-important inline style, so the rule
 * in globals.css lands these whatever framer has written.
 */
export function FadeIn({ children, delay = 0, className, as = "div" }: FadeInProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      data-fade
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export function FadeStagger({
  children,
  className,
  stagger = 0.055,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      data-fade
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeChild({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "figure";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag data-fade className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
