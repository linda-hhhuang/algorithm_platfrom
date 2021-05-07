module.exports = {
  prefix: "",
  purge: ["./public/**/*.html", "./src/**/*.{html,ts,js}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "9/10": "90.0000000%",
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
  // important: true,
};

// purge: {
//   content: ["./src/**/*.{html,ts}"],
// },
