import browserSync from "browser-sync";

// Helpers
import pathBuilder from "../helpers/path-builder";

export function serve(cb) {
  browserSync.create().init({
    server: {
      baseDir: pathBuilder(PATHS.dest),
    }
  });

  cb();
}

export function reload(cb) {
  browserSync.reload();
  cb();
}
