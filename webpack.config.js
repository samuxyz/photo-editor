"use strict";

const webpack = require('webpack');
const validate = require('webpack-validator');

const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');

const config = {
	entry: {
		app: [PATHS.src]
	},
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	module: {
    loaders: [
      loaders.babel,
      loaders.css
    ]
  },
	resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map',
  devServer:{
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: process.env.host,
    port: process.env.port,
    contentBase: './dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multistep: true
    })
  ]
};

module.exports = validate(config);
