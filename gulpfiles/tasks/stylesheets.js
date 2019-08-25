import gulp from "gulp";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
// import gulpif from "gulp-if";
import shortColor from "postcss-short-color";

// Helpers
import pathBuilder from "../helpers/path-builder";

export function compile() {
  return gulp
    .src(pathBuilder(PATHS.src, PATHS.stylesheets.src, "**/*.scss"))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([shortColor]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.stylesheets.dest)));
}

export const styles = gulp.series(compile);
