"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const phrases = [
  "complex products feel simple",
  "prototypes that find friction",
  "design systems that scale",
  "workflows that save hours",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;
const COLLAPSE_THRESHOLD = 100;

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const FADE = { duration: 0.3 };

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")";

function formatClock(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function StickyIdentityCard() {
  const [collapsed, setCollapsed] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setCollapsed(v > COLLAPSE_THRESHOLD);
  });

  // Typewriter
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), PAUSE_FULL);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      }, PAUSE_EMPTY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? DELETE_SPEED : TYPE_SPEED,
    );
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx]);

  // Live clock
  const [clock, setClock] = useState<string | null>(null);
  useEffect(() => {
    setClock(formatClock(new Date()));
    const id = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sticky top-6 z-50 px-6 md:px-10 pointer-events-none">
      <LayoutGroup>
        <motion.div
          layout
          transition={SPRING}
          style={!collapsed ? { backgroundImage: NOISE_BG } : undefined}
          className={
            collapsed
              ? "pointer-events-auto mx-auto w-fit max-w-full flex items-center gap-2 rounded-full bg-[#F0EDE5]/80 dark:bg-[#242626]/80 backdrop-blur-xl border border-stone-200/60 dark:border-white/5 shadow-sm pl-3 pr-2 py-2"
              : "pointer-events-auto mx-auto max-w-4xl w-full overflow-hidden rounded-2xl bg-[#F0EDE5] dark:bg-[#242626] p-6 md:p-12 flex flex-col shadow-sm"
          }
        >
          {/* Identity row — shared in both states */}
          <motion.div layout className="flex items-center gap-3">
            <motion.span
              layoutId="nav-logo"
              transition={SPRING}
              className={`relative rounded-full overflow-hidden shrink-0 dark:border-[1.5px] dark:border-[rgba(255,217,152,0.5)] dark:shadow-[0_0_6px_0_rgba(212,149,106,0.15)] ${
                collapsed ? "size-8" : "size-10"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-light.png"
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.span>

            <AnimatePresence mode="wait" initial={false}>
              {collapsed ? (
                <motion.span
                  key="pill-name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE}
                  className="text-[14px] md:text-sm font-normal leading-none text-[#1a1a1a] dark:text-[#E8E8E6] whitespace-nowrap"
                  style={{
                    fontFamily:
                      "var(--font-pixelify-sans), system-ui, sans-serif",
                  }}
                >
                  Aleksandr Mihhailovski
                </motion.span>
              ) : (
                <motion.div
                  key="card-name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE}
                  className="flex flex-col leading-tight"
                >
                  <span className="font-sans text-base font-medium text-[#1a1a1a] dark:text-[#E8E8E6]">
                    Aleksandr Mihhailovski
                  </span>
                  <span className="font-sans text-sm text-neutral-400">
                    Product Designer
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Expanded body */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="expanded-body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={FADE}
                className="overflow-hidden"
              >
                <hr className="mt-5 mb-5 border-0 border-t border-neutral-300/30 dark:border-neutral-500/20" />

                <p className="text-xl md:text-3xl leading-snug">
                  <span className="font-serif text-[#1a1a1a] dark:text-[#E8E8E6]">
                    I make{" "}
                  </span>
                  <span className="font-sans font-normal text-neutral-400 dark:text-neutral-500">
                    {text}
                  </span>
                  <span
                    aria-hidden
                    className="font-sans font-normal text-terracotta"
                    style={{ animation: "blink 1s steps(2, start) infinite" }}
                  >
                    |
                  </span>
                </p>

                <div
                  className="mt-6 max-w-2xl font-sans text-base text-neutral-500 dark:text-neutral-400"
                  style={{ lineHeight: 1.6 }}
                >
                  <p>Product designer with a research background.</p>
                  <p>
                    Specializing in B2B SaaS, internal tools, and data-heavy
                    interfaces.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="font-sans text-xs text-neutral-400">
                    Kraków, Poland
                  </span>
                  <span className="font-mono text-xs text-neutral-400 tabular-nums">
                    {clock ?? "--:--:--"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed nav controls */}
          <AnimatePresence initial={false}>
            {collapsed && (
              <motion.div
                key="collapsed-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={FADE}
                className="ml-2 flex items-center gap-1"
              >
                <a
                  href="/"
                  className="px-4 py-1.5 rounded-full bg-charcoal text-cream text-[13px] md:text-sm whitespace-nowrap"
                >
                  Cases
                </a>
                <a
                  href="/about"
                  className="px-4 py-1.5 rounded-full text-stone-600 hover:bg-cream-warm hover:text-charcoal text-[13px] md:text-sm transition-colors whitespace-nowrap"
                >
                  About
                </a>
                <div
                  aria-hidden
                  className="h-5 w-px bg-stone-300/70 mx-1 shrink-0"
                />
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
