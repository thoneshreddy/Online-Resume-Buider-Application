/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],

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
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      {
        dark: {
          primary: "#818cf8",
          secondary: "#94a3b8",
          accent: "#22c55e",
          neutral: "#e5e7eb",
          "base-100": "#020617",
          info: "#38bdf8",
          success: "#4ade80",
          warning: "#facc15",
          error: "#f87171",
        },
      },
    ],
    logs: false,
  },
};
