"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";

type Tag =
  "div" | "section" | "article" | "figure" | "li" | "p" | "h1" | "h2" | "h3";

type FadeInProps = {
  children: ReactNode;
  /** Seconds, matching the framer API these used to have. */
  delay?: number;
  className?: string;
  as?: Tag;
};

/**
 * Fade-on-enter for prose blocks.
 *
 * The animation itself is a CSS transition on `.fade` / `.fade.in` in
 * globals.css — see the long note there for why this is not framer-motion any
 * more. In short: framer's WAAPI handoff paints one frame of the start value
 * at the END of every fade, which is a blink on an element that has just
 * finished appearing.
 *
 * What is left here is the trigger, built the same way as `useReveal` in
 * StickyCases.tsx: an observer that adds a class and disconnects.
 *
 * Reduced motion is still handled in CSS, via the `data-fade` hook and an
 * !important landing in globals.css — NOT by branching here. Branching was
 * actively broken when these were framer elements, and the reason generalises:
 * useReducedMotion() returns null on the server and on the first client
 * render, so the server always emits the hidden element, and swapping to a
 * plain tag afterwards does not clear a style something else set imperatively.
 * Measured on /case/push-notifications with reduce-motion emulated: 41 of 273
 * blocks permanently invisible.
 */

/**
 * Fires once the block is 80px inside the viewport from below — and counts
 * anything above the viewport as already arrived, however far above.
 *
 * The top figure is not decoration. An observer only reports a CROSSING, and
 * it computes one per frame: with the root inset by 80px on the top edge too,
 * a 75px block scrolled past at wheel-flick speed can be below the root on one
 * frame and above it on the next, cross nothing, and never be reported at all.
 * It then sits at opacity 0 for the life of the page. Measured by scrolling
 * the case pages in 500px steps: four blocks on three pages, and which four
 * changed from run to run, which is exactly what a race looks like.
 *
 * Extending the root upwards instead means a block that has been passed is
 * still inside it, so the crossing always happens and is always seen. The
 * blocks it catches this way are off screen when they fade, which costs
 * nothing.
 */
const ROOT_MARGIN = "100000px 0px -80px 0px";

/** Block is on screen right now. */
function onScreen(el: HTMLElement) {
  const { top, bottom } = el.getBoundingClientRect();
  return top < window.innerHeight && bottom > 0;
}

/**
 * Shows a block, once.
 *
 * `instant` is for a block that was already on screen when the page mounted. A
 * fade is for something arriving as you scroll to it; the first screen is not
 * arriving, it is just there, and fading it in means the page says nothing for
 * six hundred milliseconds. It matters most on a client-side navigation, which
 * takes the old page away the moment it starts.
 */
function show(el: HTMLElement, delayMs = 0, instant = false) {
  if (instant) el.style.setProperty("--fade-dur", "0ms");
  else if (delayMs) el.style.setProperty("--d", `${delayMs}ms`);
  el.classList.add("in");
}

/**
 * The trigger. In a layout effect rather than an effect so the instant case
 * lands before the browser paints — after paint, the block would show one real
 * frame of nothing first, which is the very thing this is here to avoid.
 */
function useFade<T extends HTMLElement>(
  reveal: (el: T, instant: boolean) => void,
) {
  const ref = useRef<T>(null);
  const latest = useRef(reveal);
  latest.current = reveal;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (onScreen(el)) {
      latest.current(el, true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      latest.current(el, false);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        latest.current(el, false);
        io.disconnect();
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  as = "div",
}: FadeInProps) {
  // Cast to one concrete tag so the ref type is concrete too. Every tag in the
  // union is an HTMLElement and none of them is given element-specific props.
  const Element = as as "div";
  const ref = useFade<HTMLDivElement>((el, instant) =>
    show(el, Math.round(delay * 1000), instant),
  );

  return (
    <Element ref={ref} data-fade className={`fade ${className}`}>
      {children}
    </Element>
  );
}

/**
 * A list whose items arrive one after another.
 *
 * The container does not fade — it never did, its old framer variant carried
 * no opacity — so it has no `.fade` of its own. It observes itself and stages
 * the children it finds inside, which is also why FadeChild has no trigger of
 * its own and only works underneath one of these.
 */
export function FadeStagger({
  children,
  className = "",
  stagger = 0.055,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between one child and the next. */
  stagger?: number;
}) {
  const ref = useFade<HTMLDivElement>((el, instant) => {
    el.querySelectorAll<HTMLElement>("[data-fade]").forEach((kid, i) =>
      show(kid, Math.round(i * stagger * 1000), instant),
    );
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeChild({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "figure";
}) {
  const Element = as as "div";

  return (
    <Element data-fade className={`fade ${className}`}>
      {children}
    </Element>
  );
}
