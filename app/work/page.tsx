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
        {/* Business card — hero */}
        <section className="px-0 md:px-10 pt-[100px] md:pt-[120px] mb-20">
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
