module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': ['10px', '0px'],
      }
    },
  },
  plugins: [
    require('tailwindcss-image-rendering')(),
  ],
}