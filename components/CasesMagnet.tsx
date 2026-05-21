"use client";

import { useEffect } from "react";

const MAGNET_RANGE = 100; // px around target where the magnet kicks in
const SCROLL_END_DELAY = 120; // ms of stillness to consider scroll "ended"
const SNAP_LOCK_MS = 600; // ignore re-snap requests while smooth-scroll settles

/**
 * Soft scroll magnet for the Cases heading.
 * Watches scroll, and when the user's scroll comes to rest within
 * MAGNET_RANGE pixels of the heading's intended docking position
 * (viewport-height / 6, matching the casesActive trigger), smoothly
 * pulls the page to exactly that spot. Doesn't fight active scrolling
 * — only acts after the user stops, so momentum scrolling and big
 * swipes pass through naturally.
 */
export function CasesMagnet() {
  useEffect(() => {
    let endTimer: number | null = null;
    let snapLock = false;

    const checkMagnet = () => {
      if (snapLock) return;
      const heading = document.getElementById("cases");
      if (!heading) return;

      const targetY = window.innerHeight / 6;
      const currentTop = heading.getBoundingClientRect().top;
      const distance = currentTop - targetY;

      if (Math.abs(distance) < MAGNET_RANGE && Math.abs(distance) > 2) {
        snapLock = true;
        window.scrollTo({
          top: window.scrollY + distance,
          behavior: "smooth",
        });
        window.setTimeout(() => {
          snapLock = false;
        }, SNAP_LOCK_MS);
      }
    };

    const onScroll = () => {
      if (endTimer) window.clearTimeout(endTimer);
      endTimer = window.setTimeout(checkMagnet, SCROLL_END_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (endTimer) window.clearTimeout(endTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
