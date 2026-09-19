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
      {/* A hairline rule instead of a card. The active item is marked by a 2px
          bar that grows out of 40% height and lies exactly over that rule
          (left: -1px covers it) — no filled pill, no background, no horizontal
          shift. That restraint is the whole effect. */}
      <nav className="border-l border-charcoal/15">
        <div className="pl-4 mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal/50">
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
                  className={`relative block py-1.5 pl-4 text-sm transition-colors duration-t2 ease-out-expo before:content-[''] before:absolute before:-left-px before:top-[5px] before:bottom-[5px] before:w-0.5 before:rounded-[1px] before:bg-charcoal before:transition-[opacity,transform] before:duration-t3 before:ease-out-expo ${
                      item.level === 2 ? "ml-4" : ""
                    } ${
                      isActive
                        ? "text-charcoal before:opacity-100 before:scale-y-100"
                        : "text-charcoal/70 hover:text-charcoal before:opacity-0 before:scale-y-[.4]"
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
