"use client";

import { useEffect, useState } from "react";

const phrases = [
  "complex products feel simple",
  "prototypes that find friction",
  "design systems that scale",
  "workflows that save hours",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")";

function formatClock(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function BusinessCard() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [clock, setClock] = useState<string | null>(null);

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

  useEffect(() => {
    setClock(formatClock(new Date()));
    const id = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#F0EDE5] dark:bg-[#242626] p-12 md:p-16 flex flex-col"
      style={{ backgroundImage: NOISE_BG }}
    >
      {/* Identity row */}
      <div className="flex items-center gap-3">
        <span className="relative size-10 rounded-full overflow-hidden shrink-0 dark:border-[1.5px] dark:border-[rgba(255,217,152,0.5)] dark:shadow-[0_0_6px_0_rgba(212,149,106,0.15)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-light.png"
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-sans text-base font-medium text-[#1a1a1a] dark:text-[#E8E8E6]">
            Aleksandr Mihhailovski
          </span>
          <span className="font-sans text-sm text-neutral-400">Product Designer</span>
        </div>
      </div>

      <hr className="my-5 border-0 border-t border-neutral-300/30 dark:border-neutral-500/20" />

      {/* Typewriter */}
      <p className="text-2xl md:text-3xl leading-snug">
        <span className="font-serif text-[#1a1a1a] dark:text-[#E8E8E6]">I make </span>
        <span className="font-sans font-normal text-neutral-400 dark:text-neutral-500">
          {text}
        </span>
        <span
          aria-hidden
          className="font-sans font-normal text-terracotta"
          style={{ animation: "blink 1s steps(2, start) infinite" }}
        >
          |
        </span>
      </p>

      {/* Description */}
      <div
        className="mt-6 max-w-2xl font-sans text-base text-neutral-500 dark:text-neutral-400"
        style={{ lineHeight: 1.6 }}
      >
        <p>Product designer with a research background.</p>
        <p>Specializing in B2B SaaS, internal tools, and data-heavy interfaces.</p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 flex items-center justify-between">
        <span className="font-sans text-xs text-neutral-400">Kraków, Poland</span>
        <span className="font-mono text-xs text-neutral-400 tabular-nums">
          {clock ?? "--:--:--"}
        </span>
      </div>
    </div>
  );
}
