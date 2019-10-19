import gulp from "gulp";
import gulpif from "gulp-if";
import browserSync from "browser-sync";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";

// Helpers
import pathBuilder from "../helpers/path-builder";
import errorHandler from "../helpers/error-handler";

export function styles() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.stylesheets.src, `**/*.{${TASKS.stylesheets.extensions}}`))
    .on('error', errorHandler)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass(TASKS.stylesheets.sass))
    .on('error', errorHandler)
    .pipe(postcss(
      [
        autoprefixer(TASKS.stylesheets.autoprefixer || {}),
        cssnano(TASKS.stylesheets.cssnano || {}),
      ]
    ))
    .on('error', errorHandler)
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.stylesheets.dest)))
    .pipe(browserSync.stream());
}
