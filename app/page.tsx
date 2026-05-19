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

      <main>
        {/* Hero */}
        <section className="px-6 md:px-10">
          <div className="max-w-3xl pt-[120px] md:pt-[160px] pb-20">
            <h1 className="font-serif font-normal text-4xl md:text-5xl tracking-tight text-charcoal">
              Aleksandr Mihhailovski
            </h1>
            <p className="mt-4 text-lg text-neutral-500">
              Product designer. Complex tools, data-heavy interfaces, design systems.
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-terracotta">
              Open to opportunities
            </p>
          </div>
        </section>

        {/* Case cards */}
        <section className="px-6 md:px-10 pb-32">
          <div className="max-w-3xl flex flex-col gap-6">
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
