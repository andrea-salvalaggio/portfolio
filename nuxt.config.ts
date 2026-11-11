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
            { name: 'DM Sans', provider: 'google', weights: [300, 400, 500, 600, 700], styles: ['normal'] },
            { name: 'DM Mono', provider: 'google', weights: [400, 500], styles: ['normal'] }
        ]
    },
    image: {
        format: ['webp'],
        quality: 75
    },
    routeRules: {
        // The old project URLs now point to the repository
        '/deliveboo': { redirect: { to: 'https://github.com/andrea-salvalaggio/laravel-deliveboo', statusCode: 301 } },
        '/projects/deliveboo': { redirect: { to: 'https://github.com/andrea-salvalaggio/laravel-deliveboo', statusCode: 301 } },
        // The site is a single page now: old pages land on their section
        '/about': { redirect: { to: '/#about', statusCode: 301 } },
        '/stack': { redirect: { to: '/#stack', statusCode: 301 } }
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
                // Transparent: the ICO is the fallback, the SVG switches logo color with the browser theme
                { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            ]
        },
    },
})
