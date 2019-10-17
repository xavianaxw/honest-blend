import { series, watch, parallel } from "gulp";

// Configuration files
import paths from "./gulpfiles/config/paths";
import tasks from "./gulpfiles/config/tasks";

// Globally expose config objects
global.PATHS = paths;
global.TASKS = tasks;

// Tasks
import { serve } from "./gulpfiles/tasks/browser-sync";
import { styles } from "./gulpfiles/tasks/stylesheets";

// Helpers
import pathBuilder from "./gulpfiles/helpers/path-builder";

// Fetch arguments from CLI
var argv = require('minimist')(process.argv.slice(2));

global.production = argv.production;

// Commands
// gulp
// export default series(styles);
export default series(
  // clean,
  parallel(styles),
  serve,
  () => {
    watch(pathBuilder(PATHS.src, PATHS.stylesheets.src, "**/*.scss"), series(styles));
  }
)

export const build = series(
  // clean
  parallel(styles),
);
