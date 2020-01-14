import gulp from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from "../helpers/error-handler";

export function fonts() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.fonts.src, `**/*.{${TASKS.fonts.extensions}}`))
    .on('error', errorHandler)
    .pipe(changed(pathBuilder(PATHS.dest, PATHS.fonts.dest)))
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.fonts.dest)))
    .pipe(browserSync.stream());
}
