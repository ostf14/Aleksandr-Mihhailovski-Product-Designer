"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Download } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-2xl bg-[#F0EDE5] dark:bg-[#242626] px-12 pt-12 md:px-16 md:pt-16">
      {/* Dot pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none text-[#1a1a1a] dark:text-[#E8E8E6] opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative md:flex md:items-start md:gap-8">
        {/* Photo — fixed 180px circle */}
        <div
          aria-hidden
          className="hidden md:flex w-[180px] h-[180px] rounded-full shrink-0 overflow-hidden border-2 border-neutral-200/20 bg-neutral-300 dark:bg-neutral-600 items-center justify-center"
        >
          <span className="text-xs text-neutral-400">Photo</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Heading */}
          <h2 className="font-serif font-normal text-[28px] md:text-4xl lg:text-6xl leading-[1.05] tracking-tight">
            <span className="block whitespace-nowrap text-[#1a1a1a] dark:text-[#E8E8E6]">
              Hi, I&rsquo;m Alex.{" "}
              <span
                role="img"
                aria-label="waving hand"
                className="inline-block"
                style={{
                  transformOrigin: "70% 70%",
                  animation: "wave 2.5s ease-in-out infinite",
                }}
              >
                👋🏻
              </span>
            </span>
            <span className="block text-[#1a1a1a]/40 dark:text-[#E8E8E6]/40">
              Product Designer &amp; Builder.
            </span>
          </h2>

          {/* Typewriter — fixed min-height to prevent card resize between phrases */}
          <p className="mt-6 font-sans text-xl md:text-[28px] leading-snug min-h-[72px] md:min-h-[80px]">
            <span className="font-medium text-[#1a1a1a] dark:text-[#E8E8E6]">
              I make{" "}
            </span>
            <span className="font-normal text-neutral-400 dark:text-neutral-500">
              {text}
            </span>
            <span
              aria-hidden
              className="font-normal text-terracotta"
              style={{ animation: "blink 1s steps(2, start) infinite" }}
            >
              |
            </span>
          </p>
        </div>
      </div>

      {/* Bottom action bar — flush to card edges, edge-to-edge cells */}
      <div className="relative -mx-12 md:-mx-16 mt-12 md:mt-16 border-t border-neutral-300/20 dark:border-neutral-500/20 grid grid-cols-2 md:rounded-b-2xl md:overflow-hidden">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#1a1a1a] dark:text-[#E8E8E6] border-r border-neutral-300/20 dark:border-neutral-500/20 transition-colors duration-200 hover:bg-neutral-500/5"
        >
          <Download className="w-4 h-4" />
          <span>My CV</span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email copied" : `Copy email ${EMAIL}`}
          className="font-sans flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#1a1a1a] dark:text-[#E8E8E6] transition-colors duration-200 hover:bg-neutral-500/5"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied!" : "Email"}</span>
        </button>
      </div>
    </div>
  );
}
