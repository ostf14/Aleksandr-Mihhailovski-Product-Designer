import { ArrowUpRight } from "lucide-react";
import { BusinessCard } from "@/components/BusinessCard";
import { CaseCardReveal } from "@/components/HomeCases";
import { Footer } from "@/components/Footer";
import { GalleryCard } from "@/components/GalleryCard";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  ogType: "website",
  absoluteTitle: true,
  ogImageTitle: SITE_TAGLINE,
});

const cases = [
  {
    href: "/case/3d-puzzle",
    tag: "Self-initiated",
    role: "Design Engineer",
    title: "3D Museum Puzzle",
    description:
      "Applied to a casual game studio, got rejected, built a working 3D puzzle prototype instead.",
    image: "/assembly-mid.png",
  },
  {
    href: "/case/push-notifications",
    tag: "Seamm",
    role: "Product Designer",
    title: "Push Notifications",
    description: "How to kill the send button nobody wanted to press",
    image: "https://framerusercontent.com/images/SFAsDo6PF9csTgqHwlukYwNxpSQ.png",
  },
  {
    href: "/case/stories-editor",
    tag: "Seamm",
    role: "Product Designer",
    title: "Stories Editor",
    description: "How I eliminated a 2-day content publishing bottleneck",
    image: "https://framerusercontent.com/images/WqXrVnU46HVuCSUfhEXwfBQyw.png",
  },
  {
    href: "/case/chtenye",
    tag: "Chtenye",
    role: "Product Designer",
    title: "Educational Platform Redesign",
    description: "Users couldn’t explain what a single menu item meant",
    image: "https://framerusercontent.com/images/aMajMUWlnqMZzKjWE2RnsGDhKo.jpg",
  },
  {
    href: "/case/my-sleeping-gypsy",
    tag: "Freelance",
    role: "Web Designer",
    title: "My Sleeping Gypsy",
    description: "How to sell heritage craftsmanship without looking like fast fashion",
    image: "/cases/msg/cover.png",
  },
  {
    href: "/case/multi-agent-workflow",
    tag: "Internal R&D",
    role: "Solo Builder",
    title: "Multi-Agent AI Workflow",
    description:
      "I built a 10× prototyping workflow using AI agents — and what it taught me about product design",
    image: "/cases/multi-agent-workflow/cover.jpg",
  },
];

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
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="inline-block size-1.5 rounded-full bg-terracotta shrink-0"
                        />
                        <span className="font-mono whitespace-nowrap text-[clamp(7px,2.6vw,11px)] uppercase tracking-[0.04em] md:tracking-[0.14em] text-stone-500 dark:text-stone-400">
                          {c.role}
                          <span className="text-stone-400/70"> | </span>
                          {c.tag}
                        </span>
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

        {/* Other */}
        <section id="other" className="px-6 md:px-10 mb-32 scroll-mt-[16.6667vh]">
          <div className="max-w-[1080px] mx-auto">
            <h2 className="mb-8 font-serif font-normal text-4xl md:text-5xl tracking-tight text-[#1F1F1E] dark:text-[#E8E8E6]">
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
