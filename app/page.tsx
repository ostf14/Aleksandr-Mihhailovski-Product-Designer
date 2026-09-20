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

const sections: {
  label: string;
  href: string;
  badge?: string;
  hole: string;
}[] = [
  {
    label: "Product",
    href: "/product",
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
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                <div className="relative shrink-0 self-start md:self-auto">
                  <div
                    aria-hidden
                    className="absolute inset-[-6px] rounded-full bg-accent/20 blur-xl dark:bg-accent/15 md:inset-[-10px]"
                  />
                  <div className="relative z-10 size-16 overflow-hidden rounded-full border-[3px] border-white shadow-lg dark:border-2 dark:border-line/20 dark:bg-surface-deep dark:shadow-none md:size-[120px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero-photo.jpg"
                      alt={SITE_NAME}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="font-sans text-hero font-semibold tracking-tight text-fg">
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
                    <Download className="h-4 w-4" aria-hidden />
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
                  className="group relative block rounded-2xl border border-line/60 bg-surface p-6 shadow-[0_-2px_24px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5 dark:shadow-[0_-2px_24px_rgba(0,0,0,0.35)] md:p-8"
                >
                  <ArrowUpRight
                    size={32}
                    strokeWidth={1.5}
                    className="absolute right-6 top-6 text-faint transition-colors group-hover:text-accent md:right-8 md:top-8"
                    aria-hidden
                  />
                  <div className="pr-12">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-sans text-[28px] font-semibold leading-[1.1] tracking-tight text-fg md:text-[32px]">
                        {s.label}
                      </h2>
                      {s.badge && (
                        <span className="text-muted-deep rounded bg-surface px-1.5 py-1 font-mono text-[10px] leading-none tracking-[0.08em]">
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
