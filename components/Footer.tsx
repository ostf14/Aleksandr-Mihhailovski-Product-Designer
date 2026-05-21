"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SpriteAnimation } from "./SpriteAnimation";

const EMAIL = "ostf14@gmail.com";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <footer className="px-6 md:px-10 mt-32 mb-12 md:mb-16">
      <div className="relative mx-auto w-full max-w-[1080px]">
        {/* Cat walks along the top edge of the card */}
        <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none z-10">
          <SpriteAnimation />
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-[#FF6936]/40 dark:border-[#FF6936]/30 bg-[#FCFCFB]/90 dark:bg-[#242626] backdrop-blur-sm shadow-[0_20px_60px_-20px_rgba(255,105,54,0.14)] dark:shadow-[0_20px_60px_-20px_rgba(255,105,54,0.1)] px-8 pt-8 md:px-12 md:pt-12">
          {/* Hover-reveal terracotta dot pattern */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 ease-out z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FF6936 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            <h2 className="font-serif font-normal italic text-3xl md:text-5xl leading-[1.05] tracking-tight text-[#1F1F1E] dark:text-[#E8E8E6]">
              Let&rsquo;s work together
            </h2>
            <p className="mt-3 font-sans text-base text-[#7B7974] dark:text-neutral-400">
              I&rsquo;m open to new opportunities.
            </p>
          </div>

          {/* Action bar — flush to card edges */}
          <div className="relative z-10 -mx-8 md:-mx-12 mt-8 md:mt-12 border-t border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 grid grid-cols-2 md:rounded-b-2xl md:overflow-hidden">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : `Copy email ${EMAIL}`}
              className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] border-r border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 transition-colors duration-200 hover:bg-[#FF6936]/5"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? "Copied!" : "Email"}</span>
            </button>
            <a
              href="https://www.linkedin.com/in/alexmess/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#373734] dark:text-[#E8E8E6] transition-colors duration-200 hover:bg-[#FF6936]/5"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
