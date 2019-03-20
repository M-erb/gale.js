const tailwindcss = require('tailwindcss')
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    tailwindcss('./client/tailwind.config.js'),
    require('autoprefixer')
  ]
}
