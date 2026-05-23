import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#e8edf2",
          100: "#c5d0db",
          200: "#9eb0c2",
          300: "#778fa8",
          400: "#587595",
          500: "#3a5c82",
          600: "#2b4d72",
          700: "#1a3a5e",
          800: "#0d2b45",
          900: "#071c2e",
          950: "#030e18",
        },
        teal: {
          50:  "#e0f7f7",
          100: "#b3ecec",
          200: "#80dfdf",
          300: "#4dd2d2",
          400: "#26c7c7",
          500: "#0fa3a3",
          600: "#0d9191",
          700: "#0a7b7b",
          800: "#086666",
          900: "#054444",
        },
        gold: {
          50:  "#fdf8e7",
          100: "#faecbf",
          200: "#f5d980",
          300: "#f0c740",
          400: "#e5b820",
          500: "#d4a017",
          600: "#b88a12",
          700: "#9a730f",
          800: "#7d5d0b",
          900: "#614808",
        },
        slate: {
          DEFAULT: "#333B41",
        },
        light: {
          DEFAULT: "#F2F4F1",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, #0d2b45 0%, #1a3a5e 50%, #0fa3a3 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
