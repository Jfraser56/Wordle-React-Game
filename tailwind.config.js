module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "ui-sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false,
  },
};
