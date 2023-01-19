/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
 theme: {
  
  colors: {
    'primary': '#003049',
    'bgclr': '#ECF0F1',
    'blue': '#3498DB',
    'white': '#ffffff',
    'labelclr':"#2C3E50"
  },
  
},
plugins: [
  require('tw-elements/dist/plugin')
]
}
