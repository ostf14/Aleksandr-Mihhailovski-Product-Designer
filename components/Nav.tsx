"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string };

const items: Item[] = [
  { label: "Cases", href: "/#cases" },
  { label: "Other", href: "/#other" },
];

function NavLink({
  item,
  pathname,
  activeAnchor,
}: {
  item: Item;
  pathname: string | null;
  activeAnchor: string | null;
}) {
  const hashKey = item.href.startsWith("/#") ? item.href.slice(2) : null;
  const isActive = hashKey
    ? activeAnchor === hashKey
    : pathname === item.href || pathname?.startsWith(item.href + "/");

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept "/#id" anchors when we're already on the home page.
    if (!item.href.startsWith("/#") || pathname !== "/") return;
    const id = item.href.slice(2);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    // The hero only scales/fades now (no layout collapse), so the section's
    // document position is stable — land its top at the upper-third sweet spot.
    const newScrollY =
      target.getBoundingClientRect().top + window.scrollY - window.innerHeight / 6;

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
  activeAnchor,
}: {
  pathname: string | null;
  activeAnchor: string | null;
}) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          pathname={pathname}
          activeAnchor={activeAnchor}
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
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const onCasePage = pathname?.startsWith("/case/") ?? false;
    const onHome = pathname === "/";

    // Lightweight scroll listener — only drives the nav-collapse flag.
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (onCasePage) {
      setActiveAnchor("cases");
      return () => window.removeEventListener("scroll", onScroll);
    }
    if (pathname === "/other" || pathname?.startsWith("/other/")) {
      setActiveAnchor("other");
      return () => window.removeEventListener("scroll", onScroll);
    }
    if (!onHome) {
      setActiveAnchor(null);
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Home: IntersectionObserver tracks visibility of the #cases and #other
    // sections. Active = first section in DOM order whose ratio >= 0.4.
    const ids = ["cases", "other"];
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let active: string | null = null;
        for (const id of ids) {
          if ((visibility.get(id) ?? 0) >= 0.4) {
            active = id;
            break;
          }
        }
        setActiveAnchor(active);
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    const observed: HTMLElement[] = [];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
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
            <NavContents pathname={pathname} activeAnchor={activeAnchor} />
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
          <NavContents pathname={pathname} activeAnchor={activeAnchor} />
        </nav>
      </header>
    </>
  );
}
