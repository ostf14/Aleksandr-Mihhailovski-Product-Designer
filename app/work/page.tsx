import { ArrowUpRight } from "lucide-react";
import { BusinessCard } from "@/components/BusinessCard";
import { CaseCardMedia } from "@/components/CaseCardMedia";
import { CaseCardReveal } from "@/components/HomeCases";
import { Footer } from "@/components/Footer";
import { GalleryCard } from "@/components/GalleryCard";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/site";
import { cases, workHref } from "@/lib/works";

export const metadata = pageMetadata({
  title: "Work",
  description: SITE_DESCRIPTION,
  path: "/work",
  ogType: "website",
});

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main>
        {/* Business card — hero */}
        <section className="px-0 md:px-10 pt-[100px] md:pt-[120px] mb-20">
          <BusinessCard />
        </section>

        {/* Case Studies */}
        <section id="cases" className="px-6 md:px-10 mb-32 scroll-mt-[16.6667vh]">
          <div className="max-w-[1080px] mx-auto">
            <h2 className="mb-8 font-serif font-normal text-4xl md:text-5xl tracking-tight text-[#282726] dark:text-[#E8E8E6]">
              Cases
            </h2>
          </div>
          <div className="max-w-[1080px] mx-auto flex flex-col gap-5">
            {cases.map((c) => (
              <CaseCardReveal key={c.slug}>
                <a
                  href={workHref(c)}
                  className="group relative block h-[348px] md:h-[248px] rounded-2xl bg-white dark:bg-cream-warm border border-stone-200/60 shadow-[0_-2px_24px_rgba(16,24,40,0.07)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ArrowUpRight
                    size={32}
                    strokeWidth={1.5}
                    className="absolute top-5 right-5 text-stone-400 transition-colors group-hover:text-terracotta z-10"
                    aria-hidden
                  />
                  <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-5 h-full">
                    <div className="md:flex-1 md:min-w-0 flex flex-col pr-10">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="inline-block size-1.5 rounded-full bg-terracotta shrink-0"
                        />
                        <span className="font-mono whitespace-nowrap text-[clamp(7px,2.6vw,11px)] uppercase tracking-[0.04em] md:tracking-[0.14em] text-stone-500 dark:text-stone-400">
                          {c.role}
                          <span className="text-stone-400/70"> | </span>
                          {c.org}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif font-normal text-[28px] md:text-[32px] leading-[1.1] tracking-tight text-[#282726] dark:text-[#E8E8E6]">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-stone-500 line-clamp-2">
                        {c.blurb}
                      </p>
                    </div>
                    <div className="flex-1 min-h-0 -mx-5 -mb-5 md:m-0 md:basis-[38%] md:shrink-0 md:flex-none md:h-full rounded-b-2xl md:rounded-xl overflow-hidden bg-cream-warm dark:bg-cream-deep">
                      <CaseCardMedia src={c.cover.src} />
                    </div>
                  </div>
                </a>
              </CaseCardReveal>
            ))}
          </div>
        </section>

        {/* Other */}
        <section id="other" className="px-6 md:px-10 mb-32 scroll-mt-[16.6667vh]">
          <div className="max-w-[1080px] mx-auto">
            <h2 className="mb-8 font-serif font-normal text-4xl md:text-5xl tracking-tight text-[#282726] dark:text-[#E8E8E6]">
              Other
            </h2>
          </div>
          <div className="max-w-[1080px] mx-auto">
            <GalleryCard />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
