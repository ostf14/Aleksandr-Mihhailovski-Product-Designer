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
          <header className="px-6 md:px-10 pt-6 md:pt-10 pb-10">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-prose mx-auto">
                <a
                  href={LECTURES.basePath}
                  className="inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-3 hover:opacity-80 transition-opacity"
                >
                  Лекция {entry.number} из {total}
                </a>
                <h1 className="font-serif font-normal text-hero tracking-tight text-charcoal">
                  {entry.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-stone-500">
                  <span>{formatDate(entry.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{entry.readingTime}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="px-6 md:px-10 pb-24">
            <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
              <LectureToc headings={headings} />

              <div className="min-w-0 max-w-prose">
                <MDXRemote source={body} components={lectureMdxComponents} />
              </div>
            </div>
          </div>

          {next && (
            <div className="px-6 md:px-10 pb-32">
              <div className="max-w-4xl mx-auto">
                <div className="max-w-prose mx-auto">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-4">
                    Читать дальше
                  </div>
                  <a
                    href={entryHref(LECTURES, next)}
                    className="group relative block rounded-xl border border-stone-200 bg-white dark:bg-cream-warm p-5 md:p-6 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <ArrowUpRight
                      size={24}
                      strokeWidth={1.5}
                      aria-hidden
                      className="absolute top-5 right-5 md:top-6 md:right-6 text-stone-400 transition-colors group-hover:text-terracotta"
                    />
                    <div className="pr-10">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-2">
                        Лекция {next.number}
                      </div>
                      <h2 className="font-serif font-normal text-[20px] md:text-[24px] leading-tight tracking-tight text-charcoal">
                        {next.title}
                      </h2>
                      <p className="mt-2 text-[0.95rem] leading-[1.55] text-charcoal/70">
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
