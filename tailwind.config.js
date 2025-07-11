/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      text: {
        secondary: "rgba(255, 255, 255, 0.6)",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      typography: {},
      gridTemplateColumns: ["landscape"],
      gridTemplateRows: ["landscape"],
      width: ["landscape"],
      order: ["landscape"],
      height: ["landscape"],
      overflow: ["landscape"],
      padding: ["landscape"],
      flexDirection: ["landscape"],
      gap: ["landscape"],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("landscape", "@media (orientation: landscape)");
    },
  ],
};
