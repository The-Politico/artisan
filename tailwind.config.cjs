/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        blue: '#007BC7',
        red: '#DC0228',
        'darkred': '#AC0825',
      },
    },
  },
  plugins: [],
};
