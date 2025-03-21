import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // Включение инструментов разработчика
  devtools: { enabled: true },

  // Модули Nuxt.js (например, @nuxtjs/axios, если используется)
  modules: [],

  devServer: {
    port: 3000, // Порт, на котором будет работать Nuxt.js
  },

  nitro: {
    // Настройки Nitro (серверной части Nuxt 3)
    routeRules: {
      '/api/**': {
        cors: true, // Включение CORS для API
        headers: {
          'Access-Control-Allow-Origin': '*', // Разрешить доступ для всех доменов
        },
      },
    },
  },

  runtimeConfig: {
    // Переменные окружения, доступные на сервере
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000', // Базовый URL API
    },
  },

  compatibilityDate: '2025-03-20',
});