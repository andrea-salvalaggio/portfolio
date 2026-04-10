import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: [
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
        plugins: [svgLoader()],
    },
    app: {
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
            ],
        },
    },
})
