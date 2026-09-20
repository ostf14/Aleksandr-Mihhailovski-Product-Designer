"use client";

import { useLayoutEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { Button } from "./Button";
import { GithubMark } from "./GithubMark";
import { links } from "@/lib/site";

// Gentle shrink only. A big scale-down vacated a lot of its (still
// layout-reserved) height as it shrank, leaving a visible gap above the Cases
// block before you scrolled to it. Keeping the shrink subtle means the card
// dissolves roughly in place — the fast opacity fade still reads as "flies
// away" — so the sections below sit right under it.
const SCALE_FACTOR = 0.92;
const SCROLL_RANGE = 200; // pixels of scroll over which the card dissolves

/** Shared look for the two quiet links under the pills. */
const TAIL_LINK =
  "relative inline-flex items-center gap-1.5 font-sans text-sm font-medium text-muted transition-colors duration-t2 ease-out-expo hover:text-accent";

/** Icons here are lucide primitives at text size, not brand marks: a copy
 *  sheet and an out-of-page arrow read at 15px where a GitHub or LinkedIn
 *  glyph in the same hairline stroke turns to mush. */
const TAIL_ICON = "h-[15px] w-[15px] shrink-0";

/**
 * Noise dithering, done as an actual filter chain rather than a texture laid
 * on top: flatten to grey, set the contrast, add a field of noise, then
 * quantise. Adding noise before quantising is what dithering *is* — it trades
 * a hard posterisation edge for stippling, so tone survives being reduced to
 * a handful of levels.
 *
 * Six levels, not two. One bit reduced the face to a stencil with nothing
 * between the lit and unlit side of it; six leaves the modelling in, and the
 * grain carries the steps between them. The noise amplitude is matched to one
 * quantisation step — wider and it is just noise, narrower and the steps show
 * as bands.
 *
 * feTurbulence has a bad history in this file's neighbourhood: a full-viewport
 * one in globals.css used to re-rasterise on every theme toggle and stalled
 * the page. This one covers a 208x117 box and never animates, so it rasterises
 * once and is cached from then on.
 *
 * color-interpolation-filters="sRGB" is not optional — the default is
 * linearRGB, and the threshold then lands somewhere other than mid-grey.
 */
function DitherFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      className="absolute h-0 w-0 overflow-hidden"
    >
      <filter id="hero-dither" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" result="grey" />
        {/* Fitted to this photograph rather than guessed. Its tonal range is
            narrow — background around 0.68, face around 0.53, hair and the
            polo neck down at 0.11 — so this line opens it out across the full
            0–1 the quantiser expects: the dark end lands on 0, the background
            near the top, and the face in the middle where there are levels to
            spend on it. Measure again if the picture is ever replaced; a
            curve fitted to one photograph does not transfer to the next. */}
        <feComponentTransfer in="grey" result="crushed">
          <feFuncR type="linear" slope="1.49" intercept="-0.164" />
          <feFuncG type="linear" slope="1.49" intercept="-0.164" />
          <feFuncB type="linear" slope="1.49" intercept="-0.164" />
        </feComponentTransfer>

        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="1"
          seed="7"
          result="noise"
        />
        {/* saturate="0" is not enough here: feTurbulence writes noise into
            ALPHA as well, and compositing is premultiplied, so a noisy alpha
            eats the very variation this step exists to add — which is why the
            first two attempts came out as a flat stencil. This matrix copies
            the red channel into RGB and pins alpha to 1. */}
        <feColorMatrix
          in="noise"
          type="matrix"
          values="1 0 0 0 0
                  1 0 0 0 0
                  1 0 0 0 0
                  0 0 0 0 1"
          result="greynoise"
        />
        {/* And stretch it. One octave of fractalNoise clusters tightly around
            0.5 — a spread of maybe ±0.15 — which after scaling is far too
            small to carry a pixel across a quantisation step. This expands
            that cluster to very nearly the full 0–1 range, which is what
            finally puts grain in the mid-tones. */}
        <feComponentTransfer in="greynoise" result="noiseAmp">
          <feFuncR type="linear" slope="4" intercept="-1.5" />
          <feFuncG type="linear" slope="4" intercept="-1.5" />
          <feFuncB type="linear" slope="4" intercept="-1.5" />
        </feComponentTransfer>

        {/* result = image + (noise - 0.5) * 0.18, one quantisation step */}
        <feComposite
          in="crushed"
          in2="noiseAmp"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.18"
          k4="-0.09"
          result="mixed"
        />

        <feComponentTransfer in="mixed">
          <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
          <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
          <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

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

  // Once it has dissolved it must stop being a target. Opacity 0 still hit-tests
  // and still takes focus, so after ~250px of scroll there was an invisible
  // Download CV sitting over blank page: the cursor turned into a pointer over
  // nothing, a click opened the CV, and tabbing out of the nav landed on
  // controls no one could see. `visibility` is what removes an element from
  // both hit-testing and the tab order; pointer-events alone would leave the
  // keyboard path open. The threshold is low enough that it only ever flips
  // once the band is already invisible.
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? "hidden" : "visible"));

  // The springs start at 1 regardless of where the page actually is, so a
  // reload or a Back into a scrolled /work painted a fully opaque hero and then
  // dissolved it — a flash of something that should not have been there. Seed
  // both from the real scroll position before the browser paints.
  useLayoutEffect(() => {
    const y = window.scrollY;
    if (y <= 0) return;
    const t = Math.min(y / SCROLL_RANGE, 1);
    opacity.jump(1 - t);
    scale.jump(1 - (1 - SCALE_FACTOR) * t);
  }, [opacity, scale]);

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
      style={{ opacity, visibility, willChange: "opacity" }}
      className="hero-band relative w-full pt-[104px] pb-14 md:pt-[136px] md:pb-20"
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
          willChange: "transform",
        }}
        className="shell flex flex-col items-center text-center"
      >
        {/* Photo above the name, in a 16:9 frame. The source is 1144x644 —
            1.776 against 16:9's 1.778 — so this is the picture's own shape
            rather than a crop of a square, and it needs no object-position
            correction the way the previous one did.

            /hero-photo.jpg, the square head-and-shoulders shot, is still what
            the homepage avatar and the OG card use: both are circular, and a
            circle cut out of a wide frame is a different decision. */}
        <div className="hero-portrait mb-8 w-[160px] md:w-[208px] aspect-video overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/portrait-wide.jpg" alt="Aleksandr Mihhailovski" />
          {/* The same frame again, dithered, stacked on top. Two copies
              because CSS cannot interpolate a url() filter to none — fading
              the treated layer's opacity is both the simplest way to get
              there and the only one that stays on the compositor. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait-wide.jpg"
            alt=""
            aria-hidden
            className="hero-portrait-dither"
          />
        </div>

        <DitherFilter />

        {/* 72px / -0.036em at full size, matching the reference's own heading.
            The tracking is in em, not the -2.6px it corresponds to, so it
            holds as the clamp scales the type down.

            The name now runs on the ramp the role used to have, and the role
            sits exactly 1.6x below it: 12.8vw against 8vw, 72px against 45px.
            Being the same ratio at both ends, the pair holds its proportion at
            every width instead of collapsing to one size on wide screens the
            way the previous pair did. */}
        <h2 className="font-sans font-medium text-[clamp(30px,12.8vw,72px)] leading-[1.04] tracking-[-0.036em]">
          <span className="block whitespace-nowrap text-fg">
            Hi, I&rsquo;m Alex
          </span>
          {/* Exactly 1.6x under the name — see the ramp on the h2. */}
          <span className="block text-[clamp(19px,8vw,45px)] text-muted dark:text-fg/40">
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

            Icons sit on the side the eye needs them: the download glyph leads
            "Download CV", the GitHub mark follows the word it belongs to.
            That mark is the filled one GitHub itself draws, not the stroke
            redraw in GithubIcon.tsx — at 17px the hairline version's
            tentacles and face collapse into a squiggle. The footer keeps the
            stroke version, where it sits among other lucide icons. */}
        <div className="mt-9 flex w-full flex-col items-center gap-5">
          {/* Below 480 the two pills stack and stretch to one width. Left to
              wrap on their own they came out one under another anyway but at
              two different widths, set by their labels — which is what a
              narrow phone like a folded Fold shows. The column is capped at
              320 so the pair matches the brand pill above it rather than
              running edge to edge. */}
          <div className="flex w-full max-w-[320px] flex-col items-stretch gap-3 min-[480px]:w-auto min-[480px]:max-w-none min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-center">
            <Button
              href={links.cv}
              size="lg"
              className="w-full min-[480px]:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-[17px] w-[17px] shrink-0" aria-hidden />
              Download CV
            </Button>
            <Button
              href={links.github}
              size="lg"
              variant="secondary"
              className="w-full min-[480px]:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <GithubMark className="h-[17px] w-[17px] shrink-0" />
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
              {copied ? (
                <Check className={TAIL_ICON} aria-hidden />
              ) : (
                <Copy className={TAIL_ICON} aria-hidden />
              )}
              {copied ? "Copied!" : "Copy email"}
              {/* The label says what the press does; the tooltip says which
                  address. It keeps saying it after the copy rather than
                  echoing "Copied!" a second time — the useful thing to show
                  someone who has just copied is what they now have. */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-fg px-2.5 py-1.5 text-xs font-medium text-bg opacity-0 transition-opacity duration-t2 ease-out-expo group-hover/mail:opacity-100 group-focus-visible/mail:opacity-100"
              >
                {links.email}
              </span>
            </button>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={TAIL_LINK}
            >
              LinkedIn
              <ArrowUpRight className={TAIL_ICON} aria-hidden />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
