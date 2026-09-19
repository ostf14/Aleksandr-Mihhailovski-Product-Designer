import { BusinessCard } from "@/components/BusinessCard";
import { Footer } from "@/components/Footer";
import { GalleryCard } from "@/components/GalleryCard";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StickyCases } from "@/components/StickyCases";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Work",
  description: SITE_DESCRIPTION,
  path: "/work",
  ogType: "website",
});

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main>
        {/* Hero — full-bleed band, so no horizontal padding here and no top
            offset either: the band carries its own clearance for the nav. */}
        <section className="mb-24 md:mb-32">
          <BusinessCard />
        </section>

        {/* Case Studies */}
        <section id="cases" className="px-6 md:px-10 mb-32 scroll-mt-[16.6667vh]">
          <StickyCases />
        </section>

        {/* Other */}
        <section id="other" className="px-6 md:px-10 mb-32 scroll-mt-[16.6667vh]">
          <div className="max-w-[1080px] mx-auto">
            <h2 className="mb-8 font-sans font-semibold text-4xl md:text-5xl tracking-tight text-[#171717] dark:text-[#ededed]">
              Other
            </h2>
          </div>
          <div className="max-w-[1080px] mx-auto">
            <GalleryCard />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
