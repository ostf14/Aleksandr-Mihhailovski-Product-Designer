import type { Metadata } from "next";

/**
 * Single source of truth for the site's absolute URL.
 * Override per environment with NEXT_PUBLIC_SITE_URL; the fallback is the
 * production deployment.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alex-mikhailovski.example.com";

export const SITE_NAME = "Alex Mikhailovski";

export const SITE_TAGLINE = "Product Designer & Builder";

export const SITE_DESCRIPTION =
  "Product designer specializing in B2B SaaS, internal tools, and data-heavy interfaces. I prototype in code and build frontend with AI-assisted tools.";

/**
 * Builds a complete per-page Metadata object. Next.js does a shallow merge on
 * top-level metadata fields, so a page that sets `openGraph` replaces the root
 * layout's `openGraph` entirely — this helper keeps every page's OG block
 * complete (title, description, canonical url, siteName, type) without
 * repeating the boilerplate in each route.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogType = "article",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
