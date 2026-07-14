import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Soft Pink/Rose palette - EXACT match from vivo v70 image
        ink: "rgb(17 24 39 / <alpha-value>)",
        base: "rgb(255 255 255 / <alpha-value>)",
        "band-1": "rgb(255 229 232 / <alpha-value>)",
        "band-2": "rgb(255 214 219 / <alpha-value>)",
        black: "rgb(26 26 26 / <alpha-value>)",
        
        // Primary: Medium-Dark Rose Pink #C7546D
        orange: "rgb(199 84 109 / <alpha-value>)",
        "orange-light": "rgb(214 112 136 / <alpha-value>)",
        "orange-dark": "rgb(166 63 86 / <alpha-value>)",
        "orange-subtle": "rgb(232 180 192 / <alpha-value>)",
        
        // Accent: Deeper rose
        purple: "rgb(185 72 99 / <alpha-value>)",
        pink: "rgb(214 112 136 / <alpha-value>)",
        
        muted: "rgb(107 114 128 / <alpha-value>)",
        line: "rgba(17 24 39 / 0.06)",
        
        // Legacy tokens
        navy: "rgb(26 26 26 / <alpha-value>)",
        navy2: "rgb(42 42 42 / <alpha-value>)",
        paper: "rgb(255 255 255 / <alpha-value>)",
        soft: "rgb(255 229 232 / <alpha-value>)",
        soft2: "rgb(255 214 219 / <alpha-value>)",
        orange2: "rgb(214 112 136 / <alpha-value>)",
        blue: "rgb(199 84 109 / <alpha-value>)",
        carbon: "rgb(26 26 26 / <alpha-value>)",
        graphite: "rgb(42 42 42 / <alpha-value>)",
        panel: "rgb(255 255 255 / <alpha-value>)",
        panel2: "rgb(255 229 232 / <alpha-value>)",
        cyan: "rgb(199 84 109 / <alpha-value>)",
        indigo: "rgb(199 84 109 / <alpha-value>)",
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
        signal: "0 8px 28px rgb(199 84 109 / 0.35)",
        panel: "0 16px 48px rgb(17 24 39 / 0.10)"
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

