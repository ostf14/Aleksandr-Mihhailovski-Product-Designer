"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "./ProgressiveBlur";
import { ThemeToggle } from "./ThemeToggle";
import { WIP_PREVIEW_COOKIE } from "@/lib/site";
import { getWork, isGame } from "@/lib/works";

type Item = { label: string; href: string; badge?: string; wip?: boolean };

// Items marked `wip` point at routes middleware still redirects away from, so
// they only appear once the preview cookie is set — otherwise the nav would
// advertise links that bounce every visitor straight back to /product.
const items: Item[] = [
  { label: "Product", href: "/product" },
  { label: "Graphic", href: "/graphic" },
  { label: "Gamedev", href: "/gamedev" },
  { label: "Testimonials", href: "/testimonials", wip: true },
  { label: "Lectures", href: "/ru/lectures", badge: "RU", wip: true },
  { label: "About", href: "/about", wip: true },
];

// A case study has no tab of its own, so it lights the section it belongs to
// rather than leaving the nav with nothing selected. Which section that is
// comes from the register, not from the URL: /case/<slug> is a flat namespace
// shared by product work and games, and reading `disciplines` is the only way
// to tell them apart. The /other gallery belongs to Product.
function sectionFor(pathname: string): string | null {
  if (pathname.startsWith("/case/")) {
    const work = getWork(pathname.slice("/case/".length));
    if (!work) return "/product";
    return isGame(work) ? "/gamedev" : "/product";
  }
  if (pathname === "/other" || pathname.startsWith("/other/"))
    return "/product";
  return null;
}

function isItemActive(item: Item, pathname: string | null): boolean {
  if (!pathname) return false;
  const section = sectionFor(pathname);
  if (section) return item.href === section;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function NavLink({ item, pathname }: { item: Item; pathname: string | null }) {
  const isActive = isItemActive(item, pathname);

  return (
    <a
      href={item.href}
      data-active={isActive || undefined}
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] transition-colors md:text-sm ${
        isActive
          ? "bg-fg text-bg"
          : "text-muted hover:bg-surface hover:text-fg dark:text-strong"
      }`}
    >
      {item.label}
      {item.badge && (
        <span
          className={`rounded px-1 py-0.5 font-mono text-[9px] leading-none tracking-[0.08em] ${
            isActive ? "bg-bg/20 text-bg" : "bg-surface text-muted"
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
      <div aria-hidden className="mx-1 h-5 w-px shrink-0 bg-line-strong/70" />
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

/** gap-4 between the logo and the links. */
const NAV_GAP = 16;
/** px-2 plus a 1px border on each side, the collapsed pill's own chrome. */
const NAV_CHROME = 18;

/**
 * How wide the collapsed pill has to be to hold its contents.
 *
 * It used to be a hard 480px, which fitted the tabs that existed when it was
 * written. Adding Gamedev pushed the real requirement to 577 and the last tab
 * was simply cut off by the pill's overflow — and there is no single number
 * that works anyway, because the preview cookie adds three more tabs and takes
 * it to 871. So it is measured instead of guessed, and a tab can be added
 * without anyone remembering this file.
 *
 * Children are measured by scrollWidth, which is their unclipped content
 * width: correct whether or not flex has squeezed them to fit the current cap.
 */
function usePillWidth(deps: unknown[]) {
  const ref = useRef<HTMLElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    const measure = () => {
      const kids = Array.from(nav.children) as HTMLElement[];
      if (!kids.length) return;
      const content = kids.reduce((sum, k) => sum + k.scrollWidth, 0);
      setWidth(Math.ceil(content + NAV_GAP * (kids.length - 1) + NAV_CHROME));
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [ref, width] as const;
}

function Logo() {
  return (
    <a
      href="/"
      className="flex items-center gap-2.5 whitespace-nowrap py-1 pl-1 pr-3 tracking-tight text-fg transition-colors hover:text-accent"
    >
      <span className="logo-mark relative size-8 shrink-0">
        {/* A 32px pixel-art PNG rendered with image-rendering: pixelated —
            next/image would resample it, which is the one thing it must not
            do, and there is no bandwidth to save at this size. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-skull.png"
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
      </span>
      <span className="font-sans text-[17px] font-medium leading-none tracking-[-0.01em]">
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
      document.cookie.split("; ").some((c) => c === `${WIP_PREVIEW_COOKIE}=1`),
    );
  }, [pathname]);

  const tabStripRef = useCenterActiveTab(pathname, preview);
  // Re-measured when the tab count changes, which is what the preview cookie
  // does.
  const [navRef, pillWidth] = usePillWidth([preview]);

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
        className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden md:block"
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
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center px-6 md:flex md:px-10">
        <nav
          ref={navRef}
          // The collapsed cap comes from the measurement above; the class below
          // is only the fallback for the frame before it lands.
          style={
            scrolled && pillWidth ? { maxWidth: `${pillWidth}px` } : undefined
          }
          className={`pointer-events-auto flex w-full items-center justify-between gap-4 overflow-hidden border transition-[max-width,padding,margin,border-radius,background-color,border-color,box-shadow] duration-t5 ease-out-expo will-change-transform ${
            scrolled
              ? "mt-4 max-w-[640px] rounded-full border-line/60 bg-[var(--glass)] px-2 py-1.5 shadow-pill backdrop-blur-[20px] backdrop-saturate-[1.8]"
              : "mt-0 max-w-[var(--shell)] rounded-none border-transparent bg-transparent px-0 py-4 shadow-none"
          }`}
        >
          <Logo />
          <div className="flex shrink-0 items-center gap-1">
            <NavLinks pathname={pathname} preview={preview} />
            <NavControls />
          </div>
        </nav>
      </div>

      {/* Mobile brand pill (top) */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:hidden">
        <a
          href="/"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-line/60 bg-bg/95 p-1.5 pr-3 text-fg shadow-sm transition-colors hover:text-accent"
        >
          <span className="logo-mark relative size-7 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-skull.png"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </span>
          <span className="font-sans text-[14px] font-medium leading-none tracking-[-0.01em]">
            Aleksandr Mihhailovski
          </span>
        </a>
      </div>

      {/* Mobile nav pill (bottom) — scrolls sideways rather than bleeding off
          both edges once there are more than three items. */}
      <header className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden">
        <nav className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-line/60 bg-bg/95 p-1.5 shadow-sm">
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
