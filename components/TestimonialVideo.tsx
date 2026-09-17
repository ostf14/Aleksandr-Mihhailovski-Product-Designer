import { ArrowUpRight } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import { getWork, workHref } from "@/lib/works";

/**
 * One vertical testimonial clip.
 *
 * Plain <video controls> on purpose — no player library, nothing to hydrate.
 *
 * `preload="none"` is the important bit: these are multi-megabyte files, and
 * without it a page holding three of them would pull all three before anyone
 * pressed play. The poster frame is what makes that free — the page shows a
 * face either way.
 */
export function TestimonialVideo({ item }: { item: Testimonial }) {
  const work = item.work ? getWork(item.work) : undefined;

  // Said before anyone commits to pressing play: how long, what language,
  // and whether they can follow it if they do not speak it.
  const meta = [
    item.duration,
    item.lang.toUpperCase(),
    item.captions ? "English subtitles" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <figure>
      {/* object-contain rather than cover: the animated credits are part of
          the composition, so nothing may be cropped off the edge. */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-cream-deep aspect-[9/16]">
        <video
          controls
          playsInline
          preload="none"
          poster={item.poster}
          lang={item.lang}
          className="h-full w-full object-contain"
        >
          <source src={item.video} type="video/mp4" />
          {item.captions && (
            <track
              kind="captions"
              src={item.captions}
              srcLang="en"
              label="English"
              default
            />
          )}
        </video>
      </div>

      <figcaption className="mt-3">
        <div className="text-[0.95rem] leading-[1.4] text-charcoal">
          {item.name}
        </div>
        <p className="mt-0.5 text-[0.875rem] leading-[1.5] text-charcoal/70">
          {item.role}
        </p>

        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/70">
          {meta}
        </p>

        {work && (
          <a
            href={workHref(work)}
            className="mt-2 inline-flex items-center gap-1 text-[0.875rem] text-terracotta hover:opacity-70 transition-opacity"
          >
            {work.title}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
