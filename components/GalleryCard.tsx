import { ArrowUpRight } from "lucide-react";

export function GalleryCard() {
  return (
    <a
      href="/other"
      className="group relative block h-[348px] md:h-[248px] rounded-2xl bg-white dark:bg-cream-warm border border-stone-200/60 shadow-[0_-2px_24px_rgba(16,24,40,0.07)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-5 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <ArrowUpRight
        size={32}
        strokeWidth={1.5}
        className="absolute top-5 right-5 text-stone-400 transition-colors group-hover:text-terracotta z-10"
        aria-hidden
      />
      <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-5 h-full">
        <div className="md:flex-1 md:min-w-0 flex flex-col pr-10">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-stone-400">
            Gallery · 2018–24
          </div>
          <h3 className="mt-3 font-serif font-normal text-[28px] md:text-[32px] leading-[1.1] tracking-tight text-[#282726] dark:text-[#E8E8E6]">
            Other website design works
          </h3>
          <p className="mt-3 text-[15px] leading-[1.5] text-stone-500 line-clamp-2">
            A selection of websites and landing pages I&rsquo;ve designed over the years.
          </p>
        </div>
        <div className="flex-1 min-h-0 -mx-5 -mb-5 md:m-0 md:basis-[38%] md:shrink-0 md:flex-none md:h-full rounded-b-2xl md:rounded-xl overflow-hidden bg-cream-warm dark:bg-cream-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/gallery/seamm-homepage.jpg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </a>
  );
}
