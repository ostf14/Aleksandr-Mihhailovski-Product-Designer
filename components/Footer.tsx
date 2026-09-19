"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Download } from "lucide-react";
import { Button } from "./Button";
import { GithubMark } from "./GithubMark";
import { ProgressiveBlur } from "./ProgressiveBlur";
import { SpriteAnimation } from "./SpriteAnimation";
import { links } from "@/lib/site";

const TAIL_LINK =
  "relative inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#666666] dark:text-[#8f8f8f] transition-colors duration-t2 ease-out-expo hover:text-terracotta";
const TAIL_ICON = "h-[15px] w-[15px] shrink-0";

/**
 * The closing band, built as the hero's echo.
 *
 * It used to be a rounded card holding a four-cell bar of equal-weight links —
 * the same four buttons, and the same missing hierarchy, that the hero was
 * rebuilt to get away from. Now the page opens and closes on the same pair:
 * Download CV and GitHub as pills, mail and LinkedIn as the quiet tail. Same
 * grid as Cases and Other above, so the heading sits in the same column their
 * headings do, and the same radial lift as the hero band.
 *
 * The cat and the progressive blur above the edge are unchanged.
 */
export function Footer() {
  const [copied, setCopied] = useState(false);

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
    <footer className="relative mt-32 w-full">
      {/* Softens the page as it runs into the footer's top edge. Sits below the
          cat (z-0 against its z-10) so the sprite stays crisp: backdrop-filter
          only blurs what is painted behind it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none z-0"
        style={{ height: 72 }}
      >
        <ProgressiveBlur edge="bottom" height={72} />
      </div>

      {/* Cat — sits just above the band's top edge */}
      <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none z-10">
        <SpriteAnimation />
      </div>

      {/* --top puts the band's hairline on its leading edge. See globals.css:
          a Tailwind border-t here left the colour at the framework default and
          drew a bright line across the dark footer. */}
      <div className="hero-band hero-band--top px-6 py-20 sm:px-8 md:py-28">
        {/* Centred until the grid splits in two. On one column the heading, the
            line and both rows of actions read as a stack, and a stack that is
            left-aligned against nothing looks like it lost its second column. */}
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-10 text-center md:grid-cols-[1fr_3fr] md:gap-14 md:text-left lg:gap-20">
          <div className="self-start">
            <h2 className="font-sans font-medium text-[clamp(30px,5vw,52px)] leading-[1.04] tracking-[-0.036em] text-[#171717] dark:text-[#ededed]">
              Let&rsquo;s work
              <br className="hidden md:inline" /> together
            </h2>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-start">
            <p className="max-w-[46ch] font-sans text-[17px] leading-[1.55] text-[#666666] dark:text-[#8f8f8f]">
              I&rsquo;m open to new opportunities.
            </p>

            <div className="flex w-full max-w-[320px] flex-col items-stretch gap-3 min-[480px]:w-auto min-[480px]:max-w-none min-[480px]:flex-row min-[480px]:items-center">
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

            <div className="flex items-center justify-center gap-6">
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
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#171717] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-t2 ease-out-expo group-hover/mail:opacity-100 group-focus-visible/mail:opacity-100 dark:bg-[#ededed] dark:text-[#171717]"
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
        </div>
      </div>
    </footer>
  );
}
