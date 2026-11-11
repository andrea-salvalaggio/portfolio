<template>
    <main class="p-4 py-5">
        <div class="container p-0">
            <LayoutSiteHeader as="p" />
        </div>
        <Layout404 />
    </main>
    <LayoutSiteFooter />
</template>

<script setup>
usePageSeo({
    title: '404 | Andrea Salvalaggio',
    description: "The page you are looking for doesn't exist.",
    noindex: true
})
</script>

