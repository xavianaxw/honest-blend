import { series, watch } from 'gulp';
import browserSync from "browser-sync";
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from '../webpack.config';

// Helpers
import pathBuilder from "../helpers/path-builder";
import pathToUrl from "../helpers/path-to-url";

const browser = browserSync.create();

export function serve(cb) {
  const middleware = [];
  const compiler = webpack(webpackConfig);

  if (TASKSCONFIG.javascripts) {
    middleware.push(webpackDevMiddleware(compiler, {
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
