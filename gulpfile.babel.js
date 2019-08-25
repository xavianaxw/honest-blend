import { series } from "gulp";
import { styles } from "./gulpfiles/tasks/stylesheets";

// Configuration files
import paths from "./gulpfiles/config/paths";
import tasks from "./gulpfiles/config/tasks";

// Globally expose config objects
global.PATHS = paths;
global.TASKS = tasks;

// Commands
// gulp
export default series(styles);

export const build = cb => {
  cb();
};
