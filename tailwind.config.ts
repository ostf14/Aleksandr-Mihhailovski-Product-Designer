import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Legacy warm-cream palette — every component still reads these.
        cream: "rgb(var(--rgb-cream) / <alpha-value>)",
        "cream-warm": "rgb(var(--rgb-cream-warm) / <alpha-value>)",
        "cream-deep": "rgb(var(--rgb-cream-deep) / <alpha-value>)",
        charcoal: "rgb(var(--rgb-charcoal) / <alpha-value>)",
        terracotta: "rgb(var(--rgb-terracotta) / <alpha-value>)",

        // Semantic tokens (portfolio_refactor_spec step 5a). Staged for
        // per-class migration in 5b. Nothing consumes them yet.
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Switzer", "system-ui", "sans-serif"],
        serif: ["Gambarino", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        prose: "720px",
        bleed: "1080px",
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.875rem, 4vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },

      // Motion + elevation scale (visual_refresh_spec step 1). These read the
      // custom properties in globals.css so markup and hand-written CSS can
      // never drift apart. Additive only: no Tailwind default is overridden,
      // in particular `shadow-sm` keeps its stock value because the whole site
      // already leans on it.
      transitionDuration: {
        t1: "var(--t-1)",
        t2: "var(--t-2)",
        t3: "var(--t-3)",
        t4: "var(--t-4)",
        t5: "var(--t-5)",
        t6: "var(--t-6)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--e-out)",
        "in-expo": "var(--e-in)",
        both: "var(--e-both)",
        spring: "var(--e-spring)",
      },
      boxShadow: {
        pill: "var(--sh-pill)",
        btn1: "var(--btn1-sh)",
        btn2: "var(--btn2-sh)",
      },
      spacing: {
        bay: "var(--bay)",
      },
    },
  },
  plugins: [],
};

export default config;
