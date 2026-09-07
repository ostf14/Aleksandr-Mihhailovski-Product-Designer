"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FadeIn } from "./FadeIn";
import type { GraphicItem } from "@/lib/graphic";

function Caption({ item }: { item: GraphicItem }) {
  return (
    <>
      {item.title && (
        <span className="text-[0.95rem] text-charcoal">{item.title}</span>
      )}
      <p className="text-[0.875rem] leading-[1.5] text-charcoal/70">
        {item.caption}
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
      {/* Six columns so both shapes tile: landscape spans three (two per
          row), square spans two (three per row). */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-x-5 gap-y-10">
        {items.map((item, i) => (
          <FadeIn
            key={item.src}
            delay={(i % 3) * 0.04}
            className={item.wide ? "md:col-span-3" : "md:col-span-2"}
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

              <figcaption className="mt-3 flex flex-col gap-1">
                <Caption item={item} />
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 self-start font-mono text-[11px] uppercase tracking-[0.12em] text-terracotta hover:opacity-80 transition-opacity"
                  >
                    {item.hrefLabel ?? "See it live"}
                    <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
                  </a>
                )}
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
          className="fixed inset-0 z-[60] flex flex-col bg-[#0F0F0F]/95 px-4 py-4 md:px-10 md:py-8"
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
            className="flex min-h-0 flex-1 items-center gap-2 md:gap-4"
          >
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous"
                className="shrink-0 rounded-full p-2 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft size={28} strokeWidth={1.5} aria-hidden />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="mx-auto max-h-full min-h-0 w-auto max-w-full object-contain"
            />

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next"
                className="shrink-0 rounded-full p-2 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight size={28} strokeWidth={1.5} aria-hidden />
              </button>
            )}
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="shrink-0 pt-4 text-center"
          >
            {current.title && (
              <div className="text-[0.95rem] text-white/90">
                {current.title}
              </div>
            )}
            <div className="mt-1 text-[0.8125rem] text-white/50">
              {current.caption}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
