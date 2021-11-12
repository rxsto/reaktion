module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.{vue,js}',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.{js,ts}',
      'nuxt.config.{js,ts}'
    ]
  }
}
