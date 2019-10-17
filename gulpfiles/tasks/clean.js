import del from "del";

// Helpers
import pathBuilder from "../helpers/path-builder";

export function cleanAll() {
  return del([ pathBuilder(PATHS.dest) ]);
}

export function cleanStyles() {
  return del([ pathBuilder(PATHS.stylesheets.dest) ]);
}