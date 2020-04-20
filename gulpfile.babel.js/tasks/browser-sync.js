import { series, watch } from 'gulp';
import browserSync from "browser-sync";
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";

// Helpers
import pathBuilder from "../helpers/path-builder";
import pathToUrl from "../helpers/path-to-url";

// import { webpackConfig } from '../webpack.config';
// import webpackConfig from '../webpack.config';

const browser = browserSync.create();

export function serve(cb) {
  const middleware = [];

  if (TASKSCONFIG.javascripts) {
    const webpackConfig = require('../webpack.config.js');
    // console.log(`browser-sync: ${pathToUrl('/', webpackConfig.output.publicPath)}`);
    middleware.push(webpackDevMiddleware(webpack(webpackConfig), {
      publicPath: pathToUrl('/', webpackConfig.output.publicPath),
    }));
  }

  browserSync.init({
    server: {
      baseDir: pathBuilder(PATHSCONFIG.dest),
    },
    watch: true,
    middleware,
  });

  // watch(pathBuilder(PATHSCONFIG.dest, '*.js'), browser.reload());
  // watch('*.js', browser.reload());
  // watch('/build/*.js', browser.reload());

  cb();
}

export function reload(cb) {
  browser.reload();
  cb();
}
