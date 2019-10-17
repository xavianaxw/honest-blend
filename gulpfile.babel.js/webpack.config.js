import webpack from 'webpack';

// Helpers
import path from "path";
import pathBuilder from "./helpers/path-builder";
import ensureLeadingDot from "./helpers/ensure-leading-dot";
import pathToUrl from "./helpers/path-to-url";

const jsSrc = pathBuilder(PATHS.src, PATHS.javascripts.src);
const jsDest = pathBuilder(PATHS.dest, PATHS.javascripts.dest);
const publicPath = pathToUrl(TASKS.javascripts.publicPath || PATHS.javascripts.dest, '/')

const webpackConfig = {
  context: jsSrc,

  entry: TASKS.javascripts.entry,

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
      ...TASKS.javascripts.loaders,
    ]
  },

  plugins: [
    // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
    new webpack.ProvidePlugin(TASKS.javascripts.provide),
    TASKS.javascripts.plugins,
  ],

  resolve: {
    extensions: TASKS.javascripts.extensions.map(ensureLeadingDot),
    alias: TASKS.javascripts.alias,
    modules: [jsSrc, pathBuilder('node_modules')],
  }

};

if (isProduction) {
  const uglifyConfig = TASKS.javascripts.production.uglifyJsPlugin
  webpackConfig.devtool = TASKS.javascripts.production.devtool;

  // enable sourcemap if devtool is defined

  if (webpackConfig.devtool) {
    uglifyConfig.sourceMap = true
  }

  webpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKS.javascripts.production.define),
    new webpack.optimize.UglifyJsPlugin(uglifyConfig),
    new webpack.NoEmitOnErrorsPlugin(),
    ...TASKS.javascripts.production.plugins,
  );
} else {
  webpackConfig.devtool = TASKS.javascripts.development.devtool;

  webpackConfig.plugins.push(
    new webpack.DefinePlugin(TASKS.javascripts.development.define),
    ...TASKS.javascripts.development.plugins,
  );
}

module.exports = webpackConfig;