export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c102b0', // Logo pink
          hover: '#9b018b',
        },
        secondary: {
          DEFAULT: '#32CD32', // Lime Green
          light: '#90EE90',
        },
        background: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
