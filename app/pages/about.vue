<template>
    <div class="p-3 py-5 py-sm-8">
        <div class="about-title reveal">
            <div class="container p-0">
                <div class="row">
                    <div class="col">
                        <h1 class="fw-bold">About</h1>
                        <p>A little bit of my life.</p>
                    </div>
                </div>
            </div>
        </div>
        <LazySectionsFanDeckSection hydrate-on-visible />
        <LazySectionsAboutSections hydrate-never />
        <LazySectionsConnectionsSection hydrate-never />
        <LazySectionsExperiencesSection hydrate-never />
    </div>
</template>

<script setup>
usePageSeo({
    title: 'About | Andrea Salvalaggio',
    description: 'A little bit of my life: my path from graphic design to web development, my experience and how to get in touch.',
    path: '/about'
})
useReveal()
</script>