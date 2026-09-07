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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <link
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap"
          rel="stylesheet"
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
