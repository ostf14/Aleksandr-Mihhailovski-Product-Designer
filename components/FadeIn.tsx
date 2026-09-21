"use client";

import { ReactNode } from "react";
import { reveal, useRevealOnEnter } from "./reveal";

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
 * The trigger is not here either: when to show a block, and whether to animate
 * it at all, is one policy shared with the case panels and lives in reveal.ts.
 * What is left in this file is the markup and the stagger.
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

/** How far in a paragraph comes before it counts as arriving. */
const BOTTOM_INSET = 80;

export function FadeIn({
  children,
  delay = 0,
  className = "",
  as = "div",
}: FadeInProps) {
  // Cast to one concrete tag so the ref type is concrete too. Every tag in the
  // union is an HTMLElement and none of them is given element-specific props.
  const Element = as as "div";
  const ref = useRevealOnEnter<HTMLDivElement>(
    (el, instant) => reveal(el, { delayMs: Math.round(delay * 1000), instant }),
    BOTTOM_INSET,
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
  const ref = useRevealOnEnter<HTMLDivElement>((el, instant) => {
    el.querySelectorAll<HTMLElement>("[data-fade]").forEach((kid, i) =>
      reveal(kid, { delayMs: Math.round(i * stagger * 1000), instant }),
    );
  }, BOTTOM_INSET);

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
