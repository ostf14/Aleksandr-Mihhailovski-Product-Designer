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
  { id: "constraint", label: "Why not advice" },
  { id: "positioning", label: "The one line" },
  { id: "slides", label: "Five slides" },
  { id: "voice", label: "Drawn by hand" },
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
      "Three situations to recognise yourself in, instead of three services to interpret.",
  },
  {
    src: "/cases/med-consultations/how-it-works.webp",
    span: 3,
    alt: "Slide explaining the four steps of the consultation",
    caption:
      "The four steps of the session, so it has a shape before you pay for it.",
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
                  Medical Consultations
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-fg/70">
                  She is not allowed to give medical advice. So what does she
                  sell?
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
                    She is a researcher, not the patient’s doctor. No diagnosis,
                    no prescriptions, no instructions.
                  </p>
                </div>
              </div>
            </FadeIn>
          </header>

          <div id="constraint" className="scroll-mt-20 pb-32">
            <Section kicker="01 · Context" heading="Why not advice">
              <Prose>
                <p>
                  Oksana Stanevich researches infectious diseases. She has
                  published in Nature, BMC and Frontiers, and worked on projects
                  with St&nbsp;Thomas’&nbsp;Hospital in London and Médecins Sans
                  Frontières.
                </p>
                <p>
                  People come to her in three situations. The diagnosis is
                  unclear or the treatment has stalled. They doubt the
                  prescriptions and the tests they have been given. Or they
                  cannot find their way around the healthcare system at all.
                </p>
                <p>
                  She is not their doctor. She cannot diagnose, cannot change a
                  prescription, cannot tell anyone what to do. Every line I
                  wrote had to stay on the right side of that.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="positioning" className="scroll-mt-20 pb-32">
            <Section kicker="02 · Positioning" heading="The one line">
              <Prose>
                <p>
                  The service is not a second opinion on your treatment. It is
                  an explanation of the treatment you already have.
                </p>
              </Prose>

              <div className="shell mt-8">
                <div className="shell-prose">
                  <Callout label="Runs across the top of every slide">
                    A consultation about information, not medical advice.
                  </Callout>
                </div>
              </div>

              <Prose className="mt-8">
                <p>
                  It sits at the top of each slide in the same size as
                  everything else, not in grey at the bottom. Nothing on the
                  slides contradicts it, so it costs nothing to say first.
                </p>
                <p>
                  The promise is the other half. You stop being a passive
                  patient and take part in the process with your mind, not only
                  your body.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="slides" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Structure" heading="Five slides">
              <Prose>
                <p>
                  Ninety minutes of someone’s time is not a product. Five slides
                  give it edges: the question you already have, who this is for,
                  what happens in the session, what you are left holding, and
                  who she is.
                </p>
                <p>
                  Credentials go last. Nature, BMC, Frontiers, St&nbsp;Thomas’
                  and MSF are the strongest material in the brief, and on the
                  first slide they are a CV. On the fifth, once a reader has
                  recognised their own situation, they are proof.
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
            <Section kicker="04 · Visual" heading="Drawn by hand">
              <Prose>
                <p>
                  Hand-drawn line illustrations, a washed-out coral, one
                  typeface. A scribble inside a speech bubble for being lost in
                  the system, two puzzle pieces for taking a plan apart, a flag
                  at the end of a dotted path for the roadmap.
                </p>
                <p>
                  Whoever is reading this is usually in the middle of the thing
                  the service is about. A medical subject drawn in medical style
                  is a hospital form, and they have seen enough of those lately.
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
