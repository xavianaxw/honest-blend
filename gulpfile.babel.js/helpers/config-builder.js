import pathsConfig from '../config/paths';
import tasksConfig from '../config/tasks';

const argv = require('minimist')(process.argv.slice(2));

export default function() {
  return {
    paths: pathsConfig,
    tasks: tasksConfig,
    isProduction: argv.production,
  };
}