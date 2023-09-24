import path from 'path';
import webpack from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const devServerConfig: DevServerConfiguration = {
  port: 3000,
  // static:
  watchFiles: ['src/**'],
  open: true,
  hot: true,
};

const config: webpack.Configuration = {
  mode: 'none',
  entry: './src/script/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: devServerConfig,

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './assets', to: 'assets' }],
    }),
  ],
};

export default config;
