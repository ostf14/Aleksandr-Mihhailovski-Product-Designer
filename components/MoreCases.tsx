"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cases, workHref, type Work } from "@/lib/works";
import { CaseCardMedia } from "./CaseCardMedia";

type Phase = "idle" | "flying" | "snapping";

const FRONT = { y: 12, scale: 1, opacity: 1, zIndex: 10 };
const BACK = { y: -16, scale: 0.95, opacity: 0.65, zIndex: 5 };
const FLY_OUT = { y: 300, scale: 1, opacity: 0, zIndex: 10 };
// RISING lifts above other BACK cards (z:5) while still staying below the
// flying-out FRONT card (z:10). With equal z-index, DOM-later siblings would
// otherwise paint on top of the riser and ghost in front of it.
const RISING = { y: 12, scale: 1, opacity: 1, zIndex: 7 };

const cardClass =
  "group absolute inset-x-0 bottom-0 h-[348px] md:h-[248px] origin-bottom rounded-t-2xl bg-white dark:bg-surface border-x border-t border-line/60 shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-5 block";

function CardContent({ c }: { c: Work }) {
  return (
    <>
      <ArrowUpRight
        size={32}
        strokeWidth={1.5}
        className="absolute right-5 top-5 z-10 text-faint transition-colors group-hover:text-accent"
        aria-hidden
      />
      <div className="flex h-full flex-col gap-3 md:flex-row-reverse md:gap-5">
        <div className="flex flex-col pr-10 md:min-w-0 md:flex-1 md:pr-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {c.org}
          </div>
          <h3 className="mt-2 font-sans text-[22px] font-semibold leading-tight tracking-tight">
            {c.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-muted">
            {c.blurb}
          </p>
        </div>
        <div className="-mx-5 -mb-5 min-h-0 flex-1 overflow-hidden rounded-none bg-surface dark:bg-surface-deep md:m-0 md:h-full md:flex-none md:shrink-0 md:basis-[38%] md:rounded-xl">
          <CaseCardMedia src={c.cover.src} />
        </div>
      </div>
    </>
  );
}

export function MoreCases({ currentId }: { currentId?: string } = {}) {
  const list = useMemo(
    () => (currentId ? cases.filter((c) => c.slug !== currentId) : cases),
    [currentId],
  );

  const [order, setOrder] = useState<number[]>(list.map((_, i) => i));
  const [phase, setPhase] = useState<Phase>("idle");

  // Honest forward cycle: front -> back, everyone else shifts up by one.
  // For [A,B,C] this gives A->B->C->A across consecutive clicks instead of
  // ping-ponging only between front and back.
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
    <section className="pb-32">
      <div className="shell-prose">
        <h2 className="mb-5 font-sans text-h2 font-semibold tracking-tight">
          More case studies
        </h2>

        <div className="relative h-[368px] overflow-hidden md:h-[268px]">
          {list.length === 1 ? (
            <a
              href={workHref(list[0])}
              className={`${cardClass} translate-y-3 transition-transform duration-200 ease-out hover:-translate-y-1`}
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

              // The card at position 1 is the NEXT one in the cycle — it
              // rises to take the front slot. (Was originally the back card,
              // which caused a visual/data desync once the shuffle ran.)
              const isNext = position === 1;

              if (phase === "flying") {
                if (isFront) {
                  target = FLY_OUT;
                  transition = { duration: 0.4, ease: [0.4, 0, 1, 1] };
                } else if (isNext) {
                  target = RISING;
                  transition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
                }
              } else if (phase === "snapping" && isBack) {
                // After the shuffle the card that just flew is at the back —
                // teleport it straight to BACK so it doesn't animate back up
                // from FLY_OUT.
                target = BACK;
                transition = { duration: 0 };
              }

              const hoverable = isFront && phase === "idle";
              return (
                <motion.a
                  key={c.slug}
                  href={workHref(c)}
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
          <div className="mt-6 flex justify-center border-t border-line/60 pt-6">
            <button
              type="button"
              onClick={shuffle}
              disabled={phase !== "idle"}
              aria-label="Show next case"
              className="group flex flex-col items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronDown
                size={32}
                strokeWidth={1.75}
                className="text-faint transition-all duration-200 group-hover:scale-110 group-hover:text-accent"
                aria-hidden
              />
              <span className="text-[13px] text-muted transition-colors group-hover:text-accent">
                next case
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
