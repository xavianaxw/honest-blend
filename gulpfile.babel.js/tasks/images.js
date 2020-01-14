import gulp from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from "../helpers/error-handler";

export function images() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.images.src, `**/*.{${TASKS.images.extensions}}`))
    .on('error', errorHandler)
    .pipe(changed(pathBuilder(PATHS.dest, PATHS.images.dest)))
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.images.dest)))
    .pipe(browserSync.stream());
}
