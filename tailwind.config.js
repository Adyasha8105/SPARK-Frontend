module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        secondary: "#292929",
        lighter: "#EFF6FF",
        dark: "#0EA5E9",
        light: "#A2DBFA",
        primary: "#3DA0DE",
        bg: "#F3F4F6",
      },
      dropShadow: {
        secondary: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        secondary: "4px 4px 20px rgba(0, 0, 0, 0.25)",
      },
    },
    letterSpacing: {
      widest2: "1.2rem",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
