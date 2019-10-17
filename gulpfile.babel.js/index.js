import { series, watch, parallel } from "gulp";

// Configuration files
import paths from "./config/paths";
import tasks from "./config/tasks";

// Globally expose config objects
global.PATHS = paths;
global.TASKS = tasks;

// Tasks
import { serve, reload } from "./tasks/browser-sync";
import { cleanAll, cleanStyles, cleanTemplates } from "./tasks/clean";
import { styles } from "./tasks/stylesheets";
import { templates } from "./tasks/templates";
import { scripts } from "./tasks/scripts";

// Helpers
import pathBuilder from "./helpers/path-builder";

// Fetch arguments from CLI
var argv = require('minimist')(process.argv.slice(2));

global.production = argv.production;
global.isProduction = argv.production;

// Commands
// gulp
// export default series(styles);
export default series(
  cleanAll,
  parallel(styles, templates, scripts),
  serve,
  function watcher() {
    watch(pathBuilder(PATHS.src, PATHS.stylesheets.src, "**/*.scss"), series(cleanStyles, styles));
    watch(pathBuilder(PATHS.src, PATHS.templates.src, "**/*.{html,twig,njk}"), series(cleanTemplates, templates, reload));
    watch(pathBuilder(PATHS.src, PATHS.javascripts.src, "**/*.{js,jsx}"), series(scripts, reload));
  }
)

export const build = series(
  cleanAll,
  parallel(styles, templates, scripts),
);
