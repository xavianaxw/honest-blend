import gulp from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from "../helpers/error-handler";

export function fonts() {
  return gulp
    .src(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.fonts.src, `**/*.{${TASKSCONFIG.fonts.extensions}}`))
    .on('error', errorHandler)
    .pipe(changed(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.fonts.dest)))
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.fonts.dest)))
    .pipe(browserSync.stream());
}
