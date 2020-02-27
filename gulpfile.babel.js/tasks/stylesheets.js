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
  // for all environment
  const postcssPlugins = [
    // add autoprefixer
    autoprefixer(TASKSCONFIG.stylesheets.autoprefixer || {}),
  ];

  // only in production
  if (isProduction) {
    // add cssnano
    postcssPlugins.push(cssnano(TASKSCONFIG.stylesheets.cssnano || {}));
  }

  return gulp
    .src(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.stylesheets.src, `**/*.{${TASKSCONFIG.stylesheets.extensions}}`))
    .on('error', errorHandler)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass(TASKSCONFIG.stylesheets.sass))
    .on('error', errorHandler)
    .pipe(postcss(
      [...postcssPlugins, ...TASKSCONFIG.stylesheets.postcss.plugins], 
      TASKSCONFIG.stylesheets.postcss.options
    ))
    .on('error', errorHandler)
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.stylesheets.dest)))
    .pipe(browserSync.stream());
}
