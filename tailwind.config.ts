import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9990EA",
        secondary: "#8DFFE0",
        dark: "#0a0a0a",
        "dark-light": "#1a0a2e",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(135deg, #8DFFE0 0%, #9990EA 100%)",
        "gradient-purple": "linear-gradient(135deg, #9990EA 0%, #7B6FD6 100%)",
        "gradient-aqua": "linear-gradient(135deg, #8DFFE0 0%, #6FE6CC 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "scanlines": "scanlines 8s linear infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "matrix-scroll": "matrix-scroll 10s linear infinite",
        "typing": "typing 2s steps(40, end)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(153,144,234,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(153,144,234,0.6)" },
        },
        "neon-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(141,255,224,0.5), 0 0 20px rgba(141,255,224,0.3), 0 0 30px rgba(141,255,224,0.2)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(141,255,224,0.8), 0 0 40px rgba(141,255,224,0.5), 0 0 60px rgba(141,255,224,0.3)"
          },
        },
        scanlines: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "matrix-scroll": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
