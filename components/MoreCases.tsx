"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Case = {
  id: string;
  tag: string;
  title: string;
  description: string;
  href: string;
};

const cases: Case[] = [
  {
    id: "stories",
    tag: "Seamm",
    title: "Stories Editor",
    description: "How I eliminated a 2-day content bottleneck",
    href: "#",
  },
  {
    id: "push",
    tag: "Seamm",
    title: "Push Notifications",
    description: "Designing for confidence, not speed",
    href: "/",
  },
];

export function MoreCases() {
  const [order, setOrder] = useState<number[]>(cases.map((_, i) => i));

  const shuffle = () => setOrder((prev) => [...prev.slice(1), prev[0]]);

  return (
    <section className="px-6 md:px-10 pb-24">
      <div className="max-w-prose mx-auto">
        <h2 className="font-serif font-normal text-[40px] leading-tight tracking-tight mb-6">
          More case studies
        </h2>

        {/* Card stack */}
        <div className="relative h-[300px] overflow-hidden">
          {cases.map((c, i) => {
            const position = order.indexOf(i);
            const isFront = position === 0;
            return (
              <motion.div
                key={c.id}
                className="absolute inset-x-0 bottom-0 h-[248px] origin-bottom rounded-t-2xl bg-cream/80 backdrop-blur-md border-x border-t border-stone-200/60 shadow-[0_-2px_24px_rgba(16,24,40,0.07)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-5"
                animate={{
                  y: isFront ? 12 : -16,
                  scale: isFront ? 1 : 0.95,
                  opacity: isFront ? 1 : 0.65,
                  zIndex: isFront ? 10 : 5,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex flex-row gap-5 h-full">
                  {/* Image placeholder — desktop only */}
                  <div className="hidden md:block shrink-0 basis-[38%] bg-cream-warm dark:bg-cream-deep rounded-xl h-full" />

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col h-full">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400">
                      {c.tag}
                    </div>
                    <h3 className="mt-2 font-serif font-normal text-[22px] leading-tight tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-stone-500 line-clamp-2">
                      {c.description}
                    </p>
                    {isFront && (
                      <div className="mt-auto pt-4">
                        <a
                          href={c.href}
                          className="inline-flex items-center gap-1 bg-charcoal text-cream rounded-full px-4 h-9 text-sm hover:opacity-75 transition-opacity"
                        >
                          Read case study ›
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Shuffle */}
        <div className="border-t border-stone-200/60 mt-6 pt-6 flex justify-center">
          <button
            type="button"
            onClick={shuffle}
            className="bg-charcoal text-cream rounded-lg px-4 h-9 text-sm hover:opacity-75 transition-opacity"
          >
            Shuffle
          </button>
        </div>
      </div>
    </section>
  );
}
