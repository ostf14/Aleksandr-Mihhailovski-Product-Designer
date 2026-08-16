"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { UnderConstruction } from "./UnderConstruction";
import { isWipRoute } from "@/lib/site";

const REVEAL_KEY = "wip-reveal";
const CLICKS_TO_REVEAL = 3;
const CLICK_WINDOW_MS = 600;

/**
 * Cover screen for routes still listed in WIP_ROUTES.
 *
 * Visitors get the sign and the footer; three clicks on the heading swap in
 * the real page so it can be worked on. The choice is kept in sessionStorage,
 * so it survives navigation between unfinished pages and a reload, but a
 * fresh tab starts covered again.
 *
 * `children` is always rendered on the server and handed here as a prop, so
 * revealing is an instant swap with no refetch — and hiding it costs nothing,
 * since these routes already carry noindex.
 */
export function WipGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [revealed, setRevealed] = useState(false);

  // Read after mount rather than in the initial state: sessionStorage does
  // not exist during the server render, and seeding from it on the client
  // only would make the two disagree at hydration.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(REVEAL_KEY) === "1") setRevealed(true);
    } catch {
      /* private mode — stay covered */
    }
  }, []);

  const clicks = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  // Counted by hand rather than off the click event's `detail`, which only
  // increments for mouse input — this way the gate also opens on a phone.
  const onHeadingClick = () => {
    clicks.current += 1;
    window.clearTimeout(timer.current);

    if (clicks.current >= CLICKS_TO_REVEAL) {
      clicks.current = 0;
      try {
        sessionStorage.setItem(REVEAL_KEY, "1");
      } catch {
        /* ignore */
      }
      setRevealed(true);
      return;
    }

    timer.current = window.setTimeout(() => {
      clicks.current = 0;
    }, CLICK_WINDOW_MS);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!isWipRoute(pathname)) return <>{children}</>;

  if (revealed) {
    return (
      <>
        {children}
        <UnderConstruction />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <h1
          onClick={onHeadingClick}
          className="font-serif font-normal text-hero tracking-tight text-center text-charcoal select-none cursor-default"
        >
          under construction
        </h1>
      </main>
      <Footer />
    </div>
  );
}
