/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // purge: {
  //   enabled: true,
  //   content: [
  //     "./src/**/*.{js,jsx,ts,tsx}",
  //     "./public/index.html",
  //   ],

  //   options: {
  //     safelist: [/^p-/], // This regex will match classes that start with 'p-' which is a common prefix for PrimeReact classes
  //   },
  // },
}

