module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      letterSpacing: {
        "1rem": "1rem",
        "10px": "10px",
        "5px": "5px",
      },
      height: {
        fit: "fit-content",
      },
      width: {
        fit: "fit-content",
      },
      maxWidth: {
        screen: "100vw",
        "1/2": "50%",
      },
      transitionDuration: {
        1500: "1500ms",
        2000: "2000ms",
        3000: "3000ms",
      },
      zIndex: {
        "-10": "-10",
      },
      translate: {
        "-150": "-150%",
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"],
    },
  },
  plugins: [],
};
