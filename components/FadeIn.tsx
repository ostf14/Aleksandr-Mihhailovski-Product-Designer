"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?:
    "div" | "section" | "article" | "figure" | "li" | "p" | "h1" | "h2" | "h3";
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
 * Was this block already on screen when the page mounted?
 *
 * Those blocks do not get an entrance. A fade is for something arriving as you
 * scroll to it; the first screen is not arriving, it is just there, and fading
 * it in means the page is blank for 600ms before it says anything.
 *
 * That was invisible while every navigation was a full document load — the old
 * page stayed on screen until the new one painted, so the fade happened under
 * cover. Client-side navigation takes the old page away at once, and the gap
 * showed: measured at 1440x900, the whole viewport was empty white for ~190ms
 * on the way from /product into a case page. That is the flicker.
 *
 * Measured in a layout effect rather than guessed at render: the server has no
 * viewport, so it emits `hidden` as before, and the correction lands before the
 * browser paints.
 */
function useAlreadyOnScreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) setOnScreen(true);
  }, []);

  return [ref, onScreen] as const;
}

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
export function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
}: FadeInProps) {
  const MotionTag = motion[as] as typeof motion.div;
  const [ref, onScreen] = useAlreadyOnScreen<HTMLDivElement>();

  return (
    <MotionTag
      ref={ref}
      data-fade
      className={className}
      initial="hidden"
      whileInView="visible"
      // The viewport margin still decides WHEN this fires; `onScreen` only
      // decides whether what follows is an animation or a cut.
      viewport={{ once: true, margin: "-80px" }}
      transition={onScreen ? { duration: 0 } : { delay }}
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
  const [ref, onScreen] = useAlreadyOnScreen<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-fade
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        // Same rule as FadeIn: a list already on screen is not arriving, so it
        // does not deal itself out one item at a time in front of the reader.
        visible: {
          transition: { staggerChildren: onScreen ? 0 : stagger },
        },
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
  const [ref, onScreen] = useAlreadyOnScreen<HTMLDivElement>();

  return (
    <MotionTag
      ref={ref}
      data-fade
      className={className}
      variants={variants}
      // An element-level transition beats the one inside the variant, which is
      // how a child already on screen cuts in while its siblings further down
      // still fade.
      transition={onScreen ? { duration: 0 } : undefined}
    >
      {children}
    </MotionTag>
  );
}
