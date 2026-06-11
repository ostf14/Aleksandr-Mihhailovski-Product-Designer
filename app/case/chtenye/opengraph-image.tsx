import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Chtenye — Educational Platform Redesign — case study";

export default function Image() {
  return renderOgImage("Chtenye — Educational Platform Redesign");
}
