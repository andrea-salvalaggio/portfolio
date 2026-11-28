<template>
    <div class="page-shell">
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
    title: 'Andrea Salvalaggio | Web & Frontend Developer',
    description: "I'm a Web & Frontend Developer focused on building experiences and turning ideas into interfaces",
    path: '/'
})
</script>
