import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LectureToc } from "@/components/LectureToc";
import { lectureMdxComponents } from "@/components/LectureMdx";
import { pageMetadata } from "@/lib/site";
import {
  LECTURES,
  entryHref,
  getEntry,
  loadEntryBody,
  nextEntry,
  orderedEntries,
} from "@/lib/lectures";
import { extractHeadings } from "@/lib/toc";

export function generateStaticParams() {
  return LECTURES.entries.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = getEntry(LECTURES, params.slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.title,
    description: entry.description,
    path: entryHref(LECTURES, entry),
    ogType: "article",
    ogSubtitle: `Лекция ${entry.number}`,
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

export default function Page({ params }: { params: { slug: string } }) {
  const entry = getEntry(LECTURES, params.slug);
  if (!entry) notFound();

  const body = loadEntryBody(LECTURES, entry);
  const headings = extractHeadings(body);
  const total = orderedEntries(LECTURES).length;
  const next = nextEntry(LECTURES, entry.slug);

  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="pb-10 pt-6 md:pt-10">
            <div className="shell">
              <div className="shell-prose">
                <a
                  href={LECTURES.basePath}
                  className="mb-3 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-80"
                >
                  Лекция {entry.number} из {total}
                </a>
                <h1 className="font-sans text-hero font-semibold tracking-tight text-fg">
                  {entry.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-muted">
                  <span>{formatDate(entry.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{entry.readingTime}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="pb-24">
            <div className="shell lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
              <LectureToc headings={headings} />

              <div className="min-w-0 max-w-prose">
                <MDXRemote source={body} components={lectureMdxComponents} />
              </div>
            </div>
          </div>

          {next && (
            <div className="pb-32">
              <div className="shell">
                <div className="shell-prose">
                  <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Читать дальше
                  </div>
                  <a
                    href={entryHref(LECTURES, next)}
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
                        Лекция {next.number}
                      </div>
                      <h2 className="font-sans text-[20px] font-semibold leading-tight tracking-tight text-fg md:text-[24px]">
                        {next.title}
                      </h2>
                      <p className="mt-2 text-[0.95rem] leading-[1.55] text-fg/70">
                        {next.description}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
