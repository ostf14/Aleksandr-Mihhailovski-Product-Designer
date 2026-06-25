import { FadeIn } from "@/components/FadeIn";

const darkColors = [
  { name: "bg-primary", hex: "#0f0f11" },
  { name: "bg-secondary", hex: "#161618" },
  { name: "bg-tertiary", hex: "#1c1e21" },
  { name: "accent", hex: "#d97757" },
  { name: "text-primary", hex: "#ffffff" },
  { name: "text-secondary", hex: "#e2e3e5" },
  { name: "text-tertiary", hex: "#97979a" },
  { name: "text-quaternary", hex: "#6b6f76" },
];

const lightColors = [
  { name: "bg-primary", hex: "#fdfcf5" },
  { name: "bg-secondary", hex: "#f5efdf" },
  { name: "bg-tertiary", hex: "#ebe6d6" },
  { name: "accent", hex: "#d97757" },
  { name: "text-primary", hex: "#3d3a34" },
  { name: "text-secondary", hex: "#524e46" },
  { name: "text-tertiary", hex: "#787570" },
  { name: "text-quaternary", hex: "#a8a39a" },
];

const highlights = [
  { idx: 1, name: "yellow", color: "rgba(232,200,73,0.5)" },
  { idx: 2, name: "green", color: "rgba(100,200,130,0.45)" },
  { idx: 3, name: "blue", color: "rgba(100,160,230,0.45)" },
  { idx: 4, name: "red", color: "rgba(230,100,100,0.45)" },
  { idx: 5, name: "purple", color: "rgba(170,130,230,0.45)" },
];

const surfaces = [
  { name: "light", bg: "#ffffff", text: "#2b2b2b" },
  { name: "sepia", bg: "#f5f0eb", text: "#2b2b2b" },
  { name: "dark", bg: "#1a1a1a", text: "#d4d4d4" },
];

const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48];

const radii = [
  { label: "sm", value: 4, css: "4px" },
  { label: "md", value: 8, css: "8px" },
  { label: "lg", value: 12, css: "12px" },
  { label: "full", value: 9999, css: "9999px" },
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

function ColorRow({
  theme,
  colors,
}: {
  theme: string;
  colors: { name: string; hex: string }[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/50 mb-1.5">
        {theme}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
        {colors.map((c) => (
          <div key={c.name} className="space-y-1">
            <div
              className="w-8 h-8 rounded border border-stone-200"
              style={{ background: c.hex }}
            />
            <div className="space-y-0">
              <div className="text-[9px] font-medium text-charcoal leading-tight truncate">
                {c.name}
              </div>
              <div className="font-mono text-[9px] text-charcoal/50 leading-tight">
                {c.hex}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeSpec({
  label,
  fontFamily,
  style,
  sample,
}: {
  label: string;
  fontFamily: string;
  style?: React.CSSProperties;
  sample: React.ReactNode;
}) {
  return (
    <div className="border border-stone-200 rounded-lg p-5 md:p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/50 mb-4">
        {label}
      </div>
      <div className="text-charcoal" style={{ fontFamily, ...style }}>
        {sample}
      </div>
    </div>
  );
}

export function DesignSystemShowcase() {
  return (
    <div className="mx-auto max-w-prose px-6 md:px-10 overflow-hidden">
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
              <SubLabel>Highlight palette</SubLabel>
              <div className="grid grid-cols-5 gap-1">
                {highlights.map((h) => (
                  <div
                    key={h.idx}
                    className="rounded overflow-hidden border border-stone-200 bg-white"
                  >
                    <div
                      className="h-7 flex items-center justify-center px-2"
                      style={{ background: h.color }}
                    >
                      <span className="font-mono text-[10px] text-[#2b2b2b] text-center leading-tight">
                        {h.idx} · {h.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SubLabel>Typography</SubLabel>
              <div className="space-y-3">
                <TypeSpec
                  label="DM Serif Display · Logo"
                  fontFamily="var(--font-dm-serif-display), Georgia, serif"
                  style={{ fontSize: "28px", fontWeight: 400, lineHeight: 1 }}
                  sample="remargin"
                />
                <TypeSpec
                  label="Space Grotesk 400/500 · UI"
                  fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
                  style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.5 }}
                  sample="The quick brown fox jumps over the lazy dog. 0123456789."
                />
                <TypeSpec
                  label="Newsreader 400/400i · Reading surface"
                  fontFamily="var(--font-newsreader), Georgia, serif"
                  style={{ fontSize: "17px", fontWeight: 400, lineHeight: 1.55 }}
                  sample={
                    <>
                      Men with a still natural nature, barbarians in every
                      terrible sense of the word, men of prey, still in
                      possession of <em>unbroken strength of will</em> and
                      desire for power.
                    </>
                  }
                />
              </div>
            </div>

            <div>
              <SubLabel>Reading surfaces</SubLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {surfaces.map((s) => (
                  <div
                    key={s.name}
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
            </div>

            <div>
              <SubLabel>Spacing · 4px grid</SubLabel>
              <div className="flex items-end gap-4 md:gap-5 overflow-x-auto pb-1">
                {spacing.map((s) => (
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
          </div>
        </FadeIn>
    </div>
  );
}
