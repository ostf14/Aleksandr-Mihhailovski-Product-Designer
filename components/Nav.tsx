"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string };

const items: Item[] = [
  { label: "Cases", href: "/" },
  { label: "About", href: "/about" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 z-50 flex justify-center pointer-events-none px-4 bottom-4 md:bottom-auto md:top-4 md:px-0">
      <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-cream/80 backdrop-blur-md border border-stone-200/60 shadow-sm">
        <a
          href="/"
          className="hidden md:flex items-center gap-2.5 pl-1 pr-3 py-1 text-sm font-medium tracking-tight text-charcoal hover:text-terracotta transition-colors"
        >
          <span className="relative size-8 rounded-full overflow-hidden shrink-0">
            <img
              src="/logo-dark.png"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover dark:hidden"
              style={{ imageRendering: "pixelated" }}
            />
            <img
              src="/logo-light.png"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover hidden dark:block"
              style={{ imageRendering: "pixelated" }}
            />
          </span>
          <span>Alex Mikhailovski</span>
        </a>
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <a
              key={item.href}
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
        })}
        <div aria-hidden className="h-5 w-px bg-stone-300/70 mx-1" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
