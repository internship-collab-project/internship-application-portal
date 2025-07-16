/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {

        }
      },
      fontFamily: {
        sans: [ 'Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen',
            'Ubuntu', 'Catarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 30%',
      },
    plugins: [],
    },
  },
};