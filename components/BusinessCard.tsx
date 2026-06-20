"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

const SCALE_FACTOR = 480 / 1080;
const SCROLL_RANGE = 200; // pixels of scroll over which the card collapses

const phrases = [
  "complex products feel simple",
  "prototypes that find friction",
  "design systems that scale",
  "workflows that save hours",
  "user tests & research",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;

const EMAIL = "ostf14@gmail.com";

export function BusinessCard() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  // Progressive enhancement: SSR markup contains the complete first phrase so
  // scrapers see a full hero line. The typewriter effect picks up from the
  // "phrase complete" state on mount (pause, delete, cycle).
  const [text, setText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll-linked dissolve — scale + opacity ONLY. Both are GPU-composited, so
  // the hero animates entirely on the compositor with no per-frame layout work
  // (an earlier marginBottom "pull-up" forced a full-page reflow every scroll
  // frame and dropped frames). The card just shrinks and fades as it scrolls
  // away; the sections below follow at natural scroll speed.
  const { scrollY } = useScroll();
  const SPRING = { stiffness: 1000, damping: 100, mass: 0.2 } as const;

  const scaleRaw = useTransform(scrollY, [0, SCROLL_RANGE], [1, SCALE_FACTOR], {
    clamp: true,
  });
  const scale = useSpring(scaleRaw, SPRING);

  const opacityRaw = useTransform(scrollY, [0, SCROLL_RANGE], [1, 0], {
    clamp: true,
  });
  const opacity = useSpring(opacityRaw, SPRING);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

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

  return (
    <motion.div
      data-hero-card="true"
      style={{
        scale,
        opacity,
        transformOrigin: "top center",
        willChange: "transform, opacity",
      }}
      className="group relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-2xl border border-[#FF6936]/40 dark:border-[#FF6936]/30 bg-[#FCFCFB] dark:bg-[#242626] shadow-[0_20px_60px_-20px_rgba(255,105,54,0.14)] dark:shadow-[0_20px_60px_-20px_rgba(255,105,54,0.1)] px-3 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-12"
    >
      {/* Hover-reveal terracotta dot pattern (full card, no per-frame mask) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 ease-out z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF6936 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        {/* Photo — 80px mobile (above text, left-aligned) / 180px desktop (beside) */}
        <div className="relative shrink-0 self-center md:self-auto">
          <div
            aria-hidden
            className="absolute inset-[-6px] md:inset-[-12px] rounded-full bg-[#FF6936]/20 dark:bg-[#FF6936]/15 blur-xl"
          />
          <div className="relative z-10 w-20 h-20 md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-[3px] border-white shadow-lg dark:border-2 dark:border-neutral-200/20 dark:bg-neutral-600 dark:shadow-none flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-photo.jpg"
              alt="Aleksandr Mihhailovski"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Heading */}
          <h2 className="font-serif font-normal text-[clamp(22px,7vw,36px)] md:text-4xl lg:text-6xl leading-[1.05] tracking-tight text-center md:text-left">
            <span className="block whitespace-nowrap text-[#1F1F1E] dark:text-[#E8E8E6]">
              Hi, I&rsquo;m Alex{" "}
              <span
                role="img"
                aria-label="waving hand"
                className="inline-block"
                style={{
                  transformOrigin: "70% 70%",
                  animation: "wave 2s ease-in-out 3 forwards",
                }}
              >
                👋🏻
              </span>
            </span>
            <span className="block text-[#7B7974] dark:text-[#E8E8E6]/40">
              Product Designer &amp; Builder
            </span>
          </h2>

          {/* Typewriter */}
          <p className="mt-6 font-sans text-xl md:text-[28px] leading-snug min-h-[56px] md:min-h-0">
            <span className="font-medium text-[#1F1F1E] dark:text-[#E8E8E6]">
              I make{" "}
            </span>
            <span className="font-normal text-[#7B7974] dark:text-neutral-500">
              {text}
            </span>
            <span aria-hidden className="font-normal text-terracotta cursor-blink">
              |
            </span>
          </p>
        </div>
      </div>

      {/* Bottom action bar — flush to card edges, four equal cells */}
      <div className="relative z-10 -mx-3 sm:-mx-8 md:-mx-12 mt-6 sm:mt-8 md:mt-12 border-t border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 grid grid-cols-4 md:rounded-b-2xl md:overflow-hidden">
        <a
          href="https://drive.google.com/file/d/1BuI4n3mlsFLC1WkC4zqa5WKOKdku0kWK/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] border-r border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          <Download className="w-4 h-4" />
          <span>My CV</span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email copied" : `Copy email ${EMAIL}`}
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] border-r border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied!" : "Email"}</span>
        </button>
        <a
          href="https://www.linkedin.com/in/alexmess/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] border-r border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/ostf14"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </motion.div>
  );
}
