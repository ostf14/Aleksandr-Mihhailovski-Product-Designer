"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string };

const items: Item[] = [
  { label: "Cases", href: "/#cases" },
  { label: "About", href: "/about" },
];

function NavLink({
  item,
  pathname,
  casesActive,
}: {
  item: Item;
  pathname: string | null;
  casesActive: boolean;
}) {
  const isActive = item.href.startsWith("/#")
    ? casesActive
    : pathname === item.href || pathname?.startsWith(item.href + "/");

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept "/#id" anchors when we're already on the home page.
    if (!item.href.startsWith("/#") || pathname !== "/") return;
    const id = item.href.slice(2);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    // Account for the hero BusinessCard collapsing on scroll. Its marginBottom
    // interpolates linearly from 0 to -cardHeight over scrollY [0, HERO_RANGE],
    // so the target's actual position depends on the final scrollY. Solve
    // analytically so the smooth-scroll lands at the right place even though
    // the layout shifts during the animation.
    const HERO_RANGE = 200; // synced with SCROLL_RANGE in BusinessCard.tsx
    const vh = window.innerHeight;
    const desiredY = vh / 6;
    const currentScrollY = window.scrollY;
    const targetDocY = target.getBoundingClientRect().top + currentScrollY;

    const heroCard = document.querySelector(
      "[data-hero-card]",
    ) as HTMLElement | null;
    const cardHeight = heroCard?.offsetHeight ?? 0;
    const collapseFactor =
      Math.min(currentScrollY, HERO_RANGE) / HERO_RANGE;
    const baseY = targetDocY + collapseFactor * cardHeight;

    let newScrollY: number;
    const denom = 1 + cardHeight / HERO_RANGE;
    const partial = (baseY - desiredY) / denom; // assumes scrollY in [0, HERO_RANGE]
    if (partial >= HERO_RANGE) {
      // Past full collapse — layout stable
      newScrollY = baseY - cardHeight - desiredY;
    } else {
      newScrollY = partial;
    }

    window.scrollTo({ top: Math.max(0, newScrollY), behavior: "smooth" });
    history.pushState(null, "", item.href);
  };

  return (
    <a
      href={item.href}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[13px] md:text-sm transition-colors ${
        isActive
          ? "bg-charcoal text-cream"
          : "text-[#7B7974] dark:text-stone-600 hover:bg-cream-warm hover:text-charcoal"
      }`}
    >
      {item.label}
    </a>
  );
}

function NavContents({
  pathname,
  casesActive,
}: {
  pathname: string | null;
  casesActive: boolean;
}) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          pathname={pathname}
          casesActive={casesActive}
        />
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
  const [casesActive, setCasesActive] = useState(false);

  useEffect(() => {
    const onCasePage = pathname?.startsWith("/case/") ?? false;
    const onHome = pathname === "/";

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (onCasePage) {
        setCasesActive(true);
        return;
      }
      if (!onHome) {
        setCasesActive(false);
        return;
      }
      // On home: active once #cases heading crosses the upper-third
      // sweet spot (≈ viewport-height / 6 from the top).
      const heading = document.getElementById("cases");
      if (!heading) {
        setCasesActive(false);
        return;
      }
      const triggerY = window.innerHeight / 6;
      setCasesActive(heading.getBoundingClientRect().top <= triggerY);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <>
      {/* Desktop: single nav, container properties animate, content stays static */}
      <div className="hidden md:flex fixed inset-x-0 top-0 z-50 px-6 md:px-10 justify-center pointer-events-none">
        <motion.nav
          className={`pointer-events-auto w-full flex items-center justify-between gap-4 overflow-hidden border will-change-transform transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[250ms] ease-out ${
            scrolled
              ? "bg-cream/80 backdrop-blur-md border-stone-200/60 shadow-sm"
              : "bg-transparent border-transparent shadow-none backdrop-blur-0"
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
            <NavContents pathname={pathname} casesActive={casesActive} />
          </div>
        </motion.nav>
      </div>

      {/* Mobile brand pill (top) */}
      <div className="md:hidden fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none px-4">
        <a
          href="/"
          className="pointer-events-auto flex items-center gap-2 p-1.5 pr-3 rounded-full bg-cream/80 backdrop-blur-md border border-stone-200/60 shadow-sm text-charcoal hover:text-terracotta transition-colors"
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
        <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-cream/80 backdrop-blur-md border border-stone-200/60 shadow-sm">
          <NavContents pathname={pathname} casesActive={casesActive} />
        </nav>
      </header>
    </>
  );
}
