"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, Download, Mail } from "lucide-react";
import { Button } from "./Button";
import { GithubIcon } from "./GithubIcon";
import { LinkedInIcon } from "./LinkedInIcon";
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
      className="group relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-2xl border border-[#ebebeb] dark:border-[#292929] bg-[#ffffff] dark:bg-[#111111] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-20"
    >
      {/* Hover-reveal terracotta dot pattern (full card, no per-frame mask) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 ease-out z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #767676 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Photo — a small square above the name, the way a profile picture
            sits above a handle. Round read as an avatar chip beside the text;
            centred, square and quiet it reads as "this is who is talking". */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-[-10px] rounded-3xl bg-terracotta/20 dark:bg-terracotta/15 blur-xl"
          />
          <div className="relative z-10 size-20 md:size-[88px] overflow-hidden rounded-2xl border-[3px] border-white shadow-lg dark:border-2 dark:border-neutral-200/20 dark:bg-neutral-600 dark:shadow-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-photo.jpg"
              alt="Aleksandr Mihhailovski"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <h2 className="mt-7 font-sans font-semibold text-[clamp(26px,7.5vw,40px)] md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
          <span className="block whitespace-nowrap text-[#171717] dark:text-[#ededed]">
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
          <span className="block text-[#666666] dark:text-[#ededed]/40">
            Product Design Engineer
          </span>
        </h2>

        {/* Typewriter */}
        <p className="mt-5 font-sans text-lg md:text-2xl leading-snug min-h-[56px] md:min-h-0">
          <span className="font-medium text-[#171717] dark:text-[#ededed]">
            I make{" "}
          </span>
          <span className="font-normal text-[#666666] dark:text-neutral-500">
            {text}
          </span>
          <span aria-hidden className="font-normal text-terracotta cursor-blink">
            |
          </span>
        </p>

        {/* Actions.
            Two pills, and both earn the weight: almost everyone who opens this
            link arrives from a conversation that is already running — an
            application, a forwarded link, a Telegram thread — so "contact me"
            solves a problem they do not have. What they do instead is take the
            CV away to forward it, and check whether "engineer" is load-bearing.
            Mail and LinkedIn stay reachable as the quiet tail; the footer
            carries all four in full on every page. */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={links.cv} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" aria-hidden />
            Download CV
          </Button>
          <Button
            href={links.github}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-4 w-4" />
            See the code
          </Button>

          <span
            aria-hidden
            className="mx-1 hidden h-5 w-px bg-[#ebebeb] dark:bg-[#292929] sm:block"
          />

          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email address copied" : `Copy email address ${links.email}`}
            className="group/mail relative grid size-[42px] place-items-center rounded-full border border-[#ebebeb] dark:border-[#292929] text-[#666666] dark:text-[#8f8f8f] transition-colors duration-t2 ease-out-expo hover:border-terracotta/40 hover:text-terracotta"
          >
            {copied ? (
              <Check className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Mail className="h-[18px] w-[18px]" aria-hidden />
            )}
            {/* Borrowed from the reference's secondary button: the tooltip says
                what pressing gets you, so the icon does not have to. */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#171717] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-t2 ease-out-expo group-hover/mail:opacity-100 group-focus-visible/mail:opacity-100 dark:bg-[#ededed] dark:text-[#171717]"
            >
              {copied ? "Copied!" : links.email}
            </span>
          </button>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid size-[42px] place-items-center rounded-full border border-[#ebebeb] dark:border-[#292929] text-[#666666] dark:text-[#8f8f8f] transition-colors duration-t2 ease-out-expo hover:border-terracotta/40 hover:text-terracotta"
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
