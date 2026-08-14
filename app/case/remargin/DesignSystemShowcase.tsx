import { FadeIn } from "@/components/FadeIn";

// Four backgrounds + four text levels per theme. Accent is not a theme
// token — it lives in the raw palette below.
const darkColors = [
  { name: "bg-primary", hex: "#0f0f11" },
  { name: "bg-secondary", hex: "#161618" },
  { name: "bg-tertiary", hex: "#1c1e21" },
  { name: "bg-hover", hex: "#252627" },
  { name: "text-primary", hex: "#ffffff" },
  { name: "text-secondary", hex: "#e2e3e5" },
  { name: "text-tertiary", hex: "#97979a" },
  { name: "text-quaternary", hex: "#6b6f76" },
];

const lightColors = [
  { name: "bg-primary", hex: "#fdfcf5" },
  { name: "bg-secondary", hex: "#f5efdf" },
  { name: "bg-tertiary", hex: "#ebe6d6" },
  { name: "bg-hover", hex: "#d8d2c0" },
  { name: "text-primary", hex: "#3d3a34" },
  { name: "text-secondary", hex: "#524e46" },
  { name: "text-tertiary", hex: "#787570" },
  { name: "text-quaternary", hex: "#a8a39a" },
];

const primitives = [
  { name: "coral-500", hex: "#d97757" },
  { name: "coral-600", hex: "#c66648" },
  { name: "crimson-400", hex: "#e06b62" },
  { name: "crimson-500", hex: "#d15c55" },
  { name: "crimson-600", hex: "#b84842" },
];

const highlights = [
  { idx: 1, name: "yellow", color: "rgba(232,200,73,0.35)" },
  { idx: 2, name: "green", color: "rgba(100,200,130,0.3)" },
  { idx: 3, name: "blue", color: "rgba(100,160,230,0.3)" },
  { idx: 4, name: "red", color: "rgba(230,100,100,0.32)" },
  { idx: 5, name: "purple", color: "rgba(170,130,230,0.32)" },
];

const highlightsOnDark = [
  { idx: 1, name: "yellow", color: "rgba(240,210,90,0.55)" },
  { idx: 2, name: "green", color: "rgba(120,220,150,0.5)" },
  { idx: 3, name: "blue", color: "rgba(120,180,240,0.5)" },
  { idx: 4, name: "red", color: "rgba(240,120,120,0.52)" },
  { idx: 5, name: "purple", color: "rgba(190,150,240,0.52)" },
];

const surfaces = [
  { name: "paper", bg: "#f5f0eb", text: "#2b2b2b" },
  { name: "sepia", bg: "#f0e6d3", text: "#5b4636" },
  { name: "dark", bg: "#2b2b2b", text: "#d4d4d4" },
];

// One ordered scale; `half` marks the steps added after the interface
// showed where the original scale stepped too coarsely.
const typeScale = [
  { size: 9, half: true },
  { size: 10, half: true },
  { size: 11, half: false },
  { size: 12, half: true },
  { size: 13, half: false },
  { size: 14, half: true },
  { size: 15, half: false },
  { size: 18, half: false },
  { size: 22, half: true },
  { size: 24, half: false },
  { size: 32, half: false },
];

const spacingBase = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
const spacingHalf = [2, 6, 10, 14, 18];

const radii = [
  { label: "sm", css: "4px" },
  { label: "md", css: "8px" },
  { label: "lg", css: "12px" },
  { label: "full", css: "9999px" },
];

const components = [
  {
    name: "Book card",
    desc: "Cover zone 4:3 + meta block. Hover elevates border. Continue variant: accent top-bar + badge.",
  },
  {
    name: "Highlight popover",
    desc: "Desktop: floating near selection. Mobile: bottom sheet. 5 color buttons + Add note + Copy citation.",
  },
  {
    name: "Annotation card",
    desc: "Color bar left edge. Quote italic, comment regular, page + date footer. Click: navigate to source.",
  },
  {
    name: "Progress pill",
    desc: "Fixed bottom-left. Percent | time | page/total. Pill shape.",
  },
  {
    name: "Settings drawer",
    desc: "Slides from right, attached to header. Font size, surface, theme.",
  },
  {
    name: "Context menu",
    desc: "Right-click desktop, long-press mobile. Upload cover, export, delete.",
  },
];

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-5">
      {children}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[12px] leading-[1.5] text-charcoal/50">{children}</p>
  );
}

function TierLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/50 mb-1.5">
      {children}
    </div>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="space-y-1.5">
      <div
        className="w-14 h-14 rounded-md border border-stone-200"
        style={{ background: hex }}
      />
      <div className="space-y-0">
        <div className="text-[10px] font-medium text-charcoal leading-tight truncate">
          {name}
        </div>
        <div className="font-mono text-[10px] text-charcoal/50 leading-tight">
          {hex}
        </div>
      </div>
    </div>
  );
}

function ColorRow({
  theme,
  colors,
}: {
  theme: string;
  colors: { name: string; hex: string }[];
}) {
  return (
    <div>
      <TierLabel>{theme}</TierLabel>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {colors.map((c) => (
          <Swatch key={c.name} name={c.name} hex={c.hex} />
        ))}
      </div>
    </div>
  );
}

function HighlightRow({
  chips,
  surface,
  ink,
}: {
  chips: { idx: number; name: string; color: string }[];
  surface: string;
  ink: string;
}) {
  return (
    <div
      className="grid grid-cols-5 gap-1.5 rounded-md border border-stone-200 p-1.5"
      style={{ background: surface }}
    >
      {chips.map((h) => (
        <div key={h.idx} className="rounded overflow-hidden">
          <div
            className="h-9 flex items-center justify-center px-2"
            style={{ background: h.color }}
          >
            <span
              className="font-mono text-[11px] text-center leading-tight"
              style={{ color: ink }}
            >
              {h.idx} · {h.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DesignSystemShowcase() {
  return (
    <div className="px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-prose mx-auto overflow-hidden">
          <FadeIn>
          <div className="space-y-14">
            <div>
              <SubLabel>Color tokens</SubLabel>
              <div className="space-y-8">
                <ColorRow theme="Dark" colors={darkColors} />
                <ColorRow theme="Light" colors={lightColors} />
              </div>
            </div>

            <div>
              <SubLabel>Raw palette</SubLabel>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {primitives.map((p) => (
                  <Swatch key={p.name} name={p.name} hex={p.hex} />
                ))}
              </div>
              <Note>
                Semantic tokens point here; components never do.
              </Note>
            </div>

            <div>
              <SubLabel>Highlight palette</SubLabel>
              <div className="space-y-3">
                <div>
                  <TierLabel>Base</TierLabel>
                  <HighlightRow
                    chips={highlights}
                    surface="#f5f0eb"
                    ink="#2b2b2b"
                  />
                </div>
                <div>
                  <TierLabel>Dark reading surface</TierLabel>
                  <HighlightRow
                    chips={highlightsOnDark}
                    surface="#2b2b2b"
                    ink="#d4d4d4"
                  />
                </div>
              </div>
              <Note>
                The dark surface gets its own set — at base alpha these tones
                sink into muddy patches on a near-black page.
              </Note>
            </div>

            <div>
              <SubLabel>Type scale</SubLabel>
              <div className="flex items-end gap-3 overflow-x-auto pb-1">
                {typeScale.map((t) => (
                  <div
                    key={t.size}
                    className="flex flex-col items-center gap-2 shrink-0"
                  >
                    <div
                      className="text-charcoal"
                      style={{
                        fontFamily:
                          "var(--font-space-grotesk), system-ui, sans-serif",
                        fontSize: `${t.size}px`,
                        lineHeight: 1,
                      }}
                    >
                      Aa
                    </div>
                    <div className="font-mono text-[10px] text-charcoal/60">
                      {t.size}
                    </div>
                    {/* Half-steps are marked with a rule rather than by fading
                        the label — dimming put them around 2:1 against the
                        page, well under the WCAG floor. */}
                    <div
                      aria-hidden
                      className={`h-px w-full ${
                        t.half ? "bg-terracotta" : "bg-transparent"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <Note>
                Steps underlined in terracotta are the half-steps added after
                the fact — 12 between 11 and 13, 22 between 18 and 24.
              </Note>
            </div>

            <div>
              <SubLabel>Reading surfaces</SubLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {surfaces.map((s) => (
                  <div
                    key={s.name}
                    data-surface={s.name}
                    className="rounded-lg border border-stone-200 p-5 aspect-[5/3] flex flex-col justify-between"
                    style={{ background: s.bg, color: s.text }}
                  >
                    <p
                      style={{
                        fontFamily:
                          "var(--font-newsreader), Georgia, serif",
                        fontSize: 14,
                        lineHeight: 1.55,
                      }}
                    >
                      The thread on which our thoughts are strung passes
                      through.
                    </p>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-70">
                      {s.name}
                    </div>
                  </div>
                ))}
              </div>
              <Note>
                The reading surface is a separate data-surface attribute — it
                switches independently of the interface theme.
              </Note>
            </div>

            <div>
              <SubLabel>Spacing · 4px grid + half-steps</SubLabel>
              <div className="space-y-6">
                <div>
                  <TierLabel>Base</TierLabel>
                  <div className="flex items-end gap-4 md:gap-5 overflow-x-auto pb-1">
                    {spacingBase.map((s) => (
                      <div
                        key={s}
                        className="flex flex-col items-center gap-2 shrink-0"
                      >
                        <div
                          className="bg-terracotta/80 rounded-sm"
                          style={{ width: `${s}px`, height: `${s}px` }}
                        />
                        <div className="font-mono text-[10px] text-charcoal/60">
                          {s}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Half-steps read as their own tier from the row label, so
                    they render at full strength — fading them was redundant
                    and pushed the labels below the WCAG contrast floor. */}
                <div>
                  <TierLabel>Half-steps</TierLabel>
                  <div className="flex items-end gap-4 md:gap-5 overflow-x-auto pb-1">
                    {spacingHalf.map((s) => (
                      <div
                        key={s}
                        className="flex flex-col items-center gap-2 shrink-0"
                      >
                        <div
                          className="bg-terracotta/80 rounded-sm"
                          style={{ width: `${s}px`, height: `${s}px` }}
                        />
                        <div className="font-mono text-[10px] text-charcoal/60">
                          {s}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SubLabel>Border radius</SubLabel>
              <div className="flex flex-wrap gap-5">
                {radii.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-10 h-10 border border-charcoal/40 bg-cream-warm"
                      style={{ borderRadius: r.css }}
                    />
                    <div className="font-mono text-[10px] text-charcoal/60 text-center">
                      {r.label} · {r.css}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SubLabel>Components</SubLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {components.map((c) => (
                  <div
                    key={c.name}
                    className="border border-stone-200 rounded-xl p-4"
                  >
                    <div className="text-xs font-bold text-charcoal mb-1">
                      {c.name}
                    </div>
                    <div className="text-[11px] leading-[1.5] text-charcoal/60">
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 font-mono text-[11px] text-charcoal/60">
              115 → 87 tokens · 662 → 773 references
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </div>
  );
}
