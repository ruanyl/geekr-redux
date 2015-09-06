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
        loader: "style/url!file"
      }
    ]
  },

  devtool: 'source-map',

  externals: {
    //'react': 'React'
  }
};
