/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryLight: "#6B0000",
        onPrimaryLight: "#FFFFFF",
        primaryContainerLight: "#FDF5E6",
        text: "#1a0000",
        background: "#FDF5E6",
        primary: "#6B0000",
        secondary: "#D4AF37",
        accent: "#D4AF37",
      },
    },
  },
  plugins: [],
};
