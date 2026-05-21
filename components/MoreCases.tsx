"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

type Case = {
  id: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  image?: string;
};

const cases: Case[] = [
  {
    id: "push",
    tag: "Seamm",
    title: "Push Notifications",
    description: "How to kill the send button nobody wanted to press",
    href: "/case/push-notifications",
    image: "https://framerusercontent.com/images/SFAsDo6PF9csTgqHwlukYwNxpSQ.png",
  },
  {
    id: "stories",
    tag: "Seamm",
    title: "Stories Editor",
    description: "How I eliminated a 2-day content publishing bottleneck",
    href: "/case/stories-editor",
    image: "https://framerusercontent.com/images/WqXrVnU46HVuCSUfhEXwfBQyw.png",
  },
  {
    id: "chtenye",
    tag: "Chtenye",
    title: "Educational Platform Redesign",
    description: "Users couldn’t explain what a single menu item meant",
    href: "/case/chtenye",
    image: "https://framerusercontent.com/images/aMajMUWlnqMZzKjWE2RnsGDhKo.jpg",
  },
  {
    id: "msg",
    tag: "Freelance",
    title: "My Sleeping Gypsy",
    description: "How to sell heritage craftsmanship without looking like fast fashion",
    href: "/case/my-sleeping-gypsy",
    image: "/cases/msg/cover.png",
  },
];

type Phase = "idle" | "flying" | "snapping";

const FRONT = { y: 12, scale: 1, opacity: 1, zIndex: 10 };
const BACK = { y: -16, scale: 0.95, opacity: 0.65, zIndex: 5 };
const FLY_OUT = { y: 300, scale: 1, opacity: 0, zIndex: 10 };
const RISING = { y: 12, scale: 1, opacity: 1, zIndex: 5 };

const cardClass =
  "group absolute inset-x-0 bottom-0 h-[348px] md:h-[248px] origin-bottom rounded-t-2xl bg-white dark:bg-cream-warm border-x border-t border-stone-200/60 shadow-[0_-2px_24px_rgba(16,24,40,0.07)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-5 block";

function CardContent({ c }: { c: Case }) {
  return (
    <>
      <ArrowUpRight
        size={32}
        strokeWidth={1.5}
        className="absolute top-5 right-5 text-stone-400 transition-colors group-hover:text-terracotta z-10"
        aria-hidden
      />
      <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-5 h-full">
        {/* Text — visible first on mobile (top), right on desktop */}
        <div className="md:flex-1 md:min-w-0 flex flex-col pr-10 md:pr-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400">
            {c.tag}
          </div>
          <h3 className="mt-2 font-serif font-normal text-[22px] leading-tight tracking-tight">
            {c.title}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.5] text-stone-500 line-clamp-2">
            {c.description}
          </p>
        </div>

        {/* Image — full-bleed bottom on mobile, fixed 38% on desktop */}
        <div className="flex-1 min-h-0 -mx-5 -mb-5 md:m-0 md:basis-[38%] md:shrink-0 md:flex-none md:h-full rounded-none md:rounded-xl overflow-hidden bg-cream-warm dark:bg-cream-deep">
          {c.image && (
            <img
              src={c.image}
              alt=""
              aria-hidden
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>
      </div>
    </>
  );
}

export function MoreCases({ currentId }: { currentId?: string } = {}) {
  const list = useMemo(
    () => (currentId ? cases.filter((c) => c.id !== currentId) : cases),
    [currentId],
  );

  const [order, setOrder] = useState<number[]>(list.map((_, i) => i));
  const [phase, setPhase] = useState<Phase>("idle");

  const shuffle = () => {
    if (phase !== "idle" || list.length < 2) return;
    setPhase("flying");
    window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setPhase("snapping");
      requestAnimationFrame(() => setPhase("idle"));
    }, 400);
  };

  if (list.length === 0) return null;

  return (
    <section className="px-6 md:px-10 pb-32">
      <div className="max-w-prose mx-auto">
        <h2 className="font-serif font-normal text-h2 tracking-tight mb-5">
          More case studies
        </h2>

        <div className="relative h-[368px] md:h-[268px] overflow-hidden">
          {list.length === 1 ? (
            <a
              href={list[0].href}
              className={`${cardClass} translate-y-3 hover:-translate-y-1 transition-transform duration-200 ease-out`}
            >
              <CardContent c={list[0]} />
            </a>
          ) : (
            list.map((c, i) => {
              const position = order.indexOf(i);
              const isFront = position === 0;
              const isBack = position === order.length - 1;

              let target = isFront ? FRONT : BACK;
              let transition: { duration: number; ease?: number[] | string } = {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              };

              if (phase === "flying") {
                if (isFront) {
                  target = FLY_OUT;
                  transition = { duration: 0.4, ease: [0.4, 0, 1, 1] };
                } else if (isBack) {
                  target = RISING;
                  transition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
                }
              } else if (phase === "snapping" && isBack) {
                target = BACK;
                transition = { duration: 0 };
              }

              const hoverable = isFront && phase === "idle";
              return (
                <motion.a
                  key={c.id}
                  href={c.href}
                  className={`${cardClass} ${hoverable ? "" : "pointer-events-none"}`}
                  animate={target}
                  transition={transition}
                  whileHover={hoverable ? { y: 4 } : undefined}
                >
                  <CardContent c={c} />
                </motion.a>
              );
            })
          )}
        </div>

        {list.length > 1 && (
          <div className="border-t border-stone-200/60 mt-6 pt-6 flex justify-center">
            <button
              type="button"
              onClick={shuffle}
              disabled={phase !== "idle"}
              aria-label="Show next case"
              className="group flex flex-col items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown
                size={32}
                strokeWidth={1.75}
                className="text-stone-400 transition-all duration-200 group-hover:text-terracotta group-hover:scale-110"
                aria-hidden
              />
              <span className="text-[13px] text-stone-500 group-hover:text-terracotta transition-colors">
                next case
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
