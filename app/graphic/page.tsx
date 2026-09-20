import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { GraphicGallery } from "@/components/GraphicGallery";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { pageMetadata } from "@/lib/site";
import { GRAPHIC_ITEMS } from "@/lib/graphic";

export const metadata = pageMetadata({
  title: "Graphic",
  description: "Covers, social posts, editorial illustration and logo work.",
  path: "/graphic",
  ogType: "website",
  ogSubtitle: "Graphic",
});

const toc: TocItem[] = [
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
];

export default function Page() {
  return (
    <>
      <Nav />
      <TableOfContents items={toc} />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="pb-12 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Graphic &amp; brand
                </p>
                <h1 className="font-sans text-hero font-semibold tracking-tight">
                  Graphic
                </h1>
              </FadeIn>
            </div>
          </header>

          {/* Cases go above this once they exist — Morgenshtern, Genesis,
              Med consultations. The gallery below is the archive tier: a
              picture, a name, a year, one line.

              It carries a heading now because the page has two sections, and a
              contents list cannot point at something unnamed. */}
          <section id="gallery" className="mb-32 scroll-mt-[16.6667vh]">
            <div className="shell">
              <h2 className="mb-8 font-sans text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                Gallery
              </h2>
              <GraphicGallery items={GRAPHIC_ITEMS} />
            </div>
          </section>

          <TestimonialsSection />
        </article>
      </main>

      <Footer />
    </>
  );
}
