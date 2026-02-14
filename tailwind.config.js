/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryLight: "#702963",
        onPrimaryLight: "#FFFFFF",
        primaryContainerLight: "#fcf8f8",
        text: "#170c0c",
        background: "#fcf8f8",
        primary: "#702963",
        secondary: "#e0a09d",
        accent: "#d7716c",
      },
    },
  },
  plugins: [],
};
