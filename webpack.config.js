const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/public",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css")
  ],
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    hot: true,
    // compress: true,
    port: 3000
  },
  node: {fs: "empty"}
};
