import { Newsreader, Space_Grotesk } from "next/font/google";

/**
 * The two fonts that exist for one component.
 *
 * DesignSystemShowcase.tsx on this page is the only thing on the site that
 * sets a typeface other than Satoshi, and it does it inline through
 * --font-space-grotesk and --font-newsreader. It is under instruction not to
 * be edited, so the variables have to come from outside it.
 *
 * They used to be declared in the root layout, which meant every page on the
 * site preloaded five Google font files — about 105 KB — so that one case page
 * could show a specimen. Declared here, Next only ships and preloads them on
 * the route that reads them.
 *
 * display: contents so this wrapper cannot affect the layout of the page it
 * wraps: the box is taken out of the tree entirely, while the custom
 * properties still inherit down to the showcase. A styling-only wrapper should
 * not become a layout box.
 */
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

export default function RemarginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${newsreader.variable}`}
      style={{ display: "contents" }}
    >
      {children}
    </div>
  );
}
