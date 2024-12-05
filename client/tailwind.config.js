/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": ["Space Mono", "monospace"],
      },
      colors: {
        "strong-cyan": "hsl(172, 67%, 45%)",
        "dark-cyan": "hsl(183, 100%, 15%)",
        "grayish-cyan": "hsl(184, 14%, 56%)",
        "light-grayish-cyan": " hsl(185, 41%, 84%)",
        "very-light-grayish-cyan": " hsl(189, 41%, 97%)",
        "custom-white": " hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
