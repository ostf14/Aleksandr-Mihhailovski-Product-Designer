"use client";

import { useEffect, useRef } from "react";

/**
 * Card cover media. For .mp4 sources it renders a muted/loop video that only
 * plays while the card is in the viewport — an always-autoplaying video keeps
 * the compositor decoding frames even when off-screen, which shows up as
 * scroll jank. IntersectionObserver play/pause + preload="none" keeps the
 * cost paid only while the card is actually visible. Non-video sources fall
 * back to a plain <img>.
 */
export function CaseCardMedia({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const isVideo = src.endsWith(".mp4");

  useEffect(() => {
    if (!isVideo) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
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
