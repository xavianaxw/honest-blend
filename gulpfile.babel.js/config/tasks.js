/*
===============================================================================
  Configurations related to build tasks
===============================================================================
*/

export default {
  stylesheets: {
    extensions: ['css', 'scss'],
    sass: {
      includePaths: ['./node_modules'],
    },
    stylelint: {
      failAfterError: true,
      reports: [{ formatter: 'verbose', console: true }],
      syntax: 'scss',
    },
    autoprefixer: {
      grid: 'no-autoplace',
    },
    cssnano: {},
  },

  javascripts: {
    extensions: ['js', 'jsx'],

    entry: {
      app: ['./app.js'],
    },

    // needed only if path differs from path config
    // publicPath: ',

    provide: {},

    alias: {},

    loaders: [],

    plugins: [],

    development: {
      devtool: 'eval-cheap-module-source-map',
      definePlugin: {},
      plugins: [],
    },

    // production only settings
    production: {
      devtool: false,
      definePlugin: {
        'isProduction': true,
      },
      plugins: [],
    },
  },

  templates: {
    extensions: ['html', 'njk'], // or twig
    language: 'nunjucks', // or twig

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

  images: {
    extensions: ['jpg', 'png', 'svg', 'gif']
  },

  icons: {
    svgmin: {
      plugins: [
        { removeViewBox: false },
      ],
    },
    svgstore: {},
  },

  // fonts
  // static
  // svg?
};
