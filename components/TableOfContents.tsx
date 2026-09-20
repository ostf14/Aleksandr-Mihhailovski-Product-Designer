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

export function TableOfContents({
  items = defaultItems,
}: { items?: TocItem[] } = {}) {
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
      className={`fixed left-8 top-1/2 z-30 hidden w-64 -translate-y-1/2 transition-[opacity,transform] duration-500 ease-out xl:block ${
        visible
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-3 opacity-0"
      }`}
    >
      {/* A hairline rule instead of a card. The active item is marked by a 2px
          bar that grows out of 40% height and lies exactly over that rule
          (left: -1px covers it) — no filled pill, no background, no horizontal
          shift. That restraint is the whole effect. */}
      <nav className="border-l border-fg/15">
        <div className="mb-3 pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg/50">
          On this page
        </div>
        <ul>
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block py-1.5 pl-4 text-sm transition-colors duration-t2 ease-out-expo before:absolute before:-left-px before:bottom-[5px] before:top-[5px] before:w-0.5 before:rounded-[1px] before:bg-fg before:transition-[opacity,transform] before:duration-t3 before:ease-out-expo before:content-[''] ${
                    item.level === 2 ? "ml-4" : ""
                  } ${
                    isActive
                      ? "text-fg before:scale-y-100 before:opacity-100"
                      : "text-fg/70 before:scale-y-[.4] before:opacity-0 hover:text-fg"
                  }`}
                >
                  <span className="block truncate">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
