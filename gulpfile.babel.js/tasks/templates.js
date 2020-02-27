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
  const { language, twig: twigOptions, nunjucks: nunjucksOptions } = TASKSCONFIG.templates;

  let templateParser

  if (language === 'twig') {
    templateParser = twig(twigOptions)
  } else if (language === 'nunjucks') {
    templateParser = nunjucksRender(nunjucksOptions)
  }

  return gulp
    .src(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.templates.src, `**/*.{${TASKSCONFIG.templates.extensions}}`))
    .on('error', errorHandler)
    .pipe(templateParser)
    .on('error', errorHandler)
    .pipe(gulpif(!isProduction, htmlmin(TASKSCONFIG.templates.htmlmin)))
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.templates.dest)))
    .pipe(browserSync.stream());
}
