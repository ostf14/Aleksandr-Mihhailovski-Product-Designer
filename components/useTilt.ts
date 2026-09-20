"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following tilt and spotlight for a card.
 *
 * Writes custom properties on the element rather than setting `transform`
 * directly: the CSS owns the whole expression (perspective, rotation, hover
 * lift), so a hover rule can change the lift without JS and the two never
 * fight over the same property. --mx/--my are the pointer's offset from the
 * centre in [-0.5, 0.5] and drive the rotation; --sx/--sy are its position in
 * raw pixels and drive the spotlight.
 *
 * The spotlight takes pixels rather than percentages on purpose. It is a fixed
 * box moved by `transform`, not a background painted at a moving position — a
 * transform is composited, so it never repaints as it follows the cursor.
 *
 * Bound only for fine pointers: on touch there is no hover state to follow,
 * and a tilt that never resets reads as a rendering bug.
 *
 * Lives in its own file because the case panels and the gallery card both use
 * it, and it was written for the first of those.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      el.style.setProperty("--mx", `${x - 0.5}`);
      el.style.setProperty("--my", `${y - 0.5}`);
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}
