"use client";

import { useEffect, useState } from "react";

const phrases = [
  "complex products feel simple",
  "prototypes that find friction",
  "design systems that scale",
  "workflows that save hours",
  "user tests that reveal truth",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;

export function BusinessCard() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

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
    <div className="relative overflow-hidden rounded-2xl bg-[#F0EDE5] dark:bg-[#242626] p-12 md:p-16">
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

      <div className="relative">
        {/* Heading */}
        <h2 className="font-serif font-normal text-4xl md:text-6xl leading-[1.05] tracking-tight">
          <span className="block text-[#1a1a1a] dark:text-[#E8E8E6]">
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

        {/* Typewriter */}
        <p className="mt-6 font-sans text-2xl md:text-[28px] leading-snug">
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
  );
}
