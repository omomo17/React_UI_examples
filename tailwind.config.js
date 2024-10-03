/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#ffd1dc',
        'pastel-blue': '#aec6cf',
        'pastel-green': '#77dd77',
        'pastel-yellow': '#fdfd96',
        'pastel-purple': '#cfcfff',
      },
    },
  },
  plugins: [],
}

