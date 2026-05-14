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
        cream: "rgb(var(--rgb-cream) / <alpha-value>)",
        "cream-warm": "rgb(var(--rgb-cream-warm) / <alpha-value>)",
        "cream-deep": "rgb(var(--rgb-cream-deep) / <alpha-value>)",
        charcoal: "rgb(var(--rgb-charcoal) / <alpha-value>)",
        terracotta: "rgb(var(--rgb-terracotta) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
    },
  },
  plugins: [],
};

export default config;
