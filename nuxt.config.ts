export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    runtimeConfig: {
        public: {
            // Production domain, e.g. https://example.com (NUXT_PUBLIC_SITE_URL)
            siteUrl: ''
        }
    },
    modules: ['@nuxt/image', '@nuxt/eslint', '@nuxt/fonts'],
    fonts: {
        families: [
            { name: 'DM Sans', provider: 'google', weights: [300, 400, 500, 700], styles: ['normal'] }
        ]
    },
    image: {
        format: ['webp'],
        quality: 75
    },
    routeRules: {
        // The old project URL keeps working
        '/deliveboo': { redirect: { to: '/projects/deliveboo', statusCode: 301 } },
        // Stack now lives as a section of About
        '/stack': { redirect: { to: '/about#stack', statusCode: 301 } }
    },
    devtools: { enabled: true },
    build: {
        transpile: ['@fortawesome/vue-fontawesome', '@fortawesome/fontawesome-svg-core']
    },
    css: [
        '~/assets/scss/bootstrap.scss',
        '@fortawesome/fontawesome-svg-core/styles.css',
        '~/assets/scss/main.scss'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/variables" as *;',
                    silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'if-function'],
                }
            }
        },
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            htmlAttrs: {
                lang: "en",
            },
            title: "Portfolio | Andrea Salvalaggio",
            meta: [
                {
                    name: "description",
                    content: "This is my professional portfolio where I present my projects and skills as a web developer. Explore my work and experience in the field of web development.",
                },
                { name: 'theme-color', content: '#0B0B0B' },
                { name: 'color-scheme', content: 'dark' },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico'
                },
                { rel: 'apple-touch-icon', href: '/img/profile.png' },
            ]
        },
    },
})
