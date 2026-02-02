/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00F5D4',    // Plasma Teal
        secondary: '#B9A7FF',  // Holo Lilac
        base: '#07070A',       // Void Black
      },
    },
  },
  plugins: [],
}
