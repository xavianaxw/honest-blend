import del from "del";

// Helpers
import pathBuilder from "../helpers/path-builder";

export function cleanAll() {
  return del([ pathBuilder(PATHSCONFIG.dest) ]);
}

export function cleanStyles() {
  return del([ pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.stylesheets.dest) ]);
}

export function cleanTemplates() {
  return del([ pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.templates.dest, "**/*.html") ]);
}

export function cleanImages() {
  return del([
    pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.images.dest, `**/*.{${TASKSCONFIG.images.extensions}}`), 
    `!${pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.images.dest, 'icons.svg')}`
  ]);
}

export function cleanIcons() {
  return del([ pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.images.dest, 'icons.svg') ]);
}

export function cleanFonts() {
  return del([ pathBuilder(PATHSCONFIG.dest, PATHSCONFIG.fonts.dest) ]);
}