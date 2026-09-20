"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { useTilt } from "./useTilt";
import type { Testimonial } from "@/lib/testimonials";
import { getWork, workHref } from "@/lib/works";

/**
 * One vertical testimonial clip, as a card that behaves like a case card:
 * same anatomy — media flush to the top edge, a hairline, then kicker / name /
 * line in a padded block — and the same tilt and spotlight under the cursor.
 *
 * THE PLAYER IS NOT THERE UNTIL YOU PRESS PLAY, and that is what makes the
 * hover possible at all. An <iframe> is a separate document: while the pointer
 * is over one, this document receives no pointermove and no pointerleave, so
 * useTilt cannot see the cursor. The card is mostly video, so a pointer coming
 * in from outside crosses one border pixel and vanishes — the tilt would sit
 * frozen and the spotlight would be stuck in the top-left corner, which is
 * exactly the rendering bug useTilt's own comment is about avoiding on touch.
 *
 * A poster and a play button are ours, so the pointer stays ours. Pressing
 * play swaps in the real player with autoplay, so it costs one click and
 * nothing else. It also means neither of these pages loads a megabyte of
 * YouTube player for a visitor who never watches.
 *
 * A self-hosted clip keeps `preload="none"` for the same reason: these are
 * multi-megabyte files, and without it a page holding three of them would pull
 * all three before anyone pressed play.
 */
export function TestimonialVideo({ item }: { item: Testimonial }) {
  const work = item.work ? getWork(item.work) : undefined;
  const tiltRef = useTilt<HTMLElement>();
  const [playing, setPlaying] = useState(false);

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

  const start = () => {
    // Flatten before the player lands. From here on the iframe eats the
    // pointer, so whatever angle the card is at is the angle it keeps — and a
    // video playing on a card tipped five degrees is not a resting state.
    const el = tiltRef.current;
    el?.style.setProperty("--mx", "0");
    el?.style.setProperty("--my", "0");
    setPlaying(true);
  };

  return (
    /* h-full so two cards side by side end on the same line: the videos are
       the same shape, but one caption runs to two lines and the other to one,
       and a card 30px shorter than its neighbour looks like a mistake rather
       than like a shorter sentence. */
    <figure
      ref={tiltRef}
      className="tiltable group relative h-full overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)]"
    >
      {/* The spotlight. A fixed box centred on the pointer and moved by
          transform alone — see useTilt for why that matters. */}
      <span aria-hidden className="spot" />

      <div className="relative border-b border-line/60 bg-surface-deep">
        {item.youtube ? (
          playing ? (
            /* Its own player rather than YouTubeEmbed: that one draws a border
               and corners, which the card already does — two radii nested one
               pixel apart is the sort of thing you see without being able to
               say what is wrong — and its autoplay means the muted, looping
               kind a trailer wants, not this. */
            <YouTubePlayer id={item.youtube} title={item.name} />
          ) : (
            <PlayFacade
              id={item.youtube}
              label={`Play ${item.name}’s testimonial`}
              onStart={start}
            />
          )
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
      <figcaption className="relative z-[2] p-5">
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

/**
 * The card face before anyone has pressed play.
 *
 * The still comes from YouTube's own thumbnail host, which serves it without a
 * cookie — the tracking that the player sets only begins when the player
 * does. A vertical clip's thumbnail is stored 16:9 with the frame in the
 * middle, so object-cover into a 9:16 box lands back on the picture.
 *
 * If the still 404s the image is simply dropped and the button keeps its plate
 * and its play mark: one missing file must not leave a hole in the card.
 */
function PlayFacade({
  id,
  label,
  onStart,
}: {
  id: string;
  label: string;
  onStart: () => void;
}) {
  const [poster, setPoster] = useState(true);

  return (
    <button
      type="button"
      onClick={onStart}
      aria-label={label}
      className="relative block aspect-[9/16] w-full overflow-hidden"
    >
      {poster && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          onError={() => setPoster(false)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-t6 ease-out-expo group-hover:scale-[1.03]"
        />
      )}

      {/* Sits over the still so the mark stays readable whatever frame
          YouTube picked, and deepens on hover the way a cover does. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[rgb(0_0_0/0.12)] transition-colors duration-t3 group-hover:bg-[rgb(0_0_0/0.2)]"
      />

      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-fg shadow-[0_8px_24px_-12px_rgb(0_0_0/0.5)] backdrop-blur-sm transition-transform duration-t3 ease-out-expo group-hover:scale-110"
      >
        {/* Nudged right by a pixel: a triangle's optical centre is left of its
            bounding box, and centred by the box it reads as off-centre. */}
        <Play
          size={20}
          strokeWidth={2}
          className="ml-0.5"
          fill="currentColor"
        />
      </span>
    </button>
  );
}

/**
 * The real player, mounted only after a click — so it always autoplays: the
 * click was the request to watch, and a player that then waits for a second
 * click on its own button is just a worse button.
 *
 * Served from youtube-nocookie.com: same player, no tracking cookie until
 * somebody actually presses play, which by here they have.
 */
function YouTubePlayer({ id, title }: { id: string; title: string }) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    autoplay: "1",
  });

  return (
    <div className="aspect-[9/16] overflow-hidden bg-surface-deep">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
        title={`${title} — video testimonial`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
