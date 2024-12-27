/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      text: {
        secondary: "rgba(255, 255, 255, 0.6)",
      },
      fontFamily: {
        sans: ["JetBrains Mono", "monospace"],
      },
      typography: {},
    },
  },
  plugins: [],
};
