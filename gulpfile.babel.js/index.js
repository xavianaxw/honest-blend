import { series, watch, parallel } from 'gulp';

// Configuration files
import paths from './config/paths';
import tasks from './config/tasks';

// Globally expose config objects
global.PATHS = paths;
global.TASKS = tasks;

// Tasks
import { serve, reload } from './tasks/browser-sync';
import { cleanAll, cleanStyles, cleanTemplates } from './tasks/clean';
import { styles } from './tasks/stylesheets';
import { templates } from './tasks/templates';
import { scripts } from './tasks/scripts';
import { images } from './tasks/images';
import { icons } from './tasks/icons';

// Helpers
import pathBuilder from './helpers/path-builder';

// Fetch arguments from CLI
var argv = require('minimist')(process.argv.slice(2));

global.isProduction = argv.production;

// Commands
// gulp
// export default series(styles);
export default series(
  cleanAll,
  parallel(styles, templates, scripts, images, icons),
  serve,
  function watcher() {
    watch(pathBuilder(PATHS.src, PATHS.stylesheets.src, `**/*.{${TASKS.stylesheets.extensions}}`), series(cleanStyles, styles));
    watch(pathBuilder(PATHS.src, PATHS.templates.src, `**/*.{${TASKS.templates.extensions}}`), series(cleanTemplates, templates, reload));
    watch(pathBuilder(PATHS.src, PATHS.javascripts.src, `**/*.{${TASKS.javascripts.extensions}}`), series(scripts, reload));
    watch(pathBuilder(PATHS.src, PATHS.images.src, `**/*.{${TASKS.images.extensions}}`), series(images, reload));
  }
)

export const build = series(
  cleanAll,
  parallel(styles, templates, scripts, images, icons),
);
