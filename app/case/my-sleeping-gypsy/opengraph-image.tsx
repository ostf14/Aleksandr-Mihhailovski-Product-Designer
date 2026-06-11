import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "My Sleeping Gypsy — case study";

export default function Image() {
  return renderOgImage("My Sleeping Gypsy");
}
