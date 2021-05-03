const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './client/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist/dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      joi: 'joi-browser',
    },
  },
  target: 'web',
  // Webpack 4 does not have a CSS minifier, although
  // Webpack 5 will likely come with one
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        // Loads images into CSS and Javascript files
        test: /\.(svg|png|jpg)$/,
        use: [{loader: 'url-loader'}],
      },
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(otf|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: './index.html',
      title: 'Vendor Machine',
      template: './static/index.html',
      favicon: './static/images/favicon.ico',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
