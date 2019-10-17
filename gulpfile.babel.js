import { series, watch, parallel } from "gulp";

// Configuration files
import paths from "./gulpfiles/config/paths";
import tasks from "./gulpfiles/config/tasks";

// Globally expose config objects
global.PATHS = paths;
global.TASKS = tasks;

// Tasks
import { serve } from "./gulpfiles/tasks/browser-sync";
import { cleanAll, cleanStyles, cleanTemplates } from "./gulpfiles/tasks/clean";
import { styles } from "./gulpfiles/tasks/stylesheets";
import { templates } from "./gulpfiles/tasks/templates";

// Helpers
import pathBuilder from "./gulpfiles/helpers/path-builder";

// Fetch arguments from CLI
var argv = require('minimist')(process.argv.slice(2));

global.production = argv.production;

// Commands
// gulp
// export default series(styles);
export default series(
  cleanAll,
  parallel(styles, templates),
  serve,
  function watcher() {
    watch(pathBuilder(PATHS.src, PATHS.stylesheets.src, "**/*.scss"), series(cleanStyles, styles));
    watch(pathBuilder(PATHS.src, PATHS.templates.src, "**/*.{html,twig,njk}"), series(cleanTemplates, templates));
  }
)

export const build = series(
  cleanAll,
  parallel(styles, templates),
);
