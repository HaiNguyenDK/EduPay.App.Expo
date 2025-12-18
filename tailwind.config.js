/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        plus: ["PlusJakarta-Regular"],
      },
      boxShadow: {
        custom: "0px 4px 32px -6px #0000002B",
        "custom-number": "0px 4px 24px 0px rgba(0, 0, 0, 0.04)",
        "custom-both": "0px 4px 4px 0px #00009140, inset 0px 7px 4px 0px #FFFFFF40",
        'custom-shadow-pink': '0px 4px 12px 0px #CE00001F',
        'custom-shadow-blue': '0px 4px 12px 0px #001FCE1F',
        'custom-shadow-purple': '0px 4px 12px 0px #CE00CB1F',
        'custom-shadow-red': '0px 4px 12px 0px #CE00001F',
        'custom-shadow-green': '0px 4px 12px 0px #00CE181F',
      },
    },
  },
  plugins: [],
};
