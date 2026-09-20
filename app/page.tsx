import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { LegacyAnchorRedirect } from "@/components/LegacyAnchorRedirect";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock } from "@/components/Placeholder";
import {
  links,
  pageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  ogType: "website",
  absoluteTitle: true,
  ogImageTitle: SITE_TAGLINE,
});

const sections: { label: string; href: string; badge?: string; hole: string }[] =
  [
    {
      label: "Work",
      href: "/work",
      hole: "Одна строка про раздел Work — что там лежит и для кого.",
    },
    {
      label: "Lectures",
      href: "/ru/lectures",
      badge: "RU",
      hole: "Одна строка про лекции — курс, аудитория, о чём серия.",
    },
    {
      label: "About",
      href: "/about",
      hole: "Одна строка про раздел About.",
    },
  ];

export default function Page() {
  return (
    <>
      <Nav />
      <LegacyAnchorRedirect />

      <main className="pt-28 md:pt-36">
        {/* Quiet hero — name, photo, one static line */}
        <section className="mb-20 md:mb-28">
          <div className="shell">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                <div className="relative shrink-0 self-start md:self-auto">
                  <div
                    aria-hidden
                    className="absolute inset-[-6px] md:inset-[-10px] rounded-full bg-accent/20 dark:bg-accent/15 blur-xl"
                  />
                  <div className="relative z-10 size-16 md:size-[120px] rounded-full overflow-hidden border-[3px] border-white shadow-lg dark:border-2 dark:border-line/20 dark:bg-surface-deep dark:shadow-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero-photo.jpg"
                      alt={SITE_NAME}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="font-sans font-semibold text-hero tracking-tight text-fg">
                    {SITE_NAME}
                  </h1>

                  {/* TODO: одна статичная строка позиционирования под именем */}
                  <PlaceholderBlock
                    className="mt-5 max-w-[42rem]"
                    label="Одна статичная строка позиционирования — идёт прямо под именем, задаёт тон всей главной."
                  />

                  <Button
                    href={links.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6"
                  >
                    <Download className="w-4 h-4" aria-hidden />
                    Download CV
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section entries */}
        <section className="pb-32">
          <div className="shell flex flex-col gap-4">
            {sections.map((s, i) => (
              <FadeIn key={s.href} delay={i * 0.05}>
                <a
                  href={s.href}
                  className="group relative block rounded-2xl bg-white dark:bg-surface border border-line/60 shadow-[0_-2px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] p-6 md:p-8 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ArrowUpRight
                    size={32}
                    strokeWidth={1.5}
                    className="absolute top-6 right-6 md:top-8 md:right-8 text-faint transition-colors group-hover:text-accent"
                    aria-hidden
                  />
                  <div className="pr-12">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-sans font-semibold text-[28px] md:text-[32px] leading-[1.1] tracking-tight text-fg">
                        {s.label}
                      </h2>
                      {s.badge && (
                        <span className="font-mono text-[10px] leading-none tracking-[0.08em] px-1.5 py-1 rounded bg-surface dark:bg-surface-deep text-muted">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    {/* TODO: строка-описание раздела */}
                    <PlaceholderBlock className="mt-4" label={s.hole} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
