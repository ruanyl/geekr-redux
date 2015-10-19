var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./index.js",
    html: "./index.html"
  },

  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  },

  resolve: {
    root: [path.join(__dirname, "bower_components")]
  },

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader?optional[]=runtime&stage=0"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  },

  devtool: 'source-map',

  externals: {
    //'react': 'React'
  }
};
