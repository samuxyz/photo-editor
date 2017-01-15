"use strict";

const PATHS = require('./webpack-paths');

exports.css = {
  test: /\.css$/,
  loaders: ['style', 'css'],
  include: PATHS.css
}

exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loaders: ['babel']
};
