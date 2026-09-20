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
 * in a 16:9 slot, so they are shown as a row of narrow columns: at their own
 * proportion, sized by how many there are, capped so two do not turn into two
 * billboards. That is the whole trick to not making these look like an advert.
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
      <div className="shell grid grid-cols-1 gap-10 md:grid-cols-[1fr_3fr] md:gap-14 lg:gap-20">
        <div className="self-start">
          <h2 className="font-sans text-4xl font-semibold tracking-tight text-fg md:text-5xl">
            {heading}
          </h2>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {items.map((item) => (
              <div key={item.id} className="max-w-[320px]">
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
