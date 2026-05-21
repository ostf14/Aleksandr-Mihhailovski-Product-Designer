"use client";

import { BrowserCarousel } from "./BrowserCarousel";

const slides = [
  { title: "seamm.dev — Homepage", images: ["/cases/gallery/seamm-homepage.jpg"] },
  { title: "seamm.dev — For Brands", images: ["/cases/gallery/seamm-brands.jpg"] },
  { title: "seamm.dev — About", images: ["/cases/gallery/seamm-about.jpg"] },
  { title: "Frame 111", images: ["/cases/gallery/frame-111.jpg"] },
  { title: "Frame 110", images: ["/cases/gallery/frame-110.jpg"] },
  { title: "Animation", images: ["/cases/gallery/animation.gif"] },
  { title: "Screen 1.2", images: ["/cases/gallery/screen-1-2.png"] },
  { title: "Debattle", images: ["/cases/gallery/debattle.jpg"] },
  { title: "Landing page", images: ["/cases/gallery/landing.jpg"] },
];

export function GalleryCard() {
  return (
    <div className="relative rounded-2xl bg-white dark:bg-cream-warm border border-stone-200/60 shadow-[0_-2px_24px_rgba(16,24,40,0.07)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-5 md:p-8">
      {/* Header text block — same scale as case cards */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-baseline justify-between gap-4">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-stone-400">
            Gallery · 2018–24
          </div>
          <span className="font-mono text-xs text-stone-400 shrink-0">
            2018–24
          </span>
        </div>
        <h3 className="mt-3 font-serif font-normal text-[28px] md:text-[32px] leading-[1.1] tracking-tight text-[#1F1F1E] dark:text-[#E8E8E6]">
          Other website design works
        </h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-stone-500">
          A selection of websites and landing pages I&rsquo;ve designed over the years.
        </p>
      </div>

      {/* Carousel — !px-0 disables BrowserCarousel's outer page padding so it
          fits inside the card padding cleanly. */}
      <BrowserCarousel slides={slides} className="!px-0" height={460} />
    </div>
  );
}
