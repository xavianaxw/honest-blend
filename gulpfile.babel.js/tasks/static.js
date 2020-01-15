import gulp from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from '../helpers/error-handler';

export function staticFiles() {
  return gulp
    .src([
      pathBuilder(PATHS.src, PATHS.static.src, '**/*'),
      `!${pathBuilder(PATHS.src, PATHS.static.src, `{${TASKS.static.excludes}}`)}`,
    ])
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.static.dest)))
    .pipe(browserSync.stream());
}
