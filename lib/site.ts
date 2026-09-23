import type { Metadata } from "next";

/**
 * Single source of truth for the site's absolute URL.
 * Override per environment with NEXT_PUBLIC_SITE_URL; the fallback is the
 * production deployment.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://mihhailovski-product-designer.vercel.app";

export const SITE_NAME = "Aleksandr Mihhailovski";

export const SITE_TAGLINE = "Product Designer & Builder";

export const SITE_DESCRIPTION =
  "Product designer for B2B SaaS, internal tools, and data-heavy interfaces. I prototype and build in code.";

/**
 * Single source of truth for the four external contact addresses. Both the
 * hero business card and the footer read from this object — updating a CV
 * link, moving to a new email, or swapping the LinkedIn handle is now one
 * edit instead of the two-file update every string had before.
 */
export const links = {
  cv: "https://drive.google.com/file/d/1FLTGKatoPK152ViuN8d5XLB7mk2niY3c/view?usp=sharing",
  email: "ostf14@gmail.com",
  linkedin: "https://www.linkedin.com/in/alexmess/",
  github: "https://github.com/ostf14",
} as const;

/**
 * The outbound clicks worth counting, and the only reason /go/* exists.
 *
 * Vercel Web Analytics on the free plan records page views and no custom
 * events, so there is no way to ask it how many people pressed Download CV.
 * A page view it will record. So each of these gets a real page that loads,
 * lets the analytics beacon fire, and then replaces itself with the external
 * URL — and because both buttons already open in a new tab, the second it
 * costs is spent in a tab that was going to be loading something anyway.
 *
 * A redirect in next.config.mjs cannot do this: it answers with a 307 before
 * any HTML is served, so no script runs and nothing is counted.
 */
export const OUTBOUND = {
  cv: { href: links.cv, label: "your CV", where: "Google Drive" },
  github: { href: links.github, label: "GitHub", where: "github.com" },
} as const;

export type OutboundKey = keyof typeof OUTBOUND;

/**
 * OFF.
 *
 * The /go/* pages work and are tested, and the reason they are switched off is
 * not technical. Download CV is the most valuable click on this site, and this
 * puts a step in front of it. Whatever the measured delay is, some share of
 * people meet a page that is not what they asked for and close the tab, and
 * trading away real clicks to find out how many clicks there were is the wrong
 * way round.
 *
 * A switch rather than commented-out code, so it still typechecks and still
 * builds. Set this to true and both buttons route through /go/* again and the
 * two pages come back; nothing else needs touching.
 */
export const COUNT_OUTBOUND_CLICKS = false;

/** Where an outbound button points, given the switch above. */
export function outboundHref(key: OutboundKey): string {
  return COUNT_OUTBOUND_CLICKS ? `/go/${key}` : OUTBOUND[key].href;
}

/**
 * Routes still being built out.
 *
 * One list drives two things: the construction tape rendered in the root
 * layout, and `robots: noindex, nofollow` in the metadata below. Deleting a
 * line here therefore both takes the tape down and lets the page be indexed —
 * there is no second place to remember.
 *
 * A trailing `/*` matches everything below that segment, nothing else does.
 */
export const WIP_ROUTES = [
  "/",
  "/about",
  "/ru/lectures",
  "/ru/lectures/*",
  "/testimonials",
] as const;

/**
 * Set by /underconstr. While present, middleware lets WIP routes through and
 * the nav shows their links; without it both behave as they do for visitors.
 * Not httpOnly on purpose — the nav needs to read it, and it guards nothing
 * more sensitive than a half-finished page.
 */
export const WIP_PREVIEW_COOKIE = "wip-preview";

/** Where middleware sends anyone who asks for a route that is not finished. */
export const WIP_FALLBACK = "/product";

/**
 * Where a click on `path` will actually land, once middleware has had its say.
 *
 * The client needs this as much as the server does. The logo points at "/",
 * which is a WIP route, so for an ordinary visitor it lands on /product — and
 * from /product that is not a navigation at all. Anything waiting for the
 * route to change waits forever: the page transition held a black screen for
 * two seconds on every logo click made from /product, until its failsafe
 * fired. Asking this first is cheaper than guessing afterwards.
 */
export function resolvePath(path: string, preview: boolean): string {
  return !preview && isWipRoute(path) ? WIP_FALLBACK : path;
}

export function isWipRoute(path: string | null | undefined): boolean {
  if (!path) return false;

  const bare = path.split(/[?#]/)[0];
  const normalized = bare.length > 1 ? bare.replace(/\/+$/, "") : bare;

  return WIP_ROUTES.some((pattern) => {
    if (pattern.endsWith("/*")) {
      return normalized.startsWith(`${pattern.slice(0, -2)}/`);
    }
    return normalized === pattern;
  });
}

/**
 * Path to the dynamic OG image for a given title. Resolved against
 * metadataBase into an absolute URL by Next. Generation lives in the
 * /api/og Route Handler (node runtime) rather than the opengraph-image
 * metadata convention, because that convention is always prerendered at
 * build — and @vercel/og's node build crashes the prerender on Windows.
 * A force-dynamic route handler is never prerendered, so it builds on
 * Windows and runs on Vercel's Linux node where @vercel/og works.
 */
export function ogImagePath(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return `/api/og?${params.toString()}`;
}

/**
 * Builds a complete per-page Metadata object. Next.js does a shallow merge on
 * top-level metadata fields, so a page that sets `openGraph` replaces the root
 * layout's `openGraph` entirely — this helper keeps every page's OG block
 * complete (title, description, canonical url, siteName, type, image) without
 * repeating the boilerplate in each route.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogType = "article",
  absoluteTitle = false,
  ogImageTitle,
  ogSubtitle,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  absoluteTitle?: boolean;
  ogImageTitle?: string;
  /** Second line on the OG card. Defaults to "Product Designer". */
  ogSubtitle?: string;
}): Metadata {
  const imageTitle = ogImageTitle ?? title;
  const image = ogImagePath(imageTitle, ogSubtitle);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // Derived from the path rather than passed per page, so a route can never
    // lose its tape and keep its noindex (or the other way round).
    ...(isWipRoute(path) ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: ogType,
      images: [{ url: image, width: 1200, height: 630, alt: imageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
