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

    // by default, autoprefixer and cssnano (production only) are added

    // https://github.com/postcss/autoprefixer#options
    autoprefixer: {
      grid: 'no-autoplace',
    },

    // https://cssnano.co/guides/optimisations
    cssnano: {},

    // postcss configurations
    // https://github.com/postcss/postcss
  
    postcss: {
      // https://github.com/postcss/postcss#plugins
      plugins: [],

      // https://github.com/postcss/postcss#options
      options: {},
    }
  },

  javascripts: {
    extensions: ['js', 'jsx'],

    entry: {
      app: ['./app.js'],
    },

    // needed only if path differs from path config
    // publicPath: '',

    provide: {},

    alias: {},

    babelLoader: {
      // also accepts the following configuration options
      // test
      // exclude

      // https://github.com/babel/babel-loader#options
      // options
    },

    loaders: [],

    // add additional plugins to both development and production env
    plugins: [],

    // ===============================================================================
    // environment specific configurations
    // ===============================================================================

    development: {
      // https://webpack.js.org/configuration/devtool
      devtool: 'eval-cheap-module-source-map',

      // https://webpack.js.org/plugins/define-plugin/
      definePlugin: {},

      // add additional plugins
      // https://webpack.js.org/plugins/
      plugins: [],
    },

    production: {
      // https://webpack.js.org/configuration/devtool
      devtool: false,

      // https://webpack.js.org/plugins/define-plugin/
      definePlugin: {
        'isProduction': true,
      },

      // add additional plugins
      // https://webpack.js.org/plugins/
      plugins: [],
    },
  },

  // templates: {
  //   extensions: ['html', 'njk'], // or twig
  //   language: 'nunjucks', // or twig

  //   // https://www.npmjs.com/package/gulp-twig#options
  //   twig: {},

  //   // https://www.npmjs.com/package/gulp-nunjucks-render#options
  //   nunjucks: {
  //     envOptions: {
  //       watch: false
  //     }
  //   },

  //   // https://github.com/kangax/html-minifier#options-quick-reference
  //   htmlmin: {
  //     collapseWhitespace: true,
  //   },
  // },

  // images: {
  //   extensions: ['jpg', 'png', 'svg', 'gif']
  // },

  // icons: {
  //   svgmin: {
  //     plugins: [
  //       { removeViewBox: false },
  //     ],
  //   },
  //   svgstore: {},
  // },

  // fonts: {
  //   extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  // },

  // static: {
  //   excludes: ["README.md", ".DS_Store"],
  // },

  production: {
    rev: true,
  },
};

