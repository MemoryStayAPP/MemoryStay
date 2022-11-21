/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide_up: {
          '0%': { transform: ' translateY(100px)' },
          '100%': { transform: ' translateY(0px)' },
        },
        fade_in: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.7 },
        }
      },
      animation: {
        FadeIn: 'fade_in ease forwards .5s',
        slideUp: 'slide_up ease forwards .5s',

      },
    },
  },
  plugins: [],
}
