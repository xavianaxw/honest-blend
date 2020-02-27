import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from "../helpers/error-handler";

export function icons() {
  return gulp
    .src(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.icons.src, `**/*.svg`))
    .on('error', errorHandler)
    .pipe(svgmin(TASKSCONFIG.icons.svgmin))
    .on('error', errorHandler)
    .pipe(svgstore(TASKSCONFIG.icons.svgstore))
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.icons.dest)))
    .pipe(browserSync.stream());
}
