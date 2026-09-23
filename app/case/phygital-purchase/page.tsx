import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { MoreCases } from "@/components/MoreCases";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Prose } from "@/components/Section";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { workMetadata } from "@/lib/works";

export const metadata = workMetadata("phygital-purchase");

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Limited editions of something infinite" },
  { id: "item-page", label: "Explaining the item before the price" },
  { id: "choice", label: "One sheet, two sellers" },
  { id: "qr-loop", label: "The loop through the QR code", level: 2 },
  { id: "states", label: "When an option isn’t there" },
  { id: "payment", label: "Paying, and when it fails" },
  { id: "result", label: "Shipped" },
];

/** Same shape as the one in my-sleeping-gypsy: a sub-heading on the text
 *  measure, not a component — there are two of these on the whole site. */
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
          <header id="overview" className="scroll-mt-20 pb-14 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Seamm
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="font-sans text-hero font-semibold tracking-tight">
                  Phygital Purchase
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-[42rem] text-[1.125rem] leading-[1.55] text-fg/70">
                  iOS purchase flow for fashion items sold as digital-only or as
                  a physical piece with a digital twin
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="shell mt-10">
              <div className="grid grid-cols-1 gap-y-8 rounded-lg border border-line bg-surface p-6 md:grid-cols-4 md:gap-y-0 md:p-8">
                <div className="md:pr-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Project
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    Phygital Purchase · Seamm
                  </p>
                </div>

                <div className="md:border-l md:border-line md:px-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Role
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    Product Designer, UX and UI
                  </p>
                </div>

                <div className="md:border-l md:border-line md:px-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Platform
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    iOS
                  </p>
                </div>

                <div className="md:border-l md:border-line md:pl-6">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Status
                  </div>
                  <p className="text-[0.95rem] leading-[1.55] text-fg/90">
                    Shipped
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="mt-14">
              <ImagePlaceholder
                label="Choosing between a digital-only item and a physical piece with a digital twin"
                caption="Choosing between a digital-only item and a physical piece with a digital twin"
                src="/cases/phygital-purchase/cover.webp"
                wide
              />
            </div>
          </header>

          <div id="context" className="mt-32 scroll-mt-20 pb-32">
            <Section
              kicker="01 · Context"
              heading="Limited editions of something infinite"
            >
              <Prose>
                <p>
                  SEAMM was a digital fashion app. Every item from a partner
                  brand had a digital twin that you could keep in your wardrobe,
                  wear and take into games.
                </p>
                <p>
                  A digital item can be copied without limit. SEAMM still
                  released digital items in limited editions on purpose, to
                  create scarcity.
                </p>
                <p>
                  An item could also exist in two forms, and each form had its
                  own seller. A phygital item is a real piece of clothing that
                  the brand sells on its own website. It comes with a QR code,
                  and the code unlocks its digital twin in the app. A
                  digital-only item has no physical piece. It is a 2D or 3D
                  model for Decentraland, Roblox or Minecraft, and SEAMM sells
                  it right in the app.
                </p>
                <p>
                  Both ideas were new for most people, and the buyer had to
                  understand the difference before paying. The first version of
                  the item page had a single buy button, and that stopped
                  working once an item could come in two forms.
                </p>
              </Prose>
            </Section>
          </div>

          <div id="item-page" className="scroll-mt-20 pb-32">
            <Section
              kicker="02 · Item page"
              heading="Explaining the item before the price"
            >
              <Prose>
                <p>
                  The old Details section became a Features block with three
                  yes/no attributes: digital-only, phygital and transferable.
                  Each of the first two has an (i) button that opens a short
                  story explaining the term. A separate block shows which
                  virtual worlds the item can go to.
                </p>
                <p>
                  The main button changed from a direct purchase to
                  &ldquo;Buying options&rdquo;, and the price on the page starts
                  with &ldquo;from&rdquo;. The interface says upfront that there
                  is a choice to make.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="The item page, collapsed and expanded. The price starts “from”, the main button leads to buying options, and each form in Features has an (i) that opens a short explanation"
              caption="The item page, collapsed and expanded. The price starts “from”, the main button leads to buying options, and each form in Features has an (i) that opens a short explanation"
              src="/cases/phygital-purchase/01-item-page.webp"
            />
          </div>

          <div id="choice" className="scroll-mt-20 pb-32">
            <Section kicker="03 · Choice" heading="One sheet, two sellers">
              <Prose>
                <p>
                  &ldquo;Buying options&rdquo; opens a sheet with both forms of
                  the item, and each option has one sentence about what you get.
                </p>
                <p>
                  Two buy buttons right on the item page would show two prices
                  and two sellers before the buyer understands the difference.
                  The sheet shows the options only after the buyer decides to
                  buy. The item page also stays the same whether an item has one
                  form or two.
                </p>
                <p>
                  The counter of copies left used to sit under the item title.
                  It moved into the digital-only option (&ldquo;42/150
                  left&rdquo;), next to its price and buy button.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="The digital edition is limited on purpose, and the counter sits next to the price"
              caption="The digital edition is limited on purpose, and the counter sits next to the price"
              src="/cases/phygital-purchase/02-options-sheet.webp"
            />

            <div className="mt-14">
              <SubHeading id="qr-loop">The loop through the QR code</SubHeading>
              <Prose className="mt-5">
                <p>
                  The phygital option takes the buyer out of the app, to the
                  brand&rsquo;s website. The brand sells and ships the physical
                  piece, and SEAMM has no stock, sizes or delivery of its own.
                  The QR code on the item then brings the buyer back to the app,
                  where its digital twin is waiting. The app hands the buyer to
                  the brand, and the QR code closes the loop.
                </p>
              </Prose>
            </div>
          </div>

          <div id="states" className="scroll-mt-20 pb-32">
            <Section kicker="04 · States" heading="When an option isn’t there">
              <Prose>
                <p>
                  Not every item has both forms available all the time. A
                  phygital piece can run out, a digital edition can sell out,
                  and some items never had a physical version. The sheet keeps
                  the same layout in every case and shows an unavailable option
                  as greyed out with a short status, so the buyer sees it before
                  choosing.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Availability states: both options, physical unavailable, digital sold out, a long brand URL"
              caption="Availability states: both options, physical unavailable, digital sold out, a long brand URL"
              src="/cases/phygital-purchase/03-availability-states.webp"
            />

            <Prose className="mt-8">
              <p>
                The same template covers a digital-only item. On that page
                Features shows &ldquo;Phygital: No&rdquo;, the price has no
                &ldquo;from&rdquo; because there is only one option, and in the
                sheet the phygital option is unavailable from the start.
              </p>
            </Prose>

            <ImagePlaceholder
              className="mt-8"
              label="A digital-only dress. The price has no “from”, Features shows “Phygital: No”, and the physical option is unavailable. The last screen shows the digital edition sold out"
              caption="A digital-only dress. The price has no “from”, Features shows “Phygital: No”, and the physical option is unavailable. The last screen shows the digital edition sold out"
              src="/cases/phygital-purchase/04-digital-only-item.webp"
            />
          </div>

          <div id="payment" className="scroll-mt-20 pb-32">
            <Section kicker="05 · Payment" heading="Paying, and when it fails">
              <Prose>
                <p>
                  A digital-only item is paid for with Apple Pay. After payment,
                  the success screen sends the buyer straight to the new item in
                  their wardrobe, with a second option to go back to shopping.
                </p>
              </Prose>
            </Section>

            <ImagePlaceholder
              className="mt-8"
              label="Apple Pay, then straight to the wardrobe"
              caption="Apple Pay, then straight to the wardrobe"
              src="/cases/phygital-purchase/05-apple-pay-success.webp"
            />

            <Prose className="mt-8">
              <p>
                When something goes wrong, the screen tells the buyer what to do
                next. A failed payment suggests trying again or using a
                different payment method. After three failed attempts, a
                separate screen asks the buyer to check their payment details
                before trying again. An item that fails to load shows a retry
                button.
              </p>
            </Prose>

            <ImagePlaceholder
              className="mt-8"
              label="Failure states: payment error, out of attempts, item failed to load"
              caption="Failure states: payment error, out of attempts, item failed to load"
              src="/cases/phygital-purchase/06-error-states.webp"
            />
          </div>

          <div id="result" className="scroll-mt-20 pb-32">
            <Section kicker="06 · Result" heading="Shipped">
              <Prose>
                <p>
                  The flow went to engineering with every state laid out in the
                  mockups and the edge cases listed in the notes, and it shipped
                  on iOS.
                </p>
              </Prose>
            </Section>
          </div>

          <MoreCases currentId="phygital-purchase" />
        </article>
      </main>

      <Footer />
    </>
  );
}
