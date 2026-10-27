interface PageSeoOptions {
    title: string
    description: string
    // Route path, used for canonical and og:url when a site URL is configured
    path?: string
    noindex?: boolean
}

const SITE_NAME = 'Andrea Salvalaggio'
const SHARE_IMAGE = '/img/profile.png'

export function usePageSeo({ title, description, path, noindex }: PageSeoOptions) {
    // Absolute URLs (canonical, og:url, og:image) need the real domain: set NUXT_PUBLIC_SITE_URL
    const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogSiteName: SITE_NAME,
        ogType: 'website',
        ogLocale: 'en_US',
        twitterCard: 'summary',
        twitterTitle: title,
        twitterDescription: description,
        robots: noindex ? 'noindex' : undefined,
        ...(siteUrl && {
            ogUrl: siteUrl + (path ?? ''),
            ogImage: siteUrl + SHARE_IMAGE,
            twitterImage: siteUrl + SHARE_IMAGE
        })
    })

    if (siteUrl && path !== undefined) {
        useHead({ link: [{ rel: 'canonical', href: siteUrl + path }] })
    }
}
