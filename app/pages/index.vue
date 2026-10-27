<template>
    <div class="p-3 py-5 py-sm-8">
        <LazySectionsHeroSections hydrate-never />
        <LazySectionsProjectsSection hydrate-on-visible />
    </div>
</template>

<script setup>
useReveal()

useHead({
    title: 'Andrea Salvalaggio'
})
</script>