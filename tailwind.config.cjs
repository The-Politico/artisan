/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        blue: '#007BC7',
        red: '#DC0228',
        darkred: '#AC0825',
      },
    },
  },
  plugins: [],
};
