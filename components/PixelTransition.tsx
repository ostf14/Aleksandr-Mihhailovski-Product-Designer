"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { resolvePath, WIP_PREVIEW_COOKIE } from "@/lib/site";

/**
 * The page transition: a field of squares fills the screen, the route changes
 * behind it, and the same wave carries the squares away again.
 *
 * Drawn on a canvas, not built out of elements. It was elements once, one div
 * per square with a CSS transition, which is the cheaper idea right up until
 * the squares get small. At 64px that is 345 divs and the whole thing runs on
 * the compositor at a steady 60fps. At 13px it is 7,770, and measured at
 * 1440x900 the DOM alone took 253ms to build and frames came every 217ms —
 * about five a second. A canvas is one element whatever the square size: the
 * cost stops being the number of nodes and becomes the number of rectangles
 * filled, which is a different order of problem entirely.
 *
 * It also covers a real hole. A client-side navigation takes the old page away
 * the instant it starts, and the new one arrives with its entrance animations
 * still at zero — a blank screen for about 190ms on the way into a case page.
 * The trigger in reveal.ts no longer animates what is already on screen, which
 * fixes that on its own; the curtain then means you do not even see the swap.
 */

/**
 * Square size in CSS pixels. The grid rounds to whole squares that tile the
 * viewport, so the drawn size is near this rather than exactly it.
 */
const CELL_PX = 13;

/**
 * Ceiling on the device pixel ratio the canvas is drawn at.
 *
 * These are axis-aligned flat-colour rectangles; there is nothing in them a
 * third or fourth device pixel would resolve. On a 3x phone this is the
 * difference between filling 3.0M pixels a frame and 6.8M.
 */
const MAX_DPR = 2;

/** How long one square takes to grow, or to fade. */
const CELL_MS = 240;
/** Spread from the outermost square to the innermost. */
const STAGGER_MS = 150;
/** Per-square scatter on top of that — this is what makes it read as pixels. */
const JITTER_MS = 60;

const COVER_MS = CELL_MS + STAGGER_MS + JITTER_MS;
const REVEAL_MS = COVER_MS;

/**
 * If the route never arrives — an offline click, or something this file has
 * not thought of — the curtain must not stay up. The one case that used to
 * land here, a link resolving to the page you are already on, is caught at the
 * click now.
 */
const FAILSAFE_MS = 2500;

/** Mirrors --e-out in globals.css, so both directions ease the same way. */
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Deterministic per-cell scatter: the wave has to retreat the way it came. */
function jitter(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type Phase = "idle" | "covering" | "covered" | "revealing";

/**
 * The grid, as flat arrays rather than an array of objects.
 *
 * Eight thousand small objects is eight thousand allocations to make and then
 * to collect, and the draw loop walks the whole thing every frame. Two typed
 * arrays are one allocation each and stay contiguous.
 *
 * `dIn` runs edge first, so the picture is eaten from the outside; `dOut` runs
 * middle first, so the next page opens from the centre. Distance is measured
 * with each axis mapped to [-1, 1] before the hypotenuse, so the shape that
 * closes is the shape of the window — on a wide screen the last thing left is
 * a wide band across the middle rather than a circle.
 */
type Grid = {
  cols: number;
  rows: number;
  cw: number;
  ch: number;
  dIn: Float32Array;
  dOut: Float32Array;
};

function buildGrid(w: number, h: number): Grid {
  const cols = Math.max(1, Math.round(w / CELL_PX));
  const rows = Math.max(1, Math.round(h / CELL_PX));
  const dIn = new Float32Array(cols * rows);
  const dOut = new Float32Array(cols * rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const nx = cols > 1 ? ((c + 0.5) / cols) * 2 - 1 : 0;
      const ny = rows > 1 ? ((r + 0.5) / rows) * 2 - 1 : 0;
      const d = Math.min(1, Math.hypot(nx, ny) / Math.SQRT2);
      const scatter = jitter(i) * JITTER_MS;
      dIn[i] = (1 - d) * STAGGER_MS + scatter;
      dOut[i] = d * STAGGER_MS + scatter;
    }
  }
  return { cols, rows, cw: w / cols, ch: h / rows, dIn, dOut };
}

/** The curtain colour, read from the palette so it follows the theme. */
function curtainColor() {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--curtain")
    .trim();
  return v ? `rgb(${v})` : "#000";
}

export function PixelTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      later(() => {
        setPhase("revealing");
        later(() => setPhase("idle"), REVEAL_MS);
      }, FAILSAFE_MS);
    },
    [router],
  );

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

  /**
   * The drawing. One rAF loop per phase, torn down when the phase changes.
   *
   * The grid is rebuilt when the loop starts rather than on resize: a window
   * cannot be resized during a half-second transition, and rebuilding eight
   * thousand delays on a resize event that will never come is work for
   * nothing.
   */
  useEffect(() => {
    if (phase === "idle") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { cols, rows, cw, ch, dIn, dOut } = buildGrid(w, h);
    const fill = curtainColor();
    const t0 = performance.now();
    let raf = 0;

    // 1.02 for the same reason the CSS version used it: whole-pixel rounding
    // leaves hairlines of page between exactly-adjacent squares.
    const bleed = 1.02;

    const frame = () => {
      const t = performance.now() - t0;
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = fill;

      if (phase === "covered") {
        // Nothing to animate: the screen is simply solid.
        ctx.fillRect(0, 0, w, h);
        return;
      }

      if (phase === "covering") {
        for (let r = 0; r < rows; r++) {
          const y = r * ch;
          for (let c = 0; c < cols; c++) {
            const p = (t - dIn[r * cols + c]) / CELL_MS;
            if (p <= 0) continue;
            const s = (p >= 1 ? 1 : easeOut(p)) * bleed;
            const sw = cw * s;
            const sh = ch * s;
            ctx.fillRect(c * cw + (cw - sw) / 2, y + (ch - sh) / 2, sw, sh);
          }
        }
      } else {
        // Revealing. The squares do NOT shrink — they stay put and fade.
        // Shrinking them takes bites out of the letters underneath, and since
        // a square the colour of the page is invisible, all anyone sees is the
        // text coming apart. See the note in globals.css.
        const sw = cw * bleed;
        const sh = ch * bleed;
        for (let r = 0; r < rows; r++) {
          const y = r * ch;
          for (let c = 0; c < cols; c++) {
            const p = (t - dOut[r * cols + c]) / CELL_MS;
            if (p >= 1) continue;
            ctx.globalAlpha = p <= 0 ? 1 : 1 - easeOut(p);
            ctx.fillRect(c * cw, y, sw, sh);
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    frame();
    return () => cancelAnimationFrame(raf);
  }, [phase]);

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
      // trap in reveal.ts is specifically about branching the TREE on it.
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

  if (phase === "idle") return null;

  // data-phase drives nothing — the canvas paints itself. It is here because
  // a transition you cannot observe from outside is a transition you cannot
  // check, and every measurement written against this component reads it.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-phase={phase}
      className="px-curtain"
    />
  );
}
