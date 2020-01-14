import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from "../helpers/error-handler";

export function icons() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.icons.src, `**/*.svg`))
    .on('error', errorHandler)
    .pipe(svgmin(TASKS.icons.svgmin))
    .on('error', errorHandler)
    .pipe(svgstore(TASKS.icons.svgstore))
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.icons.dest)))
    .pipe(browserSync.stream());
}
