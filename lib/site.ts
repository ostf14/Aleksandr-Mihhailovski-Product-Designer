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
  cv: "https://drive.google.com/file/d/1pFXxZKMDg1nF-rvsmSL9-eljelmp0y2Q/view?usp=sharing",
  email: "ostf14@gmail.com",
  linkedin: "https://www.linkedin.com/in/alexmess/",
  github: "https://github.com/ostf14",
} as const;

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
