require('@babel/polyfill')

// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
})

// Import the rest of our application.
module.exports = require('./src/index')
