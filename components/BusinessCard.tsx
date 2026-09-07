"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { links } from "@/lib/site";

// Gentle shrink only. A big scale-down vacated a lot of its (still
// layout-reserved) height as it shrank, leaving a visible gap above the Cases
// block before you scrolled to it. Keeping the shrink subtle means the card
// dissolves roughly in place — the fast opacity fade still reads as "flies
// away" — so the sections below sit right under it.
const SCALE_FACTOR = 0.92;
const SCROLL_RANGE = 200; // pixels of scroll over which the card dissolves

const phrases = [
  "prototypes that find friction",
  "design systems that scale",
  "workflows that save hours",
  "user tests & research",
  "complex products feel simple",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;

/**
 * The craft line is a caption, not a third heading, so it is capped small.
 *
 * Size is taken as a fraction of the role line rather than set per breakpoint:
 * the target width and the natural width then scale with the same number, so
 * the em-tracking comes out identical at every viewport. Fixed sizes drifted
 * badly — 0.42em on a desktop against roughly 1.3em on a phone.
 *
 * The floor exists because the ratio alone would put the line under 9px on a
 * narrow phone. Below the floor the tracking is tighter than on desktop, which
 * is the right trade: legibility over consistency at the size where the line
 * is hardest to read.
 */
const CRAFT_SIZE_RATIO = 0.34;
const CRAFT_SIZE_MIN = 11;
const CRAFT_SIZE_MAX = 20;

export function BusinessCard() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  // Progressive enhancement: SSR markup contains the complete first phrase so
  // scrapers see a full hero line. The typewriter effect picks up from the
  // "phrase complete" state on mount (pause, delete, cycle).
  const [text, setText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pause the typewriter (and its ~30–60ms re-render loop) while the hero is
  // scrolled out of view — no point cycling phrases nobody can see.
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  // Stretch the craft line to exactly the width of the role line above it.
  // The difference is spent on letter-spacing rather than on type size, so the
  // two lines stay optically related instead of one being a shrunken copy.
  const roleRef = useRef<HTMLSpanElement>(null);
  const craftRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fitCraftLine = () => {
      const role = roleRef.current;
      const craft = craftRef.current;
      if (!role || !craft) return;

      // The role span is display:block, so its box is the column width, not
      // the width of its glyphs. A Range measures the text itself.
      const textWidth = (el: HTMLElement) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        return range.getBoundingClientRect().width;
      };

      // Size the craft line as a fixed fraction of the role line rather than
      // by breakpoint. Both the target width and the natural width then scale
      // with the same number, which makes the em-tracking identical at every
      // viewport — with fixed sizes it drifted from 0.42em on desktop to
      // 1.3em on a phone, and the line fell apart at the narrow end.
      const roleSize = parseFloat(getComputedStyle(role).fontSize);
      if (roleSize > 0) {
        const size = Math.min(
          CRAFT_SIZE_MAX,
          Math.max(CRAFT_SIZE_MIN, roleSize * CRAFT_SIZE_RATIO),
        );
        craft.style.fontSize = `${size}px`;
      }

      craft.style.letterSpacing = "0px";
      craft.style.marginRight = "0px";

      const target = textWidth(role);
      const natural = textWidth(craft);
      const gaps = (craft.textContent?.length ?? 0) - 1;
      if (gaps < 1 || target <= 0 || natural <= 0) return;

      // Never go negative. If the line above is somehow narrower than this one
      // laid out naturally — a collapsed container, a font that failed to load,
      // a future rewrite of the copy — squeezing the glyphs together would look
      // broken, whereas simply not stretching does not.
      const spacing = Math.max(0, (target - natural) / gaps);
      craft.style.letterSpacing = `${spacing}px`;
      // Letter-spacing also lands after the final glyph, which would push the
      // line one tracking unit past the one above. Cancel it on the box —
      // the span is inline-block, so this keeps centring correct on mobile.
      craft.style.marginRight = `${-spacing}px`;
    };

    fitCraftLine();

    // The role line's box tracks the column, so this fires whenever the
    // viewport changes the clamp()-driven size above.
    const observer = new ResizeObserver(fitCraftLine);
    if (roleRef.current) observer.observe(roleRef.current);
    window.addEventListener("resize", fitCraftLine, { passive: true });
    // Gambarino arrives from a CDN — measuring before it lands would size the
    // line against the fallback serif and leave it visibly short.
    document.fonts?.ready.then(fitCraftLine).catch(() => {});

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitCraftLine);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!visible) return;
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
  }, [text, deleting, phraseIdx, visible]);

  return (
    <motion.div
      ref={cardRef}
      data-hero-card="true"
      style={{
        scale,
        opacity,
        transformOrigin: "top center",
        willChange: "transform, opacity",
      }}
      className="group relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-2xl border border-[#FF6936]/40 dark:border-[#FF6936]/30 bg-[#FFFEFB] dark:bg-[#242626] shadow-[0_20px_60px_-20px_rgba(255,105,54,0.14)] dark:shadow-[0_20px_60px_-20px_rgba(255,105,54,0.1)] px-3 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-12"
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
            <span className="block whitespace-nowrap text-[#282726] dark:text-[#E8E8E6]">
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
            <span
              ref={roleRef}
              className="block text-[#6F6E69] dark:text-[#E8E8E6]/40"
            >
              Product Design Engineer
            </span>
            <span
              ref={craftRef}
              className="inline-block whitespace-nowrap font-sans font-light uppercase leading-none mt-3 md:mt-4 text-[11px] md:text-[12px] lg:text-[20px] text-[#6F6E69] dark:text-[#E8E8E6]/40"
            >
              with visual craft
            </span>
          </h2>

          {/* Typewriter */}
          <p className="mt-6 font-sans text-xl md:text-[28px] leading-snug min-h-[56px] md:min-h-0">
            <span className="font-medium text-[#282726] dark:text-[#E8E8E6]">
              I make{" "}
            </span>
            <span className="font-normal text-[#6F6E69] dark:text-neutral-500">
              {text}
            </span>
            <span aria-hidden className="font-normal text-terracotta cursor-blink">
              |
            </span>
          </p>
        </div>
      </div>

      {/* Bottom action bar — flush to card edges, four equal cells */}
      <div className="relative z-10 -mx-3 sm:-mx-8 md:-mx-12 mt-6 sm:mt-8 md:mt-12 border-t border-[rgba(40,39,38,0.1)] dark:border-neutral-500/20 grid grid-cols-4 md:rounded-b-2xl md:overflow-hidden">
        <a
          href={links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#3A3833] dark:text-[#E8E8E6] border-r border-[rgba(40,39,38,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          <Download className="w-4 h-4" />
          <span>My CV</span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email copied" : `Copy email ${links.email}`}
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#3A3833] dark:text-[#E8E8E6] border-r border-[rgba(40,39,38,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied!" : "Email"}</span>
        </button>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#3A3833] dark:text-[#E8E8E6] border-r border-[rgba(40,39,38,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#3A3833] dark:text-[#E8E8E6] transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </motion.div>
  );
}
