/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 
          50: '#F4F7F9',   // Lightest - your light background
          100: '#E8F0F5',  // Very light
          200: '#D1E1EB',  // Light
          300: '#BAD2E1',  // Medium light
          400: '#A3C3D7',  // Medium
          500: '#57AFCB',  // Your main blue
          600: '#2687AD',  // Your darker blue - main brand color
          700: '#1E6B8A',  // Darker
          800: '#155066',  // Very dark
          900: '#0D3543',  // Darkest
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6', 
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#555555',  // Your medium gray
          700: '#374151',
          800: '#1F2937',
          900: '#212121',  // Your dark gray
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen',
            'Ubuntu', 'Catarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 30%',
      },
    plugins: [],
    },
  },
};