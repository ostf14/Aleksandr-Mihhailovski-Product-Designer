"use client";

import { useEffect, useRef } from "react";

/**
 * Card cover media. For .mp4 sources it renders a muted/loop video, but the
 * decode cost is gated two ways so it doesn't drag scroll performance:
 *   1. IntersectionObserver — only runs while the card is in the viewport.
 *   2. Scroll-idle gate — paused while the user is actively scrolling, resumed
 *      ~150ms after scrolling stops. The jank only ever happened *during*
 *      scroll (compositing video frames while the page moves), so pausing for
 *      those moments keeps scrolling smooth while the loop still plays at rest
 *      — there's always motion when you're actually looking at it.
 * Non-video sources fall back to a plain <img>.
 */
export function CaseCardMedia({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const isVideo = src.endsWith(".mp4");

  useEffect(() => {
    if (!isVideo) return;
    const el = ref.current;
    if (!el) return;

    let inView = false;
    let scrolling = false;
    let scrollTimer: number | undefined;

    const sync = () => {
      if (inView && !scrolling) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    io.observe(el);

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        sync();
      }
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        sync();
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, [isVideo]);

  if (isVideo) {
    return (
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        className="w-full h-full object-cover object-top"
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt=""
      aria-hidden
      className="w-full h-full object-cover object-top"
    />
  );
}
