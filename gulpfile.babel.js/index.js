import { series, watch, parallel } from 'gulp';

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
import revTasks from './tasks/rev';

// Helpers
import pathBuilder from './helpers/path-builder';
import configBuilder from './helpers/config-builder';

// Get our configurations
const config = configBuilder();

global.PATHSCONFIG = config.paths;
global.TASKSCONFIG = config.tasks;
global.isProduction = config.isProduction;

// Fetch tasks with configuration only
const tasks = [];

if (TASKSCONFIG.stylesheets) tasks.push(styles);
if (TASKSCONFIG.javascripts) tasks.push(scripts);
if (TASKSCONFIG.templates) tasks.push(templates);
if (TASKSCONFIG.images) tasks.push(images);
if (TASKSCONFIG.icons) tasks.push(icons);
if (TASKSCONFIG.fonts) tasks.push(fonts);
if (TASKSCONFIG.static) tasks.push(staticFiles);

// Commands
// gulp
export default series(
  cleanAll,
  parallel(tasks),
  serve,
  function watcher() {
    if (TASKSCONFIG.stylesheets)
      watch(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.stylesheets.src, `**/*.{${TASKSCONFIG.stylesheets.extensions}}`), series(cleanStyles, styles));
  
    if (TASKSCONFIG.templates)
      watch(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.templates.src, `**/*.{${TASKSCONFIG.templates.extensions}}`), series(cleanTemplates, templates, reload));
      
    if (TASKSCONFIG.images)
      watch(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.images.src, `**/*.{${TASKSCONFIG.images.extensions}}`), series(cleanImages, images, reload));
  
    if (TASKSCONFIG.icons)
      watch(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.icons.src, `**/*.svg`), series(cleanIcons, icons, reload));
  
    if (TASKSCONFIG.fonts)
      watch(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.fonts.src, `**/*.{${TASKSCONFIG.fonts.extensions}}`), series(cleanFonts, fonts, reload));
  
    if (TASKSCONFIG.staticFiles)
      watch(pathBuilder(PATHSCONFIG.src, PATHSCONFIG.static.src, `**/*`), series(staticFiles, reload));
  }
)


// gulp build
export const build = series(
  cleanAll,
  parallel(tasks),
  TASKSCONFIG.production.rev ? revTasks : function revDisabled(cb) { cb(); },
);
