import gulp from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

// Helpers
import pathBuilder from '../helpers/path-builder';
import errorHandler from '../helpers/error-handler';

export function staticFiles() {
  return gulp
    .src([
      pathBuilder(PATHSCONFIG.src, PATHSCONFIG.static.src, '**/*'),
      `!${pathBuilder(PATHSCONFIG.src, PATHSCONFIG.static.src, `{${TASKSCONFIG.static.excludes}}`)}`,
    ])
    .on('error', errorHandler)
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.static.dest)))
    .pipe(browserSync.stream());
}
