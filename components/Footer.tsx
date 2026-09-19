"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { ProgressiveBlur } from "./ProgressiveBlur";
import { SpriteAnimation } from "./SpriteAnimation";
import { links } from "@/lib/site";

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

  const cell =
    "font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#4d4d4d] dark:text-[#ededed] transition-colors duration-200 hover:bg-[#FF6936]/5";
  const dividerClass =
    "border-[#ebebeb] dark:border-[#292929]";

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

      {/* Cat — sits just above the card's top edge */}
      <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none z-10">
        <SpriteAnimation />
      </div>

      <div className="group relative overflow-hidden rounded-t-2xl border border-[#ebebeb] dark:border-[#292929] bg-[#ffffff] dark:bg-[#111111] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.06)] dark:shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.4)]">
        {/* Hover-reveal terracotta dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 ease-out z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #767676 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Action bar — top edge of the footer, full viewport width */}
        <div
          className={`relative z-10 grid grid-cols-4 border-b ${dividerClass}`}
        >
          <a
            href={links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cell} border-r ${dividerClass}`}
          >
            <Download className="w-4 h-4" />
            <span>My CV</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : `Copy email ${links.email}`}
            className={`${cell} border-r ${dividerClass}`}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? "Copied!" : "Email"}</span>
          </button>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cell} border-r ${dividerClass}`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cell}
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Centered content column below the action bar */}
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 md:px-10 pt-12 md:pt-16 pb-24 md:pb-12">
          <h2 className="font-sans font-semibold text-3xl md:text-5xl leading-[1.05] tracking-tight text-[#171717] dark:text-[#ededed]">
            Let&rsquo;s work together
          </h2>
          <p className="mt-3 font-sans text-base text-[#666666] dark:text-neutral-400">
            I&rsquo;m open to new opportunities.
          </p>
        </div>
      </div>
    </footer>
  );
}
