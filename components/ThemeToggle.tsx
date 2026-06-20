"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Without this, flipping .dark makes every element with transition-colors /
    // transition-all (plus the html:not(.dark) override ruleset) animate its
    // colors at once for 200ms — hundreds of simultaneous transitions repaint
    // the whole page every frame and the switch lags. Kill transitions for the
    // duration of the flip, then restore them on the next frame so the change
    // is a single instant repaint.
    const killer = document.createElement("style");
    killer.appendChild(
      document.createTextNode(
        "*,*::before,*::after{transition:none !important}",
      ),
    );
    document.head.appendChild(killer);

    setTheme(next);
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}

    // Force the style to apply, then drop the killer on the next frame.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.head.removeChild(killer);
      });
    });
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="size-9 rounded-full flex items-center justify-center text-stone-600 hover:text-charcoal hover:bg-cream-warm transition-colors"
    >
      {/* Sun icon (visible in dark mode) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`size-[18px] ${isDark ? "block" : "hidden"}`}
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon icon (visible in light mode) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`size-[18px] ${isDark ? "hidden" : "block"}`}
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
