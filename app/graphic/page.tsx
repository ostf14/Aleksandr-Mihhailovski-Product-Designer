import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { GraphicGallery } from "@/components/GraphicGallery";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";
import { GRAPHIC_ITEMS } from "@/lib/graphic";

export const metadata = pageMetadata({
  title: "Graphic",
  description: "Covers, social posts, editorial illustration and logo work.",
  path: "/graphic",
  ogType: "website",
  ogSubtitle: "Graphic",
});

export default function Page() {
  return (
    <>
      <Nav />
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
              picture, a name, a year, one line. */}
          <section className="pb-32">
            <div className="shell">
              <GraphicGallery items={GRAPHIC_ITEMS} />
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
