# Working in this repository

A static Next.js 14 (App Router) portfolio. No database, no CMS, no runtime
data. `README.md` is written for the site's owner; this file is for whoever —
person or agent — is changing the code.

Read the section that matches what you are about to touch. The traps below are
all things that have already gone wrong here once.

---

## The shape of it

- **One palette.** Twelve CSS variables per theme at the top of
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

`.fade` (components/FadeIn.tsx) rests at opacity 0 and is moved off it by a
class an observer adds, so it needs its landing in that block too — it has one,
via `[data-fade]`. The rule is `!important` because these were framer elements
once and framer wrote opacity onto the node; a stale inline zero must not win.

**Do not** branch on `useReducedMotion()` in a component: it returns `null` on
the server and on the first client render, so the server always emits the
hidden element, and when the hook flips React does not remove a style that was
set imperatively. The content then stays invisible forever.

### A fade is a CSS transition, and it is not framer

`FadeIn` used to be a framer-motion element and is not any more, for a reason
that will look like a downgrade until you have seen it.

Framer runs a plain opacity fade through the **Web Animations API**. For the
duration, the element's inline style stays at the START value, because the
WAAPI animation paints over it. At the end framer cancels the animation and
writes the final value on the NEXT frame. In between, the element paints at its
inline style, which is opacity 0. Captured on `/case/chtenye` at 1440x900: the
animation is gone at t=508 with the inline style still `0`, and the committed
`1` only lands at t=524. One frame of blank at the end of every fade, on twenty
of that page's forty-three blocks on the way down. No prop fixes it — it is how
the handoff works, and `whileInView` versus `animate` makes no difference.

A CSS transition has no handoff: the end value is the value.

The observer's root margin comes from `revealRootMargin()` in `reveal.ts`, and
its top figure is load-bearing. An observer reports a CROSSING and computes one
per frame — with the root inset at the top as well, a short block scrolled past
at wheel-flick speed is below the root on one frame and above it on the next,
crosses nothing, and sits at opacity 0 for the life of the page. It stranded
four blocks across three case pages, and which four changed between runs.
Extending the root upwards means a block that has been passed is still inside
it.

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

That seed runs **three times** — once in the effect, once two frames later and
once at 150ms — and it calls `scrollY.set()` as well as jumping the springs.
Both are there for client-side navigation, which mounts this page while the
window is still scrolled to wherever the last page was and resets the scroll
afterwards. `useScroll` reads the old offset, and if the reset lands before its
own listener is attached there is no scroll event to correct it: the motion
value keeps the old page's number, the transform keeps returning 0, and the
whole hero is invisible until you happen to scroll. Arriving at /product from a
case page scrolled to 2500 it was hidden eight times out of eight, with
`window.scrollY` reading 0 throughout. It presents as "the photo sometimes does
not load".

The band is `min-h-svh`, and the distance over which it dissolves is a fraction
of its measured height, not a fixed number of pixels. It was a flat 200px when
the band was 614 tall; at full viewport height that would have emptied the hero
after a fifth of a screen and left you looking at blank surface. `min-` and
`svh` both matter: `min-` means a landscape phone, where the card is already
taller than the screen, is untouched, and `svh` is the viewport with the mobile
address bar showing — sized to `vh`, the hero's own buttons start below the
fold on iOS.

### There is one reveal policy, in `components/reveal.ts`

Two things reveal on enter — the prose blocks (`.fade`, opacity only) and the
case panels (`.rv`, opacity and a small move). They look different on purpose.
**When** they fire, and whether they animate at all, is one policy and lives in
`reveal.ts`: the root margin, the already-on-screen rule, and the `--reveal-dur`
knob both classes read.

It was two copies, and that is exactly how they went wrong. The observer race
below was found and fixed in `.fade` while `.rv` kept the old margin, and `.rv`
never got the already-on-screen rule at all. Neither was visibly broken, only
because the case panels happen to be taller than the window they are measured
against. Add a third reveal and it goes through `reveal.ts` too.

What each caller keeps is its own bottom inset, because those were measured
separately: `-48px` against a panel of 500-620px, `-80px` against a paragraph.
A percentage inset scales with the window and failed on tall screens, which is
what the 48 replaced. StickyCases also keeps its own observer, because its
stagger is assigned **per batch** when the observer fires rather than per
index — a per-index delay makes a card scrolled to on its own wait for a queue
it is not in.

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

### The page transition hides a real hole, and intercepts every click

`components/PixelTransition.tsx` covers the screen with a grid of squares while
the route changes. Two things about it are load-bearing rather than decorative.

It listens for clicks on `document` in the **capture** phase and calls both
`preventDefault` and `stopPropagation`. The second one is what keeps
`next/link`'s own handler from navigating a frame later, out from under the
curtain — but it also means a click on an internal link never reaches anything
else. External links, hash links, modified clicks and downloads are all let
through by name; anything new that needs a click on an anchor is not.

`--curtain` is the page background, in both themes. It was `--fg` for a moment,
which in dark mode is `#ededed` — a full-screen white flash two or three times
a visit — and then a mid grey, which just looked like a grey sheet. Only the
background reads as the content dissolving rather than as something arriving on
top of it, and only the background cannot flash.

**It is a canvas, and it has to be.** It was one div per square with a CSS
transition, which is the cheaper idea right up until the squares get small. At
64px that is 345 divs and it runs on the compositor at a steady 60fps. At 13px
it is 7,770: measured at 1440x900 the DOM alone took 253ms to build and frames
came every 217ms, about five a second. On a canvas the same 13px squares build
in 18ms and hold a 16.7ms median — better than the 64px divs ever managed, and
the square size stops mattering. Do not "simplify" this back into elements.

Each square carries two delays, both keyed on its distance from the middle of
the screen: one runs edge first, so the picture is eaten from the outside, and
one runs middle first, so the next page opens from the centre. The scatter on
top is what makes it read as pixels — without it the front is a clean curve and
the whole thing looks like an aperture.

**The two directions are not the same animation.** Going in, the squares grow.
Coming back they do **not** shrink: they stay where they are and fade. A square
the colour of the page is invisible, so nothing on the way out reads as a
square retreating — all you see is what it does to the text underneath, and a
shrinking square takes bites out of the letters it is uncovering. Captured at
1440x900 it spelled "3D M u m uzzle" for about a fifth of a second, and that is
what "the text is flickering" turned out to mean. Do not make the reveal
symmetrical with the cover; on the way in the same chopping is the point.

Squares are drawn 2% over size. At exactly their cell the rounding leaves
hairlines of page between them.

`data-phase` on the canvas drives nothing and is not decoration either: every
measurement written against this component reads it, and a transition you
cannot observe from outside is one you cannot check.

The reveal waits for `pathname` to actually change, not for a timer. A timer
reveals a page that has not rendered yet on any route Link did not prefetch.

Which is why the click handler asks `resolvePath()` where a click will LAND,
not where it points. The logo points at `/`, a WIP route, so for an ordinary
visitor it lands on `/product` — and from `/product` that is not a navigation
at all. The curtain went up, nothing ever changed, and it held a black screen
for the full two seconds of its failsafe on every logo click made from
/product. `resolvePath` and `WIP_FALLBACK` live in `lib/site.ts` and middleware
uses the same ones, so the client and the server cannot drift.

And it papers over something that is still true underneath: a client-side
navigation removes the old page at once, so anything with an entrance animation
arrives invisible. `FadeIn` no longer animates blocks that are already on
screen when they mount, which is the actual fix — the curtain only means you do
not see the swap. Reduced motion skips the curtain entirely and relies on that.

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
