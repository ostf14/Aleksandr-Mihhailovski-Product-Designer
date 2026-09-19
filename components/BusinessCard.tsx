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
        {/* Photo back above the name, in a 16:9 frame.

            The source is a 640x640 head-and-shoulders portrait, so 16:9 is a
            crop, not a reframe — the subject fills the square vertically and
            a 9-unit-tall band out of 16 has to lose something. object-position
            spends that loss downwards, on the shoulders and the polo neck,
            and keeps the eyes where a face is read. */}
        <div className="mb-8 w-[140px] md:w-[184px] aspect-video overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-photo.jpg"
            alt="Aleksandr Mihhailovski"
            className="h-full w-full object-cover object-[center_26%]"
          />
        </div>

        {/* 72px / -0.036em at full size, matching the reference's own
            heading. The tracking is written in em, not px, so it holds as the
            clamp scales the type down on narrow screens — -2.6px is only
            right at 72px. */}
        <h2 className="font-sans font-medium text-[clamp(30px,7.2vw,72px)] leading-[1.04] tracking-[-0.036em]">
          <span className="block whitespace-nowrap text-[#171717] dark:text-[#ededed]">
            Hi, I&rsquo;m Alex
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

            No icons anywhere here. A download glyph beside the words
            "Download CV" says nothing the words do not, and the GitHub and
            LinkedIn marks at 18px were unreadable mush — a brand glyph drawn
            in lucide's hairline stroke falls apart at that size. */}
        <div className="mt-9 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              href={links.cv}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </Button>
            <Button
              href={links.github}
              size="lg"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See the code
            </Button>
          </div>

          {/* Own row under the pills. Beside them they read as a third and
              fourth option at the same moment of choosing; underneath they
              read as what they are — what is left once you have passed on
              both buttons. */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={
                copied
                  ? "Email address copied"
                  : `Copy email address ${links.email}`
              }
              className={`group/mail ${TAIL_LINK}`}
            >
              {copied ? "Copied!" : "Copy email"}
              {/* The label says what the press does; the tooltip says which
                  address it will put on the clipboard. */}
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
        </div>
      </motion.div>
    </motion.div>
  );
}
