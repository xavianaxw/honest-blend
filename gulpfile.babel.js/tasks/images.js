import gulp from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from "../helpers/error-handler";

export function images() {
  return gulp
    .src(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.images.src, `**/*.{${TASKSCONFIG.images.extensions}}`))
    .on('error', errorHandler)
    .pipe(changed(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.images.dest)))
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.images.dest)))
    .pipe(browserSync.stream());
}
