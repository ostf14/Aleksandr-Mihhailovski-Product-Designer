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
 * Path to the dynamic OG image for a given title. Resolved against
 * metadataBase into an absolute URL by Next. Generation lives in the
 * /api/og Route Handler (node runtime) rather than the opengraph-image
 * metadata convention, because that convention is always prerendered at
 * build — and @vercel/og's node build crashes the prerender on Windows.
 * A force-dynamic route handler is never prerendered, so it builds on
 * Windows and runs on Vercel's Linux node where @vercel/og works.
 */
export function ogImagePath(title: string): string {
  return `/api/og?title=${encodeURIComponent(title)}`;
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
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  absoluteTitle?: boolean;
  ogImageTitle?: string;
}): Metadata {
  const imageTitle = ogImageTitle ?? title;
  const image = ogImagePath(imageTitle);
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
