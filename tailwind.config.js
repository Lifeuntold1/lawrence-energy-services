/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#D9251C',
          deep: '#B01E17',
          tint: '#FDECEA',
        },
        yellow: {
          DEFAULT: '#FFF500',
          gold: '#E6DA00',
        },
        black: '#0C0C0C',
        ink: '#1A1A1A',
        grey: '#5B5B5B',
        line: '#E7E7E7',
        cream: '#FFFBEA',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        cursive: ['"Dancing Script"', '"Caveat"', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '6px',
        brand: '6px',
      },
      boxShadow: {
        card: '0 10px 30px rgba(12, 12, 12, 0.08)',
        hover: '0 20px 40px rgba(12, 12, 12, 0.16)',
        focus: '0 0 0 3px #0C0C0C, 0 0 0 6px #FFF500',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
