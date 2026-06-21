import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/color-mode'],
    colorMode: {
        classSuffix: '',
        preference: 'light',
        fallback: 'light'
    },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
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
            script: [
                {
                    innerHTML: `(function () {
                    try {
                    const theme = localStorage.getItem('nuxt-color-mode')
                    if (theme === 'dark') {
                        document.documentElement.classList.add('dark')
                    } else if (theme === 'light') {
                        document.documentElement.classList.add('light')
                    }
                    } catch (e) {}
                })();`
                }
            ],
            link: [
                {
                    rel: 'preload',
                    as: 'image',
                    href: '/img/profile.png'
                },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico'
                },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
                    media: 'print',
                    onload: "this.media='all'"
                }
            ]
        },
    },
})
