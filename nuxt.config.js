// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { 
    enabled: true,
    vscode: {},
    timeline: {
      enabled: true
    }
  },
  
  vite: {
    vue: {
      customElement: true
    },
    define: {
      __VUE_PROD_DEVTOOLS__: true
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  
  pinia: {
    storesDirs: ['./stores/**'],
    autoImports: ['defineStore', 'acceptHMRUpdate'],
    disableVuex: false
  },
  css: ['~/assets/css/main.css'],
  
  // SPA mode configuration
  ssr: false,
  
  typescript: {
    typeCheck: false
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.crm.test:40443',
      apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || '/api/v1'
    }
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
      title: 'Synthesq - Orchestrate Your Business',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern CRM/ERP Platform - Orchestrate Your Business Operations with Synthesq by TheMessieCompany' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/logo.png' }
      ]
    }
  },

  // Nitro configuration for static hosting
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
