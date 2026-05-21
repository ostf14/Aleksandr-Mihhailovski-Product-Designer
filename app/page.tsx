import { ArrowUpRight } from "lucide-react";
import { BusinessCard } from "@/components/BusinessCard";
import { CaseCardReveal } from "@/components/HomeCases";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";

const cases = [
  {
    href: "/case/push-notifications",
    tag: "Seamm",
    title: "Push Notifications",
    description: "How to kill the send button nobody wanted to press",
    image: "https://framerusercontent.com/images/SFAsDo6PF9csTgqHwlukYwNxpSQ.png",
  },
  {
    href: "/case/stories-editor",
    tag: "Seamm",
    title: "Stories Editor",
    description: "How I eliminated a 2-day content bottleneck",
    image: "https://framerusercontent.com/images/WqXrVnU46HVuCSUfhEXwfBQyw.png",
  },
  {
    href: "/case/chtenye",
    tag: "Chtenye",
    title: "Educational Platform Redesign",
    description: "Users couldn’t explain what a single menu item meant",
    image: "https://framerusercontent.com/images/aMajMUWlnqMZzKjWE2RnsGDhKo.jpg",
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main>
        {/* Business card — hero */}
        <section className="px-6 md:px-10 pt-[100px] md:pt-[120px] mb-20">
          <BusinessCard />
        </section>

        {/* Case Studies */}
        <section id="cases" className="px-6 md:px-10 mb-32 scroll-mt-[16.6667vh] snap-start">
          <div className="max-w-[1080px] mx-auto">
            <h2 className="mb-8 font-serif font-normal text-4xl md:text-5xl tracking-tight text-[#1F1F1E] dark:text-[#E8E8E6]">
              Cases
            </h2>
          </div>
          <div className="max-w-[1080px] mx-auto flex flex-col gap-5">
            {cases.map((c) => (
              <CaseCardReveal key={c.href}>
                <a
                  href={c.href}
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
                      <div className="font-mono text-xs uppercase tracking-[0.14em] text-stone-400">
                        {c.tag}
                      </div>
                      <h3 className="mt-3 font-serif font-normal text-[28px] md:text-[32px] leading-[1.1] tracking-tight text-[#1F1F1E] dark:text-[#E8E8E6]">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-stone-500 line-clamp-2">
                        {c.description}
                      </p>
                    </div>
                    <div className="flex-1 min-h-0 -mx-5 -mb-5 md:m-0 md:basis-[38%] md:shrink-0 md:flex-none md:h-full rounded-b-2xl md:rounded-xl overflow-hidden bg-cream-warm dark:bg-cream-deep">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </a>
              </CaseCardReveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
