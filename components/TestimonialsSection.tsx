import { PlaceholderBlock } from "./Placeholder";
import { TestimonialVideo } from "./TestimonialVideo";
import { availableTestimonials } from "@/lib/testimonials";

/**
 * The testimonials block, shared by every section page that wants one.
 *
 * Laid out on the same grid as Cases and Other — heading in its own column,
 * content in the wide one — so a page reads as one rhythm rather than three
 * arrangements stacked up.
 *
 * The clips are vertical, and there is no honest way to make a 9:16 video sit
 * in a 16:9 slot, so they are shown as a row of narrow cards: at their own
 * proportion, capped so two do not turn into two billboards. That is the whole
 * trick to not making these look like an advert.
 *
 * A server component — `availableTestimonials()` reads the filesystem, so the
 * section only ever renders players for files that exist.
 */
export function TestimonialsSection({
  id = "testimonials",
  heading = "Testimonials",
}: {
  id?: string;
  heading?: string;
} = {}) {
  const items = availableTestimonials();

  return (
    <section id={id} className="mb-32 scroll-mt-[16.6667vh]">
      {/* minmax(0,…) rather than a bare 1fr_3fr, which is what Cases uses.
          A fr track is floored at its content's min-content width, and
          "Testimonials" is one unbreakable word: at 48px it wants 259px, so it
          widened the heading column to 259 where Cases sits at 220, and this
          section's content started 38px right of every other section on the
          page — 157px right of it at 768. Floored at zero the columns match,
          and the word simply overruns into the gap between them, which is 56px
          at md and 80px at lg and holds nothing. */}
      <div className="shell grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-14 lg:gap-20">
        <div className="self-start">
          {/* Sized to the column rather than to the other headings. One
              unbreakable 12-letter word at 48px paints 259px wide, and the
              column is 158 at md — the glyphs overran their box far enough to
              land on the first card between 768 and ~960. It reaches the full
              48px by the time the column is wide enough to take it, which is
              every desktop; below that it gives up the difference rather than
              the alignment. */}
          <h2 className="font-sans text-4xl font-semibold tracking-tight text-fg md:text-[clamp(2.125rem,3.6vw,3rem)]">
            {heading}
          </h2>
        </div>

        {items.length > 0 ? (
          /* Two across from 441 up, one below it. The clips are 9:16, so at
             the width of a phone one card is the whole screen, and that is
             right there: a story-format video is meant to be full width on a
             phone. From 441 there is room for two, and two smaller cards read
             better than one card that has stopped being phone-sized and is
             not yet a desktop one — it used to hold at a single 320px column
             until 640, which left the right half of the screen empty.

             The 320 cap only exists once there are two of them. On one column
             it would leave a card narrower than the page it sits on, which is
             not what a full-width story clip should look like. */
          <div className="grid grid-cols-1 gap-6 min-[441px]:grid-cols-2 min-[441px]:max-sm:gap-4 lg:gap-8">
            {items.map((item) => (
              <div key={item.id} className="min-[441px]:max-w-[320px]">
                <TestimonialVideo item={item} />
              </div>
            ))}
          </div>
        ) : (
          <PlaceholderBlock label="Видео-отзывы: файлы ещё не в репозитории. Положи pavel.mp4 и oksana.mp4 в public/testimonials/ — блок соберётся сам. Подписи и хронометраж правятся в lib/testimonials.ts." />
        )}
      </div>
    </section>
  );
}
