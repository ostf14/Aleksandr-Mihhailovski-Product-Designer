/**
 * Bakes the hero portrait — dither and all — into a flat PNG for the OG card.
 *
 * Why this exists: the treatment on the hero is an SVG filter chain
 * (`#hero-dither` in components/BusinessCard.tsx) layered over the colour
 * photograph at 0.55 opacity. Satori, which renders /api/og, supports no CSS
 * or SVG filters at all — it lays out flexbox and paints. So the only way the
 * link preview can carry the same picture as the page is to render it in a
 * real browser once and commit the result.
 *
 * It drives the ACTUAL page rather than a copy of the filter markup. There is
 * then one definition of the treatment, in BusinessCard.tsx, and this cannot
 * drift away from it — change the filter, re-run this, and the card follows.
 *
 * Grain is generated per device pixel, so the portrait is sized here to the
 * exact width it is painted at in the card. /api/og rasterises at 1200x630
 * with no retina scaling, so 1:1 is the whole story.
 *
 *   npm run build && npm start          # in another shell
 *   node scripts/bake-og-portrait.mjs
 *
 * Needs playwright, which is not a dependency of this project:
 *   npm i --no-save playwright
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const WIDTH = 380;
const OUT = path.join(process.cwd(), "lib/og-assets/portrait-dithered.png");
const URL = process.env.BAKE_URL ?? "http://localhost:3000/product";

mkdirSync(path.dirname(OUT), { recursive: true });

const browser = await chromium.launch(
  process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {},
);
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

// Dark theme: the card is dark, and .dark carries its own brightness(0.85) on
// the dither layer. The boot script in app/layout.tsx reads localStorage
// before first paint, so setting it here is what the site itself would do.
await page.addInitScript(() => localStorage.setItem("theme", "dark"));
await page.goto(URL, { waitUntil: "networkidle" });

const portrait = page.locator(".hero-portrait").first();
await portrait.evaluate((el, w) => {
  el.style.width = `${w}px`;
  // Square corners on purpose: a CSS radius is a fixed number of pixels and
  // does not scale with the frame, so the hero's 12px at 208 wide is a
  // different shape from 12px at 380. The card rounds it itself, to the same
  // proportion the page has.
  el.style.borderRadius = "0";
  // Hover lifts the texture off. Nothing is hovering here, but the pointer
  // ends up over the element during a screenshot on some runs.
  el.style.pointerEvents = "none";
}, WIDTH);
await page.waitForTimeout(800);

await portrait.screenshot({ path: OUT, omitBackground: true });
const box = await portrait.boundingBox();
console.log(
  `wrote ${OUT} at ${Math.round(box.width)}x${Math.round(box.height)}`,
);

await browser.close();
