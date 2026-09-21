"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTilt } from "./useTilt";

/**
 * The gallery entry, built to the same pattern as a case panel in
 * StickyCases.tsx — cover on top, body underneath, one typeface, and the same
 * tilt and spotlight on hover. It used to be the old landscape card with the
 * image squeezed into a 38% column, which read as a different kind of thing
 * sitting under a section that had moved on.
 *
 * The cover follows the same rule as the panels' — 150px on a phone, 16:9 from
 * 441 — and has to, or the two sit one above the other at 767 with a proper
 * cover on every case and a strip on this one.
 *
 * Deliberately not sharing a component with Panel: that one carries the reveal
 * and a Work record, neither of which applies to a single static card, and
 * folding this into it would mean a props object describing which half of the
 * behaviour to switch off. The tilt they do share lives in useTilt.
 */
export function GalleryCard() {
  const tiltRef = useTilt<HTMLAnchorElement>();

  return (
    <Link
      ref={tiltRef}
      href="/other"
      className="tiltable group relative block overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)]"
    >
      <span aria-hidden className="spot" />

      <div className="relative h-[150px] overflow-hidden border-b border-line/60 bg-surface dark:bg-surface-deep min-[441px]:aspect-video min-[441px]:h-auto">
        <div className="h-full w-full transition-transform duration-t6 ease-out-expo group-hover:scale-[1.03]">
          {/* Scaled out from the top edge. The source is a full-page
              screenshot whose own backdrop is #0d0d0d, and the white page
              inside it has rounded corners — so the bottom of a 16:9 crop
              caught black wedges in both corners. 1.08 from `origin-top`
              pushes that band below the frame and trims the dark margin at
              the sides with it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/gallery/seamm-cover.webp"
            alt=""
            aria-hidden
            className="h-full w-full origin-top scale-[1.08] object-cover object-top"
          />
        </div>
      </div>

      <div className="relative z-[2] p-5 md:p-6">
        <div className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted dark:text-faint">
          Gallery
          <span className="text-faint/70"> · </span>
          2018&ndash;24
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-4">
          <h3 className="font-sans text-[24px] font-semibold leading-[1.1] tracking-tight text-fg md:text-[27px]">
            Other website design works
          </h3>
          <ArrowUpRight
            size={26}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-faint transition-colors duration-t2 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <p className="mt-2 text-[15px] leading-[1.5] text-muted">
          A selection of websites and landing pages I&rsquo;ve designed over the
          years.
        </p>
      </div>
    </Link>
  );
}
