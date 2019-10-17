import gulp from "gulp";
import gulpif from "gulp-if";
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';

// Helpers
import pathBuilder from "../helpers/path-builder";
import errorHandler from "../helpers/error-handler";

export function scripts() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.scripts.src, "**/*.{js,jsx}"))
    .pipe(plumber({errorHandler}))
    .pipe(gulpWebpack(require('../../webpack.config.js'), webpack))
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.scripts.dest)))
}
    