# Aleksandr Mihhailovski — portfolio

Next.js 14 (App Router), TypeScript, Tailwind. Static: no database, no backend,
no CMS. Everything is a file in this repository, and every page is built ahead
of time and served as HTML.

This README is written for the person who owns the site rather than for a
developer. It answers "where do I change X" for the things that actually get
changed. Everything deeper lives in `CLAUDE.md`.

---

## Running it

```bash
npm install     # once
npm run dev     # then open http://localhost:3000
```

Before pushing anything:

```bash
npm run verify  # typecheck + lint + build, the same three CI runs
```

If `verify` passes, the deploy will not fail on the build. It does **not**
prove the page looks right — only your eyes do that.

---

## The things you will actually want to change

### Colours

All of them, both themes, live in one block at the top of **`app/globals.css`**
— look for `:root` and `.dark`. Eleven values each:

| Token | What it paints |
| --- | --- |
| `--bg` | the page |
| `--surface` | cards, the hero band |
| `--surface-deep` | a step deeper again |
| `--line` | card and section edges |
| `--line-strong` | dividers that need to be seen |
| `--fg` | headings and body text |
| `--strong` | secondary text |
| `--muted` | captions, blurbs |
| `--faint` | the small uppercase kickers |
| `--mark` | dots, bullets, small painted marks |
| `--accent` | emphasis — hover states and links |

Change a line and the whole site follows. Nothing on the site paints a colour
that is not one of these, so there is nowhere else to look.

The values are written as three numbers, not `#rrggbb` — `255 255 255` is
white. That is so Tailwind can add transparency to them (`bg-surface/60`).
If you have a hex code, convert it; any online converter does it.

**Want colour back on the site?** Change `--accent` in both `:root` and
`.dark`. It is currently the same as `--fg`, which is what makes the site
monochrome.

### The typeface

One face across the whole site: **Satoshi**, self-hosted at
`public/fonts/Satoshi-Variable.woff2` and declared at the top of
`app/globals.css`. To swap it, replace that file and change the `@font-face`
block. `tailwind.config.ts` points all three font slots at it on purpose — see
the comment there before changing that.

### Page width and margins

`app/globals.css`, next to the colours:

```css
--gutter: 24px;        /* space between content and the screen edge */
--shell: 960px;        /* how wide the page gets */
--shell-prose: 720px;  /* how wide a column of reading text gets */
```

Three numbers, whole site. Sections use `className="shell"`, and that one class
carries both the width and the margins.

### Your name, email, CV link, social links

**`lib/site.ts`**, the `links` object near the top. The hero and the footer both
read from it, so a new CV link is one edit.

### Adding or editing a case study

Two steps.

1. **Register it** in `lib/works.ts` — add an entry to the `WORKS` array with a
   `slug`, `title`, `blurb`, `role`, `org` and a `cover` image. This is what
   puts the card on `/work`; the order of the array is the order on the page.
2. **Write it** as `app/case/<slug>/page.tsx`. Copy an existing one — they are
   all built from the same handful of pieces: `<Section>` for a block with a
   heading, `<Callout>` for a highlighted note, `<ImagePlaceholder>` for a
   picture, `<NumberedList>` for a list, `<Impact>` for the numbers.

Images go in `public/` and are referenced as `/your-image.png`.

### Hiding a page while you work on it

`lib/site.ts`, the `WIP_ROUTES` list. Anything in it is redirected to `/work`
for visitors and marked "do not index" for search engines. Visit
`/underconstr` in your own browser to see them anyway; `/underconstr/off`
turns that back off.

Delete a line from that list when a page is ready. That is the whole release
switch — the construction tape and the noindex both come off with it.

---

## Where things live

```
app/
  page.tsx            the homepage
  work/               /work — the hero, the case cards, the gallery card
  case/<slug>/        one folder per case study
  other/ graphic/     the galleries
  ru/lectures/        the lecture series (Russian)
  api/og/             generates the link-preview image
  globals.css         colours, sizes, motion, and the hand-written CSS
  layout.tsx          the shell every page sits in

components/           everything reusable
lib/
  site.ts             links, metadata, the work-in-progress list
  works.ts            the register of case studies
public/               images, fonts, video
```

---

## Deploying

Pushing to `main` deploys. GitHub Actions runs typecheck, lint, formatting and
the build on every push; if it goes red, the site did not change.

One thing the build cannot check is the link-preview image — it is generated on
demand, so a broken one stays invisible until someone pastes a link. After any
big change, and always after upgrading Next:

```bash
npm run check:og
```
