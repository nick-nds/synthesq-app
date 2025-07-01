// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: false
  },

  // Development server configuration
  devServer: {
    host: process.env.TAURI_DEV_HOST || '0.0.0.0',
    port: 3000,
    https: process.env.DISABLE_HTTPS ? false : {
      key: './key.pem',
      cert: './cert.pem'
    }
  },

  app: {
    head: {
      title: 'BistroKeep CRM/ERP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional CRM/ERP Solution' }
      ]
    }
  }
})
