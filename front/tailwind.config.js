/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#0f1014',
        mywhite: '#F8EDED',
        myorange: '#FF8225',
        myred: '#B43F3F', 
        myblue: '#173B45',
      },
    },
  },
  plugins: [],
}