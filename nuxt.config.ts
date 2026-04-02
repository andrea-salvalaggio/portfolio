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
                    silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'if-function'],
                }
            }
        },
        plugins: [svgLoader()],
    }
})
