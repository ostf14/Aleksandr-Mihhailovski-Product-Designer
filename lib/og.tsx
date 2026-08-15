import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Subtitle used when a page does not supply its own. */
export const OG_DEFAULT_SUBTITLE = "Product Designer";

/**
 * Shared OpenGraph image generator. Each route's opengraph-image.tsx calls
 * this with its own title, so every page gets a correct, title-specific
 * 1200×630 preview automatically.
 *
 * To hand-design a static image for a specific case later, replace that
 * route's opengraph-image.tsx with an opengraph-image.png — the file
 * convention works the same way for static assets.
 *
 * Deliberately system-font-only for v1; brand fonts can be embedded later
 * by passing a `fonts` option to ImageResponse.
 *
 * The subtitle is a parameter rather than a constant because "Product
 * Designer" is wrong on a Russian lecture card — those pass their own.
 */
export function renderOgImage(
  title: string,
  subtitle: string = OG_DEFAULT_SUBTITLE,
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#191A1A",
          padding: "72px 80px",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 10,
            backgroundColor: "#FF6936",
            borderRadius: 9999,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: title.length > 32 ? 60 : 76,
              fontWeight: 600,
              color: "#E8E8E6",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#FF6936",
              letterSpacing: "-0.01em",
            }}
          >
            {SITE_NAME} — {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
