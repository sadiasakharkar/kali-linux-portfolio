// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kali: {
          black: "#0f0f0f",
          blue: "#0080ff",
          red: "#ff0040",
          green: "#00ff9f",
        },
      },
    },
  },

  plugins: [],
};
