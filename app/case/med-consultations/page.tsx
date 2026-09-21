import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { GraphicGallery } from "@/components/GraphicGallery";
import { MoreCases } from "@/components/MoreCases";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { TestimonialGrid } from "@/components/TestimonialsSection";
import { testimonialsForWork } from "@/lib/testimonials";
import { workMetadata } from "@/lib/works";
import type { GraphicItem } from "@/lib/graphic";

export const metadata = workMetadata("med-consultations");

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "constraint", label: "A doctor without a licence" },
  { id: "positioning", label: "Sell the explanation" },
  { id: "slides", label: "Five slides" },
  { id: "voice", label: "Medical, but warm" },
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
      "The opening question, and the price in plain sight rather than behind a contact form.",
  },
  {
    src: "/cases/med-consultations/for-you-if.webp",
    span: 3,
    alt: "Slide listing who the consultation is for",
    caption:
      "The diagnosis is unclear. The prescriptions are in doubt. The system makes no sense.",
  },
  {
    src: "/cases/med-consultations/how-it-works.webp",
    span: 3,
    alt: "Slide explaining the four steps of the consultation",
    caption:
      "Break down the plan, go through the tests one by one, compare against international standards, draw the route.",
  },
  {
    src: "/cases/med-consultations/result.webp",
    span: 3,
    alt: "Slide describing the document you receive",
    caption:
      "The document you leave with. A structured overview, options to raise with your own doctor, and a route through the system.",
  },
  {
    src: "/cases/med-consultations/expertise.webp",
    span: 3,
    alt: "Slide covering scientific background and international practice",
    caption:
      "Publications, international practice, complex cases, and how she works with you.",
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
                  Positioning and Design for Medical Consultations
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-fg/70">
                  An experienced doctor with no licence to use it. So what does
                  she sell?
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
                    Positioning, content and visual identity for a paid
                    consultation service. Ninety minutes, 800 shekels, sold as a
                    five-slide carousel.
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
                      "Positioning line",
                      "Five slides, written and designed",
                      "Illustration and type",
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
                    The constraint
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    An infectious disease physician, MD, with no active licence
                    in Israel. She can explain, but she cannot treat.
                  </p>
                </div>
              </div>
            </FadeIn>
          </header>

          <div id="constraint" className="scroll-mt-20 pb-32">
            <Section kicker="01 · Context" heading="A doctor without a licence">
              <Prose>
                <p>
                  Oksana Stanevich is an infectious disease physician with an MD
                  and a research career behind her. She has published in Nature,
                  BMC and Frontiers, and worked on projects with
                  St&nbsp;Thomas’&nbsp;Hospital in London and Médecins Sans
                  Frontières.
                </p>
                <p>
                  She does not hold an active medical licence in Israel, where
                  she lives, so she cannot diagnose, prescribe or treat there.
                </p>
                <p>
                  People keep asking her anyway, and they arrive in three
                  situations. The diagnosis is unclear or the treatment has
                  stalled. They doubt the prescriptions and the tests they have
                  been given. Or they cannot find their way around a health
                  system that runs in a language and a logic they do not know.
                </p>
                <p>
                  She wanted to sell those conversations, and there are two ways
                  to write that offer badly. Promise treatment and it is
                  illegal. Hedge every sentence instead and it reads like
                  someone selling hope. The copy had to avoid both at once.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="positioning" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · Positioning"
              heading="Sell the explanation, not the treatment"
            >
              <Prose>
                <p>
                  What she can still give is the thing her patients are missing
                  anyway. Not another opinion on what to do, but an
                  understanding of the plan they already have.
                </p>
              </Prose>

              <div className="shell mt-8">
                <div className="shell-prose">
                  <Callout label="Across the top of every slide">
                    A consultation about information, not medical advice.
                  </Callout>
                </div>
              </div>

              <Prose className="mt-8">
                <p>
                  That line is the legal boundary and the description of the
                  product at the same time. A disclaimer usually hides in grey
                  type at the bottom. This one runs across the top of every
                  slide, in the same size as everything else, because it is also
                  the offer.
                </p>
                <p>
                  The last line of the third slide says what the money buys. You
                  stop being a passive patient and start taking part in the
                  process, with your mind and not just your body.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="slides" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Structure" heading="Five slides">
              <Prose>
                <p>
                  Saying that is not the same as selling it. An appointment is
                  not a product until someone can picture it, so the offer is
                  five slides, published as a carousel.
                </p>
                <p>
                  They run in the order a sceptical reader needs. First the
                  question they already have and have not said out loud. Then
                  the three situations, so they can find themselves in one. Then
                  what happens in the consultation. Then the document they are
                  left holding. And only after that, who she is.
                </p>
                <p>
                  Credentials go last on purpose. Nature, BMC, Frontiers,
                  St&nbsp;Thomas’ and MSF are the strongest material in the
                  brief, and on slide one they are a CV. On slide five, once
                  someone has recognised their own situation, they are the
                  reason to believe the rest.
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
            <Section kicker="04 · Visual" heading="Medical, but warm">
              <Prose>
                <p>
                  Hospital design is cold, and whoever is reading this is
                  frightened already. So the slides use the signals of medicine
                  and turn the temperature up on every one of them.
                </p>
                <p>
                  Paper, because paper is what a doctor hands you. White and
                  pastel, because that is what a clinic looks like. Red, because
                  red is blood and the cross and the heart. Then the red is
                  washed out to a coral, the paper is drawn by hand instead of
                  printed, and the same signals read as calm rather than
                  clinical.
                </p>
                <p>
                  The screen is cold in the same way. This is a carousel in a
                  feed, read on a phone, offered by someone you will only ever
                  meet on a video call. So the paper and the pencil push against
                  two things at once: the hospital, and the glass it is all
                  being read through.
                </p>
              </Prose>
            </Section>
          </div>

          {testimonials.length > 0 && (
            <div id="testimonial" className="scroll-mt-20 pb-32">
              <Section kicker="05 · Client" heading="What Oksana says">
                <div className="shell">
                  <div className="shell-prose">
                    <TestimonialGrid items={testimonials} />
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
