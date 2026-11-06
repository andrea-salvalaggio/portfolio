<template>
    <div class="p-4 py-5">
        <LazySectionsHeroSections hydrate-never />
        <LazySectionsAboutSections hydrate-never />
        <LazySectionsProjectsSection hydrate-never />
        <LazySectionsExperiencesSection hydrate-never />
        <LazySectionsStacksSection hydrate-never />
    </div>
</template>

<script setup>
useReveal()

usePageSeo({
    title: 'Andrea Salvalaggio',
    description: 'Web & Frontend Developer based in Padua, Italy. Portfolio with projects, experience and stack.',
    path: '/'
})
</script>
