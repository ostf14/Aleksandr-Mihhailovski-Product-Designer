"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocHeading } from "@/lib/toc";

function TocList({
  headings,
  active,
  onNavigate,
}: {
  headings: TocHeading[];
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {headings.map((h) => {
        const isActive = active === h.id;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={onNavigate}
              className={`flex items-start gap-2 rounded-md px-2.5 py-1.5 text-[13px] leading-[1.4] transition-colors ${
                h.level === 3 ? "pl-6" : ""
              } ${
                isActive
                  ? "bg-cream-warm text-charcoal font-medium"
                  : "text-stone-500 hover:text-charcoal"
              }`}
            >
              <span
                aria-hidden
                className={`mt-[6px] inline-block size-1.5 rounded-full shrink-0 transition-colors ${
                  isActive ? "bg-terracotta" : "bg-transparent"
                }`}
              />
              <span>{h.text}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Lecture table of contents.
 *
 * Desktop gets a sticky rail beside the text; mobile gets a <details> that
 * starts collapsed, so a long lecture does not open with a screenful of
 * navigation before its first paragraph.
 *
 * Separate from the case-study TableOfContents on purpose — that one is a
 * fixed desktop-only overlay with no collapsed state, and widening it to
 * cover both would have meant reworking every case page.
 */
export function LectureToc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const sections = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsed by default */}
      <div className="lg:hidden mb-10">
        <div className="rounded-xl border border-stone-200 bg-white/60 dark:bg-cream-warm overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500">
              Содержание
            </span>
            <ChevronDown
              size={18}
              strokeWidth={1.75}
              aria-hidden
              className={`text-stone-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
          {open && (
            <div className="px-2 pb-3">
              <TocList
                headings={headings}
                active={active}
                onNavigate={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop: sticky rail */}
      <nav
        aria-label="Содержание"
        className="hidden lg:block sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-4">
          Содержание
        </div>
        <TocList headings={headings} active={active} />
      </nav>
    </>
  );
}
