"use client";

import { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "./Button";
import { links } from "@/lib/site";

// Gentle shrink only. A big scale-down vacated a lot of its (still
// layout-reserved) height as it shrank, leaving a visible gap above the Cases
// block before you scrolled to it. Keeping the shrink subtle means the card
// dissolves roughly in place — the fast opacity fade still reads as "flies
// away" — so the sections below sit right under it.
const SCALE_FACTOR = 0.92;
const SCROLL_RANGE = 200; // pixels of scroll over which the card dissolves

/** Shared look for the two quiet links after the pills. */
const TAIL_LINK =
  "relative font-sans text-sm font-medium text-[#666666] dark:text-[#8f8f8f] transition-colors duration-t2 ease-out-expo hover:text-terracotta";

export function BusinessCard() {
  const [copied, setCopied] = useState(false);

  // Scroll-linked dissolve — scale + opacity ONLY. Both are GPU-composited, so
  // the hero animates entirely on the compositor with no per-frame layout work
  // (an earlier marginBottom "pull-up" forced a full-page reflow every scroll
  // frame and dropped frames). The card just shrinks and fades as it scrolls
  // away; the sections below follow at natural scroll speed.
  const { scrollY } = useScroll();
  const SPRING = { stiffness: 1000, damping: 100, mass: 0.2 } as const;

  // Scale rides the content column, not the band. A full-bleed surface that
  // shrinks pulls its own edges in from the viewport and the page colour
  // shows up either side — the one thing a bleed is there to prevent.
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

  return (
    <motion.div
      data-hero-card="true"
      style={{ opacity, willChange: "opacity" }}
      className="hero-band relative w-full px-6 pt-[104px] pb-14 sm:px-8 md:pt-[136px] md:pb-20"
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
          willChange: "transform",
        }}
        className="mx-auto flex w-full max-w-[1080px] flex-col items-center text-center"
      >
        {/* Photo — a plain square above the name, the way a profile picture
            sits above a handle. No ring and no glow: both were doing the work
            of separating a round chip from the text beside it, and centred
            above the heading there is nothing to separate it from. */}
        <div className="size-20 md:size-[88px] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-photo.jpg"
            alt="Aleksandr Mihhailovski"
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="mt-7 font-sans font-medium text-[clamp(26px,7.5vw,40px)] md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
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

        {/* Actions.
            Two pills, and both earn the weight: almost everyone who opens this
            link arrives from a conversation that is already running — an
            application, a forwarded link, a Telegram thread — so "contact me"
            solves a problem they do not have. What they do instead is take the
            CV away to forward it, and check whether "engineer" is load-bearing.
            Mail and LinkedIn stay reachable as the quiet tail; the footer
            carries all four in full on every page.

            No icons anywhere in this row. A download glyph beside the words
            "Download CV" says nothing the words do not, and the GitHub and
            LinkedIn marks at 18px were unreadable mush — a brand glyph drawn
            in lucide's hairline stroke falls apart at that size. */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
          <Button href={links.cv} target="_blank" rel="noopener noreferrer">
            Download CV
          </Button>
          <Button
            href={links.github}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            See the code
          </Button>

          <span
            aria-hidden
            className="mx-2 hidden h-5 w-px bg-[#ebebeb] dark:bg-[#292929] sm:block"
          />

          <button
            type="button"
            onClick={copyEmail}
            aria-label={
              copied ? "Email address copied" : `Copy email address ${links.email}`
            }
            className={`group/mail ${TAIL_LINK}`}
          >
            {copied ? "Copied!" : "Email"}
            {/* Borrowed from the reference's secondary button: the tooltip says
                what pressing gets you, so the label can stay one word. */}
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
            className={TAIL_LINK}
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
