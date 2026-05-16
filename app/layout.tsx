import type { Metadata } from "next";
import { JetBrains_Mono, Pixelify_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://alex-mikhailovski.example.com"),
  title: "Push Notifications · Alex Mikhailovski",
  description:
    "A case study on designing the Push Notification Manager at Seamm — empowering non-technical admins to send campaigns with confidence and zero code.",
  openGraph: {
    title: "Push Notifications · Alex Mikhailovski",
    description:
      "Designing for confidence, not speed. The Push Notification Manager I designed for Seamm.",
    type: "article",
    url: "https://alex-mikhailovski.example.com/case-study/push-notifications",
    siteName: "Alex Mikhailovski",
    images: [
      {
        url: "/og-push-notifications.png",
        width: 1200,
        height: 630,
        alt: "Push Notifications case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Push Notifications · Alex Mikhailovski",
    description: "Designing for confidence, not speed.",
    images: ["/og-push-notifications.png"],
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
      className={`${jetbrainsMono.variable} ${pixelifySans.variable}`}
      suppressHydrationWarning
    >
      <head>
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
