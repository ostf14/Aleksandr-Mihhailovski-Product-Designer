"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FadeIn } from "./FadeIn";
import type { GraphicItem } from "@/lib/graphic";

/** Horizontal travel that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 48;

function NavButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={`shrink-0 rounded-full text-white/60 hover:text-white transition-colors ${className}`}
    >
      <Icon size={28} strokeWidth={1.5} aria-hidden />
    </button>
  );
}

function Caption({ item }: { item: GraphicItem }) {
  return (
    <>
      <p className="text-[0.875rem] leading-[1.5] text-charcoal/70">
        {item.caption}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            // The arrow shows no text, so the label is the only thing a
            // screen reader has to go on.
            aria-label={item.hrefLabel ?? "Open the source"}
            className="ml-1.5 inline-block align-[-1px] text-terracotta hover:opacity-70 transition-opacity"
          >
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
        )}
      </p>
    </>
  );
}

export function GraphicGallery({ items }: { items: GraphicItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  // Where to send focus back when the lightbox closes.
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggersRef.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + items.length) % items.length,
      );
    },
    [items.length],
  );

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start === null) return;

      // Anything shorter is a tap, or a vertical drag that drifted sideways.
      const dx = event.changedTouches[0].clientX - start;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;

      step(dx < 0 ? 1 : -1);
    },
    [step],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    // Hold the page still underneath. Restoring the previous value rather
    // than clearing it keeps this from stomping on anything else that might
    // be managing overflow.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <>
      {/* One column on a phone — at 344px two columns leave 138px a piece,
          which is a thumbnail, not a look at the work. Six columns from md up:
          a span of 3 puts two to a row, a span of 2 puts three. */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-x-5 gap-y-10">
        {items.map((item, i) => (
          <FadeIn
            key={item.src}
            delay={(i % 3) * 0.04}
            className={item.span === 3 ? "md:col-span-3" : "md:col-span-2"}
          >
            <figure>
              <button
                type="button"
                ref={(el) => {
                  triggersRef.current[i] = el;
                }}
                onClick={() => setOpenIndex(i)}
                aria-label={`Open ${item.alt}`}
                className="group block w-full overflow-hidden rounded-xl border border-stone-200 bg-cream-warm dark:bg-cream-deep cursor-zoom-in"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="block w-full h-auto transition-transform duration-300 ease-out md:group-hover:scale-[1.02]"
                />
              </button>

              <figcaption className="mt-3">
                <Caption item={item} />
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          // 100dvh rather than inset-0: on a phone the browser chrome eats the
          // bottom of the layout viewport, which would hide the caption and
          // the arrows sitting under it.
          className="fixed inset-x-0 top-0 z-[60] flex h-[100dvh] flex-col bg-[#0F0F0F]/95 px-4 py-4 md:px-10 md:py-8"
        >
          <div className="flex items-center justify-between gap-4 shrink-0">
            <span className="font-mono text-[11px] text-white/50">
              {openIndex! + 1} / {items.length}
            </span>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={close}
              aria-label="Close"
              className="rounded-full p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          {/* Stop the backdrop handler here so clicking the picture or the
              arrows does not dismiss the thing you are looking at. */}
          <div
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="flex min-h-0 flex-1 items-center gap-2 md:gap-4"
          >
            {/* Flanking arrows need room either side of the picture, which a
                phone does not have — below md they move to the bar underneath. */}
            {items.length > 1 && (
              <NavButton
                direction="prev"
                onClick={() => step(-1)}
                className="hidden md:block p-2"
              />
            )}

            {/* min-w-0 is load-bearing: an <img> is a replaced element, so its
                automatic minimum size in a flex row is the natural 1920px.
                Without this it refuses to shrink and shoves the next arrow off
                the side of a narrow screen. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="mx-auto max-h-full min-h-0 w-auto min-w-0 max-w-full object-contain"
            />

            {items.length > 1 && (
              <NavButton
                direction="next"
                onClick={() => step(1)}
                className="hidden md:block p-2"
              />
            )}
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="shrink-0 pt-4"
          >
            <div className="text-center text-[0.875rem] text-white/70">
              {current.caption}
            </div>

            {items.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-8 md:hidden">
                <NavButton
                  direction="prev"
                  onClick={() => step(-1)}
                  className="border border-white/15 p-3"
                />
                <NavButton
                  direction="next"
                  onClick={() => step(1)}
                  className="border border-white/15 p-3"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
