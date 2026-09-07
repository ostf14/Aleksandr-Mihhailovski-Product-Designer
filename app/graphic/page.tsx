import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { GraphicGallery } from "@/components/GraphicGallery";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock } from "@/components/Placeholder";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";
import { GRAPHIC_ITEMS } from "@/lib/graphic";

export const metadata = pageMetadata({
  // TODO: собственные title и description раздела
  title: "Graphic",
  description: "TODO: описание раздела для поисковой выдачи и превью.",
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
          <header className="px-6 md:px-10 pt-6 md:pt-10 pb-12">
            <div className="max-w-bleed mx-auto">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3">
                  Graphic &amp; brand
                </p>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  Graphic
                </h1>
              </FadeIn>

              <FadeIn delay={0.05} className="max-w-prose mt-6">
                {/* TODO: одна строка про раздел */}
                <PlaceholderBlock label="Одна строка про раздел — что здесь лежит и для кого." />
              </FadeIn>
            </div>
          </header>

          {/* Cases go above this once they exist — Morgenshtern, Genesis,
              Med consultations. The gallery below is the archive tier: a
              picture, a name, a year, one line. */}
          <section className="px-6 md:px-10 pb-32">
            <div className="max-w-bleed mx-auto">
              <GraphicGallery items={GRAPHIC_ITEMS} />
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
