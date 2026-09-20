import { ArrowUpRight } from "lucide-react";
import { YouTubeEmbed } from "./YouTubeEmbed";
import type { Testimonial } from "@/lib/testimonials";
import { getWork, workHref } from "@/lib/works";

/**
 * One vertical testimonial clip, as a card.
 *
 * Built on the same anatomy as a case card in StickyCases: media flush to the
 * top edge, a hairline, then kicker / title / line in a padded block. The
 * caption used to sit loose under the video, which left four ranks of text
 * floating against the page with nothing holding them to the clip they
 * describe. The card is what attaches them.
 *
 * Not a link, unlike a case card — the video is the thing you interact with,
 * so there is no tilt and no spotlight either. Those read as "this whole
 * surface is clickable", which here it is not.
 *
 * A self-hosted clip keeps `preload="none"`: these are multi-megabyte files,
 * and without it a page holding three of them would pull all three before
 * anyone pressed play. The poster frame is what makes that free — the page
 * shows a face either way.
 */
export function TestimonialVideo({ item }: { item: Testimonial }) {
  const work = item.work ? getWork(item.work) : undefined;

  // Said before anyone commits to pressing play: how long, what language, and
  // whether they can follow it if they do not speak it. Duration is dropped
  // when unknown rather than guessed — a YouTube thumbnail prints it anyway.
  const meta = [
    item.duration,
    item.lang.toUpperCase(),
    item.captions || item.subtitled ? "ENG SUB" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    /* h-full so two cards side by side end on the same line: the videos are
       the same shape, but one caption runs to two lines and the other to one,
       and a card 30px shorter than its neighbour looks like a mistake rather
       than like a shorter sentence. */
    <figure className="h-full overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)]">
      <div className="border-b border-line/60 bg-surface dark:bg-surface-deep">
        {item.youtube ? (
          // No autoplay here, deliberately. The game trailer starts itself
          // because it is the page; two testimonials starting themselves at
          // once would be noise you have to go and switch off.
          <YouTubeEmbed
            id={item.youtube}
            title={`${item.name} — ${item.about}`}
            aspect="portrait"
            framed={false}
          />
        ) : (
          /* object-contain rather than cover: the animated credits are part of
             the composition, so nothing may be cropped off the edge. */
          <div className="aspect-[9/16] overflow-hidden">
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
        )}
      </div>

      {/* Satoshi throughout, including the two label rows — the uppercase and
          the letterspacing already say "label" without a second typeface. */}
      <figcaption className="p-5">
        <div className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted dark:text-faint">
          {item.role}
        </div>

        <div className="mt-2.5 font-sans text-[20px] font-semibold leading-[1.15] tracking-tight text-fg">
          {item.name}
        </div>

        {/* What the clip is about, before the technical meta — it is the
            reason to press play, and the language is only the cost. */}
        <p className="mt-2 text-[15px] leading-[1.5] text-muted">
          {item.about}
        </p>

        <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.14em] text-faint">
          {meta}
        </p>

        {work && (
          <a
            href={workHref(work)}
            className="mt-3 inline-flex items-center gap-1 text-[15px] text-accent transition-opacity hover:opacity-70"
          >
            {work.title}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
