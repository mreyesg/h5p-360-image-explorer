var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './scripts/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'scripts'),
      }
    ]
  }
};