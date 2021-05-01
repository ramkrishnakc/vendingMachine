const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './client/index.js',
    ],
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-redux',
      'redux',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      joi: 'joi-browser',
    },
  },
  mode: 'development',
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false,
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
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
      {
        test: /\.(svg|png|jpg)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'proj.styles.css'}),
    new HtmlWebPackPlugin({
      title: 'Vendor Machine',
      template: './static/index.html',
      favicon: './static/images/favicon.ico',
      inject: true,
      excludeChunks: ['server'],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
