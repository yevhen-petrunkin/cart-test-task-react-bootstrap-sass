const webpack = require('webpack');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },

  mode: 'development',

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './build'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Online Shop Cart Model',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SANITY_PROJECT_ID': JSON.stringify('80qddw81'),
      'process.env.REACT_APP_SANITY_TOKEN': JSON.stringify(
        'skiSfvmqTKq4Na1Kd8zsoXCuOMFDYQHSVgE3g0fsVhG7NFVjfE0JVU3KpPvn97VURiFYQgc247CDGcZ249hR3rSsvIStz0kVe6nK09O2lVhVQ7AFHn5qSBxRrfH3364S1szpMQFSKxE7L9SkOu4K3z2LZyPKehzPOw3JOTR3e45wstFiBhK6'
      ),
    }),
    new FaviconsWebpackPlugin('./public/favicon/logo.png'),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              minimizerOptions: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['jpegtran', { progressive: true }],
                  ['optipng', { optimizationLevel: 5 }],
                  ['svgo', { plugins: [{ removeViewBox: false }] }],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
