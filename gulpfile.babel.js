import { series } from "gulp";
import { styles } from "./gulpfiles/tasks/stylesheets";

// Configuration files
import paths from "./gulpfiles/config/paths";
import tasks from "./gulpfiles/config/tasks";

// Globally expose config objects
global.PATHS = paths;
global.TASKS = tasks;

// Fetch arguments from CLI
var argv = require('minimist')(process.argv.slice(2));

global.production = argv.production;

// Commands
// gulp
export default series(styles);

export const build = cb => {
  cb();
};
