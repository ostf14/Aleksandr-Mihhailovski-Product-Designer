import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

type Case = {
  path: string;
  title: string;
  subtitle: string;
  kicker: string;
};

const cases: Case[] = [
  {
    path: "/case/push-notifications",
    title: "Push Notifications Manager",
    subtitle: "How to kill the send button nobody wanted to press",
    kicker: "B2B SAAS · ADMIN PANEL · 2024",
  },
  {
    path: "/case/stories-editor",
    title: "Stories Editor",
    subtitle: "How I eliminated a 2-day content bottleneck.",
    kicker: "B2B SAAS · CONTENT TOOL · 2024",
  },
  {
    path: "/case/chtenye",
    title: "Chtenye",
    subtitle: "Users couldn't explain what a single menu item meant.",
    kicker: "EDTECH · PLATFORM REDESIGN · 2023",
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        {/* Hero panel */}
        <section className="px-6 md:px-10 pt-10 md:pt-14">
          <div className="max-w-bleed mx-auto">
            <div className="relative overflow-hidden rounded-[32px] bg-[#F0EDE5] dark:bg-[#242626] px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-14">
              {/* Subtle dotted-grid overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12]"
                style={{
                  backgroundImage:
                    "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  color: "#1a1a1a",
                }}
              />

              {/* Floating badge top-right */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 rounded-full px-4 py-2 bg-[#F7F5EC] dark:bg-[#191A1A] border border-black/10 dark:border-white/10 shadow-sm">
                <span className="font-sans font-medium text-sm text-[#1a1a1a] dark:text-[#E8E8E6]">
                  Based in Kraków
                </span>
              </div>

              {/* Kicker */}
              <p className="relative font-mono text-xs uppercase tracking-[0.18em] text-[#B5654A] mb-6">
                PRODUCT DESIGNER · KRAKÓW
              </p>

              {/* Heading */}
              <h1 className="relative font-serif font-normal text-[#1a1a1a] dark:text-[#E8E8E6] leading-[0.92] tracking-[-0.03em] max-w-[11ch] text-[28px] md:text-[42px] lg:text-[70px] mt-0 mb-8">
                Aleksandr Mihhailovski.
                <br />
                Product Designer for complex tools.
              </h1>

              {/* Body copy */}
              <div className="relative max-w-3xl text-base md:text-2xl leading-[1.35] text-[#3f3f3f] dark:text-[#B8B8B3] space-y-1">
                <p>I design B2B SaaS products, internal tools, and design systems.</p>
                <p>
                  I prototype in code when the workflow is too complex to fake in static screens.
                </p>
              </div>

              {/* Status row */}
              <p className="relative mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#B5654A]">
                OPEN TO OPPORTUNITIES
              </p>
            </div>
          </div>
        </section>

        {/* Case cards */}
        <section className="px-6 md:px-10 pb-32 mt-10 md:mt-14">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {cases.map((c) => (
              <Link
                key={c.path}
                href={c.path}
                className="block rounded-2xl bg-cream-warm overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[16/9] bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                  <span className="text-neutral-400">Preview — {c.title}</span>
                </div>
                <div className="p-8">
                  <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    {c.kicker}
                  </div>
                  <h3 className="mt-2 font-serif font-normal text-2xl tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-base text-neutral-500">{c.subtitle}</p>
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
