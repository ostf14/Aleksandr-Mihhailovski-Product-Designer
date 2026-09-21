"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The one set of rules for "show this when it comes into view".
 *
 * There are two things on the site that reveal on enter — the prose blocks in
 * FadeIn.tsx (`.fade`, opacity only) and the case panels in StickyCases.tsx
 * (`.rv`, opacity and a small move). They look different on purpose. They were
 * also written separately, which meant two copies of the same policy, and a
 * fix landing in one of them: the observer race below was found and fixed in
 * `.fade` while `.rv` kept the old margin, and `.rv` never got the
 * already-on-screen rule at all. Neither was visibly broken, because the case
 * panels happen to be taller than the window they are measured against. That
 * is luck, not design.
 *
 * So the policy lives here and the looks stay in CSS.
 */

/**
 * How far above the viewport the trigger still counts as "arrived".
 *
 * An observer reports a CROSSING and computes one per frame. With the root
 * inset at the top, a short block scrolled past at wheel-flick speed is below
 * the root on one frame and above it on the next, crosses nothing, and is
 * never reported — it then sits at opacity 0 for the life of the page.
 * Measured on the case pages by scrolling in 500px steps: four blocks stranded
 * across three pages, and which four changed between runs.
 *
 * Extending the root upwards means a block that has been passed is still
 * inside it, so the crossing always happens. Whatever it catches this way is
 * off screen when it fades, which costs nothing.
 */
const PASSED = 100000;

/**
 * A root margin that keeps your own bottom inset — how far in something must
 * come before it counts as arriving — and cannot be jumped over.
 *
 * The two callers use different insets and should: 48px was measured against
 * a case panel of 500-620px, 80px against a paragraph. A percentage would
 * scale with the window and fail on a tall screen, which is how the first one
 * went wrong.
 */
export const revealRootMargin = (bottomInset: number) =>
  `${PASSED}px 0px -${bottomInset}px 0px`;

/** Is this element in the window right now? */
export function isOnScreen(el: Element) {
  const { top, bottom } = el.getBoundingClientRect();
  return top < window.innerHeight && bottom > 0;
}

/**
 * Show a block.
 *
 * `instant` is for a block that was already on screen when the page mounted. A
 * reveal is for something arriving as you scroll to it; the first screen is
 * not arriving, it is just there, and animating it means the page says nothing
 * for half a second. It matters most on a client-side navigation, which takes
 * the old page away the moment it starts.
 *
 * `--reveal-dur` is read by both `.fade` and `.rv`, which is the only reason
 * one function can serve both.
 */
export function reveal(
  el: HTMLElement,
  {
    delayMs = 0,
    instant = false,
  }: { delayMs?: number; instant?: boolean } = {},
) {
  if (instant) el.style.setProperty("--reveal-dur", "0ms");
  else if (delayMs) el.style.setProperty("--d", `${delayMs}ms`);
  el.classList.add("in");
}

/**
 * Runs `onEnter` once, when the element arrives — or immediately, if it was
 * already there.
 *
 * In a layout effect rather than an effect so the immediate case lands before
 * the browser paints. After paint it would show one real frame of nothing
 * first, which is the very thing the rule is there to avoid.
 */
export function useRevealOnEnter<T extends HTMLElement>(
  onEnter: (el: T, instant: boolean) => void,
  bottomInset: number,
) {
  const ref = useRef<T>(null);
  const latest = useRef(onEnter);
  latest.current = onEnter;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOnScreen(el)) {
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
      { rootMargin: revealRootMargin(bottomInset), threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [bottomInset]);

  return ref;
}
