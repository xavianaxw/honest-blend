import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

// Helpers
import queryString from 'query-string';
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
const publicPath = pathToUrl(TASKSCONFIG.javascripts.publicPath || PATHSCONFIG.javascripts.dest, '/')
const extensions = TASKSCONFIG.javascripts.extensions.map(ensureLeadingDot);

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
  // production environment
  // devtool
  generatedWebpackConfig.devtool = TASKSCONFIG.javascripts.production.devtool;

  // plugins
  generatedWebpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKSCONFIG.javascripts.production.definePlugin),
    new webpack.NoEmitOnErrorsPlugin(),
    ...TASKSCONFIG.javascripts.production.plugins,
  );

  // optimization for minimizer
  generatedWebpackConfig.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
    ...TASKSCONFIG.javascripts.production.optimization,
  };
} else {
  // development environment
  // hot module reloading
  if (TASKSCONFIG.javascripts.hot) {
    for (let key in TASKSCONFIG.javascripts.entry) {
      const newEntriesToAdd = [];

      // if react hot enabled
      // newEntriesToAdd.push('react-hot-loader/patch');

      newEntriesToAdd.push(`webpack-hot-middleware/client?${queryString.stringify(TASKSCONFIG.javascripts.hot)}`);

      TASKSCONFIG.javascripts.entry[key] = [...TASKSCONFIG.javascripts.entry[key], ...newEntriesToAdd];
    };

    // add plugins incl webpack.HotModuleReplacementPlugin()
    generatedWebpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      ...TASKSCONFIG.javascripts.development.plugins,
    );

    // add optimization
    generatedWebpackConfig.optimization = {
      ...TASKSCONFIG.javascripts.development.optimization,
    };
  }

  // devtool
  generatedWebpackConfig.devtool = TASKSCONFIG.javascripts.development.devtool;

  // plugins
  generatedWebpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKSCONFIG.javascripts.development.definePlugin),
    ...TASKSCONFIG.javascripts.development.plugins,
  );
}

module.exports = generatedWebpackConfig;
