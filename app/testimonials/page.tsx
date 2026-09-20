import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock } from "@/components/Placeholder";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TestimonialVideo } from "@/components/TestimonialVideo";
import { TESTIMONIALS } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Testimonials",
  description:
    "What the people I have worked with say, in their own words and on camera.",
  path: "/testimonials",
  ogType: "website",
  ogSubtitle: "Testimonials",
});

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="pt-6 md:pt-10 pb-12">
            <div className="shell">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-3">
                  In their own words
                </p>
                <h1 className="font-sans font-semibold text-hero tracking-tight">
                  Testimonials
                </h1>
              </FadeIn>
            </div>
          </header>

          <section className="pb-32">
            <div className="shell">
              {TESTIMONIALS.length === 0 ? (
                <PlaceholderBlock label="Видео-отзывы. Ждут файлов: Оксана Станевич и Павел, плюс третий позже. Регистр — lib/testimonials.ts." />
              ) : (
                // One column on a phone, as on /graphic — a 9:16 clip two to
                // a row would be a stamp. Three across from md up.
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
                  {TESTIMONIALS.map((item, i) => (
                    <FadeIn key={item.id} delay={(i % 3) * 0.04}>
                      <TestimonialVideo item={item} />
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
