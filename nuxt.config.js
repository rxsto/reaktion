export default {
  target: 'static',

  modern: process.env.NODE_ENV === 'production' && 'client',

  head: {
    title: 'reaktion',
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

  loading: {
    color: '#fff',
    height: '3px'
  },

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@aceforth/nuxt-optimized-images'
  ],

  modules: [
    '@nuxtjs/universal-storage'
  ],

  storage: {
    vuex: {
      namespace: 'storage'
    },
    localStorage: {
      prefix: 'rk_'
    },
    cookie: false,
    ignoreExceptions: false
  }
}
