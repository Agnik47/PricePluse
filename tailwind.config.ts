/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          "indigo": "#4f46e5",
          "purple": "#8b5cf6"
        },
        secondary: "#f8fafc",
        dark: {
          "bg": "#0f172a",
          "surface": "#1e293b",
          "card": "#334155",
          "border": "#475569",
          "text": "#e2e8f0",
          "muted": "#94a3b8"
        },
        accent: {
          "green": "#10b981",
          "yellow": "#f59e0b",
          "red": "#ef4444"
        },
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        "dark-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)"
      },
      maxWidth: {
        "10xl": '1440px'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        10: "10px",
        20: "20px"
      }
    },
  },
  plugins: [],
};