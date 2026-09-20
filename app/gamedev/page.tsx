import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock, PlaceholderImage } from "@/components/Placeholder";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";
import { DEVLOG, entryHref, orderedEntries } from "@/lib/series";
import { cases, workHref } from "@/lib/works";

export const metadata = pageMetadata({
  // TODO: настоящие title и description, когда у игры появится имя
  title: "Gamedev",
  description: "TODO: описание раздела для поисковой выдачи и превью ссылки.",
  path: "/gamedev",
  ogType: "website",
  ogSubtitle: "Gamedev",
});

/**
 * A section, not a product page.
 *
 * The distinction decided the structure. A page named after the game works
 * until the second prototype exists, and then there is nowhere to put it. Here
 * the game is the top of the page and everything else has a shelf: the devlog
 * grows entry by entry, and the prototypes shelf takes whatever gets built
 * next without anyone having to decide where it goes.
 *
 * Three parts, in the order someone reads them:
 *   1. the game — trailer, name, what it is, where it is
 *   2. the devlog — newest first, because that is what a log is for
 *   3. prototypes — the small things, pulled from the same register that
 *      feeds /product so a prototype is never described twice
 */

/** Prototypes are ordinary works; this is which of them belong on the shelf. */
const PROTOTYPE_SLUGS = ["3d-puzzle"];

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

export default function Page() {
  // A log reads newest first; the registry is written oldest first so the
  // numbers stay stable as entries are appended.
  const entries = orderedEntries(DEVLOG).reverse();
  const prototypes = cases.filter((c) => PROTOTYPE_SLUGS.includes(c.slug));

  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        {/* ---- The game ---- */}
        <section className="pb-20 pt-6 md:pt-10">
          <div className="shell">
            <FadeIn>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                In development
              </p>

              {/* TODO: имя игры — оно же заголовок страницы */}
              <PlaceholderBlock label="Название игры — крупной строкой, это первое, что видно." />

              <PlaceholderBlock
                className="mt-4 max-w-[54ch]"
                label="Две-три строки: что это за игра, жанр, за кого играешь и почему это интересно."
              />
            </FadeIn>

            {/* The trailer already exists — drop the file in public/ and swap
                this placeholder for a <video>. Kept as a placeholder rather
                than a guessed filename so a broken <video> never ships
                looking like a deliberate black rectangle. */}
            <FadeIn delay={0.05} className="mt-10">
              <div className="overflow-hidden rounded-2xl border border-line">
                <PlaceholderImage width={16} height={9} />
              </div>
              <p className="mt-2.5 font-mono text-[11px] text-muted">
                TODO: сюжетный трейлер — положить файл в public/ и заменить этот
                блок на &lt;video&gt;
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ---- Devlog ---- */}
        <section id="log" className="scroll-mt-24 pb-20">
          <div className="shell">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                Девлог
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {entries.length} {entries.length === 1 ? "запись" : "записи"}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {entries.map((e, i) => (
                <FadeIn key={e.slug} delay={i * 0.05}>
                  <a
                    href={entryHref(DEVLOG, e)}
                    className="group relative block rounded-xl border border-line bg-surface p-5 transition-transform duration-200 hover:-translate-y-0.5 md:p-6"
                  >
                    <ArrowUpRight
                      size={24}
                      strokeWidth={1.5}
                      aria-hidden
                      className="absolute right-5 top-5 text-faint transition-colors group-hover:text-accent md:right-6 md:top-6"
                    />
                    <div className="pr-10">
                      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                        #{e.number}
                      </div>
                      <h3 className="font-sans text-[20px] font-semibold leading-tight tracking-tight text-fg md:text-[24px]">
                        {e.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-[1.55] text-fg/70">
                        {e.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
                        <span>{formatDate(e.date)}</span>
                        <span aria-hidden>·</span>
                        <span>{e.readingTime}</span>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Prototypes ---- */}
        {prototypes.length > 0 && (
          <section id="prototypes" className="scroll-mt-24 pb-24">
            <div className="shell">
              <div className="mb-8">
                <h2 className="font-sans text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                  Прототипы
                </h2>
                <p className="mt-2 max-w-[54ch] text-[15px] leading-[1.55] text-muted">
                  Маленькие вещи, собранные по дороге. Каждая описана один раз —
                  карточка ведёт в тот же кейс, что и на странице Product.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {prototypes.map((c, i) => (
                  <FadeIn key={c.slug} delay={i * 0.05}>
                    <a
                      href={workHref(c)}
                      className="group relative block h-full rounded-xl border border-line bg-surface p-5 transition-transform duration-200 hover:-translate-y-0.5 md:p-6"
                    >
                      <ArrowUpRight
                        size={24}
                        strokeWidth={1.5}
                        aria-hidden
                        className="absolute right-5 top-5 text-faint transition-colors group-hover:text-accent md:right-6 md:top-6"
                      />
                      <div className="pr-10">
                        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                          {c.role}
                          <span className="text-faint/70"> · </span>
                          {c.org}
                        </div>
                        <h3 className="font-sans text-[20px] font-semibold leading-tight tracking-tight text-fg md:text-[22px]">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-[1.55] text-fg/70">
                          {c.blurb}
                        </p>
                      </div>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
