const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, "public");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
  entry: SRC_DIR + "/app/index.js", // configure which file to start 
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
  },
  module:{
    rules: [
      {
        test: /\.js$/,  // what files to look for
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: ['file-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html'
    })
  ]
};

module.exports = config;