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

/**
 * Must be a STATIC font. Satori's parser throws on a variable font's `fvar`
 * table — `Cannot read properties of undefined` inside parseFvarAxis — and the
 * route answers 500. Pointing this at Satoshi-Variable.ttf is therefore a
 * silent way to break every link preview on the site.
 *
 * Satoshi-600.ttf is that variable file pinned to the heading weight with
 * `python -m fontTools.varLib.instancer Satoshi-Variable.ttf wght=600`. The
 * variable original stays beside it as the source to re-cut from; it is not
 * loadable here. Worth knowing: its wght axis defaults to 900, so a parser
 * that did accept it would render the card in Black.
 */
function satoshi(): Buffer {
  if (!fontCache) {
    fontCache = fs.readFileSync(assetPath("lib/fonts/Satoshi-600.ttf"));
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

// Site's actual dark theme (app/globals.css .dark), not an invented palette.
const PAGE_BG = "#0a0a0a";
const CARD_BG = "#111111";
const TEXT = "#ededed";
const MUTED = "#8f8f8f";
const TERRACOTTA = "#FF6936";

/**
 * The link preview: the hero card in miniature, in the site's dark theme.
 *
 * A social platform already prints the page title as text beside the image,
 * so a card that only restates it in white-on-black adds nothing. This one
 * carries the thing the text cannot — the face, the name, the palette.
 * `title` is unused here (kept as a parameter so every call site doesn't
 * need to change); the card no longer restates the page title itself.
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
          backgroundColor: PAGE_BG,
          padding: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: CARD_BG,
            border: `2px solid rgba(255, 105, 54, 0.3)`,
            borderRadius: 28,
            padding: "0 64px",
          }}
        >
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
                border: "5px solid rgba(237, 237, 237, 0.15)",
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
                  fontFamily: "Satoshi",
                  fontSize: 70,
                  color: TEXT,
                  lineHeight: 1.05,
                  letterSpacing: "-0.034em",
                }}
              >
                {SITE_NAME}
              </div>
              <div style={{ fontSize: 32, color: MUTED }}>{subtitle}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Satoshi",
          data: satoshi(),
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
