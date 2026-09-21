"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { resolvePath, WIP_PREVIEW_COOKIE } from "@/lib/site";

/**
 * The page transition: a field of squares fills the screen, the route changes
 * behind it, and the same wave carries the squares away again.
 *
 * It is a grid of plain divs scaling from 0 to 1, each with its own delay —
 * not a canvas and not a per-frame script. Scale is composited, so the whole
 * curtain is the compositor's problem and the main thread is free to do the
 * one thing that actually matters during a navigation, which is render the
 * next page. The delays live in a custom property per cell, the same way
 * `.rv` carries its stagger.
 *
 * It also covers a real hole. A client-side navigation takes the old page away
 * the instant it starts, and the new one arrives with its entrance animations
 * still at zero — a blank screen for about 190ms on the way into a case page.
 * FadeIn no longer fades what is already on screen, which fixes that on its
 * own; the curtain then means you do not even see the swap.
 */

/** Target square size. The grid rounds to whole cells that tile the viewport. */
const CELL_PX = 64;
/** Ceiling on cells, so a 4K screen does not animate two thousand divs. */
const MAX_CELLS = 480;

/** How long one square takes to grow or shrink. Mirrors --t-3 in globals.css,
 *  which is what the transition on .px-cell actually uses. */
const CELL_MS = 240;
/** Spread from the outermost square to the innermost. */
const STAGGER_MS = 150;
/** Per-square scatter on top of that — this is what makes it read as pixels. */
const JITTER_MS = 60;

const COVER_MS = CELL_MS + STAGGER_MS + JITTER_MS;
const REVEAL_MS = COVER_MS;

/**
 * If the route never arrives — an offline click, a redirect that lands back on
 * the same path — the curtain must not stay up. Nothing on this site takes
 * anything like this long once the route is prefetched.
 */
const FAILSAFE_MS = 2500;

type Phase = "idle" | "covering" | "covered" | "revealing";

/** Deterministic per-cell scatter: the wave has to retreat the way it came. */
function jitter(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function useGrid() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const measure = () => {
      let cols = Math.max(1, Math.ceil(window.innerWidth / CELL_PX));
      let rows = Math.max(1, Math.ceil(window.innerHeight / CELL_PX));
      // Coarsen both axes together rather than clipping one, so the squares
      // stay square.
      while (cols * rows > MAX_CELLS) {
        cols = Math.ceil(cols / 1.2);
        rows = Math.ceil(rows / 1.2);
      }
      setGrid({ cols, rows });
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  return grid;
}

export function PixelTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { cols, rows } = useGrid();

  const [phase, setPhase] = useState<Phase>("idle");
  // One frame behind `phase`, and the only thing CSS reads. The cells have to
  // exist at rest for a frame before the class that moves them lands, or the
  // browser has no start state to transition from and they simply appear.
  const [painted, setPainted] = useState<Phase>("idle");

  // Where we were when the click happened. The curtain comes back up when the
  // route has actually changed, not when a timer says it probably has — on a
  // route that was not prefetched, a timer reveals a page that has not
  // rendered yet.
  const leftFrom = useRef<string | null>(null);
  const timers = useRef<number[]>([]);
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  /**
   * A delay pair per cell, keyed on how far it is from the middle of the
   * screen.
   *
   * The distance is measured in viewport-relative units — each axis mapped to
   * [-1, 1] before the hypotenuse — so the shape that closes is the shape of
   * the window. On a wide screen the last thing left is a wide band across the
   * middle, not a circle.
   *
   * `in` runs edge first, so the picture is eaten from the outside. `out` runs
   * middle first, so the next page opens from the centre. The jitter on top is
   * the same number for both, and it is the whole reason this reads as pixels
   * rather than as an aperture: without it the front is a clean curve.
   */
  const cells = useMemo(() => {
    const out: { in: number; out: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const nx = cols > 1 ? ((c + 0.5) / cols) * 2 - 1 : 0;
        const ny = rows > 1 ? ((r + 0.5) / rows) * 2 - 1 : 0;
        const d = Math.min(1, Math.hypot(nx, ny) / Math.SQRT2);
        const scatter = jitter(i) * JITTER_MS;
        out.push({
          in: Math.round((1 - d) * STAGGER_MS + scatter),
          out: Math.round(d * STAGGER_MS + scatter),
        });
      }
    }
    return out;
  }, [cols, rows]);

  const start = useCallback(
    (href: string) => {
      clear();
      leftFrom.current = window.location.pathname;
      setPhase("covering");
      later(() => {
        setPhase("covered");
        // Pushed only once the screen is solid. Pushed at the start, the swap
        // would happen in full view through the gaps between the squares.
        router.push(href);
      }, COVER_MS);
      // If the route never arrives, take the curtain down anyway — and take it
      // down the way it went up, rather than cutting to whatever is behind it.
      later(() => {
        setPhase("revealing");
        later(() => setPhase("idle"), REVEAL_MS);
      }, FAILSAFE_MS);
    },
    [router],
  );

  // Flip the painted phase a frame after the real one, except on the way out
  // of "covering", where the cells are already where CSS wants them.
  useEffect(() => {
    if (phase !== "covering") {
      setPainted(phase);
      return;
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPainted("covering"));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [phase]);

  // The route has landed. Give it a frame to paint, then pull the curtain back.
  useEffect(() => {
    if (phase !== "covered") return;
    if (pathname === leftFrom.current) return;

    clear();
    const id = requestAnimationFrame(() =>
      later(() => {
        setPhase("revealing");
        later(() => setPhase("idle"), REVEAL_MS);
      }, 40),
    );
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, phase]);

  useEffect(() => clear, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Leave every click the browser treats specially alone: new tab, new
      // window, download, save-as.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // Where this click LANDS, not where it points. The logo points at "/",
      // which middleware bounces to /product for an ordinary visitor — from
      // /product that is not a navigation, and a curtain raised over it would
      // have nothing to wait for. Same for an "On this page" jump or a link
      // back to where you already are: covering the screen to scroll a few
      // hundred pixels would be absurd.
      const preview = document.cookie
        .split("; ")
        .some((c) => c === `${WIP_PREVIEW_COOKIE}=1`);
      if (resolvePath(url.pathname, preview) === window.location.pathname)
        return;

      // Asked for less motion: navigate, say nothing. This is an event
      // handler, not a render, so reading the preference here is safe — the
      // trap in FadeIn.tsx is specifically about branching the TREE on it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Capture phase, so this runs before next/link's own handler; stopping
      // propagation is what keeps Link from navigating out from under the
      // curtain a frame later.
      e.preventDefault();
      e.stopPropagation();
      start(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  if (phase === "idle" || !cols) return null;

  return (
    <div
      aria-hidden
      className="px-curtain"
      data-phase={painted}
      style={{ "--px-cols": cols, "--px-rows": rows } as React.CSSProperties}
    >
      {cells.map((d, i) => (
        <span
          key={i}
          className="px-cell"
          style={
            {
              "--d-in": `${d.in}ms`,
              "--d-out": `${d.out}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
