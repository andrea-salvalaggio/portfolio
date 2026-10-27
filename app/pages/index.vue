<template>
    <div class="p-3 py-5 py-sm-8">
        <LazySectionsHeroSections hydrate-never />
        <LazySectionsProjectsSection hydrate-on-visible />
    </div>
</template>

<script setup>
useReveal()

usePageSeo({
    title: 'Andrea Salvalaggio',
    description: 'Web & Frontend Designer based in Padua, Italy. Portfolio with projects, skills and experience in web development.',
    path: '/'
})
</script>