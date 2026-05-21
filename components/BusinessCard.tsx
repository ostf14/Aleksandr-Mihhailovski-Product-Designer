"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, Copy, Download } from "lucide-react";

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
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setCardHeight(cardRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-linked motion values — no React state, no animation timer.
  // Spring-smoothed so the card doesn't snap on each chunky scroll event.
  const { scrollY } = useScroll();
  const SPRING = { stiffness: 1000, damping: 100, mass: 0.2 } as const;

  const scaleRaw = useTransform(scrollY, [0, SCROLL_RANGE], [1, SCALE_FACTOR], {
    clamp: true,
  });
  const scale = useSpring(scaleRaw, SPRING);

  // Card fades + blurs as it dissolves; gap closes completely once invisible.
  const opacityRaw = useTransform(scrollY, [0, SCROLL_RANGE], [1, 0], {
    clamp: true,
  });
  const opacity = useSpring(opacityRaw, SPRING);

  const blurRaw = useTransform(scrollY, [0, SCROLL_RANGE], [0, 8], {
    clamp: true,
  });
  const filter = useTransform(blurRaw, (b) => `blur(${b}px)`);

  const marginBottomRaw = useTransform(
    scrollY,
    [0, SCROLL_RANGE],
    [0, -cardHeight],
    { clamp: true },
  );
  const marginBottom = useSpring(marginBottomRaw, SPRING);

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
      ref={cardRef}
      data-hero-card="true"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
      style={{
        scale,
        opacity,
        filter,
        marginBottom,
        transformOrigin: "top center",
        willChange: "transform, opacity, filter",
      }}
      className="group relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-2xl border border-[#FF6936]/40 dark:border-[#FF6936]/30 bg-[#FCFCFB]/90 dark:bg-[#242626] backdrop-blur-sm shadow-[0_20px_60px_-20px_rgba(255,105,54,0.14)] dark:shadow-[0_20px_60px_-20px_rgba(255,105,54,0.1)] px-8 pt-8 md:px-12 md:pt-12"
    >
      {/* Spotlight dot pattern — only the disc around the cursor is visible */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.35] transition-opacity duration-300 ease-out z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF6936 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle 180px at var(--mx, -200px) var(--my, -200px), black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle 180px at var(--mx, -200px) var(--my, -200px), black 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 md:flex md:items-start md:gap-8">
        {/* Photo — fixed 180px circle with warm glow */}
        <div className="hidden md:block relative shrink-0">
          <div
            aria-hidden
            className="absolute inset-[-12px] rounded-full bg-[#FF6936]/20 dark:bg-[#FF6936]/15 blur-xl"
          />
          <div className="relative z-10 w-[180px] h-[180px] rounded-full overflow-hidden border-[3px] border-white shadow-lg dark:border-2 dark:border-neutral-200/20 dark:bg-neutral-600 dark:shadow-none flex items-center justify-center">
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
          <h2 className="font-serif font-normal text-[28px] md:text-4xl lg:text-6xl leading-[1.05] tracking-tight">
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

      {/* Bottom action bar — flush to card edges, edge-to-edge cells */}
      <div className="relative z-10 -mx-8 md:-mx-12 mt-8 md:mt-12 border-t border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 grid grid-cols-2 md:rounded-b-2xl md:overflow-hidden">
        <a
          href="/cv.pdf"
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
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] transition-colors duration-200 hover:bg-[#FF6936]/5"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied!" : "Email"}</span>
        </button>
      </div>
    </motion.div>
  );
}
