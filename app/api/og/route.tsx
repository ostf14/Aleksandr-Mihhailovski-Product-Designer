import { renderOgImage } from "@/lib/og";
import { SITE_TAGLINE } from "@/lib/site";

// Node runtime: @vercel/og works on Vercel's Linux node. force-dynamic keeps
// the route out of the build-time prerender, which is the step that crashes
// on Windows (and the edge runtime produced empty 0-byte images in prod).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) || SITE_TAGLINE;
  return renderOgImage(title);
}
