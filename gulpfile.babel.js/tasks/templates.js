import gulp from "gulp";
import gulpif from "gulp-if";
import browserSync from "browser-sync";
import nunjucksRender from "gulp-nunjucks-render";
import twig from "gulp-twig";
import htmlmin from "gulp-htmlmin";

// Helpers
import pathBuilder from "../helpers/path-builder";
import errorHandler from "../helpers/error-handler";

export function templates() {
  const { engine, twig: twigOptions, nunjucks: nunjucksOptions } = TASKS.templates;

  return gulp
    .src(pathBuilder(PATHS.src, PATHS.templates.src, "**/*.{html,twig,njk}"))
    .on('error', errorHandler)
    .pipe(gulpif(engine === "twig", twig(twigOptions)))
    .pipe(gulpif(engine === "nunjucks", nunjucksRender(nunjucksOptions)))
    .on('error', errorHandler)
    .pipe(gulpif(global.production, htmlmin(TASKS.templates.htmlmin)))
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.templates.dest)))
    .pipe(browserSync.stream());
}
