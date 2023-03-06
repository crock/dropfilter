const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "568px",
        md: "768px",
        lg: "1200px",
        xl: "1440px",
      },
      colors: {
        gray: colors.slate,
        lime: colors.lime,
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
        range: {
					poor: colors.red[500],
					fair: colors.orange[500],
					average: colors.yellow[500],
					good: colors.lime[500],
					excellent: colors.green[500],
				},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
