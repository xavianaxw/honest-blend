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
  const { language, twig: twigOptions, nunjucks: nunjucksOptions } = TASKS.templates;

  let templateParser

  if (language === 'twig') {
    templateParser = twig(twigOptions)
  } else if (language === 'nunjucks') {
    templateParser = nunjucksRender(nunjucksOptions)
  }

  return gulp
    .src(pathBuilder(PATHS.src, PATHS.templates.src, `**/*.{${TASKS.templates.extensions}}`))
    .on('error', errorHandler)
    .pipe(templateParser)
    .on('error', errorHandler)
    .pipe(gulpif(!isProduction, htmlmin(TASKS.templates.htmlmin)))
    .pipe(gulp.dest(pathBuilder(PATHS.dest, PATHS.templates.dest)))
    .pipe(browserSync.stream());
}
