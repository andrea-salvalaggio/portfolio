interface PageSeoOptions {
    title: string
    description: string
    // Route path, used for canonical and og:url when a site URL is configured
    path?: string
    noindex?: boolean
}

const SITE_NAME = 'Andrea Salvalaggio'
const SHARE_IMAGE = '/img/og.png'

export function usePageSeo({ title, description, path, noindex }: PageSeoOptions) {
    // canonical and og:url need the real domain: set NUXT_PUBLIC_SITE_URL
    const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

    // og:image must be absolute: without a configured domain use the one the page is served from
    const imageUrl = (siteUrl || useRequestURL().origin) + SHARE_IMAGE

    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogSiteName: SITE_NAME,
        ogType: 'website',
        ogLocale: 'en_US',
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        ogImage: imageUrl,
        ogImageWidth: 1200,
        ogImageHeight: 630,
        ogImageAlt: `${SITE_NAME}, Web & Frontend Developer`,
        twitterImage: imageUrl,
        robots: noindex ? 'noindex' : undefined,
        ...(siteUrl && { ogUrl: siteUrl + (path ?? '') })
    })

    if (siteUrl && path !== undefined) {
        useHead({ link: [{ rel: 'canonical', href: siteUrl + path }] })
    }
}
