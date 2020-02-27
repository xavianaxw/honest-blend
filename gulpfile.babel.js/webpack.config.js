import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

// Helpers
import path from "path";
import configBuilder from './helpers/config-builder';
import pathBuilder from "./helpers/path-builder";
import ensureLeadingDot from "./helpers/ensure-leading-dot";
import pathToUrl from "./helpers/path-to-url";

// Get our configurations
const config = configBuilder();

const PATHSCONFIG = config.paths;
const TASKSCONFIG = config.tasks;
const isProduction = config.isProduction;

const jsSrc = pathBuilder(PATHSCONFIG.src, PATHSCONFIG.javascripts.src);
const jsDest = pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.javascripts.dest);
const publicPath2 = pathToUrl(TASKSCONFIG.javascripts.publicPath || PATHSCONFIG.javascripts.dest, '/')
const publicPath = '/build/';
const extensions = TASKSCONFIG.javascripts.extensions.map(ensureLeadingDot);

console.log(publicPath2);
console.log(publicPath);

// build our babelLoader
const babelLoader = {
  test: TASKSCONFIG.javascripts.babelLoader.test || new RegExp(`(\\${extensions.join('$|')}$)`),
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: TASKSCONFIG.javascripts.babelLoader.options || { presets: ['@babel/preset-env'] },
  }
};

// https://webpack.js.org/configuration/
const generatedWebpackConfig = {
  context: jsSrc,
  mode: isProduction ? 'production' : 'development',
  entry: TASKSCONFIG.javascripts.entry,

  output: {
    path: jsDest,
    filename: '[name].js',
    publicPath,
    pathinfo: true,
  },

  module: {
    rules: [
      babelLoader,
      ...TASKSCONFIG.javascripts.loaders,
    ]
  },

  plugins: [
    // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
    new webpack.ProvidePlugin(TASKSCONFIG.javascripts.provide),
    ...TASKSCONFIG.javascripts.plugins,
  ],

  resolve: {
    extensions,
    alias: TASKSCONFIG.javascripts.alias,
    modules: [jsSrc, pathBuilder('node_modules')],
  }

};

if (isProduction) {
  generatedWebpackConfig.devtool = TASKSCONFIG.javascripts.production.devtool;

  generatedWebpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKSCONFIG.javascripts.production.definePlugin),
    new webpack.NoEmitOnErrorsPlugin(),
    ...TASKSCONFIG.javascripts.production.plugins,
  );

  generatedWebpackConfig.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
} else {
  generatedWebpackConfig.devtool = TASKSCONFIG.javascripts.development.devtool;

  generatedWebpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKSCONFIG.javascripts.development.definePlugin),
    ...TASKSCONFIG.javascripts.development.plugins,
  );
}

module.exports = generatedWebpackConfig;
