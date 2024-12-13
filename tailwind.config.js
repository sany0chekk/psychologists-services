/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#54BE96",
        lightGreen: "#54BE9633",
        darkGreen: "#36a379",
        light: "#FBFBFB",
        bg: "#F3F3F3",
        dark: "#191A15",
        purple: "#4535af",
        yellow: "#fbc75e",
        grey: "#8a8a89",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        laptop: "1184px",
      },
    },
  },
  plugins: [],
};
