import browserSync from "browser-sync";

// Helpers
import pathBuilder from "../helpers/path-builder";

export function serve(cb) {
  browserSync.create().init({
    server: {
      baseDir: pathBuilder(PATHS.dest),
    },
    files: [pathBuilder(PATHS.dest, PATHS.stylesheets.dest, "*.css")]
  });

  cb();
}

export function reload(cb) {
  browserSync.reload();
  cb();
}
