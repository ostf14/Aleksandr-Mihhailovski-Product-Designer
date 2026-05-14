"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string };

const items: Item[] = [
  { label: "Cases", href: "/" },
  { label: "About", href: "/about" },
];

function NavLink({ item, pathname }: { item: Item; pathname: string | null }) {
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname?.startsWith(item.href + "/");
  return (
    <a
      href={item.href}
      className={`px-4 py-2 rounded-full text-[13px] md:text-sm transition-colors ${
        isActive
          ? "bg-charcoal text-cream"
          : "text-stone-600 hover:bg-cream-warm hover:text-charcoal"
      }`}
    >
      {item.label}
    </a>
  );
}

function NavContents({ pathname }: { pathname: string | null }) {
  return (
    <>
      {items.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}
      <div aria-hidden className="h-5 w-px bg-stone-300/70 mx-1" />
      <ThemeToggle />
    </>
  );
}

function Logo() {
  return (
    <a
      href="/"
      className="flex items-center gap-2.5 pl-1 pr-3 py-1 text-sm font-medium tracking-tight text-charcoal hover:text-terracotta transition-colors whitespace-nowrap"
    >
      <span className="relative size-8 rounded-full overflow-hidden shrink-0">
        <img
          src="/logo-light.png"
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
      </span>
      <span>Alex Mikhailovski</span>
    </a>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
          className={`pointer-events-auto w-full flex items-center justify-between gap-4 overflow-hidden border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[400ms] ease-in-out ${
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Logo />
          <div className="flex items-center gap-1 shrink-0">
            <NavContents pathname={pathname} />
          </div>
        </motion.nav>
      </div>

      {/* Mobile pill (bottom) */}
      <header className="md:hidden fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-cream/80 backdrop-blur-md border border-stone-200/60 shadow-sm">
          <NavContents pathname={pathname} />
        </nav>
      </header>
    </>
  );
}
