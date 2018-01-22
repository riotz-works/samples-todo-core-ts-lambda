const path = require('path');
const slsw = require("serverless-webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
    loaders: [
      {
        test:   /\.ts(x?)$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx', '.jsx' ],
  },

  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.built'),
    filename: 'src/api.js',
  },
};
