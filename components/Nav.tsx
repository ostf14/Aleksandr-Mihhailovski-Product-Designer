"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string; badge?: string };

const items: Item[] = [
  { label: "Work", href: "/work" },
  { label: "Lectures", href: "/ru/lectures", badge: "RU" },
  { label: "About", href: "/about" },
];

// Case pages and the /other gallery are reached from /work, so they keep
// that tab lit rather than leaving the nav with nothing selected.
function isItemActive(item: Item, pathname: string | null): boolean {
  if (!pathname) return false;
  if (item.href === "/work") {
    return (
      pathname === "/work" ||
      pathname.startsWith("/case/") ||
      pathname === "/other" ||
      pathname.startsWith("/other/")
    );
  }
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function NavLink({ item, pathname }: { item: Item; pathname: string | null }) {
  const isActive = isItemActive(item, pathname);

  return (
    <a
      href={item.href}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] md:text-sm transition-colors ${
        isActive
          ? "bg-charcoal text-cream"
          : "text-[#6F6E69] dark:text-stone-600 hover:bg-cream-warm hover:text-charcoal"
      }`}
    >
      {item.label}
      {item.badge && (
        <span
          className={`font-mono text-[9px] leading-none tracking-[0.08em] px-1 py-0.5 rounded ${
            isActive
              ? "bg-cream/20 text-cream"
              : "bg-cream-warm text-stone-500"
          }`}
        >
          {item.badge}
        </span>
      )}
    </a>
  );
}

function NavContents({ pathname }: { pathname: string | null }) {
  return (
    <>
      {items.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}
      <div aria-hidden className="h-5 w-px bg-stone-300/70 mx-1 shrink-0" />
      <ThemeToggle />
    </>
  );
}

function Logo() {
  return (
    <a
      href="/"
      className="flex items-center gap-2.5 pl-1 pr-3 py-1 tracking-tight text-charcoal hover:text-terracotta transition-colors whitespace-nowrap"
    >
      <span className="relative size-8 rounded-full overflow-hidden shrink-0 dark:border-[1.5px] dark:border-[rgba(255,217,152,0.5)] dark:shadow-[0_0_6px_0_rgba(212,149,106,0.15)]">
        <img
          src="/logo-light.png"
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
      </span>
      <span
        className="text-[18px] font-normal leading-none"
        style={{ fontFamily: "var(--font-pixelify-sans), system-ui, sans-serif" }}
      >
        Aleksandr Mihhailovski
      </span>
    </a>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Lightweight scroll listener — only drives the nav-collapse flag.
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: single nav, container properties animate, content stays static */}
      <div className="hidden md:flex fixed inset-x-0 top-0 z-50 px-6 md:px-10 justify-center pointer-events-none">
        <motion.nav
          className={`pointer-events-auto w-full flex items-center justify-between gap-4 overflow-hidden border will-change-transform transition-[background-color,border-color,box-shadow] duration-[250ms] ease-out ${
            scrolled
              ? "bg-cream/95 border-stone-200/60 shadow-sm"
              : "bg-transparent border-transparent shadow-none"
          }`}
          animate={{
            maxWidth: scrolled ? 480 : 1080,
            paddingLeft: scrolled ? 8 : 0,
            paddingRight: scrolled ? 8 : 0,
            paddingTop: scrolled ? 6 : 16,
            paddingBottom: scrolled ? 6 : 16,
            borderRadius: scrolled ? 9999 : 0,
            marginTop: scrolled ? 16 : 0,
          }}
          transition={{ type: "tween", duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Logo />
          <div className="flex items-center gap-1 shrink-0">
            <NavContents pathname={pathname} />
          </div>
        </motion.nav>
      </div>

      {/* Mobile brand pill (top) */}
      <div className="md:hidden fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none px-4">
        <a
          href="/"
          className="pointer-events-auto flex items-center gap-2 p-1.5 pr-3 rounded-full bg-cream/95 border border-stone-200/60 shadow-sm text-charcoal hover:text-terracotta transition-colors"
        >
          <span className="relative size-7 rounded-full overflow-hidden shrink-0 dark:border-[1.5px] dark:border-[rgba(255,217,152,0.5)] dark:shadow-[0_0_6px_0_rgba(212,149,106,0.15)]">
            <img
              src="/logo-light.png"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </span>
          <span
            className="text-[14px] font-normal leading-none"
            style={{ fontFamily: "var(--font-pixelify-sans), system-ui, sans-serif" }}
          >
            Aleksandr Mihhailovski
          </span>
        </a>
      </div>

      {/* Mobile nav pill (bottom) */}
      <header className="md:hidden fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-cream/95 border border-stone-200/60 shadow-sm">
          <NavContents pathname={pathname} />
        </nav>
      </header>
    </>
  );
}
