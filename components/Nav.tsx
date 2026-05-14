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

const EMAIL = "alex@example.com";

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

function Divider() {
  return <div aria-hidden className="h-5 w-px bg-stone-300/70 mx-1 shrink-0" />;
}

function LinkedInLink() {
  return (
    <a
      href="https://www.linkedin.com/in/alexmess/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      title="LinkedIn"
      className="size-9 rounded-full flex items-center justify-center text-stone-500 hover:text-terracotta hover:bg-cream-warm transition-colors shrink-0"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="16"
        height="16"
        aria-hidden
      >
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    </a>
  );
}

function EmailButton() {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onClick}
        className="px-3 py-2 text-sm text-stone-500 hover:text-terracotta transition-colors"
      >
        Email
      </button>
      <span
        aria-hidden={!copied}
        className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-charcoal text-cream text-[11px] whitespace-nowrap shadow-sm transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </div>
  );
}

function NavContents({
  pathname,
  showExtras,
}: {
  pathname: string | null;
  showExtras: boolean;
}) {
  return (
    <>
      {items.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}
      {showExtras && (
        <>
          <Divider />
          <LinkedInLink />
          <EmailButton />
        </>
      )}
      <Divider />
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
            <NavContents pathname={pathname} showExtras={!scrolled} />
          </div>
        </motion.nav>
      </div>

      {/* Mobile pill (bottom) */}
      <header className="md:hidden fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-cream/80 backdrop-blur-md border border-stone-200/60 shadow-sm">
          <NavContents pathname={pathname} showExtras={false} />
        </nav>
      </header>
    </>
  );
}
