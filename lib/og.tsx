import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Line under the name when a page does not supply its own. */
export const OG_DEFAULT_SUBTITLE = "Product Designer";

/**
 * Assets are read off disk rather than fetched over the network: an OG card
 * that depends on a CDN being up has a failure mode we have already paid for
 * once. Both paths are force-included into the /api/og lambda from
 * next.config.mjs — see the note there before moving either file.
 *
 * Read lazily and cached, not at module scope: a throw during module
 * evaluation happens before the route handler runs and so escapes its
 * try/catch, which would put us back to an unexplained 500.
 */
let fontCache: Buffer | null = null;
let photoCache: string | null = null;

function assetPath(relative: string) {
  return path.join(process.cwd(), relative);
}

function gambarino(): Buffer {
  if (!fontCache) {
    fontCache = fs.readFileSync(assetPath("lib/fonts/Gambarino-Regular.ttf"));
  }
  return fontCache;
}

function photoDataUri(): string {
  if (!photoCache) {
    const bytes = fs.readFileSync(assetPath("public/hero-photo.jpg"));
    photoCache = `data:image/jpeg;base64,${bytes.toString("base64")}`;
  }
  return photoCache;
}

const CREAM = "#FFFCF0";
const CARD = "#FFFEFB";
const CHARCOAL = "#282726";
const MUTED = "#6F6E69";
const TERRACOTTA = "#FF6936";

/**
 * The link preview: the hero card in miniature.
 *
 * A social platform already prints the page title as text beside the image,
 * so a card that only restates it in white-on-black adds nothing. This one
 * carries the thing the text cannot — the face, the name, the palette — and
 * leaves the page itself as a line along the bottom.
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
          backgroundColor: CREAM,
          padding: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            backgroundColor: CARD,
            border: `2px solid rgba(255, 105, 54, 0.4)`,
            borderRadius: 28,
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 120,
              height: 10,
              backgroundColor: TERRACOTTA,
              borderRadius: 9999,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoDataUri()}
              alt=""
              width={190}
              height={190}
              style={{
                width: 190,
                height: 190,
                borderRadius: 9999,
                objectFit: "cover",
                border: "5px solid #FFFFFF",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxWidth: 720,
              }}
            >
              <div
                style={{
                  fontFamily: "Gambarino",
                  fontSize: 70,
                  color: CHARCOAL,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {SITE_NAME}
              </div>
              <div style={{ fontSize: 32, color: MUTED }}>{subtitle}</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              borderTop: "1px solid rgba(40, 39, 38, 0.10)",
              paddingTop: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                backgroundColor: TERRACOTTA,
                borderRadius: 9999,
              }}
            />
            <div
              style={{
                fontSize: 27,
                color: CHARCOAL,
                letterSpacing: "-0.01em",
                overflow: "hidden",
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Gambarino",
          data: gambarino(),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
