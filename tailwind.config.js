/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // This should catch all files
    "./src/*.{js,jsx,ts,tsx}",     // Catch files in src root
    "./public/index.html",         // Include HTML if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}