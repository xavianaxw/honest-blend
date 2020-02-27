import gulp, { series } from 'gulp';
import rev from 'gulp-rev';
import revdel from 'gulp-rev-delete-original';
import revRewrite from 'gulp-rev-rewrite';

// Helpers
import pathBuilder from '../helpers/path-builder';

export function revAssets() {
  return gulp.src([
      pathBuilder(PATHSCONFIG.dest,'**/*'),
      '!' + pathBuilder(PATHSCONFIG.dest, '**/*+(css|js|map|json|html)')
    ])
    .pipe(rev())
    .pipe(gulp.dest(PATHSCONFIG.dest))
    .pipe(revdel())
    .pipe(rev.manifest(pathBuilder(PATHSCONFIG.dest, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest('.'));
}

export function revUpdateReferences() {
  return gulp.src(pathBuilder(PATHSCONFIG.dest, '**/**.{css,js}'))
    .pipe(revRewrite({
      manifest: gulp.src(pathBuilder(PATHSCONFIG.dest, "rev-manifest.json"))
    }))
    .pipe(gulp.dest(PATHSCONFIG.dest));
}

export function revCss() {
  return gulp.src(pathBuilder(PATHSCONFIG.dest, '**/*.{css,js}'))
    .pipe(rev())
    .pipe(gulp.dest(PATHSCONFIG.dest))
    .pipe(revdel())
    .pipe(rev.manifest(pathBuilder(PATHSCONFIG.dest, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest('.'));
}

export function revUpdateHtml() {
  return gulp.src(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.templates.dest, '**/*.html'))
    .pipe(revRewrite({
      manifest: gulp.src(pathBuilder(PATHSCONFIG.dest, "rev-manifest.json"))
    }))
    .pipe(gulp.dest(pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.templates.dest)))
}

export default series(
  revAssets, revUpdateReferences, revCss, revUpdateHtml
);
