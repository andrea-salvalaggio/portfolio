<template>
    <LayoutAppHeader />
    <main class="p-3 py-5 py-sm-8">
        <Layout404 />
    </main>
</template>

<script setup>
usePageSeo({
    title: '404 | Andrea Salvalaggio',
    description: "The page you are looking for doesn't exist.",
    noindex: true
})
</script>