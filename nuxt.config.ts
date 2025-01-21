// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: [
    'quasar/dist/quasar.prod.css' // импортируем стили Quasar
  ],

  build: {
    transpile: ['quasar']
  },

  modules: ['nuxt-quasar-ui','@pinia/nuxt']
})