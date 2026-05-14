# Push Notifications — Case Study

A single-page, long-scroll editorial case study for a product designer portfolio. Built with Next.js (App Router), Tailwind CSS, and Framer Motion. Pure static — no backend.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Deploy

Push to a Git provider and import into Vercel. No env vars required.

## Project structure

```
app/
  layout.tsx        Root layout, Inter font, metadata/OG tags
  page.tsx          Long-scroll case study page
  globals.css       Tailwind + base styles
components/
  Nav.tsx           Sticky nav with scroll-aware blur
  Hero / Impact     (Impact = 4 metrics with count-up)
  Section, Prose    Layout helpers (max-w-prose 720px)
  ImagePlaceholder  Styled gray rectangle, 16:10, with caption
  Callout           Warm-tinted panel for goals / decisions
  NumberedList      "01 · 02 · 03" lists
  FadeIn / Stagger  Framer Motion enter animations
  AnimatedNumber    Count-up for metrics (respects reduced-motion)
  Footer            Thanks + LinkedIn + copy-to-clipboard email
tailwind.config.ts  Design tokens (cream, charcoal, terracotta)
```

## Replacing placeholders

Each `ImagePlaceholder` is a styled gray box with descriptive label and italic caption. Swap with a `<figure>` containing a real screenshot when ready — keep the 16:10 aspect ratio and caption format for consistency.
