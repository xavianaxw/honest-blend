import webpack from 'webpack';

// Helpers
import path from "path";
import pathBuilder from "./helpers/path-builder";
import ensureLeadingDot from "./helpers/ensure-leading-dot";
import pathToUrl from "./helpers/path-to-url";

const TerserPlugin = require('terser-webpack-plugin');

const jsSrc = pathBuilder(PATHSCONFIG.src, PATHSCONFIG.javascripts.src);
const jsDest = pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.javascripts.dest);
const publicPath = pathToUrl(TASKSCONFIG.javascripts.publicPath || PATHSCONFIG.javascripts.dest, '/')

const webpackConfig = {
  context: jsSrc,
  mode: isProduction ? 'production' : 'development',
  entry: TASKSCONFIG.javascripts.entry,

  output: {
    path: path.normalize(jsDest),
    filename: '[name].js',
    publicPath,
  },

  module: {
    rules: [
      {
        test: /^(?!.*\.{test,min}\.js$).*\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      ...TASKSCONFIG.javascripts.loaders,
    ]
  },

  plugins: [
    // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
    new webpack.ProvidePlugin(TASKSCONFIG.javascripts.provide),
    ...TASKSCONFIG.javascripts.plugins,
  ],

  resolve: {
    extensions: TASKSCONFIG.javascripts.extensions.map(ensureLeadingDot),
    alias: TASKSCONFIG.javascripts.alias,
    modules: [jsSrc, pathBuilder('node_modules')],
  }

};

if (isProduction) {
  webpackConfig.devtool = TASKSCONFIG.javascripts.production.devtool;

  webpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKSCONFIG.javascripts.production.definePlugin),
    new webpack.NoEmitOnErrorsPlugin(),
    ...TASKSCONFIG.javascripts.production.plugins,
  );

  webpackConfig.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
} else {
  webpackConfig.devtool = TASKSCONFIG.javascripts.development.devtool;

  webpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKSCONFIG.javascripts.development.definePlugin),
    ...TASKSCONFIG.javascripts.development.plugins,
  );
}

module.exports = webpackConfig;