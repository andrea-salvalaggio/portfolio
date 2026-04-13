<template>
    <div class="about-title p-3">
        <div class="row">
            <div class="col">
                <h1 class="h2 fw-bold">About</h1>
                <p>A little bit of my life.</p>
            </div>
        </div>
    </div>
    <SectionsAboutSections />
    <SectionsConnectionsSection />
    <SectionsExperiencesSection />
</template>

<script setup>
useHead({
    title: 'About | Andrea Salvalaggio'
})
</script>

<style scoped lang="scss">
.about-title {
    margin-top: $spacer-8;
}
</style>