const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const absolutize = v => path.join(__dirname, v);
const isProduction = process.env.NODE_ENV === 'production';

module.exports = isDocs => ({
  entry: isDocs ? absolutize('docs/index.tsx') : absolutize('lib/index.tsx'),

  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'none',

  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: absolutize('tsconfig.json')
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/i,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /raw/,
            use: 'raw-loader'
          },
          {
            loader: 'babel-loader',
            options: require('./babel.config.json')
          }
        ]
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },

  ...(isDocs
    ? {
        plugins: [
          new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            BASE_URL: '/'
          }),
          new ForkTsCheckerWebpackPlugin(),
          new HtmlWebpackPlugin({
            inject: 'body',
            template: absolutize('docs/index.html')
          }),
          new CompressionPlugin()
        ],
        output: {
          filename: isProduction ? '[hash].bundle.js' : 'bundle.js',
          publicPath: process.env.BASE_URL
        }
      }
    : {
        plugins: [
          new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
          new BundleAnalyzerPlugin()
        ],
        output: {
          filename: 'restyler.js'
        },
        externals: {
          react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
          },
          'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM'
          }
        }
      })
});
