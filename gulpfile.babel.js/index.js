import { series, watch, parallel } from 'gulp';

// Configuration files
import pathsConfig from './config/paths';
import tasksConfig from './config/tasks';

// Globally expose config objects
global.PATHS = pathsConfig;
global.TASKS = tasksConfig;

// Tasks
import { serve, reload } from './tasks/browser-sync';
import { cleanAll, cleanStyles, cleanTemplates, cleanImages, cleanFonts, cleanIcons } from './tasks/clean';
import { styles } from './tasks/stylesheets';
import { templates } from './tasks/templates';
import { scripts } from './tasks/scripts';
import { images } from './tasks/images';
import { icons } from './tasks/icons';
import { fonts } from './tasks/fonts';
import { staticFiles } from './tasks/static';
// import { revAssets, revUpdateReferences, revCss, revUpdateHtml } from './tasks/rev';
import revTasks from './tasks/rev';

// Helpers
import pathBuilder from './helpers/path-builder';

// Fetch arguments from CLI
var argv = require('minimist')(process.argv.slice(2));
global.isProduction = argv.production;

// Fetch tasks with configuration only
const tasks = [];

if (tasksConfig.stylesheets) tasks.push(styles);
if (tasksConfig.javascripts) tasks.push(scripts);
if (tasksConfig.templates) tasks.push(templates);
if (tasksConfig.images) tasks.push(images);
if (tasksConfig.icons) tasks.push(icons);
if (tasksConfig.fonts) tasks.push(fonts);
if (tasksConfig.static) tasks.push(staticFiles);

console.log(tasks);

// Commands
// gulp
export default series(
  cleanAll,
  // parallel(styles, templates, scripts, images, icons, fonts, staticFiles),
  parallel(...tasks),
  serve,
  function watcher() {
    if (tasksConfig.stylesheets)
      watch(
        pathBuilder(PATHS.src, PATHS.stylesheets.src, `**/*.{${TASKS.stylesheets.extensions}}`), 
        series(cleanStyles, styles)
      );
      
    // watch(pathBuilder(PATHS.src, PATHS.templates.src, `**/*.{${TASKS.templates.extensions}}`), series(cleanTemplates, templates, reload));
    // watch(pathBuilder(PATHS.src, PATHS.javascripts.src, `**/*.{${TASKS.javascripts.extensions}}`), series(scripts, reload));
    // watch(pathBuilder(PATHS.src, PATHS.images.src, `**/*.{${TASKS.images.extensions}}`), series(cleanImages, images, reload));
    // watch(pathBuilder(PATHS.src, PATHS.icons.src, `**/*.svg`), series(cleanIcons, icons, reload));
    // watch(pathBuilder(PATHS.src, PATHS.fonts.src, `**/*.{${TASKS.fonts.extensions}}`), series(cleanFonts, fonts, reload));
    // watch(pathBuilder(PATHS.src, PATHS.static.src, `**/*`), series(staticFiles, reload));
  }
)

// gulp build
export const build = series(
  cleanAll,
  parallel(styles, templates, scripts, images, icons, fonts, staticFiles),
  TASKS.production.rev ? revTasks : function revDisabled(cb) { cb(); },
);
