import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        card: "#F2F2F2",
        ink: "#1A1A1A",
        muted: "#999999",
        line: "#E6E6E6",
        strawberry: "#f94144",
        tangerine: "#f3722c",
        carrot: "#f8961e",
        coral: "#f9844a",
        tuscan: "#f9c74f",
        willow: "#90be6d",
        seagrass: "#43aa8b",
        cyan: "#4d908e",
        slate: "#577590",
        cerulean: "#277da1",
        // Pastel card surfaces — clearly red, blue, green, etc.
        "card-red": "#fde2e3",
        "card-red-hover": "#fcd5d7",
        "card-orange": "#fde5d8",
        "card-orange-hover": "#fdd9c8",
        "card-amber": "#fef0d4",
        "card-amber-hover": "#fde8c4",
        "card-yellow": "#fef4d4",
        "card-yellow-hover": "#feefbf",
        "card-green": "#e6f2dc",
        "card-green-hover": "#dcedcf",
        "card-mint": "#d9f0e8",
        "card-mint-hover": "#c8eade",
        "card-teal": "#d9ebea",
        "card-teal-hover": "#c8e3e1",
        "card-blue-gray": "#e0e8ef",
        "card-blue-gray-hover": "#d3dde6",
        "card-blue": "#d6e9f3",
        "card-blue-hover": "#c5e0ef",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
