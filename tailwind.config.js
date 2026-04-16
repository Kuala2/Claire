export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c1009a', // Claire Pink
          hover: '#a00080',
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
