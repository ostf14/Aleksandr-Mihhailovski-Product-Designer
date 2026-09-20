import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Newsreader,
  Pixelify_Sans,
  Space_Grotesk,
} from "next/font/google";
import { UnderConstruction } from "@/components/UnderConstruction";
import {
  ogImagePath,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixelify-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: ogImagePath(SITE_TAGLINE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [ogImagePath(SITE_TAGLINE)],
  },
};

const themeInitScript = `
(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();
`;

const catDurationScript = `
(function(){function s(){document.documentElement.style.setProperty('--cat-duration',(window.innerWidth/36)+'s');}s();window.addEventListener('resize',s,{passive:true});})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${pixelifySans.variable} ${spaceGrotesk.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, address=no, email=no"
        />
        {/* Satoshi carries the whole site — body, headings and UI. Self-hosted
            as the single variable file (wght 300–900) rather than four static
            cuts off fontshare: the reference this design follows uses the
            variable, the whole axis is 42 KB against four separate downloads,
            and it takes a third-party origin off the critical path — the
            browser no longer pays DNS + TLS + a stylesheet round trip before
            it can even ask for a font. @font-face lives in globals.css.

            The preload is what keeps that a win: without it the font is only
            discovered once the CSS has parsed. Not to be confused with
            lib/fonts/Satoshi-600.ttf, which is a static cut for the OG card —
            satori cannot parse a variable font. See lib/og.tsx. */}
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: catDurationScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <UnderConstruction />
      </body>
    </html>
  );
}
