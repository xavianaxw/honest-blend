import gulp from "gulp";
import gulpif from "gulp-if";
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';

// Helpers
import pathBuilder from "../helpers/path-builder";
import errorHandler from "../helpers/error-handler";

export function scripts() {
  return gulp
    .src(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.javascripts.src, `**/*.{${TASKSCONFIG.javascripts.extensions}}`))
    .on('error', errorHandler)
    .pipe(gulpWebpack(require('../webpack.config.js'), webpack))
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.javascripts.dest)))
}
    