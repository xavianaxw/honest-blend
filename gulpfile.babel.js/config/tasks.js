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

  javascripts: {},

  templates: {
    engine: "nunjucks", // or nunjucks

    // https://www.npmjs.com/package/gulp-twig#options
    twig: {},

    // https://www.npmjs.com/package/gulp-nunjucks-render#options
    nunjucks: {
      envOptions: {
        watch: false
      }
    },

    // https://github.com/kangax/html-minifier#options-quick-reference
    htmlmin: {
      collapseWhitespace: true,
    },
  },

  // images
  // icons
  // fonts
  // static
  // svg?
};
