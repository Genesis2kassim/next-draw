import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[class="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#DBCC95",
        secondary: "#CD8D7A",
        light: "#C3E2C2",
        lighter: "#EAECCC",
        dark: "#232329",
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000",
      },
    },
  },
  plugins: [],
};
export default config;
