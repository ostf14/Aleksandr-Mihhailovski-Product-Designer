import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StickyCases } from "@/components/StickyCases";
import { pageMetadata } from "@/lib/site";
import { gameCases } from "@/lib/works";

export const metadata = pageMetadata({
  title: "Gamedev",
  description: "Games and prototypes, in development.",
  path: "/gamedev",
  ogType: "website",
  ogSubtitle: "Gamedev",
});

/**
 * The same page as /product, built from the other half of lib/works.ts.
 *
 * Deliberately not its own layout. A game case and a product case are the same
 * kind of thing — a cover, a title, a line, and a page behind it — so they get
 * the same grid, and adding a game means one entry in the register rather than
 * a new section to design. `disciplines: ["game"]` is what routes it here.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <section id="cases" className="scroll-mt-24 pb-32 pt-6 md:pt-10">
          <StickyCases works={gameCases} />
        </section>
      </main>

      <Footer />
    </>
  );
}
