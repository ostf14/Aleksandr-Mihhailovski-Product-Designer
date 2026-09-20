import { BusinessCard } from "@/components/BusinessCard";
import { Footer } from "@/components/Footer";
import { GalleryCard } from "@/components/GalleryCard";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StickyCases } from "@/components/StickyCases";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/site";
import { productCases } from "@/lib/works";

export const metadata = pageMetadata({
  title: "Product",
  description: SITE_DESCRIPTION,
  path: "/product",
  ogType: "website",
});

// Only pages with more than one heading get one — a contents list of a single
// entry is not a contents list. /gamedev has just Cases, so it has none.
const toc: TocItem[] = [
  { id: "cases", label: "Cases" },
  { id: "other", label: "Other" },
  { id: "testimonials", label: "Testimonials" },
];

export default function Page() {
  return (
    <>
      <Nav />
      <TableOfContents items={toc} />
      <ScrollToTop />

      <main>
        {/* Hero — full-bleed band, so no horizontal padding here and no top
            offset either: the band carries its own clearance for the nav. */}
        <section className="mb-24 md:mb-32">
          <BusinessCard />
        </section>

        {/* Case Studies */}
        <section id="cases" className="mb-32 scroll-mt-[16.6667vh]">
          <StickyCases works={productCases} />
        </section>

        {/* Other — same grid as Cases above it, so the single card lines up
            with the panels rather than running the full width beneath them. */}
        <section id="other" className="mb-32 scroll-mt-[16.6667vh]">
          <div className="shell grid grid-cols-1 gap-10 md:grid-cols-[1fr_3fr] md:gap-14 lg:gap-20">
            <div className="self-start">
              <h2 className="font-sans text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                Other
              </h2>
            </div>
            <GalleryCard />
          </div>
        </section>
        <TestimonialsSection />
      </main>

      <Footer />
    </>
  );
}
