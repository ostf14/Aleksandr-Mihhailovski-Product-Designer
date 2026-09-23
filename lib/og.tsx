import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Line under the name when a page does not supply its own. */
export const OG_DEFAULT_SUBTITLE = "Product Design Engineer";

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

/**
 * The hero portrait, dither and all, already flattened.
 *
 * On the page that picture is two stacked copies of /portrait-wide.jpg with an
 * SVG filter chain on the upper one at 0.55 opacity — see `#hero-dither` in
 * components/BusinessCard.tsx. Satori supports no CSS or SVG filters, so none
 * of that survives a request here: it lays out flexbox and paints, and a
 * `filter` is simply ignored. Handing it the plain photograph instead would
 * put a different picture in the preview than the one on the page.
 *
 * So it is baked in a real browser, once, by scripts/bake-og-portrait.mjs —
 * which drives the actual /product page rather than a copy of the filter, so
 * there is still only one definition of the treatment. It is 380px wide
 * because that is the width it is painted at below, and the grain is one
 * screen pixel: /api/og rasterises at 1200x630 with no retina scaling, so
 * anything baked at another size resamples the stipple into mush.
 *
 * Re-run the script after touching the filter, the photograph, or PORTRAIT_W.
 */
function portraitDataUri(): string {
  if (!photoCache) {
    const bytes = fs.readFileSync(
      assetPath("lib/og-assets/portrait-dithered.png"),
    );
    photoCache = `data:image/png;base64,${bytes.toString("base64")}`;
  }
  return photoCache;
}

// Site's actual dark theme (app/globals.css .dark), not an invented palette.
const PAGE_BG = "#0a0a0a";
const TEXT = "#ededed";
/**
 * --muted from the dark palette, not the hero's own `dark:text-fg/40`.
 *
 * On the page that second line is #ededed at 40%, which resolves to #656565 —
 * and that is right at full size on a screen you are sitting in front of. A
 * link preview is not seen at full size: platforms draw this 1200px card at
 * two or three hundred, where 55px of type lands around fourteen, and #656565
 * on #0a0a0a at fourteen pixels is a smudge. --muted is the palette's own next
 * step up and holds at that size.
 */
const SUBDUED = "#8f8f8f";

/** Must match the width the portrait was baked at. See portraitDataUri. */
const PORTRAIT_W = 380;
const PORTRAIT_H = 214; // 16:9, the photograph's own shape

/**
 * The link preview: the hero, at the size a preview is actually seen.
 *
 * It is the page's own first screen rather than a card invented for sharing —
 * same picture, same two lines, same dark surface. A social platform already
 * prints the page title as text beside the image, so a card that restates it
 * adds nothing; what the text cannot carry is the face.
 *
 * Both parameters are accepted and neither is painted. They stay because they
 * keep every /api/og URL distinct per page, which is what stops one platform's
 * cache from serving a stale card everywhere, and because dropping them would
 * mean editing six call sites for no visible change.
 */
export function renderOgImage(
  title: string,
  subtitle: string = OG_DEFAULT_SUBTITLE,
) {
  void title;
  void subtitle;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PAGE_BG,
        fontFamily: "Satoshi",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={portraitDataUri()}
        alt=""
        width={PORTRAIT_W}
        height={PORTRAIT_H}
        style={{
          width: PORTRAIT_W,
          height: PORTRAIT_H,
          // The page's rounded-xl is 12px against a 208px frame. Held as that
          // proportion rather than as the number, so the corner reads the same
          // here as it does there.
          borderRadius: Math.round((12 / 208) * PORTRAIT_W),
          marginBottom: 52,
        }}
      />

      {/* 88 / 55 is the hero's own pair — its 72px name and 45px role are
          exactly 1.6 apart, and that ratio is what holds the two lines
          together at any size. The tracking is the heading's -0.036em. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1.04,
          letterSpacing: "-0.036em",
        }}
      >
        <div style={{ fontSize: 88, color: TEXT }}>Hi, I’m Alex</div>
        <div style={{ fontSize: 55, color: SUBDUED }}>
          {OG_DEFAULT_SUBTITLE}
        </div>
      </div>
    </div>,
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
