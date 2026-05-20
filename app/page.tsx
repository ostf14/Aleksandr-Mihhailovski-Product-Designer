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
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 text-center">
              Product Designer · Kraków
            </p>

            {/* Skull logo — same asset/treatment as nav */}
            <div className="mt-6 mx-auto relative size-16 rounded-full overflow-hidden dark:border-[1.5px] dark:border-[rgba(255,217,152,0.5)] dark:shadow-[0_0_6px_0_rgba(212,149,106,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-light.png"
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <h1 className="mt-8 font-serif font-normal text-4xl md:text-6xl leading-[1.1] tracking-tight text-center text-[#1a1a1a] dark:text-[#E8E8E6]">
              <span className="block">I design complex systems</span>
              <span className="block">&amp; make them feel simple —</span>
              <span className="block">then ship frontend with AI tools.</span>
            </h1>

            {/* Experience table */}
            <div className="mt-8 border border-[#B5654A]/30 rounded-xl p-6 flex flex-col gap-2">
              {experience.map((row) => (
                <div
                  key={row.year}
                  className="md:grid md:grid-cols-[120px_180px_1fr] md:gap-x-6"
                >
                  <div className="flex items-baseline gap-4 md:contents">
                    <span className="font-mono text-sm text-neutral-400 whitespace-nowrap">
                      {row.year}
                    </span>
                    <span className="font-sans text-sm font-normal text-[#1a1a1a] dark:text-[#E8E8E6]">
                      {row.company}
                    </span>
                  </div>
                  <span className="block font-sans text-sm text-neutral-500 dark:text-neutral-400 pl-20 md:pl-0">
                    {row.focus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="px-6 md:px-10 mt-14 mb-32">
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
