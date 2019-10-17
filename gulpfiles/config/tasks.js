/*
===============================================================================
  Configurations related to build tasks
===============================================================================
*/

export default {
  stylesheets: {
    sass: {
      includePaths: ["./node_modules"],
    },
    stylelint: {
      failAfterError: true,
      reports: [{ formatter: "verbose", console: true }],
      syntax: "scss",
    },
    autoprefixer: {
      grid: "no-autoplace",
    },
    cssnano: {},
  },
};
