import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock } from "@/components/Placeholder";
import { ScrollToTop } from "@/components/ScrollToTop";
import { pageMetadata } from "@/lib/site";
import { LECTURES, entryHref, orderedEntries } from "@/lib/lectures";

export const metadata = pageMetadata({
  // TODO: собственные title и description индекса лекций
  title: "Лекции",
  description: "TODO: описание лекционного курса для поисковой выдачи и превью.",
  path: "/ru/lectures",
  ogType: "website",
  ogSubtitle: "Лекции",
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

export default function Page() {
  const entries = orderedEntries(LECTURES);

  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="pt-6 md:pt-10 pb-12">
            <div className="shell">
              <FadeIn className="shell-prose">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-3">
                  Курс · {entries.length}{" "}
                  {entries.length === 1 ? "лекция" : "лекции"}
                </p>

                {/* TODO: заголовок курса */}
                <PlaceholderBlock label="Заголовок курса — крупная строка, которую видно первой." />

                {/* TODO: описание курса */}
                <PlaceholderBlock
                  className="mt-4"
                  label="Описание курса: о чём серия, для кого, что слушатель унесёт."
                />
              </FadeIn>
            </div>
          </header>

          <section className="pb-20">
            <div className="shell">
              <div className="shell-prose flex flex-col gap-3">
                {entries.map((e, i) => (
                  <FadeIn key={e.slug} delay={i * 0.05}>
                    <a
                      href={entryHref(LECTURES, e)}
                      className="group relative block rounded-xl border border-line bg-white dark:bg-surface p-5 md:p-6 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <ArrowUpRight
                        size={24}
                        strokeWidth={1.5}
                        aria-hidden
                        className="absolute top-5 right-5 md:top-6 md:right-6 text-faint transition-colors group-hover:text-accent"
                      />
                      <div className="pr-10">
                        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-2">
                          Лекция {e.number}
                        </div>
                        <h2 className="font-sans font-semibold text-[20px] md:text-[24px] leading-tight tracking-tight text-fg">
                          {e.title}
                        </h2>
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

          <section className="pb-32">
            <div className="shell">
              <FadeIn className="shell-prose">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-5">
                  Кто читает
                </div>
                {/* TODO: блок «кто читает» */}
                <PlaceholderBlock label="Кто читает: короткая справка о лекторе — пара предложений и, если нужно, фото." />
              </FadeIn>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
