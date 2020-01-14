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

export function cleanImages() {
  return del([
    pathBuilder(PATHS.dest, PATHS.images.dest, `**/*.{${TASKS.images.extensions}}`), 
    `!${pathBuilder(PATHS.dest, PATHS.images.dest, 'icons.svg')}`
  ]);
}

export function cleanIcons() {
  return del([ pathBuilder(PATHS.dest, PATHS.images.dest, 'icons.svg') ]);
}

export function cleanFonts() {
  return del([ pathBuilder(PATHS.dest, PATHS.fonts.dest) ]);
}