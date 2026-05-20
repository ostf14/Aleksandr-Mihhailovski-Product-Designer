import Link from "next/link";
import { BusinessCard } from "@/components/BusinessCard";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";

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
        {/* Business card — hero */}
        <section className="px-6 md:px-10 pt-[100px] md:pt-[120px] mb-20">
          <div className="max-w-[1080px] mx-auto">
            <BusinessCard />
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
                    <h2 className="font-serif font-normal text-2xl tracking-tight text-[#1F1F1E] dark:text-[#E8E8E6]">
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
