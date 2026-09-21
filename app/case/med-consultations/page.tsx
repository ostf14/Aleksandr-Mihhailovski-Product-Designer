import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { GraphicGallery } from "@/components/GraphicGallery";
import { MoreCases } from "@/components/MoreCases";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { TestimonialBeside } from "@/components/TestimonialVideo";
import { testimonialsForWork } from "@/lib/testimonials";
import { workMetadata } from "@/lib/works";
import type { GraphicItem } from "@/lib/graphic";

export const metadata = workMetadata("med-consultations");

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "constraint", label: "The line she cannot cross" },
  { id: "positioning", label: "Selling understanding" },
  { id: "slides", label: "Five slides" },
  { id: "voice", label: "Drawn, not diagrammed" },
  { id: "testimonial", label: "What Oksana says" },
];

/**
 * The carousel, in the order it was published.
 *
 * Reusing GraphicGallery rather than laying these out by hand: it already has
 * the grid, the lightbox and the caption treatment, and these slides need all
 * three — the lightbox is how you actually read one.
 *
 * span 3 is two to a row. They sit on the text measure rather than the full
 * shell, so the reading column does not change width halfway down the page:
 * at three across in the wide container they stuck out past every paragraph
 * above them, and each slide was small enough that the type on it was a
 * texture rather than words.
 */
const slides: GraphicItem[] = [
  {
    src: "/cases/med-consultations/hook.webp",
    span: 3,
    alt: "Opening slide — the doctor told you what to do, and is it clear why?",
    caption:
      "The question a patient has and rarely asks out loud — with the price in plain sight, not behind a “contact for details”.",
  },
  {
    src: "/cases/med-consultations/for-you-if.webp",
    span: 3,
    alt: "Slide listing who the consultation is for",
    caption:
      "Who it is for, written as three situations you recognise rather than three services you have to interpret.",
  },
  {
    src: "/cases/med-consultations/how-it-works.webp",
    span: 3,
    alt: "Slide explaining the four steps of the consultation",
    caption:
      "The mechanism in four steps, so the hour has a shape before you agree to pay for it.",
  },
  {
    src: "/cases/med-consultations/result.webp",
    span: 3,
    alt: "Slide describing the document you receive",
    caption:
      "What you leave with. Naming the document is what turns a conversation into something you receive.",
  },
  {
    src: "/cases/med-consultations/expertise.webp",
    span: 3,
    alt: "Slide covering scientific background and international practice",
    caption: "Credentials last, once there is a reason to care about them.",
  },
];

export default function Page() {
  const testimonials = testimonialsForWork("med-consultations");

  return (
    <>
      <Nav />
      <TableOfContents items={toc} />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header id="overview" className="scroll-mt-20 pb-14 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Oksana Stanevich · 2025
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-sans text-hero font-semibold tracking-tight">
                  Consultation About Information
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-fg/70">
                  A doctor who is not allowed to give medical advice. So what is
                  she selling?
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="shell mt-10">
              <div className="grid grid-cols-1 gap-y-8 rounded-lg border border-line bg-surface p-6 md:grid-cols-4 md:gap-y-0 md:p-8">
                <div className="md:pr-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Overview
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    Positioning, content structure and visual identity for a
                    paid consultation run by an infectious-disease researcher.
                    The whole brief turned on one legal fact.
                  </p>
                </div>

                <div className="md:border-l md:border-line md:px-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    My role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    Brand and content strategy, copy, slide design
                  </p>
                </div>

                <div className="md:border-l md:border-line md:px-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs leading-[1.55] text-fg/90">
                    {[
                      "Positioning and messaging",
                      "A five-slide service narrative",
                      "Illustration and type treatment",
                      "The standing disclaimer",
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

                <div className="md:border-l md:border-line md:pl-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Result
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    A service that explains itself in five slides. Oksana’s own
                    account of it is at the bottom of this page.
                  </p>
                </div>
              </div>
            </FadeIn>
          </header>

          <div id="constraint" className="scroll-mt-20 pb-32">
            <Section kicker="01 · Context" heading="The line she cannot cross">
              <Prose>
                <p>
                  Oksana Stanevich is a researcher in infectious diseases,
                  published in Nature, BMC and Frontiers, with practice ranging
                  from projects with St&nbsp;Thomas’&nbsp;Hospital in London to
                  Médecins Sans Frontières. She wanted to sell an hour of her
                  time to people who are lost: a diagnosis nobody explained, a
                  prescription they do not understand, a healthcare system they
                  cannot navigate.
                </p>
                <p>
                  She is not their treating doctor. She cannot diagnose them,
                  cannot change what they have been prescribed, cannot tell them
                  what to do. Anything that reads as medical advice is both
                  legally dangerous and, more to the point, untrue.
                </p>
                <p>
                  The usual way out is to hedge: marketing copy that promises
                  what a disclaimer at the bottom quietly takes back. That is a
                  service nobody can trust, sold to people whose whole problem
                  is that they have stopped being able to tell who to trust.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="positioning" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · Positioning"
              heading="Selling understanding, not advice"
            >
              <Prose>
                <p>
                  So the limit stopped being a disclaimer and became the
                  product. She is not selling a second opinion on your
                  treatment. She is selling an understanding of the treatment
                  you already have.
                </p>
              </Prose>

              <div className="shell mt-8">
                <div className="shell-prose">
                  <Callout label="The line the whole service hangs on">
                    A consultation about information — not medical advice.
                  </Callout>
                </div>
              </div>

              <Prose className="mt-8">
                <p>
                  It is accurate, and it is also the better offer. A second
                  opinion you are not in a position to act on is worth little.
                  Knowing what your own plan actually says, what each test is
                  for, and how the same case would be treated somewhere else is
                  worth a great deal — and it is the thing she can legitimately
                  give.
                </p>
                <p>
                  The same sentence fixed the other end of the funnel. What the
                  buyer gets is not a cure, it is a change of position: you stop
                  being a passive patient and start taking part in the process,
                  with your mind rather than only your body. The disclaimer that
                  would normally be set in grey 8pt at the bottom runs across
                  the top of every slide instead, in the same weight as
                  everything else. Nothing on the card contradicts it, so it
                  costs nothing to say out loud.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="slides" className="scroll-mt-20 pb-32">
            <Section
              kicker="03 · Structure"
              heading="The service, as five slides"
            >
              <Prose>
                <p>
                  “I will explain things to you” is not a product. Five slides
                  give it edges a stranger can hold, and the order is the order
                  a sceptical reader needs: recognise yourself, understand the
                  mechanism, see what you are handed, and only then check who is
                  handing it to you.
                </p>
              </Prose>

              <div className="shell mt-10">
                <div className="shell-prose">
                  <GraphicGallery items={slides} />
                </div>
              </div>
            </Section>
          </div>

          <div id="voice" className="scroll-mt-20 pb-32">
            <Section kicker="04 · Visual" heading="Drawn, not diagrammed">
              <Prose>
                <p>
                  Hand-drawn line illustration, a washed coral, one typeface. A
                  medical service drawn in medical style is a hospital form, and
                  someone reading this has had enough of those lately. The
                  drawings are single-stroke and deliberately unsteady: a
                  tangled scribble inside a speech bubble for being lost in the
                  system, two puzzle pieces for taking a plan apart, a flag at
                  the end of a dotted path for the roadmap.
                </p>
                <p>
                  The coral is washed back to a watercolour rather than left at
                  full strength. A saturated red on a medical card reads as a
                  result you did not want.
                </p>
              </Prose>
            </Section>
          </div>

          {testimonials.length > 0 && (
            <div id="testimonial" className="scroll-mt-20 pb-32">
              <Section kicker="05 · Client" heading="What Oksana says">
                <div className="shell">
                  <div className="shell-prose space-y-10">
                    {testimonials.map((item) => (
                      <TestimonialBeside key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </Section>
            </div>
          )}

          <MoreCases currentId="med-consultations" />
        </article>
      </main>

      <Footer />
    </>
  );
}
