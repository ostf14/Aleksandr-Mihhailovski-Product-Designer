import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/MoreCases";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Callout } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { NumberedList } from "@/components/NumberedList";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { BrowserFrame } from "@/components/BrowserFrame";
import { ScrollToTop } from "@/components/ScrollToTop";
import { workMetadata } from "@/lib/works";

export const metadata = workMetadata("my-sleeping-gypsy");

const toc: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "competitive", label: "Competitive analysis", level: 2 },
  { id: "audience", label: "Audience", level: 2 },
  { id: "visual", label: "Visual industry analysis", level: 2 },
  { id: "design", label: "Design" },
  { id: "decisions", label: "Decisions" },
  { id: "lessons", label: "What I learned" },
];

const decisions = [
  {
    h: "Large hero imagery over product grid",
    p: "These dresses are hand-embroidered. You can’t see that in a 200px thumbnail. Large imagery lets the craft speak. Trade-off: fewer products per screen, but higher perceived quality.",
  },
  {
    h: "Story before shop",
    p: "‘Sustainability, Heritage, Culture’ — this needed to be the first thing visitors see, not the last. People who don’t care about this will bounce anyway. Better to filter early.",
  },
  {
    h: "Filter by type, not by price",
    p: "Price filtering turns browsing into comparison shopping. The audience doesn’t want the cheapest option — they want the right dress. Categories by type (long, midi, blouse) match how they actually think.",
  },
  {
    h: "No accent colors",
    p: "The research was clear: forced accent colors on fashion sites looked cheap. Black, white, and warm neutrals let the photography carry the visual weight.",
  },
];

const lessons = [
  {
    h: "Strategic friction",
    p: "Fast checkout and aggressive CTAs work for fast fashion but destroy premium positioning. Editorial pacing forces users to slow down and appreciate the craft. Sometimes good e-commerce design means adding friction, not removing it.",
  },
  {
    h: "Research before pixels",
    p: "Running competitive, audience, and visual analysis before designing saved me from copying patterns that don’t fit. Most competitors looked like generic marketplaces. The research made it clear: the site should feel like a brand, not a store.",
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
    <div className={`${className}`}>
      <div className="shell">
        <FadeIn className="shell-prose">
          <BrowserFrame url={url}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="block h-auto w-full"
              loading="lazy"
            />
          </BrowserFrame>
          {caption && (
            <figcaption className="mt-2.5 text-left font-mono text-xs text-muted">
              {caption}
            </figcaption>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

function SubHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <div className="shell">
        <FadeIn>
          <h3 className="shell-prose font-sans text-xl font-semibold tracking-tight md:text-2xl">
            {children}
          </h3>
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
          <header id="overview" className="scroll-mt-20 pb-14 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  E-Commerce · Web Design · 2022
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-sans text-hero font-semibold tracking-tight">
                  My Sleeping Gypsy
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-fg/70">
                  How to sell heritage craftsmanship without looking like fast
                  fashion.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="shell mt-10">
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <div className="grid grid-cols-1 gap-y-8 p-6 md:grid-cols-4 md:gap-y-0 md:p-8">
                  <div className="md:pr-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Role
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                      Web Designer
                    </p>
                  </div>

                  <div className="md:border-l md:border-line md:px-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Company
                    </div>
                    <ul className="space-y-1.5 text-xs leading-[1.55] text-fg/90">
                      {["UPROCK", "My Sleeping Gypsy"].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[7px] inline-block size-1.5 shrink-0 rounded-full bg-mark"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:border-l md:border-line md:px-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Timeline
                    </div>
                    <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                      2022
                    </p>
                  </div>

                  <div className="md:border-l md:border-line md:pl-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      Focus
                    </div>
                    <ul className="space-y-1.5 text-xs leading-[1.55] text-fg/90">
                      {[
                        "E-commerce redesign",
                        "Design system",
                        "UX research",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[7px] inline-block size-1.5 shrink-0 rounded-full bg-mark"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-line px-6 py-4 md:flex-row md:items-center md:gap-4 md:px-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Full case
                  </span>
                  <a
                    href="https://www.behance.net/gallery/136903557/MY-SLEEPING-GYPSY-redesign-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.95rem] text-fg/90 transition-colors hover:text-accent"
                  >
                    View on Behance
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                </div>
              </div>
            </FadeIn>

            <div className="mt-14">
              <ImagePlaceholder
                label="My Sleeping Gypsy — brand identity meets digital"
                src="/cases/msg/cover.webp"
                wide
              />
            </div>
          </header>

          {/* Context */}
          <div id="context" className="mt-16 scroll-mt-20 pb-32">
            <Section
              kicker="01 · Context"
              heading="A premium product on a generic-looking site"
            >
              <Prose>
                <p>
                  My Sleeping Gypsy is a women’s clothing brand that makes
                  handmade embroidered linen pieces — dresses, skirts, blouses,
                  suits — priced at €300–800. Everything is locally produced,
                  hand-embroidered, made to order.
                </p>
                <p>
                  The existing site worked functionally, but had zero stylistic
                  integrity. It looked like a generic marketplace, not a premium
                  brand. The visual gap between the product quality and the site
                  quality was massive.
                </p>
              </Prose>

              <Callout className="mt-10" label="The goal">
                Redesign the e-commerce experience so the site feels as premium
                as the product — without losing existing usability.
              </Callout>
            </Section>
          </div>

          {/* Research */}
          <div id="research" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · Research"
              heading="Three parallel analyses before any pixels"
            >
              <Prose>
                <p>
                  I ran three streams in parallel — competitive, audience, and
                  visual industry analysis — before touching the design tool.
                  The goal was to understand what makes premium fashion sites
                  read as premium, so the redesign wouldn’t default to standard
                  e-commerce patterns.
                </p>
              </Prose>
            </Section>

            {/* Competitive analysis */}
            <div className="mt-14">
              <SubHeading id="competitive">
                Competitive analysis (8 direct competitors)
              </SubHeading>
              <NumberedList
                className="mt-5"
                items={[
                  "Most competitors had no real brand positioning — their sites were just storefronts with a product grid.",
                  "The ones that stood out used editorial photography and brand storytelling, not discounts or aggressive CTAs.",
                  "High-quality photos and thoughtful product descriptions were the strongest purchase motivators — not designer fame or price drops.",
                  "Navigation was messy across the board: collection names in the main nav that meant nothing to first-time visitors, important pages buried in footers.",
                ]}
              />
            </div>

            {/* Audience */}
            <div className="mt-14">
              <SubHeading id="audience">Audience</SubHeading>
              <NumberedList
                className="mt-5"
                items={[
                  "Women, 25–45, income $2 000+/month.",
                  "They research before buying. Clothing is treated as an investment, not an impulse purchase.",
                  "Lifestyle: cultural events, fashion-conscious, values craftsmanship and individuality.",
                ]}
              />

              <Callout className="mt-10" label="Key insight">
                The audience doesn’t comparison-shop on price. They compare on
                perceived quality. The site needs to feel like a fashion
                editorial, not a product catalog.
              </Callout>
            </div>

            {/* Visual industry analysis */}
            <div className="mt-14">
              <SubHeading id="visual">
                Visual industry analysis (Awwwards-level fashion sites)
              </SubHeading>
              <NumberedList
                className="mt-5"
                items={[
                  "Headings: serif fonts, large sizes referencing print magazine typography.",
                  "Body: grotesque fonts, Regular weight, sometimes Light or uppercase.",
                  "Colors: either pure black/white or soft pastels — any forced accent color looked cheap.",
                  "Photography: emphasis on details and emotional model shoots, not plain product shots.",
                  "Buttons: rectangular, outlined, minimal — filled buttons looked out of place.",
                ]}
              />

              <Callout className="mt-10" label="Design decision">
                Based on the research: Baskerville for headings (editorial,
                timeless) + Suisse Intl for body (clean, modern). Light pastel
                palette. Photography-first layout. No accent colors that compete
                with the product.
              </Callout>
            </div>
          </div>

          {/* Design */}
          <div id="design" className="scroll-mt-20 pb-32">
            <Section
              kicker="03 · Design"
              heading="Editorial pacing, end to end"
            >
              <Prose>
                <p>
                  The redesign treats the catalog like a magazine spread: large
                  imagery, generous whitespace, and a story-first homepage that
                  lets the brand breathe before any price tag appears.
                </p>
              </Prose>
            </Section>

            <BrowserShot
              className="mt-8"
              src="/cases/msg/main-page.png"
              alt="Homepage layout"
              caption="Homepage."
            />

            <BrowserShot
              className="mt-8"
              src="/cases/msg/catalog.png"
              alt="Catalog page"
              url="mysleepinggypsy.com/shop"
              caption="Catalog."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/catalog-mobile.png"
              label="Catalog mobile layout"
              caption="Catalog — mobile."
            />

            <BrowserShot
              className="mt-8"
              src="/cases/msg/item-page.png"
              alt="Product page"
              url="mysleepinggypsy.com/shop/linen-dress"
              caption="Product page."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/item-mobile.png"
              label="Product page mobile"
              caption="Product page — mobile."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/checkout.png"
              label="Cart, checkout, payment"
              caption="Cart, checkout, payment."
            />

            <ImagePlaceholder
              className="mt-8"
              src="/cases/msg/fonts.png"
              label="Typography specimen"
              caption="Typography: Baskerville + Suisse Intl."
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
              label="12-column grid system"
              caption="12-column grid system."
            />
          </div>

          {/* Decisions */}
          <div id="decisions" className="scroll-mt-20 pb-32">
            <Section
              kicker="04 · Decisions"
              heading="Four design calls that shaped the brief"
            >
              <Prose>
                <p>
                  Each decision pulled the design further from default
                  e-commerce patterns. Together they signal: this product is for
                  someone who reads the story.
                </p>
              </Prose>
            </Section>

            <div className="mt-8 space-y-6">
              {decisions.map((d) => (
                <Callout key={d.h} label="Design decision">
                  <strong className="mb-2 block font-medium text-fg">
                    {d.h}
                  </strong>
                  <span className="text-fg/85">{d.p}</span>
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
              <div className="">
                <div className="shell">
                  <div className="shell-prose">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                      {lessons.map((r, i) => (
                        <FadeIn key={r.h} delay={i * 0.08} className="h-full">
                          <div className="group flex h-full flex-col rounded-lg bg-surface p-5 transition-all duration-200 ease-out md:p-6 md:hover:-translate-y-1 md:hover:bg-surface-deep md:hover:shadow-sm">
                            <div className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 ease-out md:group-hover:text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <h3 className="mb-3 text-base font-medium leading-snug tracking-tight md:text-[1.0625rem]">
                              {r.h}
                            </h3>
                            <p className="text-[0.9375rem] leading-[1.55] text-fg/80">
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

          <MoreCases currentId="my-sleeping-gypsy" />
        </article>
      </main>

      <Footer />
    </>
  );
}
