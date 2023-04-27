/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "bk-bt": ["Futura Bk BT", "sans-serif"],
      "bk-rt": ["Futura Bk RT", "sans-serif"],
      "md-bt": ["Futura Md BT", "sans-serif"],
      miama: ["Miama Nueva", "serif"],
    },
    colors: {
      "main-white": "#f7f7f7",
      "main-black": "#0f172a",
      "main-black-body": "#252850",
      graphite: "#1c1c1c",
      "gray-9": "#777777",
      "gray-6": "#c4c4c4",
      "gray-3": "#e5e5e5",
      "green-1": "#00cc00",
      "green-2": "#79a668",
      "green-3": "#608951",
      "green-4": "#4E7440",
      gold: "#ffd700",
      sun: "#ff8c00",
    },

    extend: {
      backgroundImage: {
        banner: "url('https://mda-web.ru/api/v1/images/banner/banner.jpg')",
        live: "url('https://mda-web.ru/api/v1/images/bg-link/live-plants.jpg')",
        plant: "url('https://mda-web.ru/api/v1/images/bg-link/plant-care.jpg')",
        pots: "url('https://mda-web.ru/api/v1/images/bg-link/pots-access.jpg')",
      },
      screens: {
        "3xl": "1600px",
        "4xl": "1900px",
      },
      keyframes: {
        birth: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        birth: "birth 0.8s",
      },
    },
  },
  plugins: [],
});
