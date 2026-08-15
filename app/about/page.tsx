import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { GithubIcon } from "@/components/GithubIcon";
import { Nav } from "@/components/Nav";
import { PlaceholderBlock } from "@/components/Placeholder";
import { ScrollToTop } from "@/components/ScrollToTop";
import { links, pageMetadata, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  // TODO: собственный description страницы About
  title: "About",
  description: `About ${SITE_NAME} — background, current work, and contacts.`,
  path: "/about",
  ogType: "website",
});

const contacts = [
  { label: "Email", href: `mailto:${links.email}`, value: links.email, Icon: Mail },
  { label: "LinkedIn", href: links.linkedin, value: "linkedin.com/in/alexmess", Icon: ArrowUpRight },
  { label: "GitHub", href: links.github, value: "github.com/ostf14", Icon: GithubIcon },
  { label: "CV", href: links.cv, value: "Google Drive", Icon: Download },
];

function Block({
  kicker,
  children,
}: {
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 md:px-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="max-w-prose mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-5">
            {kicker}
          </div>
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <main className="pt-20 md:pt-28">
        <article>
          <header className="px-6 md:px-10 pt-6 md:pt-10 pb-14">
            <div className="max-w-4xl mx-auto">
              <FadeIn className="max-w-prose mx-auto">
                <h1 className="font-serif font-normal text-hero tracking-tight">
                  About
                </h1>
              </FadeIn>
            </div>
          </header>

          {/* TODO: кто я */}
          <Block kicker="01 · Who I am">
            <PlaceholderBlock label="Кто я. Пара абзацев — чем занимаюсь, как думаю о продукте, что для меня важно в работе." />
          </Block>

          {/* TODO: чем занят сейчас */}
          <Block kicker="02 · What I'm doing now">
            <PlaceholderBlock label="Чем занят сейчас. Текущая роль или проекты, что строю, к чему открыт." />
          </Block>

          {/* TODO: бэкграунд */}
          <Block kicker="03 · Background">
            <PlaceholderBlock label="Бэкграунд. Откуда пришёл в продуктовый дизайн, ключевые места работы, образование." />
          </Block>

          <Block kicker="04 · Contact">
            <ul className="divide-y divide-stone-200 border-y border-stone-200">
              {contacts.map(({ label, href, value, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 py-4 transition-colors hover:text-terracotta"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-stone-500 transition-colors group-hover:text-terracotta" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 w-20 shrink-0">
                      {label}
                    </span>
                    <span className="text-[0.95rem] text-charcoal/90 truncate transition-colors group-hover:text-terracotta">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        </article>
      </main>

      <Footer />
    </>
  );
}
