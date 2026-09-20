# Working in this repository

A static Next.js 14 (App Router) portfolio. No database, no CMS, no runtime
data. `README.md` is written for the site's owner; this file is for whoever —
person or agent — is changing the code.

Read the section that matches what you are about to touch. The traps below are
all things that have already gone wrong here once.

---

## The shape of it

- **One palette.** Eleven CSS variables per theme at the top of
  `app/globals.css`, exposed to Tailwind in `tailwind.config.ts`. Names say
  what a colour is *for* (`--muted`, `--line`) rather than what it looks like.
  Nothing paints a colour that is not one of them — no raw `stone-*`, no
  hardcoded hex. If you need a shade that does not exist, add it to the scale
  rather than writing it inline.
- **One typeface.** Satoshi, self-hosted. `sans`, `serif` and `mono` all point
  at it in `tailwind.config.ts`, deliberately — that retires ~130 legacy
  `font-serif`/`font-mono` call sites without touching them.
- **One container.** `.shell` / `.shell-prose` in `app/globals.css`.
  `width: min(100% - 2 * var(--gutter), W)` puts the gutter *inside* the width,
  so an element cannot be given a width without also getting its margins.
  Sections carry `className="shell"` and nothing else; there is no `px-*` on
  page wrappers.
- **Content is code.** `lib/works.ts` is the register of case studies;
  `lib/site.ts` holds links, metadata helpers and the work-in-progress list.

## Before you commit

```bash
npm run verify        # typecheck + lint + build — what CI runs
npm run format        # prettier, with Tailwind class sorting
```

---

## Traps

### The OG image can break silently

`/api/og` is `force-dynamic`, so it is **never exercised during the build**. It
has shipped broken with a completely green build more than once.

- `next.config.mjs` has an `outputFileTracingIncludes` block with a long
  comment. Do not delete or "simplify" it, and do not move the route to the
  edge runtime — that was tried and produced 0-byte images in production.
- `lib/og.tsx` must load a **static** font. Satori throws on a variable font's
  `fvar` table. `lib/fonts/Satoshi-600.ttf` is a static cut of the variable
  file, made with `python -m fontTools.varLib.instancer Satoshi-Variable.ttf
  wght=600`. Pointing it at the variable file breaks every link preview on the
  site.
- After any change near it, and always after a Next major upgrade:
  `npm run check:og` (hits production — it cannot be run against localhost).

### Tailwind purges classes it cannot see as literal strings

Anything in `@layer components` in `globals.css` only survives if Tailwind
finds the exact string in the source. `` `btn-${size}` `` gets purged and the
button renders unstyled **with a green build**. `components/Button.tsx` uses
literal lookup maps for this reason. After adding a layered class, check it
actually shipped:

```bash
grep -c "your-class" .next/static/css/*.css
```

Plain CSS written outside `@layer` is never purged, which is why `.shell`,
`.rv`, `.tiltable` and the rest live there.

### `prefers-reduced-motion` needs every start-state landed by hand

The block at the end of `globals.css` zeroes every animation and transition
duration. Anything whose resting position exists only *inside* a keyframe, or
only in a class that a transition moves away from, is left stranded. This has
happened twice: the walking cat parked mid-screen, and `.rv` elements stuck at
opacity 0. If you add an animation, add its landing to that block.

Framer Motion writes `opacity` straight onto the node, so CSS needs
`!important` to land it — see `[data-fade]`. **Do not** branch on
`useReducedMotion()` in a component: it returns `null` on the server and on the
first client render, so the server always emits the hidden element, and when
the hook flips React does not remove a style framer set imperatively. The
content then stays invisible forever.

### The theme toggle kills all transitions for a frame

`components/ThemeToggle.tsx` injects `*{transition:none !important}` while it
flips `.dark`, then removes it two frames later. Without it, several hundred
elements animate their colours at once and the switch visibly lags. Anything
that must animate *through* a theme change needs an explicit exception in that
injected style — the toggle's own icons have one.

Which icon shows is decided in CSS from `html.dark`, the class the boot script
in `app/layout.tsx` sets before first paint. Do not key it to React state: the
first render always guesses light, and a dark-mode visitor sees the wrong icon
for ~300ms.

### Scroll-linked animation must stop being a target

`components/BusinessCard.tsx` dissolves the hero on scroll. Opacity 0 still
hit-tests and still takes focus, so the gate is `visibility`, not
`pointer-events` — the latter leaves the keyboard path open. The springs are
also seeded from the real `scrollY` in a layout effect, or a reload into a
scrolled page flashes the hero in at full opacity.

The band is `min-h-svh`, and the distance over which it dissolves is a fraction
of its measured height, not a fixed number of pixels. It was a flat 200px when
the band was 614 tall; at full viewport height that would have emptied the hero
after a fifth of a screen and left you looking at blank surface. `min-` and
`svh` both matter: `min-` means a landscape phone, where the card is already
taller than the screen, is untouched, and `svh` is the viewport with the mobile
address bar showing — sized to `vh`, the hero's own buttons start below the
fold on iOS.

### Reveal timing is tuned to card height

`useReveal` in `components/StickyCases.tsx` uses `threshold: 0` against a fixed
`-48px` inset, and assigns its stagger **per batch** when the observer fires
rather than per index. A percentage inset scales with the window and fails on
tall screens; a per-index delay makes a card scrolled to on its own wait for a
queue it is not in. Both were real bugs.

### The mobile nav is load-bearing

`components/Nav.tsx` has a separate mobile branch: the overflow fix, the
`useCenterActiveTab` hook and the controls pinned outside the scrollable strip
all exist because of real failures at 344px (a folded Galaxy Fold). Test there
before changing it. The nav also keeps its own `px-6 md:px-10` — it is a fixed
overlay with no `.shell` inside it to carry the inset.

### Nested shells

`.shell` inside `.shell` must not take the gutter twice. There is a descendant
rule for this. Case pages nest three deep.

### The background noise texture

The `data:` URI on `body` must stay **identical** across themes. A dark-only
variant made a full-viewport `feTurbulence` re-rasterise on every theme toggle
and stalled the page.

### Page weight is not visible in review

There is no `next/image` here — covers are plain `<img>`, so nothing resizes a
source you drop in `public/`. That is how the nav logo came to be a 603px,
236 KB PNG drawn at 32px on every page of the site, and how `/product` came to
weigh 3.5 MB. Both looked perfect.

Before adding an image, check what width it is actually drawn at and size it to
twice that. `scripts/` has nothing for this; measuring in a browser is the only
honest way — `document.querySelectorAll("img")` and read `getBoundingClientRect`
across 390, 1440 and 1920.

Only the first two case covers load eagerly (`CaseCardMedia`'s `eager` prop).
Anything further down the page must stay lazy.

### Three case covers are hotlinked to framerusercontent.com

`lib/works.ts` and three case pages still point at 23 assets on the old Framer
site's CDN. They are a third-party origin on the critical path and they vanish
the day that Framer project does. They want downloading into `public/` — it has
not been done because the host is unreachable from the sandbox these changes
were made in.

### Internal navigation goes through `next/link`

Every internal link used to be a bare `<a href>`, so switching tabs threw the
document away and re-parsed everything to change which cards were in the grid.
A new internal link should be a `Link`; a `motion.a` becomes
`motion.create(Link)`, as in `MoreCases.tsx`. External links stay `<a>`.

---

## Do not touch

- **`app/case/remargin/DesignSystemShowcase.tsx`** — not one line. It is the
  one place that still sets Space Grotesk and Newsreader inline, which is why
  those two fonts stay registered in `app/layout.tsx` despite looking dead.
- **Case URLs** (`/case/<slug>`) — they are in circulation.

---

## Verifying a visual change

Screenshots prove a change looks right; they do not prove it did not break
something elsewhere. For anything that touches layout, colour or motion,
measure before and after:

- **Colour** — tally every computed `color` / `background-color` /
  `border-color` on each page in both themes, and diff the tallies. This caught
  289 elements silently falling back to pure black during the palette
  migration, which no screenshot showed.
- **Layout** — record each container's width and left offset at 344, 768 and
  1440, and diff. This caught a triple-applied gutter and a carousel arrow
  going off-screen.
- **Motion** — scroll in steps, sample computed opacity after longer than the
  transition, and flag anything visible that is still transparent.

Playwright against `npm start` is enough for all three.
