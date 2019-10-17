import gulp from "gulp";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";
import gulpif from "gulp-if";
import browserSync from "browser-sync";

// Helpers
import pathBuilder from "../helpers/path-builder";
import errorHandler from "../helpers/error-handler";

export function styles() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.stylesheets.src, "**/*.scss"))
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(TASKS.stylesheets.sass))
    .on('error', errorHandler)
    .pipe(postcss(
      [
        autoprefixer(TASKS.stylesheets.autoprefixer || {}),
        cssnano(TASKS.stylesheets.cssnano || {}),
      ]
    ))
    .on('error', errorHandler)
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.stylesheets.dest)))
    .pipe(browserSync.stream());
}
