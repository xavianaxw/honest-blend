import del from "del";

// Helpers
import pathBuilder from "../helpers/path-builder";

export function cleanAll() {
  return del([ pathBuilder(PATHS.dest) ]);
}

export function cleanStyles() {
  return del([ pathBuilder(PATHS.dest, PATHS.stylesheets.dest) ]);
}

export function cleanTemplates() {
  return del([ pathBuilder(PATHS.dest, PATHS.templates.dest, "**/*.html") ]);
}