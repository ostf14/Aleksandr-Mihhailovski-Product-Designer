"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "./ProgressiveBlur";
import { ThemeToggle } from "./ThemeToggle";
import { WIP_PREVIEW_COOKIE } from "@/lib/site";

type Item = { label: string; href: string; badge?: string; wip?: boolean };

// Items marked `wip` point at routes middleware still redirects away from, so
// they only appear once the preview cookie is set — otherwise the nav would
// advertise links that bounce every visitor straight back to /work.
const items: Item[] = [
  { label: "Work", href: "/work" },
  { label: "Graphic", href: "/graphic" },
  { label: "Testimonials", href: "/testimonials", wip: true },
  { label: "Lectures", href: "/ru/lectures", badge: "RU", wip: true },
  { label: "About", href: "/about", wip: true },
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
      data-active={isActive || undefined}
      className={`flex shrink-0 items-center gap-1.5 px-4 py-2 rounded-full text-[13px] md:text-sm transition-colors ${
        isActive
          ? "bg-charcoal text-cream"
          : "text-[#666666] dark:text-stone-600 hover:bg-cream-warm hover:text-charcoal"
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

function NavLinks({
  pathname,
  preview,
}: {
  pathname: string | null;
  preview: boolean;
}) {
  return (
    <>
      {items
        .filter((item) => preview || !item.wip)
        .map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
    </>
  );
}

/** Divider plus the theme toggle — never part of the scrollable strip. */
function NavControls() {
  return (
    <>
      <div aria-hidden className="h-5 w-px bg-stone-300/70 mx-1 shrink-0" />
      <div className="shrink-0">
        <ThemeToggle />
      </div>
    </>
  );
}

/**
 * Keeps the current tab in view inside the mobile pill.
 *
 * Five items measure ~509px, so on a 344px screen the strip scrolls. Without
 * this it would always start at "Work" and the tab you are actually on could
 * sit off the edge. scrollLeft is set directly rather than with
 * scrollIntoView, which would also scroll the page behind the fixed pill.
 */
function useCenterActiveTab(pathname: string | null, preview: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = ref.current;
    const active = strip?.querySelector<HTMLElement>("[data-active]");
    if (!strip || !active) return;

    strip.scrollLeft =
      active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2;
  }, [pathname, preview]);

  return ref;
}

function Logo() {
  return (
    <a
      href="/"
      className="flex items-center gap-2.5 pl-1 pr-3 py-1 tracking-tight text-charcoal hover:text-terracotta transition-colors whitespace-nowrap"
    >
      <span className="logo-mark relative size-8 shrink-0">
        <img
          src="/logo-skull.png"
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

  // Read after mount: the server has no way to know, and rendering the extra
  // links straight away would make the two disagree at hydration.
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    setPreview(
      document.cookie
        .split("; ")
        .some((c) => c === `${WIP_PREVIEW_COOKIE}=1`),
    );
  }, [pathname]);

  const tabStripRef = useCenterActiveTab(pathname, preview);

  useEffect(() => {
    // Lightweight scroll listener — only drives the nav-collapse flag.
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Dissolves the top edge of the content as it passes under the pill.
          Sits at z-40: below the nav, above the page. Rendered unconditionally
          rather than faded in with `scrolled` — main starts at pt-20/pt-28, so
          at rest there is nothing underneath it to blur, and toggling it would
          only add a visible pop. Desktop only: the mobile nav is a different
          arrangement, and this is five compositing layers. */}
      <div
        aria-hidden
        className="hidden md:block fixed inset-x-0 top-0 z-40 pointer-events-none"
        style={{ height: 90 }}
      >
        <ProgressiveBlur edge="top" height={90} />
      </div>

      {/* Desktop: single nav, container properties animate, content stays static.
          Plain CSS transition rather than Framer: every animated property here
          (max-width, padding, radius, colours) is one the compositor hands back
          to style/layout anyway, so driving it from JS bought nothing and cost a
          library on the critical path.

          The frosted fill is the whole point of the collapsed state — 60%
          opacity plus saturate/blur, not the old near-opaque 95%, which is what
          makes the pill read as glass instead of a solid chip. backdrop-filter
          is deliberately absent until `scrolled`: it promotes a compositing
          layer for as long as it is set, and there is nothing to frost while the
          bar is transparent. The colour fade covers the switch. */}
      <div className="hidden md:flex fixed inset-x-0 top-0 z-50 px-6 md:px-10 justify-center pointer-events-none">
        <nav
          className={`pointer-events-auto w-full flex items-center justify-between gap-4 overflow-hidden border will-change-transform transition-[max-width,padding,margin,border-radius,background-color,border-color,box-shadow] duration-t5 ease-out-expo ${
            scrolled
              ? "max-w-[480px] mt-4 px-2 py-1.5 rounded-full bg-[var(--glass)] backdrop-blur-[20px] backdrop-saturate-[1.8] border-stone-200/60 shadow-pill"
              : "max-w-bleed mt-0 px-0 py-4 rounded-none bg-transparent border-transparent shadow-none"
          }`}
        >
          <Logo />
          <div className="flex items-center gap-1 shrink-0">
            <NavLinks pathname={pathname} preview={preview} />
            <NavControls />
          </div>
        </nav>
      </div>

      {/* Mobile brand pill (top) */}
      <div className="md:hidden fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none px-4">
        <a
          href="/"
          className="pointer-events-auto flex items-center gap-2 p-1.5 pr-3 rounded-full bg-cream/95 border border-stone-200/60 shadow-sm text-charcoal hover:text-terracotta transition-colors"
        >
          <span className="logo-mark relative size-7 shrink-0">
            <img
              src="/logo-skull.png"
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

      {/* Mobile nav pill (bottom) — scrolls sideways rather than bleeding off
          both edges once there are more than three items. */}
      <header className="md:hidden fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex max-w-full items-center gap-1 p-1.5 rounded-full bg-cream/95 border border-stone-200/60 shadow-sm">
          {/* Only the links scroll. The theme toggle stays pinned — burying
              the one control that switches light and dark behind a swipe
              would be worse than hiding a tab. */}
          <div
            ref={tabStripRef}
            className="flex min-w-0 items-center gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <NavLinks pathname={pathname} preview={preview} />
          </div>
          <NavControls />
        </nav>
      </header>
    </>
  );
}
