/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        gray: "#2B2D31",
        light_gray: "#35393F",
        primary: "#34D399",
        dark_gray: "#1D1F22",
        very_dark_gray: "#1D1F22",
        editor: "#151619",
        offwhite: "#E5E5E5",
        text: "#C1C4CB",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
