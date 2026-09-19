import { ArrowUpRight } from "lucide-react";

/**
 * The gallery entry, built to the same pattern as a case panel in
 * StickyCases.tsx — cover on top at a fixed height, body underneath, one
 * typeface. It used to be the old landscape card with the image squeezed into
 * a 38% column, which read as a different kind of thing sitting under a
 * section that had moved on.
 *
 * Deliberately not sharing a component with Panel: that one carries the tilt,
 * the reveal and a Work record, none of which apply to a single static card,
 * and folding this into it would mean a props object describing which half of
 * the behaviour to switch off.
 */
export function GalleryCard() {
  return (
    <a
      href="/other"
      className="group relative block overflow-hidden rounded-2xl border border-stone-200/60 bg-white dark:bg-cream-warm shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] transition-transform duration-t3 ease-out-expo hover:-translate-y-0.5"
    >
      <div className="relative h-[200px] md:h-[240px] overflow-hidden border-b border-stone-200/60 bg-cream-warm dark:bg-cream-deep">
        <div className="h-full w-full transition-transform duration-t6 ease-out-expo group-hover:scale-[1.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/gallery/seamm-homepage.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="font-sans text-[11px] uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
          Gallery
          <span className="text-stone-400/70"> · </span>
          2018&ndash;24
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-4">
          <h3 className="font-sans text-[24px] md:text-[27px] font-semibold leading-[1.1] tracking-tight text-[#171717] dark:text-[#ededed]">
            Other website design works
          </h3>
          <ArrowUpRight
            size={26}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-stone-400 transition-colors duration-t2 group-hover:text-terracotta"
            aria-hidden
          />
        </div>

        <p className="mt-2 text-[15px] leading-[1.5] text-stone-500">
          A selection of websites and landing pages I&rsquo;ve designed over the
          years.
        </p>
      </div>
    </a>
  );
}
