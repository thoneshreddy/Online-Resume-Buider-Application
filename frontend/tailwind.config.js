/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#4f46e5",
          secondary: "#64748b",
          accent: "#22c55e",
          neutral: "#1f2937",
          "base-100": "#ffffff",

          /* 🔑 FORCE HEX COLORS (NO OKLCH) */
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
    logs: false,
  },
};
