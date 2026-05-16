"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; level?: 1 | 2 };

const defaultItems: TocItem[] = [
  { id: "why-we-started", label: "Why we started" },
  { id: "blind-sending", label: "Solving ‘blind sending’" },
  { id: "audience", label: "Who receives this?" },
  { id: "zero-state", label: "Zero-state", level: 2 },
  { id: "confirmation", label: "The anxiety-free confirmation" },
  { id: "results", label: "Results & system design" },
  { id: "lessons", label: "What I learned" },
];

export function TableOfContents({ items = defaultItems }: { items?: TocItem[] } = {}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibleEntries.length > 0) {
          setActive(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const firstId = items[0]?.id;
    if (!firstId) return;
    const target = document.getElementById(firstId);
    if (!target) return;

    const check = () => {
      const rect = target.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight / 2);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [items]);

  return (
    <aside
      aria-label="On this page"
      aria-hidden={!visible}
      className={`hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-30 w-64 transition-[opacity,transform] duration-500 ease-out ${
        visible
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 -translate-x-3 pointer-events-none"
      }`}
    >
      <nav className="bg-white/55 backdrop-blur-md border border-stone-200/80 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="text-[11px] uppercase tracking-[0.14em] text-stone-500 font-medium mb-4">
          On this page
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors ${
                    item.level === 2 ? "ml-4" : ""
                  } ${
                    isActive
                      ? "bg-cream-warm text-charcoal font-medium"
                      : "text-stone-500 hover:text-charcoal"
                  }`}
                >
                  <span
                    className={`inline-block size-1.5 rounded-full shrink-0 transition-colors ${
                      isActive ? "bg-terracotta" : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                  <span className="truncate">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
