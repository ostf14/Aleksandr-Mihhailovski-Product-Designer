import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-12">
                {GRAPHIC_ITEMS.map((item, i) => (
                  <FadeIn
                    key={item.src}
                    delay={(i % 2) * 0.05}
                    className={item.wide ? "md:col-span-2" : undefined}
                  >
                    <figure>
                      <div className="overflow-hidden rounded-xl border border-stone-200 bg-cream-warm dark:bg-cream-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading={i < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="block w-full h-auto"
                        />
                      </div>

                      <figcaption className="mt-3 flex flex-col gap-1">
                        <div className="flex items-baseline gap-3">
                          <span className="text-[0.95rem] text-charcoal">
                            {item.title}
                          </span>
                          <span className="font-mono text-[11px] text-charcoal/70">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-[0.875rem] leading-[1.5] text-charcoal/70">
                          {item.caption}
                        </p>
                        {item.href && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 self-start font-mono text-[11px] uppercase tracking-[0.12em] text-terracotta hover:opacity-80 transition-opacity"
                          >
                            {item.hrefLabel ?? "See it live"}
                            <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
                          </a>
                        )}
                      </figcaption>
                    </figure>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
