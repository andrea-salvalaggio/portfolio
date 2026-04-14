<template>
    <div class="p-3 py-5 py-sm-8">
        <div class="about-title">
            <div class="container p-0">
                <div class="row">
                    <div class="col">
                        <h1 class="h2 fw-bold">About</h1>
                        <p>A little bit of my life.</p>
                    </div>
                </div>
            </div>
        </div>
        <SectionsFanDeckSection />
        <SectionsAboutSections />
        <SectionsConnectionsSection />
        <SectionsExperiencesSection />
    </div>
</template>

<script setup>
useHead({
    title: 'About | Andrea Salvalaggio'
})
</script>