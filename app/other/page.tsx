import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { BrowserFrame } from "@/components/BrowserFrame";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Other website design works",
  description:
    "A selection of websites and landing pages I’ve designed over the years — gallery, 2018–2024.",
  path: "/other",
  ogType: "website",
});

const gallery = [
  { title: "seamm.dev — Homepage", image: "/cases/gallery/seamm-homepage.jpg" },
  { title: "seamm.dev — For Brands", image: "/cases/gallery/seamm-brands.jpg" },
  { title: "seamm.dev — About", image: "/cases/gallery/seamm-about.jpg" },
  { title: "Frame 111", image: "/cases/gallery/frame-111.jpg" },
  { title: "Frame 110", image: "/cases/gallery/frame-110.jpg" },
  { title: "Animation", image: "/cases/gallery/animation.gif" },
  { title: "Screen 1.2", image: "/cases/gallery/screen-1-2.png" },
  { title: "Debattle", image: "/cases/gallery/debattle.jpg" },
  { title: "Landing page", image: "/cases/gallery/landing.jpg" },
];

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="px-6 md:px-10 pt-6 md:pt-10 pb-14">
            <div className="max-w-bleed mx-auto">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3">
                  Gallery · 2018–24
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  Other website design works
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  A selection of websites and landing pages I&rsquo;ve designed over
                  the years.
                </p>
              </FadeIn>
            </div>
          </header>

          <div className="px-6 md:px-10 pb-32">
            <div className="max-w-bleed mx-auto space-y-8 md:space-y-12">
              {gallery.map((g, i) => (
                <FadeIn key={g.image} delay={i * 0.04}>
                  <BrowserFrame url={g.title}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.image}
                      alt={g.title}
                      className="block w-full"
                      loading="lazy"
                    />
                  </BrowserFrame>
                </FadeIn>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
