import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Red / White / Black brand palette
        ink: "rgb(17 17 17 / <alpha-value>)",
        base: "rgb(255 255 255 / <alpha-value>)",
        "band-1": "rgb(255 255 255 / <alpha-value>)",
        "band-2": "rgb(244 244 244 / <alpha-value>)",
        black: "rgb(10 10 10 / <alpha-value>)",

        // Primary: bold red #E2231A
        orange: "rgb(226 35 26 / <alpha-value>)",
        "orange-light": "rgb(255 75 62 / <alpha-value>)",
        "orange-dark": "rgb(161 14 10 / <alpha-value>)",
        "orange-subtle": "rgb(240 216 214 / <alpha-value>)",

        // Accent: red tones reused for gradients/badges
        purple: "rgb(226 35 26 / <alpha-value>)",
        pink: "rgb(255 75 62 / <alpha-value>)",

        muted: "rgb(90 90 90 / <alpha-value>)",
        line: "rgba(17 17 17 / 0.08)",

        // Legacy tokens
        navy: "rgb(10 10 10 / <alpha-value>)",
        navy2: "rgb(26 26 26 / <alpha-value>)",
        paper: "rgb(255 255 255 / <alpha-value>)",
        soft: "rgb(255 255 255 / <alpha-value>)",
        soft2: "rgb(244 244 244 / <alpha-value>)",
        orange2: "rgb(255 75 62 / <alpha-value>)",
        blue: "rgb(226 35 26 / <alpha-value>)",
        carbon: "rgb(10 10 10 / <alpha-value>)",
        graphite: "rgb(26 26 26 / <alpha-value>)",
        panel: "rgb(255 255 255 / <alpha-value>)",
        panel2: "rgb(244 244 244 / <alpha-value>)",
        cyan: "rgb(226 35 26 / <alpha-value>)",
        indigo: "rgb(226 35 26 / <alpha-value>)",
        emerald: "rgb(45 160 120 / <alpha-value>)"
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)"],
        display: ["Manrope", "var(--font-display)"],
        mono: ["JetBrains Mono", "var(--font-mono)"]
      },
      fontWeight: {
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700"
      },
      borderRadius: {
        system: "14px"
      },
      boxShadow: {
        signal: "0 8px 28px rgb(226 35 26 / 0.35)",
        panel: "0 16px 48px rgb(17 17 17 / 0.10)"
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }
  },
  plugins: []
};

export default config;

