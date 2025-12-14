/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Brand gradient anchors
        brandStart: "#1DDAFF",
        brandEnd: "#EA1AF7",
        bgCard: "#0b263a",
        primary: "#94c3cb",
        secondary: "#1DDAFF",
        "primary-light": "#04d8ef",
        "primary-dark": "#b20020",
        dark: "#b20020",
      },
    },
  },
  plugins: [],
};
