const path = require('path')

module.exports = {
  title: 'Doc Informatique',

  description: 'Documentation Informatique de PM',

  locales: {
    '/': {
      lang: 'fr-FR',
    },
  },

  evergreen: true,

  plugins: [
    'element-ui'
  ],

  chainWebpack: (config, isServer) => {
    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vssue)[\\/]/,
            name: 'vendor.vue',
            chunks: 'all',
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor.commons',
            chunks: 'all',
          },
        },
      })
    }
  },

  theme: path.resolve(__dirname, '../../lib'),

  themeConfig: {
    lang: 'fr-FR',

    personalInfo: {
      nickname: 'meteorlxy',
      description: 'Happy Coding<br/>Happy Life',
      email: 'meteor.lxy@foxmail.com',
      location: 'Shenzhen, China',
      organization: 'Tencent',

      avatar: 'https://www.meteorlxy.cn/assets/img/avatar.jpg',

      sns: {
        github: {
          account: 'meteorlxy',
          link: 'https://github.com/meteorlxy',
        }
      },
    },

    header: {
      background: {
        // url: '/assets/img/header-image-01.jpg',
        useGeo: true,
      },
      showTitle: true,
    },

    footer: {
      poweredBy: true,
      poweredByTheme: true,
      custom: 'Copyright PM and meteorlxy',
    },

    infoCard: {
      headerBackground: {
        // url: '/assets/img/header-image-01.jpg',
        useGeo: true,
      },
    },

    lastUpdated: true,

    nav: [
      { text: 'Accueil', link: '/', exact: true },
      { text: 'Notes', link: '/posts/', exact: false },
      { text:  'Pages', link: '/custom-pages/index2', exact: false },
      { text:  'Préférences', link: '/custom-pages/prefs/', exact: false },
    ],

    // Enable smooth scrolling or not
    smoothScroll: false,

    // Configs for vuepress-plugin-zooming
    zooming: {
      // @see https://vuepress.github.io/en/plugins/zooming
    },

    comments: false,

    notesList: {
      long: true,
    },

    pagination: {
      perPage: 10,
    },
  },
}
