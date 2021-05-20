const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  darkMode: "media",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat", ...defaultTheme.fontFamily.sans],
        body: ["Lato", ...defaultTheme.fontFamily.sans],
        heading: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        sm: "568px",
        md: "768px",
        lg: "1200px",
        xl: "1440px",
      },
      colors: {
        gray: colors.blueGray,
        primary: {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700],
        },
        discord: {
          light: "#AFBCE9",
          DEFAULT: "#7289DA",
          dark: "#6a7fcc",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/forms")],
};
