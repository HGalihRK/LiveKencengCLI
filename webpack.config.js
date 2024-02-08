const path = require('path');

module.exports = {
  entry: './dist/main.js',
  output: {
    filename: 'outputBundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};