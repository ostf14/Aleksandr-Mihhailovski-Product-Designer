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
    <div className="relative overflow-hidden rounded-2xl border border-[rgba(31,31,30,0.1)] dark:border-neutral-500/10 bg-[#FCFCFB]/90 dark:bg-[#242626] backdrop-blur-sm px-8 pt-8 md:px-12 md:pt-12">

      <div className="relative md:flex md:items-start md:gap-8">
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
            <span className="block text-[#1F1F1E]/30 dark:text-[#E8E8E6]/40">
              Product Designer &amp; Builder.
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
      <div className="relative -mx-8 md:-mx-12 mt-8 md:mt-12 border-t border-[rgba(31,31,30,0.1)] dark:border-neutral-500/20 grid grid-cols-2 md:rounded-b-2xl md:overflow-hidden">
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
    </div>
  );
}
