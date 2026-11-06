interface PageSeoOptions {
    title: string
    description: string
    path?: string
    noindex?: boolean
}

const SITE_NAME = 'Andrea Salvalaggio'
const SHARE_IMAGE = '/img/og.png'

export function usePageSeo({ title, description, path, noindex }: PageSeoOptions) {
    const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
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
