import { renderOgImage } from "@/lib/og";
import { SITE_TAGLINE } from "@/lib/site";

// Node runtime: @vercel/og works on Vercel's Linux node. force-dynamic keeps
// the route out of the build-time prerender, which is the step that crashes
// on Windows (and the edge runtime produced empty 0-byte images in prod).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) || SITE_TAGLINE;
  const subtitle = searchParams.get("subtitle")?.slice(0, 60) || undefined;

  try {
    // ImageResponse renders lazily while its body is streamed, so wrapping
    // only the constructor would catch nothing — the font load and the wasm
    // rasterising both happen later, and the failure surfaces as a broken
    // pipe well after this function has returned. Draining the body here
    // pulls that work inside the try, which is the whole point of having one.
    const image = renderOgImage(title, subtitle);
    const body = await image.arrayBuffer();

    return new Response(body, { status: 200, headers: image.headers });
  } catch (error) {
    // Deliberately no placeholder image. A silent fallback is what kept this
    // route looking healthy while every preview on the site was broken —
    // a 500 with a logged cause is the behaviour worth having.
    console.error("[api/og] image generation failed", {
      title,
      subtitle,
      error,
    });
    return new Response("OG image generation failed", { status: 500 });
  }
}
