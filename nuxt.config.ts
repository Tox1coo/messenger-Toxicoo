// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-icon',
        '@nuxtjs/supabase',
        'nuxt-socket-io',
        '@nuxt/image-edge',
    ],
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
    // @ts-ignore
    router: {
        middleware: ['auth']
    },
    serverHandlers: [
        {
            route: '/ws',
            handler: '~/server/server'
        }
    ],
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    types: [
        "@pinia/nuxt"
    ],
    experimental: {
        reactivityTransform: true
    },
    css: ['@/assets/styles/base.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import "@/assets/styles/variables.scss";
                    `
                }
            }
        }
    },
})
