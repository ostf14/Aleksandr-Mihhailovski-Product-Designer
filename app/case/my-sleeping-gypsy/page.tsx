import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { BrowserFrame } from "@/components/BrowserFrame";
import { ScrollToTop } from "@/components/ScrollToTop";

const toc: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "design", label: "Design" },
  { id: "decisions", label: "Decisions" },
  { id: "lessons", label: "What I learned" },
];

const decisions = [
  {
    h: "Large hero imagery over product grid",
    p: "Users need to see embroidery detail to understand value. Thumbnail grids commoditize the product. Trade-off: fewer products per screen, but higher perceived quality.",
  },
  {
    h: "‘Sustainability, Heritage, Culture’ above the fold",
    p: "Brand story must be communicated before price. Users who don’t care about sustainability will bounce anyway — better to filter early.",
  },
  {
    h: "Minimal product filtering (by type, not price/discount)",
    p: "Price filtering encourages comparison shopping. We want users to browse by aesthetic, not by ‘cheapest option.’",
  },
  {
    h: "Typography system: Baskerville + Suisse Intl",
    p: "Baskerville = editorial, timeless. Suisse Intl = modern usability. The pairing signals ‘heritage meets contemporary.’",
  },
];

const lessons = [
  {
    h: "Strategic friction",
    p: "Premium e-commerce requires strategic friction. Fast checkout and aggressive CTAs work for fast fashion — but destroy luxury positioning. Editorial pacing forces users to slow down and appreciate craftsmanship.",
  },
  {
    h: "The right friction filters",
    p: "Story-first layout filters out price-comparison shoppers. Generous whitespace signals brand confidence. Sometimes good design isn’t about removing friction — it’s about adding the right kind.",
  },
];

function BrowserShot({
  src,
  alt,
  url = "mysleepinggypsy.com",
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  url?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <FadeIn className="max-w-prose mx-auto">
          <BrowserFrame url={url}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="block w-full h-auto" loading="lazy" />
          </BrowserFrame>
          {caption && (
            <figcaption className="mt-2.5 font-mono text-xs text-stone-500 text-left">
              {caption}
            </figcaption>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <TableOfContents items={toc} />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          {/* Hero */}
          <header
            id="overview"
            className="scroll-mt-20 px-6 md:px-10 pt-6 md:pt-10 pb-14"
          >
            <div className="max-w-bleed mx-auto">
              <FadeIn>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3">
                  E-Commerce · Web Design · 2022
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  My Sleeping Gypsy
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-charcoal/70">
                  How to sell heritage craftsmanship without looking like fast fashion.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="max-w-bleed mx-auto mt-10">
              <div className="border border-stone-200 bg-cream-warm rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0">
                <div className="md:pr-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">
                    Web Designer
                  </p>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Company
                  </div>
                  <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                    {["UPROCK", "My Sleeping Gypsy"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="inline-block size-1.5 rounded-full bg-terracotta shrink-0 mt-[7px]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:px-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Timeline
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-charcoal/90">2022</p>
                </div>

                <div className="md:pl-6 md:border-l md:border-stone-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3">
                    Focus
                  </div>
                  <ul className="text-xs leading-[1.55] text-charcoal/90 space-y-1.5">
                    {["UX/UI redesign", "E-commerce design", "Design system"].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="inline-block size-1.5 rounded-full bg-terracotta shrink-0 mt-[7px]"
                          />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <div className="mt-14">
              <ImagePlaceholder
                label="My Sleeping Gypsy — brand identity meets digital"
                src="/cases/msg/cover.png"
                wide
              />
            </div>
          </header>

          {/* Context */}
          <div id="context" className="scroll-mt-20 mt-16 pb-32">
            <Section kicker="01 · Context" heading="Heritage at a fast-fashion price tag">
              <Prose>
                <p>
                  My Sleeping Gypsy is a sustainable fashion brand selling handmade
                  embroidered linen pieces at €300–800 per item. Each piece is finished by
                  hand, with embroidery details that can take days to complete.
                </p>
                <p>
                  The challenge: competing with fast-fashion brands in the same search
                  results while maintaining premium positioning — and communicating
                  craftsmanship value before the visitor sees the price.
                </p>
              </Prose>

              <Callout className="mt-10" label="The goal">
                How do you design an e-commerce experience that elevates heritage
                craftsmanship without applying standard conversion patterns that
                commoditize premium products?
              </Callout>
            </Section>
          </div>

          {/* Research */}
          <div id="research" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Research" heading="How luxury differentiates online">
              <Prose>
                <p>
                  I analyzed how editorial and luxury fashion brands differentiate through
                  digital experience — looking at hierarchy, pacing, photography, and the
                  invitations they extend to first-time visitors.
                </p>
              </Prose>

              <div className="px-6 md:px-10 mt-8">
                <div className="max-w-4xl mx-auto">
                  <FadeIn className="max-w-prose mx-auto">
                    <ul className="space-y-3 text-[1.0625rem] leading-[1.55] text-charcoal/90">
                      {[
                        ["Reformation", "Editorial photography, slow scroll pacing."],
                        ["Jenni Kayne", "Story-first, shop-second hierarchy."],
                        ["Ganni", "Bold color systems, pattern-forward layouts."],
                      ].map(([brand, note]) => (
                        <li key={brand} className="flex items-baseline gap-3">
                          <span
                            aria-hidden
                            className="inline-block size-1.5 rounded-full bg-terracotta shrink-0 translate-y-[-2px]"
                          />
                          <span>
                            <span className="font-medium">{brand}</span>
                            <span className="text-charcoal/70"> — {note}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </div>
              </div>

              <Callout className="mt-10" label="Key insight">
                Standard e-commerce patterns — aggressive CTAs, price-first layouts,
                thumbnail grids — work for fast fashion but destroy premium positioning.
              </Callout>
            </Section>
          </div>

          {/* Design */}
          <div id="design" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Design" heading="Editorial pacing, end to end">
              <Prose>
                <p>
                  The redesign treats the catalog like a magazine spread: large imagery,
                  generous whitespace, and a story-first homepage that lets the brand
                  breathe before any price tag appears.
                </p>
              </Prose>
            </Section>

            <BrowserShot
              className="mt-8"
              src="/cases/msg/main-page.png"
              alt="Homepage layout"
              caption="Homepage: story before shop."
            />

            <BrowserShot
              className="mt-8"
              src="/cases/msg/catalog.png"
              alt="Catalog page"
              url="mysleepinggypsy.com/shop"
              caption="Catalog: editorial product grid."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/catalog-mobile.png"
              label="Catalog mobile layout"
              caption="Catalog: mobile experience."
            />

            <BrowserShot
              className="mt-8"
              src="/cases/msg/item-page.png"
              alt="Product page"
              url="mysleepinggypsy.com/shop/linen-dress"
              caption="Product page: craftsmanship in focus."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/item-mobile.png"
              label="Product page mobile"
              caption="Product page: mobile detail."
            />

            <BrowserShot
              className="mt-8"
              src="/cases/msg/checkout.png"
              alt="Cart and checkout"
              url="mysleepinggypsy.com/checkout"
              caption="Cart, checkout, payment."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/fonts.png"
              label="Typography specimen"
              caption="Typography system: Baskerville + Suisse Intl."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/colors.png"
              label="Color palette"
              caption="Color palette."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/grid.png"
              label="Responsive grid system"
              caption="Responsive grid system."
            />
          </div>

          {/* Decisions */}
          <div id="decisions" className="scroll-mt-20 pb-32">
            <Section kicker="04 · Decisions" heading="Four design calls that shaped the brief">
              <Prose>
                <p>
                  Each decision pulled the design further from default e-commerce
                  patterns. Together they signal: this product is for someone who reads
                  the story.
                </p>
              </Prose>
            </Section>

            <div className="mt-8 space-y-6">
              {decisions.map((d) => (
                <Callout key={d.h} label="Design decision">
                  <strong className="block mb-2 font-medium text-charcoal">
                    {d.h}
                  </strong>
                  <span className="text-charcoal/85">{d.p}</span>
                </Callout>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div id="lessons" className="scroll-mt-20 pb-32">
            <Section
              kicker="05 · Lessons"
              heading={
                <>
                  What I <em>learned</em>
                </>
              }
            >
              <div className="px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                  <div className="max-w-prose mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      {lessons.map((r, i) => (
                        <FadeIn key={r.h} delay={i * 0.08} className="h-full">
                          <div className="group h-full bg-cream-warm rounded-lg p-5 md:p-6 flex flex-col transition-all duration-200 ease-out md:hover:-translate-y-1 md:hover:bg-cream-deep md:hover:shadow-sm">
                            <div className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium mb-3 transition-colors duration-200 ease-out md:group-hover:text-terracotta">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <h3 className="text-base md:text-[1.0625rem] font-medium tracking-tight leading-snug mb-3">
                              {r.h}
                            </h3>
                            <p className="text-[0.9375rem] leading-[1.55] text-charcoal/80">
                              {r.p}
                            </p>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <MoreCases currentId="msg" />
        </article>
      </main>

      <Footer />
    </>
  );
}
