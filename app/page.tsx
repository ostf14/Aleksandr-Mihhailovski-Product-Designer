import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const experience = [
  {
    year: "2024–now",
    company: "Mess Culture Labs",
    focus: "Product Design · AI-Assisted Engineering",
  },
  {
    year: "2022–2024",
    company: "Seamm",
    focus: "Product Design · Internal Tools · Webflow",
  },
  {
    year: "2020–2022",
    company: "UPROCK",
    focus: "UX/UI Design · Design Systems · Webflow",
  },
  {
    year: "2018–2022",
    company: "Freelance",
    focus: "UX/UI Design · Webflow",
  },
];

const cases = [
  {
    path: "/case/push-notifications",
    title: "Push Notifications Manager",
    subtitle: "How to kill the send button nobody wanted to press",
    tags: "SEAMM · INTERNAL TOOLS · 2024",
    year: "2024",
  },
  {
    path: "/case/stories-editor",
    title: "Stories Editor",
    subtitle: "How I eliminated a 2-day content bottleneck.",
    tags: "SEAMM · CONTENT TOOL · 2024",
    year: "2024",
  },
  {
    path: "/case/chtenye",
    title: "Chtenye",
    subtitle: "Users couldn't explain what a single menu item meant.",
    tags: "EDTECH · INFORMATION ARCHITECTURE · 2023",
    year: "2023",
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main>
        {/* Hero */}
        <section className="px-6 md:px-10 pt-[120px] md:pt-[160px] pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Kicker */}
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 text-center">
              Product Designer · Kraków
            </p>

            <h1 className="mt-4 font-serif font-normal text-4xl md:text-6xl leading-[1.1] tracking-tight text-center text-[#1a1a1a] dark:text-[#E8E8E6]">
              <span className="block">I design complex systems</span>
              <span className="block">with simple interfaces</span>
            </h1>
            <p className="mt-4 font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 text-center">
              Prototyping &amp; Frontend with AI · B2B SaaS · User Tests
            </p>

            {/* Experience table */}
            <div className="mt-8 border-t border-neutral-300/20 divide-y divide-stone-200 dark:divide-stone-700/60">
              {experience.map((row) => (
                <div
                  key={row.year}
                  className="py-3 md:grid md:grid-cols-[110px_1fr_1.6fr] md:items-baseline md:gap-x-6"
                >
                  <div className="flex items-baseline gap-4 md:contents">
                    <span className="font-mono text-sm text-neutral-400 whitespace-nowrap">
                      {row.year}
                    </span>
                    <span className="font-sans text-sm font-normal text-[#1a1a1a] dark:text-[#E8E8E6]">
                      {row.company}
                    </span>
                  </div>
                  <span className="hidden md:block font-sans text-sm font-normal text-neutral-500 dark:text-neutral-400">
                    {row.focus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise (placeholder) */}
        <section className="px-6 md:px-10 mb-20">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl bg-[#F0EDE5] dark:bg-[#242626] p-12 md:p-16"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
              }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Expertise
              </p>
              <h2 className="mt-6 font-serif font-normal text-2xl text-[#1a1a1a] dark:text-[#E8E8E6]">
                Content coming soon
              </h2>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="px-6 md:px-10 mb-32">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {cases.map((c) => (
              <Link
                key={c.path}
                href={c.path}
                className="group block rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[16/9] bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
                  <span className="text-sm text-neutral-400">Preview</span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-baseline gap-4">
                    <h2 className="font-serif font-normal text-2xl tracking-tight text-[#1a1a1a] dark:text-[#E8E8E6]">
                      {c.title}
                    </h2>
                    <span className="font-mono text-xs text-neutral-400 shrink-0">
                      {c.year}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-base text-neutral-500">{c.subtitle}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                    {c.tags}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
