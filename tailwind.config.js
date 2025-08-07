/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts,md}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ["Playwrite BE WAL", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}

