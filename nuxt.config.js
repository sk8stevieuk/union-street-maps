import tailwindTypography from '@tailwindcss/typography';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  router:{
    base:""
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  build: {
      extend(config, ctx) {}
  },
  generate: {
    fallback: true
  },
  components: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Union Street Maps',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  tailwindcss: {
      config: {
          plugins: [tailwindTypography],
      }
  },
  workbox: {
      "enabled": true,
      "offline": false,
      "swUrl": '/static/custom-sw.js',
      importScripts: [
          'custom-sw.js'
      ],
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa'
  ],
  svgSprite: {
    // manipulate module options
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-leaflet'
  ],
}
