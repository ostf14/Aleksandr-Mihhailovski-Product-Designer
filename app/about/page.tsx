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
  {
    label: "Email",
    href: `mailto:${links.email}`,
    value: links.email,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    href: links.linkedin,
    value: "linkedin.com/in/alexmess",
    Icon: ArrowUpRight,
  },
  {
    label: "GitHub",
    href: links.github,
    value: "github.com/ostf14",
    Icon: GithubIcon,
  },
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
    <section className="pb-20">
      <div className="shell">
        <FadeIn className="shell-prose">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
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
          <header className="pb-14 pt-6 md:pt-10">
            <div className="shell">
              <FadeIn className="shell-prose">
                <h1 className="font-sans text-hero font-semibold tracking-tight">
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
            <ul className="divide-y divide-line border-y border-line">
              {contacts.map(({ label, href, value, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                    <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {label}
                    </span>
                    <span className="truncate text-[0.95rem] text-fg/90 transition-colors group-hover:text-accent">
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
